//>>built
define("dojo dijit dojox dijit/_Widget dijit/_TemplatedMixin dijit/_editor/_Plugin dojo/_base/declare".split(" "),function(a,d,k,e,f,g,h){var c=h("dojox.editor.plugins.ToolbarLineBreak",[e,f],{templateString:"\x3cspan class\x3d'dijit dijitReset'\x3e\x3cbr\x3e\x3c/span\x3e",postCreate:function(){a.setSelectable(this.domNode,!1)},isFocusable:function(){return!1}});a.subscribe(d._scopeName+".Editor.getPlugin",null,function(b){if(!b.plugin){var a=b.args.name.toLowerCase();if("||"===a||"toolbarlinebreak"===
a)b.plugin=new g({button:new c,setEditor:function(a){this.editor=a}})}});return c});
//# sourceMappingURL=ToolbarLineBreak.js.map