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
      Pop3EditDwr.testPop3ValueParams($get("testData"), $get("valueRegex"), $get("dataTypeId"),
              $get("valueFormat"), testValueParamsCB);
  }
  
  function testValueParamsCB(result) {
      stopImageFader("valueTestImg");
      show("valueTestRow");
      $set("valueTestResult", encodeHtml(result));
  }

  function testTimeParams() {
      startImageFader("timeTestImg", true);
      hide("timeTestRow");
      Pop3EditDwr.testPop3TimeParams($get("testData"), $get("timeRegex"), $get("timeFormat"), testTimeParamsCB);
  }
  
  function testTimeParamsCB(result) {
      stopImageFader("timeTestImg");
      show("timeTestRow");
      $set("timeTestResult", result);
  }

  function saveDataSourceImpl(basic) {
      Pop3EditDwr.savePop3DataSource(basic, $get("updatePeriods"),
              $get("updatePeriodType"), $get("pop3Server"), $get("username"), $get("password"), saveDataSourceCB);
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key="dsEdit.pop3.regex"/>";
      pointListColumnFunctions[pointListColumnFunctions.length] =
          function(p) { return encodeHtml(p.pointLocator.valueRegex); };
  }
  
  function editPointCBImpl(locator) {
      $set("findInSubject", locator.findInSubject);
      $set("valueRegex", locator.valueRegex);
      $set("ignoreIfMissing", locator.ignoreIfMissing);
      $set("dataTypeId", locator.dataTypeId);
      $set("valueFormat", locator.valueFormat);
      $set("useReceivedTime", locator.useReceivedTime);
      $set("timeRegex", locator.timeRegex);
      $set("timeFormat", locator.timeFormat);
      
      dataTypeChanged();
      useReceivedTimeChanged();
      timeRegexKU();
  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.relinquishable;

      locator.findInSubject = $get("findInSubject");
      locator.valueRegex = $get("valueRegex");
      locator.ignoreIfMissing = $get("ignoreIfMissing");
      locator.dataTypeId = $get("dataTypeId");
      locator.valueFormat = $get("valueFormat");
      locator.useReceivedTime = $get("useReceivedTime");
      locator.timeRegex = $get("timeRegex");
      locator.timeFormat = $get("timeFormat");
      
      Pop3EditDwr.savePop3PointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  function dataTypeChanged() {
      var dataTypeId = $get("dataTypeId");
      if (dataTypeId == <%= DataTypes.BINARY %>) {
          show("valueFormatRow");
          hide("numberFormatHelp");
          $set("valueFormatLabel", "<fmt:message key="dsEdit.pop3.binary0Value"/>");
      }
      else if (dataTypeId == <%= DataTypes.NUMERIC %>) {
          show("valueFormatRow");
          show("numberFormatHelp");
          $set("valueFormatLabel", "<fmt:message key="dsEdit.pop3.numberFormat"/>");
      }
      else {
          hide("numberFormatHelp");
          hide("valueFormatRow");
      }
  }
  
  function useReceivedTimeChanged() {
      var useRec = $get("useReceivedTime");
      setDisabled("timeRegex", useRec);
      setDisabled("timeFormat", useRec);
  }
  
  function timeRegexKU() {
      var timeRegexLen = $get("timeRegex").trim().length;
      display("timeFormatRow", timeRegexLen > 0);
  }
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.pop3.desc" helpId="pop3DS">
  <jsp:attribute name="extraPanels">
    <td valign="top">
      <div class="borderDiv marB">
        <table>
          <tr><td class="smallTitle"><fmt:message key="dsEdit.pop3.testContent"/></td></tr>
          <tr><td><textarea id="testData" cols="60" rows="10"></textarea></td></tr>
        </table>
      </div>
    </td>
  </jsp:attribute>
  
  <jsp:body>
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.checkPeriod"/></td>
      <td class="formField">
        <input type="text" id="updatePeriods" value="${dataSource.updatePeriods}" class="formShort"/>
        <tag:timePeriods id="updatePeriodType" value="${dataSource.updatePeriodType}" s="true" min="true" h="true"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.server"/></td>
      <td class="formField"><input id="pop3Server" type="text" value="${dataSource.pop3Server}"
              class="formLong"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.username"/></td>
      <td class="formField"><input id="username" type="text" value="${dataSource.username}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.password"/></td>
      <td class="formField"><input id="password" type="text" value="${dataSource.password}"/></td>
    </tr>
  </jsp:body>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="pop3PP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions name="dataTypeId" onchange="dataTypeChanged()" excludeImage="true"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.findInSubject"/></td>
    <td class="formField"><input type="checkbox" id="findInSubject"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired">
      <fmt:message key="dsEdit.pop3.valueRegex"/>
      <tag:img id="valueTestImg" png="accept" title="dsEdit.pop3.testValue" onclick="testValueParams()"/>
    </td>
    <td class="formField">
      <input type="text" id="valueRegex" class="formLong"/>
      <tag:help id="regex"/>
    </td>
  </tr>
  
  <tbody id="valueTestRow" style="display:none">
    <tr>
      <td></td>
      <td id="valueTestResult"></td>
    </tr>
  </tbody>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.ignoreIfMissing"/></td>
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
    <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.useMessageTime"/></td>
    <td class="formField"><input type="checkbox" id="useReceivedTime" onclick="useReceivedTimeChanged()"/></td>
  </tr>
  
  <tr>
    <td class="formLabel">
      <fmt:message key="dsEdit.pop3.timeRegex"/>
      <tag:img id="timeTestImg" png="accept" title="dsEdit.pop3.testTime" onclick="testTimeParams()"/>
    </td>
    <td class="formField">
      <input type="text" id="timeRegex" onkeyup="timeRegexKU()" class="formLong"/>
      <tag:help id="regex"/>
    </td>
  </tr>
  
  <tbody id="timeTestRow" style="display:none">
    <tr>
      <td></td>
      <td id="timeTestResult"></td>
    </tr>
  </tbody>
  
  <tbody id="timeFormatRow">
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.pop3.timeFormat"/></td>
      <td class="formField">
        <input type="text" id="timeFormat"/>
        <tag:help id="datetimeFormats"/>
      </td>
    </tr>
  </tbody>
</tag:pointList>