<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>

<c:if test='${m2m2:envBoolean("ssl.on", false)}'>
  <c:if test='${pageContext.request.scheme == "http"}'>
    <c:redirect url='https://${pageContext.request.serverName}:${m2m2:envString("ssl.port", "8443")}${requestScope["javax.servlet.forward.request_uri"]}'/>
  </c:if>
</c:if>

<tag:page>
  <script type="text/javascript">
    dojo.ready(function () {
        var usernameInput = $("username");
        if (!usernameInput.value) {
            $("username").focus();
        } else {
            $("password").focus();
        }
    });
  </script>
  <spring:htmlEscape defaultHtmlEscape="true" /> 
  <table cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td>
        <form id="loginForm" action="/login" method="post">
          <table>
            <spring:bind path="login.username">
              <tr>
                <td class="formLabelRequired"><fmt:message key="login.userId"/></td>
                <td class="formField">
                  <input id="username" type="text" name="username" value="${status.value}" maxlength="40"/>
                </td>
                <td class="formError">${status.errorMessage}</td>
              </tr>
            </spring:bind>
            
            <spring:bind path="login.password">
              <tr>
                <td class="formLabelRequired"><fmt:message key="login.password"/></td>
                <td class="formField">
                  <input id="password" type="password" name="password" value="${status.value}" maxlength="200001"/>
                </td>
                <td class="formError">${status.errorMessage}</td>
              </tr>
            </spring:bind>
                
            <spring:bind path="login">
              <c:if test="${status.error}">
                <td colspan="3" class="formError">
                  <c:forEach items="${status.errorMessages}" var="error">
                    <c:out value="${fn:escapeXml(error)}"/><br/>
                  </c:forEach>
                </td>
              </c:if>
            </spring:bind>
            
            <tr>
              <td colspan="2" align="center">
                <input type="submit" value="<fmt:message key="login.loginButton"/>"/>
                <tag:help id="welcomeToMango"/>
              </td>
              <td></td>
            </tr>
          </table>
          <%-- for Spring Security --%>
          <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/> 
        </form>
        <br/>
      </td>
    </tr>
  </table>
</tag:page>
