<%--
    Copyright (C) 2015 Stellar Solutions. All rights reserved.
    @author Phillip Dunlap
--%>
<%@page import="com.infiniteautomation.egauge.vo.EgaugePointLocatorVO" %>
<%@ include  file="/WEB-INF/jsp/include/tech.jsp"%>

<script type="text/javascript">
	function saveDataSourceImpl(basic) {
		EgaugeDataSourceDwr.saveEgaugeDataSource(basic, $get("uri"), $get("updatePeriods"), $get("updatePeriodType"), $get("historyPeriods"), $get("historyPeriodType"),
				$get("queryHistory"), $get("timeoutSeconds"), $get("retries"), $get("tot"), $get("noTeam"), $get("teamstat"), $get("inst"), $get("createPoints"),
				$get("convertToKwh"), $get("interpolateInstantaneous"), $get("readBufferSizeMB"), saveDataSourceCB);
	}
	
	function initImpl() {
		document.getElementById("cumulative").setAttribute("value", <%= EgaugePointLocatorVO.CUMULATIVE %>);
		document.getElementById("instantaneous").setAttribute("value", <%= EgaugePointLocatorVO.INSTANTANEOUS %>);
	}
	
	function editPointCBImpl(locator) {
		$set("registerName", locator.registerName);
		$set("totallingRegister", locator.totallingRegister);
		$set("registerType", locator.registerType);
		$set("multiplier", locator.multiplier);
		$set("offset", locator.offset);
	} 
	
	function savePointImpl(locator) {
		delete locator.registerName;
		delete locator.totallingRegister;
		delete locator.registerType;
		delete locator.multiplier;
		delete locator.offset;
		
		locator.registerName = $get("registerName");
		locator.totallingRegister = $get("totallingRegister");
		locator.registerType = $get("registerType");
		locator.multiplier = $get("multiplier");
		locator.offset = $get("offset");
		
		EgaugeDataSourceDwr.saveEgaugePointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
	}
	
	function queryImmediateHistory() {
		document.getElementById("historyQueryMessages").innerHTML = "<fmt:message key="dsEdit.egauge.querying"/>";
		setDisabled("historyQueryButton", true);
		setDisabled("sequentialHistoryQueryButton", true);
		var bufferSize = $get("immediateHistoryQueryBufferSize") * 1024 * 1024;
		EgaugeDataSourceDwr.queryHistories($get("immQueryPeriods"), $get("immQueryType"), $get("historyEndPeriods"), $get("historyEndPeriodType"), bufferSize, function(resp) {
			if(resp.hasMessages)
				document.getElementById("historyQueryMessages").innerHTML = resp.messages[0].contextualMessage;
			else
				document.getElementById("historyQueryMessages").innerHTML = "";
			setDisabled("historyQueryButton", false);
			setDisabled("sequentialHistoryQueryButton", false);
		});
	}
	
	function queryImmediateHistorySequentially() {
		document.getElementById("historyQueryMessages").innerHTML = "<fmt:message key="dsEdit.egauge.querying"/>";
		setDisabled("historyQueryButton", true);
		setDisabled("sequentialHistoryQueryButton", true);
		var bufferSize = $get("immediateHistoryQueryBufferSize") * 1024 * 1024;
		EgaugeDataSourceDwr.sequentiallyQueryHistory($get("immQueryPeriods"), $get("immQueryType"), $get("historyEndPeriods"), $get("historyEndPeriodType"), bufferSize, function(resp) {
			if(resp.hasMessages)
				document.getElementById("historyQueryMessages").innerHTML = resp.messages[0].contextualMessage;
			else
				document.getElementById("historyQueryMessages").innerHTML = "";
			setDisabled("historyQueryButton", false);
			setDisabled("sequentialHistoryQueryButton", false);
		});
	}
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.egauge" helpId="egaugeDS">
  <jsp:attribute name="extraPanels">
  	<td valign="top">
  	  <div class="borderDiv marB" style="float:left;">
  	  	<table>
  	  	  <tr><td class="smallTitle"><fmt:message key="dsEdit.egauge.queryHistory"/></td></tr>
  	  	  <tr><td class="formLabelRequired"><fmt:message key="dsEdit.egauge.historyPeriod"/></td><td align="left" class="formField">
        <input type="text" id="immQueryPeriods" value=2 class="formShort"/>
        <tag:timePeriods id="immQueryType" s="true" min="true" h="true" d="true" w="true" mon="true" y="true" value="6"/></td></tr>
        <tr><td class="formLabelRequired"><fmt:message key="dsEdit.egauge.historyPeriodEnd"/></td><td align="left" class="formField">
        <input type="text" id="historyEndPeriods" value=0 class="formShort"/>
        <tag:timePeriods id="historyEndPeriodType" s="true" min="true" h="true" d="true" w="true" mon="true" y="true" value="6"/></td></tr>
        <tr><td align="left" class="formLabelRequired" style="text-align:left;"><fmt:message key="dsEdit.egauge.immediateReadBufferSizeMB"/>&nbsp;<input id="immediateHistoryQueryBufferSize" type="number" class="formShort" value="4"/></td></tr> 
        <tr><td align="center" colspan="2"><input id="historyQueryButton" type="button" value="<fmt:message key="dsEdit.egauge.query"/>" onclick="queryImmediateHistory();"/></td></tr>
        <tr><td align="center" colspan="2"><input id="sequentialHistoryQueryButton" type="button" value="<fmt:message key="dsEdit.egauge.sequentialQuery"/>" onclick="queryImmediateHistorySequentially();"/></td></tr>
        <tr><td id="historyQueryMessages"></td></tr>
  	  	</table>
  	  </div>
  	</td>
  </jsp:attribute>
  <jsp:body>
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.updatePeriod"/></td>
      <td class="formField">
        <input type="text" id="updatePeriods" value="${dataSource.updatePeriods}" class="formShort"/>
        <tag:timePeriods id="updatePeriodType" value="${dataSource.updatePeriodType}" ms="true" s="true" min="true" h="true"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.queryHistory"/></td>
      <td class="formField"><sst:checkbox id="queryHistory" selectedValue="${dataSource.queryHistory}"/></td>
    </tr>
    
    <tr>
   	  <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.readBufferSizeMB"/></td>
      <td><input id="readBufferSizeMB" type="number" value="${dataSource.readBufferSizeMB}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.historyPeriods"/></td>
      <td class="formField">
        <input type="text" id="historyPeriods" value="${dataSource.historyPeriods}" class="formShort"/>
        <tag:timePeriods id="historyPeriodType" value="${dataSource.historyPeriodType}" s="true" min="true" h="true" d="true"/>
      </td>
    </tr>
          
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.uri"/></td>
      <td class="formField">
        <input id="uri" type="text" value="${dataSource.uri}" class="formLong"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.timeoutSeconds"/></td>
      <td class="formField"><input id="timeoutSeconds" type="text" value="${dataSource.timeoutSeconds}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.retries"/></td>
      <td class="formField"><input id="retries" type="text" value="${dataSource.retries}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.tot"/></td>
      <td class="formField"><sst:checkbox id="tot" selectedValue="${dataSource.tot}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.noTeam"/></td>
      <td class="formField"><sst:checkbox id="noTeam" selectedValue="${dataSource.noTeam}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.teamstat"/></td>
      <td class="formField"><sst:checkbox id="teamstat" selectedValue="${dataSource.teamstat}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.inst"/></td>
      <td class="formField"><sst:checkbox id="inst" selectedValue="${dataSource.inst}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.createPoints"/></td>
      <td class="formField"><sst:checkbox id="createPoints" selectedValue="${dataSource.createPoints}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.convertToKwh"/></td>
      <td class="formField"><sst:checkbox id="convertToKwh" selectedValue="${dataSource.convertToKwh}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.interpolateInstantaneous"/></td>
      <td class="formField"><sst:checkbox id="interpolateInstantaneous" selectedValue="${dataSource.interpolateInstantaneous}"/></td>
    </tr>
    </jsp:body>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="egaugePP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions name="dataTypeId" excludeImage="true" excludeMultistate="true" excludeAlphanumeric="true" excludeBinary="true" disabled="true"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.registerName"/></td>
    <td class="formField"><input type="text" id="registerName" class="formLong"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.registerType"/></td>
    <td class="formField"><select id="registerType"><option id="cumulative" value=1><fmt:message key="dsEdit.egauge.cumulative"/></option>
    <option id="instantaneous" value=2><fmt:message key="dsEdit.egauge.instantaneous"/></option></select></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.egauge.totallingRegister"/></td>
    <td class="formField"><input type="checkbox" id="totallingRegister" disabled/></td>
  </tr>
  
  <tr>
      <td class="formLabel"><fmt:message key="dsEdit.egauge.multiplier"/></td>
      <td class="formField"><input type="text" id="multiplier"/></td>
    </tr>
    
    <tr>
      <td class="formLabel"><fmt:message key="dsEdit.egauge.offset"/></td>
      <td class="formField"><input type="text" id="offset"/></td>
    </tr>
  <br/>
</tag:pointList>