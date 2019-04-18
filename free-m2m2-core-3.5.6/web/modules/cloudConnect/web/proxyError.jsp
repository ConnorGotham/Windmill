<%@include file="/WEB-INF/jsp/include/tech.jsp" %><html>
<head>
    <title>Proxy error <c:out value="${MANGO_PROXY_ERROR_STATUS}" /></title>
</head>
<body>

<h1>Proxy error <c:out value="${MANGO_PROXY_ERROR_STATUS}" /></h1>
<p><c:out value="${MANGO_PROXY_ERROR_MESSAGE}" /></p>

</body>
</html>