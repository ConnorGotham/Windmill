//>>built
define("dojo/_base/lang ./_base ./matrix dojo/_base/Color dojo/_base/array dojo/_base/fx dojo/_base/connect dojo/sniff".split(" "),function(z,p,g,q,r,m,f,A){function s(b,a){this.start=b;this.end=a}function u(b,a,c){this.start=b;this.end=a;this.units=c}function v(b,a){this.start=b;this.end=a;this.temp=new q}function k(b){this.values=b;this.length=b.length}function t(b,a){this.values=b;this.def=a?a:{}}function w(b,a){this.stack=b;this.original=a}function x(b,a,c,e){if(b.values)return new k(b.values);
var d,l;l=b.start?p.normalizeColor(b.start):d=a?c?a[c]:a:e;b.end?b=p.normalizeColor(b.end):(d||(d=a?c?a[c]:a:e),b=d);return new v(l,b)}var n=p.fx={};s.prototype.getValue=function(b){return(this.end-this.start)*b+this.start};u.prototype.getValue=function(b){return(this.end-this.start)*b+this.start+this.units};v.prototype.getValue=function(b){return q.blendColors(this.start,this.end,b,this.temp)};k.prototype.getValue=function(b){return this.values[Math.min(Math.floor(b*this.length),this.length-1)]};
t.prototype.getValue=function(b){var a=z.clone(this.def),c;for(c in this.values)a[c]=this.values[c].getValue(b);return a};w.prototype.getValue=function(b){var a=[];r.forEach(this.stack,function(c){if(c instanceof g.Matrix2D)a.push(c);else if("original"==c.name&&this.original)a.push(this.original);else if("matrix"==c.name){if(c.start instanceof g.Matrix2D&&c.end instanceof g.Matrix2D){var e=new g.Matrix2D,d;for(d in c.start)e[d]=(c.end[d]-c.start[d])*b+c.start[d];a.push(e)}}else c.name in g&&(e=g[c.name],
"function"!=typeof e?a.push(e):(d=r.map(c.start,function(d,a){return(c.end[a]-d)*b+d}),e=e.apply(g,d),e instanceof g.Matrix2D&&a.push(e)))},this);return a};var y=new q(0,0,0,0);n.animateStroke=function(b){b.easing||(b.easing=m._defaultEasing);var a=new m.Animation(b),c=b.shape,e;f.connect(a,"beforeBegin",a,function(){e=c.getStroke();var d=b.color,a={},h;d&&(a.color=x(d,e,"color",y));if((d=b.style)&&d.values)a.style=new k(d.values);if(d=b.width){var f=d;f.values?h=new k(f.values):(d=f.start?f.start:
h=e?e.width:1,f.end?h=f.end:"number"!=typeof h&&(h=e?e.width:1),h=new s(d,h));a.width=h}if((d=b.cap)&&d.values)a.cap=new k(d.values);if(d=b.join)d.values?a.join=new k(d.values):(h=d.start?d.start:e&&e.join||0,d=d.end?d.end:e&&e.join||0,"number"==typeof h&&"number"==typeof d&&(a.join=new s(h,d)));this.curve=new t(a,e)});f.connect(a,"onAnimate",c,"setStroke");return a};n.animateFill=function(b){b.easing||(b.easing=m._defaultEasing);var a=new m.Animation(b),c=b.shape,e;f.connect(a,"beforeBegin",a,function(){e=
c.getFill();var a=b.color;a&&(this.curve=x(a,e,"",y))});f.connect(a,"onAnimate",c,"setFill");return a};n.animateFont=function(b){b.easing||(b.easing=m._defaultEasing);var a=new m.Animation(b),c=b.shape,e;f.connect(a,"beforeBegin",a,function(){e=c.getFont();var a=b.style,l={},f,g;a&&a.values&&(l.style=new k(a.values));if((a=b.variant)&&a.values)l.variant=new k(a.values);if((a=b.weight)&&a.values)l.weight=new k(a.values);if((a=b.family)&&a.values)l.family=new k(a.values);if((a=b.size)&&a.units)f=parseFloat(a.start?
a.start:c.font&&c.font.size||"0"),g=parseFloat(a.end?a.end:c.font&&c.font.size||"0"),l.size=new u(f,g,a.units);this.curve=new t(l,e)});f.connect(a,"onAnimate",c,"setFont");return a};n.animateTransform=function(b){b.easing||(b.easing=m._defaultEasing);var a=new m.Animation(b),c=b.shape,e;f.connect(a,"beforeBegin",a,function(){e=c.getTransform();this.curve=new w(b.transform,e)});f.connect(a,"onAnimate",c,"setTransform");if("svg"===p.renderer&&10<=A("ie"))var d=[f.connect(a,"onBegin",a,function(){for(var a=
c.getParent();a&&a.getParent;)a=a.getParent();a&&(c.__svgContainer=a.rawNode.parentNode)}),f.connect(a,"onAnimate",a,function(){try{if(c.__svgContainer){var a=c.__svgContainer.style.visibility;c.__svgContainer.style.visibility="visible";c.__svgContainer.style.visibility=a}}catch(b){}}),f.connect(a,"onEnd",a,function(){r.forEach(d,f.disconnect);if(c.__svgContainer){var a=c.__svgContainer.style.visibility,b=c.__svgContainer;c.__svgContainer.style.visibility="visible";setTimeout(function(){try{b.style.visibility=
a,b=null}catch(c){}},100)}delete c.__svgContainer})];return a};return n});
//# sourceMappingURL=fx.js.map