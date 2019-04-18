//>>built
define(["dojo"],function(a){a.declare("dojox.math.random.Secure",null,{constructor:function(e,c){this.prng=e;for(var b=this.pool=Array(e.size),d=this.pptr=0,g=e.size;d<g;){var f=Math.floor(65536*Math.random());b[d++]=f>>>8;b[d++]=f&255}this.seedTime();c||(this.h=[a.connect(a.body(),"onclick",this,"seedTime"),a.connect(a.body(),"onkeypress",this,"seedTime")])},destroy:function(){this.h&&a.forEach(this.h,a.disconnect)},nextBytes:function(e){var c=this.state;if(!c){this.seedTime();c=this.state=this.prng();
c.init(this.pool);for(var b=this.pool,d=0,a=b.length;d<a;b[d++]=0);this.pptr=0}d=0;for(a=e.length;d<a;++d)e[d]=c.next()},seedTime:function(){this._seed_int((new Date).getTime())},_seed_int:function(a){var c=this.pool,b=this.pptr;c[b++]^=a&255;c[b++]^=a>>8&255;c[b++]^=a>>16&255;c[b++]^=a>>24&255;b>=this.prng.size&&(b-=this.prng.size);this.pptr=b}});return dojox.math.random.Secure});
//# sourceMappingURL=Secure.js.map