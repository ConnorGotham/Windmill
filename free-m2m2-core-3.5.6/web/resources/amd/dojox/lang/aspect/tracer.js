//>>built
define(["dijit","dojo","dojox"],function(f,b,e){b.provide("dojox.lang.aspect.tracer");(function(){var d=e.lang.aspect,c=function(a){this.method=a?"group":"log";a&&(this.after=this._after)};b.extend(c,{before:function(){var a=d.getContext(),b=a.joinPoint,c=Array.prototype.join.call(arguments,", ");console[this.method](a.instance,"\x3d\x3e",b.targetName+"("+c+")")},afterReturning:function(a){d.getContext()},afterThrowing:function(a){},_after:function(a){}});d.tracer=function(a){return new c(a)}})()});
//# sourceMappingURL=tracer.js.map