<%--
    Copyright (C) 2017 Infinite Automation Systems Inc. All rights reserved.
    @author Terry Packer
--%>
<%@page import="com.serotonin.m2m2.DataTypes"%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>

<script type="text/javascript">

  function saveDataSourceImpl(basic) {
	  HaystackDataSourceDwr.saveDataSource(basic, $get("updatePeriods"), $get("updatePeriodType"), $get("quantize"),
	         $get("uri"), $get("username"), $get("password"), $get("connectTimeout"), $get("readTimeout"), saveDataSourceCB);
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key="dsEdit.haystack.id"/>";
      pointListColumnFunctions[pointListColumnFunctions.length] =
          function(p) { return encodeHtml(p.pointLocator.id); };
  }
  
  function editPointCBImpl(locator) {
      $set("dataTypeId", locator.dataTypeId);
      $set("settable", locator.settable);
      $set("id", locator.id);
  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.relinquishable;
      
      locator.dataTypeId = $get("dataTypeId");
      locator.settable = $get("settable");
      locator.id = $get("id");
      
      HaystackDataSourceDwr.savePointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  function dataTypeChanged() {

  }

</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.haystack" helpId="haystackDS">
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
      <td class="formLabelRequired"><fmt:message key="dsEdit.haystack.uri"/></td>
      <td class="formField">
        <input id="uri" type="text" value="${dataSource.uri}" class="formLong"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.haystack.username"/></td>
      <td class="formField">
        <input id="username" type="text" value="${dataSource.username}" class="formLong"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.haystack.password"/></td>
      <td class="formField">
        <input id="password" type="password" value="${dataSource.password}" class="formLong"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.haystack.connectTimeout"/></td>
      <td class="formField"><input id="connectTimeout" type="number" value="${dataSource.connectTimeout}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.haystack.readTimeout"/></td>
      <td class="formField"><input id="readTimeout" type="number" value="${dataSource.readTimeout}"/></td>
    </tr>
    
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="haystackPP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.haystack.id"/></td>
    <td class="formField"><input class="formVeryLong" type="string" id="id" /></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions name="dataTypeId" onchange="dataTypeChanged();" excludeImage="true"/></td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.settable"/></td>
    <td class="formField"><input type="checkbox" id="settable"/></td>
  </tr>
</tag:pointList>