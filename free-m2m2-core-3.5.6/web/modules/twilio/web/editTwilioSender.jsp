<%--
    Copyright (C) 2013 Infinite Automation Systems. All rights reserved.
    @author Phillip Dunlap
    <%@page import="com.infiniteautomation.vo.TwilioSenderVO"%>
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<script type="text/javascript">
  dojo.require("dojo.store.Memory");
  dojo.require("dijit.form.FilteringSelect");

  var allPoints = [];  
  var selectedPoints = [];  
  
  dojo.ready(function() {
      TwilioPublisherDwr.initSender(function(response) {
          dojo.forEach(response.data.allPoints, function(item) {
              allPoints.push({
                  id: item.id, 
                  name: item.extendedName, 
                  enabled: item.enabled, 
                  type: item.dataTypeString,
                  fancyName: item.extendedName
              });
          });
                    
          dojo.forEach(response.data.publisher.points, function(item) {
              addToSelectedArray(item.dataPointId, item.formatString, item.toPhoneNumber, item.includeTimestamp);
          });
          refreshSelectedPoints();
          
          // Create the lookup
          new dijit.form.FilteringSelect({
              store: new dojo.store.Memory({ data: allPoints }),
              labelAttr: "fancyName",
              labelType: "html",
              searchAttr: "name",
              autoComplete: false,
              style: "width: 254px;",
              queryExpr: "*\${0}*",
              highlightMatch: "all",
              required: false,
              onChange: function(point) {
                  if (this.item) {
                      selectPoint(this.item.id);
                      this.reset();
                  }
              }
          }, "pointLookup");        
      });
  });
        
  function selectPoint(pointId) {
      if (!containsPoint(pointId)) {
          addToSelectedArray(pointId, null, true);
          refreshSelectedPoints();
      }
  }
  
  function containsPoint(pointId) {
      return getElement(selectedPoints, pointId, "id") != null;
  }
  
  function addToSelectedArray(pointId, formatString, toPhoneNumber, includeTimestamp) {
      var data = getElement(allPoints, pointId);
      
      if (formatString == null)
          formatString = data.name;
      
      if (data) {
          data.fancyName = "<span class='disabled'>"+ data.name +"</span>";
          
          // Missing names imply that the point was deleted, so ignore.
          selectedPoints[selectedPoints.length] = {
              id : pointId,
              pointName : data.name,
              enabled : data.enabled,
              pointType : data.type,
              formatString: formatString,
              toPhoneNumber: toPhoneNumber,
              includeTimestamp: includeTimestamp
          };
      }
  }
  
  function removeFromSelectedPoints(pointId) {
      removeElement(selectedPoints, pointId);
      refreshSelectedPoints();
      
      var data = getElement(allPoints, pointId);
      if (data)
          data.fancyName = data.name;
  }
  
  function refreshSelectedPoints() {
      dwr.util.removeAllRows("selectedPoints");
      if (selectedPoints.length == 0)
          show("selectedPointsEmpty");
      else {
          hide("selectedPointsEmpty");
          dwr.util.addRows("selectedPoints", selectedPoints,
              [
                  function(data) { return data.pointName; },
                  function(data) { return "<img src='images/"+ (data.enabled ? "brick_go" : "brick_stop") +".png'/>"; },
                  function(data) { return data.pointType; },
                  function(data) {
                          return "<input type='text' value='"+ data.formatString +"' "+
                                  "onblur='updateFormatString("+ data.id +", this.value)'/>";
                  },
                  function(data) {
                      return "<input type='text' value='"+ data.toPhoneNumber +"' "+
                              "onblur='updateToPhoneNumber("+ data.id +", this.value)'/>";
              	  },
                  function(data) {
                          return "<input type='checkbox' "+ (data.includeTimestamp ? "checked='checked' " : "") +
                                  "onclick='updateIncludeTimestamp("+ data.id +", this.checked)'/>";
                  },
                  function(data) { 
                          return "<img src='images/bullet_delete.png' class='ptr' "+
                                  "onclick='removeFromSelectedPoints("+ data.id +")'/>";
                  }
              ],
              {
                  rowCreator: function(options) {
                      var tr = document.createElement("tr");
                      tr.className = "row"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                      return tr;
                  },
                  cellCreator: function(options) {
                      var td = document.createElement("td");
                      if (options.cellNum == 1 || options.cellNum == 4)
                          td.align = "center";
                      return td;
                  } 
              });
      }
  }
  
  function updateFormatString(pointId, formatString) {
      updateElement(selectedPoints, pointId, "formatString", formatString);
  }
  
  function updateToPhoneNumber(pointId, toPhoneNumber) {
	  updateElement(selectedPoints, pointId, "toPhoneNumber", toPhoneNumber);
  }
  
  function updateIncludeTimestamp(pointId, includeTimestamp) {
      updateElement(selectedPoints, pointId, "includeTimestamp", includeTimestamp);
  }
  
  function savePublisherImpl(name, xid, enabled, cacheWarningSize, cacheDiscardSize, changeOnly, sendSnapshot, 
  	snapshotSendPeriods, snapshotSendPeriodType) {
      // Clear messages.
      hide("urlMsg");
      hide("pointsMsg");
      
      var points = new Array();
      for (var i=0; i<selectedPoints.length; i++)
          points[points.length] = {dataPointId: selectedPoints[i].id, formatString: selectedPoints[i].formatString,
                  toPhoneNumber: selectedPoints[i].toPhoneNumber, includeTimestamp: selectedPoints[i].includeTimestamp};
      
      TwilioPublisherDwr.saveTwilioSender(name, xid, enabled, points, $get("url"), $get("fromPhone"), $get("accountSid"), $get("authToken"),
      	 cacheWarningSize, cacheDiscardSize, savePublisherCB);
  }
  // TODO: automate connection test
