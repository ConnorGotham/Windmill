//>>built
define("dojo/_base/kernel dojo/_base/array dojo/_base/connect dojo/_base/event dojo/dom-class dojo/dom-construct dojo/dom-style ./_css3".split(" "),function(v,s,u,w,h,x,f,d){v.experimental("dojox.mobile.pageTurningUtils");return function(){this.h=this.w=0;this.turnfrom="top";this.dogear=this.page=1;this.duration=2;this.alwaysDogeared=!1;this._styleParams={};this._transitionEndHandle=this._currentPageNode=this._catalogNode=null;this.init=function(a,b,e,d,c,g,f){this.w=a;this.h=b;this.turnfrom=e?e:
this.turnfrom;this.page=d?d:this.page;this.dogear="undefined"!==typeof c?c:this.dogear;this.duration="undefined"!==typeof g?g:this.duration;this.alwaysDogeared="undefined"!==typeof f?f:this.alwaysDogeared;"bottom"===this.turnfrom&&(this.alwaysDogeared=!0);this._calcStyleParams()};this._calcStyleParams=function(){var a=Math.tan(58*Math.PI/180),b=Math.cos(32*Math.PI/180),e=Math.sin(32*Math.PI/180),f=Math.tan(32*Math.PI/180),c=this.w,g=this.h,h=this.page,s=this.turnfrom,m=this._styleParams,n=c*a,k=n*
e+n*b*a,n=n+c+c/a,t=0.11*c*this.dogear,r=c-t,l=r*b,p,q;switch(this.turnfrom){case "top":p=k-l;l*=a;q=k-t;a=l+r/a-7;b=l/b;m.init={page:d.add({top:-b+"px",left:-k+(2===h?c:0)+"px",width:k+"px",height:n+"px"},{transformOrigin:"100% 0%"}),front:d.add({width:c+"px",height:g+"px"},{boxShadow:"0 0"}),back:d.add({width:c+"px",height:g+"px"},{boxShadow:"0 0"}),shadow:{display:"",left:k+"px",height:1.5*g+"px"}};m.turnForward={page:d.add({},{transform:"rotate(0deg)"}),front:d.add({},{transform:"translate("+
k+"px,"+b+"px) rotate(0deg)",transformOrigin:"-110px -18px"}),back:d.add({},{transform:"translate("+(k-c)+"px,"+b+"px) rotate(0deg)",transformOrigin:"0px 0px"})};m.turnBackward={page:d.add({},{transform:"rotate(-32deg)"}),front:d.add({},{transform:"translate("+p+"px,"+l+"px) rotate(32deg)",transformOrigin:"0px 0px"}),back:d.add({},{transform:"translate("+q+"px,"+a+"px) rotate(-32deg)",transformOrigin:"0px 0px"})};break;case "bottom":p=k-(g*e+c*b)-2;l=n-(g+c/f)*b;q=k;a=n-c/e-g;b=n-c/f-g;m.init={page:d.add({top:-b+
50+"px",left:-k+(2===h?c:0)+"px",width:k+"px",height:n+"px"},{transformOrigin:"100% 100%"}),front:d.add({width:c+"px",height:g+"px"},{boxShadow:"0 0"}),back:d.add({width:c+"px",height:g+"px"},{boxShadow:"0 0"}),shadow:{display:"none"}};m.turnForward={page:d.add({},{transform:"rotate(0deg)"}),front:d.add({},{transform:"translate("+k+"px,"+b+"px) rotate(0deg)",transformOrigin:"-220px 35px"}),back:d.add({},{transform:"translate("+2*c+"px,"+b+"px) rotate(0deg)",transformOrigin:"0px 0px"})};m.turnBackward=
{page:d.add({},{transform:"rotate(32deg)"}),front:d.add({},{transform:"translate("+p+"px,"+l+"px) rotate(-32deg)",transformOrigin:"0px 0px"}),back:d.add({},{transform:"translate("+q+"px,"+a+"px) rotate(0deg)",transformOrigin:"0px 0px"})};break;case "left":p=-c,l=r/f-2,q=-r,a=r/e+t*e,m.init={page:d.add({top:-l+"px",left:c+"px",width:k+"px",height:n+"px"},{transformOrigin:"0% 0%"}),front:d.add({width:c+"px",height:g+"px"},{boxShadow:"0 0"}),back:d.add({width:c+"px",height:g+"px"},{boxShadow:"0 0"}),
shadow:{display:"",left:"-4px",height:(2===h?1.5*g:g)+50+"px"}},m.turnForward={page:d.add({},{transform:"rotate(0deg)"}),front:d.add({},{transform:"translate("+p+"px,"+l+"px) rotate(0deg)",transformOrigin:"160px 68px"}),back:d.add({},{transform:"translate(0px,"+l+"px) rotate(0deg)",transformOrigin:"0px 0px"})},m.turnBackward={page:d.add({},{transform:"rotate(32deg)"}),front:d.add({},{transform:"translate("+-t+"px,"+a+"px) rotate(-32deg)",transformOrigin:"0px 0px"}),back:d.add({},{transform:"translate("+
q+"px,"+a+"px) rotate(32deg)",transformOrigin:"top right"})}}m.init.catalog={width:(2===h?2*c:c)+"px",height:(2===h?1.5*g:g)+("top"==s?0:50)+"px"}};this.getChildren=function(a){return s.filter(a.childNodes,function(a){return 1===a.nodeType})};this.getPages=function(){return this._catalogNode?this.getChildren(this._catalogNode):null};this.getCurrentPage=function(){return this._currentPageNode};this.getIndexOfPage=function(a,b){b||(b=this.getPages());for(var e=0;e<b.length;e++)if(a===b[e])return e;
return-1};this.getNextPage=function(a){for(a=a.nextSibling;a;a=a.nextSibling)if(1===a.nodeType)return a;return null};this.getPreviousPage=function(a){for(a=a.previousSibling;a;a=a.previousSibling)if(1===a.nodeType)return a;return null};this.isPageTurned=function(a){return"rotate(0deg)"==a.style[d.name("transform")]};this._onPageTurned=function(a){w.stop(a);if(h.contains(a.target,"mblPageTurningPage"))this.onPageTurned(a.target)};this.onPageTurned=function(){};this.initCatalog=function(a){this._catalogNode!=
a&&(this._transitionEndHandle&&u.disconnect(this._transitionEndHandle),this._transitionEndHandle=u.connect(a,d.name("transitionEnd"),this,"_onPageTurned"),this._catalogNode=a);h.add(a,"mblPageTurningCatalog");f.set(a,this._styleParams.init.catalog);a=this.getPages();s.forEach(a,function(a){this.initPage(a)},this);this.resetCatalog()};this._getBaseZIndex=function(){return this._catalogNode.style.zIndex||0};this.resetCatalog=function(){for(var a=this.getPages(),b=a.length,e=this._getBaseZIndex(),d=
b-1;0<=d;d--){var c=a[d];this.showDogear(c);this.isPageTurned(c)?c.style.zIndex=e+b+1:(c.style.zIndex=e+b-d,!this.alwaysDogeared&&this.hideDogear(c),this._currentPageNode=c)}!this.alwaysDogeared&&this._currentPageNode!=a[b-1]&&this.showDogear(this._currentPageNode)};this.initPage=function(a,b){for(var e=this.getChildren(a);3>e.length;)a.appendChild(x.create("div",null)),e=this.getChildren(a);var d=!h.contains(a,"mblPageTurningPage");h.add(a,"mblPageTurningPage");h.add(e[0],"mblPageTurningFront");
h.add(e[1],"mblPageTurningBack");h.add(e[2],"mblPageTurningShadow");var c=this._styleParams.init;f.set(a,c.page);f.set(e[0],c.front);f.set(e[1],c.back);c.shadow&&f.set(e[2],c.shadow);b||(d&&this._currentPageNode?(this.getPages(),b=this.getIndexOfPage(a)<this.getIndexOfPage(this._currentPageNode)?1:-1):b=this.isPageTurned(a)?1:-1);this._turnPage(a,b,0)};this.turnToNext=function(a){var b=this.getNextPage(this._currentPageNode);b&&(this._turnPage(this._currentPageNode,1,a),this._currentPageNode=b)};
this.turnToPrev=function(a){var b=this.getPreviousPage(this._currentPageNode);b&&(this._turnPage(b,-1,a),this._currentPageNode=b)};this.goTo=function(a){var b=this.getPages();if(!(this._currentPageNode===b[a]||b.length<=a))for(var d=a<this.getIndexOfPage(this._currentPageNode,b);this._currentPageNode!==b[a];)d?this.turnToPrev(0):this.turnToNext(0)};this._turnPage=function(a,b,e){var h=this.getChildren(a);e=("undefined"!==typeof e?e:this.duration)+"s";var c=1===b?this._styleParams.turnForward:this._styleParams.turnBackward;
c.page[d.name("transitionDuration")]=e;f.set(a,c.page);c.front[d.name("transitionDuration")]=e;f.set(h[0],c.front);c.back[d.name("transitionDuration")]=e;f.set(h[1],c.back);h=this.getPages();e=this.getNextPage(a);var c=h.length,g=this._getBaseZIndex();1===b?(a.style.zIndex=g+c+1,!this.alwaysDogeared&&(e&&this.getNextPage(e))&&this.showDogear(e)):e&&(e.style.zIndex=g+c-this.getIndexOfPage(e,h),!this.alwaysDogeared&&this.hideDogear(e))};this.showDogear=function(a){var b=this.getChildren(a);f.set(a,
"overflow","");b[1]&&f.set(b[1],"display","");b[2]&&f.set(b[2],"display","bottom"===this.turnfrom?"none":"")};this.hideDogear=function(a){if("bottom"!==this.turnfrom){var b=this.getChildren(a);f.set(a,"overflow","visible");b[1]&&f.set(b[1],"display","none");b[2]&&f.set(b[2],"display","none")}}}});
//# sourceMappingURL=pageTurningUtils.js.map