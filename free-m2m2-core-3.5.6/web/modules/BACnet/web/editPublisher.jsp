<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@ page import="com.serotonin.ma.bacnet.pub.BACnetPublishedPoint"%>
<%@ page import="com.serotonin.bacnet4j.type.enumerated.ObjectType"%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<script type="text/javascript">
dojo.require("dojo.store.Memory");
dojo.require("dijit.form.ComboBox");

var allPoints = [];  
var selectedPoints = [];  
var pointLookupText = ""; // For selection to remain in the filter

dojo.ready(function() {
	BACnetPublisherDwr.initSender(function(response) {
        dojo.forEach(response.data.allPoints, function(item) {
            allPoints.push({
                id: item.id, 
                name: item.extendedName, 
                enabled: item.enabled, 
                type: item.dataTypeString,
                fancyName: encodeHtml(item.extendedName),
                settable: item.pointLocator.settable,
            });
        });
        
        dojo.forEach(response.data.publisher.points, function(item) {
            addToSelectedArray(item.dataPointId, item.instanceNumber, item.objectName, item.objectTypeId);
        });
        refreshSelectedPoints();
        
        // Create the lookup
        var cbox = new dijit.form.ComboBox({
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
                    this.loadAndOpenDropDown();
                    this.set('displayedValue',pointLookupText);
                    if (typeof(this._startSearch) == 'function')
                        this._startSearch(pointLookupText); //Dangerous because could change, but works!
                }
            },
            onKeyUp: function(event){
                pointLookupText = this.get('displayedValue');
            },
        }, "pointLookup");        
    });
});

function selectPoint(pointId) {
    if (!containsPoint(pointId)) {
        addToSelectedArray(pointId, null, null);
        refreshSelectedPoints();
    }
}

function containsPoint(pointId) {
    return getElement(selectedPoints, pointId, "id") != null;
}

function addToSelectedArray(pointId, instanceNumber, objectName, objectTypeId) {
    var data = getElement(allPoints, pointId);
    
    if (instanceNumber == null) {
    	instanceNumber = 0;
    	
    	for (var i=0; i<selectedPoints.length; i++) {
    		if (selectedPoints[i].pointType == data.type)
    			instanceNumber = parseInt(selectedPoints[i].instanceNumber) + 1;
    	}
    }
        
    if (objectName == null)
    	objectName = data.name;
    	
    if (objectTypeId == null)
        objectTypeId = getDefaultObjectType(data.type, data.settable);
    
    if (data) {
        data.fancyName = "<span class='disabled'>"+ encodeHtml(data.name) +"</span>";
        
        // Missing names imply that the point was deleted, so ignore.
        selectedPoints[selectedPoints.length] = {
            id : pointId,
            pointName : data.name,
            enabled : data.enabled,
            pointType : data.type,
            settable : data.settable,
            instanceNumber: instanceNumber,
            objectName: objectName,
            objectTypeId: objectTypeId
        };
    }
}

function getDefaultObjectType(dataType, settable) {
    return null;
}

function removeFromSelectedPoints(pointId) {
    removeElement(selectedPoints, pointId);
    refreshSelectedPoints();
    
    var data = getElement(allPoints, pointId);
    if (data)
        data.fancyName = encodeHtml(data.name);
}

