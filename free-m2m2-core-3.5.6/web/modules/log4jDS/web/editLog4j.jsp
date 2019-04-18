<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@page import="com.infiniteautomation.log4j.Log4jDataSourceVO"%>
<%@page import="com.infiniteautomation.log4j.Log4jPointLocatorVO"%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>

<script type="text/javascript">

  function initImpl(){
      
      Log4jEditDwr.getTestMessage(function(response){
         $set("toMatchText", response.data.testMessage); 
      });
      
  }

  function saveDataSourceImpl(basic) {
      Log4jEditDwr.saveDataSource(basic, $get("sameMessageThrottleMilliseconds"), saveDataSourceCB);
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key='dsEdit.log4j.logLevel'/>";
      pointListColumnFunctions[pointListColumnFunctions.length] =
              function(p) { return p.pointLocator.logLevelDescription; };

     pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key='dsEdit.log4j.matchingRegex'/>";
     pointListColumnFunctions[pointListColumnFunctions.length] =
             function(p) { return p.pointLocator.matchingRegex; };

  
  }
  
  function editPointCBImpl(locator) {
      $set("logLevel", locator.logLevel);
      $set("matchingRegex", locator.matchingRegex);
      if((locator.matchingRegex == null) || (locator.matchingRegex == '') || (locator.matchingRegex == 'undefined')){
          $set('useMatching', false);
      }else{
          $set('useMatching', true);
      }
      toggleMatchByRegex();
  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.dataTypeId;
      delete locator.relinquishable;
      
      locator.logLevel = $get("logLevel");
      if($get('useMatching'))
          locator.matchingRegex = $get("matchingRegex");
      else
    	  locator.matchingRegex = null;
      
      Log4jEditDwr.savePointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  
  function validateRegex() {
      hideContextualMessages("pointProperties"); <!-- Bug here, legacy placeholder of point details -->
      hideContextualMessages("pointDetails");
      Log4jEditDwr.validateRegex($get("matchingRegex"), 
              $get("toMatchText"),
              function(response){
          showDwrMessages(response.messages);
      });
  }
  
  function toggleMatchByRegex(){
      if($get('useMatching')){
          show('matchByRegex');
          show('matchTextRow');
      }else{
          hide('matchByRegex');
          hide('matchTextRow');
      }
  }
  
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.log4j.desc" helpId="log4jDS">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.log4j.sameMessageThrottleMilliseconds"/></td>
    <td class="formField"><input type="text" id="sameMessageThrottleMilliseconds" value="${dataSource.sameMessageThrottleMilliseconds}"></input></td>
  </tr>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="log4jPP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.log4j.logLevel"/></td>
    <td class="formField">
      <tag:exportCodesOptions id="logLevel" optionList="<%= Log4jPointLocatorVO.LOG_LEVEL_CODES.getIdKeys() %>"/>
    </td>
  </tr>
  <tr>
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.log4j.useMatching"/></td>
    <td class="formField">
        <input type="checkbox" id="useMatching" onClick="toggleMatchByRegex();" />
    </td>
  </tr>
  <tr id="matchByRegex">
    <td class="formLabel"><fmt:message key="dsEdit.log4j.matchingRegex"/>&nbsp<tag:img png="accept" onclick="validateRegex();" title="common.validate"/></td>
    <td class="formField">
        <input class="formLong" type="text" id="matchingRegex" />
    </td>
  </tr>
  <tr id="matchTextRow">
    <td class="formLabel"><fmt:message key="dsEdit.log4j.toMatch"/></td>
    <td class="formField">
        <textarea cols="100" rows="20" id="toMatchText" ></textarea>
    </td>
  </tr>  
</tag:pointList>