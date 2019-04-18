<%--
    Copyright (C) 2013 Infinite Automation All rights reserved.
    @author Terry Packer
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp"%>
 <script type="text/javascript" src="${modulePath}/web/js/editControlCore.js" ></script>

<tag:dataSourceAttrs descriptionKey="dsEdit.controlcore.desc" helpId="controlcoreDS">
  
  <tag:serialSettings/>

  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.controlcore.readTimeout"/></td>
    <td class="formField"><input id="readTimeout" type="text" value="${dataSource.readTimeout}"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.controlcore.responseTimeout"/></td>
    <td class="formField"><input id="responseTimeout" type="text" value="${dataSource.responseTimeout}"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.controlcore.socketTimeout"/></td>
    <td class="formField"><input type="text" id="socketTimeout" value="${dataSource.socketTimeout}"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.controlcore.allowedClients"/></td>
    <td class="formField"><input type="text" id="allowedClients" value="${dataSource.allowedClients}"/></td>
  </tr>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.controlcore.portNumber"/></td>
    <td class="formField"><input type="text" id="portNumber" value="${dataSource.portNumber}"/></td>
  </tr>


</tag:dataSourceAttrs>
  
<tag:pointList pointHelpId="controlcorePP">

</tag:pointList>