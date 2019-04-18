<%--
    Copyright (C) 2014 Infinite Automation Systems. All rights reserved.
    @author Phillip Dunlap, Terry Packer
--%>

<%@ include file="/WEB-INF/jsp/include/tech.jsp"%>

<script type="text/javascript">
    /**
     * On Load logic
     */
    function initImpl() {
        logIOChanged(); //Show/hide the path
    }

    function saveDataSourceImpl(basic) {
        SshDataSourceEditDwr.saveDataSource(basic,
                $get("updatePeriods"), $get("updatePeriodType"),
                $get("username"), $get("privateKeyPath"), $get("host"),  
                $get("port"), $get("sessionTimeout"),
                $get("channelTimeout"), $get("logIO"),
                saveDataSourceCB);
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
        $set("queryCommand", locator.queryCommand);
        $set("setCommand", locator.setCommand);
        toggleSetField();
        toggleCommandField();
    }

    /**
     * Save Point
     */
    function savePointImpl(locator) {

        locator.settable = $get("settable");
        locator.queryable = $get("queryable");
        locator.dataTypeId = $get("dataTypeId");
        locator.queryCommand = $get("queryCommand");
        locator.setCommand = $get("setCommand");
        SshDataSourceEditDwr.savePointLocator(currentPoint.id, $get("xid"),
                $get("name"), locator, savePointCB);
    }

    function logIOChanged() {
        if ($get("logIO"))
            show("ioLogPathMsg");
        else
            hide("ioLogPathMsg")
    }
    
    function toggleSetField() {
    	if($get("settable")) {
    		show("setCommandRow");
    	}
    	else {
    		hide("setCommandRow");
    	}
    }
    
    function toggleCommandField() {
    	if($get("queryable"))
    		show("queryCommandRow");
    	else
    		hide("queryCommandRow");
    }
    
    
    //Dojo Init Method
    require([ "dojo/domReady!" ], function() {

    });
</script>

<%-- Data Source Settings --%>
<tag:dataSourceAttrs descriptionKey="dsEdit.ssh.desc" helpId="sshDS">
	<tr>
		<td class="formLabelRequired"><fmt:message
				key="dsEdit.updatePeriod" /></td>
		<td class="formField"><input type="text" id="updatePeriods"
			value="${dataSource.updatePeriods}" class="formShort" /> <tag:timePeriods
				id="updatePeriodType" value="${dataSource.updatePeriodType}"
				s="true" min="true" h="true" /></td>
	</tr>

    <tr>
        <td class="formLabelRequired"><fmt:message key="dsEdit.ssh.username" /></td>
        <td><input id="username" type="text" value="${dataSource.username}"></input></td>
    </tr>
    <tr>
        <td class="formLabelRequired"><fmt:message key="dsEdit.ssh.privateKeyPath" /></td>
        <td><input id="privateKeyPath" type="text" value="${dataSource.privateKeyPath}"></input></td>
    </tr>

	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.ssh.host" /></td>
		<td><input id="host" type="text" value="${dataSource.host}"></input></td>
	</tr>

	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.ssh.port" /></td>
		<td><input id="port" type="number" value="${dataSource.port}"></input></td>
	</tr>

    <tr>
        <td class="formLabelRequired"><fmt:message key="dsEdit.ssh.sessionTimeout" /></td>
        <td><input id="sessionTimeout" type="number" value="${dataSource.sessionTimeout}"></input></td>
    </tr>

    <tr>
        <td class="formLabelRequired"><fmt:message key="dsEdit.ssh.channelTimeout" /></td>
        <td><input id="channelTimeout" type="number" value="${dataSource.channelTimeout}"></input></td>
    </tr>

    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.ssh.logIO"/></td>
      <td class="formField">
        <sst:checkbox id="logIO" selectedValue="${dataSource.logIO}" onclick="logIOChanged()"/>
        <div id="ioLogPathMsg">
          <fmt:message key="dsEdit.ssh.log">
            <fmt:param value="${dataSource.ioLogPath}"/>
          </fmt:message>
        </div>
      </td>
    </tr>
</tag:dataSourceAttrs>

<%-- Point Settings --%>
<tag:pointList pointHelpId="sshPP">
	<tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType" /></td>
		<td class="formField">
			<tag:dataTypeOptions id="dataTypeId" excludeImage="true" />
		</td>
	</tr>
	
	<tr>
		<td class="formLabelRequired"><fmt:message key="ssh.point.queryable" /></td>
		<td class="formField"><input type="checkbox" id="queryable" onchange="toggleCommandField()"/></td>
	</tr>
	
    <tr id="queryCommandRow">
        <td class="formLabelRequired"><fmt:message key="ssh.point.queryCommand" /></td>
        <td class="formField"><input type="text" id="queryCommand" /></td>
    </tr>
    
    <tr>
		<td class="formLabelRequired"><fmt:message key="dsEdit.settable" /></td>
		<td class="formField"><input type="checkbox" id="settable" onchange="toggleSetField()"/></td>
	</tr>
    
    <tr id="setCommandRow">
        <td class="formLabelRequired"><fmt:message key="ssh.point.setCommand" /></td>
        <td class="formField"><input type="text" id="setCommand" /></td>
    </tr>

</tag:pointList>