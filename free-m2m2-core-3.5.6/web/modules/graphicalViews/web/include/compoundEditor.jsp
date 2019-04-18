<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%@page import="com.serotonin.m2m2.gviews.component.SimpleCompoundComponent"%>
<div id="compoundEditorPopup" style="display:none;left:0px;top:0px;" class="windowDiv">
  <table cellpadding="0" cellspacing="0"><tr><td>
    <table width="100%">
      <tr>
        <td>
          <tag:img png="pencil" title="viewEdit.compound.editor" style="display:inline;"/>
          <span class="copyTitle" id="compoundComponentName"></span>
        </td>
        <td align="right">
          <tag:img png="save" onclick="compoundEditor.save()" title="common.save" style="display:inline;"/>&nbsp;
          <tag:img png="cross" onclick="compoundEditor.close()" title="common.close" style="display:inline;"/>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td class="formLabelRequired"><fmt:message key="viewEdit.compound.name"/></td>
        <td class="formField"><input id="compoundName" type="text"/></td>
      </tr>
      <tbody id="simpleCompoundAttrs">
        <tr>
          <td class="formLabel"><fmt:message key="viewEdit.compound.backgroundColour"/></td>
          <td class="formField"><input id="compoundBackgroundColour" type="text"/></td>
        </tr>
      </tbody>
      <tbody id="imageChartAttrs">
        <tr>
          <td class="formLabelRequired"><fmt:message key="viewEdit.compound.width"/></td>
          <td class="formField"><input id="imageChartWidth" type="text"/></td>
        </tr>
        <tr>
          <td class="formLabelRequired"><fmt:message key="viewEdit.compound.height"/></td>
          <td class="formField"><input id="imageChartHeight" type="text"/></td>
        </tr>
        <tr>
          <td class="formLabelRequired"><fmt:message key="viewEdit.compound.duration"/></td>
          <td class="formField">
            <input type="text" id="imageChartDurationPeriods" class="formShort"/>
            <tag:timePeriods id="imageChartDurationType" s="true" min="true" h="true" d="true" w="true" mon="true" y="true"/>
          </td>
        </tr>
        <tr>
          <td class="formLabelRequired"><fmt:message key="viewEdit.settings.updatePeriod"/></td>
          <td class="formField">
            <input type="text" id="imageChartUpdatePeriods" class="formShort"/>
            <tag:timePeriods id="imageChartUpdatePeriodType" s="true" min="true" h="true" d="true" w="true" />
          </td>
        </tr>
      </tbody>
      <tbody id="pointLists"></tbody>
    </table>
  </td></tr></table>
  
  <script type="text/javascript">
    function CompoundEditor() {
        this.component = null;
        this.pointList = [];
        this.selects = {};
        
        this.open = function(compId) {
            GraphicalViewDwr.getViewComponent(compId, function(comp) {
                compoundEditor.component = comp;
                $set("compoundComponentName", comp.displayName);
                
                // Update the point lists
                compoundEditor.updatePointLists();
                
                // Update the data in the form.
                $set("compoundName", comp.name);
                
                if (comp.defName == "simpleCompound") {
                    $set("compoundBackgroundColour", comp.backgroundColour);
                    show("simpleCompoundAttrs");
                }
                else
                    hide("simpleCompoundAttrs");
                
                if (comp.defName == "imageChart") {
                    $set("imageChartWidth", comp.width);
                    $set("imageChartHeight", comp.height);
                    $set("imageChartDurationType", comp.durationType);
                    $set("imageChartDurationPeriods", comp.durationPeriods);
                    $set("imageChartUpdatePeriodType", comp.updatePeriodType);
                    $set("imageChartUpdatePeriods", comp.updatePeriods);
                    
                    show("imageChartAttrs");
                }
                else
                    hide("imageChartAttrs");
                
                show("compoundEditorPopup");
            });
            
            positionEditor(compId, "compoundEditorPopup");
        };
        
        this.close = function() {
            hide("compoundEditorPopup");
            hideContextualMessages("compoundEditorPopup");
            //Destroy the widgets
            for(var id in compoundEditor.selects){
            	compoundEditor.selects[id].destroyRecursive(true);
            	delete compoundEditor.selects[id];
            }
        };
        
        this.save = function() {
            hideContextualMessages("compoundEditorPopup");
            
            // Gather the point settings
            var pointChildren = compoundEditor.getPointChildren();
            var childPointIds = new Array();
            var sel;
            for (var i=0; i<pointChildren.length; i++)
                childPointIds.push({key: pointChildren[i].id, value: compoundEditor.selects[pointChildren[i].id].get('value')});
            
            if (compoundEditor.component.defName == "simpleCompound")
                GraphicalViewDwr.saveSimpleCompoundComponent(compoundEditor.component.id, $get("compoundName"),
                        $get("compoundBackgroundColour"), childPointIds, compoundEditor.saveCB);
            else if (compoundEditor.component.defName == "imageChart")
                GraphicalViewDwr.saveImageChartComponent(compoundEditor.component.id, $get("compoundName"),
                        $get("imageChartWidth"), $get("imageChartHeight"), $get("imageChartDurationType"),
                        $get("imageChartDurationPeriods"),$get("imageChartUpdatePeriodType"),
                        $get("imageChartUpdatePeriods"), childPointIds, compoundEditor.saveCB);
            else
                GraphicalViewDwr.saveCompoundComponent(compoundEditor.component.id, $get("compoundName"), childPointIds,
                        compoundEditor.saveCB);
        };
        
        this.saveCB = function(response) {
            if (response.hasMessages)
                showDwrMessages(response.messages);
            else {
                if (compoundEditor.component.defName == "simpleCompound")
                    $("c"+ compoundEditor.component.id +"Info").style.background = $get("compoundBackgroundColour");
                
                compoundEditor.close();
                MiscDwr.notifyLongPoll(mango.longPoll.pollSessionId);
            }
        };
        
        this.setPointList = function(pointList) {
            compoundEditor.pointList = pointList;
        };
        
        this.updatePointLists = function() {
            var pointChildren = compoundEditor.getPointChildren();
            
            // Create the select controls
            dwr.util.removeAllRows("pointLists");
            dwr.util.addRows("pointLists", pointChildren,
                [
                    function(data) { return data.description; },
                    function(data) { return '<select id="compoundPointSelect'+ data.id +'"></select>'; }
                ],
                {
                    cellCreator: function(options) {
                        var td = document.createElement("td");
                        if (options.cellNum == 0) {
                            if (compoundEditor.component.defName == "simpleCompound" &&
                                    options.rowData.id == "<%= SimpleCompoundComponent.LEAD_POINT %>")
                                td.className = "formLabelRequired";
                            else
                                td.className = "formLabel";
                        }
                        else if (options.cellNum == 1)
                            td.className = "formField";
                        return td;
                    }
                }
            );
            
            //Create drop down lists
            for (var i=0; i<pointChildren.length; i++) {
            	var storeData = [];
            	for (p=0; p<compoundEditor.pointList.length; p++) {
                    if (contains(pointChildren[i].dataTypes, compoundEditor.pointList[p].dataType))
                    	storeData[storeData.length] = compoundEditor.pointList[p];
                }
            	//Create the select
            	compoundEditor.selects[pointChildren[i].id] = new dijit.form.FilteringSelect({
                    store: new dojo.store.Memory({ data: storeData }),
                    autoComplete: false,
                    queryExpr: "*\${0}*",
                    highlightMatch: "all",
                    required: true,
                }, "compoundPointSelect"+ pointChildren[i].id);  
            	//Set the control default value
            	compoundEditor.selects[pointChildren[i].id].set('value', pointChildren[i].viewComponent.dataPointId);
            }
        };
        
        this.getPointChildren = function() {
            var pointChildren = new Array();
            for (var i=0; i<compoundEditor.component.childComponents.length; i++) {
                if (compoundEditor.component.childComponents[i].viewComponent.pointComponent)
                    pointChildren.push(compoundEditor.component.childComponents[i]);
            }
            return pointChildren;
        };
    }
    var compoundEditor = new CompoundEditor();
  </script>
</div>