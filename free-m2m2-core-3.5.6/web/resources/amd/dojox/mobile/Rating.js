//>>built
define("dojo/_base/declare dojo/_base/lang dojo/dom-construct dijit/_WidgetBase ./iconUtils dojo/has dojo/has!dojo-bidi?dojox/mobile/bidi/Rating".split(" "),function(c,l,e,b,h,k,m){b=c(k("dojo-bidi")?"dojox.mobile.NonBidiRating":"dojox.mobile.Rating",[b],{image:"",numStars:5,value:0,alt:"",baseClass:"mblRating",buildRendering:function(){this.inherited(arguments);this.domNode.style.display="inline-block";var a=this.imgNode=e.create("img");this.connect(a,"onload",l.hitch(this,function(){this.set("value",
this.value)}));h.createIcon(this.image,null,a)},_setValueAttr:function(a){this._set("value",a);var b=this.imgNode.height;if(0!=b){e.empty(this.domNode);var d,c,f=this.imgNode.width/3;for(d=0;d<this.numStars;d++){c=d<=a-1?0:d>=a?f:2*f;var g=e.create("div",{style:{"float":"left"}},this.domNode);this.isLeftToRight()||(g=this._setCustomTransform(g));h.createIcon(this.image,"0,"+c+","+f+","+b,null,this.alt,g)}}},_setCustomTransform:function(a){return a}});return k("dojo-bidi")?c("dojox.mobile.Rating",
[b,m]):b});
//# sourceMappingURL=Rating.js.map