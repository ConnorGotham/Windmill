<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%><%@include file="/WEB-INF/tags/decl.tagf"%>
<%@tag import="com.serotonin.m2m2.module.ModuleRegistry"%>
<%@tag import="com.serotonin.m2m2.module.MenuItemDefinition"%>
<%@attribute name="showToolbar" %>

<c:if test="${!simple}">
  <c:if test="${!empty showToolbar && showToolbar == false}"><c:set var="tbstyle">style="display:none;"</c:set></c:if>
  <table class="wide" id="subHeader" ${tbstyle}>
    <tr>
      <td style="cursor:default">
        <c:if test="${!empty sessionUser}">
          <c:forEach items="<%= ModuleRegistry.getMenuItems().get(MenuItemDefinition.Visibility.USER) %>" var="mi">
            <m2m2:menuItem def="${mi}"/>
          </c:forEach>
                
          <c:if test="${sessionUser.dataSourcePermission}">
            <c:set var="dataSourceItems" value="<%= ModuleRegistry.getMenuItems().get(MenuItemDefinition.Visibility.DATA_SOURCE) %>" />
            <c:if test="${!empty dataSourceItems}">
              <img src="/images/menu_separator.png?v=${lastUpgrade}"/>
              <c:forEach items="${dataSourceItems}" var="mi">
                <m2m2:menuItem def="${mi}"/>
              </c:forEach>
            </c:if>
          </c:if>

            
          <c:if test="${sessionUser.admin}">         
            <c:set var="adminItems" value="<%= ModuleRegistry.getMenuItems().get(MenuItemDefinition.Visibility.ADMINISTRATOR) %>" />
            <c:if test="${!empty adminItems}">
              <img src="/images/menu_separator.png?v=${lastUpgrade}"/> 
              <c:forEach items="${adminItems}" var="mi">
                <m2m2:menuItem def="${mi}"/>
              </c:forEach>
            </c:if>
          </c:if>

          <c:set var="anonItems" value="<%= ModuleRegistry.getMenuItems().get(MenuItemDefinition.Visibility.ANONYMOUS) %>" />
          <c:if test="${!empty anonItems }">
            <img src="/images/menu_separator.png?v=${lastUpgrade}"/>
            <c:forEach items="${anonItems}" var="mi">
              <m2m2:menuItem def="${mi}"/>
            </c:forEach>
          </c:if>
        </c:if>
        
        <c:if test="${empty sessionUser}">
          <m2m2:menuItem id="loginMi" href="/login.htm" png="control_play_blue" key="header.login"/>
          <c:forEach items="<%= ModuleRegistry.getMenuItems().get(MenuItemDefinition.Visibility.ANONYMOUS) %>" var="mi">
            <m2m2:menuItem def="${mi}"/>
          </c:forEach>
        </c:if>
        <div id="headerMenuDescription" class="labelDiv" style="position:absolute;display:none;"></div>
      </td>
      
      <td align="right">
        <c:if test="${!empty sessionUser}">
          <span class="copyTitle"><fmt:message key="header.user"/>: <b>${fn:escapeXml(sessionUser.username)}</b></span>
          <c:if test="${sessionAuthenticated == true}">
          <m2m2:menuItem id="logoutMi" href="#" onclick="getElementById('logout-form').submit()" png="control-power" key="header.logout"/>
          </c:if>
          <tag:img id="userMutedImg" onclick="MiscDwr.toggleUserMuted(setUserMuted)" onmouseover="hideLayersIgnoreMissing('userHome', 'localeEdit')"/>
          <div style="display: inline;" onmouseover="hideLayersIgnoreMissing('localeEdit'); showMenu('userHome', null, 10, 10);">
            <tag:img png="house" title="header.goHomeUrl" onclick="goHomeUrl();"/>
            <div id="userHome" style="visibility:hidden;left:0px;top:15px;" class="labelDiv" onmouseout="hideLayer(this)">
              <tag:img png="house_link" title="header.setHomeUrl" onclick="setHomeUrl()" onmouseover="hideLayersIgnoreMissing('localeEdit')"/>
              <tag:img png="house_delete" title="header.deleteHomeUrl" onclick="deleteHomeUrl()" onmouseover="hideLayersIgnoreMissing('localeEdit')"/>
            </div>
          </div>
        </c:if>
        <c:if test="${fn:length(availableLanguages) > 0}">
          <div style="display:inline;" onmouseover="hideLayersIgnoreMissing('userHome'); showMenu('localeEdit', null, 10, 10);">
            <tag:img png="locale" title="header.changeLanguage"/>
            <div id="localeEdit" style="visibility:hidden;left:0px;top:15px;" class="labelDiv" onmouseout="hideLayer(this)">
              <c:forEach items="${availableLanguages}" var="lang">
                <a class="ptr" onclick="setLocale('${lang.key}')">${lang.value}</a><br/>
              </c:forEach>
            </div>
          </div>
        </c:if>
      </td>
    </tr>
  </table>
</c:if>