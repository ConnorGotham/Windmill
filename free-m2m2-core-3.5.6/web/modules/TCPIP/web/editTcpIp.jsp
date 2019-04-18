<%--
    Copyrigtcpip (C) 2014 Infinite Automation Systems. All rigtcpips reserved.
    @author Phillip Dunlap, Terry Packer
--%>

<%@ include file="/WEB-INF/jsp/include/tech.jsp"%>

<script type="text/javascript">
    /**
     * On Load logic
     */
    function initImpl() {  logIOChanged(); }

    function saveDataSourceImpl(basic) {
        TcpIpDataSourceEditDwr.saveDataSource(basic,
                $get("updatePeriods"), $get("updatePeriodType"),
                $get("host"), $get("port"), $get("delimiter"), $get("timeout"), 
                $get("isHex"), $get("isLogIO"), $get("ioLogFileSizeMBytes"), 
                $get("maxHistoricalIOLogs"), $get("responseBufferSize"), $get("socketRetries"), saveDataSourceCB);
    }

    /**
     * Add a Point
     */
    function addPointImpl() {
        DataSourceEditDwr.getPoint(-1, function(point) {
            editPointCB(point);
        });
    }

    /**
     * Load Editing Point Info
     */
    function editPointCBImpl(locator) {
        $set("settable", locator.settable);
        $set("queryable", locator.queryable);
        $set("dataTypeId", locator.dataTypeId);
        $set("readCommand", locator.readCommand);
        $set("valueRegex", locator.valueRegex);
        $set("valueIndex", locator.valueIndex);
        $set("writeCommand", locator.writeCommand);
    }

    /**
     * Save Point
     */
    function savePointImpl(locator) {

        locator.settable = $get("settable");
        locator.queryable = $get("queryable");
        locator.dataTypeId = $get("dataTypeId");
        locator.readCommand = $get("readCommand");
        locator.valueRegex = $get("valueRegex");
        locator.valueIndex = $get("valueIndex");
        locator.writeCommand = $get("writeCommand");
        locator.queryable = $get("queryable");
        TcpIpDataSourceEditDwr.savePointLocator(currentPoint.id, $get("xid"),
                $get("name"), locator, savePointCB);
    }
    
    function logIOChanged() {
	      if ($get("isLogIO")){
	          show("ioLogPathMsg");
	          show("maxHistoricalIOLogs_row");
	          show("ioLogFileSizeMBytes_row");
	      }else{
	          hide("ioLogPathMsg");
	          hide("ioLogFileSizeMBytes_row");
	          hide("maxHistoricalIOLogs_row");
	      }
	  }
    
    function sendTestString() {
    	setDisabled("testStringButton", true);
    	TcpIpDataSourceEditDwr.testSendStringGetString($get("testStringValue"), $get("testRegexValue"), $get("testRegexIndex"), function(response) {
    		if(response.hasMessages) {
    			document.getElementById("testUtilityMessages").innerHTML = response.messages[0].genericMessage;
    		} else {
    			document.getElementById("testUtilityMessages").innerHTML = "";
    		}
    		
    		if("result" in response.data)
    			document.getElementById("testUtilityData").innerHTML = response.data["result"];
    		else
    			document.getElementById("testUtilityData").innerHTML = "";
    		if("matched" in response.data)
    			document.getElementById("testUtilityParsedData").innerHTML = response.data["matched"];
    		else
    			document.getElementById("testUtilityParsedData").innerHTML = "";
    		
    		setDisabled("testStringButton", false);
    	});
    }
    
    //Dojo Init Method
    require([ "dojo/domReady!" ], function() {

    });
</script>

