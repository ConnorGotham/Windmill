//>>built
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/on dojo/mouse dojox/widget/Rotator".split(" "),function(f,g,h,d,e,k){return f("dojox.widget.AutoRotator",k,{suspendOnHover:!1,duration:4E3,autoStart:!0,pauseOnManualChange:!1,cycles:-1,random:!1,reverse:!1,constructor:function(){var a=this;a.cycles-0==a.cycles&&0<a.cycles?a.cycles++:a.cycles=a.cycles?-1:0;a._signals=[d(a._domNode,e.enter,function(){if(a.suspendOnHover&&!a.anim&&!a.wfe){var b=a._endTime,c=a._now();a._suspended=!0;a._resetTimer();
a._resumeDuration=b>c?b-c:0.01}}),d(a._domNode,e.leave,function(){a.suspendOnHover&&!a.anim&&(a._suspended=!1,a.playing&&!a.wfe&&a.play(!0))})];a.autoStart&&1<a.panes.length?a.play():a.pause()},destroy:function(){g.forEach(this._signals,function(a){a.remove()});delete this._signals;dojo.forEach(this._connects,dojo.disconnect);this.inherited(arguments)},play:function(a,b){this.playing=!0;this._resetTimer();!0!==a&&0<this.cycles&&this.cycles--;if(0==this.cycles)this.pause();else if(!this._suspended)if(this.onUpdate("play"),
b)this._cycle();else{var c=(this._resumeDuration||0)-0,c=(0<c?c:this.panes[this.idx].duration||this.duration)-0;this._resumeDuration=0;this._endTime=this._now()+c;this._timer=setTimeout(h.hitch(this,"_cycle",!1),c)}},pause:function(){this.playing=this._suspended=!1;this.cycles=-1;this._resetTimer();this.onUpdate("pause")},_now:function(){return(new Date).getTime()},_resetTimer:function(){clearTimeout(this._timer)},_cycle:function(a){var b=this;a=b.idx;var c;if(b.random){do c=Math.floor(Math.random()*
b.panes.length+1);while(c==a)}else c=a+(b.reverse?-1:1);(a=b.go(c))&&a.addCallback(function(a){b.onUpdate("cycle");b.playing&&b.play(!1,a)})},onManualChange:function(a){this.cycles=-1;"play"!=a&&(this._resetTimer(),this.pauseOnManualChange&&this.pause());this.playing&&this.play()}})});
//# sourceMappingURL=AutoRotator.js.map