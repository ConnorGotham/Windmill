//>>built
define(["dojo/_base/declare"],function(b){return b(null,{postMixInProperties:function(){this.textDir=this.params.textDir?this.params.textDir:this.params.dir},_setTextDirAttr:function(a){if(null!=(/^(ltr|rtl|auto)$/.test(a)?a:null))this._set("textDir",a),this.chart.setTextDir(a)},_setDirAttr:function(a){this._set("dir",a);this.chart.setDir(a)}})});
//# sourceMappingURL=Chart.js.map