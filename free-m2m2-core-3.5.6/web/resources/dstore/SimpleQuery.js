//>>built
define("dstore/SimpleQuery",["dojo/_base/declare","dojo/_base/array"],function(p,k){function q(a,b){if(-1<a.indexOf(".")){var d=a.split("."),l=d.length;return function(a){for(var f=0;f<l;f++)a=a&&(b&&a.get?a.get(d[f]):a[d[f]]);return a}}return function(b){return b.get?b.get(a):b[a]}}var s={eq:function(a,b){return a===b},"in":function(a,b){return-1<k.indexOf(b.data||b,a)},ne:function(a,b){return a!==b},lt:function(a,b){return a<b},lte:function(a,b){return a<=b},gt:function(a,b){return a>b},gte:function(a,
b){return a>=b},match:function(a,b,d){return b.test(a,d)},contains:function(a,b,d,l){var e=this;return k.every(b.data||b,function(b){if("object"===typeof b&&b.type){var c=e._getFilterComparator(b.type);return k.some(a,function(a){return c.call(e,a,b.args[1],d,l)})}return-1<k.indexOf(a,b)})}};return p(null,{_createFilterQuerier:function(a){function b(a){var c=a.type;a=a.args;var g=l._getFilterComparator(c);if(g){var h=a[0],k=q(h,d),n=a[1];n&&n.fetchSync&&(n=n.fetchSync());return function(a){return g.call(l,
k(a),n,a,h)}}switch(c){case "and":case "or":for(var m=0,p=a.length;m<p;m++){var r=b(a[m]);e=e?function(a,b){return"and"===c?function(c){return a(c)&&b(c)}:function(c){return a(c)||b(c)}}(e,r):r}return e;case "function":return a[0];case "string":m=l[a[0]];if(!m)throw Error("No filter function "+a[0]+" was found in the collection");return m;case void 0:return function(){return!0};default:throw Error('Unknown filter operation "'+c+'"');}}var d=this.queryAccessors,l=this,e=b(a);return function(a){return k.filter(a,
e)}},_getFilterComparator:function(a){return s[a]||this.inherited(arguments)},_createSelectQuerier:function(a){return function(b){var d=a.length;return k.map(b,a instanceof Array?function(b){for(var e={},f=0;f<d;f++){var c=a[f];e[c]=b[c]}return e}:function(b){return b[a]})}},_createSortQuerier:function(a){var b=this.queryAccessors;return function(d){d=d.slice();d.sort("function"==typeof a?a:function(d,e){for(var f=0;f<a.length;f++){var c,g=a[f];if("function"==typeof g)c=g(d,e);else{c=g.get||(g.get=
q(g.property,b));var g=g.descending,h=c(d);c=c(e);null!=h&&(h=h.valueOf());null!=c&&(c=c.valueOf());c=h===c?0:!!g===(null===h||h>c&&null!==c)?-1:1}if(0!==c)return c}return 0});return d}}})});
//# sourceMappingURL=SimpleQuery.js.map