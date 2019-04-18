<%--
    Copyright (C) 2013 Infinite Automation All rights reserved.
    @author Phillip Dunlap
--%><%@ include file="/WEB-INF/jsp/include/tech.jsp"%>
<%@page import="com.serotonin.m2m2.Common"%>
<%@page import="com.infiniteautomation.jsonfileimporter.JSONFileImporterDefinition" %>
<%@page import="com.infiniteautomation.jsonfileimporter.JSONFileImportJob" %>

<c:set var="jsonImportPeriods"><%= JSONFileImporterDefinition.JSON_IMPORT_UPDATE_PERIODS %></c:set>
<c:set var="jsonImportPeriodType"><%= JSONFileImporterDefinition.JSON_IMPORT_UPDATE_PERIOD_TYPE %></c:set>
<c:set var="jsonImportDirectory"><%= JSONFileImporterDefinition.JSON_IMPORT_DIRECTORY %></c:set>
<c:set var="jsonImportPrefix"><%= JSONFileImporterDefinition.JSON_IMPORT_IMPORT_PREFIX %></c:set>
<c:set var="jsonImportImportedPrefix"><%= JSONFileImporterDefinition.JSON_IMPORT_IMPORTED_PREFIX %></c:set>
<c:set var="jsonImportDefaultImportedPrefix"><%= JSONFileImportJob.DEFAULT_PREFIX %></c:set>

<script type="text/javascript" src="/dwr/interface/JSONFileImporterEditDwr.js"></script>
<script type="text/javascript" src="/modules/jsonFileImport/web/jsonFileUpload.js"></script>

<script type="text/javascript">
	var uploadTranslatedMessage = '<fmt:message key='systemSettings.jsonfile.upload' />';
	function clearRenameList() {
		JSONFileImporterEditDwr.clearImportFailureList();
	}
	
	/**
	 * Check if the file to be read exists and is readable.
	 */
	  function checkFile() {
		  fileTestButton(true);
		  JSONFileImporterEditDwr.checkIsFileReadable($get("${jsonImportDirectory}"), checkFileCB);
	  }
	  
	  function fileTestButton(testing) {
		  setDisabled($("fileTestButton"), testing);
	  }
	  
	  function checkFileCB(result) {
		  if(result)
	   		$set("fileTestMessage", "<fmt:message key="systemSettings.jsonfile.fileExists"/>");
		  else
			$set("fileTestMessage", "<fmt:message key="systemSettings.jsonfile.fileDoesNotExist"/>")
	      fileTestButton(false);
	  }
	  
	  function saveJSONImportSettings() {
		  setUserMessage("jsonImportSaveMessage");
		  setDisabled("saveJsonImportSettings", true);
		  
		  var settings = {};
		  settings["${jsonImportPeriods}"] = $get("${jsonImportPeriods}");
		  settings["${jsonImportPeriodType}"] = $get("${jsonImportPeriodType}");
		  settings["${jsonImportDirectory}"] = $get("${jsonImportDirectory}");
		  settings["${jsonImportPrefix}"] = $get("${jsonImportPrefix}");
		  settings["${jsonImportImportedPrefix}"] = $get("${jsonImportImportedPrefix}");
		  SystemSettingsDwr.saveSettings(settings, function(){
			  setDisabled("saveJsonImportSettings", false);
			  JSONFileImporterEditDwr.restartTask(function(){
					setUserMessage("jsonImportSaveMessage", "<fmt:message key="systemSettings.jsonfile.jsonImportSettingsSaved"/>");
			  });
		  });
	  }
	  
	  function importJsonNow(){
		  setUserMessage("jsonImportSaveMessage", "");
		  JSONFileImporterEditDwr.runImportTask(function(status){
			  setUserMessage("jsonImportSaveMessage", status);
		  });
	  }
</script>

