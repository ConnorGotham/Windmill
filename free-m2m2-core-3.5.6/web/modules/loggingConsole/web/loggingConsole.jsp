<%--
    Copyright (C) 2014 Infinite Automation. All rights reserved.
    @author Terry Packer
--%>
<%@ include file="/WEB-INF/jsp/include/tech.jsp" %>
<style>
    .field-prettyLevel {
        width: 80px;
        font-weight: bold;
    }
    
    .field-prettyTime {
        width: 160px;
    }
</style>
<tag:page dwr="LoggingConsoleDwr">
	    
	    <div data-dojo-type="dijit/layout/TabContainer" style="width: 100%; height: 80%;">
		    <div id="logTab"
		            data-dojo-props="selected:true"
		            style=" height: 80%; margin: 1em 3em 1em 1em; border: 2px; padding: .2em 1em 1em 1em; overflow:auto; border: 2px solid; border-radius:10px; border-color: lightblue;"
		            data-dojo-type="dijit/layout/ContentPane"  title='<fmt:message key="logging.header.recentLogs" />'>
			    <div id="loggingConsole" style=" height: 95%; overflow:auto; border:1px solid"></div>
                <br>
			    <div id="settingsInput">
			        <div style="float:left; padding-right: 3px"><fmt:message key="logging.maxInMemoryHistory" /></div>
			        <div style="float:left"><input class="shortForm" type="number" id="maxInMemoryHistory" /></div>
			        <div style="float:left"><button type="button" onclick="changeInMemorySetting()"><fmt:message key="logging.changeSetting" /></button></div>
                    <div style="float:right"><button type="button" onclick="sendLogs();"><fmt:message key="logging.email.sendLogEmail"/></button></div>
			    </div>
		    </div>
		    <%-- Only Show Threads section if Api module exists --%>
		    <m2m2:moduleExists name="mangoApi">
		    <div id="threadTab" data-dojo-type="dijit/layout/ContentPane"  title="Threads" >
		        <div id="controls">
		          <!-- Order by doesn't work on the tree widget <button type="button" onclick="threadTree.refresh('cpuTime');">Order by CPU Time</button>
                  <button type="button" onclick="threadTree.refresh('userTime');">Order by User Time</button>
		          <button type="button" onclick="threadTree.refresh('priority');">Order by Priority</button> -->
		          <button type="button" onclick="threadTree.refresh();">Refresh</button>
		          <button type="button" onclick="window.location='rest/v1/threads?asFile=true&stackDepth=16'" >Download JSON</button>
		        </div>
		        
	            <!-- Create the tree -->
                <div id="threadTreeDiv" style="height:95%; width:60%; float:left; overflow-y:auto">
                    <div id="threadTree" ></div>
                </div>
                
                <div id="threadInfo" style="height:95%; width:30%; float:left; overflow-y:auto" class="borderDivPadded">
                  <h2 id="threadCount">Total Threads: </h2>
                  <h2>Selected Thread Info</h2>
                  <div class="formItem">
			        <label class="formLabelRequired" for="threadId">ID:</label>  
			        <div class="formField"><div id="threadId"></div></div>
			      </div>        
                  <div class="formItem">
                    <label class="formLabelRequired" for="threadName">Name:</label>  
                    <div class="formField"><div id="threadName"></div></div>
                  </div>  
                  <div class="formItem">
                    <label class="formLabelRequired" for="threadCpuTime">CPU Time:</label>  
                    <div class="formField"><div id="threadCpuTime"></div></div>
                  </div>  
                  <div class="formItem">
                    <label class="formLabelRequired" for="threadUserTime">User Time:</label>  
                    <div class="formField"><div id="threadUserTime"></div></div>
                  </div>  
                  
                  <div class="formItem">
                    <label class="formLabelRequired" for="threadState">State:</label>  
                    <div class="formField"><div id="threadState"></div></div>
                  </div>  
                  <div class="formItem">
                    <label class="formLabelRequired" for="threadPriority">Priority:</label>  
                    <div class="formField"><div id="threadPriority"></div></div>
                  </div>
                  <div class="formItem">
                    <div style="font-weight:bold">Location:</div><br>
                    <div class="formField"><div id="threadLocation"></div></div>
                  </div>                      
                </div>
	        </div>
            <div id="logQueryTab" data-dojo-type="dijit/layout/ContentPane"  title="Query Logs">
              <div style=" height: 90%; overflow:auto; border:1px solid">
                <table style="width:100%; table-layout: fixed;">
                  <tr class="smRowHeader">
                    <td>time</td>
                    <td>message</td>
                    <td>classname</td>
                    <td>line</td>
                    <td>method</td>
                    <td>Stack Trace</td>
                    <td>level</td>
                  </tr>
                  <tbody id="logQueryResults"></tbody>
                </table>
              </div>
              <br>
              <div id="queryErrors" style="color:red"></div>
              <br>
              <div>
                  <div style="float:left; padding-right:3px; width:90%"><input type="text" id="logQuery" value="limit(100)"/></div>
                  <div style="float:left"><button type="button" onclick="loggingQuery.query()"><fmt:message key="logging.queryLogs" /></button> <tag:help id="logging-query"/></div>
              </div>
            </div>
	        </m2m2:moduleExists>
	        <%-- Process Logs Tab --%>
		    <div id="processLogTab"
		            style=" height: 80%; margin: 1em 3em 1em 1em; border: 2px; padding: .2em 1em 1em 1em; overflow:auto; border: 2px solid; border-radius:10px; border-color: lightblue;"
		            data-dojo-type="dijit/layout/ContentPane"  title='<fmt:message key="common.processLogs" />'>
			    <div id="processLogView" style=" height: 95%; overflow:auto; border:1px solid"></div>
                <br>
			    <div id="processLogsInput">
			        <div style="float:left; padding-right: 3px"><fmt:message key="common.chooseFile" /></div>
			        <div style="float:left"><select id="processLog"></select></div>
                    <div style="float:right"><button type="button" onclick="getProcessLog();"><fmt:message key="header.reload"/></button></div>
			    </div>
		    </div>
        </div>
