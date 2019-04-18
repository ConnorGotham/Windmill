<#--===MANIFEST===
Unique Device Name:Global:Global
===END MANIFEST===-->

{
   "dataSources":[
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         "name":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Virtual",
         "enabled":true,
         "type":"VIRTUAL",
         "purgeType":"YEARS",
         "updatePeriodType":"SECONDS",
         "updatePeriods":5,
         "purgeOverride":true,
         "purgePeriod":1
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-meta",
         "name":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Meta",
         "enabled":true,
         "type":"META",
         "alarmLevels":{
            "SCRIPT_ERROR":"URGENT",
            "CONTEXT_POINT_DISABLED":"URGENT",
            "RESULT_TYPE_ERROR":"URGENT"
         },
         "purgeType":"YEARS",
         "purgeOverride":true,
         "purgePeriod":1
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-script",
         "name":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Script",
         "enabled":true,
         "type":"SCRIPTING",
         "alarmLevels":{
            "SCRIPT_ERROR":"URGENT",
            "DATA_TYPE_ERROR":"URGENT",
            "LOG_ERROR":"URGENT"
         },
         "purgeType":"YEARS",
         "context":[
            {
               "dataPointXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Temp",
               "varName":"temp"
            },
            {
               "dataPointXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-setpoint",
               "varName":"set"
            },
            {
               "dataPointXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-fan",
               "varName":"fan"
            }
         ],
         "logLevel":"NONE",
         "cronPattern":"* * * * * ?",
         "executionDelaySeconds":0,
         "script":"if (temp.value < set.value - 1)\n{\nfan.set(true)\n}\nelse if (temp.value > set.value + 1)\n{\nfan.set(false)\n}",
         "purgeOverride":true,
         "purgePeriod":1
      }
   ],
   "dataPoints":[
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Temp",
         "name":"Temp",
         "deviceName":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
         "enabled":true,
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         
         "pointLocator":{
            "dataType":"NUMERIC",
            "changeType":{
               "type":"RANDOM_ANALOG",
               "max":100.0,
               "min":0.0,
               "startValue":"1"
            },
            "settable":true
         },
         "templateXid":"${numericTemplateXid}"
         "eventDetectors":[
         ],
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-outsidetemp",
         "name":"Outside Temp",
         
         "enabled":true,
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         "deviceName":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
 
         "pointLocator":{
            "dataType":"NUMERIC",
            "changeType":{
               "type":"RANDOM_ANALOG",
               "max":100.0,
               "min":0.0,
               "startValue":"1"
            },
            "settable":true
         },
		"templateXid":"${numericTemplateXid}"
         
         "eventDetectors":[
         ],
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-setpoint",
         "name":"Set Point",
         "enabled":true,
         "pointLocator":{
            "dataType":"NUMERIC",
            "changeType":{
               "type":"NO_CHANGE",
               "startValue":"0"
            },
            "settable":true
         },
         "templateXid":"${numericTemplateXid}"
         "eventDetectors":[
         ],
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         "deviceName":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-fan",
         "name":"Fan",
         "enabled":true,
         "pointLocator":{
            "dataType":"BINARY",
            "changeType":{
               "type":"NO_CHANGE",
               "startValue":"0"
            },
            "settable":true
         },
         "templateXid":"${binaryTemplateXid}"
         "eventDetectors":[
         ],
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         "deviceName":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-amps",
         "name":"Amps",
         "enabled":true,
         "pointLocator":{
            "dataType":"NUMERIC",
            "changeType":{
               "type":"BROWNIAN",
               "max":50.0,
               "maxChange":1.0,
               "min":0.0,
               "startValue":"1"
            },
            "settable":true
         },
         "templateXid":"${numericTemplateXid}"
         "eventDetectors":[
         ],
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         "deviceName":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-volts",
         "name":"Volts",
         "enabled":true,
         "pointLocator":{
            "dataType":"NUMERIC",
            "changeType":{
               "type":"BROWNIAN",
               "max":122.0,
               "maxChange":0.01,
               "min":115.0,
               "startValue":"120"
            },
            "settable":true
         },
         "templateXid":"${numericTemplateXid}"
         "eventDetectors":[
         ],
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-DS",
         "deviceName":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
      },
      {
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-watts",
         "name":"Watts",
         "enabled":true,
         "pointLocator":{
            "dataType":"NUMERIC",
            "updateEvent":"CONTEXT_UPDATE",
            "context":[
               {
                  "dataPointXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-amps",
                  "varName":"p1"
               },
               {
                  "dataPointXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-volts",
                  "varName":"p2"
               }
            ],
            "executionDelaySeconds":0,
            "script":"return p1.value * p2.value",
            "settable":false,
            "updateCronPattern":""
         },
         "templateXid":"${numericTemplateXid}"
         "eventDetectors":[
         ],
         "dataSourceXid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-meta",
         "deviceName":"Meta",
      }
   ],
   "pointHierarchy":[
      {
         "points":[
         ],
         "name":"Demo Data",
         "subfolders":[
            {
               "points":[
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-watts",
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-amps",
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-fan",
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-outsidetemp",
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-setpoint",
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Temp",
                  "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-volts"
               ],
               "name":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>",
               "subfolders":[
               ]
            }
         ]
      }
   ],
   "watchLists":[
      {
         "user":"admin",
         "dataPoints":[
            "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Temp",
            "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-setpoint",
            "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-fan"
         ],
         "sharingUsers":[
         ],
         "name":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-HVAC",
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-HVAC-WL"
      },
      {
         "user":"admin",
         "dataPoints":[
            "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-watts",
            "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-volts",
            "<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-amps"
         ],
         "sharingUsers":[
         ],
         "name":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-Power",
         "xid":"<#if Unique_Device_NameGlobalGlobal??>${Unique_Device_NameGlobalGlobal}<#else>${defaultUnique_Device_NameGlobalGlobal}</#if>-PW-WL"
      }
   ]
}