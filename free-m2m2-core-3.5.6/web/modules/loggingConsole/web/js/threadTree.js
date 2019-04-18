/*
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Terry Packer
*/
var threadRest,threadTree;
var loggingQuery;

require(['dojo/_base/lang', 'dojo/store/Memory', 'dijit/Tree', 'dijit/tree/ForestStoreModel', 'dojo/json', 'dojo/_base/xhr', "dojo/request", "dojo/store/JsonRest", "dojo/data/ItemFileReadStore", "dijit/tree/ObjectStoreModel", "dojo/parser", "dojo/domReady!"], 
        function(lang, Memory, Tree, ForestStoreModel, JSON, xhr, request, JsonRest, ItemFileReadStore, ObjectStoreModel, parser){
    
    //TODO There is a known bug in here somewhere that causes
    // undefined use of 'setAttribute' after a refresh...
    lang.extend(Tree, {
        refreshModel: function () {

            // reset the itemNodes Map
            this._itemNodesMap = {};

            // reset the state of the rootNode
            this.rootNode.state = "UNCHECKED";

            // Nullify the tree.model's root-children
            this.model.root.children = null;

            // remove the rootNode
            if (this.rootNode) {
                this.rootNode.destroyRecursive();
            }
            
            this.postMixInProperties();
            // reload the tree
            this._load();
        }
    });
    
    loggingQuery = {
    		query: function() {
    			dojo.byId("queryErrors").innerHTML = ''; //Clear our errors
    			dwr.util.removeAllRows("logQueryResults");
    			
                var query = $get('logQuery');
                var url = "/rest/v1/logging/by-filename/ma.log/?" + query;
                
                xhr.get({
                    url : url,
                    handleAs: "json",
                    load: function(logs){
                    	
                    	dwr.util.addRows("logQueryResults", logs,
                                [
                                 	function(log) { return new Date(log.time); },
                                    function(log) { return log.message; },
                                    function(log) { return log.classname; },
                                    function(log) { return log.lineNumber; },
                                    function(log) { return log.method; },
                                    function(log) { return log.stackTrace; },
                                    function(log) { return log.level; },
                               ],
                               {
                    			rowCreator: function(options){
                    				var tr = document.createElement("tr");
                                    tr.className = "smRow"+ (options.rowIndex % 2 == 0 ? "" : "Alt");
                                    return tr;
                    			},
                    			cellCreator: function(options){
                    				var td = document.createElement("td");
                    				td.style.wordWrap = "break-word";
                    				
                    				switch(options.rowData.level){
                    				case "WARN":
                    					td.style.backgroundColor = "orange";
                    					break;
                    				case "ERROR":
                    					td.style.backgroundColor = "pink";
                    					break;
                    				}
                    				
                    				return td;
                    			}
                               });
                    	
                    },
                    error: function(jqXHR, textStatus, errorThrown, mangoMessage){
                    	dojo.byId("queryErrors").innerHTML = jqXHR.message;
                    	console.log(jqXHR);
                    },
                    headers: {'Accept' : 'application/json'}
                });
            },
            
    };
    
    threadRest = {

            /**
             * Thread access
             */
            threads: {
                
                /**
                 * 
                 * Get All Data Threads 
                 * stackDepth - Stack size
                 * 
                 * done(jsonData) callback with array of points as data
                 * 
                 * fail(jqXHR, textStatus, errorThrown, mangoMessage) on failure callback
                 * 
                 */
                getAll: function(stackDepth, orderBy, done, fail) {
                    
                    var url = "/rest/v1/threads?stackDepth=" + stackDepth;
                    if(typeof orderBy == "string")
                        url += "&orderBy=" + orderBy;
                    
                    xhr.get({
                        url : url,
                        handleAs: "json",
                        load: done,
                        error: fail,
                        headers: {'Accept' : 'application/json'}
                    });
                },
            }
     };
 
    threadTree = {
            store: null,
            model: null,
            tree: null,
            refresh: function (orderBy) {
                delete this.store;
                //this.tree.model.store.clearOnClose = true; 
                //this.tree.model.store.close();
                
                var _this = this; //before we drop into new context
                threadRest.threads.getAll(10, orderBy, function(data){
                    
                    //Refresh the total
                    dojo.byId("threadCount").innerHTML = "Total Threads: " + data.length;
                    
                    threadTree.store = new Memory({
                        data: [{ id: 0,
                                name: "Mango Threads",
                                children: data,
                            }],
                        getChildren: function(object){
                            return object.children || [];
                        }
                    });
                    
                    _this.tree.model.store = _this.store;
                    _this.tree.model.query = {"id" : "*"};
                    _this.tree.rootId = 0;
                    _this.tree.rootLabel = "Mango Threads";
                    _this.tree.childrenAttrs = ["items"];       
                    _this.tree.refreshModel();

                },function(fail){
                    alert(fail);
                });
                
                
                
            },
                
    };
    
    //Load the Threads
    threadRest.threads.getAll(10,null, function(data){

        dojo.byId("threadCount").innerHTML = "Total Threads: " + data.length;

        threadTree.store = new Memory({
            data: [{ id: 0,
                    name: "Mango Threads",
                    children: data,
                }],
            getChildren: function(object){
                return object.children || [];
            }
        });
        
        threadTree.model = new ObjectStoreModel({
            store: threadTree.store,
            query: {"id": 0},
            mayHaveChildren: function(item){
                return "children" in item;
            }
        });
//           threadTree.model = new ForestStoreModel(
//                    { store: threadTree.store,
//                      query: {"id" : "*"},
//                      rootId: 0,
//                      rootLabel: "Mango Threads",
//                      childrenAttrs: "items"
//                    });
            
            //http://www.m-erg.net/demo/dojo-tree-demo.html
            //http://dojotoolkit.org/reference-guide/1.10/dijit/Tree.html
            //http://dojotoolkit.org/documentation/tutorials/1.7/store_driven_tree/
                
           threadTree.tree = new Tree({
                model: threadTree.model,
                onOpenClick: true,
                onClick: function(item){
                    dojo.byId("threadId").innerHTML = item.id;
                    dojo.byId("threadName").innerHTML = item.name;
                    
                    dojo.byId("threadCpuTime").innerHTML = convertNanoTime(item.cpuTime);
                    dojo.byId("threadUserTime").innerHTML = convertNanoTime(item.userTime);
                    
                    dojo.byId("threadState").innerHTML = item.state;
                    dojo.byId("threadPriority").innerHTML = item.priority;
                    
                    var stackInfo = "";
                    for(var i=0; i<item.location.length; i++){
                        var loc = item.location[i];
                        stackInfo += loc.className + "<br>";
                        stackInfo += loc.methodName + "()";
                        if(loc.lineNumber > 0)
                            stackInfo += " line " + loc.lineNumber;
                        stackInfo += "<br>";
                        stackInfo += "------------<br>";
                    }
                    
                    dojo.byId("threadLocation").innerHTML = stackInfo;
                    

                },
                _createTreeNode: function(args){
                    var tnode = new dijit._TreeNode(args);
                    tnode.labelNode.innerHTML = args.label;
                    return tnode;
                },
                
            }, "threadTree" );
            
        },function(fail){
            alert(fail);
        });
    
});

function convertNanoTime(time) {  
    var nanos = time % 1000000;
    time = parseInt(time/1000000);
    var millis= time % 1000;
    time = parseInt(time/1000);
    var seconds = time % 60;
    time = parseInt(time/60);
    var minutes = time % 60;
    time = parseInt(time/60);
    var hours = time % 24;
    var out = "";
    if(hours && hours > 0) out += hours + " " + ((hours == 1)?"hr":"hrs") + " ";
    if(minutes && minutes > 0) out += minutes + " " + ((minutes == 1)?"min":"mins") + " ";
    if(seconds && seconds > 0) out += seconds + " " + ((seconds == 1)?"sec":"secs") + " ";
    if(millis && millis > 0) out += millis+ " " + ((millis== 1)?"msec":"msecs") + " ";
    if(nanos && nanos > 0) out += nanos + " " + "ns ";
    return out.trim();
}


