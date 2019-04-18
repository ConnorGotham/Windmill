//>>built
require({cache:{"url:dojox/calendar/templates/MonthColumnView.html":'\x3cdiv data-dojo-attach-events\x3d"keydown:_onKeyDown"\x3e\t\t\n\t\x3cdiv data-dojo-attach-point\x3d"columnHeader" class\x3d"dojoxCalendarColumnHeader"\x3e\n\t\t\x3ctable data-dojo-attach-point\x3d"columnHeaderTable" class\x3d"dojoxCalendarColumnHeaderTable" cellpadding\x3d"0" cellspacing\x3d"0"\x3e\x3c/table\x3e\n\t\x3c/div\x3e\t\n\t\x3cdiv data-dojo-attach-point\x3d"vScrollBar" class\x3d"dojoxCalendarVScrollBar"\x3e\n\t\t\x3cdiv data-dojo-attach-point\x3d"vScrollBarContent" style\x3d"visibility:hidden;position:relative; width:1px; height:1px;" \x3e\x3c/div\x3e\n\t\x3c/div\x3e\t\n\t\x3cdiv data-dojo-attach-point\x3d"scrollContainer" class\x3d"dojoxCalendarScrollContainer"\x3e\n\t\t\x3cdiv data-dojo-attach-point\x3d"sheetContainer" style\x3d"position:relative;left:0;right:0;margin:0;padding:0"\x3e\t\t\t\n\t\t\t\x3cdiv data-dojo-attach-point\x3d"grid" class\x3d"dojoxCalendarGrid"\x3e\n\t\t\t\t\x3ctable data-dojo-attach-point\x3d"gridTable" class\x3d"dojoxCalendarGridTable" cellpadding\x3d"0" cellspacing\x3d"0" style\x3d"width:100%"\x3e\x3c/table\x3e\n\t\t\t\x3c/div\x3e\n\t\t\t\x3cdiv data-dojo-attach-point\x3d"itemContainer" class\x3d"dojoxCalendarContainer" data-dojo-attach-event\x3d"mousedown:_onGridMouseDown,mouseup:_onGridMouseUp,ondblclick:_onGridDoubleClick,touchstart:_onGridTouchStart,touchmove:_onGridTouchMove,touchend:_onGridTouchEnd"\x3e\n\t\t\t\t\x3ctable data-dojo-attach-point\x3d"itemContainerTable" class\x3d"dojoxCalendarContainerTable" cellpadding\x3d"0" cellspacing\x3d"0" style\x3d"width:100%"\x3e\x3c/table\x3e\n\t\t\t\x3c/div\x3e\n\t\t\x3c/div\x3e \n\t\x3c/div\x3e\t\n\x3c/div\x3e\n'}});
define("./ViewBase dijit/_TemplatedMixin ./_ScrollBarBase dojo/text!./templates/MonthColumnView.html dojo/_base/declare dojo/_base/event dojo/_base/lang dojo/_base/array dojo/_base/sniff dojo/_base/fx dojo/_base/html dojo/on dojo/dom dojo/dom-class dojo/dom-style dojo/dom-geometry dojo/dom-construct dojo/mouse dojo/query dojo/i18n dojox/html/metrics".split(" "),function(x,y,z,A,B,r,s,H,v,C,D,t,I,l,p,w,q,E,n,F,G){return B("dojox.calendar.MonthColumnView",[x,y],{baseClass:"dojoxCalendarMonthColumnView",
templateString:A,viewKind:"monthColumns",_setTabIndexAttr:"domNode",renderData:null,startDate:null,columnCount:6,daySize:30,showCellLabel:!0,showHiddenItems:!0,verticalRenderer:null,verticalDecorationRenderer:null,percentOverlap:0,horizontalGap:4,columnHeaderFormatLength:null,gridCellDatePattern:null,roundToDay:!0,_layoutUnit:"month",_columnHeaderHandlers:null,constructor:function(){this.invalidatingProperties="columnCount startDate daySize percentOverlap verticalRenderer verticalDecorationRenderer columnHeaderDatePattern horizontalGap scrollBarRTLPosition itemToRendererKindFunc layoutPriorityFunction textDir items showCellLabel showHiddenItems".split(" ");
this._columnHeaderHandlers=[]},postCreate:function(){this.inherited(arguments);this.keyboardUpDownUnit="day";this.keyboardUpDownSteps=1;this.keyboardLeftRightUnit="month";this.keyboardLeftRightSteps=1;this.allDayKeyboardUpDownUnit="day";this.allDayKeyboardUpDownSteps=1;this.allDayKeyboardLeftRightUnit="month";this.allDayKeyboardLeftRightSteps=1},destroy:function(a){this._cleanupColumnHeader();this.scrollBar&&this.scrollBar.destroy(a);this.inherited(arguments)},_scrollBar_onScroll:function(a){this.scrollContainer.scrollTop=
a},buildRendering:function(){this.inherited(arguments);this.vScrollBar&&(this.scrollBar=new z({content:this.vScrollBarContent},this.vScrollBar),this.scrollBar.on("scroll",s.hitch(this,this._scrollBar_onScroll)),this._viewHandles.push(t(this.scrollContainer,E.wheel,dojo.hitch(this,this._mouseWheelScrollHander))))},postscript:function(){this.inherited(arguments);this._initialized=!0;this.invalidRendering||this.refreshRendering()},_setVerticalRendererAttr:function(a){this._destroyRenderersByKind("vertical");
this._set("verticalRenderer",a)},_createRenderData:function(){var a={};a.daySize=this.get("daySize");a.scrollbarWidth=G.getScrollbar().w+1;a.dateLocaleModule=this.dateLocaleModule;a.dateClassObj=this.dateClassObj;a.dateModule=this.dateModule;a.dates=[];a.columnCount=this.get("columnCount");var b=this.get("startDate");null==b&&(b=new a.dateClassObj);this.startDate=b=this.floorToMonth(b,!1,a);for(var c=b.getMonth(),d=0,e=0;e<a.columnCount;e++){var g=[];for(a.dates.push(g);b.getMonth()==c;)g.push(b),
b=this.addAndFloor(b,"day",1);c=b.getMonth();d<g.length&&(d=g.length)}a.startTime=new a.dateClassObj(a.dates[0][0]);a.endTime=new a.dateClassObj(g[g.length-1]);a.endTime=a.dateModule.add(a.endTime,"day",1);a.maxDayCount=d;a.sheetHeight=a.daySize*d;this.displayedItemsInvalidated&&!this._isEditing?(this.displayedItemsInvalidated=!1,this._computeVisibleItems(a)):this.renderData&&(a.items=this.renderData.items);this.displayedDecorationItemsInvalidated?a.decorationItems=this.decorationStoreManager._computeVisibleItems(a):
this.renderData&&(a.decorationItems=this.renderData.decorationItems);return a},_validateProperties:function(){this.inherited(arguments);if(1>this.columnCount||isNaN(this.columnCount))this.columnCount=1;if(5>this.daySize||isNaN(this.daySize))this.daySize=5},_setStartDateAttr:function(a){this.displayedItemsInvalidated=!0;this._set("startDate",a)},_setColumnCountAttr:function(a){this.displayedItemsInvalidated=!0;this._set("columnCount",a)},__fixEvt:function(a){a.sheet="primary";a.source=this;return a},
_formatColumnHeaderLabel:function(a){var b="wide";this.columnHeaderFormatLength&&(b=this.columnHeaderFormatLength);return this.renderData.dateLocaleModule.getNames("months",b,"standAlone")[a.getMonth()]},gridCellDatePattern:null,_formatGridCellLabel:function(a,b,c){if(null==a)return"";if(this.gridCellPattern)return this.renderData.dateLocaleModule.format(a,{selector:"date",datePattern:this.gridCellDatePattern});b=F.getLocalization("dojo.cldr",this._calendar)["dateFormatItem-d"];return this.renderData.dateLocaleModule.getNames("days",
"abbr","standAlone")[a.getDay()].substring(0,1)+" "+this.renderData.dateLocaleModule.format(a,{selector:"date",datePattern:b})},scrollPosition:null,scrollBarRTLPosition:"left",_setScrollPositionAttr:function(a){this._setScrollPosition(a.date,a.duration,a.easing)},_getScrollPositionAttr:function(){return{date:this.scrollContainer.scrollTop/this.daySize+1}},_setScrollPosition:function(a,b,c){1>a?a=1:31<a&&(a=31);a=(a-1)*this.daySize;b?(this._scrollAnimation&&this._scrollAnimation.stop(),b=Math.abs((a-
this.scrollContainer.scrollTop)*b/this.renderData.sheetHeight),this._scrollAnimation=new C.Animation({curve:[this.scrollContainer.scrollTop,a],duration:b,easing:c,onAnimate:s.hitch(this,function(a){this._setScrollImpl(a)})}),this._scrollAnimation.play()):this._setScrollImpl(a)},_setScrollImpl:function(a){this.scrollContainer.scrollTop=a;this.scrollBar&&this.scrollBar.set("value",a)},ensureVisibility:function(a,b,c,d,e){d=void 0==d?1:d;if(this.scrollable&&this.autoScroll){a=a.getDate()-d;this.isStartOfDay(b)&&
(b=this._waDojoxAddIssue(b,"day",-1));b=b.getDate()+d;d=this.get("scrollPosition").date;var g=w.getContentBox(this.scrollContainer),g=this.get("scrollPosition").date+g.h/this.daySize,f=!1,h=null;switch(c){case "start":f=a>=d&&a<=g;h=a;break;case "end":f=b>=d&&b<=g;h=b-(g-d);break;case "both":f=a>=d&&b<=g,h=a}f||this._setScrollPosition(h,e)}},scrollView:function(a){a=this.get("scrollPosition").date+a;this._setScrollPosition(a)},_mouseWheelScrollHander:function(a){this.scrollView(0<a.wheelDelta?-1:
1)},refreshRendering:function(){if(this._initialized){this._validateProperties();var a=this.renderData,b=this.renderData=this._createRenderData();this._createRendering(b,a);this._layoutDecorationRenderers(b);this._layoutRenderers(b)}},_createRendering:function(a,b){p.set(this.sheetContainer,"height",a.sheetHeight+"px");this._configureScrollBar(a);this._buildColumnHeader(a,b);this._buildGrid(a,b);this._buildItemContainer(a,b)},_configureScrollBar:function(a){v("ie")&&this.scrollBar&&p.set(this.scrollBar.domNode,
"width",a.scrollbarWidth+1+"px");var b=this.isLeftToRight()?!0:"right"==this.scrollBarRTLPosition,c=b?"right":"left",b=b?"left":"right";this.scrollBar&&(this.scrollBar.set("maximum",a.sheetHeight),p.set(this.scrollBar.domNode,c,0),p.set(this.scrollBar.domNode,b,"auto"));p.set(this.scrollContainer,c,a.scrollbarWidth+"px");p.set(this.scrollContainer,b,"0");p.set(this.columnHeader,c,a.scrollbarWidth+"px");p.set(this.columnHeader,b,"0");this.buttonContainer&&(null!=this.owner&&this.owner.currentView==
this)&&(p.set(this.buttonContainer,c,a.scrollbarWidth+"px"),p.set(this.buttonContainer,b,"0"))},_columnHeaderClick:function(a){r.stop(a);var b=n("td",this.columnHeaderTable).indexOf(a.currentTarget);this._onColumnHeaderClick({index:b,date:this.renderData.dates[b][0],triggerEvent:a})},_buildColumnHeader:function(a,b){var c=this.columnHeaderTable;if(c){var d=a.columnCount-(b?b.columnCount:0);8==v("ie")&&(null==this._colTableSave?this._colTableSave=s.clone(c):0>d&&(this._cleanupColumnHeader(),this.columnHeader.removeChild(c),
q.destroy(c),this.columnHeaderTable=c=s.clone(this._colTableSave),this.columnHeader.appendChild(c),d=a.columnCount));var e=n("tbody",c),g=n("tr",c),f,e=1==e.length?e[0]:D.create("tbody",null,c),g=1==g.length?g[0]:q.create("tr",null,e);if(0<d)for(e=0;e<d;e++){f=q.create("td",null,g);var h=[];h.push(t(f,"click",s.hitch(this,this._columnHeaderClick)));v("touch-events")?(h.push(t(f,"touchstart",function(a){r.stop(a);l.add(a.currentTarget,"Active")})),h.push(t(f,"touchend",function(a){r.stop(a);l.remove(a.currentTarget,
"Active")}))):(h.push(t(f,"mousedown",function(a){r.stop(a);l.add(a.currentTarget,"Active")})),h.push(t(f,"mouseup",function(a){r.stop(a);l.remove(a.currentTarget,"Active")})),h.push(t(f,"mouseover",function(a){r.stop(a);l.add(a.currentTarget,"Hover")})),h.push(t(f,"mouseout",function(a){r.stop(a);l.remove(a.currentTarget,"Hover")})));this._columnHeaderHandlers.push(h)}else{d=-d;for(e=0;e<d;e++){f=g.lastChild;g.removeChild(f);q.destroy(f);for(f=this._columnHeaderHandlers.pop();0<f.length;)f.pop().remove()}}n("td",
c).forEach(function(b,c){b.className="";0==c?l.add(b,"first-child"):c==this.renderData.columnCount-1&&l.add(b,"last-child");var d=a.dates[c][0];this._setText(b,this._formatColumnHeaderLabel(d));this.styleColumnHeaderCell(b,d,a)},this)}},_cleanupColumnHeader:function(){for(;0<this._columnHeaderHandlers.length;)for(var a=this._columnHeaderHandlers.pop();0<a.length;)a.pop().remove()},styleColumnHeaderCell:function(a,b,c){},_buildGrid:function(a,b){var c=this.gridTable;if(c){p.set(c,"height",a.sheetHeight+
"px");var d=a.maxDayCount-(b?b.maxDayCount:0),e=0<d,g=a.columnCount-(b?b.columnCount:0);8==v("ie")&&(null==this._gridTableSave?this._gridTableSave=s.clone(c):0>g&&(this.grid.removeChild(c),q.destroy(c),this.gridTable=c=s.clone(this._gridTableSave),this.grid.appendChild(c),g=a.columnCount,d=a.maxDayCount,e=!0));var f=n("tbody",c),f=1==f.length?f[0]:q.create("tbody",null,c);if(e)for(var h=0;h<d;h++)q.create("tr",null,f);else{d=-d;for(h=0;h<d;h++)f.removeChild(f.lastChild)}var k=a.maxDayCount-d,m=e||
0<g,g=m?g:-g;n("tr",c).forEach(function(b,c){if(m){var d=c>=k?a.columnCount:g;for(c=0;c<d;c++){var e=q.create("td",null,b);q.create("span",null,e)}}else for(c=0;c<g;c++)b.removeChild(b.lastChild)});n("tr",c).forEach(function(b,c){b.className="";0==c&&l.add(b,"first-child");c==a.maxDayCount-1&&l.add(b,"last-child");n("td",b).forEach(function(b,d){b.className="";0==d&&l.add(b,"first-child");d==a.columnCount-1&&l.add(b,"last-child");var e=null;c<a.dates[d].length&&(e=a.dates[d][c]);var f=n("span",b)[0];
this._setText(f,this.showCellLabel?this._formatGridCellLabel(e,c,d):null);this.styleGridCell(b,e,d,c,a)},this)},this)}},styleGridCellFunc:null,defaultStyleGridCell:function(a,b,c,d,e){null!=b&&(l.add(a,this._cssDays[b.getDay()]),this.isToday(b)?l.add(a,"dojoxCalendarToday"):this.isWeekEnd(b)&&l.add(a,"dojoxCalendarWeekend"))},styleGridCell:function(a,b,c,d,e){this.styleGridCellFunc?this.styleGridCellFunc(a,b,c,d,e):this.defaultStyleGridCell(a,b,c,d,e)},_buildItemContainer:function(a,b){var c=this.itemContainerTable;
if(c){var d=[];p.set(c,"height",a.sheetHeight+"px");var e=a.columnCount-(b?b.columnCount:0);8==v("ie")&&(null==this._itemTableSave?this._itemTableSave=s.clone(c):0>e&&(this.itemContainer.removeChild(c),this._recycleItemRenderers(!0),q.destroy(c),this.itemContainerTable=c=s.clone(this._itemTableSave),this.itemContainer.appendChild(c),e=a.columnCount));var g=n("tbody",c),f=n("tr",c),g=1==g.length?g[0]:q.create("tbody",null,c),f=1==f.length?f[0]:q.create("tr",null,g);if(0<e)for(var h=0;h<e;h++)g=q.create("td",
null,f),q.create("div",{className:"dojoxCalendarContainerColumn"},g);else{e=-e;for(h=0;h<e;h++)f.removeChild(f.lastChild)}n("td\x3ediv",c).forEach(function(b,c){p.set(b,{height:a.sheetHeight+"px"});d.push(b)},this);a.cells=d}},_overlapLayoutPass2:function(a){var b,c,d,e;d=a[a.length-1];for(c=0;c<d.length;c++)d[c].extent=1;for(b=0;b<a.length-1;b++){d=a[b];for(c=0;c<d.length;c++)if(e=d[c],-1==e.extent){e.extent=1;for(var g=0,f=!1,h=b+1;h<a.length&&!f;h++){for(var k=a[h],m=0;m<k.length&&!f;m++){var l=
k[m];e.start<l.end&&l.start<e.end&&(f=!0)}f||g++}e.extent+=g}}},_defaultItemToRendererKindFunc:function(a){return a.allDay?"vertical":1440<=Math.abs(this.renderData.dateModule.difference(a.startTime,a.endTime,"minute"))?"vertical":null},_layoutRenderers:function(a){this.hiddenEvents={};this.inherited(arguments)},_layoutInterval:function(a,b,c,d,e,g){var f=[],h=[];a.colW=this.itemContainer.offsetWidth/a.columnCount;if("dataItems"===g){for(var k=0;k<e.length;k++){var m=e[k];"vertical"==this._itemToRendererKind(m)?
f.push(m):this.showHiddenItems&&h.push(m)}0<f.length&&this._layoutVerticalItems(a,b,c,d,f,g);0<h.length&&this._layoutBgItems(a,b,c,d,h)}else this._layoutVerticalItems(a,b,c,d,e,g)},_dateToYCoordinate:function(a,b,c){a=0;c||0!=b.getHours()||0!=b.getMinutes()?a=(b.getDate()-1)*this.renderData.daySize:(c=this._waDojoxAddIssue(b,"day",-1),a=this.renderData.daySize+(c.getDate()-1)*this.renderData.daySize);return a+=(60*b.getHours()+b.getMinutes())*this.renderData.daySize/1440},_layoutVerticalItems:function(a,
b,c,d,e,g){if(null!=this.verticalRenderer){b=a.cells[b];for(var f=[],h=0;h<e.length;h++){var k=e[h],m=this.computeRangeOverlap(a,k.startTime,k.endTime,c,d),l=this._dateToYCoordinate(a,m[0],!0),n=this._dateToYCoordinate(a,m[1],!1);n>l&&(k=s.mixin({start:l,end:n,range:m,item:k},k),f.push(k))}c="dataItems"===g?this.computeOverlapping(f,this._overlapLayoutPass2).numLanes:1;d=this.percentOverlap/100;for(h=0;h<f.length;h++){k=f[h];n=k.lane;l=k.extent;e=null;if("dataItems"===g){0==d?(m=1==c?a.colW:(a.colW-
(c-1)*this.horizontalGap)/c,n*=m+this.horizontalGap,m=1==l?m:m*l+(l-1)*this.horizontalGap,m=100*m/a.colW,n=100*n/a.colW):(m=1==c?100:100/(c-(c-1)*d),n*=m-d*m,m=1==l?m:m*(l-(l-1)*d));e=this._createRenderer(k,"vertical",this.verticalRenderer,"dojoxCalendarVertical");p.set(e.container,{top:k.start+"px",left:n+"%",width:m+"%",height:k.end-k.start+1+"px"});var l=this.isItemBeingEdited(k),n=this.isItemSelected(k),r=this.isItemHovered(k),t=this.isItemFocused(k),u=e.renderer;u.set("hovered",r);u.set("selected",
n);u.set("edited",l);u.set("focused",this.showFocus?t:!1);u.set("storeState",this.getItemStoreState(k));u.set("moveEnabled",this.isItemMoveEnabled(k._item,"vertical"));u.set("resizeEnabled",this.isItemResizeEnabled(k._item,"vertical"));this.applyRendererZIndex(k,e,r,n,l,t);u.updateRendering&&u.updateRendering(m,k.end-k.start+1)}else e=this.decorationRendererManager.createRenderer(k,"vertical",this.verticalDecorationRenderer,"dojoxCalendarDecoration"),p.set(e.container,{top:k.start+"px",left:"0",width:"100%",
height:k.end-k.start+1+"px"});q.place(e.container,b);p.set(e.container,"display","block")}}},_getCellAt:function(a,b,c){if((void 0==c||!0==c)&&!this.isLeftToRight())b=this.renderData.columnCount-1-b;return this.gridTable.childNodes[0].childNodes[a].childNodes[b]},invalidateLayout:function(){n("td",this.gridTable).forEach(function(a){l.remove(a,"dojoxCalendarHiddenEvents")});this.inherited(arguments)},_layoutBgItems:function(a,b,c,d,e){for(var g={},f=0;f<e.length;f++){var h=e[f],k=this.computeRangeOverlap(a,
h.startTime,h.endTime,c,d),h=k[0].getDate()-1;this.isStartOfDay(k[1])?(k=this._waDojoxAddIssue(k[1],"day",-1),k=k.getDate()-1):k=k[1].getDate()-1;for(;h<=k;h++)g[h]=!0}for(var m in g)g[m]&&(a=this._getCellAt(m,b,!1),l.add(a,"dojoxCalendarHiddenEvents"))},_sortItemsFunction:function(a,b){var c=this.dateModule.compare(a.startTime,b.startTime);0==c&&(c=-1*this.dateModule.compare(a.endTime,b.endTime));return this.isLeftToRight()?c:-c},getTime:function(a,b,c,d){null!=a&&(c=w.position(this.itemContainer,
!0),a.touches?(d=void 0==d?0:d,b=a.touches[d].pageX-c.x,c=a.touches[d].pageY-c.y):(b=a.pageX-c.x,c=a.pageY-c.y));a=w.getContentBox(this.itemContainer);this.isLeftToRight()||(b=a.w-b);0>b?b=0:b>a.w&&(b=a.w-1);0>c?c=0:c>a.h&&(c=a.h-1);b=Math.floor(b/(a.w/this.renderData.columnCount));c=Math.floor(c/(a.h/this.renderData.maxDayCount));a=null;b<this.renderData.dates.length&&c<this.renderData.dates[b].length&&(a=this.newDate(this.renderData.dates[b][c]));return a},_onGridMouseUp:function(a){this.inherited(arguments);
this._gridMouseDown&&(this._gridMouseDown=!1,this._onGridClick({date:this.getTime(a),triggerEvent:a}))},_onGridTouchStart:function(a){this.inherited(arguments);var b=this._gridProps;b.moved=!1;b.start=a.touches[0].screenY;b.scrollTop=this.scrollContainer.scrollTop},_onGridTouchMove:function(a){this.inherited(arguments);if(1<a.touches.length&&!this._isEditing)r.stop(a);else if(this._gridProps&&!this._isEditing){var b=a.touches[0].screenX,c=a.touches[0].screenY,d=this._edProps;if(!d||d&&(25<Math.abs(b-
d.start.x)||25<Math.abs(c-d.start.y)))this._gridProps.moved=!0,b=this._gridProps.scrollTop-(a.touches[0].screenY-this._gridProps.start),c=this.itemContainer.offsetHeight-this.scrollContainer.offsetHeight,0>b?(this._gridProps.start=a.touches[0].screenY,this._setScrollImpl(0),this._gridProps.scrollTop=0):b>c?(this._gridProps.start=a.touches[0].screenY,this._setScrollImpl(c),this._gridProps.scrollTop=c):this._setScrollImpl(b)}},_onGridTouchEnd:function(a){this.inherited(arguments);var b=this._gridProps;
b&&(!this._isEditing&&!b.moved&&(!b.fromItem&&!b.editingOnStart&&this.selectFromEvent(a,null,null,!0),b.fromItem||(this._pendingDoubleTap&&this._pendingDoubleTap.grid?(this._onGridDoubleClick({date:this.getTime(this._gridProps.event),triggerEvent:this._gridProps.event}),clearTimeout(this._pendingDoubleTap.timer),delete this._pendingDoubleTap):(this._onGridClick({date:this.getTime(this._gridProps.event),triggerEvent:this._gridProps.event}),this._pendingDoubleTap={grid:!0,timer:setTimeout(s.hitch(this,
function(){delete this._pendingDoubleTap}),this.doubleTapDelay)}))),this._gridProps=null)},_onColumnHeaderClick:function(a){this._dispatchCalendarEvt(a,"onColumnHeaderClick")},onColumnHeaderClick:function(a){},_onScrollTimer_tick:function(){this._setScrollImpl(this.scrollContainer.scrollTop+this._scrollProps.scrollStep)},snapUnit:"day",snapSteps:1,minDurationUnit:"day",minDurationSteps:1,liveLayout:!1,stayInView:!0,allowStartEndSwap:!0,allowResizeLessThan24H:!1})});
//# sourceMappingURL=MonthColumnView.js.map