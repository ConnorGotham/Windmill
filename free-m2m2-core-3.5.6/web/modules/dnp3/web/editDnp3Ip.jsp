<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%@page import="br.org.scadabr.dnp3.vo.Dnp3IpDataSourceVO"%>

<script type="text/javascript">
  
function saveDataSourceImpl(basic) {
    DnpEditDwr.saveDNP3IpDataSource(basic,
          $get("sourceAddress"), $get("slaveAddress"), $get("host"), $get("port"), 
          $get("staticPollPeriods"), $get("rbePollPeriods"),
          $get("rbePeriodType"), $get("timeout"), $get("retries"), saveDataSourceCB);
}
</script>

<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.dnp3Ip.host"/></td>
  <td class="formField"><input id="host" type="text" value="${dataSource.host}"/></td>
</tr>

<tr>
  <td class="formLabelRequired"><fmt:message key="dsEdit.dnp3Ip.port"/></td>
  <td class="formField"><input id="port" type="text" value="${dataSource.port}"/></td>
</tr>