</script>

<table cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top">
      <div class="borderDiv marR marB">
        <table>
          <tr>
            <td colspan="2" class="smallTitle"><fmt:message key="publisherEdit.twilioSender.props"/> <tag:help id="twilioSenderPublishing"/></td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.twilioSender.url"/></td>
            <td class="formField">
              <input type="text" id="url" value="${publisher.url}" class="formLong"/>
              <div id="urlMsg" class="formError" style="display:none;"></div>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.twilioSender.fromPhone"/></td>
            <td class="formField">
              <input type="text" id="fromPhone" value="${publisher.fromPhoneNumber}" class="formLong"/>
              <div id="fromPhoneMsg" class="formError" style="display:none;"></div>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.twilioSender.accountSid"/></td>
            <td class="formField">
              <input type="text" id="accountSid" value="${publisher.accountSid}" class="formLong"/>
              <div id="accountSidMsg" class="formError" style="display:none;"></div>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="publisherEdit.twilioSender.authToken"/></td>
            <td class="formField">
              <input type="text" id="authToken" value="${publisher.authToken}" class="formLong"/>
              <div id="authTokenMsg" class="formError" style="display:none;"></div>
            </td>
          </tr>    
        </table>
      </div>
    </td>  
  </tr>
</table>

<table cellpadding="0" cellspacing="0"><tr><td>
  <div class="borderDiv">
    <table width="100%">
      <tr>
        <td class="smallTitle"><fmt:message key="publisherEdit.points"/></td>
        <td align="right"><div id="pointLookup"></div></td>
      </tr>
    </table>
    
    <table cellspacing="1" cellpadding="0">
      <tr class="rowHeader">
        <td><fmt:message key="publisherEdit.point.name"/></td>
        <td><fmt:message key="publisherEdit.point.status"/></td>
        <td><fmt:message key="publisherEdit.point.type"/></td>
        <td><fmt:message key="publisherEdit.twilioSender.point.formatString"/></td>
        <td><fmt:message key="publisherEdit.twilioSender.toPhoneNumber"/></td>
        <td></td>
      </tr>
      <tbody id="selectedPointsEmpty" style="display:none;"><tr><td colspan="5"><fmt:message key="publisherEdit.noPoints"/></td></tr></tbody>
      <tbody id="selectedPoints"></tbody>
    </table>
    <div id="pointsMsg" class="formError" style="display:none;"></div>
  </div>
</td></tr></table>

