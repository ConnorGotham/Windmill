<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@page import="com.serotonin.m2m2.http.vo.HttpSenderVO"%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<script type="text/javascript">
  dojo.require("dojo.store.Memory");
  dojo.require("dijit.form.ComboBox");
  
  var allPoints = [];  
  var staticHeaderList = [];
  var staticParameterList = [];
  var selectedPoints = [];  
  var pointLookupText = ""; //For selection to remain in the filter

  dojo.ready(function() {
	  changeContentType();
      HttpPublisherDwr.initSender(function(response) {
          dojo.forEach(response.data.allPoints, function(item) {
              allPoints.push({
                  id: item.id, 
                  name: item.extendedName, 
                  enabled: item.enabled, 
                  type: item.dataTypeString,
                  fancyName: encodeHtml(item.extendedName)
              });
          });
          
          staticHeaderList = response.data.publisher.staticHeaders;
          refreshStaticHeaderList();
          
          staticParameterList = response.data.publisher.staticParameters;
          refreshStaticParameterList();
          
          dojo.forEach(response.data.publisher.points, function(item) {
              addToSelectedArray(item.dataPointId, item.parameterName, item.includeTimestamp);
          });
          refreshSelectedPoints();
          

          // Create the lookup
          var cbox = new dijit.form.ComboBox({
              store: new dojo.store.Memory({ data: allPoints }),
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
              },
          }, "pointLookup");        
      });
  });
  
  function addStaticHeader() {
      var key = $get("sheaderKey");
      var value = $get("sheaderValue");
      
      if (!key || key.trim().length == 0) {
          alert("<fmt:message key="publisherEdit.httpSender.keyRequired"/>");
          return;
      }
      
      for (var i=0; i<staticHeaderList.length; i++) {
          if (staticHeaderList[i].key == key) {
              alert("<fmt:message key="publisherEdit.httpSender.keyExists"/>: '"+ key +"'");
              return;
          }
      }
      
      staticHeaderList.push({key: key, value: value});
      staticHeaderList.sort();
      refreshStaticHeaderList();
  }
  
  function removeStaticHeader(index) {
      staticHeaderList.splice(index, 1);
      refreshStaticHeaderList();
  }
  
  function refreshStaticHeaderList() {
      dwr.util.removeAllRows("staticHeaderList");
      if (staticHeaderList.length == 0)
          show("noStaticHeadersMsg");
      else {
          hide("noStaticHeadersMsg");
          dwr.util.addRows("staticHeaderList", staticHeaderList, [
                  function(data) { return data.key +"="+ data.value; },
                  function(data, options) {
                      return "<img src='images/bullet_delete.png' class='ptr' title='<fmt:message key="publisherEdit.httpSender.removeHeader"/>' "+
                              "onclick='removeStaticHeader("+ options.rowIndex + ");'/>";
                  }
                  ], null);
      }
  }
  
  function addStaticParameter() {
      var key = $get("sparamKey");
      var value = $get("sparamValue");
      
      if (!key || key.trim().length == 0) {
          alert("<fmt:message key="publisherEdit.httpSender.keyRequired"/>");
          return;
      }
      
      for (var i=0; i<staticParameterList.length; i++) {
          if (staticParameterList[i].key == key) {
              alert("<fmt:message key="publisherEdit.httpSender.keyExists"/>: '"+ key +"'");
              return;
          }
      }
      
      staticParameterList[staticParameterList.length] = {key: key, value: value};
      staticParameterList.sort();
      refreshStaticParameterList();
  }
  
  function removeStaticParameter(index) {
      staticParameterList.splice(index, 1);
      refreshStaticParameterList();
  }
  
  function refreshStaticParameterList() {
      dwr.util.removeAllRows("staticParameterList");
      if (staticParameterList.length == 0)
          show("noStaticParametersMsg");
      else {
          hide("noStaticParametersMsg");
          dwr.util.addRows("staticParameterList", staticParameterList, [
                  function(data) { return data.key +"="+ data.value; },
                  function(data, options) {
                      return "<img src='images/bullet_delete.png' class='ptr' title='<fmt:message key="publisherEdit.httpSender.removeParam"/>' "+
                              "onclick='removeStaticParameter("+ options.rowIndex + ");'/>";
                  }
                  ], null);
      }
  }
  
  function selectPoint(pointId) {
      if (!containsPoint(pointId)) {
          addToSelectedArray(pointId, null, true);
          refreshSelectedPoints();
      }
  }
  
  function containsPoint(pointId) {
      return getElement(selectedPoints, pointId, "id") != null;
  }
  
  function addToSelectedArray(pointId, parameterName, includeTimestamp) {
      var data = getElement(allPoints, pointId);
      
      if (parameterName == null)
          parameterName = data.name;
      
      if (data) {
          data.fancyName = "<span class='disabled'>"+ encodeHtml(data.name) +"</span>";
          
          // Missing names imply that the point was deleted, so ignore.
          selectedPoints[selectedPoints.length] = {
              id : pointId,
              pointName : data.name,
              enabled : data.enabled,
              pointType : data.type,
              parameterName: parameterName,
              includeTimestamp: includeTimestamp
          };
      }
  }
  
  function removeFromSelectedPoints(pointId) {
      removeElement(selectedPoints, pointId);
      refreshSelectedPoints();
      
      var data = getElement(allPoints, pointId);
      if (data)
          data.fancyName = encodeHtml(data.name);
  }
  
  function refreshSelectedPoints() {
      dwr.util.removeAllRows("selectedPoints");
      if (selectedPoints.length == 0)
          show("selectedPointsEmpty");
      else {
          hide("selectedPointsEmpty");
          dwr.util.addRows("selectedPoints", selectedPoints,
              [
                  function(data) { return encodeHtml(data.pointName); },
                  function(data) { return "<img src='images/"+ (data.enabled ? "brick_go" : "brick_stop") +".png'/>"; },
                  function(data) { return data.pointType; },
                  function(data) {
                          return "<input type='text' value='"+ data.parameterName +"' "+
                                  "onblur='updateParameterName("+ data.id +", this.value)'/>";
                  },
                  function(data) {
                          return "<input type='checkbox' "+ (data.includeTimestamp ? "checked='checked' " : "") +
                                  "onclick='updateIncludeTimestamp("+ data.id +", this.checked)'/>";
                  },
                  function(data) { 
                          return "<img src='images/bullet_delete.png' class='ptr' "+
                                  "onclick='removeFromSelectedPoints("+ data.id +")'/>";
                  }
              ],
              {
                  rowCreator: function(options) {
                      var tr = document.createElement("tr");
                      tr.className = "row"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                      return tr;
                  },
                  cellCreator: function(options) {
                      var td = document.createElement("td");
                      if (options.cellNum == 1 || options.cellNum == 4)
                          td.align = "center";
                      return td;
                  } 
              });
      }
  }
  
  function updateParameterName(pointId, parameterName) {
      updateElement(selectedPoints, pointId, "parameterName", parameterName);
  }
  
  function updateIncludeTimestamp(pointId, includeTimestamp) {
      updateElement(selectedPoints, pointId, "includeTimestamp", includeTimestamp);
  }
  
  function savePublisherImpl(name, xid, enabled, cacheWarningSize, cacheDiscardSize, changesOnly, sendSnapshot,
          snapshotSendPeriods, snapshotSendPeriodType) {
      // Clear messages.
      hide("urlMsg");
      hide("pointsMsg");
      
      var points = new Array();
      for (var i=0; i<selectedPoints.length; i++)
          points[points.length] = {dataPointId: selectedPoints[i].id, parameterName: selectedPoints[i].parameterName,
                  includeTimestamp: selectedPoints[i].includeTimestamp};
      
      HttpPublisherDwr.saveHttpSender(name, xid, enabled, points, $get("url"), $get("usePost") == "true", $get("useJSON") == "true", 
              staticHeaderList, staticParameterList, cacheWarningSize, cacheDiscardSize, changesOnly,
              $get("raiseResultWarning"), $get("dateFormat"), sendSnapshot, snapshotSendPeriods, 
              snapshotSendPeriodType, savePublisherCB);
  }
  
  function httpSendTest() {
      showMessage("httpSendTestMessage", "<fmt:message key="publisherEdit.httpSender.sending"/>");
      showMessage("httpSendTestData");
      httpSendTestButtons(true);
      HttpPublisherDwr.httpSenderTest($get("url"), $get("usePost") == "true", $get("useJSON") == "true", staticHeaderList, staticParameterList,
              httpSendTestCB);
  }
  
  function changeContentType() {
	  var usePost = $get("usePost");
	  if(usePost == "false") {
		  $set("useJSON", "false");
		  setDisabled("useJSON", true);
	  } else {
		  setDisabled("useJSON", false);
	  }
  }
  
  function httpSendTestButtons(sending) {
      setDisabled("httpSendTestBtn", sending);
      setDisabled("httpSendTestCancelBtn", !sending);
  }
  
  function httpSendTestCB() {
      setTimeout(httpSendTestUpdate, 2000);
  }
  
  function httpSendTestUpdate() {
      HttpPublisherDwr.httpSenderTestUpdate(httpSendTestUpdateCB);
  }
  
  function httpSendTestUpdateCB(result) {
      if (result || result == "") {
          showMessage("httpSendTestMessage");
          if (result)
              showMessage("httpSendTestData", result);
          else
              showMessage("httpSendTestData", "<fmt:message key="publisherEdit.httpSender.noResponseData"/>");
          httpSendTestButtons(false);
      }
      else
          httpSendTestCB();
  }
  
  function httpSendTestCancel() {
      HttpPublisherDwr.cancelTestingUtility(httpSendTestCancelCB);
  }
  
  function httpSendTestCancelCB() {
      httpSendTestButtons(false);
      showMessage("httpSendTestMessage", "<fmt:message key="common.cancelled"/>");
  }
