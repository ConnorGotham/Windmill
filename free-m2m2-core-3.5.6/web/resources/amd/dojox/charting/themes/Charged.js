//>>built
define(["../Theme","dojox/gfx/gradutils","./common"],function(f,g,a){var c=f.generateGradient,d={type:"linear",space:"shape",x1:0,y1:0,x2:0,y2:75};a.Charged=new f({chart:{fill:"#ededdf",pageStyle:{backgroundColor:"#ededdf",backgroundImage:"none",color:"inherit"}},plotarea:{fill:"transparent"},axis:{stroke:{color:"#808078",width:1},tick:{color:"#b3b3a8",position:"center",font:"normal normal normal 7pt Helvetica, Arial, sans-serif",fontColor:"#808078"}},series:{stroke:{width:2,color:"#595954"},outline:null,
font:"normal normal normal 8pt Helvetica, Arial, sans-serif",fontColor:"#808078"},marker:{stroke:{width:3,color:"#595954"},outline:null,font:"normal normal normal 8pt Helvetica, Arial, sans-serif",fontColor:"#808078"},seriesThemes:[{fill:c(d,"#004cbf","#06f")},{fill:c(d,"#bf004c","#f06")},{fill:c(d,"#43bf00","#6f0")},{fill:c(d,"#7300bf","#90f")},{fill:c(d,"#bf7300","#f90")},{fill:c(d,"#00bf73","#0f9")}],markerThemes:[{fill:"#06f",stroke:{color:"#06f"}},{fill:"#f06",stroke:{color:"#f06"}},{fill:"#6f0",
stroke:{color:"#6f0"}},{fill:"#90f",stroke:{color:"#90f"}},{fill:"#f90",stroke:{color:"#f90"}},{fill:"#0f9",stroke:{color:"#0f9"}}]});a.Charged.next=function(b,c,d){var a="line"==b;if(a||"area"==b){var e=this.seriesThemes[this._current%this.seriesThemes.length];e.fill.space="plot";a&&(e.stroke={width:2.5,color:e.fill.colors[1].color});"area"==b&&(e.fill.y2=90);a=f.prototype.next.apply(this,arguments);delete e.stroke;e.fill.y2=75;e.fill.space="shape";return a}return f.prototype.next.apply(this,arguments)};
a.Charged.post=function(b,a){b=f.prototype.post.apply(this,arguments);if(("slice"==a||"circle"==a)&&b.series.fill&&"radial"==b.series.fill.type)b.series.fill=g.reverse(b.series.fill);return b};return a.Charged});
//# sourceMappingURL=Charged.js.map