<%--
	Copyright (C) 2013 Infinite Automation Systems. All rights reserved.
    @author Phillip Dunlap
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%@page import="com.infiniteautomation.templateconfig.TemplateConfigUriMappingDefinition" %>

<tag:page dwr="TemplateConfigDwr" js="${modulePath}/web/templateConfig.js">  
  <table width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td>
       	<div id="base"><tag:help id="templateConfig"/></div><br/><div id="importMessages"></div><div id="alternateMessage"></div>
      </td>
    </tr>
  </table>
 </tag:page>