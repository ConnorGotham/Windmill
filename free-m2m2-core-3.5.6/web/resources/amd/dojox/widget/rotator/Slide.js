//>>built
define(["dojo/_base/lang","dojo/_base/fx","dojo/dom-style"],function(d,h,f){function c(a,b){var c=b.node=b.next.node,e=b.rotatorBox,d=a%2,e=(d?e.w:e.h)*(2>a?-1:1);f.set(c,{display:"",zIndex:(f.get(b.current.node,"zIndex")||1)+1});b.properties||(b.properties={});b.properties[d?"left":"top"]={start:e,end:0};return h.animateProperty(b)}var g={slideDown:function(a){return c(0,a)},slideRight:function(a){return c(1,a)},slideUp:function(a){return c(2,a)},slideLeft:function(a){return c(3,a)}};d.mixin(d.getObject("dojox.widget.rotator"),
g);return g});
//# sourceMappingURL=Slide.js.map