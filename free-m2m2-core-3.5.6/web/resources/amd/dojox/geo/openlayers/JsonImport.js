//>>built
define("dojo/_base/declare dojo/_base/xhr dojo/_base/lang dojo/_base/array ./LineString ./Collection ./GeometryFeature".split(" "),function(t,u,c,v,w,x,r){return t("dojox.geo.openlayers.JsonImport",null,{constructor:function(b){this._params=b},loadData:function(){u.get({url:this._params.url,handleAs:"json",sync:!0,load:c.hitch(this,this._gotData),error:c.hitch(this,this._loadError)})},_gotData:function(b){var d=this._params.nextFeature;if(c.isFunction(d)){var a=b.layerExtent,n=a[0],e=a[1],f=n+a[2],
g=e+a[3],a=b.layerExtentLL,h=a[0],k=a[1],s=k+a[3],l=h+a[2];b=b.features;for(var m in b){var a=b[m].shape,p=null;if(c.isArray(a[0])){var q=[];v.forEach(a,function(a){a=this._makeGeometry(a,n,e,f,g,h,s,l,k);q.push(a)},this);a=new x(q);p=new r(a)}else p=this._makeFeature(a,n,e,f,g,h,s,l,k);d.call(this,p)}d=this._params.complete;c.isFunction(d)&&d.call(this,d)}},_makeGeometry:function(b,d,a,n,e,f,g,h,k){for(var c=[],l=0,m=0;m<b.length-1;m+=2){var p=b[m+1],l=(b[m]-d)/(n-d),q=l*(h-f)+f,l=(p-a)/(e-a);c.push({x:q,
y:l*(k-g)+g})}return new w(c)},_makeFeature:function(b,d,a,c,e,f,g,h,k){b=this._makeGeometry(b,d,a,c,e,f,g,h,k);return new r(b)},_loadError:function(){var b=this._params.error;c.isFunction(b)&&b.apply(this,parameters)}})});
//# sourceMappingURL=JsonImport.js.map