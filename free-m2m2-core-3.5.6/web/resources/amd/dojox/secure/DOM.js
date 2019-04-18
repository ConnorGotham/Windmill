//>>built
define(["dijit","dojo","dojox","dojo/require!dojox/lang/observable"],function(y,g,k){g.provide("dojox.secure.DOM");g.require("dojox.lang.observable");k.secure.DOM=function(e){function f(a){if(a){if(a.nodeType){var b=s(a);1==a.nodeType&&"function"==typeof b.style&&(b.style=w(a.style),b.ownerDocument=m,b.childNodes={__get__:function(b){return f(a.childNodes[b])},length:0});return b}if(a&&"object"==typeof a){if(a.__observable)return a.__observable;b=a instanceof Array?[]:{};a.__observable=b;for(var d in a)"__observable"!=
d&&(b[d]=f(a[d]));b.data__=a;return b}if("function"==typeof a){var c=function(a){return"function"==typeof a?function(){for(var b=0;b<arguments.length;b++)arguments[b]=f(arguments[b]);return c(a.apply(f(this),arguments))}:k.secure.unwrap(a)};return function(){a.safetyCheck&&a.safetyCheck.apply(c(this),arguments);for(var b=0;b<arguments.length;b++)arguments[b]=c(arguments[b]);return f(a.apply(c(this),arguments))}}}return a}function l(a){a+="";if(a.match(/behavior:|content:|javascript:|binding|expression|\@import/))throw Error("Illegal CSS");
var b=e.id||(e.id="safe"+(""+Math.random()).substring(2));return a.replace(/(\}|^)\s*([^\{]*\{)/g,function(a,c,f){return c+" #"+b+" "+f})}function t(a){if(a.match(/:/)&&!a.match(/^(http|ftp|mailto)/))throw Error("Unsafe URL "+a);}function p(a){if(a&&1==a.nodeType){if(a.tagName.match(/script/i)){var b=a.src;b&&""!=b?(a.parentNode.removeChild(a),g.xhrGet({url:b,secure:!0}).addCallback(function(a){m.evaluate(a)})):(b=a.innerHTML,a.parentNode.removeChild(a),f.evaluate(b))}if(a.tagName.match(/link/i))throw Error("illegal tag");
if(a.tagName.match(/style/i)){var d=function(b){a.styleSheet?a.styleSheet.cssText=b:(b=n.createTextNode(b),a.childNodes[0]?a.replaceChild(b,a.childNodes[0]):a.appendChild(b))};if((b=a.src)&&""!=b)alert("src"+b),a.src=null,g.xhrGet({url:b,secure:!0}).addCallback(function(a){d(l(a))});d(l(a.innerHTML))}a.style&&l(a.style.cssText);a.href&&t(a.href);a.src&&t(a.src);for(var c,b=0;c=a.attributes[b++];)if("on"==c.name.substring(0,2)&&"null"!=c.value&&""!=c.value)throw Error("event handlers not allowed in the HTML, they must be set with element.addEventListener");
c=a.childNodes;for(var b=0,e=c.length;b<e;b++)p(c[b])}}function q(a){var b=document.createElement("div");if(a.match(/<object/i))throw Error("The object tag is not allowed");b.innerHTML=a;p(b);return b}function r(a,b){return function(d,c){p(c[b]);return d[a](c[0])}}function u(a){return k.lang.makeObservable(function(a,d){return a[d]},a,function(a,d,c,e){for(var g=0;g<e.length;g++)e[g]=unwrap(e[g]);return h[c]?f(h[c].call(a,d,e)):f(d[c].apply(d,e))},h)}unwrap=k.secure.unwrap;var n=e.ownerDocument,m=
{getElementById:function(a){a:if(a=n.getElementById(a)){var b=a;do if(b==e){a=f(a);break a}while(b=b.parentNode);a=null}return a},createElement:function(a){return f(n.createElement(a))},createTextNode:function(a){return f(n.createTextNode(a))},write:function(a){for(a=q(a);a.childNodes.length;)e.appendChild(a.childNodes[0])}};m.open=m.close=function(){};var v={innerHTML:function(a,b){a.innerHTML=q(b).innerHTML},outerHTML:function(a,b){throw Error("Can not set this property");}},h={appendChild:r("appendChild",
0),insertBefore:r("insertBefore",0),replaceChild:r("replaceChild",1),cloneNode:function(a,b){return a.cloneNode(b[0])},addEventListener:function(a,b){g.connect(a,"on"+b[0],this,function(a){a=s(a||window.event);b[1].call(this,a)})}};h.childNodes=h.style=h.ownerDocument=function(){};var s=u(function(a,b,d){if(v[b])v[b](a,d);a[b]=d}),x={behavior:1,MozBinding:1},w=u(function(a,b,d){x[b]||(a[b]=l(d))});f.safeHTML=q;f.safeCSS=l;return f};k.secure.unwrap=function(e){return e&&e.data__||e}});
//# sourceMappingURL=DOM.js.map