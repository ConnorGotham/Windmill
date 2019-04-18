<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%@page import="com.serotonin.m2m2.meta.MetaPointLocatorVO"%>
<%@page import="com.serotonin.m2m2.rt.script.ScriptLog"%>
<%@page import="com.serotonin.m2m2.Common"%>

<style>
  
</style>

<script type="text/javascript">
  dojo.require("dojo.store.Memory");
  dojo.require("dijit.form.ComboBox");
  dojo.require("dijit.form.DateTextBox");
  dojo.require("dijit.form.TimeTextBox");
  dojo.require("dojo.parser");
  dojo.require("dijit.Dialog");
  dojo.require("dijit.form.Button");
  dojo.require("dojo.on");
  
  var historyFromDate,historyFromTime,historyToDate,historyToTime;
  var scriptEngine = <%= MetaPointLocatorVO.JAVASCRIPT_ENGINE %>;
  var pointsArray = new Array();
  var contextArray = new Array(); 
  var pointLookupText = ""; //For selection to remain in the filter
  
  //Setup the date time boxes
  var div = dojo.byId("historyDateSelectionDiv");
  var label = dojo.create("span",{style: "padding-right: 5px", innerHTML:  mangoMsg['common.dateRangeFrom']});
  dojo.place(label,div);
  var fromDate = new dijit.form.DateTextBox({
      value: null,
      style: "width: 10em; color: gray",
  }, "historyFromDate");
  fromDate.placeAt(div);
  fromDate.watch("value",function(name,oldValue,value){

      if(value === null){
          historyFromDate = null;
      }else{
          historyFromDate = value;
          
          if(historyFromTime == null){ //Update the time if there isn't one
              fromTime.set('value',
                      new Date(value.getFullYear(), value.getMonth(), value.getDate(),0,0,0,0)); //Default to Midnight
          }
      }
  });

  var fromTime = new dijit.form.TimeTextBox({
      value: null,
      style: "width: 10em; color: gray",
  }, "historyFromTime");
  fromTime.placeAt(div);
  fromTime.watch("value",function(name,oldValue,value){

      if(value === null){
          historyFromTime = null;
      }else{
          historyFromTime = value;
          if(historyFromDate == null){
              //Update Date to today if there isn't one
              var today = new Date();
              fromDate.set('value',
                      new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0));
          }

      }       
  });
  
  var toDate = new dijit.form.DateTextBox({
      value: null,
      style: "width: 10em; color: gray",
  }, "historyToDate");
  var label = dojo.create("span",{style: "padding-right: 5px; padding-left: 10px;", innerHTML:  mangoMsg['common.dateRangeTo']});
  dojo.place(label,div);
  toDate.placeAt(div);
  toDate.watch("value",function(name,oldValue,value){
      
      if(value === null){
          historyToDate = null;
      }else{
          historyToDate = value;
          if(historyToTime == null){
              //Update the time if there isn't one
              toTime.set('value',
                      new Date(value.getFullYear(), value.getMonth(), value.getDate(),0,0,0,0)); //Default to Midnight
          }
      }       
  });
  var toTime = new dijit.form.TimeTextBox({
      value: null,
      style: "width: 10em; color: gray",
  }, "historyToTime");
  toTime.placeAt(div);
  toTime.watch("value",function(name,oldValue,value){
      
      if(value === null){
          historyToTime = null;
      }else{
          historyToTime = value;
          if(historyToDate == null){
              //Update Date to today if there isn't one
              var today = new Date();
              toDate.set('value',
                      new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0));
          }
      }
  });
  
  /**
   * Create a date from the 
   */
  function createDateTime(date,time){
      
      if(date==null && time==null)
          return -1;
      if(date == null)
          date = new Date(); //Default to today
      if(time == null)
          time = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
                  0,0,0,0); //Default to Midnight
      return new Date(
              date.getFullYear(), date.getMonth(), date.getDate(),
              time.getHours(), time.getMinutes(), time.getSeconds(),
              time.getMilliseconds()
              );
  }

  
  
  function initImpl() {

      <c:forEach items="${userPoints}" var="dp">
        pointsArray[pointsArray.length] = {
            id : ${dp.id}, 
            name : '${sst:escapeLessThan(sst:quotEncode(dp.extendedName))}'.replace(/&lt;/g, "<"),
            fancyName: '${fn:escapeXml(sst:quotEncode(dp.extendedName))}',
            type : '<m2m2:translate message="${dp.dataTypeMessage}" escapeDQuotes="true"/>',
        };
      </c:forEach>
      
      
   // Create the lookup
      new dijit.form.ComboBox({
          store: new dojo.store.Memory({ data: pointsArray }),
          labelType: "html",
          labelAttr: "fancyName",
          searchAttr: "name",
          autoComplete: false,
          style: "width: 254px;",
          queryExpr: "*\${0}*",
          highlightMatch: "all",
          required: false,
          dropDownPosition: ["above"],
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
            
  }
  
  function selectPoint(pointId){
      if(!alreadyAddedToContextArray(pointId)){
          //Determine the default value for context update
          var updatesContext = true;
          if($get("updateEvent") != <%= MetaPointLocatorVO.UPDATE_EVENT_NONE %>){
              updatesContext = false;
          }
          
          addToContextArray(pointId, "p"+pointId, updatesContext);
          writeContextArray();
      }
  }
  
  function addToContextArray(pointId, scriptVarName, contextUpdate) {
      var data = getElement(pointsArray, pointId);
      if (data) {
          
          //Were we already added
          
          // Missing names imply that the point was deleted, so ignore.
          contextArray[contextArray.length] = {
              pointId : pointId,
              pointName : data.name,
              pointType : data.type,
              scriptVarName : scriptVarName,
              contextUpdate : contextUpdate
          };
          //Disable in list
          data.fancyName = "<span class='disabled'>"+ encodeHtml(data.name) +"</span>";
      }
  }
  
  function removeFromContextArray(pointId) {
      for (var i=contextArray.length-1; i>=0; i--) {
          if (contextArray[i].pointId == pointId)
              contextArray.splice(i, 1);
      }
      writeContextArray();
      var data = getElement(pointsArray, pointId);
      if(data)
          data.fancyName = encodeHtml(data.name);
  }

  
  /**
   * Does the context array already have this item
   */
  function alreadyAddedToContextArray(id){
	  
      //First if the id is the id of the current point we don't allow adding it
      if(id == currentPoint.id)
          return true;
      
	  for(var i=0; i<contextArray.length; i++){
	   if(contextArray[i].pointId == id)
		   return true;
	  }
	  
	  return false;
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders.push("");
      pointListColumnFunctions.push(function(p) {
          var id = "generateImg"+ p.id;
          var onclick = "showGenerateHistory("+ p.id +")";
          var html = writeImage(id, "${modulePath}/web/clock-history.png", null,
        		  "<m2m2:translate key='dsEdit.meta.generate' escapeDQuotes='true'/>", onclick);
          //Hack to insert Help into Javascript string
          html += '&nbsp <img src="/images/help.png" alt="Help" title="Help" class="ptr" onclick="help(';
          html += "'metaGenerateHistory', this);";
          html += '" style="display:inline"/>';
          return html;
      });
  }

  var pointHistoryOnClick = function(){
	  generateHistory($get('generateHistoryPointId'), createDateTime(historyFromDate, historyFromTime), createDateTime(historyToDate, historyToTime));
  };
  
  //Signal for onlick 
  var generatePointHistorySignal;
  
  function showGenerateHistory(pointId){
      MetaEditDwr.getGenerateHistoryDateRange(pointId, function(response){
          $set('generateHistoryPointId', pointId);
          
          if(response.hasMessages){
              showDwrMessages(response.messages);
          }else{
              fromDate.set('value', response.data.from);
              fromTime.set('value', response.data.from);
              toDate.set('value', response.data.to);
              toTime.set('value', response.data.to);
          }
          
          //Set the onClick for the button
		  var btn = dojo.byId('generateHistoryButton');
		  generatePointHistorySignal = dojo.on(btn,"click", pointHistoryOnClick);
          if(typeof generateDataSourceHistorySignal != 'undefined')
        	  generateDataSourceHistorySignal.remove();
          generateHistoryDialog.show();          
      });

  }
  
  /**
   * Generate history for a meta point
   * if from = -1 then the earliest context point is used
   * if to = -1 then only history prior to the meta point's first value is used
   */
  function generateHistory(pointId, from, to) {
      startImageFader("generateImg"+ pointId, true);
      MetaEditDwr.generateMetaPointHistory(pointId, from, to, $get("purgeWhileGenerating"), function(result) {
          stopImageFader("generateImg"+ pointId);
          alert(result);
      });
      generateHistoryDialog.hide();
  }
  
  function saveDataSourceImpl(basic) {
      MetaEditDwr.saveMetaDataSource(basic, saveDataSourceCB);
  }
  
  function editPointCBImpl(locator) {
      
      //Clear out all the disabled points from the pointsArray
      for(var i=0; i<pointsArray.length; i++){
          pointsArray[i].fancyName = encodeHtml(pointsArray[i].name);
      }
      
      //Wipe the log messages
      $set("scriptValidationOutput", '');
      
      contextArray.length = 0;
      for (var i=0; i<locator.context.length; i++)
          addToContextArray(locator.context[i].dataPointId, locator.context[i].variableName, locator.context[i].contextUpdate);
      writeContextArray();
    
      editor.setValue(locator.script);
      $set("dataTypeId", locator.dataTypeId);
      $set("settable", locator.settable);
      $set("updateEvent", locator.updateEvent);
      $set("contextUpdateEvent", locator.contextUpdateEvent);
      $set("updateCronPattern", locator.updateCronPattern);
      $set("executionDelaySeconds", locator.executionDelaySeconds);
      $set("variableName", locator.variableName);
      $set("logLevel", locator.logLevel);
      $set("logSize", locator.logSize);
      $set("logCount", locator.logCount);
      setScriptPermissions(locator.scriptPermissions);
      display("updateCronPatternRow", $get("updateEvent") == <%= MetaPointLocatorVO.UPDATE_EVENT_CRON %>);
      
      logLevelChanged();
  }
  
  function savePointImpl(locator) {
      delete locator.relinquishable;
      
      locator.context = createContextArray();
      locator.script = editor.getValue();
	  locator.scriptEngine = scriptEngine;
      locator.dataTypeId = $get("dataTypeId");
      locator.settable = $get("settable");
      locator.updateEvent = $get("updateEvent");
      locator.contextUpdateEvent = $get("contextUpdateEvent");
      locator.updateCronPattern = $get("updateCronPattern");
      locator.executionDelaySeconds = $get("executionDelaySeconds");
      locator.variableName = $get("variableName");
      locator.logLevel = $get("logLevel");
      locator.logSize  = $get("logSize");
      locator.logCount = $get("logCount");
      //Defined in scriptPermissions tag
      locator.scriptPermissions = getScriptPermissions();
      
      MetaEditDwr.saveMetaPointLocator(currentPoint.id, $get("xid"), $get("name"), locator, function(response){
          
        //Ensure we update the local list on the page
        savePointCB(response);
        if(!response.hasMessages){
            
            //Does my point already exist in the list?
            var pos = 0;
            var found = false;
            //First search for the point in the list
            for(var i=0; i<pointsArray.length; i++){
                if(pointsArray[i].id == response.data.vo.id){
                    pos = i;
                    found = true;
                    break;
                }
            }
            
            
            if(found == false){
              //Didn't find it, now find the Alphabetical Location to place it
                for(var i=0; i<pointsArray.length; i++){
                    if(pointsArray[i].name >= response.data.vo.extendedName){
                        pos = i;
                        break;
                    }
                }
                pointsArray.splice(pos, 0, {
                    id : response.data.vo.id, 
                    name : response.data.vo.extendedName,
                    fancyName: response.data.vo.extendedName,
                    type : response.data.vo.dataTypeString,
                });
            }else{
                //Update
                pointsArray[pos] = {
                    id : response.data.vo.id, 
                    name : response.data.vo.extendedName,
                    fancyName: response.data.vo.extendedName,
                    type : response.data.vo.dataTypeString,
                };
            }
        }
      });
      

  }
  
  
  function writeContextArray() {
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
                  function(data) { return data.pointName; },
                  function(data) { return data.pointType; },
                  function(data) {
                          return "<input type='text' value='"+ data.scriptVarName +"' class='formLong' "+
                                  "onblur='updateScriptVarName("+ data.pointId +", this.value)'/>";
                  },
                  function(data) {
                          if(data.contextUpdate)
                              return "<input id='updateContext_" + data.pointId + "' type='checkbox' checked='true' onchange='updateScriptVarContextUpdate(" + data.pointId + ", this.checked)' />";
                          else
                              return "<input id='updateContext_" + data.pointId + "'type='checkbox' onchange='updateScriptVarContextUpdate(" + data.pointId + ", this.checked)' />";
                              
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
                          return "<img src='images/bullet_delete.png' class='ptr' "+
                                  "onclick='removeFromContextArray("+ data.pointId +")'/>";
                  }
              ],
              {
                  rowCreator:function(options) {
                      var tr = document.createElement("tr");
                      tr.className = "smRow"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                      return tr;
                  },
                  cellCreator:function(options) {
                      var td = document.createElement("td");
                      if (options.cellNum == 3){
                          td.align = "center";
                          td.id = "updateContextTd_" + options.rowData.pointId;
                      }
                      return td;
                  }
              });
      }
  }
  
  function updateScriptVarName(pointId, scriptVarName) {
      for (var i=contextArray.length-1; i>=0; i--) {
          if (contextArray[i].pointId == pointId)
              contextArray[i].scriptVarName = scriptVarName;
      }
  }
  
  function updateScriptVarContextUpdate(pointId, onContextUpdate){
      for (var i=contextArray.length-1; i>=0; i--) {
          if (contextArray[i].pointId == pointId)
              contextArray[i].contextUpdate = onContextUpdate;
      }
  }
  
  function validateScript() {
      hideContextualMessages("pointProperties"); <!-- Bug here, legacy placeholder of point details -->
      hideContextualMessages("pointDetails");
      var ctx = createContextArray();
      //Add myself to it
      var ctxVar = {
                  dataPointId : dataPoints.currentId,
                  variableName : $get("variableName"),
                  contextUpdate : false
          };
      ctx[ctx.length] = ctxVar;
      
      //Validate with knowledge of what my data point ID is
      MetaEditDwr.validateScript(
    		  ctxVar.dataPointId, 
    		  ctxVar.variableName, 
    		  editor.getValue(), 
    		  ctx, 
    		  $get("dataTypeId"), 
    		  scriptEngine,
    		  getScriptPermissions(),
    		  $get("logLevel"),
    		  validateScriptCB);
  }
  
  function createContextArray() {
      //Array of ScriptContextVariables {dataPointId, variableName, contextUpdate}
      var context = new Array();
      for (var i=0; i<contextArray.length; i++) {
          var ctxVar = {
                  dataPointId : contextArray[i].pointId,
                  variableName : contextArray[i].scriptVarName,
                  contextUpdate : contextArray[i].contextUpdate
          };
          context[context.length] = ctxVar;
      }
      return context;
  }
  
  function validateScriptCB(response) {
	  hide("scriptValidationOutput");
      showDwrMessages(response.messages);
      if (response.data.out){
          output = response.data.out;
          $set("scriptValidationOutput", output);
          show("scriptValidationOutput");
      }
      
      if (response.data.enabledMap){
          for (var i=0; i<contextArray.length; i++) {
              contextArray[i].enabled = response.data.enabledMap[contextArray[i].pointId];
          }
          writeContextArray();
      }
  }
  
  function updateEventChanged() {
      display("updateCronPatternRow", $get("updateEvent") == <%= MetaPointLocatorVO.UPDATE_EVENT_CRON %>);
      

      if($get("updateEvent") != <%= MetaPointLocatorVO.UPDATE_EVENT_NONE %> ){
          //Ensure the update context column is un-checked
          show("updateContextTh");
          for (var i=contextArray.length-1; i>=0; i--) {
              $set("updateContext_" + contextArray[i].pointId, false);
              //This doesn't fire an onchange event
              updateScriptVarContextUpdate(contextArray[i].pointId, false);
          }
      }
  }
  
  /**
   * Check for Loops In Context Updates of Meta Points
   */
  function checkForCycles(){
	  dwr.util.removeAllRows("cyclesTable");
	  MetaEditDwr.checkForCycles(function(response){
		  displayCycleReport(response.data.reportData);
	  });
  }
  
	function displayCycleReport(reportData){
	  if (reportData.length == 0) {
	        show("cyclesTableEmpty");
	        hide("cyclesTableHeaders");
	    }
	    else {
	        hide("cyclesTableEmpty");
	        show("cyclesTableHeaders");
	        dwr.util.addRows("cyclesTable", reportData,
	            [
	                function(data) { return data.dsXid },
	                function(data) { return data.dpXid },
	                function(data) { return data.message }
	            ],
	            {
	                rowCreator:function(options) {
	                    var tr = document.createElement("tr");
	                    tr.className = "smRow"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
	                    return tr;
	                },
	                cellCreator: function(options){
	                	
	                	 var td = document.createElement("td");
	                	 if(options.cellNum == 2)
	                	 	td.style.color = "red";
	                	 return td;
	                }
	        		
	            }
	        );
  		}
	}
	
	function logLevelChanged() {
		MetaEditDwr.getLogPath(currentPoint.id, function(response){
		      var logLevelPath = dojo.byId("logPathMsg");
		      logLevelPath.innerHTML = response;

		      if ($get("logLevel") == <%= ScriptLog.LogLevel.NONE %>) {
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
	
    /**
     * Generate history for a meta point
     * if from = -1 then the earliest context point is used
     * if to = -1 then only history prior to the meta point's first value is used
     */
    function generateDataSourceHistory() {
        var from = createDateTime(historyFromDate, historyFromTime);
        var to = createDateTime(historyToDate, historyToTime);
        startImageFader("dataSourceHistoryClock", true);
        dwr.util.removeAllRows("historyTable");
        MetaEditDwr.generateMetaPointsHistory(currentDsId, from, to, $get("purgeWhileGenerating"), function(result) {
        	stopImageFader("dataSourceHistoryClock");

            //Fill in the results table
            if (result.data.results.length == 0) {
	        	show("historyTableEmpty");
	       		hide("historyTableHeaders");
	    	}
	    	else {
	        	hide("historyTableEmpty");
	        	show("historyTableHeaders");
	        	dwr.util.addRows("historyTable", result.data.results,
	            [
	                function(data) { return data.xid },
	                function(data) { return data.message }
	            ],
	            {
	                rowCreator:function(options) {
	                    var tr = document.createElement("tr");
	                    tr.className = "smRow"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
	                    return tr;
	                },
	                cellCreator: function(options){
	                	 var td = document.createElement("td");
	                	 if(options.cellNum == 1)
	                	 	td.style.color = "red";
	                	 return td;
	                }
	        		
	            }
	        );
  		}
        });
        generateHistoryDialog.hide();
    }
    
    //Signal to disconnect
    var generateDataSourceHistorySignal;
    
	function showDataSourceGenerateHistory(){
      MetaEditDwr.getDataSourceGenerateHistoryDateRange(currentDsId, function(response){
          if(response.hasMessages){
              showDwrMessages(response.messages);
          }else{
              fromDate.set('value', response.data.from);
              fromTime.set('value', response.data.from);
              toDate.set('value', response.data.to);
              toTime.set('value', response.data.to);
          }
          //Set the onClick for the button
		  var btn = dojo.byId('generateHistoryButton');
          generateDataSourceHistorySignal = dojo.on(btn,"click", generateDataSourceHistory);
          //Remove the other if necessary
          if(typeof generatePointHistorySignal != 'undefined')
        	  generatePointHistorySignal.remove();
          generateHistoryDialog.show();          
      });

	}

</script>

<div data-dojo-type="dijit/Dialog" data-dojo-id="generateHistoryDialog" title="<fmt:message key='dsEdit.meta.generate'/>" style="display: none">
   <input id="generateHistoryPointId" type="hidden" />
   <div id="historyDateSelectionDiv"></div>
   <button id="generateHistoryButton" type="button"><fmt:message key="dsEdit.meta.generate"/></button>&nbsp;<input type="checkbox" id="purgeWhileGenerating" title="Delete existing"/>
   <span><fmt:message key="dsEdit.meta.deleteBeforeGenerating"/></span>
    <div class="dijitDialogPaneActionBar">
      <button data-dojo-type="dijit/form/Button" type="button" data-dojo-props="onClick:function() {generateHistoryDialog.hide();}"><fmt:message key="common.close"/></button>
    </div>
</div>
<tag:dataSourceAttrs descriptionKey="dsEdit.meta.desc" helpId="metaDS">
	<tr>
		<td class="formLabel">Verify All Meta Data Points</td>
		<td class="formField"><button onclick="checkForCycles();">verify</button></td>
	</tr>
   <tr>
      <td colspan="2">
        <table>
          <tr id="cyclesTableEmpty" style="display:none; color: green"><td colspan="3">No Problems Found</td></tr>
          <tr id="cyclesTableHeaders" style="display:none"><th>Data Source XID</th><th>Point XID</th><th>Message</th></tr>
          <tbody id="cyclesTable"></tbody>
        </table>
      </td>
   </tr>
   <tr>
    <td class="formLabel"><fmt:message key="dsEdit.meta.generate"/></td>
    <td class="formField"><img id="dataSourceHistoryClock" src="${modulePath}/web/clock-history.png" onclick="showDataSourceGenerateHistory();"></img></td>
  </tr>
   <tr>
      <td colspan="2">
        <table>
          <tr id="historyTableEmpty" style="display:none; color: green"><td colspan="3">No data generated</td></tr>
          <tr id="historyTableHeaders" style="display:none"><th>Point XID</th><th>Result</th></tr>
          <tbody id="historyTable"></tbody>
        </table>
      </td>
   </tr>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="metaPP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions id="dataTypeId" excludeImage="true"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.settable"/></td>
    <td class="formField"><input type="checkbox" id="settable"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.meta.variableName"/></td>
    <td class="formField"><input type="text" id="variableName"/></td>
  </tr>
  <tag:scriptPermissions></tag:scriptPermissions>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.meta.scriptContext"/></td>
    <td class="formField">
      <div id="pointLookup"></div>
      
      <table cellspacing="1" id="contextContainer">
        <tbody id="contextTableEmpty" style="display:none;">
          <tr><th colspan="4"><fmt:message key="dsEdit.meta.noPoints"/></th></tr>
        </tbody>
        <tbody id="contextTableHeaders" style="display:none;">
          <tr class="smRowHeader">
            <td><fmt:message key="dsEdit.meta.pointName"/></td>
            <td><fmt:message key="dsEdit.pointDataType"/></td>
            <td><fmt:message key="dsEdit.meta.var"/></td>
            <td id="updateContextTh" ><fmt:message key="dsEdit.meta.updatesContext"/></td>
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
      <fmt:message key="dsEdit.meta.script"/> <tag:img png="accept" onclick="validateScript();" title="common.validate"/>
    </td>
    <td class="formField">
      <div id="script" style="font-family: Courier New !important; position: relative; height:400px; width:700px"></div>
      <div id="scriptValidationOutput" style="display:none;color:green; width: 100%px; overflow: auto"></div>
     </td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="common.logging.logLevel"/></td>
    <td class="formField">
      <tag:exportCodesOptions id="logLevel" optionList="<%= ScriptLog.LOG_LEVEL_CODES.getIdKeys() %>"
              onchange="logLevelChanged()"/>
      <div id="logPathMsg">
      </div>
    </td>
  </tr>  
  <tr id="logSizeRow">
    <td class="formLabelRequired"><fmt:message key="dsEdit.logFileSizeMB"/></td>
    <td class="formField"><input type="number" id="logSize"/></td>
  </tr>
  <tr id="logCountRow">
    <td class="formLabelRequired"><fmt:message key="dsEdit.logFileCount"/></td>
    <td class="formField"><input type="number" id="logCount"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.meta.event"/></td>
    <td class="formField">
      <select id="updateEvent" onchange="updateEventChanged()">
        <option value="<c:out value="<%= MetaPointLocatorVO.UPDATE_EVENT_NONE %>"/>"><fmt:message key="dsEdit.meta.event.none"/></option>
        <option value="<c:out value="<%= Common.TimePeriods.MINUTES %>"/>"><fmt:message key="dsEdit.meta.event.minute"/></option>
        <option value="<c:out value="<%= Common.TimePeriods.HOURS %>"/>"><fmt:message key="dsEdit.meta.event.hour"/></option>
        <option value="<c:out value="<%= Common.TimePeriods.DAYS %>"/>"><fmt:message key="dsEdit.meta.event.day"/></option>
        <option value="<c:out value="<%= Common.TimePeriods.WEEKS %>"/>"><fmt:message key="dsEdit.meta.event.week"/></option>
        <option value="<c:out value="<%= Common.TimePeriods.MONTHS %>"/>"><fmt:message key="dsEdit.meta.event.month"/></option>
        <option value="<c:out value="<%= Common.TimePeriods.YEARS %>"/>"><fmt:message key="dsEdit.meta.event.year"/></option>
        <option value="<c:out value="<%= MetaPointLocatorVO.UPDATE_EVENT_CRON %>"/>"><fmt:message key="dsEdit.meta.event.cron"/></option>
      </select>
    </td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.meta.contextEvent"/></td>
    <td class="formField"><select id="contextUpdateEvent">
	        <option value="<c:out value="<%= MetaPointLocatorVO.UPDATE_EVENT_CONTEXT_UPDATE %>"/>"><fmt:message key="dsEdit.pointEvent.update"/></option>
	        <option value="<c:out value="<%= MetaPointLocatorVO.UPDATE_EVENT_CONTEXT_CHANGE %>"/>"><fmt:message key="dsEdit.pointEvent.change"/></option>
	        <option value="<c:out value="<%= MetaPointLocatorVO.UPDATE_EVENT_CONTEXT_LOGGED %>"/>"><fmt:message key="dsEdit.pointEvent.logged"/></option>
	        </select>
	 </td>
  </tr>
  
  <tr id="updateCronPatternRow">
    <td class="formLabelRequired"><fmt:message key="dsEdit.meta.event.cron"/></td>
    <td class="formField"><input id="updateCronPattern" type="text"/> <tag:help id="cronPatterns"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.meta.delay"/></td>
    <td class="formField"><input id="executionDelaySeconds" type="text" class="formShort"/></td>
  </tr>
</tag:pointList>
<script src="/resources/ace/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/theme-tomorrow_night_bright.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/mode-javascript.js" type="text/javascript" charset="utf-8"></script>
<script src="/resources/ace/worker-javascript.js" type="text/javascript" charset="utf-8"></script>
<script>
	ace.config.set("basePath", "/resources/ace");
    var editor = ace.edit("script");
    editor.setTheme("ace/theme/tomorrow_night_bright");
    var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
    editor.getSession().setMode(new JavaScriptMode());
</script>