//>>built
define(["dojo/_base/lang","dojo/_base/array","./_base"],function(h,a,k){var l=function(b,f){this.start=b;this.end=f;var g=h.isArray(b),d=g?[]:f-b;g?(a.forEach(this.start,function(e,c){d[c]=this.end[c]-e},this),this.getValue=function(e){var c=[];a.forEach(this.start,function(b,a){c[a]=d[a]*e+b},this);return c}):this.getValue=function(a){return d*a+this.start}};return k._Line=l});
//# sourceMappingURL=_core.js.map