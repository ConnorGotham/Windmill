<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@page import="com.serotonin.m2m2.DataTypes"%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>

<script type="text/javascript">
  function testValueParams() {
      startImageFader("valueTestImg", true);
      hide("valueTestRow");
      HttpDataSourceDwr.testHttpRetrieverValueParams($get("url"), $get("timeoutSeconds"), $get("retries"),
              $get("valueRegex"), $get("valueGroup"), $get("dataTypeId"), $get("valueFormat"), testValueParamsCB);
  }
  
  function testValueParamsCB(result) {
      stopImageFader("valueTestImg");
      show("valueTestRow");
      $set("valueTestResult", encodeHtml(result));
  }

  function testTimeParams() {
      startImageFader("timeTestImg", true);
      hide("timeTestRow");
      HttpDataSourceDwr.testHttpRetrieverTimeParams($get("url"), $get("timeoutSeconds"), $get("retries"),
              $get("timeRegex"), $get("timeGroup"), $get("timeFormat"), testTimeParamsCB);
  }
  
  function testTimeParamsCB(result) {
      stopImageFader("timeTestImg");
      show("timeTestRow");
      $set("timeTestResult", result);
  }

  function saveDataSourceImpl(basic) {
	  HttpDataSourceDwr.saveHttpRetrieverDataSource(basic, $get("updatePeriods"), $get("updatePeriodType"),
	          $get("quantize"), $get("url"), $get("timeoutSeconds"), $get("retries"), $get("setPointUrl"), 
	          saveDataSourceCB);
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key="dsEdit.httpRetriever.regex"/>";
      pointListColumnFunctions[pointListColumnFunctions.length] =
          function(p) { return encodeHtml(p.pointLocator.valueRegex); };
  }
  
  function editPointCBImpl(locator) {
      $set("valueRegex", locator.valueRegex);
      $set("ignoreIfMissing", locator.ignoreIfMissing);
      $set("dataTypeId", locator.dataTypeId);
      $set("valueFormat", locator.valueFormat);
      $set("timeRegex", locator.timeRegex);
      $set("timeFormat", locator.timeFormat);
      $set("settable", locator.settable);
      $set("setPointName", locator.setPointName);
      $set("valueGroup", locator.valueGroup);
      $set("timeGroup", locator.timeGroup);
      
      dataTypeChanged();
      timeRegexKU();
  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.relinquishable;
      
      locator.valueRegex = $get("valueRegex");
      locator.ignoreIfMissing = $get("ignoreIfMissing");
      locator.dataTypeId = $get("dataTypeId");
      locator.valueFormat = $get("valueFormat");
      locator.timeRegex = $get("timeRegex");
      locator.timeFormat = $get("timeFormat");
      locator.settable = $get("settable");
      locator.setPointName = $get("setPointName");
      locator.valueGroup = $get("valueGroup");
      locator.timeGroup = $get("timeGroup");
      
      HttpDataSourceDwr.saveHttpRetrieverPointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  function dataTypeChanged() {
      var dataTypeId = $get("dataTypeId");
      if (dataTypeId == <%= DataTypes.BINARY %>) {
          show("valueFormatRow");
          hide("numberFormatHelp");
          $set("valueFormatLabel", "<fmt:message key="dsEdit.httpRetriever.binaryZeroValue"/>");
      }
      else if (dataTypeId == <%= DataTypes.NUMERIC %>) {
          show("valueFormatRow");
          show("numberFormatHelp");
          $set("valueFormatLabel", "<fmt:message key="dsEdit.httpRetriever.numberFormat"/>");
      }
      else {
          hide("numberFormatHelp");
          hide("valueFormatRow");
      }
  }
  
  function timeRegexKU() {
      var timeRegexLen = $get("timeRegex").trim().length;
      display("timeFormatRow", timeRegexLen > 0);
  }
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.httpRetriever.desc" helpId="httpRetrieverDS">
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.updatePeriod"/></td>
      <td class="formField">
        <input type="text" id="updatePeriods" value="${dataSource.updatePeriods}" class="formShort"/>
        <tag:timePeriods id="updatePeriodType" value="${dataSource.updatePeriodType}" ms="true" s="true" min="true" h="true"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.quantize"/></td>
      <td class="formField"><sst:checkbox id="quantize" selectedValue="${dataSource.quantize}"/></td>
    </tr>
          
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpRetriever.url"/></td>
      <td class="formField">
        <input id="url" type="text" value="${dataSource.url}" class="formLong"/>
        <tag:img png="bullet_go" onclick="window.open($get('url'), 'httpRetrieverTarget')" title="dsEdit.httpRetriever.openUrl"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpRetriever.timeout"/></td>
      <td class="formField"><input id="timeoutSeconds" type="text" value="${dataSource.timeoutSeconds}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpRetriever.retries"/></td>
      <td class="formField"><input id="retries" type="text" value="${dataSource.retries}"/></td>
    </tr>
    
    <tr>
      <td class="formLabel"><fmt:message key="http.dsEdit.setPointUrl"/></td>
      <td class="formField"><input id="setPointUrl" type="text" value="${dataSource.setPointUrl}" class="formLong"/></td>
    </tr>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="httpRetrieverPP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions name="dataTypeId" onchange="dataTypeChanged();" excludeImage="true"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired">
      <fmt:message key="dsEdit.httpRetriever.valueRegex"/>
      <tag:img id="valueTestImg" png="accept" title="dsEdit.httpRetriever.testValue" onclick="testValueParams()"/>
    </td>
    <td class="formField">
      <input type="text" id="valueRegex" class="formLong"/>
      <tag:help id="regex"/>
    </td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpRetriever.valueGroup"/></td>
    <td class="formField"><input id="valueGroup" type="number" /></td>
  </tr>
  
  
  <tbody id="valueTestRow" style="display:none">
    <tr>
      <td></td>
      <td id="valueTestResult"></td>
    </tr>
  </tbody>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpRetriever.ignoreIfMissing"/></td>
    <td class="formField"><input type="checkbox" id="ignoreIfMissing"/></td>
  </tr>
  
  <tbody id="valueFormatRow">
    <tr>
      <td id="valueFormatLabel" class="formLabel"></td>
      <td class="formField">
        <input type="text" id="valueFormat"/>
        <span id="numberFormatHelp"><tag:help id="numberFormats"/></span>
      </td>
    </tr>
  </tbody>
  
  <tr>
    <td class="formLabel">
      <fmt:message key="dsEdit.httpRetriever.timeRegex"/>
      <tag:img id="timeTestImg" png="accept" title="dsEdit.httpRetriever.testTime" onclick="testTimeParams()"/>
    </td>
    <td class="formField">
      <input type="text" id="timeRegex" onkeyup="timeRegexKU()" class="formLong"/>
      <tag:help id="regex"/>
    </td>
  </tr>
    <tr>
    <td class="formLabel"><fmt:message key="dsEdit.httpRetriever.timeGroup"/></td>
    <td class="formField"><input id="timeGroup" type="number" /></td>
  </tr>
  <tbody id="timeTestRow" style="display:none">
    <tr>
      <td></td>
      <td id="timeTestResult"></td>
    </tr>
  </tbody>
  
  <tbody id="timeFormatRow">
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpRetriever.timeFormat"/></td>
      <td class="formField">
        <input type="text" id="timeFormat"/>
        <tag:help id="datetimeFormats"/>
      </td>
    </tr>
  </tbody>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.settable"/></td>
    <td class="formField"><input type="checkbox" id="settable"/></td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="http.dsEdit.setPointName"/></td>
    <td class="formField"><input type="text" id="setPointName"/></td>
  </tr>
</tag:pointList>