<%-- Data Source Settings --%>
<tag:dataSourceAttrs descriptionKey="dsEdit.tcpip.desc" helpId="tcpipDS">
	<jsp:attribute name="extraPanels">
	<td valign="top">
  	  <div class="borderDiv marB" style="float:left;">
  	  	<table>
  	  	  <tr><td class="smallTitle"><fmt:message key="dsEdit.tcpip.testUtility"/></td></tr>
        <tr><td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.testString"/></td><td><input id="testStringValue" type="text" value=""/></td></tr>
        <tr><td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.testRegex"/></td><td><input id="testRegexValue" type="text" value=".*"/></td></tr>
        <tr><td class="formLabelRequired"><fmt:message key="tcpip.point.valueIndex"/></td><td><input id="testRegexIndex" type="text" value="0"/></td></tr> 
        <tr><td align="center" colspan="2"><input id="testStringButton" type="button" value="<fmt:message key="view.submit"/>" onclick="sendTestString();"/></td></tr>
        <tr><td><fmt:message key="dsEdit.tcpip.testUtilityResult"/></td><td id="testUtilityData"></td></tr>
        <tr><td><fmt:message key="dsEdit.tcpip.testUtilityParsedResult"/></td><td id="testUtilityParsedData"></td></tr>
        <tr><td class="formError" colspan="2" id="testUtilityMessages"></td></tr>
  	  	</table>
  	  </div>
  	</td>
	</jsp:attribute>
	<jsp:body>
	<tr>
		<td class="formLabelRequired"><fmt:message
				key="dsEdit.updatePeriod" /></td>
		<td class="formField"><input type="text" id="updatePeriods"
			value="${dataSource.updatePeriods}" class="formShort" /> <tag:timePeriods
				id="updatePeriodType" value="${dataSource.updatePeriodType}"
				s="true" min="true" h="true" /></td>
	</tr>
	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.host" /></td>
		<td><input id="host" type="text" value="${dataSource.host}"></input></td>
	</tr>

	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.port" /></td>
		<td><input id="port" type="number" value="${dataSource.port}"></input></td>
	</tr>
	
	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.delimiter" /></td>
		<td><input id="delimiter" type="text" value="${dataSource.delimiter}"></input></td>
	</tr>
	
	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.timeout" /></td>
		<td><input id="timeout" type="number" value="${dataSource.timeout}"></input></td>
	</tr>
	<tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.socketRetries"/></td>
      <td class="formField"><input type="number" id="socketRetries" value="${dataSource.socketRetries}"/></td>
    </tr>
	<tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.responseBufferSize"/></td>
      <td class="formField"><input type="number" id="responseBufferSize" value="${dataSource.responseBufferSize}"/></td>
    </tr>
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.hex"/></td>
      <td class="formField"><sst:checkbox id="isHex" selectedValue="${dataSource.hex}"/></td>
    </tr>
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.logIO"/></td>
      <td class="formField">
        <sst:checkbox id="isLogIO" selectedValue="${dataSource.logIO}" onclick="logIOChanged()"/>
        <div id="ioLogPathMsg">
          <fmt:message key="dsEdit.serial.log">
            <fmt:param value="${dataSource.ioLogPath}"/>
          </fmt:message>
        </div>
      </td>
    </tr>
    <tr id="ioLogFileSizeMBytes_row">
      <td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.logIOFileSize"/></td>
      <td class="formField"><input id="ioLogFileSizeMBytes" type="number" value="${dataSource.ioLogFileSizeMBytes}"/></td>
    </tr>
    <tr id="maxHistoricalIOLogs_row">
      <td class="formLabelRequired"><fmt:message key="dsEdit.tcpip.logIOFiles"/></td>
      <td class="formField"><input id="maxHistoricalIOLogs" type="number" value="${dataSource.maxHistoricalIOLogs}"/></td>
    </tr>
    </jsp:body>
  
</tag:dataSourceAttrs>

<%-- Point Settings --%>
<tag:pointList pointHelpId="tcpipPP">
	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType" /></td>
		<td class="formField">
			<tag:dataTypeOptions id="dataTypeId" excludeImage="true" />
		</td>
	</tr>
	
	<tr>
		<td class="formLabelRequired"><fmt:message key="tcpip.point.queryable" /></td>
		<td class="formField"><input type="checkbox" id="queryable"/></td>
	</tr>
	
	<tr>
        <td class="formLabelRequired"><fmt:message key="tcpip.point.readCommand" /></td>
        <td class="formField"><input type="text" id="readCommand" /></td>
    </tr>
    
    <tr>
		<td class="formLabelRequired"><fmt:message key="tcpip.point.valueRegex" /></td>
		<td class="formField"><input type="text" id="valueRegex"/></td>
	</tr>
    
    <tr>
        <td class="formLabelRequired"><fmt:message key="tcpip.point.valueIndex" /></td>
        <td class="formField"><input type="number" id="valueIndex" /></td>
    </tr>
	
	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.settable" /></td>
		<td class="formField"><input type="checkbox" id="settable"/></td>
	</tr>
	
	<tr>
        <td class="formLabelRequired"><fmt:message key="tcpip.point.writeCommand" /></td>
        <td class="formField"><input type="text" id="writeCommand" /></td>
    </tr>

</tag:pointList>