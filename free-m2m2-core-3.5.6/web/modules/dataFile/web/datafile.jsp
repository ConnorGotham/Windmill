<%--
    Copyright (C) 2013 Infinite Automation Systems. All rights reserved.
    @author Phillip Dunlap
--%><%@ include file="/WEB-INF/jsp/include/tech.jsp"%>
<%@page import="com.infiniteautomation.datafilesource.rt.DataFileDataSourceRT" %>

<script type="text/javascript">
	var templateList;
	var pollClassList;
	var submitAction = "/rest/v2/data-file/${dataSource.xid}/import?${_csrf.parameterName}=${_csrf.token}";
	var submitTemplateAction = "/rest/v2/data-file/${dataSource.xid}/template?${_csrf.parameterName}=${_csrf.token}"
	
	//Setup the poll arguments table
	var dataFileArguments = [];
	<c:forEach items="${dataSource.pollArguments}" var="arg" >dataFileArguments.push("${fn:replace(arg, '\\', '\\\\')}");</c:forEach>
	dwr.util.removeAllRows("pollArgumentsTable");
    drawArgumentRows();
    
    function drawArgumentRows(){
    	dwr.util.removeAllRows("pollArgumentsTable");
    	dwr.util.addRows("pollArgumentsTable", dataFileArguments, [
    		function(m, options) { 
                	var html = '<input type="text" style="formLong" ' +  
                		'value="' +m +'"'+
                		' id="pollArgument' + options.rowIndex + '"></input>' +
                		'<img src="images/bullet_delete.png" onclick="removePollArgumentRow(' + options.rowIndex + ')"></img>';
              
        			return html; 
        		}],
            {
                rowCreator: function(options) {
                    var tr = document.createElement("tr");
                    tr.className = "row"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                    return tr;
                },
                cellCreator: function(options) {
                    var td = document.createElement("td");
                    return td;
                }
            }
        );
    }
	
    function addDataFileArgumentRow(){
    	for(var k = 0; k < dataFileArguments.length; k+=1) {
    		dataFileArguments[k] = $get("pollArgument" + k);
    	}
    	dataFileArguments.push('');
    	drawArgumentRows();
    }
    
    function getPollArguments() {
    	for(var k = 0; k < dataFileArguments.length; k+=1)
    		dataFileArguments[k] = $get("pollArgument" + k);
    	return dataFileArguments;
    }
    
    function removePollArgumentRow(index) {
    	dataFileArguments.pop(index);
    	drawArgumentRows();
    }
    
	function preSaveDataSourceCB(response) {
		if(!response.hasMessages)
			submitAction = "/rest/v2/data-file/"+response.data.vo.xid+"/import?${_csrf.parameterName}=${_csrf.token}"
		saveDataSourceCB(response);
	}

	function saveDataSourceImpl(basic){
	    var templateSelected = templateList.get("value");
	    if(templateSelected == "-1")
	        templateSelected = null;
	    var pollClassSelected = pollClassList.get("value");
	    if(pollClassSelected == "-1")
	    	pollClassSelected = null;
		  DataFileDataSourceEditDwr.saveFileDataSource(basic, $get("useCron"), $get("cronPattern"), $get("updatePeriods"), $get("updatePeriodType"), $get("fileType"), $get("filePath"), 
				  $get("sortValues"), $get("deleteAfterImport"), $get("createPoints"), $get("importedPrefix"), templateSelected, pollClassSelected,
				  getPollArguments(), $get("additionalClasspath"), preSaveDataSourceCB);
	}
	
	function selectOptions() {
		switch(${dataSource.fileType}) {
		case <c:out value="<%= DataFileDataSourceRT.XML_TYPE %>"/> :
			dojo.byId("xmlType").selected = "selected";
			break;
		case <c:out value="<%= DataFileDataSourceRT.CSV_TYPE %>"/> :
			dojo.byId("csvType").selected = "selected";
			break;
		case <c:out value="<%= DataFileDataSourceRT.EXCEL_TYPE %>"/> :
			dojo.byId("excelType").selected = "selected";
			break;
		case <c:out value="<%= DataFileDataSourceRT.BINARY_TYPE %>"/> :
			dojo.byId("binaryType").selected = "selected";
			break;
		case <c:out value="<%= DataFileDataSourceRT.EXCEL_WORKBOOK_TYPE %>"/> :
			dojo.byId("excelWorkbookType").selected = "selected";
			break;
		}
	}
	
	var selectedId;
	var pointsArray = new Array();
	
	function initImpl() {
		selectOptions();
		
		DataFileDataSourceEditDwr.getTemplateLists(${dataSource.fileType}, function(resp){
			var options = [];
			resp.data.templates.forEach(function(template) {
				if(template == resp.data.selected) {
					options.push({"label":template, "value":template, "selected":true});
				}
				else
					options.push({"label":template, "value":template});
			});
			templateList.reset();
			templateList.set("options", options);
			templateList.startup();
			
			options = [];
			if(resp.data.selectedPollClass === null || resp.data.selectedPollClass === "")
				options.push({"label":"None", "value": "", "selected":true});
			else
				options.push({"label":"None", "value": ""});
			
			resp.data.pollClass.forEach(function(template) {
				if(template == resp.data.selectedPollClass) {
					options.push({"label":template, "value":template, "selected":true});
				}
				else
					options.push({"label":template, "value":template});
			});
			pollClassList.reset();
			pollClassList.set("options", options);
			pollClassList.startup();
		});
		if(${dataSource.deleteAfterImport}) {
			dojo.byId("deleteAfterImport").checked = "true";
			hidePrefix();
		}
		if(${dataSource.sortValues})
			dojo.byId("sortValues").checked = "true";
		if(${dataSource.createPoints})
			dojo.byId("createPoints").checked = "true";
		if(${dataSource.useCron}) {
			dojo.byId("useCron").checked = "true";
		}
		toggleCron();
	  <c:forEach items="${userPoints}" var="dp">
        pointsArray[pointsArray.length] = {
            id : ${dp.id}, 
            name : '${sst:escapeLessThan(sst:quotEncode(dp.extendedName))}'.replace("&lt;", "<"),
            type : '<m2m2:translate message="${dp.dataTypeMessage}" escapeDQuotes="true"/>',
        };
      </c:forEach>
		
		new dijit.form.FilteringSelect({
	        store: new dojo.store.Memory({ data: pointsArray }),
	        labelType: "html",
	        labelAttr: "name",
	        searchAttr: "name",
	        autoComplete: false,
	        style: "width: 254px;",
	        queryExpr: "*\${0}*",
	        highlightMatch: "all",
	        required: false,
    	    onChange: function(point) {
            	if (this.item) 
            		selectedId = this.item.id;
	        }
	    }, "toId");
	}
	
