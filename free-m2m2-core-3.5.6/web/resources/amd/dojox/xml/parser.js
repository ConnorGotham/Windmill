//>>built
define(["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","dojo/_base/window","dojo/_base/sniff"],function(c){c.getObject("xml.parser",!0,dojox);dojox.xml.parser.parse=function(b,d){var a=c.doc,e;d=d||"text/xml";if(b&&c.trim(b)&&"DOMParser"in c.global){e=(new DOMParser).parseFromString(b,d);a=e.documentElement;if("parsererror"==a.nodeName&&"http://www.mozilla.org/newlayout/xml/parsererror.xml"==a.namespaceURI){var f=a.getElementsByTagNameNS("http://www.mozilla.org/newlayout/xml/parsererror.xml",
"sourcetext")[0];f&&(f=f.firstChild.data);throw Error("Error parsing text "+a.firstChild.data+" \n"+f);}return e}if("ActiveXObject"in c.global){a=function(a){return"MSXML"+a+".DOMDocument"};a=["Microsoft.XMLDOM",a(6),a(4),a(3),a(2)];c.some(a,function(a){try{e=new ActiveXObject(a)}catch(b){return!1}return!0});if(b&&e&&(e.async=!1,e.loadXML(b),a=e.parseError,0!==a.errorCode))throw Error("Line: "+a.line+"\nCol: "+a.linepos+"\nReason: "+a.reason+"\nError Code: "+a.errorCode+"\nSource: "+a.srcText);if(e)return e}else if(a.implementation&&
a.implementation.createDocument){if(b&&c.trim(b)&&a.createElement){f=a.createElement("xml");f.innerHTML=b;var g=a.implementation.createDocument("foo","",null);c.forEach(f.childNodes,function(a){g.importNode(a,!0)});return g}return a.implementation.createDocument("","",null)}return null};dojox.xml.parser.textContent=function(b,d){if(1<arguments.length)return dojox.xml.parser.replaceChildren(b,(b.ownerDocument||c.doc).createTextNode(d)),d;if(void 0!==b.textContent)return b.textContent;var a="";b&&c.forEach(b.childNodes,
function(b){switch(b.nodeType){case 1:case 5:a+=dojox.xml.parser.textContent(b);break;case 3:case 2:case 4:a+=b.nodeValue}});return a};dojox.xml.parser.replaceChildren=function(b,d){var a=[];c.isIE&&c.forEach(b.childNodes,function(b){a.push(b)});dojox.xml.parser.removeChildren(b);c.forEach(a,c.destroy);c.isArray(d)?c.forEach(d,function(a){b.appendChild(a)}):b.appendChild(d)};dojox.xml.parser.removeChildren=function(b){for(var c=b.childNodes.length;b.hasChildNodes();)b.removeChild(b.firstChild);return c};
dojox.xml.parser.innerXML=function(b){return b.innerXML?b.innerXML:b.xml?b.xml:"undefined"!=typeof XMLSerializer?(new XMLSerializer).serializeToString(b):null};return dojox.xml.parser});
//# sourceMappingURL=parser.js.map