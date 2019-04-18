/*
 * Copyright (C) 2013 Infinite Automation. All rights reserved.
 * @author Terry Packer
 */
var dataSources;

var filters = [];

require(["deltamation/StoreView", "dijit/form/CheckBox", "dijit/form/ValidationTextBox","dijit/form/TextBox",
         "dojo/dom-style","dojo/_base/html", "put-selector/put", "dojo/when", "dojo/on",
         "dojo/_base/fx", "dojo/fx","dojo/query", "dojox/layout/ContentPane","dojo/dom-construct",
         "dojo/domReady!"],
function(StoreView, CheckBox, ValidationTextBox,TextBox,
		domStyle,html,put,when,on,
		baseFx,coreFx,query,ContentPane,domConstruct) {

	//Content Div for loading in DS Pages
dataSourcePropertiesDiv = new ContentPane({
		executeScripts: true,
		parseOnLoad: true,
		onDownloadError: function(error){
			addErrorDiv(error);
		}
}, "editDataSourceDiv");		

/**
 * Add hook for modules to disable thier utilities and clean up before being removed
 */
dataSourcePropertiesDiv.onUnload = function(){
	//Clean up module js before we load new pane.
	if(typeof(unInitImpl) != 'undefined')
		unInitImpl();
};

//Quick check to see if we can Export CSV
var dataSourcesButtons;
if(mangoApiExists)
	dataSourcesButtons = ['toggle','edit','delete','copy','export','exportCSV'];
else
	dataSourcesButtons = ['toggle','edit','delete','copy','export'];

dataSources = new StoreView({
	
    prefix: 'DataSource',
    varName: 'dataSources',
    viewStore: stores.dataSource,
    editStore: stores.dataSource,
    editUpdatesView: true,
    gridId: 'dataSourceTable',
    editId: 'editDataSourceDiv',
    defaultSort: [{attribute: "name"}],
    closeEditOnSave: false,  /* We are managing this ourselves */
    copyId: null, /* ID for creating a copy */
    minRowsPerPage: 100,
    maxRowsPerPage: 100,
    filters: [],
	sortMap: [
	          {attribute: "name", descending:true},
	          {attribute: "typeDescriptionString", descending:true},
	          {attribute: "connectionDescriptionString", descending:true},
	          {attribute: "enabled", descending:true},
	         ],
    
    columns: {
    	name: {
    		label: mangoMsg['dsList.name'],
    		sortable: false,
    		renderHeaderCell: function(th){
    				var div = domConstruct.create("div");
    				var input = new TextBox({
    					name: 'inputText',
    					placeHolder: 'filter text',
    					style: "width: 10em",
    					intermediateChanges: true,
    				});
    				var label = domConstruct.create("span",{style: "padding-right: 5px", innerHTML:  mangoMsg['dsList.name']});
    				domConstruct.place(label,div);
    				input.placeAt(div);
    				input.watch("value",function(name,oldValue,value){
    					if(value === '')
    						delete dataSources.filters['name'];
    					else
    						dataSources.filters['name'] = new RegExp("^.*"+value+".*$","i");
    					dataSources.grid.set('query',dataSources.filters);
    				});
    				
    				//Create sort link
    				var sortLink  = domConstruct.create("span",{style: "padding-right: 5px; float: right", innerHTML:  "sort",});
    				on(sortLink,'click',function(event){
    					
    					//Flip through the list to see if we already have an order?
    					for(var i =0; i<dataSources.sortMap.length; i++){
    						if(dataSources.sortMap[i].attribute === "name"){
    							dataSources.sortMap[i].descending = !dataSources.sortMap[i].descending;
    							break;
    						}
    					}
    					var options = {};
    					options.sort = [{attribute: dataSources.sortMap[i].attribute, descending: dataSources.sortMap[i].descending}];
    					dataSources.grid.set("query",dataSources.filters,options);
    				});
    				domConstruct.place(sortLink,div);
    				return div;
    		},
    	},
    	typeDescriptionString: {
    		label: mangoMsg['dsList.type'],
    		sortable: false,
    		renderHeaderCell: function(th){
				var div = domConstruct.create("div");
				var input = new TextBox({
					name: 'inputText',
					placeHolder: 'filter text',
					style: "width: 10em",
					intermediateChanges: true,
				});
				var label = domConstruct.create("span",{style: "padding-right: 5px", innerHTML:  mangoMsg['dsList.type']});
				domConstruct.place(label,div);
				input.placeAt(div);
				
				input.watch("value",function(name,oldValue,value){
					if(value == '')
						delete dataSources.filters['typeDescriptionString'];
					else
						dataSources.filters['typeDescriptionString'] = new RegExp("^.*"+value+".*$");
					dataSources.grid.set('query',dataSources.filters);
				});
				
				//Create sort link
				var sortLink  = domConstruct.create("span",{style: "padding-right: 5px; float: right", innerHTML:  "sort",});
				on(sortLink,'click',function(event){
					
					//Flip through the list to see if we already have an order?
					for(var i =0; i<dataSources.sortMap.length; i++){
						if(dataSources.sortMap[i].attribute === "typeDescriptionString"){
							dataSources.sortMap[i].descending = !dataSources.sortMap[i].descending;
							break;
						}
					}
					var options = {};
					options.sort = [{attribute: dataSources.sortMap[i].attribute, descending: dataSources.sortMap[i].descending}];
					dataSources.grid.set("query",dataSources.filters,options);
				});
				domConstruct.place(sortLink,div);
				return div;
		},
    	},
    	
		connectionDescriptionString: {
			label: mangoMsg['dsList.connection'],
    		sortable: false,
    		renderHeaderCell: function(th){
				var div = domConstruct.create("div");
				var input = new TextBox({
					name: 'inputText',
					placeHolder: 'filter text',
					style: "width: 10em",
					intermediateChanges: true,
				});
				var label = domConstruct.create("span",{style: "padding-right: 5px", innerHTML:  mangoMsg['dsList.connection']});
				domConstruct.place(label,div);
				input.placeAt(div);
				input.watch("value",function(name,oldValue,value){
					if(value == '')
						delete dataSources.filters['connectionDescriptionString'];
					else
						dataSources.filters['connectionDescriptionString'] = new RegExp("^.*"+value+".*$","i");
					dataSources.grid.set('query',dataSources.filters);
				});
				
				//Create sort link
				var sortLink  = domConstruct.create("span",{style: "padding-right: 5px; float: right", innerHTML:  "sort",});
				on(sortLink,'click',function(event){
					
					//Flip through the list to see if we already have an order?
					for(var i =0; i<dataSources.sortMap.length; i++){
						if(dataSources.sortMap[i].attribute === "connectionDescriptionString"){
							dataSources.sortMap[i].descending = !dataSources.sortMap[i].descending;
							break;
						}
					}
					var options = {};
					options.sort = [{attribute: dataSources.sortMap[i].attribute, descending: dataSources.sortMap[i].descending}];
					dataSources.grid.set("query",dataSources.filters,options);
				});
				domConstruct.place(sortLink,div);
				return div;
		},
		}
    },

    buttons: dataSourcesButtons,
 
    preInit: function() {
    },
    
    postGridInit: function() {
    },
    
    setInputs: function(vo) {
    	
    	this.currentId = vo.id;
//    	this.name.set('value',vo.name);
//    	this.xid.set('value',vo.xid);
//    	this.enabled.set('value',vo.enabled);
    },
    
    getInputs: function() {
        var vo = new DataSourceVO();
        vo.id = this.currentId;
//        vo.name = this.name.get('value');
//        vo.xid = this.xid.get('value');
//        if (this.enabled.get('value')) // sometimes value is returned as "on" rather than true
//            vo.enabled = true;
//        else
//            vo.enabled = false;
        return vo;
 
    },
    //Dont use these, the tag requires the values be passed into it for setting them
//    name: new ValidationTextBox({}, "name"),
//    xid: new ValidationTextBox({}, "xid"),
//    enabled: new CheckBox({}, "enabled"),

    /**
     * Override Toggle Method and return state for use in window
     */
    toggle: function(id,callback) {
    	var _this = this;
    	
    	//Ensure we don't try to toggle new items
    	if(id < 1){
    		
    		if(id == _this.currentId){
	            var imgNode = $("dsStatusImg");
	            if(imgNode != 'undefined'){
			        stopImageFader(imgNode);
	            }
            }
    		return;
    	}else{
    		if(id == _this.currentId)
    			startImageFader("dsStatusImg", true);
    	}
    	
    	var dsInListView = dojo.byId("toggleDataSource" + id);
        if(dsInListView !== null)
        	startImageFader("toggleDataSource" + id, true);
    	
    	DataSourceDwr.toggle(id, function(result) {
    		var dsEnabled = $("dataSource.enabled");
    		if(dsEnabled !== null)
    			$set("dataSource.enabled", result.data.enabled); //Save state on page
    		
    		if(result.hasMessages)
    			for(var k = 0; k < result.messages.length; k+=1)
    				alert(result.messages[k].genericMessage);
    		
            if(result.data.enabled){
                
                var dsInView = dojo.byId("toggleDataSource"+ result.data.id);
                if(dsInView !== null){
                    updateImg(
                            $("toggleDataSource"+ result.data.id),
                            mangoImg("database_go.png"),
                            mango.i18n["common.enabledToggle"],
                            true
                    );
                }
                if(typeof callback == 'function') callback(true);
            }else{
                dsInListView = dojo.byId("toggleDataSource"+ result.data.id);
                if(dsInListView !== null){
                    updateImg(
                            $("toggleDataSource"+ result.data.id),
                            mangoImg("database_stop.png"),
                            mango.i18n["common.enabledToggle"],
                            true
                    );
                }
                if(typeof callback == 'function') callback(false);
                
            }
            stopImageFader("toggleDataSource" + id);
            /* Only Update the datasource image if we are editing this one */
            if(id == _this.currentId){
	            var imgNode = $("dsStatusImg");
	            if(imgNode != 'undefined'){
		            setDataSourceStatusImg(result.data.enabled, imgNode);
			    	getAlarms();
			    	getStatusMessages();
			        stopImageFader(imgNode);
	            }
            }
            
        });
    	

    },    
    
    editXOffset: -380,
    editYOffset: 0,
    addXOffset: 18,
    addYOffset: -240,
    
    
    removeCallback: function(id){
        var _this = this;
        
    	if(allDataPoints != 'undefined')
    		allDataPoints.refresh();
    	
    	//If we are editing this ds then we need to close it
    	if(id === _this.currentId)
    	    dataSourcePropertiesDiv.set('content','');
    },

    /**
     * Refresh the Grid
     */
    refresh: function(){
    	this.grid.set('query',dataSources.filter, null);
    },
    
    /**
     * Export data points using the filter
     */
    showExportUsingFilter: function() {
        
        var query = this.filters;
        var options = {}; //We don't need any
        
        var sortArray, op;
        if (typeof options.sort === 'string') {
            op = new SortOption();
            op.attribute = options.sort;
            op.desc = false;
            sortArray = [op];
        }
        else if (options.sort && typeof options.sort.length === 'number') {
            sortArray = [];
         
            for (var i = 0; i < options.sort.length; i++) {
                op = new SortOption();
                op.attribute = options.sort[i].attribute;
                op.desc = options.sort[i].descending || false;
                sortArray.push(op);
            }
        }
        
        var filterMap = {};
        for (var prop in query) {
            var conditions = query[prop];
            // allow specific regex queries
            if (conditions instanceof RegExp) {
                // anything
                //if (conditions.source === '^.*$')
                //    continue;
                filterMap[prop] = 'RegExp:' + conditions.source;
                //break;
            }else{
                if (conditions instanceof ArrayTester) {
                    conditions = conditions.data;
                }
                if (typeof conditions === 'string' || typeof conditions === 'number')
                    conditions = [conditions];
                filterMap[prop] = conditions.join();
            }
        }
        
        var start = (isFinite(options.start)) ? options.start : null;
        var count = (isFinite(options.count)) ? options.count : null;
        
        // controls whether sql is done using or or and
        //var or = true;
        
        
        DataSourceDwr.jsonExportUsingFilter(filterMap, sortArray, start, count, this.viewStore.dwr.or, function(json){
            $set("exportData", json);
            exportDialog.show();
        });

    },
    
    exportCSV: function(dsXid){
	   	 if(dsXid === null){
	   		 return;
	   	 }
	   	 window.open("/rest/v1/data-points/data-source/" + dsXid + "?format=csv", '_self');
	   	 return;
    }
    
        
});

//TODO Can most likely remove when done debugging
dataSources.openImpl = dataSources.open;

/**
 * Override Open Method
 */
dataSources.open = function(id,options,callback){
    this.currentId = id;
    var _this = this;
    options = options || {};
    //Hook for data sources to cleanup anything before thier view is expired
    if(typeof dataSourceCleanup == 'function')
    	dataSourceCleanup(id, options);

    if (options.voToLoad) {
    	//Copy
    	when(DataSourceDwr.get(options.voToLoad.id, function(vo) {
            _this.setInputs(options.voToLoad);
            _this.loadView(callback, vo.data.editPagePath,dataSourcePropertiesDiv,options.voToLoad.id)
            //show(_this.edit);
            coreFx.combine([baseFx.fadeIn({node: _this.edit}),
                            coreFx.wipeIn({node: _this.edit})]).play();
        }, function(message) {
            // wrong id, dwr error
            addErrorDiv(message);
        }));
    	
    }
    else {
        // always load from dwr
        // TODO use push from the server side
        // so cache is always up to date
    	if(id > 0){
    		//Need to overload the get Method or add get new to the DwrStore object to use this
	        //when(this.editStore.dwr.get($get("dataSourceTypes")), function(vo) {
    		when(DataSourceDwr.get(id, function(response) {
	            _this.setInputs(response.data.vo);
	            //Due to some issue with content pane need to play fx before loading pane.
	            coreFx.combine([baseFx.fadeIn({node: _this.edit}),
	                            coreFx.wipeIn({node: _this.edit})]).play();
	            
	            _this.loadView(callback,response.data.editPagePath,dataSourcePropertiesDiv,id);
	        }, function(message) {
	            addErrorDiv(message);
	        }));
    	}else{
    		when(DataSourceDwr.getNew($get("dataSourceTypes"), function(response) {
                _this.setInputs(response.data.vo);
	            //Due to some issue with content pane need to play fx before loading pane.
                coreFx.combine([baseFx.fadeIn({node: _this.edit}),
                                coreFx.wipeIn({node: _this.edit})]).play();
                _this.loadView(callback,response.data.editPagePath,dataSourcePropertiesDiv);

            }, function(message) {
                addErrorDiv(message);
            }));
    	}
    }
};


/**
 * Copy Override
 */
dataSources.copy = function(id) {
    var _this = this;
    when(DataSourceDwr.get(id, function(vo) {
    	_this.copyId = id;
        _this.loadView(null,vo.data.editPagePath,dataSourcePropertiesDiv,id,true)
    }, function(message) {
        // wrong id, dwr error
        addErrorDiv(message);
    }));
},


/**
 * Method to get Data Source Edit Page from Module
 */
dataSources.loadView = function loadDataSourceView(callback,editPagePath,targetContentPane,id,copy){

    //Hack to ensure that a page with extra columns that has been previously loaded doesn't clobber 
    // a new one with no extra columns
    appendPointListColumnFunctions = null;
    initImpl = null; //Same here to ensure a blank initImpl is properly ignored
    toggleDataSourceImpl = null; //Again same
    editPointCBImpl = null; //
    getStatusMessagesImpl = null; 
    
    //Create the base URL
	var xhrUrl = "/data_source_properties.shtm?";
		
	//Do we have an ID To pass in
	if(typeof id != 'undefined')
		xhrUrl = xhrUrl + "dsid=" + id;
	else{
		//No id so it must be a new one, get the type of new one
		var dsType = $get("dataSourceTypes");
		xhrUrl+= "typeId=" + dsType;
	}
		
	if(typeof copy != 'undefined')
		xhrUrl = xhrUrl + "&copy=true";
	dataSources.loadViewCallback = callback;

	
	var deferred = targetContentPane.set('href',xhrUrl); //Content Pane get
	targetContentPane.set('class','borderDiv marB');
	deferred.then(function(value){
//		if(callback != null)
//			callback();
	},function(err){
		addErrorDiv(err);
	},function(update){
		//Progress Info
	});
}

//Temp callback to editDataSourceDiv to replicate dojo.ready, 
// to be replaced with scriptHasHooks concept from dojox/dijit content pane
dojo.connect(dataSourcePropertiesDiv, "onDownloadEnd", function(){
	   init();
	   dataSourcePropertiesDiv.startup();
	   dataSourcePropertiesDiv.resize();
	   if(typeof(dataSources.loadViewCallback) != 'undefined')
		   dataSources.loadViewCallback();
	   
	});

}); // require

/**
 * Init the Edit Pane by getting all data source types
 */
function initDataSourceEdit(){

	DataSourceDwr.initDataSourceTypes(function(response){
		if (response.data.types) {
		    dwr.util.addOptions("dataSourceTypes", response.data.types, "key", "value");
		}
	});
}