// 	/**
// 	 * Check if the file to be read exists and is readable.
// 	 */
	  function checkFile() {
		  fileTestButton(true);
		  DataFileDataSourceEditDwr.checkDoesFileExist($get("filePath"), checkFileCB);
	  }
	  
	  function fileTestButton(testing) {
		  setDisabled($("fileTestButton"), testing);
	  }
	  
	  function checkFileCB(result) {
		  if(result)
	   		$set("fileTestMessage", "<fmt:message key="dsEdit.datafile.fileExists"/>");
		  else
			$set("fileTestMessage", "<fmt:message key="dsEdit.datafile.fileDoesNotExist"/>");
	      fileTestButton(false);
	  }
	  
	  function hidePrefix() {
		  if(dojo.byId("deleteAfterImport").checked)
			  $("importedPrefixRow").style.visibility = "collapse";
		  else 
			  $("importedPrefixRow").style.visibility = "visible";
	  }
	  
	  function hideMapping() {
		  if(!dojo.byId("mappingPoint").checked)
			  $("toIdRow").style.visibility = "collapse";
		  else 
			  $("toIdRow").style.visibility = "visible";
	  }
	  
	  function toggleCron() {
		  if(dojo.byId("useCron").checked) {
			  $("cronPatternRow").style.visibility = "visible";
			  $("updatePeriodRow").style.visibility = "collapse";
		  }
		  else {
			  $("cronPatternRow").style.visibility = "collapse";
			  $("updatePeriodRow").style.visibility = "visible";
		  }
	  }