<%-- Only Show Threads section if Api module exists --%>
<m2m2:moduleExists name="mangoApi">
<script type="text/javascript" src="${modulePath}/web/js/threadTree.js"></script>
</m2m2:moduleExists>
<script type="text/javascript">
var lastMessage; //Holds the last recieved log message

require(["dojo/topic", "dojo/_base/window", "dojo/domReady!"], 
        function(topic, win){

    var Poll = function(pollFunction, intervalTime) {
        var intervalId = null;

        this.start = function(newPollFunction, newIntervalTime) {
            pollFunction = newPollFunction || pollFunction;
            intervalTime = newIntervalTime || intervalTime;

            if ( intervalId ) {
                this.stop();
            }

            intervalId = setInterval(pollFunction, intervalTime);
        };

        this.stop = function() {
            clearInterval(intervalId);
        };
    };
    
    //First get the all the logs we have:
     LoggingConsoleDwr.getLogsSince(0, function(response){
         
         $set('maxInMemoryHistory',response.data.maxInMemoryHistory);
         
         //Do we have a new message
         if(typeof response.data.message != 'undefined'){
              lastMessage = response.data.message;
              dojo.publish("loggingTopic",[{
                      message:response.data.message,
                      type: "message",
                      duration: -1, //Don't go away
                      }]
              );
         }
         
         //Set the Process Logs
         var processLogSelect = dojo.byId('processLog');
         for(var i=0; i<response.data.processLogs.length; i++){
        	 var option = document.createElement('option');
        	 option.text = response.data.processLogs[i];
        	 option.value = response.data.processLogs[i];
        	 processLogSelect.add(option);
         }
         
     });
    var pollPeriodMs = 5000;
    var p = new Poll(getNewLogs, pollPeriodMs);
    p.start();
    
    //Setup the console messages target
    topic.subscribe("loggingTopic", function(message) {
        //Message has members:
        // duration - int
        // message - string
        // type - string
        var startupConsole = dojo.byId("loggingConsole");
        if (message.type == 'clear')
            startupConsole.innerHTML = "";
        else {
            startupConsole.innerHTML = startupConsole.innerHTML + message.message; //set('content', message.message + startupConsole.get('content'));
        }
    });
    


    function getNewLogs(){
        var timestamp = new Date().getTime() - pollPeriodMs;
        LoggingConsoleDwr.getLogsSince(timestamp, function(response){
            //Did we get any logs?
            if(typeof response.data.message != 'undefined'){
                //Do we have a new message
                if((typeof lastMessage == 'undefined')||(lastMessage != response.data.message)){
	                 lastMessage = response.data.message;
	                 dojo.publish("loggingTopic",[{
	                         message:response.data.message,
	                         type: "message",
	                         duration: -1, //Don't go away
	                         }]
	                 );
                }
            }
        });
    }
    
    
});

var changedMsg = '<fmt:message key="logging.changedUntilNextRestart" />';

function changeInMemorySetting(){
    
    var imh = $get("maxInMemoryHistory");
    LoggingConsoleDwr.setMaxInMemoryHistory(imh, function(response){
        
        if(response.hasMessages){
            showDwrMessages(response.messages);
        }else{
            hideContextualMessages($("settingsInput"));
            alert(changedMsg);
        }
        
    });
    
}

/**
 * Simply Send the Logs
 */
function sendLogs(){
	LoggingConsoleDwr.sendLogEmail(function(response){
		alert(response.data.message);
	});
}

function getProcessLog(){
	var logView = dojo.byId("processLogView");
	logView.innerHTML = '';
	
	LoggingConsoleDwr.getProcessLog($get("processLog"), function(response){
		//Load the contents into view
		for(var i=0; i<response.data.processLog.length; i++){
			logView.innerHTML += response.data.processLog[i] + '</br>';
		}
	});
}

</script>
</tag:page>