//>>built
define("dojo/_base/lang dojo/_base/declare dojo/_base/Color ../../RectangularGauge ../../LinearScaler ../../RectangularScale ../../RectangularValueIndicator ../DefaultPropertiesMixin".split(" "),function(e,f,d,g,h,k,l,m){return f("dojox.dgauges.components.grey.HorizontalLinearGauge",[g,m],{borderColor:[148,152,161],fillColor:[148,152,161],indicatorColor:[63,63,63],constructor:function(){this.borderColor=new d(this.borderColor);this.fillColor=new d(this.fillColor);this.indicatorColor=new d(this.indicatorColor);
this.addElement("background",e.hitch(this,this.drawBackground));var b=new h,a=new k;a.set("scaler",b);a.set("labelPosition","leading");a.set("paddingLeft",30);a.set("paddingRight",30);a.set("paddingTop",28);a.set("labelGap",8);a.set("font",{family:"Helvetica",weight:"bold",size:"7pt"});this.addElement("scale",a);var c=new l;c.set("interactionArea","gauge");c.set("value",b.minimum);c.set("paddingTop",32);c.set("indicatorShapeFunc",e.hitch(this,function(a,b){return a.createPolyline([0,0,-10,-20,10,
-20,0,0]).setFill(this.indicatorColor).setStroke({color:[70,70,70],width:1,style:"Solid",cap:"butt",join:20})}));a.addIndicator("indicator",c)},drawBackground:function(b,a,c){b.createRect({x:0,y:0,width:a,height:50,r:13.5}).setFill(this.borderColor);b.createRect({x:2,y:2,width:a-4,height:46,r:11.5}).setFill({type:"linear",x1:0,y1:-2,x2:0,y2:60,colors:[{offset:0,color:this.fillColor},{offset:1,color:"white"}]});b.createPath().moveTo(2,25).vLineTo(12).smoothCurveTo(2,2,16,2).hLineTo(a-12).smoothCurveTo(a-
2,2,a-2,16).closePath().setFill({type:"linear",x1:0,y1:-5,x2:0,y2:40,colors:[{offset:0,color:"white"},{offset:1,color:this.fillColor}]})}})});
//# sourceMappingURL=HorizontalLinearGauge.js.map