// 	/**
// 	 * Add a Point
// 	 */
	  function addPointImpl() {
		  DataSourceEditDwr.getPoint(-1, function(point) {
			  editPointCB(point);
		  });
	  }
		
	  function editPointCBImpl(locator) {
		  $set("mappingPoint", locator.isMappingPoint);
		  $set("fromIdentifier",locator.fromIdentifier);
		  selectedId = locator.toId;
		  updateToId();
		  //$set("toId",locator.toId);
		  $set("dataTypeId",locator.dataTypeId);
		  
		  if(!locator.isMappingPoint)
			  $("toIdRow").style.visibility = "collapse";
		  else
			  $("toIdRow").style.visibility = "visible";
		  
		  $set("settable", locator.settable);
	  }
	  
	  function updateToId() {
		  for(item in pointsArray) {
			  if(pointsArray[item].id == selectedId) {
				  $set("toId",pointsArray[item].name);
				  return;
			  }
		  }
	  }
	  
	  /**
	   * Save a Point
	   */
	  function savePointImpl(locator) {
		  delete locator.isMappingPoint;
		  delete locator.fromIdentifier;
		  delete locator.toId;
		  delete locator.dataTypeId;
		  delete locator.settable;
		  
		  locator.isMappingPoint = $get("mappingPoint");
		  locator.fromIdentifier = $get("fromIdentifier");
		  locator.toId = selectedId;
		  locator.dataTypeId = $get("dataTypeId");
		  locator.settable = $get("settable");
		  
	      DataFileDataSourceEditDwr.savePointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
	  }
	  
  require(["dijit/form/Select", "dojo/domReady!"], 
		  function(Select, ValidationTextBox, CheckBox){
	templateList = new Select({id:"templateSelect"}, "templateList");
	pollClassList = new Select({id:"pollClassSelect"}, "pollClassList");
			  
  });
  
  /**
   * Helper to compile all templates
   */
  function compileTemplates(){
      
      dojo.byId("csvCompilerOutput").innerHTML = "";
      dojo.byId("csvFiles").innerHTML = "";

      
      DataFileDataSourceEditDwr.compileTemplates($get("additionalClasspath"), function(response){
          
    	  //Poll Results
          var pollFileListHTML = "<table>";
          for(var i=0; i<response.data.Pollfiles.length; i++){
              pollFileListHTML += "<tr><td>";
              pollFileListHTML += response.data.Pollfiles[i];
              pollFileListHTML += "</td></tr>";
          }
          pollFileListHTML += "</table>"
          dojo.byId("pollFiles").innerHTML = pollFileListHTML;
          
          if(response.data.Pollsuccess == false){
              dojo.byId("pollCompilerOutput").style.color = "red";
          }else{
              dojo.byId("pollCompilerOutput").style.color = "green";
          }
          dojo.byId("pollCompilerOutput").innerHTML = "<pre><code>" + response.data.PollcompilerOutput + "</code></pre>";
    	  
          //CSV Results
          var csvFileListHTML = "<table>";
          for(var i=0; i<response.data.CSVfiles.length; i++){
              csvFileListHTML += "<tr><td>";
              csvFileListHTML += response.data.CSVfiles[i];
              csvFileListHTML += "</td></tr>";
          }
          csvFileListHTML += "</table>"
          dojo.byId("csvFiles").innerHTML = csvFileListHTML;
          
          if(response.data.CSVsuccess == false){
              dojo.byId("csvCompilerOutput").style.color = "red";
          }else{
              dojo.byId("csvCompilerOutput").style.color = "green";
          }
          dojo.byId("csvCompilerOutput").innerHTML = "<pre><code>" + response.data.CSVcompilerOutput + "</code></pre>";

          //Excel Results
          var excelFileListHTML = "<table>";
          for(var i=0; i<response.data.Excelfiles.length; i++){
              excelFileListHTML += "<tr><td>";
              excelFileListHTML += response.data.Excelfiles[i];
              excelFileListHTML += "</td></tr>";
          }
          excelFileListHTML += "</table>"
          dojo.byId("excelFiles").innerHTML = excelFileListHTML;
          
          if(response.data.Excelsuccess == false){
              dojo.byId("excelCompilerOutput").style.color = "red";
          }else{
              dojo.byId("excelCompilerOutput").style.color = "green";
          }
          dojo.byId("excelCompilerOutput").innerHTML = "<pre><code>" + response.data.ExcelcompilerOutput + "</code></pre>";
          
          //Excel Workbook Results
          var excelWorkbookFileListHTML = "<table>";
          for(var i=0; i<response.data.ExcelWorkbookfiles.length; i++){
              excelWorkbookFileListHTML += "<tr><td>";
              excelWorkbookFileListHTML += response.data.ExcelWorkbookfiles[i];
              excelWorkbookFileListHTML += "</td></tr>";
          }
          excelWorkbookFileListHTML += "</table>"
          dojo.byId("excelFiles").innerHTML = excelWorkbookFileListHTML;
          
          if(response.data.ExcelWorkbooksuccess == false){
              dojo.byId("excelWorkbookCompilerOutput").style.color = "red";
          }else{
              dojo.byId("excelWorkbookCompilerOutput").style.color = "green";
          }
          dojo.byId("excelWorkbookCompilerOutput").innerHTML = "<pre><code>" + response.data.ExcelWorkbookcompilerOutput + "</code></pre>";

          //XML Results
          var xmlFileListHTML = "<table>";
          for(var i=0; i<response.data.XMLfiles.length; i++){
              xmlFileListHTML += "<tr><td>";
              xmlFileListHTML += response.data.XMLfiles[i];
              xmlFileListHTML += "</td></tr>";
          }
          xmlFileListHTML += "</table>"
          dojo.byId("xmlFiles").innerHTML = xmlFileListHTML;
          
          if(response.data.XMLsuccess == false){
              dojo.byId("xmlCompilerOutput").style.color = "red";
          }else{
              dojo.byId("xmlCompilerOutput").style.color = "green";
          }
          dojo.byId("xmlCompilerOutput").innerHTML = "<pre><code>" + response.data.XMLcompilerOutput + "</code></pre>";
        
          //Binary Results
          var binaryFileListHTML = "<table>";
          for(var i=0; i<response.data.Binaryfiles.length; i++){
              binaryFileListHTML += "<tr><td>";
              binaryFileListHTML += response.data.Binaryfiles[i];
              binaryFileListHTML += "</td></tr>";
          }
          binaryFileListHTML += "</table>"
          dojo.byId("binaryFiles").innerHTML = binaryFileListHTML;
          
          if(response.data.Binarysuccess == false){
              dojo.byId("binaryCompilerOutput").style.color = "red";
          }else{
              dojo.byId("binaryCompilerOutput").style.color = "green";
          }
          dojo.byId("binaryCompilerOutput").innerHTML = "<pre><code>" + response.data.BinarycompilerOutput + "</code></pre>";

          
          //Reload the lists...
          loadTemplates(true);
      });
  }
  
  /**
   * Helper to refresh template list when changing types
   */
  function loadTemplates(fromCompilation){
      DataFileDataSourceEditDwr.getTemplateLists( $get("fileType"), function(resp){
          var options = [];
          resp.data.templates.forEach(function(template) {
              if(template == resp.data.selected) {
                  options.push({"label":template, "value":template, "selected":true});
              }
              else
                  options.push({"label":template, "value":template});
          });
          if(options.length == 0)
              options.push({label: "No Templates", value: "-1", selected: true});
          templateList.reset();
          templateList.set("options", options);
          templateList.startup();
          
          if(fromCompilation) {
              options = [];
			  if(resp.data.selectedPollClass === null || resp.data.selectedPollClass === "")
			      options.push({"label":"None", "value": "", "selected":true});
			  else
				  options.push({"label":"None", "value": ""});
			
			  resp.data.pollClass.forEach(function(template) {
				  if(template == resp.data.selectedPollClass) {
					  options.push({"label":template, "value":template, "selected":true});
				  }
				  else
					  options.push({"label":template, "value":template});
			  });
			  pollClassList.reset();
			  pollClassList.set("options", options);
		      pollClassList.startup();
		  }
      });
  }
  
  /**
   * Function to submit the form via XHR
   */
   function submitFile(followLocation) {
	   var files = document.getElementById("msUploader").files;
	   if(files.length < 1) {
		   alert("<fmt:message key="datafile.rest.noFileSelected"/>");
		   return;
	   }
	   var formData = new FormData();
	
	   for(var i = 0; i < files.length; i+=1)
	   		formData.append('file'+i, files[i]);
	
	   var xhr = new XMLHttpRequest();
	   
	   xhr.open('POST', submitAction, true);
	   xhr.setRequestHeader("Accept", 'application/json');
	   
	   xhr.onload = function() {
		   if(xhr.status == 200) {
			   if(followLocation == true) {
				   alert("<fmt:message key="datafile.rest.statusRedirectToMonitor"/>");
				   setTimeout(function(){
				   		window.location = xhr.getResponseHeader("Location");
				   }, 5000);
			   }
			   else
				   alert("<fmt:message key="datafile.rest.fileSubmittedSuccessfully"/>");
		   }
		   else
			   alert("<fmt:message key="datafile.rest.fileSubmissionError"/> " + xhr.status + " - " + xhr.statusText);
	   }
	   xhr.onerror = function() {
		   alert("<fmt:message key="datafile.rest.fileSubmissionError"/> " + xhr.status + " - " + xhr.statusText);
	   }
	  
	   xhr.send(formData);
  }
  
  function submitTemplate() {
	  var files = document.getElementById("msTemplateUploader").files;
	  if(files.length < 1) {
		   alert("<fmt:message key="datafile.rest.noFileSelected"/>");
		   return;
	   }
	  
	   var formData = new FormData();
		
	   for(var i = 0; i < files.length; i+=1)
	   		formData.append('file'+i, files[i]);
	
	   formData.append('templateType', $get("templateUploadType"));
	   var xhr = new XMLHttpRequest();
	   
	   xhr.open('POST', submitTemplateAction, true);
	   xhr.setRequestHeader("Accept", 'application/json');
	   
	   xhr.onload = function() {
		   if(xhr.status == 200)
			   alert("<fmt:message key="datafile.rest.fileSubmittedSuccessfully"/>");
		   else
			   alert("<fmt:message key="datafile.rest.fileSubmissionError"/> " + xhr.status + " - " + xhr.statusText);
	   }
	   xhr.onerror = function() {
		   alert("<fmt:message key="datafile.rest.fileSubmissionError"/> " + xhr.status + " - " + xhr.statusText);
	   }
	  
	   xhr.send(formData);
  }
  
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.datafile.desc" helpId="dataFileDS">

