//>>built
define("dojo/_base/kernel dojo/_base/declare dojo/_base/html dojo/_base/lang dojo/_base/query dijit/_Widget dijit/_Templated dijit/_Contained dijit/layout/StackContainer dojo/fx/easing dojo/_base/fx dojo/dom-construct dojo/dom-class".split(" "),function(e,f,d,c,m,h,k,n,p,r,g,l,q){e.experimental("dojox.layout.RadioGroup");e=f("dojox.layout.RadioGroup",[p,k],{duration:750,hasButtons:!1,buttonClass:"dojox.layout._RadioButton",templateString:'\x3cdiv class\x3d"dojoxRadioGroup"\x3e \t\x3cdiv dojoAttachPoint\x3d"buttonHolder" style\x3d"display:none;"\x3e\t\t\x3ctable class\x3d"dojoxRadioButtons"\x3e\x3ctbody\x3e\x3ctr class\x3d"dojoxRadioButtonRow" dojoAttachPoint\x3d"buttonNode"\x3e\x3c/tr\x3e\x3c/tbody\x3e\x3c/table\x3e\t\x3c/div\x3e\t\x3cdiv class\x3d"dojoxRadioView" dojoAttachPoint\x3d"containerNode"\x3e\x3c/div\x3e\x3c/div\x3e',
startup:function(){this.inherited(arguments);this._children=this.getChildren();this._buttons=this._children.length;this._size=d.coords(this.containerNode);this.hasButtons&&d.style(this.buttonHolder,"display","block")},_setupChild:function(a){d.style(a.domNode,"position","absolute");if(this.hasButtons){var b=this.buttonNode.appendChild(l.create("td")),b=l.create("div",null,b),b=new (c.getObject(this.buttonClass))({label:a.title,page:a},b);c.mixin(a,{_radioButton:b});b.startup()}a.domNode.style.display=
"none"},removeChild:function(a){this.hasButtons&&a._radioButton&&(a._radioButton.destroy(),delete a._radioButton);this.inherited(arguments)},_transition:function(a,b){this._showChild(a);b&&this._hideChild(b);this.doLayout&&a.resize&&a.resize(this._containerContentBox||this._contentBox)},_showChild:function(a){var b=this.getChildren();a.isFirstChild=a==b[0];a.isLastChild=a==b[b.length-1];a.selected=!0;a.domNode.style.display="";if(a._onShow)a._onShow();else if(a.onShow)a.onShow()},_hideChild:function(a){a.selected=
!1;a.domNode.style.display="none";if(a.onHide)a.onHide()}});f("dojox.layout.RadioGroupFade",e,{_hideChild:function(a){g.fadeOut({node:a.domNode,duration:this.duration,onEnd:c.hitch(this,"inherited",arguments,arguments)}).play()},_showChild:function(a){this.inherited(arguments);d.style(a.domNode,"opacity",0);g.fadeIn({node:a.domNode,duration:this.duration}).play()}});f("dojox.layout.RadioGroupSlide",e,{easing:"dojo.fx.easing.backOut",zTop:99,constructor:function(){c.isString(this.easing)&&(this.easing=
c.getObject(this.easing))},_positionChild:function(a){if(this._size){var b=!0,c=!0;switch(a.slideFrom){case "bottom":c=!c;break;case "right":b=!b;c=!c;break;case "top":break;case "left":b=!b;break;default:b=Math.round(Math.random()),c=Math.round(Math.random())}d.style(a.domNode,b?"top":"left",(c?"-":"")+(this._size[b?"h":"w"]+20)+"px")}},_showChild:function(a){var b=this.getChildren();a.isFirstChild=a==b[0];a.isLastChild=a==b[b.length-1];a.selected=!0;d.style(a.domNode,{zIndex:this.zTop,display:""});
this._anim&&"playing"==this._anim.status()&&this._anim.gotoPercent(100,!0);this._anim=g.animateProperty({node:a.domNode,properties:{left:0,top:0},duration:this.duration,easing:this.easing,onEnd:c.hitch(a,function(){if(this.onShow)this.onShow();this._onShow&&this._onShow()}),beforeBegin:c.hitch(this,"_positionChild",a)});this._anim.play()},_hideChild:function(a){a.selected=!1;a.domNode.style.zIndex=this.zTop-1;if(a.onHide)a.onHide()}});f("dojox.layout._RadioButton",[h,k,n],{label:"",page:null,templateString:'\x3cdiv dojoAttachPoint\x3d"focusNode" class\x3d"dojoxRadioButton"\x3e\x3cspan dojoAttachPoint\x3d"titleNode" class\x3d"dojoxRadioButtonLabel"\x3e${label}\x3c/span\x3e\x3c/div\x3e',
startup:function(){this.connect(this.domNode,"onmouseenter","_onMouse")},_onMouse:function(a){this.getParent().selectChild(this.page);this._clearSelected();q.add(this.domNode,"dojoxRadioButtonSelected")},_clearSelected:function(){m(".dojoxRadioButtonSelected",this.domNode.parentNode.parentNode).removeClass("dojoxRadioButtonSelected")}});c.extend(h,{slideFrom:"random"})});
//# sourceMappingURL=RadioGroup.js.map