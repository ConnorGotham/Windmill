<#--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
-->
<#if evt.alarmLevel==0>
  <img src="cid:<@img src="flag_grey.png"/>" alt="<@fmt key="common.alarmLevel.none"/>" title="<@fmt key="common.alarmLevel.none"/>"/>
<#elseif evt.alarmLevel==1>
  <img src="cid:<@img src="flag_blue.png"/>" alt="<@fmt key="common.alarmLevel.info"/>" title="<@fmt key="common.alarmLevel.info"/>"/>
<#elseif evt.alarmLevel==2>
  <img src="cid:<@img src="flag_aqua.png"/>" alt="<@fmt key="common.alarmLevel.important"/>" title="<@fmt key="common.alarmLevel.important"/>"/>
<#elseif evt.alarmLevel==3>
  <img src="cid:<@img src="flag_green.png"/>" alt="<@fmt key="common.alarmLevel.warning"/>" title="<@fmt key="common.alarmLevel.warning"/>"/>
<#elseif evt.alarmLevel==4>
  <img src="cid:<@img src="flag_yellow.png"/>" alt="<@fmt key="common.alarmLevel.urgent"/>" title="<@fmt key="common.alarmLevel.urgent"/>"/>
<#elseif evt.alarmLevel==5>
  <img src="cid:<@img src="flag_orange.png"/>" alt="<@fmt key="common.alarmLevel.critical"/>" title="<@fmt key="common.alarmLevel.critical"/>"/>
<#elseif evt.alarmLevel==6>
  <img src="cid:<@img src="flag_red.png"/>" alt="<@fmt key="common.alarmLevel.lifeSafety"/>" title="<@fmt key="common.alarmLevel.lifeSafety"/>"/>
<#elseif evt.alarmLevel==-2>
  <img src="cid:<@img src="cancel.png"/>" alt="<@fmt key="common.alarmLevel.doNotLog"/>" title="<@fmt key="common.alarmLevel.doNotLog"/>"/>
</#if>