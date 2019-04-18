//>>built
define("dgrid/extensions/Pagination","../_StoreMixin dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/Deferred dojo/on dojo/query dojo/string dojo/has put-selector/put ../util/misc dojo/i18n!./nls/pagination dojo/_base/sniff xstyle/css!../css/extensions/Pagination.css".split(" "),function(y,z,A,u,p,q,r,v,s,e,B,C){function D(a){a.noDataNode?(e(a.noDataNode,"!"),delete a.noDataNode):a.cleanup();a.contentNode.innerHTML=""}function w(a){if(a.loadingNode)e(a.loadingNode,"!"),delete a.loadingNode;
else if(a._oldPageNodes){for(var b in a._oldPageNodes)a.removeRow(a._oldPageNodes[b]);delete a._oldPageNodes;a._oldPageObserver&&(a._oldPageObserver.cancel(),a._numObservers--,delete a._oldPageObserver)}delete a._isLoading}return z(y,{rowsPerPage:10,pagingTextBox:!1,previousNextArrows:!0,firstLastArrows:!1,pagingLinks:2,pageSizeOptions:null,showLoadingMessage:!0,i18nPagination:C,showFooter:!0,_currentPage:1,_total:0,buildRendering:function(){this.inherited(arguments);var a=this,b=this.paginationNode=
e(this.footerNode,"div.dgrid-pagination"),c=this.paginationStatusNode=e(b,"div.dgrid-status"),k=this.i18nPagination;c.tabIndex=0;this._updatePaginationSizeSelect();this._updateRowsPerPageOption();c.innerHTML=v.substitute(k.status,{start:1,end:1,total:0});b=this.paginationNavigationNode=e(b,"div.dgrid-navigation");this.firstLastArrows&&(c=this.paginationFirstNode=e(b,"span.dgrid-first.dgrid-page-link","\u00ab"),c.setAttribute("aria-label",k.gotoFirst),c.tabIndex=0);this.previousNextArrows&&(c=this.paginationPreviousNode=
e(b,"span.dgrid-previous.dgrid-page-link","\u2039"),c.setAttribute("aria-label",k.gotoPrev),c.tabIndex=0);this.paginationLinksNode=e(b,"span.dgrid-pagination-links");this.previousNextArrows&&(c=this.paginationNextNode=e(b,"span.dgrid-next.dgrid-page-link","\u203a"),c.setAttribute("aria-label",k.gotoNext),c.tabIndex=0);this.firstLastArrows&&(c=this.paginationLastNode=e(b,"span.dgrid-last.dgrid-page-link","\u00bb"),c.setAttribute("aria-label",k.gotoLast),c.tabIndex=0);this._listeners.push(q(b,".dgrid-page-link:click,.dgrid-page-link:keydown",
function(b){if(!("keydown"===b.type&&13!==b.keyCode)){b=this.className;var c,e;a._isLoading||-1<b.indexOf("dgrid-page-disabled")||(c=a._currentPage,e=Math.ceil(a._total/a.rowsPerPage),this===a.paginationPreviousNode?a.gotoPage(c-1):this===a.paginationNextNode?a.gotoPage(c+1):this===a.paginationFirstNode?a.gotoPage(1):this===a.paginationLastNode?a.gotoPage(e):"dgrid-page-link"===b&&a.gotoPage(+this.innerHTML))}}))},destroy:function(){this.inherited(arguments);this._pagingTextBoxHandle&&this._pagingTextBoxHandle.remove()},
_updatePaginationSizeSelect:function(){var a=this.pageSizeOptions,b=this.paginationSizeSelect,c;if(a&&a.length){b||(b=this.paginationSizeSelect=e(this.paginationNode,"select.dgrid-page-size[aria-label\x3d"+this.i18nPagination.rowsPerPage+"]"),c=this._paginationSizeChangeHandle=q(b,"change",u.hitch(this,function(){this.set("rowsPerPage",+this.paginationSizeSelect.value)})),this._listeners.push(c));for(c=b.options.length=0;c<a.length;c++)e(b,"option",a[c],{value:a[c],selected:this.rowsPerPage===a[c]});
this._updateRowsPerPageOption()}else if((!a||!a.length)&&b)e(b,"!"),this.paginationSizeSelect=null,this._paginationSizeChangeHandle.remove()},_setPageSizeOptions:function(a){this.pageSizeOptions=a&&a.sort(function(b,a){return b-a});this._updatePaginationSizeSelect()},_updateRowsPerPageOption:function(){var a=this.rowsPerPage,b=this.pageSizeOptions,c=this.paginationSizeSelect;c&&(0>A.indexOf(b,a)?this._setPageSizeOptions(b.concat([a])):c.value=""+a)},_setRowsPerPage:function(a){this.rowsPerPage=a;
this._updateRowsPerPageOption();this.gotoPage(1)},_updateNavigation:function(){function a(a,b){var d,f;c.pagingTextBox&&a==l&&1<h?(d=e(m,"input.dgrid-page-input[type\x3dtext][value\x3d$]",l),d.setAttribute("aria-label",k.jumpPage),c._pagingTextBoxHandle=q(d,"change",function(){var a=+this.value;!isNaN(a)&&(0<a&&a<=h)&&c.gotoPage(+this.value)}),g&&"INPUT"===g.tagName&&d.focus()):(f=a===l,d=e(m,"span"+(f?".dgrid-page-disabled":"")+".dgrid-page-link",a+(b?" ":"")),d.setAttribute("aria-label",k.gotoPage),
d.tabIndex=f?-1:0,t===a&&(f?a<h?t++:x.focus():d.focus()),f||(x=d))}function b(a,b){e(a,(b?".":"!")+"dgrid-page-disabled");a.tabIndex=b?-1:0}var c=this,k=this.i18nPagination,m=this.paginationLinksNode,l=this._currentPage,f=this.pagingLinks,d=this.paginationNavigationNode,h=Math.ceil(this._total/this.rowsPerPage),n=this._pagingTextBoxHandle,g=document.activeElement,t,x;!g||!B.contains(this.paginationNavigationNode,g)?g=null:"dgrid-page-link"===g.className&&(t=+g.innerHTML);n&&n.remove();m.innerHTML=
"";r(".dgrid-first, .dgrid-previous",d).forEach(function(a){b(a,1===l)});r(".dgrid-last, .dgrid-next",d).forEach(function(a){b(a,l>=h)});if(f&&0<h){a(1,!0);d=l-f;for(2<d?e(m,"span.dgrid-page-skip","..."):d=2;d<Math.min(l+f+1,h);d++)a(d,!0);l+f+1<h&&e(m,"span.dgrid-page-skip","...");1<h&&a(h)}else c.pagingTextBox&&a(l);g&&-1===g.tabIndex&&(f=r("[tabindex\x3d'0']",this.paginationNavigationNode),g===this.paginationPreviousNode||g===this.paginationFirstNode?g=f[0]:f.length&&(g=f[f.length-1]),g&&g.focus())},
refresh:function(){var a=this;this.inherited(arguments);if(this.store)return this.gotoPage(1).then(function(b){setTimeout(function(){q.emit(a.domNode,"dgrid-refresh-complete",{bubbles:!0,cancelable:!1,grid:a,results:b})},0);return b})},_onNotification:function(a){a.length!==this._rowsOnPage&&this.gotoPage(this._currentPage)},renderArray:function(a,b){var c=this,e=this.inherited(arguments);this._lastCollection=null;b||(this._topLevelRequest&&this._topLevelRequest!==a&&(this._topLevelRequest.cancel(),
delete this._topLevelRequest),"function"===typeof a.cancel&&(this._topLevelRequest=a),p.when(a,function(){c._topLevelRequest&&delete c._topLevelRequest}));return e},insertRow:function(){var a=this._oldPageNodes,b=this.inherited(arguments);a&&b===a[b.id]&&delete a[b.id];return b},gotoPage:function(a){var b=this,c=new p;this._trackError(function(){var k=b.rowsPerPage,m=(a-1)*k,l=u.mixin(b.get("queryOptions"),{start:m,count:k}),f,d=b.contentNode,h,n,g;if(b.showLoadingMessage)D(b),h=b.loadingNode=e(d,
"div.dgrid-loading"),h.innerHTML=b.loadingMessage;else{b._oldPageNodes=h={};d=d.children;n=0;for(g=d.length;n<g;n++)h[d[n].id]=d[n];b._oldPageObserver=b.observers.pop()}b._isLoading=!0;f=b.store.query(b.query,l);p.when(b.renderArray(f,null,l),function(d){w(b);b.scrollTo({y:0});p.when(f.total,function(c){c||(b.noDataNode&&(e(b.noDataNode,"!"),delete b.noDataNode),b.noDataNode=e(b.contentNode,"div.dgrid-no-data"),b.noDataNode.innerHTML=b.noDataMessage);b.paginationStatusNode.innerHTML=v.substitute(b.i18nPagination.status,
{start:Math.min(m+1,c),end:Math.min(c,m+k),total:c});b._total=c;b._currentPage=a;b._rowsOnPage=d.length;b._updateNavigation()});(7>s("ie")||s("ie")&&s("quirks"))&&b.resize();c.resolve(f)},function(a){w(b);c.reject(a)});return c.promise})||c.reject();return c.promise}})});
//# sourceMappingURL=Pagination.js.map