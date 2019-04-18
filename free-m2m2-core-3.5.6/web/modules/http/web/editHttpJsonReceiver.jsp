<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@page import="com.serotonin.m2m2.DataTypes"%>
<%@page import="com.serotonin.m2m2.http.vo.HttpJsonReceiverDataSourceVO"%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>

<script type="text/javascript">
  var ipWhiteList = new Array();
  var deviceIdWhiteList = new Array();
  
  function initImpl() {
      <c:forEach items="${dataSource.ipWhiteList}" var="ip">
        ipWhiteList[ipWhiteList.length] = "${ip}";
      </c:forEach>
      ipWhiteList.sort();
      refreshIpWhiteList();
      
      <c:forEach items="${dataSource.deviceIdWhiteList}" var="deviceId">
        deviceIdWhiteList[deviceIdWhiteList.length] = "${deviceId}";
      </c:forEach>
      deviceIdWhiteList.sort();
      refreshDeviceIdWhiteList();
      $set("receiveType", ${dataSource.receiveType});
  }
  
  function addIpMask() {
      var ipMask = $get("ipMask");
      
      for (var i=0; i<ipWhiteList.length; i++) {
          if (ipWhiteList[i] == ipMask) {
              alert("<fmt:message key="dsEdit.httpReceiver.containsIpMask"/> "+ ipMask);
              return;
          }
      }
      
      HttpDataSourceDwr.validateIpMask(ipMask, function(error) {
          if (error)
              alert(error);
          else {
              ipWhiteList[ipWhiteList.length] = $get("ipMask");
              ipWhiteList.sort();
              refreshIpWhiteList();
          }
      });
  }
  
  function addDeviceIdMask() {
      var deviceIdMask = $get("deviceIdMask");
      
      for (var i=0; i<deviceIdWhiteList.length; i++) {
          if (deviceIdWhiteList[i] == deviceIdMask) {
              alert("<fmt:message key="dsEdit.httpReceiver.containsDeviceMask"/> "+ deviceIdMask);
              return;
          }
      }
      
      deviceIdWhiteList[deviceIdWhiteList.length] = deviceIdMask;
      deviceIdWhiteList.sort();
      refreshDeviceIdWhiteList();
  }
  
  function removeIpMask(ipMask) {
      for (var i=ipWhiteList.length-1; i>=0; i--) {
          if (ipWhiteList[i] == ipMask)
              ipWhiteList.splice(i, 1);
      }
      refreshIpWhiteList();
  }
  
  function removeDeviceIdMask(deviceIdMask) {
      for (var i=deviceIdWhiteList.length-1; i>=0; i--) {
          if (deviceIdWhiteList[i] == deviceIdMask)
              deviceIdWhiteList.splice(i, 1);
      }
      refreshDeviceIdWhiteList();
  }
  
  function refreshIpWhiteList() {
      dwr.util.removeAllRows("ipWhiteList");
      if (ipWhiteList.length == 0)
          show("noAddressesMessage");
      else {
          hide("noAddressesMessage");
          dwr.util.addRows("ipWhiteList", ipWhiteList, [
                  function(data) { return ""; },
                  function(data) {
                      return data +" <img src='images/bullet_delete.png' onclick='removeIpMask(\""+ data + "\");' "+
                              "class='ptr' alt='<fmt:message key="common.delete"/>' title='<fmt:message key="common.delete"/>'/>";
                  }
                  ], null);
      }
  }
  
  function refreshDeviceIdWhiteList() {
      dwr.util.removeAllRows("deviceIdWhiteList");
      if (deviceIdWhiteList.length == 0)
          show("noDevicesMessage");
      else {
          hide("noDevicesMessage");
          dwr.util.addRows("deviceIdWhiteList", deviceIdWhiteList, [
                  function(data) { return ""; },
                  function(data) {
                      return data +" <img src='images/bullet_delete.png' onclick='removeDeviceIdMask(\""+ data 
                              +"\");' class='ptr' alt='<fmt:message key="common.delete"/>' "+
                              "title='<fmt:message key="common.delete"/>'/>";
                  }
                  ], null);
      }
  }
  
  function saveDataSourceImpl(basic) {
      httpListenCancel();
      HttpDataSourceDwr.saveHttpJsonReceiverDataSource(basic, ipWhiteList, deviceIdWhiteList, $get("setPointUrl"),
    		  $get("receiveType"), saveDataSourceCB);
  }
  
  function httpListen() {
      $set("httpListenMessage", "<fmt:message key="dsEdit.httpReceiver.listening"/>");
      $set("httpListenData");
      httpListenButtons(true);
      HttpDataSourceDwr.httpReceiverListenForData(ipWhiteList, deviceIdWhiteList, httpListenCB);
  }
  
  function httpListenButtons(listening) {
      setDisabled("httpListenBtn", listening);
      setDisabled("httpListenCancelBtn", !listening);
  }
  
  function httpListenCB() {
      setTimeout(httpListenUpdate, 2000);
  }
  
  function httpListenUpdate() {
	  HttpDataSourceDwr.httpJsonReceiverListenerUpdate(function(result) {
          if (result) {
              $set("httpListenMessage", result.message);
              if (result.remoteIp) {
                  var data = "<b><fmt:message key="dsEdit.httpReceiver.source"/>: "+ result.remoteIp +"</b><br/>";
                  if (result.deviceId)
                      data += "<b><fmt:message key="dsEdit.httpReceiver.deviceId"/>: "+ result.deviceId +"</b><br/>";
                  else
                      data += "<b><fmt:message key="dsEdit.httpReceiver.deviceId"/>: -</b><br/>";
                  data += "<b><fmt:message key="dsEdit.httpReceiver.time"/>: "+ result.time +"</b><br/>";
                  if($get("receiveType") == <%= HttpJsonReceiverDataSourceVO.JSON_RECEIVE_TYPE %>) {
                	  data += "<br/>" + result.data;
                  } else {
	                  for (var i=0; i<result.data.length; i++) {
	                      var sample = result.data[i];
	                      data += sample.key.replace(/</, "&lt;") +"="+ sample.value.replace(/</, "&lt;");
	                      if (sample.prettyTime)
	                          data += " (@ "+ sample.prettyTime +")";
	                      data += "<br/>"
	                  }
              	  }
                  $set("httpListenData", data);
              }
              httpListenCB();
          }
      });
  }
  
  function httpListenCancel() {
	  HttpDataSourceDwr.cancelTestingUtility(function() {
          httpListenButtons(false);
          $set("httpListenMessage", "<fmt:message key="common.cancelled"/>");
      });
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key="dsEdit.httpReceiver.parameter"/>";
      pointListColumnFunctions[pointListColumnFunctions.length] = function(p) { return p.pointLocator.parameterName; };
  }
  
  function editPointCBImpl(locator) {
      $set("parameterName", locator.parameterName);
      $set("dataTypeId", locator.dataTypeId);
      $set("binary0Value", locator.binary0Value);
      $set("settable", locator.settable);
      $set("setPointName", locator.setPointName);
      $set("deviceIdentifierKey", locator.deviceIdentifierKey);
      $set("deviceIdentifier", locator.deviceIdentifier);
      $set("timestampIdentifier", locator.timestampIdentifier);
      
      changeDataTypeId();
  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.relinquishable;
      
      locator.parameterName = $get("parameterName");
      locator.dataTypeId = $get("dataTypeId");
      locator.binary0Value = $get("binary0Value");
      locator.settable = $get("settable");
      locator.setPointName = $get("setPointName");
      locator.deviceIdentifierKey = $get("deviceIdentifierKey")
      locator.deviceIdentifier = $get("deviceIdentifier")
      locator.timestampIdentifier = $get("timestampIdentifier")
      
      HttpDataSourceDwr.saveHttpJsonReceiverPointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  function changeDataTypeId() {
      var dataTypeId = $get("dataTypeId");
      if (dataTypeId == <%= DataTypes.BINARY %>)
          setDisabled($("binary0Value"), false);
      else
          setDisabled($("binary0Value"), true);
  }
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.httpJsonReceiver.desc" helpId="httpJsonReceiverDS">
  <jsp:attribute name="extraPanels">
    <td valign="top">
      <div class="borderDiv marB">
        <table>
          <tr><td class="smallTitle"><fmt:message key="dsEdit.httpJsonReceiver.receiverListener"/></td></tr>
          <tr>
            <td align="center">
              <input id="httpListenBtn" type="button" value="<fmt:message key="dsEdit.httpReceiver.startListener"/>" onclick="httpListen();"/>
              <input id="httpListenCancelBtn" type="button" value="<fmt:message key="common.cancel"/>" onclick="httpListenCancel();"/>
            </td>
          </tr>
          <tr><td id="httpListenMessage" class="formError"></td></tr>
          <tr><td class="formField" id="httpListenData"></td></tr>
        </table>
      </div>
    </td>
  </jsp:attribute>
  
  <jsp:body>
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpReceiver.ipWhiteList"/></td>
      <td class="formField">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td><input id="ipMask" type="text"/></td>
            <td width="10"></td>
            <td><tag:img png="add" onclick="addIpMask()" title="common.add"/></td>
          </tr>
        </table>
      </td>
    </tr>

    <tr id="noAddressesMessage" style="display:none;">
      <td></td>
      <td><fmt:message key="dsEdit.httpReceiver.noIpAddresses"/></td>
    </tr>
    <tbody id="ipWhiteList"></tbody>

    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpReceiver.deviceWhiteList"/></td>
      <td class="formField">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td><input id="deviceIdMask" type="text"/></td>
            <td width="10"></td>
            <td><tag:img png="add" onclick="addDeviceIdMask()" title="common.add"/></td>
          </tr>
        </table>
      </td>
    </tr>

    <tr id="noDevicesMessage" style="display:none;">
      <td></td>
      <td><fmt:message key="dsEdit.httpReceiver.noDevices"/></td>
    </tr>
    <tbody id="deviceIdWhiteList"></tbody>
    
    <tr>
      <td class="formLabel"><fmt:message key="http.dsEdit.setPointUrl"/></td>
      <td class="formField"><input id="setPointUrl" type="text" value="${dataSource.setPointUrl}" class="formLong"/></td>
    </tr>
    
    <tr>
      <td class="formLabel"><fmt:message key="http.dsEdit.receiveType"/></td>
      <td class="formField">
        <tag:exportCodesOptions id="receiveType" optionList="<%= HttpJsonReceiverDataSourceVO.RECEIVE_TYPE_CODES.getIdKeys() %>"/>
      </td>
    </tr>
  </jsp:body>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="httpJsonReceiverPP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpReceiver.httpParamName"/></td>
    <td class="formField"><input type="text" id="parameterName"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions id="dataTypeId" onchange="changeDataTypeId();" excludeImage="true"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpReceiver.binaryZeroValue"/></td>
    <td class="formField"><input id="binary0Value" type="text"/></td>
  </tr>
  
  <tr style="display:none">
    <td class="formLabel"><fmt:message key="dsEdit.settable"/></td>
    <td class="formField"><input type="checkbox" id="settable"/></td>
  </tr>
  
  <tr style="display:none">
    <td class="formLabel"><fmt:message key="http.dsEdit.setPointName"/></td>
    <td class="formField"><input type="text" id="setPointName"/></td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.httpJsonReceiver.deviceIdentifierKey"/></td>
    <td class="formField"><input type="text" id="deviceIdentifierKey"/></td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.httpJsonReceiver.deviceIdentifier"/></td>
    <td class="formField"><input type="text" id="deviceIdentifier"/></td>
  </tr>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.httpJsonReceiver.timestampIdentifier"/></td>
    <td class="formField"><input type="text" id="timestampIdentifier"/></td>
  </tr>
</tag:pointList>