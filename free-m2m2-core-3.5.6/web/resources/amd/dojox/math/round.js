//>>built
define(["dojo","dojox"],function(f,b){f.getObject("math.round",!0,b);f.experimental("dojox.math.round");b.math.round=function(c,b,d){var a=Math.log(Math.abs(c))/Math.log(10);d=10/(d||10);a=Math.pow(10,-15+a);return(d*(+c+(0<c?a:-a))).toFixed(b)/d};if(0==(0.9).toFixed()){var g=b.math.round;b.math.round=function(c,b,d){var a=Math.pow(10,-b||0),e=Math.abs(c);if(!c||e>=a)a=0;else if(e/=a,0.5>e||0.95<=e)a=0;return g(c,b,d)+(0<c?a:-a)}}return b.math.round});
//# sourceMappingURL=round.js.map