<jsp:attribute name="extraPanels">
  <td valign="top">
    <div class="borderDiv marB marR" style="float:left;">
      <table>
         <tr><td colspan="3" class="smallTitle">Upload Templates</td></tr>
         <tr>
           <td colspan="3" align="center">
		        <hr>
		        <input type="file" id="msTemplateUploader" name="uploadedTemplate" multiple="multiple" />
		        <select id="templateUploadType">
			      <option value="XML">XML</option>
			      <option value="CSV">CSV</option>
			      <option value="Excel">Excel Sheet</option>
			      <option value="ExcelWorkbook">Excel Workbook</option>
			      <option value="Binary">Binary</option>
			      <option value="Poll">Poll</option>
			    </select>
		        <hr>
           </td>
         </tr>
         <tr>
           <td><input type="button" onclick="submitTemplate();" id="msSubmitTemplate" value="Submit"/></td>
         </tr>
       </table>
    </div>
    </td>
   <td valign="top">
     <div class="borderDiv marB marR" style="float:left;">
     	<table>
          <tr><td colspan="3" class="smallTitle">Import File</td></tr>
          <tr>
            <td colspan="3" align="center">
			        <hr>
			        <input type="file" id="msUploader" name="uploadedfile" multiple="multiple" />
			        <hr>
            </td>
          </tr>
          <tr>
            <td><input type="button" onclick="submitFile(false);" id="msSubmit" value="Submit, no import monitor"/></td>
	        <td><input type="button" onclick="submitFile(true);" id="msSubmit" value="Submit, get monitor"/></td>
          </tr>
        </table>
     </div>
     </td>
    <td valign="top">
      <div class="borderDiv marB marR" style="float:left;">
        <table>
          <tr><td colspan="3" class="smallTitle">Compile Templates</td></tr>
          <tr>
            <td colspan="3" align="center">
              <input id="compileButton" type="button" value="<fmt:message key="dsEdit.datafile.compile"/>" onclick="compileTemplates();"/>
            </td>
          </tr>
        </table>
        <table>
            <tr><th>Type</th><th>Files</th><th>Output</th></tr>
            <tr><td><b>Poll</b></td><td><div id="pollFiles"></div></td><td><div id="pollCompilerOutput"></div></td></tr>
            <tr><td><b>CSV</b></td><td><div id="csvFiles"></div></td><td><div id="csvCompilerOutput"></div></td></tr>
            <tr><td><b>Excel</b></td><td><div id="excelFiles"></div></td><td><div id="excelCompilerOutput"></div></td></tr>
            <tr><td><b>Excel Workbook</b></td><td><div id="excelWorkbookFiles"></div></td><td><div id="excelWorkbookCompilerOutput"></div></td></tr>
            <tr><td><b>XML</b></td><td><div id="xmlFiles"></div></td><td><div id="xmlCompilerOutput"></div></td></tr>
			<tr><td><b>Binary</b></td><td><div id="binaryFiles"></div></td><td><div id="binaryCompilerOutput"></div></td></tr>
        </table>
      </div>
     </td>
