<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%><%@include file="/WEB-INF/tags/decl.tagf"%>
<%@tag import="com.serotonin.m2m2.Common"%>
<%@attribute name="showHeader"%>
<c:if test="${!empty showHeader && showHeader == false}"><c:set var="tbstyle">style="display:none;"</c:set></c:if>
<div id="mainHeader" data-dojo-type="dijit/layout/BorderContainer" ${tbstyle}>
	<div id="mainHeader_leadingRegion"
		style="width: 20%; border: 0px; padding: 0px"
		data-dojo-type="dijit/layout/ContentPane"
		data-dojo-props="region:'leading'">
      <img id="application_logo" src="<%=Common.applicationLogo%>?v=${lastUpgrade}" alt="Logo" />
	</div>

	<c:if test="${!simple}">
		<div id="alarmToaster"
			style="width: 60%; height: 85px; border: 0px; padding: .2em 0em 0em 5em;"
			data-dojo-type="dijit/layout/ContentPane"
			data-dojo-props="region:'center'"></div>
	</c:if>

	<div style="width: 20%; border: 0px; padding: 0px;"
		data-dojo-type="dijit/layout/ContentPane"
		data-dojo-props="region:'trailing'">
		<c:if test="${!empty instanceDescription}">
			<div style="position: relative; width: 100%; height: 100%">
				<span
					style="position: absolute; bottom: 0px; right: 0px; white-space: nowrap;"
					class="smallTitle marR">${fn:escapeXml(instanceDescription)}</span>
			</div>
		</c:if>
	</div>
	<!-- Could put toolbar here later     <div data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'bottom'">Bottom pane</div> -->
</div>


<script type="text/javascript">
	require([ "dojo/parser", "dijit/registry", "dojo/on", "dojo/topic",
			"dojo/dom-construct", "dojo/dom", "dijit/layout/BorderContainer",
			"dijit/layout/ContentPane", "dojox/image", "dojo/domReady!" ],
			function(parser, registry, on, topic, domConstruct,
					BorderContainer, ContentPane) {

				//Get the logo image size, then resize the leading region to have that width
				var logo = dojo.byId("application_logo");
				var leadingRegion = dojo.byId("mainHeader_leadingRegion");
				if (logo.width < 100)
					leadingRegion.style.width = "20%";
				else
					leadingRegion.style.width = logo.width + "px";

				// Register the alerting routine with the "alertUser" topic.
				topic.subscribe("alarmTopic", function(message) {
					//Message has members:
					// duration - int
					// message - string
					// type - string
					var alarmMessageDiv = dijit.byId("alarmToaster");
					if (message.type == 'clear')
						alarmMessageDiv.set('content', "");
					else {
						alarmMessageDiv.set('content', alarmMessageDiv
								.get('content')
								+ message.message + "</br>");
					}
				});
			});
</script>
