//>>built
define(["dojo/_base/lang","dojox/date/php","../_base"],function(b,g,h){var c=b.getObject("utils.date",!0,h);c.DateFormat=g.DateFormat;b.extend(c.DateFormat,g.DateFormat.prototype,{f:function(){return!this.date.getMinutes()?this.g():this.g()+":"+this.i()},N:function(){return c._months_ap[this.date.getMonth()]},P:function(){return!this.date.getMinutes()&&!this.date.getHours()?"midnight":!this.date.getMinutes()&&12==this.date.getHours()?"noon":this.f()+" "+this.a()}});b.mixin(dojox.dtl.utils.date,{format:function(a,
d){return(new dojox.dtl.utils.date.DateFormat(d)).format(a)},timesince:function(a,d){a instanceof Date||(a=new Date(a.year,a.month,a.day));d||(d=new Date);for(var c=Math.abs(d.getTime()-a.getTime()),b=0,e;e=dojox.dtl.utils.date._chunks[b];b++){var f=Math.floor(c/e[0]);if(f)break}return f+" "+e[1](f)},_chunks:[[31536E6,function(a){return 1==a?"year":"years"}],[2592E6,function(a){return 1==a?"month":"months"}],[6048E5,function(a){return 1==a?"week":"weeks"}],[864E5,function(a){return 1==a?"day":"days"}],
[36E5,function(a){return 1==a?"hour":"hours"}],[6E4,function(a){return 1==a?"minute":"minutes"}]],_months_ap:"Jan. Feb. March April May June July Aug. Sept. Oct. Nov. Dec.".split(" ")});return c});
//# sourceMappingURL=date.js.map