</jsp:attribute>


<jsp:body>
<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.useCron"/></td>
  <td><input id="useCron" type="checkbox" onchange="toggleCron()"/></td>
</tr>
<tr id="cronPatternRow">
	<td class="formLabelRequired"><fmt:message key="common.cronPattern"/></td>
  <td><input id="cronPattern" type="text" value="${dataSource.cronPattern}"/></td>
</tr>
 <tr id="updatePeriodRow">
  <td class="formLabelRequired"><fmt:message key="dsEdit.updatePeriod"/></td>
  <td class="formField">
    <input type="text" id="updatePeriods" value="${dataSource.updatePeriods}" class="formShort"/>
    <tag:timePeriods id="updatePeriodType" value="${dataSource.updatePeriodType}" s="true" min="true" h="true"/>
  </td>
</tr>
<tr>
  <td class="formLabel"><fmt:message key="dsEdit.datafile.pollClass"/></td>
  <td><div id="pollClassList"></div></td>
</tr>
<tr>
  <td class="formLabel"><fmt:message key="dsEdit.datafile.pollArguments"/>&nbsp;<img src="images/add.png" class="ptr" onclick="addDataFileArgumentRow()"/></td>
  <td>
  	<table>
  		<tbody id="pollArgumentsTable"></tbody>
  	</table>
