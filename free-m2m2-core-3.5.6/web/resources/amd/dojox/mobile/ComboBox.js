//>>built
define("dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/window dojo/dom-geometry dojo/dom-style dojo/dom-attr dojo/window dojo/touch dijit/form/_AutoCompleterMixin dijit/popup ./_ComboBoxMenu ./TextBox ./sniff".split(" "),function(z,A,B,q,e,r,f,C,s,D,t,F,E,g){z.experimental("dojox.mobile.ComboBox");return A("dojox.mobile.ComboBox",[E,D],{dropDownClass:"dojox.mobile._ComboBoxMenu",selectOnClick:!1,autoComplete:!1,dropDown:null,maxHeight:-1,dropDownPosition:["below","above"],_throttleOpenClose:function(){this._throttleHandler&&
this._throttleHandler.remove();this._throttleHandler=this.defer(function(){this._throttleHandler=null},500)},_onFocus:function(){this.inherited(arguments);!this._opened&&!this._throttleHandler&&this._startSearchAll();g("windows-theme")&&this.domNode.blur()},onInput:function(b){if(!b||0!==b.charCode)this._onKey(b),this.inherited(arguments)},_setListAttr:function(b){this._set("list",b)},closeDropDown:function(){this._throttleOpenClose();this.endHandler&&(this.disconnect(this.startHandler),this.disconnect(this.endHandler),
this.disconnect(this.moveHandler),clearInterval(this.repositionTimer),this.repositionTimer=this.endHandler=null);this.inherited(arguments);f.remove(this.domNode,"aria-owns");f.set(this.domNode,"aria-expanded","false");t.close(this.dropDown);this._opened=!1;g("windows-theme")&&this.domNode.disabled&&this.defer(function(){this.domNode.removeAttribute("disabled")},300)},openDropDown:function(){var b=!this._opened,c=this.dropDown,h=c.domNode,k=this.domNode,u=this;f.set(c.domNode,"role","listbox");f.set(this.domNode,
"aria-expanded","true");c.id&&f.set(this.domNode,"aria-owns",c.id);g("touch")&&(!g("ios")||8>g("ios"))&&q.global.scrollBy(0,e.position(k,!1).y);this._preparedNode||(this._preparedNode=!0,h.style.width&&(this._explicitDDWidth=!0),h.style.height&&(this._explicitDDHeight=!0));var a={display:"",overflow:"hidden",visibility:"hidden"};this._explicitDDWidth||(a.width="");this._explicitDDHeight||(a.height="");r.set(h,a);a=this.maxHeight;if(-1==a)var a=C.getBox(),d=e.position(k,!1),a=Math.floor(Math.max(d.y,
a.h-(d.y+d.h)));t.moveOffScreen(c);c.startup&&!c._started&&c.startup();d=e.position(this.dropDown.containerNode,!1);a&&d.h>a&&(d.h=a);d.w=Math.max(d.w,k.offsetWidth);e.setMarginBox(h,d);h=t.open({parent:this,popup:c,around:k,orient:g("windows-theme")?["above"]:this.dropDownPosition,onExecute:function(){u.closeDropDown()},onCancel:function(){u.closeDropDown()},onClose:function(){u._opened=!1}});this._opened=!0;if(b){var n=!1,l=!1,m=!1,p=c.domNode.parentNode,b=e.position(k,!1),a=e.position(p,!1),v=
a.x-b.x,w=a.y-b.y,x=-1,y=-1;this.startHandler=this.connect(q.doc.documentElement,s.press,function(a){m=l=!0;n=!1;x=a.clientX;y=a.clientY});this.moveHandler=this.connect(q.doc.documentElement,s.move,function(a){l=!0;if(a.touches)m=n=!0;else if(m&&(a.clientX!=x||a.clientY!=y))n=!0});this.clickHandler=this.connect(c.domNode,"onclick",function(){l=!0;m=n=!1});this.endHandler=this.connect(q.doc.documentElement,s.release,function(){this.defer(function(){l=!0;!n&&m&&this.closeDropDown();m=!1})});this.repositionTimer=
setInterval(B.hitch(this,function(){if(l)l=!1;else{var a=e.position(k,!1),b=e.position(p,!1),c=b.x-a.x,a=b.y-a.y;(1<=Math.abs(c-v)||1<=Math.abs(a-w))&&r.set(p,{left:parseInt(r.get(p,"left"))+v-c+"px",top:parseInt(r.get(p,"top"))+w-a+"px"})}}),50)}g("windows-theme")&&this.domNode.setAttribute("disabled",!0);return h},postCreate:function(){this.inherited(arguments);this.connect(this.domNode,"onclick","_onClick");f.set(this.domNode,"role","combobox");f.set(this.domNode,"aria-expanded","false")},destroy:function(){this.repositionTimer&&
clearInterval(this.repositionTimer);this.inherited(arguments)},_onClick:function(b){this._throttleHandler||(this.opened?this.closeDropDown():this._startSearchAll())}})});
//# sourceMappingURL=ComboBox.js.map