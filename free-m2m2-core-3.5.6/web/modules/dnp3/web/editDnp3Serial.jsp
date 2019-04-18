<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%@page import="br.org.scadabr.dnp3.vo.Dnp3SerialDataSourceVO"%>

<script type="text/javascript">
function saveDataSourceImpl(basic) {
    DnpEditDwr.saveDNP3SerialDataSource(basic,
          $get("sourceAddress"), $get("slaveAddress"), $get("commPortId"), $get("baudRate"), 
          $get("staticPollPeriods"), $get("rbePollPeriods"),
          $get("rbePeriodType"), $get("timeout"), $get("retries"), saveDataSourceCB);
}
</script>

<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.serial.port"/></td>
  <td class="formField">
    <c:choose>
      <c:when test="${!empty commPortError}">
        <input id="commPortId" type="hidden" value=""/>
        <span class="formError">${commPortError}</span>
      </c:when>
      <c:otherwise>
        <input id="commPortId" type="text" value="${dataSource.commPortId}"/><br/> 
        <sst:select id="commPortIds" value="${dataSource.commPortId}">
          <c:forEach items="${commPorts}" var="port">
            <sst:option value='${sst:quotEncode(port.name)}'>${fn:escapeXml(port.name)}</sst:option>
          </c:forEach>
        </sst:select>
        <tag:img id='commPortsLoadingImg' src="/images/hourglass.png" style='display: none;'/>
        <tag:img src="/images/arrow-turn-090-left.png" onclick="$set('commPortId', $get('commPortIds'))"/>
        <tag:img id='commPortRefreshButton' src="/images/arrow_refresh.png" onclick="reloadCommPorts('commPortIds', 'commPortsLoadingImg')" title='common.refreshCommPorts'/>
      </c:otherwise>
    </c:choose>
  </td>
</tr>

<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.dnp3Serial.baud"/></td>
  <td class="formField">
    <sst:select id="baudRate" value="${dataSource.baudRate}">
      <sst:option>110</sst:option>
      <sst:option>300</sst:option>
      <sst:option>1200</sst:option>
      <sst:option>2400</sst:option>
      <sst:option>4800</sst:option>
      <sst:option>9600</sst:option>
      <sst:option>19200</sst:option>
      <sst:option>38400</sst:option>
      <sst:option>57600</sst:option>
      <sst:option>115200</sst:option>
      <sst:option>230400</sst:option>
      <sst:option>460800</sst:option>
      <sst:option>921600</sst:option>
    </sst:select>
  </td>
</tr>