function refreshSelectedPoints() {
    dwr.util.removeAllRows("selectedPoints");
    if (selectedPoints.length == 0)
        show("selectedPointsEmpty");
    else {
        hide("selectedPointsEmpty");
        dwr.util.addRows("selectedPoints", selectedPoints,
            [
                function(data) { return encodeHtml(data.pointName); },
                function(data) { return "<img src='images/"+ (data.enabled ? "brick_go" : "brick_stop") +".png'/>"; },
                function(data) { return data.pointType; },
                function(data) {
                    var field = "<select onblur='updateObjectTypeId(" + data.id + ", this.value);'";
                    if (data.pointType === 'Multistate') {
                        field += '><option value="<c:out value="<%= ObjectType.multiStateInput.intValue() %>"/>" label="MultiState Input"' + (data.objectTypeId == <c:out value="<%= ObjectType.multiStateInput.intValue() %>"/> ? "selected=selected></option>" : "></option>") +
                          '<option value="<c:out value="<%= ObjectType.analogInput.intValue() %>"/>" label="Analog Input"' + (data.objectTypeId == <c:out value="<%= ObjectType.analogInput.intValue() %>"/> ? "selected=selected></option>" : "></option>");
                        if(data.settable)
                            field += '<option value="<c:out value="<%= ObjectType.multiStateValue.intValue() %>"/>" label="MultiState Value"' + (data.objectTypeId == <c:out value="<%= ObjectType.multiStateValue.intValue() %>"/> ? "selected=selected></option>" : "></option>") +
                              '<option value="<c:out value="<%= ObjectType.analogValue.intValue() %>"/>" label="Analog Value"' + (data.objectTypeId == <c:out value="<%= ObjectType.analogValue.intValue() %>"/> ? "selected=selected></option>" : "></option>");
                    } else if(data.pointType === 'Numeric') {
                        field += '><option value="<c:out value="<%= ObjectType.analogInput.intValue() %>"/>" label="Analog Input"' + (data.objectTypeId == <c:out value="<%= ObjectType.analogInput.intValue() %>"/> ? "selected=selected></option>" : "></option>");
                        if(data.settable)
                            field += '<option value="<c:out value="<%= ObjectType.analogValue.intValue() %>"/>" label="Analog Value"' + (data.objectTypeId == <c:out value="<%= ObjectType.analogValue.intValue() %>"/> ? "selected=selected></option>" : "></option>");
                    } else if(data.pointType === 'Binary') {
                        field += '><option value="<c:out value="<%= ObjectType.binaryInput.intValue() %>"/>" label="Binary Input"' + (data.objectTypeId == <c:out value="<%= ObjectType.binaryInput.intValue() %>"/> ? "selected=selected></option>" : "></option>");
                        if(data.settable)
                            field += '<option value="<c:out value="<%= ObjectType.binaryValue.intValue() %>"/>" label="Binary Value"' + (data.objectTypeId == <c:out value="<%= ObjectType.binaryValue.intValue() %>"/> ? "selected=selected></option>" : "></option>");
                    } else if(data.pointType === 'Alphanumeric')
                        field += ' disabled><option value="<c:out value="<%= ObjectType.characterstringValue.intValue() %>"/>" label="Characterstring Value" selected=selected></option>';
                    field += "</select>";
                    return field;
                },
                function(data) {
                        return "<input type='text' value='"+ data.instanceNumber +"' class='formShort' "+
                                "onblur='updateInstanceNumber("+ data.id +", this.value);'/>";
                },
                function(data) {
                        return "<input type='text' value='"+ encodeQuotes(data.objectName) +"' "+
                                "onblur='updateObjectName("+ data.id +", this.value);'/>";
                },
                function(data) { 
                        return "<img src='images/delete.png' class='ptr' "+
                                "onclick='removeFromSelectedPoints("+ data.id +");'/>";
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

function updateInstanceNumber(pointId, instanceNumber) {
    updateElement(selectedPoints, pointId, "instanceNumber", instanceNumber);
}

function updateObjectName(pointId, objectName) {
    updateElement(selectedPoints, pointId, "objectName", objectName);
}

function updateObjectTypeId(pointId, objectTypeId) {
    updateElement(selectedPoints, pointId, "objectTypeId", objectTypeId);
}

function savePublisherImpl(name, xid, enabled, cacheWarningSize, cacheDiscardSize, changesOnly, sendSnapshot,
        snapshotSendPeriods, snapshotSendPeriodType) {
    // Clear messages.
    hide("configCtxmsg");
    hide("pointsCtxmsg");
    
    var points = new Array();
    for (var i=0; i<selectedPoints.length; i++) {
        points[points.length] = {
    		    dataPointId: selectedPoints[i].id, 
    		    instanceNumber: selectedPoints[i].instanceNumber,
    		    objectName: selectedPoints[i].objectName,
    		    objectTypeId: selectedPoints[i].objectTypeId
	    };
    }
    
    BACnetPublisherDwr.saveBACnetPublisher(name, xid, enabled, points, $get("localDeviceConfig"), cacheWarningSize, 
    		cacheDiscardSize, changesOnly, sendSnapshot, snapshotSendPeriods, snapshotSendPeriodType, savePublisherCB);
}
</script>

<table cellpadding="0" cellspacing="0">
  <tr>
    <td valign="top">
      <div class="borderDiv marR marB">
        <table>
          <tr>
            <td colspan="2" class="smallTitle">
              <fmt:message key="mod.bacnet.pub.props"/>
              <tag:help id="bacnetPublisher"/>
            </td>
          </tr>
          
          <tr>
            <td class="formLabelRequired"><fmt:message key="mod.bacnet.localDeviceConfig"/></td>
            <td class="formField">
              <sst:select id="localDeviceConfig" value="${publisher.localDeviceConfig}">
                <c:forEach items="${configs}" var="config">
                  <sst:option value="${config.key}"><m2m2:translate message="${config.value}"/></sst:option>
                </c:forEach>
              </sst:select>
              <div id="configCtxmsg" class="formError" style="display:none;"></div>
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
        <td><fmt:message key="mod.bacnet.objectType"/></td>
        <td><fmt:message key="mod.bacnet.objectInstanceId"/></td>
        <td><fmt:message key="mod.bacnet.objectName"/></td>
        <td></td>
      </tr>
      <tbody id="selectedPointsEmpty" style="display:none;"><tr><td colspan="5"><fmt:message key="publisherEdit.noPoints"/></td></tr></tbody>
      <tbody id="selectedPoints"></tbody>
    </table>
    <div id="pointsCtxmsg" class="formError" style="display:none;"></div>
  </div>
</td></tr></table>