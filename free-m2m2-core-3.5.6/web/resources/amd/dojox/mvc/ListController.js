//>>built
define(["dojo/_base/array","dojo/_base/lang","dojo/_base/declare","./ModelRefController"],function(l,h,m,n){function k(a){for(var c in{_listModelWatchHandle:1,_tableModelWatchHandle:1})a[c]&&(a[c].unwatch(),a[c]=null)}function p(a,c,b){k(a);b&&c!==b&&(b.watchElements?a._listModelWatchHandle=b.watchElements(function(b,c,d){if(c&&d){var e=a.get("cursorIndex");c&&e>=b&&e<b+c.length?a.set("cursorIndex",-1):(c.length||d.length)&&e>=b&&a.set(a._refCursorProp,a.get("cursor"))}else a.set(a._refCursorProp,
a.get(a._refCursorProp))}):b.set&&b.watch&&(0>a.get("cursorIndex")&&a._set("cursorIndex",""),a._tableModelWatchHandle=b.watch(function(b,c,d){c!==d&&b==a.get("cursorIndex")&&a.set(a._refCursorProp,d)})));a._setCursorIndexAttr(a.cursorIndex)}return m("dojox.mvc.ListController",n,{idProperty:"uniqueId",cursorId:null,cursorIndex:-1,cursor:null,model:null,_listModelWatchHandle:null,_tableModelWatchHandle:null,_refCursorProp:"cursor",_refModelProp:"cursor",destroy:function(){k(this);this.inherited(arguments)},
set:function(a,c){var b=this[this._refCursorProp],g=this[this._refInModelProp];this.inherited(arguments);if(a==this._refCursorProp)a:{var f=c,d=this[this._refInModelProp];if(d&&b!==f)if(h.isArray(d))b=l.indexOf(d,f),0>b?(b=this.get("cursorIndex"),0<=b&&b<d.length&&d.set(b,f)):this.set("cursorIndex",b);else{for(var e in d)if(d[e]==f){this.set("cursorIndex",e);break a}(b=this.get("cursorIndex"))&&d.set(b,f)}}a==this._refInModelProp&&p(this,g,c)},_setCursorIdAttr:function(a){var c=this.cursorId;this._set("cursorId",
a);var b=this[this._refInModelProp];if(b&&c!==a)if(h.isArray(b)){for(c=0;c<b.length;c++)if(b[c][this.idProperty]==a){this.set("cursorIndex",c);return}this._set("cursorIndex",-1)}else{for(var g in b)if(b[g][this.idProperty]==a){this.set("cursorIndex",g);return}this._set("cursorIndex","")}},_setCursorIndexAttr:function(a){this._set("cursorIndex",a);this[this._refInModelProp]&&(this.set(this._refCursorProp,this[this._refInModelProp][a]),this.set("cursorId",this[this._refInModelProp][a]&&this[this._refInModelProp][a][this.idProperty]))},
hasControllerProperty:function(a){return this.inherited(arguments)||a==this._refCursorProp}})});
//# sourceMappingURL=ListController.js.map