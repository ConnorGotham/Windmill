//>>built
define(["dojo/_base/kernel","dojo/_base/declare","../../math/BigInteger","../../math/random/Simple"],function(g,h,e,k){g.experimental("dojox.encoding.crypto.RSAKey");var l=function(){return new k};return h("dojox.encoding.crypto.RSAKey",null,{constructor:function(b){this.rngf=b||l;this.e=0;this.n=this.d=this.p=this.q=this.dmp1=this.dmq1=this.coeff=null},setPublic:function(b,a){if(b&&a&&b.length&&a.length)this.n=new e(b,16),this.e=parseInt(a,16);else throw Error("Invalid RSA public key");},encrypt:function(b){var a;
a=this.n.bitLength()+7>>3;var c=this.rngf;if(a<b.length+11)throw Error("Message too long for RSA");for(var d=Array(a),f=b.length;f&&a;)d[--a]=b.charCodeAt(--f);d[--a]=0;b=c();for(c=[0];2<a;){for(c[0]=0;0==c[0];)b.nextBytes(c);d[--a]=c[0]}d[--a]=2;d[--a]=0;b.destroy();a=new e(d);if(!a)return null;a=a.modPowInt(this.e,this.n);if(!a)return null;a=a.toString(16);return a.length%2?"0"+a:a}})});
//# sourceMappingURL=RSAKey.js.map