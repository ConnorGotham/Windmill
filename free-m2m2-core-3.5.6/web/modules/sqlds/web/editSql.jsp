<%--
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Matthew Lohbihler
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<%@page import="com.serotonin.m2m2.sql.SqlPointLocatorVO"%>


<script type="text/javascript">
dojo.require("dojo.store.Memory");
dojo.require("dijit.form.FilteringSelect");


  function initImpl() {
      sqlTestButton(false);
      rowBasedQueryChange();
      initParameters();
  }
  
  function sqlTest() {
      $set("sqlTestError", "<fmt:message key="dsEdit.sql.testing"/>");
      show("sqlTestError");
      sqlTestButton(true);
      hide("sqlTestResults");
      dwr.util.removeAllRows("sqlTestResults");
      SqlEditDwr.sqlTestStatement($get("driverClassname"), $get("connectionUrl"), $get("username"), 
              $get("password"), $get("selectStatement"), $get("rowBasedQuery"), sqlTestCB);
  }
  
  function sqlTestCB() {
      setTimeout(sqlTestUpdate, 1000);
  }
  
  function sqlTestUpdate() {
      SqlEditDwr.sqlTestStatementUpdate(sqlTestUpdateCB);
  }
  
  function sqlTestUpdateCB(result) {
      if (result) {
          if (result.error)
              $set("sqlTestError", result.error);
          else {
              hide("sqlTestError");
              var tbody, td, tr, r, c;
              tbody = $("sqlTestResults");
              tr = document.createElement("tr");
              tr.className = "smRowHeader";
              tbody.appendChild(tr);
              for (c=0; c<result.resultTable[0].length; c++) {
                  td = document.createElement("td");
                  $set(td, result.resultTable[0][c]);
                  tr.appendChild(td);
              }
              
              for (r=1; r<result.resultTable.length; r++) {
                  tr = document.createElement("tr");
                  tr.className = "smRow"+ (r % 2 == 0 ? "" : "Alt");
                  tbody.appendChild(tr);
                  for (c=0; c<result.resultTable[r].length; c++) {
                      td = document.createElement("td");
                      $set(td, result.resultTable[r][c]);
                      tr.appendChild(td);
                  }
              }
              
              show(tbody);
          }
          sqlTestButton(false);
      }
      else
          sqlTestCB();
  }
  
  function sqlTestButton(testing) {
      setDisabled($("sqlTestBtn"), testing);
  }

  function saveDataSourceImpl(basic) {
      SqlEditDwr.saveSqlDataSource(basic, $get("updatePeriods"),
              $get("updatePeriodType"), $get("driverClassname"), $get("connectionUrl"), $get("username"),
              $get("password"), $get("selectStatement"), $get("rowBasedQuery"), saveDataSourceCB);
  }
  
  function writePointListImpl(points) {
      var rowBasedQuery = $("rowBasedQuery");
      if (!points || points.length == 0) {
          setDisabled(rowBasedQuery, false);
          hide("rowBasedQueryWarning");
      }
      else {
          setDisabled(rowBasedQuery, true);
          show("rowBasedQueryWarning");
      }
  }
  
  function appendPointListColumnFunctions(pointListColumnHeaders, pointListColumnFunctions) {
      pointListColumnHeaders[pointListColumnHeaders.length] = "<fmt:message key='dsEdit.sql.rowId'/>";
      pointListColumnFunctions[pointListColumnFunctions.length] = function(p) { return p.pointLocator.fieldName; };
  }
  
  function editPointCBImpl(locator) {
      $set("fieldName", locator.fieldName);
      $set("timeOverrideName", locator.timeOverrideName);
      $set("updateStatement", locator.updateStatement);
      $set("dataTypeId", locator.dataTypeId);
      $set("tableModifier",locator.tableModifier)
      $set("dateFormat",locator.dateParameterFormat);
	  parameterArray = locator.parameters; //Set the parameters      
      writeParameterArray(); //Create the table
      tableModifierChanged(); //Show/hide what we need

  }
  
  function savePointImpl(locator) {
      delete locator.settable;
      delete locator.relinquishable;
      
      locator.fieldName = $get("fieldName");
      locator.timeOverrideName = $get("timeOverrideName");
      locator.updateStatement = $get("updateStatement");
      locator.dataTypeId = $get("dataTypeId");
      locator.tableModifier = $get("tableModifier");
      locator.parameters = parameterArray;
      locator.dateParameterFormat = $get("dateFormat");
      
      SqlEditDwr.saveSqlPointLocator(currentPoint.id, $get("xid"), $get("name"), locator, savePointCB);
  }
  
  function rowBasedQueryChange() {
      if ($get("rowBasedQuery")) {
          $set("fieldNameLabel", "<fmt:message key="dsEdit.sql.rowId"/>");
          //$set("fieldNameTitle", "<fmt:message key="dsEdit.sql.rowId"/>");
          hide("columnBasedProperties");
      }
      else {
          $set("fieldNameLabel", "<fmt:message key="dsEdit.sql.columnName"/>");
          //$set("fieldNameTitle", "<fmt:message key="dsEdit.sql.columnName"/>");
          show("columnBasedProperties");
      }
  }
  
  //Methods for Parameters in Update
    var parameterArray = [];
	var parameterTypeArray = [];
	var parameterTypeSelect;
	//TODO This will eventually be passed in via DWR
	// need to modify the Dwr Core Source first.
	parameterTypeArray[parameterTypeArray.length] = {
		type: "Double",
		typeId: 1
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "Integer",
			typeId: 2
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "String",
			typeId: 3
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "Boolean",
			typeId: 4
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "Date and Time",
			typeId: 5
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "Date",
			typeId: 6
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "Time",
			typeId: 7
	};
	parameterTypeArray[parameterTypeArray.length] = {
			type: "Big Integer",
			typeId: 8
	};
	
	
	function initParameters(){
		if(!parameterTypeSelect)
			parameterTypeSelect = new dijit.form.FilteringSelect({
		          store: new dojo.store.Memory({ data: parameterTypeArray }),
		          labelAttr: "type",
		          searchAttr: "type",
		          autoComplete: false,
		          queryExpr: "*\${0}*",
		          highlightMatch: "all",
		          onChange: function(parameterType) {
	                  if (this.item) {
	                      if((this.item.typeId === 5)
	                    	  ||(this.item.typeId === 6)
	                    	  ||(this.item.typeId === 7)){
							show("dateFormat");
						}else{
							hide("dateFormat");
						}
	                  }
	              },
		          required: false
		          
		      }, "parameterType");  
	}
	
  	function tableModifierChanged(){
  		//Should disable all other inputs
  		if($get("tableModifier") === true){
  			$set("dataTypeId",4); //Alphanumeric
  			hide("dataTypeRow");
  			hide("columnNameRow");
  			hide("columnBasedProperties");
  			show("parametersRow");
  			show("dateFormatRow");
  		}else{
  			show("dataTypeRow");
  			show("columnNameRow");
  			show("columnBasedProperties");
  			hide("parametersRow");
  			hide("dateFormatRow");
  		}
  	}
  	
  	
    function addParameter() {
      var parameterType = parameterTypeSelect.item;
      if(parameterType === null)
    	  return; //Don't add empty ones
      //Store type
      //Store order 
      addToParameterArray(parameterType);
      writeParameterArray();
  }
  
  function addToParameterArray(parameterType) {
//       var data = getElement(parameterArray, parameterType);
//       if (data) {
//           //Remove the old one and add the new one
//           removeFromParameterArray(parameterName);
//       }
      parameterArray[parameterArray.length] = parameterType.typeId;

  }
  
  function removeFromParameterArray(parameterOrder) {
      parameterArray.splice(parameterOrder, 1);
      writeParameterArray();
  }

  function getParameterType(typeId){
	  for(var i=0; i<parameterTypeArray.length; i++){
		  if(parameterTypeArray[i].typeId === typeId)
			  return parameterTypeArray[i].type;
	  }
	  return "unknown";
  }
  
  function writeParameterArray() {
      dwr.util.removeAllRows("contextTable");
      if (parameterArray.length == 0) {
          show($("contextTableEmpty"));
          hide($("contextTableHeaders"));
      }
      else {
          hide($("contextTableEmpty"));
          show($("contextTableHeaders"));
          dwr.util.addRows("contextTable", parameterArray,
              [		//TODO Make this editable dropdown and change to desc not id
                  function(data) { return getParameterType(data); },
                  function(data,info) { return info.rowIndex+1; },
                  function(data,info) { 
                          return "<img src='images/bullet_delete.png' class='ptr' "+
                                  "onclick='removeFromParameterArray("+ info.rowIndex +")'/>";
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
  
  
</script>

<tag:dataSourceAttrs descriptionKey="dsEdit.sql.desc" helpId="sqlDS">
  <jsp:attribute name="extraPanels">
    <td valign="top">
      <div class="borderDiv marB">
        <table cellspacing="1">
          <tr><td class="smallTitle"><fmt:message key="dsEdit.sql.test"/></td></tr>
          
          <tr>
            <td align="center">
              <input id="sqlTestBtn" type="button" value="<fmt:message key="dsEdit.sql.execute"/>" onclick="sqlTest();"/>
            </td>
          </tr>
          
          <tr><td id="sqlTestError"></td></tr>
          <tbody id="sqlTestResults"></tbody>
        </table>
      </div>
    </td>
  </jsp:attribute>
  
  <jsp:body>
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.updatePeriod"/></td>
      <td class="formField">
        <input type="text" id="updatePeriods" value="${dataSource.updatePeriods}" class="formShort"/>
        <tag:timePeriods id="updatePeriodType" value="${dataSource.updatePeriodType}" s="true" min="true" h="true"/>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.sql.driverClassName"/></td>
      <td class="formField"><input id="driverClassname" type="text" value="${dataSource.driverClassname}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.sql.connectionString"/></td>
      <td class="formField"><input id="connectionUrl" type="text" value="${dataSource.connectionUrl}"
              class="formLong"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.sql.username"/></td>
      <td class="formField"><input id="username" type="text" value="${dataSource.username}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.sql.password"/></td>
      <td class="formField"><input id="password" type="text" value="${dataSource.password}"/></td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.sql.select"/></td>
      <td class="formField">
        <textarea id="selectStatement" rows="10" cols="45">${dataSource.selectStatement}</textarea>
      </td>
    </tr>
    
    <tr>
      <td class="formLabelRequired"><fmt:message key="dsEdit.sql.rowQuery"/></td>
      <td class="formField">
        <sst:checkbox id="rowBasedQuery" selectedValue="${dataSource.rowBasedQuery}"
                onclick="rowBasedQueryChange()"/>
        <span id="rowBasedQueryWarning" style="display:none"><tag:img png="warn" title="dsEdit.sql.deleteWarn"/></span>
      </td>
    </tr>
  </jsp:body>
</tag:dataSourceAttrs>

<tag:pointList pointHelpId="sqlPP">
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.sql.tableModifier"/></td>
    <td class="formField"><sst:checkbox id="tableModifier" selectedValue="false"
                onclick="tableModifierChanged()"/></td>
  </tr>

  <tr id="dataTypeRow">
    <td class="formLabelRequired"><fmt:message key="dsEdit.pointDataType"/></td>
    <td class="formField"><tag:dataTypeOptions name="dataTypeId" excludeImage="true"/></td>
  </tr>
  
  <tr id="columnNameRow">
    <td id="fieldNameLabel" class="formLabelRequired"></td>
    <td class="formField"><input type="text" id="fieldName"/></td>
  </tr>
  
  <tbody id="columnBasedProperties">
    <tr>
      <td class="formLabel"><fmt:message key="dsEdit.sql.timeColumn"/></td>
      <td class="formField"><input type="text" id="timeOverrideName"/></td>
    </tr>
  </tbody>
  
  <tr>
    <td class="formLabel"><fmt:message key="dsEdit.sql.update"/></td>
    <td class="formField"><textarea id="updateStatement" cols="35" rows="4" name="updateStatement"></textarea></td>
  </tr>
  <tr id="parametersRow">
    <td class="formLabel"><fmt:message key="dsEdit.sql.parameters"/></td>
    <td class="formField">
      <select id="parameterType" data-dojo-id="parameterTypeSelect"></select>
           
      <tag:img png="add" onclick="addParameter();" title="common.add"/>
      
      <table cellspacing="1" id="contextContainer">
        <tbody id="contextTableEmpty" style="display:none;">
          <tr><th colspan="4"><fmt:message key="dsEdit.sql.noParameters"/></th></tr>
        </tbody>
        <tbody id="contextTableHeaders" style="display:none;">
          <tr class="smRowHeader">
            <td><fmt:message key="dsEdit.sql.parameterType"/></td>
            <td><fmt:message key="dsEdit.sql.parameterOrder"/></td>
            <td></td>
          </tr>
        </tbody>
        <tbody id="contextTable"></tbody>
      </table>
    </td>
    <tr id="dateFormatRow">
	    <td class="formLabel"><fmt:message key="dsEdit.sql.dateFormat"/></td>
	    <td class="formField"><input type="text" id="dateFormat" style="width:95%"/></td>
  	</tr>
</tag:pointList>