//>>built
define(["dojo/_base/lang"],function(f){f=f.getObject("dojox.encoding.easy64",!0);var h=function(a,d,e){for(var b=0;b<d;b+=3)e.push(String.fromCharCode((a[b]>>>2)+33),String.fromCharCode(((a[b]&3)<<4)+(a[b+1]>>>4)+33),String.fromCharCode(((a[b+1]&15)<<2)+(a[b+2]>>>6)+33),String.fromCharCode((a[b+2]&63)+33))};f.encode=function(a){var d=[],e=a.length%3,b=a.length-e;h(a,b,d);if(e){for(a=a.slice(b);3>a.length;)a.push(0);h(a,3,d);for(a=3;a>e;d.pop(),--a);}return d.join("")};f.decode=function(a){var d=a.length,
e=[],b=[0,0,0,0],g,c,f;for(g=0;g<d;g+=4){for(c=0;4>c;++c)b[c]=a.charCodeAt(g+c)-33;for(c=f=d-g;4>c;b[++c]=0);e.push((b[0]<<2)+(b[1]>>>4),((b[1]&15)<<4)+(b[2]>>>2),((b[2]&3)<<6)+b[3]);for(c=f;4>c;++c,e.pop());}return e};return f});
//# sourceMappingURL=easy64.js.map