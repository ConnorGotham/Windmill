//>>built
define(["dijit","dojo","dojox"],function(g,b,d){b.provide("dojox.lang.aspect.timer");(function(){var e=d.lang.aspect,f=0,c=function(a){this.name=a||"DojoAopTimer #"+ ++f;this.inCall=0};b.extend(c,{before:function(){this.inCall++},after:function(){--this.inCall}});e.timer=function(a){return new c(a)}})()});
//# sourceMappingURL=timer.js.map