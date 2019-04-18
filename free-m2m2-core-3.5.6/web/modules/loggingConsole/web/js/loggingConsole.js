/*
    Copyright (C) 2014 Infinite Automation Systems Inc. All rights reserved.
    @author Terry Packer
*/
require(["infinite/InfiniteTable",
         "dojo/store/Memory",
         "dojo/domReady!"],
function(InfiniteTable, Memory) {
    
    var list;
    var from = 0;
    var to = new Date().getTime();
    var limit = 0; //Not working yet
    var levels = [0,1,2,3,4,5,6,7];
    LoggingConsoleDwr.getHistoricalLogs(from,to,levels,limit, function(response){
        list = response.data.list;
    
        historicalLogging = new InfiniteTable({
            gridId: 'historicalLogs',
            store: new Memory({
                data: list,
                idProperty: 'time'
            }),
            
            columns: {
                prettyTime: {
                    label: 'time',
                    sortable: false
                },
                prettyLevel: {
                    label: 'level',
                    sortable: false,
                    renderCell: function(logEvent, prettyLevel, cell){
                        var div = document.createElement("div");
                        div.innerHTML = prettyLevel;
                        cell.appendChild(div);
                        return div;
                    }
                },
                message: {
                    label: 'message',
                    sortable: false
                },
                locationInfo: {
                    label: 'location',
                    sortable: false
                }
                
            },
            
        });

        historicalLogging.grid.set('query',{});
    
    });    
    







});
