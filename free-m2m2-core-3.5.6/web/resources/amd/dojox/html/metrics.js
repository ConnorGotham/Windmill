//>>built
define("dojo/_base/kernel dojo/_base/lang dojo/_base/sniff dojo/ready dojo/_base/unload dojo/_base/window dojo/dom-geometry".split(" "),function(m,n,g,s,t,f,u){var b=n.getObject("dojox.html.metrics",!0),p=n.getObject("dojox");b.getFontMeasurements=function(){var a={"1em":0,"1ex":0,"100%":0,"12pt":0,"16px":0,"xx-small":0,"x-small":0,small:0,medium:0,large:0,"x-large":0,"xx-large":0},e;g("ie")&&(e=f.doc.documentElement.style.fontSize||"",e||(f.doc.documentElement.style.fontSize="100%"));var b=f.doc.createElement("div"),
d=b.style;d.position="absolute";d.left="-100px";d.top="0";d.width="30px";d.height="1000em";d.borderWidth="0";d.margin="0";d.padding="0";d.outline="0";d.lineHeight="1";d.overflow="hidden";f.body().appendChild(b);for(var c in a)d.fontSize=c,a[c]=16*Math.round(12*b.offsetHeight/16)/12/1E3;g("ie")&&(f.doc.documentElement.style.fontSize=e);f.body().removeChild(b);return a};var h=null;b.getCachedFontMeasurements=function(a){if(a||!h)h=b.getFontMeasurements();return h};var k=null,v={};b.getTextBox=function(a,
b,g){var d,c;if(k)d=k;else{d=k=f.doc.createElement("div");var h=f.doc.createElement("div");h.appendChild(d);c=h.style;c.overflow="scroll";c.position="absolute";c.left="0px";c.top="-10000px";c.width="1px";c.height="1px";c.visibility="hidden";c.borderWidth="0";c.margin="0";c.padding="0";c.outline="0";f.body().appendChild(h)}d.className="";c=d.style;c.borderWidth="0";c.margin="0";c.padding="0";c.outline="0";if(1<arguments.length&&b)for(var l in b)l in v||(c[l]=b[l]);2<arguments.length&&g&&(d.className=
g);d.innerHTML=a;c=u.position(d);c.w=d.parentNode.scrollWidth;return c};var q=16,r=16;b.getScrollbar=function(){return{w:q,h:r}};b._fontResizeNode=null;b.initOnFontResize=function(a){var e=b._fontResizeNode=f.doc.createElement("iframe");a=e.style;a.position="absolute";a.width="5em";a.height="10em";a.top="-10000px";a.display="none";g("ie")?e.onreadystatechange=function(){"complete"==e.contentWindow.document.readyState&&(e.onresize=e.contentWindow.parent[p._scopeName].html.metrics._fontresize)}:e.onload=
function(){e.contentWindow.onresize=e.contentWindow.parent[p._scopeName].html.metrics._fontresize};e.setAttribute("src","javascript:'\x3chtml\x3e\x3chead\x3e\x3cscript\x3eif(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}\x3c/script\x3e\x3c/head\x3e\x3cbody\x3e\x3c/body\x3e\x3c/html\x3e'");f.body().appendChild(e);b.initOnFontResize=function(){}};b.onFontResize=function(){};b._fontresize=function(){b.onFontResize()};t.addOnUnload(function(){var a=b._fontResizeNode;a&&(g("ie")&&a.onresize?
a.onresize=null:a.contentWindow&&a.contentWindow.onresize&&(a.contentWindow.onresize=null),b._fontResizeNode=null)});s(function(){try{var a=f.doc.createElement("div");a.style.cssText="top:0;left:0;width:100px;height:100px;overflow:scroll;position:absolute;visibility:hidden;";f.body().appendChild(a);q=a.offsetWidth-a.clientWidth;r=a.offsetHeight-a.clientHeight;f.body().removeChild(a);delete a}catch(e){}"fontSizeWatch"in m.config&&m.config.fontSizeWatch&&b.initOnFontResize()});return b});
//# sourceMappingURL=metrics.js.map