<#ftl strip_whitespace=false><#--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
-->
${instanceDescription}
${evt.prettyRtnTimestamp} <@fmt key="ftl.eventInactive"/>: <@fmt message=evt.rtnMessage/>


<@fmt key="ftl.originalInformation"/>

*******************************************************
<#include "include/eventData.ftl">

*******************************************************
<#include "include/systemInfo.ftl">

*******************************************************

<#include "include/footer.ftl">