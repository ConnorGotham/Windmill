<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%-- <%@page import="com.serotonin.m2m2.Common"%> --%>
<%@page import="com.serotonin.m2m2.scripting.ScriptDataSourceVO"%>
<%@page import="com.serotonin.m2m2.rt.script.ScriptLog"%>

<script type="text/javascript">
  dojo.require("dojo.store.Memory");
  dojo.require("dijit.form.ComboBox");
  
  var pointsArray = new Array();
  var contextArray = new Array();
  var pointLookupText = ""; //For selection to remain in the filter
  
  function initImpl() {
	  $set("historical", ${dataSource.historicalSetting});
	  $set("updateEvent", ${dataSource.updateEvent});
      // Create the list of all available points.
      <c:forEach items="${userPoints}" var="dp"><%--
        --%><c:if test="${dp.dataSourceId != dataSource.id}"><%--
          --%>pointsArray.push({ id: ${dp.id}, name: '${sst:escapeLessThan(sst:quotEncode(dp.extendedName))}'.replace(/&lt;/g, "<"), type: '<m2m2:translate message="${dp.dataTypeMessage}"/>', fancyName: '${fn:escapeXml(sst:quotEncode(dp.extendedName))}'});<%--
        --%></c:if><%--
      --%></c:forEach>

      // Add points that are already selected to the context array
      <c:forEach items="${dataSource.context}" var="scv">addToContextArray(${scv.dataPointId}, '${sst:quotEncode(scv.variableName)}', ${scv.contextUpdate});</c:forEach>
      
      // Draw the selected point list.
      refreshContextPoints();
      
      // Create the lookup
      new dijit.form.ComboBox({
          store: new dojo.store.Memory({ data: pointsArray }),
          labelAttr: "fancyName",
          labelType: "html",
          searchAttr: "name",
          autoComplete: false,
          style: "width: 254px;",
          queryExpr: "*\${0}*",
          highlightMatch: "all",
          required: false,
          onChange: function(point) {
              if (this.item) {
                  selectPoint(this.item.id);
                  this.loadAndOpenDropDown();
                  this.set('displayedValue',pointLookupText);
                  if(typeof(this._startSearch) == 'function')
                      this._startSearch(pointLookupText); //Dangerous because could change, but works!
              }
          },
          onKeyUp: function(event){
              pointLookupText = this.get('displayedValue');
          }
      }, "pointLookup");        
      
      createContextualMessageNode("contextContainer", "context");
      createContextualMessageNode("cronMessages", "cronPattern");
      
      logLevelChanged();
  }
  
  function logLevelChanged() {
		ScriptingEditDwr.getLogPath(${dataSource.id}, function(response){
		      var logLevelPath = dojo.byId("logPathMsg");
		      logLevelPath.innerHTML = response;

		      if ($get("logLevel") == <%=ScriptLog.LogLevel.NONE%>) {
		          hide("logPathMsg");
		          hide("logSizeRow");
                  hide("logCountRow");
		      } else {
		          show("logPathMsg");
		          show("logSizeRow");
                  show("logCountRow");
		      }			  
		});
  }
  
  function selectPoint(pointId) {
      if (!containsPoint(pointId)) {
          addToContextArray(pointId, "p"+ pointId, false);
          refreshContextPoints();
      }
  }
  
  function containsPoint(pointId) {
      return getElement(contextArray, pointId, "id") != null;
  }
  
  function addToContextArray(pointId, varName, isUpdateContext) {
      var data = getElement(pointsArray, pointId);
      if (data) {
          // Disable the name in the lookup
          data.fancyName = "<span class='disabled'>"+ encodeHtml(data.name) +"</span>";
          
          // Missing names imply that the point was deleted, so ignore.
          contextArray.push({
              id : pointId,
              pointName : data.name,
              pointType : data.type,
              varName: varName,
              contextUpdate : isUpdateContext
          });
      }
  }
  
  function removeFromContextArray(pointId) {
      removeElement(contextArray, pointId);
      refreshContextPoints();
      
      var data = getElement(pointsArray, pointId);
      if (data)
          data.fancyName = encodeHtml(data.name);
  }
  
  function refreshContextPoints() {
      dwr.util.removeAllRows("contextTable");
      if (contextArray.length == 0) {
          show($("contextTableEmpty"));
          hide($("contextTableHeaders"));
      }
      else {
          hide($("contextTableEmpty"));
          show($("contextTableHeaders"));
          dwr.util.addRows("contextTable", contextArray,
              [
                  function(data) { return encodeHtml(data.pointName); },
                  function(data) { return data.pointType; },
                  function(data) {
                      return "<input type='text' value='"+ data.varName +"' onblur='updateVarName("+ data.id +", this.value)' class='formShort'/>";
                  },
                  function(data) {
                	  return "<div style='text-align: center;'><input type='checkbox' onchange='updateContextUpdate(" + data.id + ", this.checked)' "  + (data.contextUpdate ? "checked/></div>" : "/></div>");
                  },
                  function(data) {
                      if(data.enabled === undefined)
                          return "";
                      else if(data.enabled)
                          return "<center><img src='images/database_go.png'/></center>";
                      else
                          return "<center><img src='images/database_stop.png'/></center>";
                  },
                  function(data) { 
                      return "<img src='images/bullet_delete.png' class='ptr' onclick='removeFromContextArray("+ data.id +")'/>";
                  }
              ],
              {
                  rowCreator:function(options) {
                      var tr = document.createElement("tr");
                      tr.className = "smRow"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                      return tr;
                  }
              }
          );
      }
  }
  
  function updateVarName(pointId, varName) {
      var data = getElement(contextArray, pointId);
      if (data)
            data.varName = varName;
  }
  
  function updateContextUpdate(pointId, updateContext) {
      var data = getElement(contextArray, pointId);
      if (data)
            data.contextUpdate = updateContext;
  }
  
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders.push("<sst:i18n key="dsEdit.script.varName" escapeDQuotes="true"/>");
      pointListColumnFunctions.push(function(p) { return p.pointLocator.varName; });
  }
  
  function saveDataSourceImpl(basic) {
      ScriptingEditDwr.saveDataSource(basic, createContextArray(), 
              editor.getValue(), 
              $get("cronPattern"), 
              $get("executionDelaySeconds"), 
              $get("updateEvent"),
              getScriptPermissions(),
              $get("logLevel"), 
              $get("logSize"),
              $get("logCount"),
              $get("historical"), saveDataSourceCB);
  }
  
  function editPointCBImpl(locator) {
      $set("varName", locator.varName);
      $set("dataTypeId", locator.dataTypeId);
      $set("settable", locator.settable);
      $set("contextUpdate", locator.contextUpdate);
  }
  
  function savePointImpl(locator) {
      delete locator.relinquishable;
      locator.varName = $get("varName");
      locator.dataTypeId = $get("dataTypeId");
      locator.settable = $get("settable");
      locator.contextUpdate = $get("contextUpdate");
      ScriptingEditDwr.savePointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }

  function validateScript() {
      hide("scriptValidationOutput");
      ScriptingEditDwr.validateDataSourceScript(createContextArray(),
    		  editor.getValue(),
    		  getScriptPermissions(),
    		  $get("logLevel"),
              function(response) {
          var output = "";
          var failure = false;
          if (response.hasMessages){
              output = response.messages[0].genericMessage;
              failure = true;
          }else if (response.data.out){
              output = response.data.out;
          }else
              output = "<sst:i18n key="dsEdit.script.noOutput" escapeDQuotes="true"/>";
            
          if(response.data.enabledMap) {
              for(var i = 0; i < contextArray.length; i+=1)
                  contextArray[i].enabled = response.data.enabledMap[contextArray[i].id];
              refreshContextPoints();
          }
              
          var div = dojo.byId('scriptValidationOutput');
          if(failure === false)
        	  div.style.color = '';
          else
        	  div.style.color = 'red';
          $set("scriptValidationOutput", output);
          show("scriptValidationOutput");
      });
  }
  
  function createContextArray() {
      var context = new Array();
      for (var i=0; i<contextArray.length; i++) {
          context[context.length] = {
              dataPointId : contextArray[i].id,
              variableName : contextArray[i].varName,
              contextUpdate : contextArray[i].contextUpdate === true || 
              				  contextArray[i].contextUpdate === "on" || contextArray[i].contextUpdate == "true"
          };
      }
      return context;
  }
  
  //On Page Load set the permissions
  setScriptPermissions({
	  dataSourcePermissions: '${dataSource.scriptPermissions.dataSourcePermissions}',
	  dataPointSetPermissions: '${dataSource.scriptPermissions.dataPointSetPermissions}',
	  dataPointReadPermissions: '${dataSource.scriptPermissions.dataPointReadPermissions}',
	  customPermissions: ''
  });
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.script.desc" helpId="scriptingDS">
  <tr>
    <td class="formLabelRequired"><fmt:message key="common.cronPattern"/></td>
    <td class="formField">
      <input type="text" id="cronPattern" value="${dataSource.cronPattern}"/>
      <tag:img png="bullet_go_left" onclick="$set('cronPattern', $get('sampleCrons'))"/>
      <select id="sampleCrons">
        <option value="0 * * * * ?"><fmt:message key="dsEdit.script.crons.min"/></option>
        <option value="0 0/15 * * * ?"><fmt:message key="dsEdit.script.crons.15min"/></option>
        <option value="0 0 * * * ?"><fmt:message key="dsEdit.script.crons.hour"/></option>
        <option value="0 0 0/4 * * ?"><fmt:message key="dsEdit.script.crons.4hour"/></option>
        <option value="0 0 0 * * ?"><fmt:message key="dsEdit.script.crons.day"/></option>
      </select>
      <tag:help id="cronPatterns"/>
      <span id="cronMessages"></span>
    </td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.script.delay"/></td>
    <td class="formField"><input type="text" id="executionDelaySeconds" value="${dataSource.executionDelaySeconds}"/></td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.script.historical"/></td>
    <td class="formField"><input type="checkbox" id="historical"/></td>
  </tr>
  <tag:scriptPermissions></tag:scriptPermissions>
  <tr>
  	<td class="formLabel"><fmt:message key="dsEdit.script.updateEvent"/></td>
	<td class="formField"><select id="updateEvent">
	        <option value="<c:out value="<%= ScriptDataSourceVO.UPDATE_EVENT_CONTEXT_UPDATE %>"/>"><fmt:message key="dsEdit.pointEvent.update"/></option>
	        <option value="<c:out value="<%= ScriptDataSourceVO.UPDATE_EVENT_CONTEXT_CHANGE %>"/>"><fmt:message key="dsEdit.pointEvent.change"/></option>
	        <option value="<c:out value="<%= ScriptDataSourceVO.UPDATE_EVENT_CONTEXT_LOGGED %>"/>"><fmt:message key="dsEdit.pointEvent.logged"/></option>
	        </select>
	 </td>
  </tr>
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.script.scriptContext"/></td>
    <td class="formField">
      <div id="pointLookup"></div>
      
      <table cellspacing="1" id="contextContainer">
        <tbody id="contextTableEmpty" style="display:none;">
          <tr><th colspan="4"><fmt:message key="dsEdit.script.noPoints"/></th></tr>
        </tbody>
        <tbody id="contextTableHeaders" style="display:none;">
          <tr class="smRowHeader">
            <td><fmt:message key="dsEdit.script.pointName"/></td>
            <td><fmt:message key="dsEdit.pointDataType"/></td>
            <td><fmt:message key="dsEdit.script.varName"/></td>
            <td><fmt:message key="dsEdit.script.updatesContext"/></td>
            <td><fmt:message key="common.enabled"/></td>
            <td></td>
          </tr>
        </tbody>
        <tbody id="contextTable"></tbody>
      </table>
    </td>
  </tr>
  
  <tr>
    <td class="formLabelRequired">
      <fmt:message key="dsEdit.script.script"/> <tag:img png="accept" onclick="validateScript();" title="common.validate"/>
    </td>
    <td class="formField">
      <div id="script" style="font-family: Courier New !important;  height:400px; width:700px">${dataSource.script}</div>
      
    </td>
  </tr>
  <tr><td></td><td><div id="scriptValidationOutput" style="display:none;"></div></td></tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.script.logLevel"/></td>
    <td class="formField">
      <tag:exportCodesOptions id="logLevel" optionList="<%= ScriptLog.LOG_LEVEL_CODES.getIdKeys() %>"
              value="${dataSource.logLevel}" onchange="logLevelChanged()"/>
      <div id="logPathMsg">
      </div>
    </td>
  </tr>
  <tr id="logSizeRow">
    <td class="formLabelRequired"><fmt:message key="dsEdit.logFileSizeMB"/></td>
    <td class="formField"><input type="number" id="logSize" value="${dataSource.logSize}"/></td>
  </tr>
  <tr id="logCountRow">
    <td class="formLabelRequired"><fmt:message key="dsEdit.logFileCount"/></td>
    <td class="formField"><input type="number" id="logCount" value="${dataSource.logCount}"/></td>
  </tr>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="scriptingPP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.script.varName"/></td>
    <td class="formField"><input type="text" id="varName"/></td>
  </tr>

  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField">
      <tag:dataTypeOptions id="dataTypeId" excludeImage="true"/>
    </td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.settable"/></td>
    <td class="formField"><input type="checkbox" id="settable"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.script.updatesContext"/></td>
    <td class="formField"><input type="checkbox" id="contextUpdate"/></td>
  </tr>
</tag:pointList>
<script src="/resources/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/theme-tomorrow_night_bright.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/mode-javascript.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/worker-javascript.js" type="text/javascript" charset="utf-8"></script>
<script>
	ace.config.set("basePath", "/resources/ace");
    var editor = ace.edit("script");
    editor.resize(true);
    editor.setTheme("ace/theme/tomorrow_night_bright");
    var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());
</script>