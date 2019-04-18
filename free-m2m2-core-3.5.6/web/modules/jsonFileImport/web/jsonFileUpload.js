/*
 * Copyright (C) 2016 Infinite Automation. All rights reserved.
 * @author Terry Packer
 */


var jsonFileUploadDialog;
var showJsonFileUpload; //
var closeJsonUploadErrorBox;

require(["dijit/Dialog", "dojox/form/Uploader", "dijit/form/Button", "dojox/form/uploader/FileList",
         "dojo/dom", "dojo/on", "dojo/_base/lang", "dojo/dom-construct",
         "dgrid/OnDemandGrid", "dojo/store/Memory", "dojo/cookie", "dojo/domReady!"],
function(Dialog, Uploader, Button, FileList, dom, on, lang, domConstruct, OnDemandGrid, Memory, cookie) {
    var form = dom.byId('jsonFileUploadForm');
    
    var jsonFileUploadDialog = new Dialog({
        title: uploadTranslatedMessage
    }, "jsonFileUpload");
    
    var jsonFileUploader = new Uploader({
        label: mangoTranslate('view.browse'),
        multiple: true,
        url: '/upload-json-file.shtm',
        onError: function(evt){
        	//TODO Display Error Messages
        	console.log('OnError: ' + evt);
        },
        //Hack to override XHR request and set the CSRF header
		createXhr: function(){
			var xhr = new XMLHttpRequest();
			var timer;
			xhr.upload.addEventListener("progress", lang.hitch(this, "_xhrProgress"), false);
			xhr.addEventListener("load", lang.hitch(this, "_xhrProgress"), false);
			xhr.addEventListener("error", lang.hitch(this, function(evt){
				this.onError(evt);
				clearInterval(timer);
			}), false);
			xhr.addEventListener("abort", lang.hitch(this, function(evt){
				this.onAbort(evt);
				clearInterval(timer);
			}), false);
			xhr.onreadystatechange = lang.hitch(this, function(){
				if(xhr.readyState === 4){
					hide('processingImage');
					clearInterval(timer);
					try{
						this.onComplete(JSON.parse(xhr.responseText.replace(/^\{\}&&/,'')));
					}catch(e){
						var msg = "Error parsing server result:";
						console.log(msg, e);
						console.log(xhr.responseText);
						this.onError(msg, e);
					}
				}
			});
			xhr.open("POST", this.getUrl());
			xhr.setRequestHeader("Accept","application/json");
			xhr.setRequestHeader("X-XSRF-TOKEN", cookie('XSRF-TOKEN'));
			
			timer = setInterval(lang.hitch(this, function(){
				try{
					if(typeof(xhr.statusText)){} // accessing this error throws an error. Awesomeness.
				}catch(e){
					//this.onError("Error uploading file."); // not always an error.
					clearInterval(timer);
				}
			}),250);
	
			return xhr;
		}
    }, "jsonFileForUpload");
    
    var reset = new Button({
        label: mangoTranslate('view.clear')
    }, "jsonFileReset");
    
    var submit = new Button({
        label: mangoTranslate('view.submit')
    }, "jsonFileSubmit");
    
    var msFileList = new FileList({
        uploaderId: "jsonFileForUpload"
    }, "jsonFileList");
    
    var jsonFileUploadClose = new Button({
    }, "jsonFileUploadClose");
    
    var uploaderStatus = new OnDemandGrid({
        columns: {
            name: "Filename",
            status: "Status"
        }
    }, "jsonFileUploadStatus");

    var errorBoxParent;
    showJsonFileUpload = function() {
    	clearJsonFileUploadErrorBox();
    	clearJsonFileUploadList();
    	jsonFileUploadDialog.show();
    };
    
    on(submit, "click", function() {
    	clearJsonFileUploadErrorBox();
    	clearJsonFileUploadList();
        jsonFileUploader.submit();
        show('processingImage');
    });
    on(reset, "click", function() {
    	jsonFileUploader.reset();
    	clearJsonFileUploadErrorBox();
    	clearJsonFileUploadList();
    });
    
    on(jsonFileUploadClose, "click", function() {
    	jsonFileUploadDialog.hide();
    });
    
    on(jsonFileUploadDialog, "hide", function() {
    	jsonFileUploader.reset();
    	clearJsonFileUploadErrorBox();
    	clearJsonFileUploadList();
    });
    
    on(jsonFileUploader, "complete", function(json) {
        var store = new Memory({data: json.files});
        uploaderStatus.set('store', store);
        uploaderStatus.refresh();
        if(json.success === false){
        	addJsonFileUploadErrorMessage(json.status);
            show('jsonUploadErrorBox');
        }
    });

    if (require.has('file-multiple')) {
        var domnode = jsonFileUploader.domNode.parentNode;
        if (jsonFileUploader.addDropTarget && uploader.uploadType == 'html5') {
        	jsonFileUploader.addDropTarget(domnode);
        }
    }
    
    closeJsonUploadErrorBox = function(){
    	hide('jsonUploadErrorBox');
    };
    function addJsonFileUploadErrorMessage(message){
    	var errorBox = dojo.byId('jsonUploadErrors');
        var div = document.createElement('div');
        div.innerHTML = message;
        errorBox.appendChild(div);
    }
    
    function clearJsonFileUploadErrorBox(){
    	closeJsonUploadErrorBox();
    	var myNode = document.getElementById('jsonUploadErrors');
    	while (myNode.firstChild) {
    	    myNode.removeChild(myNode.firstChild);
    	}
    }
    
    function clearJsonFileUploadList(){
        var store = new Memory({data: []});
        uploaderStatus.set('store', store);
        uploaderStatus.refresh();
    }
    
});
