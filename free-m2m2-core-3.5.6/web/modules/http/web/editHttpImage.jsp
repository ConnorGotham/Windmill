<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@page import="com.serotonin.m2m2.http.vo.HttpImagePointLocatorVO"%>
<%@include file="/WEB-INF/jsp/include/tech.jsp"%>
<%@page import="com.serotonin.m2m2.DataTypes"%>

<script type="text/javascript">
  function saveDataSourceImpl(basic) {
	  HttpDataSourceDwr.saveHttpImageDataSource(basic, $get("updatePeriods"),
              $get("updatePeriodType"), saveDataSourceCB);
  }
  
  function editPointCBImpl(locator) {
      $set("url", locator.url);
      $set("timeoutSeconds", locator.timeoutSeconds);
      $set("retries", locator.retries);
      $set("scaleType", locator.scaleType);
      $set("scalePercent", locator.scalePercent);
      $set("scaleWidth", locator.scaleWidth);
      $set("scaleHeight", locator.scaleHeight);
      $set("readLimit", locator.readLimit);
      $set("webcamLiveFeedCode", locator.webcamLiveFeedCode);
      
      //Start by clearing the disabled points
      for (var i=0; i<pointsArray.length; i++)
    	  pointsArray[i].fancyName = pointsArray[i].name;
      
      reportPointsArray = new Array();
      for (var i=0; i<locator.overlayPoints.length; i++)
          addToReportPointsArray(locator.overlayPoints[i]);        
      writeReportPointsArray();
      
      scaleTypeChanged();
  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.dataTypeId;
      delete locator.relinquishable;
      
      locator.url = $get("url");
      locator.timeoutSeconds = $get("timeoutSeconds");
      locator.retries = $get("retries");
      locator.scaleType = $get("scaleType");
      locator.scalePercent = $get("scalePercent");
      locator.scaleWidth = $get("scaleWidth");
      locator.scaleHeight = $get("scaleHeight");
      locator.readLimit = $get("readLimit");
      locator.webcamLiveFeedCode = $get("webcamLiveFeedCode");
      locator.overlayPoints = getReportPointIdsArray();
      
      HttpDataSourceDwr.saveHttpImagePointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  function scaleTypeChanged() {
      var type = $get("scaleType");
      if (type == <c:out value="<%= HttpImagePointLocatorVO.SCALE_TYPE_NONE %>"/>) {
          hide("scalePercentRow");
          hide("scaleWidthRow");
          hide("scaleHeightRow");
      }
      else if (type == <c:out value="<%= HttpImagePointLocatorVO.SCALE_TYPE_PERCENT %>"/>) {
          show("scalePercentRow");
          hide("scaleWidthRow");
          hide("scaleHeightRow");
      }
      else if (type == <c:out value="<%= HttpImagePointLocatorVO.SCALE_TYPE_BOX %>"/>) {
          hide("scalePercentRow");
          show("scaleWidthRow");
          show("scaleHeightRow");
      }
  }
  
  <%-- Begin edit for adding overlay points --%>
  var pointsArray = new Array();
  var reportPointsArray = new Array();
  var pointLookupText = ""; //For selection to remain in the filter

  <c:forEach items="${userPoints}" var="dp">
  <c:if test="${dp.pointLocator.dataTypeId != 5}">
  pointsArray[pointsArray.length] = {
      id : ${dp.id}, 
      name : '${sst:escapeLessThan(sst:quotEncode(dp.extendedName))}'.replace('&lt;', '<'),
      fancyName: '${sst:escapeLessThan(sst:quotEncode(dp.extendedName))}'.replace('&lt;', '<'),
      type : '<m2m2:translate message="${dp.dataTypeMessage}" escapeDQuotes="true"/>',
  };
  </c:if>
  </c:forEach>

  function initImpl() {
	  // Create the lookup
	  new dijit.form.ComboBox({
	    store: new dojo.store.Memory({ data: pointsArray }),
	    labelType: "html",
	    labelAttr: "fancyName",
	    searchAttr: "name",
	    autoComplete: false,
	    style: "width: 254px;",
	    queryExpr: "*\${0}*",
	    highlightMatch: "all",
	    required: false,
	    dropDownPosition: ["above"],
	    onChange: function(point) {
	        if (this.item) {
	            selectPoint(this.item.id);
	            this.loadAndOpenDropDown();
	            this.set('displayedValue',pointLookupText);
	            if(typeof(this._startSearch) == 'function')
	                this._startSearch(pointLookupText); //Dangerous because could change, but works!
	       }
	    },
	    onKeyUp: function(event){
	        pointLookupText = this.get('displayedValue');
	    }
	  }, "pointLookup");
	
	  createContextualMessageNode("overlayPointsContainer", "context");
  }

  function selectPoint(pointId){
	if(!alreadyAddedToReportPointsArray(pointId)){
	    addToReportPointsArray(pointId);
	    writeReportPointsArray();
	}
  }
  
  /**
   * Does the context array already have this item
   */
  function alreadyAddedToReportPointsArray(id){
	  
      //First if the id is the id of the current point we don't allow adding it
      if(id == currentPoint.id)
          return true;
      
	  for(var i=0; i<reportPointsArray.length; i++){
	   if(reportPointsArray[i].pointId == id)
		   return true;
	  }
	  
	  return false;
  }  
  
  function addToReportPointsArray(pointId) {
      var data = getElement(pointsArray, pointId);
      if (data) {
          // Missing names imply that the point was deleted, so ignore.
          reportPointsArray[reportPointsArray.length] = {
              pointId: pointId,
              pointName : data.name,
              pointType : data.type
          };
          //Disable in list
          data.fancyName = "<span class='disabled'>"+ data.name +"</span>";
      }
  }

  function writeReportPointsArray() {
      dwr.util.removeAllRows("reportPointsTable");
      if (reportPointsArray.length == 0) {
          show($("reportPointsTableEmpty"));
          hide($("reportPointsTableHeaders"));
      }
      else {
          hide($("reportPointsTableEmpty"));
          show($("reportPointsTableHeaders"));
          dwr.util.addRows("reportPointsTable", reportPointsArray,
              [
                  function(data) { return data.pointName; },
                  function(data) { return data.pointType; },
                  function(data) { 
                          return "<img src='images/bullet_delete.png' class='ptr' "+
                                  "onclick='removeFromReportPointsArray("+ data.pointId +")'/>";
                  }
              ],
              {
                  rowCreator:function(options) {
                      var tr = document.createElement("tr");
                      tr.className = "smRow"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                      return tr;
                  }
              });
      }
  }

  function removeFromReportPointsArray(pointId) {
      for (var i=reportPointsArray.length-1; i>=0; i--) {
          if (reportPointsArray[i].pointId == pointId)
              reportPointsArray.splice(i, 1);
      }
      writeReportPointsArray();
      var data = getElement(pointsArray, pointId);
      if(data)
          data.fancyName = data.name;
  }
  
  function getReportPointIdsArray() {
      var points = new Array();
      for (var i=0; i<reportPointsArray.length; i++)
          points[points.length] = reportPointsArray[i].pointId;
      return points;
  }
  <%-- End edit for adding overlay points --%>
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.httpImage.desc" helpId="httpImageDS">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.updatePeriod"/></td>
    <td class="formField">
      <input type="text" id="updatePeriods" value="${dataSource.updatePeriods}" class="formShort"/>
      <tag:timePeriods id="updatePeriodType" value="${dataSource.updatePeriodType}" s="true" min="true" h="true"/>
    </td>
  </tr>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="httpImagePP">
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.url"/></td>
    <td class="formField">
      <input id="url" type="text" class="formLong"/>
      <tag:img png="bullet_go" onclick="window.open($get('url'), 'httpImageTarget')" title="dsEdit.httpImage.openUrl"/>
    </td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.timeout"/></td>
    <td class="formField"><input id="timeoutSeconds" type="text"/></td>
  </tr>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.retries"/></td>
    <td class="formField"><input id="retries" type="text"/></td>
  </tr>

  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.scalingType"/></td>
    <td class="formField">
      <select id="scaleType" onchange="scaleTypeChanged()">
        <option value="<c:out value="<%= HttpImagePointLocatorVO.SCALE_TYPE_NONE %>"/>"><fmt:message key="dsEdit.httpImage.scalingType.none"/></option>
        <option value="<c:out value="<%= HttpImagePointLocatorVO.SCALE_TYPE_PERCENT %>"/>"><fmt:message key="dsEdit.httpImage.scalingType.percent"/></option>
        <option value="<c:out value="<%= HttpImagePointLocatorVO.SCALE_TYPE_BOX %>"/>"><fmt:message key="dsEdit.httpImage.scalingType.box"/></option>
      </select>
    </td>
  </tr>
  
  <tbody id="scalePercentRow">
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.scalePercent"/></td>
      <td class="formField"><input id="scalePercent" type="text"/></td>
    </tr>
  </tbody>
  
  <tbody id="scaleWidthRow">
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.scaleWidth"/></td>
      <td class="formField"><input id="scaleWidth" type="text"/></td>
    </tr>
  </tbody>
  
  <tbody id="scaleHeightRow">
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.scaleHeight"/></td>
      <td class="formField"><input id="scaleHeight" type="text"/></td>
    </tr>
  </tbody>
  
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.readLimit"/></td>
    <td class="formField"><input id="readLimit" type="text"/></td>
  </tr>
  
  <%-- Begin overlay point edit --%>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.overlayPoints"/></td>
    <td class="formField">
      <div id="pointLookup"></div>
      
      <table cellspacing="1" id="overlayPointsContainer">
        <tbody id="reportPointsTableEmpty" style="display:none;">
          <tr><th colspan="4"><fmt:message key="dsEdit.httpImage.noOverlayPoints"/></th></tr>
        </tbody>
        <tbody id="reportPointsTableHeaders" style="display:none;">
          <tr class="smRowHeader">
            <td><fmt:message key="common.pointName"/></td>
            <td><fmt:message key="pointEdit.template.dataType"/></td>
            <td></td>
          </tr>
        </tbody>
        <tbody id="reportPointsTable"></tbody>
      </table>
      <span id="overlayPoints" class="formError"></span>
    </td>
  </tr>  
  <%-- End overlay point edit --%>
  <tr>
    <td class="formLabelRequired"><fmt:message key="dsEdit.httpImage.liveFeed"/></td>
    <td class="formField"><textarea id="webcamLiveFeedCode" rows="10" cols="37"></textarea></td>
  </tr>
</tag:pointList>