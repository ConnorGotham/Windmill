//>>built
define(["dojo/_base/lang","../util/oo","../manager/_registry","../stencil/Ellipse"],function(g,f,h,k){f=f.declare(k,function(){},{draws:!0,onDrag:function(a){var b=a.start,d=b.x<a.x?b.x:a.x,e=b.y<a.y?b.y:a.y,c=b.x<a.x?a.x-b.x:b.x-a.x;a=b.y<a.y?a.y-b.y:b.y-a.y;this.keys.shift&&(c=a=Math.max(c,a));this.keys.alt?(0>e-a&&(a=e),0>d-c&&(c=d)):(d+=c/2,e+=a/2,c/=2,a/=2);this.points=[{x:d-c,y:e-a},{x:d+c,y:e-a},{x:d+c,y:e+a},{x:d-c,y:e+a}];this.render()},onUp:function(a){if(!this.created&&this._downOnCanvas){this._downOnCanvas=
!1;if(this.shape){if(a=this.pointsToData(),2*a.rx<this.minimumSize&&2*a.ry<this.minimumSize){this.remove(this.shape,this.hit);return}}else{a=a.start;var b=2*this.minimumSize;this.data={cx:a.x+b,cy:a.y+b,rx:b,ry:b};this.dataToPoints();this.render()}this.onRender(this)}}});g.setObject("dojox.drawing.tools.Ellipse",f);f.setup={name:"dojox.drawing.tools.Ellipse",tooltip:"Ellipse Tool",iconClass:"iconEllipse"};h.register(f.setup,"tool");return f});
//# sourceMappingURL=Ellipse.js.map