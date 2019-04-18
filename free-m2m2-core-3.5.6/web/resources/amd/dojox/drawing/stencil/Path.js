//>>built
define(["dojo","dojo/_base/array","../util/oo","./_Base","../manager/_registry"],function(g,f,e,h,k){e=e.declare(h,function(b){},{type:"dojox.drawing.stencil.Path",closePath:!0,baseRender:!0,closeRadius:10,closeColor:{r:255,g:255,b:0,a:0.5},_create:function(b,a){this.remove(this[b]);if(this.points.length){if("svg"==dojox.gfx.renderer){var c=[];f.forEach(this.points,function(d,b){if(!d.skip)if(0==b)c.push("M "+d.x+" "+d.y);else{var a=(d.t||"")+" ";void 0===d.x?c.push(a):c.push(a+d.x+" "+d.y)}},this);
this.closePath&&c.push("Z");this.stringPath=c.join(" ");this[b]=this.container.createPath(c.join(" ")).setStroke(a);this.closePath&&this[b].setFill(a.fill)}else this[b]=this.container.createPath({}).setStroke(a),this.closePath&&this[b].setFill(a.fill),f.forEach(this.points,function(a,c){a.skip||(0==c||"M"==a.t?this[b].moveTo(a.x,a.y):"Z"==a.t?this.closePath&&this[b].closePath():this[b].lineTo(a.x,a.y))},this),this.closePath&&this[b].closePath();this._setNodeAtts(this[b])}},render:function(){this.onBeforeRender(this);
this.renderHit&&this._create("hit",this.style.currentHit);this._create("shape",this.style.current)},getBounds:function(b){var a=1E4,c=1E4,d=0,e=0;f.forEach(this.points,function(b){void 0!==b.x&&!isNaN(b.x)&&(a=Math.min(a,b.x),c=Math.min(c,b.y),d=Math.max(d,b.x),e=Math.max(e,b.y))});return{x1:a,y1:c,x2:d,y2:e,x:a,y:c,w:d-a,h:e-c}},checkClosePoint:function(b,a,c){a=this.util.distance(b.x,b.y,a.x,a.y);if(1<this.points.length)if(a<this.closeRadius&&!this.closeGuide&&!c)this.closeGuide=this.container.createEllipse({cx:b.x,
cy:b.y,rx:this.closeRadius,ry:this.closeRadius}).setFill(this.closeColor);else if(c||a>this.closeRadius&&this.closeGuide)this.remove(this.closeGuide),this.closeGuide=null;return a<this.closeRadius}});g.setObject("dojox.drawing.stencil.Path",e);k.register({name:"dojox.drawing.stencil.Path"},"stencil");return e});
//# sourceMappingURL=Path.js.map