<table>
<tr>
  <td class="formLabelRequired"><fmt:message key="systemSettings.importPeriod"/></td>
  <td class="formField">
    <input type="text" id="${jsonImportPeriods}" value="<m2m2:systemSetting key="${jsonImportPeriods}" defaultValue="0"/>" class="formShort"/>
    <c:set var="type"><%= Common.TimePeriods.MONTHS %></c:set>
    <c:set var="periods"><m2m2:systemSetting key="${jsonImportPeriodType}" defaultValue="${type}"/></c:set>
    <tag:timePeriods id="${jsonImportPeriodType}" s="true" min="true" h="true" d="true" value="${periods}"/>
  </td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="systemSettings.jsonfile.path"/></td>
 <td>
  <input class="formLong" id="${jsonImportDirectory}" type="text" value="<m2m2:systemSetting key="${jsonImportDirectory}" defaultValue=""/>"></input>
  <input id="importNow" type="button" value="<fmt:message key="systemSettings.jsonfile.importNow"/>" onclick="importJsonNow();"></input>
 </td>
</tr>
<tr>
 <td align="right"><input id="fileTestButton" type="button" value="<fmt:message key="systemSettings.jsonfile.check"/>" onclick="checkFile();"></input>
 <input id="clearRenames" type="button" value="<fmt:message key="systemSettings.jsonfile.clear"/>" onclick="clearRenameList();"></input></td>
 <td class="formError" id="fileTestMessage"></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="systemSettings.jsonfile.newPrefix"/></td>
 <td><input id="${jsonImportPrefix}" type="text" value="<m2m2:systemSetting key="${jsonImportPrefix}" defaultValue=""/>"></input></td>
</tr>
<tr>
 <td class="formLabelRequired"><fmt:message key="systemSettings.jsonfile.importedPrefix"/></td>
 <td><input id="${jsonImportImportedPrefix}" type="text" value="<m2m2:systemSetting key="${jsonImportImportedPrefix}" defaultValue="${jsonImportDefaultImportedPrefix}"/>"></input></td>
</tr>
<tr>
 <td colspan="2" align="center">
 <input id="uploadJsonButton" type="button" value="<fmt:message key="systemSettings.jsonfile.upload"/>" onclick="showJsonFileUpload();"></input>
 <input id="saveJsonImportSettings" type="button" value="<fmt:message key="systemSettings.jsonfile.save" />" onclick="saveJSONImportSettings()">
 <img src="/images/help.png" alt="Help" title="Help" class="ptr" onclick="help('jsonFileImporter', this);" style="display:inline"></td>
</tr>
<tr><td colspan="2" id="jsonImportSaveMessage" class="formError"></td></tr>
</table>
<div id="jsonFileUpload">
  <div id="jsonFileUploadContent" class="dijitDialogPaneContentArea">
    <form id="jsonFileUploadForm" method="post" action="/upload.shtm" enctype="multipart/form-data">
      <fieldset>
        <div id="jsonFileList" class="mangoTable"></div>
        <hr>
        <input type="file" id="jsonFileForUpload" name="uploadedfile" multiple="multiple" />
        <input type="button" id="jsonFileReset" />
        <input type="submit" id="jsonFileSubmit" />
        <input type="hidden" id="${_csrf.parameterName}" name="${_csrf.parameterName}" value="${_csrf.token}"/> 
        <img id="processingImage" src="/images/throbber.gif" style="vertical-align: bottom; display:none"/>
      </fieldset>
    </form>
    <div id="jsonUploadErrorBox" class="borderDiv" style="display:none">
      <tag:img id="closeUploadErrorBoxImg" png="cross" onclick="closeJsonUploadErrorBox()" title="common.view.clearErrors"/>
      <div id="jsonUploadErrors"></div>
    </div>    
    <div id="jsonFileUploadStatus" style="height: 100px; width:350px;"></div>
  </div>
  
  <div class="dijitDialogPaneActionBar">
    <button type="button" id="jsonFileUploadClose" ><fmt:message key="common.close" /></button>
  </div>
</div>
