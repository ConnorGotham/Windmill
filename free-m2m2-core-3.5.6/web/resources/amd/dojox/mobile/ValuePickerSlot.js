//>>built
define("dojo/_base/array dojo/_base/declare dojo/_base/event dojo/_base/lang dojo/_base/window dojo/dom-class dojo/dom-construct dojo/dom-attr dojo/touch dijit/_WidgetBase ./iconUtils dojo/has dojo/has!dojo-bidi?dojox/mobile/bidi/ValuePickerSlot".split(" "),function(f,l,r,m,n,k,e,d,g,h,p,q,s){h=l(q("dojo-bidi")?"dojox.mobile.NonBidiValuePickerSlot":"dojox.mobile.ValuePickerSlot",h,{items:[],labels:[],labelFrom:0,labelTo:0,zeroPad:0,value:"",step:1,readOnly:!1,tabIndex:"0",plusBtnLabel:"",plusBtnLabelRef:"",
minusBtnLabel:"",minusBtnLabelRef:"",baseClass:"mblValuePickerSlot",buildRendering:function(){this.inherited(arguments);this.initLabels();if(0<this.labels.length){this.items=[];for(var a=0;a<this.labels.length;a++)this.items.push([a,this.labels[a]])}this.plusBtnNode=e.create("div",{className:"mblValuePickerSlotPlusButton mblValuePickerSlotButton",title:"+"},this.domNode);this.plusIconNode=e.create("div",{className:"mblValuePickerSlotIcon"},this.plusBtnNode);p.createIcon("mblDomButtonGrayPlus",null,
this.plusIconNode);this.inputAreaNode=e.create("div",{className:"mblValuePickerSlotInputArea"},this.domNode);this.inputNode=e.create("input",{className:"mblValuePickerSlotInput",readonly:this.readOnly},this.inputAreaNode);this.minusBtnNode=e.create("div",{className:"mblValuePickerSlotMinusButton mblValuePickerSlotButton",title:"-"},this.domNode);this.minusIconNode=e.create("div",{className:"mblValuePickerSlotIcon"},this.minusBtnNode);p.createIcon("mblDomButtonGrayMinus",null,this.minusIconNode);d.set(this.plusBtnNode,
"role","button");this._setPlusBtnLabelAttr(this.plusBtnLabel);this._setPlusBtnLabelRefAttr(this.plusBtnLabelRef);d.set(this.inputNode,"role","textbox");a=require("dijit/registry").getUniqueId("dojo_mobile__mblValuePickerSlotInput");d.set(this.inputNode,"id",a);d.set(this.plusBtnNode,"aria-controls",a);d.set(this.minusBtnNode,"role","button");d.set(this.minusBtnNode,"aria-controls",a);this._setMinusBtnLabelAttr(this.minusBtnLabel);this._setMinusBtnLabelRefAttr(this.minusBtnLabelRef);""===this.value&&
0<this.items.length&&(this.value=this.items[0][1]);this._initialValue=this.value},startup:function(){this._started||(this._handlers=[this.connect(this.plusBtnNode,g.press,"_onTouchStart"),this.connect(this.minusBtnNode,g.press,"_onTouchStart"),this.connect(this.plusBtnNode,"onkeydown","_onClick"),this.connect(this.minusBtnNode,"onkeydown","_onClick"),this.connect(this.inputNode,"onchange",m.hitch(this,function(a){this._onChange(a)}))],this.inherited(arguments),this._set(this.plusBtnLabel))},initLabels:function(){if(this.labelFrom!==
this.labelTo)for(var a=this.labels=[],b=this.zeroPad&&Array(this.zeroPad).join("0"),c=this.labelFrom;c<=this.labelTo;c+=this.step)a.push(this.zeroPad?(b+c).slice(-this.zeroPad):c+"")},spin:function(a){for(var b=-1,c=this.get("value"),d=this.items.length,e=0;e<d;e++)if(this.items[e][1]===c){b=e;break}-1!=c&&(b+=a,0>b&&(b+=(Math.abs(Math.ceil(b/d))+1)*d),this.set("value",this.items[b%d][1]))},setInitialValue:function(){this.set("value",this._initialValue)},_onClick:function(a){if((!a||!("keydown"===
a.type&&13!==a.keyCode))&&!1!==this.onClick(a)){a=a.currentTarget;if(a===this.plusBtnNode||a===this.minusBtnNode)this._btn=a;this.spin(this._btn===this.plusBtnNode?1:-1)}},onClick:function(){},_onChange:function(a){!1!==this.onChange(a)&&(a=this.get("value"),a=this.validate(a),this.set("value",a.length?a[0][1]:this.value))},onChange:function(){},validate:function(a){return f.filter(this.items,function(b){return(b[1]+"").toLowerCase()==(a+"").toLowerCase()})},_onTouchStart:function(a){this._conn=[this.connect(n.body(),
g.move,"_onTouchMove"),this.connect(n.body(),g.release,"_onTouchEnd")];this.touchStartX=a.touches?a.touches[0].pageX:a.clientX;this.touchStartY=a.touches?a.touches[0].pageY:a.clientY;k.add(a.currentTarget,"mblValuePickerSlotButtonSelected");this._btn=a.currentTarget;this._timer&&(this._timer.remove(),this._timer=null);this._interval&&(clearInterval(this._interval),this._interval=null);this._timer=this.defer(function(){this._interval=setInterval(m.hitch(this,function(){this.spin(this._btn===this.plusBtnNode?
1:-1)}),60);this._timer=null},1E3);r.stop(a)},_onTouchMove:function(a){var b=a.touches?a.touches[0].pageY:a.clientY;if(4<=Math.abs((a.touches?a.touches[0].pageX:a.clientX)-this.touchStartX)||4<=Math.abs(b-this.touchStartY))this._timer&&(this._timer.remove(),this._timer=null),this._interval&&(clearInterval(this._interval),this._interval=null),f.forEach(this._conn,this.disconnect,this),k.remove(this._btn,"mblValuePickerSlotButtonSelected")},_onTouchEnd:function(a){this._timer&&(this._timer.remove(),
this._timer=null);f.forEach(this._conn,this.disconnect,this);k.remove(this._btn,"mblValuePickerSlotButtonSelected");this._interval?(clearInterval(this._interval),this._interval=null):this._onClick(a)},_getKeyAttr:function(){var a=this.get("value"),b=f.filter(this.items,function(b){return b[1]===a})[0];return b?b[0]:null},_getValueAttr:function(){return this.inputNode.value},_setValueAttr:function(a){this._spinToValue(a,!0)},_spinToValue:function(a,b){if(this.get("value")!=a){this.inputNode.value=
a;b&&this._set("value",a);var c=this.getParent();if(c&&c.onValueChanged)c.onValueChanged(this)}},_setTabIndexAttr:function(a){this.plusBtnNode.setAttribute("tabIndex",a);this.minusBtnNode.setAttribute("tabIndex",a)},_setAria:function(a,b,c){c?d.set(a,b,c):d.remove(a,b)},_setPlusBtnLabelAttr:function(a){this._setAria(this.plusBtnNode,"aria-label",a)},_setPlusBtnLabelRefAttr:function(a){this._setAria(this.plusBtnNode,"aria-labelledby",a)},_setMinusBtnLabelAttr:function(a){this._setAria(this.minusBtnNode,
"aria-label",a)},_setMinusBtnLabelRefAttr:function(a){this._setAria(this.minusBtnNode,"aria-labelledby",a)}});return q("dojo-bidi")?l("dojox.mobile.ValuePickerSlot",[h,s]):h});
//# sourceMappingURL=ValuePickerSlot.js.map