</script>

<table cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top">
      <div class="borderDiv marR marB">
        <table>
          <tr>
            <td colspan="2" class="smallTitle"><fmt:message key="publisherEdit.httpSender.props"/> <tag:help id="httpSenderPublishing"/></td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.method"/></td>
            <td class="formField">
              <sst:select id="usePost" value="${publisher.usePost}" onchange="changeContentType()">
                <sst:option value="false">GET</sst:option>
                <sst:option value="true">POST</sst:option>
              </sst:select>
            </td>
          </tr>
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.contentType"/></td>
            <td class="formField">
              <sst:select id="useJSON" value="${publisher.useJSON}">
                <sst:option value="false">URL</sst:option>
                <sst:option value="true">JSON</sst:option>
              </sst:select>
            </td>
          </tr>

          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.url"/></td>
            <td class="formField">
              <input type="text" id="url" value="${publisher.url}" class="formLong"/>
              <div id="urlMsg" class="formError" style="display:none;"></div>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.staticHeaders"/></td>
            <td class="formField">
              <fmt:message key="publisherEdit.httpSender.headerKey"/> <input type="text" id="sheaderKey" class="formShort"/>
              <fmt:message key="publisherEdit.httpSender.headerValue"/> <input type="text" id="sheaderValue" class="formShort"/>
              <tag:img png="add" title="publisherEdit.httpSender.addStaticHeader" onclick="addStaticHeader()"/>
              <table>
                <tr id="noStaticHeadersMsg" style="display:none"><td><fmt:message key="publisherEdit.httpSender.noStaticHeaders"/></td></tr>
                <tbody id="staticHeaderList"></tbody>
              </table>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.staticParams"/></td>
            <td class="formField">
              <fmt:message key="publisherEdit.httpSender.paramKey"/> <input type="text" id="sparamKey" class="formShort"/>
              <fmt:message key="publisherEdit.httpSender.paramValue"/> <input type="text" id="sparamValue" class="formShort"/>
              <tag:img png="add" title="publisherEdit.httpSender.addStaticParam" onclick="addStaticParameter()"/>
              <table>
                <tr id="noStaticParametersMsg" style="display:none"><td><fmt:message key="publisherEdit.httpSender.noStaticParams"/></td></tr>
                <tbody id="staticParameterList"></tbody>
              </table>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.raiseResultWarning"/></td>
            <td class="formField"><sst:checkbox id="raiseResultWarning"
                    selectedValue="${publisher.raiseResultWarning}"/></td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.httpSender.dateFormat"/></td>
            <td class="formField">
              <sst:select id="dateFormat" value="${publisher.dateFormat}">
                <sst:option value="<%= Integer.toString(HttpSenderVO.DATE_FORMAT_BASIC) %>"><fmt:message key="publisherEdit.httpSender.dateFormat.basic"/></sst:option>
                <sst:option value="<%= Integer.toString(HttpSenderVO.DATE_FORMAT_TZ) %>"><fmt:message key="publisherEdit.httpSender.dateFormat.tz"/></sst:option>
                <sst:option value="<%= Integer.toString(HttpSenderVO.DATE_FORMAT_UTC) %>"><fmt:message key="publisherEdit.httpSender.dateFormat.utc"/></sst:option>
              </sst:select>
            </td>
          </tr>
        </table>
      </div>
    </td>
    
    <td valign="top">
      <div class="borderDiv marB">
        <table>
          <tr><td class="smallTitle"><fmt:message key="publisherEdit.httpSender.sendTest"/></td></tr>
          <tr>
            <td align="center">
              <input id="httpSendTestBtn" type="button" value="<fmt:message key="publisherEdit.httpSender.sendStaticParams"/>" onclick="httpSendTest();"/>
              <input id="httpSendTestCancelBtn" type="button" value="<fmt:message key="publisherEdit.httpSender.cancel"/>" onclick="httpSendTestCancel();"/>
            </td>
          </tr>
          <tr><td id="httpSendTestMessage" class="formError"></td></tr>
          <tr><td class="formField"><pre id="httpSendTestData"></pre></td></tr>
        </table>
      </div>
    </td>
  </tr>
</table>

<table cellpadding="0" cellspacing="0"><tr><td>
  <div class="borderDiv">
    <table width="100%">
      <tr>
        <td class="smallTitle"><fmt:message key="publisherEdit.points"/></td>
        <td align="right"><div id="pointLookup"></div></td>
      </tr>
    </table>
    
    <table cellspacing="1" cellpadding="0">
      <tr class="rowHeader">
        <td><fmt:message key="publisherEdit.point.name"/></td>
        <td><fmt:message key="publisherEdit.point.status"/></td>
        <td><fmt:message key="publisherEdit.point.type"/></td>
        <td><fmt:message key="publisherEdit.httpSender.point.param"/></td>
        <td><fmt:message key="publisherEdit.httpSender.point.timestamp"/></td>
        <td></td>
      </tr>
      <tbody id="selectedPointsEmpty" style="display:none;"><tr><td colspan="5"><fmt:message key="publisherEdit.noPoints"/></td></tr></tbody>
      <tbody id="selectedPoints"></tbody>
    </table>
    <div id="pointsMsg" class="formError" style="display:none;"></div>
  </div>
</td></tr></table>