</tr>
</tr>
<tr>
  <td class="formLabel"><fmt:message key="dsEdit.datafile.additionalClasspath"/></td>
  <td><input id="additionalClasspath" type="text" value="${dataSource.additionalClasspath}"></input></td>
</tr>
<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.fileType"/></td>
  <td>
    <select id="fileType" onchange="loadTemplates(false);">
      <option id="xmlType" value=<c:out value="<%= DataFileDataSourceRT.XML_TYPE %>"/>>XML</option>
      <option id="csvType" value=<c:out value="<%= DataFileDataSourceRT.CSV_TYPE %>"/>>CSV</option>
      <option id="excelType" value=<c:out value="<%= DataFileDataSourceRT.EXCEL_TYPE %>"/>>Excel Sheet</option>
      <option id="excelWorkbookType" value=<c:out value="<%= DataFileDataSourceRT.EXCEL_WORKBOOK_TYPE %>"/>>Excel Workbook</option>
      <option id="binaryType" value=<c:out value="<%= DataFileDataSourceRT.BINARY_TYPE %>"/>>Binary</option>
    </select>
</tr>
<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.createPoints"/></td>
  <td><input id="createPoints" type="checkbox"/></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.template"/></td>
 <td><div id="templateList"></div><input id="templateTestMessage" style="display:none;"/></td>
<tr>
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.path"/></td>
 <td><input id="filePath" type="text" value="${dataSource.filePath}"></input></td>
</tr>
<tr>
 <td align="right"><input id="fileTestButton" type="button" value="<fmt:message key="dsEdit.datafile.check"/>" onclick="checkFile();"></input></td>
 <td class="formError" id="fileTestMessage"></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.sortValues"/></td>
 <td><input id="sortValues" type="checkbox"></input></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.deleteAfterImport"/></td>
 <td><input id="deleteAfterImport" type="checkbox" onchange="hidePrefix();"></input></td>
</tr>
<tr id="importedPrefixRow">
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.importedPrefix"/></td>
 <td><input id="importedPrefix" type="text" value="${dataSource.addedPrefix}"></input></td>
</tr>
</jsp:body>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="dataFilePP">
 <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions id="dataTypeId" excludeImage="true"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.mappingPoint"/></td>
    <td><input id="mappingPoint" type="checkbox" onchange="hideMapping();"></input></td>
  </tr>
<tr id="toIdRow">
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.toPoint"/></td>
 <td><input id="toId" type="text" ></input></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="dsEdit.datafile.fromIdentifier"/></td>
 <td><input id="fromIdentifier" type="text" ></input></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="dsEdit.settable" /></td>
 <td class="formField"><input type="checkbox" id="settable"/></td>
</tr>
</tag:pointList>