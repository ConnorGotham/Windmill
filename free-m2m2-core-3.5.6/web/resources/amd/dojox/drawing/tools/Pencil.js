//>>built
define(["dojo/_base/lang","../util/oo","../manager/_registry","../stencil/Path"],function(c,b,d,e){b=b.declare(e,function(){this._started=!1},{draws:!0,minDist:15,onDown:function(a){this._started=!0;a={x:a.x,y:a.y};this.points=[a];this.lastPoint=a;this.revertRenderHit=this.renderHit;this.closePath=this.renderHit=!1},onDrag:function(a){if(this._started&&!(this.minDist>this.util.distance(a.x,a.y,this.lastPoint.x,this.lastPoint.y))){var b={x:a.x,y:a.y};this.points.push(b);this.render();this.checkClosePoint(this.points[0],
a);this.lastPoint=b}},onUp:function(a){if(this._started)if(!this.points||2>this.points.length)this._started=!1,this.points=[];else{var b=this.getBounds();b.w<this.minimumSize&&b.h<this.minimumSize?(this.remove(this.hit,this.shape,this.closeGuide),this._started=!1,this.setPoints([])):(this.checkClosePoint(this.points[0],a,!0)&&(this.closePath=!0),this.renderHit=this.revertRenderHit,this.renderedOnce=!0,this.render(),this.onRender(this))}}});c.setObject("dojox.drawing.tools.Pencil",b);b.setup={name:"dojox.drawing.tools.Pencil",
tooltip:"Pencil Tool",iconClass:"iconLine"};d.register(b.setup,"tool");return b});
//# sourceMappingURL=Pencil.js.map