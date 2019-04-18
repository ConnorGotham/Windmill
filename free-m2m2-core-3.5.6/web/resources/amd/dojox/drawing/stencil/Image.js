//>>built
define(["dojo","../util/oo","./_Base","../manager/_registry"],function(b,d,f,g){d=d.declare(f,function(a){},{type:"dojox.drawing.stencil.Image",anchorType:"group",baseRender:!0,dataToPoints:function(a){a=a||this.data;return this.points=[{x:a.x,y:a.y},{x:a.x+a.width,y:a.y},{x:a.x+a.width,y:a.y+a.height},{x:a.x,y:a.y+a.height}]},pointsToData:function(a){a=a||this.points;var c=a[0];a=a[2];return this.data={x:c.x,y:c.y,width:a.x-c.x,height:a.y-c.y,src:this.src||this.data.src}},_createHilite:function(){this.remove(this.hit);
this.hit=this.container.createRect(this.data).setStroke(this.style.current).setFill(this.style.current.fill);this._setNodeAtts(this.hit)},_create:function(a,c,b){this.remove(this[a]);b=this.container.getParent();this[a]=b.createImage(c);this.container.add(this[a]);this._setNodeAtts(this[a])},render:function(a){"auto"==this.data.width||isNaN(this.data.width)?this.getImageSize(!0):(this.onBeforeRender(this),this.renderHit&&this._createHilite(),this._create("shape",this.data,this.style.current))},getImageSize:function(a){if(!this._gettingSize){this._gettingSize=
!0;var c=b.create("img",{src:this.data.src},b.body()),d=b.connect(c,"error",this,function(){b.disconnect(e);b.disconnect(d)}),e=b.connect(c,"load",this,function(){var d=b.marginBox(c);this.setData({x:this.data.x,y:this.data.y,src:this.data.src,width:d.w,height:d.h});b.disconnect(e);b.destroy(c);a&&this.render(!0)})}}});b.setObject("dojox.drawing.stencil.Image",d);g.register({name:"dojox.drawing.stencil.Image"},"stencil");return d});
//# sourceMappingURL=Image.js.map