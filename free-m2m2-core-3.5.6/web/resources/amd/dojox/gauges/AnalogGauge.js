//>>built
define("dojo/_base/kernel dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/_base/event dojox/gfx ./_Gauge ./AnalogLineIndicator dojo/dom-geometry".split(" "),function(r,h,k,f,s,l,n,p,q,g){return h("dojox.gauges.AnalogGauge",p,{startAngle:-90,endAngle:90,cx:0,cy:0,radius:0,orientation:"clockwise",_defaultIndicator:q,startup:function(){this.getChildren&&k.forEach(this.getChildren(),function(b){b.startup()});this.startAngle=Number(this.startAngle);this.endAngle=Number(this.endAngle);
this.cx=Number(this.cx);this.cx||(this.cx=this.width/2);this.cy=Number(this.cy);this.cy||(this.cy=this.height/2);this.radius=Number(this.radius);this.radius||(this.radius=Math.min(this.cx,this.cy)-25);this.inherited(arguments)},_getAngle:function(b){var a=Number(b);null==b||isNaN(a)||a<=this.min?a=this._mod360(this.startAngle):a>=this.max?a=this._mod360(this.endAngle):(b=this._mod360(this.startAngle),a-=this.min,"clockwise"!=this.orientation&&(a=-a),a=this._mod360(b+this._getAngleRange()*a/Math.abs(this.min-
this.max)));return a},_getValueForAngle:function(b){var a=this._mod360(this.startAngle),c=this._mod360(this.endAngle);if(this._angleInRange(b)){var d=Math.abs(this.max-this.min);b=this._mod360("clockwise"==this.orientation?b-a:-b+a);return this.min+d*b/this._getAngleRange()}a=this._mod360(a-b);d=360-a;b=this._mod360(c-b);c=360-b;return Math.min(a,d)<Math.min(b,c)?this.min:this.max},_getAngleRange:function(){var b=this._mod360(this.startAngle),a=this._mod360(this.endAngle);return b==a?360:"clockwise"==
this.orientation?a<b?360-(b-a):a-b:a<b?b-a:360-(a-b)},_angleInRange:function(b){var a=this._mod360(this.startAngle),c=this._mod360(this.endAngle);if(a==c)return!0;b=this._mod360(b);return"clockwise"==this.orientation?a<c?b>=a&&b<=c:!(b>c&&b<a):a<c?!(b>a&&b<c):b>=c&&b<=a},_isScaleCircular:function(){return this._mod360(this.startAngle)==this._mod360(this.endAngle)},_mod360:function(b){for(;360<b;)b-=360;for(;0>b;)b+=360;return b},_getRadians:function(b){return b*Math.PI/180},_getDegrees:function(b){return 180*
b/Math.PI},drawRange:function(b,a){var c;a.shape&&(a.shape.parent.remove(a.shape),a.shape=null);var d,e;if(a.low==this.min&&a.high==this.max&&this._mod360(this.endAngle)==this._mod360(this.startAngle))c=b.createCircle({cx:this.cx,cy:this.cy,r:this.radius});else{d=this._getRadians(this._getAngle(a.low));e=this._getRadians(this._getAngle(a.high));"cclockwise"==this.orientation&&(c=e,e=d,d=c);var g=this.cx+this.radius*Math.sin(d),h=this.cy-this.radius*Math.cos(d),k=this.cx+this.radius*Math.sin(e),l=
this.cy-this.radius*Math.cos(e),m=0;(d<=e?e-d:2*Math.PI-d+e)>Math.PI&&(m=1);c=b.createPath();a.size?c.moveTo(this.cx+(this.radius-a.size)*Math.sin(d),this.cy-(this.radius-a.size)*Math.cos(d)):c.moveTo(this.cx,this.cy);c.lineTo(g,h);c.arcTo(this.radius,this.radius,0,m,1,k,l);a.size&&(c.lineTo(this.cx+(this.radius-a.size)*Math.sin(e),this.cy-(this.radius-a.size)*Math.cos(e)),c.arcTo(this.radius-a.size,this.radius-a.size,0,m,0,this.cx+(this.radius-a.size)*Math.sin(d),this.cy-(this.radius-a.size)*Math.cos(d)));
c.closePath()}f.isArray(a.color)||f.isString(a.color)?(c.setStroke({color:a.color}),c.setFill(a.color)):a.color.type?(d=this._getRadians(this._getAngle(a.low)),e=this._getRadians(this._getAngle(a.high)),a.color.x1=this.cx+this.radius*Math.sin(d)/2,a.color.x2=this.cx+this.radius*Math.sin(e)/2,a.color.y1=this.cy-this.radius*Math.cos(d)/2,a.color.y2=this.cy-this.radius*Math.cos(e)/2,c.setFill(a.color),c.setStroke({color:a.color.colors[0].color})):n.svg&&(c.setStroke({color:"green"}),c.setFill("green"),
c.getEventSource().setAttribute("class",a.color.style));c.connect("onmouseover",f.hitch(this,this._handleMouseOverRange,a));c.connect("onmouseout",f.hitch(this,this._handleMouseOutRange,a));a.shape=c},getRangeUnderMouse:function(b){var a=null,c=g.getContentBox(this.gaugeContent),d=b.clientX-c.x;b=b.clientY-c.y;if(Math.sqrt((b-this.cy)*(b-this.cy)+(d-this.cx)*(d-this.cx))<this.radius&&(d=this._getDegrees(Math.atan2(b-this.cy,d-this.cx)+Math.PI/2),d=this._getValueForAngle(d),this._rangeData))for(b=
0;b<this._rangeData.length&&!a;b++)Number(this._rangeData[b].low)<=d&&Number(this._rangeData[b].high)>=d&&(a=this._rangeData[b]);return a},_dragIndicator:function(b,a){this._dragIndicatorAt(b,a.pageX,a.pageY);l.stop(a)},_dragIndicatorAt:function(b,a,c){var d=g.position(b.gaugeContent,!0);a=b._getDegrees(Math.atan2(c-d.y-b.cy,a-d.x-b.cx)+Math.PI/2);a=b._getValueForAngle(a);a=Math.min(Math.max(a,b.min),b.max);b._drag.value=b._drag.currentValue=a;b._drag.onDragMove(b._drag);b._drag.draw(this._indicatorsGroup,
!0);b._drag.valueChanged()}})});
//# sourceMappingURL=AnalogGauge.js.map