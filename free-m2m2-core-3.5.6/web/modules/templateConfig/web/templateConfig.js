/*
 *  Copyright (C) 2014 Infinite Automation Systems
 *  @author Phillip Dunlap
 *  
 * Welcome to our .js script! This script will:
 * 1. Handle selections on a drop down, indicate to the DWR what file to load. //Template Select
 * 2. Handle creating an entry form for the template's fields. //Template Dialog
 * 3. Supply the form with its correct information back to the DWR for import.
 * 4. Display the output of the import to the html.
 *
 */

var templateSelect;
var templateDialog;


require(["dijit/form/Select", "dijit/form/Button", "dijit/form/ValidationTextBox", "dijit/Dialog", "dojo/dom-construct", "dojo/dom-attr", "dojo/domReady!"], 
		function(Select, Button, ValidationTextBox, Dialog, domConstruct, domAttr) {
	
	templateSelect = { //namespace
			
initialize: function() {
	var buttonTitle = "";
	TemplateConfigDwr.getTemplateList(function(resp) {
		var opts = [];
		resp.data.templates.forEach(function(template){
			opts.push({"label":template,"value":template})
		})
		domConstruct.create("div", {id:"templateSubmit"},"base","first");
		domConstruct.create("br", {},"base","first");
		domConstruct.create("div", {id:"templateSelect"},"base","first");
		domConstruct.create("br", {},"base","first");
		domConstruct.create("div", {id:"templateSelectDesc"},"base","first");
		
		$("templateSelectDesc").innerHTML = resp.data.selectDesc;
		var sel = new Select({
			options:opts,
			id:"sels"
		},"templateSelect");
		
		var submit = new Button({
			label:resp.data.openButton,
			id:"but"
		},"templateSubmit");
		submit.on("click", function(){
			TemplateConfigDwr.openTemplate(sel.get("value"), templateDialog.openTemplate);
		});
	});
	
},

//Copied largely from emport.jsp
importUpdate: function() {
	TemplateConfigDwr.checkImportStatus(function(resp){
		if(resp.data.noImport)
			return;
		
		showDwrMessages(resp.messages, $("importMessages"));
		
		if(resp.data.complete) {
			TemplateConfigDwr.getImportCompleteTranslation(function(resp) {
				$set("alternateMessage", resp);
			});
			return;
		}
		
		setTimeout(templateSelect.importUpdate, 1000);
	})
}

	} //end namespace templateSelect
	var existent;
	
	//begin template Dialog namespace
	templateDialog = {
			
dialog:null,
previousOpened: "noneOpened",

submitValuesCB: function(resp) {
	if(resp.data.importStarted) {
		templateSelect.importUpdate();
		templateDialog.dialog.hide();
	}
	else if (resp.hasMessages) {
		showDwrMessages(resp.messages, $("importMessages")); //TODO tie this into the dialog window?
	}
},
			
submitValues: function() {
	var model = {};
	for (var ident in existent) {
		model[ident] = $get(ident + "_input");
		model["default" + ident] = existent[ident];
	}
	TemplateConfigDwr.beginImport(model, templateDialog.submitValuesCB);
},	
			
openTemplate: function(resp) {
	var createFields = true;
	if(resp.data.template == templateDialog.previousOpened) {
		createFields = false;
	}
	else {
		if(templateDialog.dialog)
			templateDialog.dialog.destroyRecursive(false);
		existent = {};
		templateDialog.previousOpened = resp.data.template;
		templateDialog.dialog = new Dialog({
			title:resp.data.dialogTitle,
			content:"<div id=\"dialogHeader\"></div><hr><div id=\"dialogContent\"></div>",
			style:"width: 600px"
		});
		templateDialog.dialog.on("cancel", function(){
			templateDialog.dialog.hide();
		});
		$(dialogHeader).innerHTML = "Enter values into the fields and hit submit to populate the template with those values," +
				" or leave the field blank to use the default value from the template annotation.";
	}
	
	if(templateDialog.dialog)
		templateDialog.dialog.show();
	if(createFields) {
		resp.data.fields.forEach(function(field) {
			domConstruct.create("div", {id:field.ident},"dialogContent","first");
			domConstruct.create("div", {id:field.ident+"_description"}, field.ident, "first");
			domConstruct.create("div", {id:field.ident+"_element"}, field.ident, "last");
			domConstruct.create("br",  {}, field.ident, "last");
			domConstruct.create("br",  {}, field.ident, "last");
			//TODO: Call a switch that uses the hardcoded versions of certain UI elements (i.e. DropDowns)
			existent[field.ident] = field["default"];
			if(field.msg.length > 0)
				dojo.byId(field.ident + "_description").innerHTML = field.prop + " - " + field.msg;
			else
				dojo.byId(field.ident + "_description").innerHTML = field.prop
			new ValidationTextBox({
				id:field.ident+"_input",
				placeHolder:field.type
			},field.ident+"_element");
		});
	
		domConstruct.create("hr", {}, "dialogContent", "last");
		domConstruct.create("div", {id:"dialogButtonBar"}, "dialogContent", "last");
		domConstruct.create("div", {id:"dialogCancel"}, "dialogButtonBar", "first");
		domConstruct.create("div", {id:"dialogSubmit"}, "dialogButtonBar", "last");
		var cancel = new Button({
			label:resp.data.cancelButton
		}, "dialogCancel");
		cancel.on("click", function(){
			templateDialog.dialog.hide()
		});
		
		var submit = new Button({
			label:resp.data.submitButton
		}, "dialogSubmit")
		submit.on("click", function(){
			templateDialog.submitValues();
		});
	}
}
			
	}
	
	templateSelect.initialize();
});





