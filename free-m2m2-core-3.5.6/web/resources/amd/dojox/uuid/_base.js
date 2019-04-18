//>>built
define(["dojo/_base/kernel","dojo/_base/lang"],function(f){f.getObject("uuid",!0,dojox);dojox.uuid.NIL_UUID="00000000-0000-0000-0000-000000000000";dojox.uuid.version={UNKNOWN:0,TIME_BASED:1,DCE_SECURITY:2,NAME_BASED_MD5:3,RANDOM:4,NAME_BASED_SHA1:5};dojox.uuid.variant={NCS:"0",DCE:"10",MICROSOFT:"110",UNKNOWN:"111"};dojox.uuid.assert=function(a,c){if(!a)throw c||(c="An assert statement failed.\nThe method dojox.uuid.assert() was called with a 'false' value.\n"),Error(c);};dojox.uuid.generateNilUuid=
function(){return dojox.uuid.NIL_UUID};dojox.uuid.isValid=function(a){a=a.toString();var c=f.isString(a)&&36==a.length&&a==a.toLowerCase();if(c){a=a.split("-");var c=5==a.length&&8==a[0].length&&4==a[1].length&&4==a[2].length&&4==a[3].length&&12==a[4].length,b;for(b in a)var d=parseInt(a[b],16),c=c&&isFinite(d)}return c};dojox.uuid.getVariant=function(a){if(!dojox.uuid._ourVariantLookupTable){var c=dojox.uuid.variant,b=[];b[0]=c.NCS;b[1]=c.NCS;b[2]=c.NCS;b[3]=c.NCS;b[4]=c.NCS;b[5]=c.NCS;b[6]=c.NCS;
b[7]=c.NCS;b[8]=c.DCE;b[9]=c.DCE;b[10]=c.DCE;b[11]=c.DCE;b[12]=c.MICROSOFT;b[13]=c.MICROSOFT;b[14]=c.UNKNOWN;b[15]=c.UNKNOWN;dojox.uuid._ourVariantLookupTable=b}a=a.toString();a=a.charAt(19);a=parseInt(a,16);dojox.uuid.assert(0<=a&&16>=a);return dojox.uuid._ourVariantLookupTable[a]};dojox.uuid.getVersion=function(a){dojox.uuid.assert(dojox.uuid.getVariant(a)==dojox.uuid.variant.DCE,"dojox.uuid.getVersion() was not passed a DCE Variant UUID.");a=a.toString();a=a.charAt(14);return parseInt(a,16)};dojox.uuid.getNode=
function(a){dojox.uuid.assert(dojox.uuid.getVersion(a)==dojox.uuid.version.TIME_BASED,"dojox.uuid.getNode() was not passed a TIME_BASED UUID.");a=a.toString();return a.split("-")[4]};dojox.uuid.getTimestamp=function(a,c){dojox.uuid.assert(dojox.uuid.getVersion(a)==dojox.uuid.version.TIME_BASED,"dojox.uuid.getTimestamp() was not passed a TIME_BASED UUID.");a=a.toString();c||(c=null);switch(c){case "string":case String:return dojox.uuid.getTimestamp(a,Date).toUTCString();case "hex":var b=a.split("-"),
d=b[0],e=b[1],b=b[2],b=b.slice(1),d=b+e+d;dojox.uuid.assert(15==d.length);return d;case null:case "date":case Date:return b=a.split("-"),d=parseInt(b[0],16),e=parseInt(b[1],16),b=parseInt(b[2],16)&4095,b=(b<<16)+e,b*=4294967296,b+=d,new Date(b/1E4-122192928E5);default:dojox.uuid.assert(!1,"dojox.uuid.getTimestamp was not passed a valid returnType: "+c)}};return dojox.uuid});
//# sourceMappingURL=_base.js.map