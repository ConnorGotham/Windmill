//>>built
define(["./_base","./regexp"],function(c,d){c.isIpAddress=function(b,a){return RegExp("^"+d.ipAddress(a)+"$","i").test(b)};c.isUrl=function(b,a){return RegExp("^"+d.url(a)+"$","i").test(b)};c.isEmailAddress=function(b,a){return RegExp("^"+d.emailAddress(a)+"$","i").test(b)};c.isEmailAddressList=function(b,a){return RegExp("^"+d.emailAddressList(a)+"$","i").test(b)};c.getEmailAddressList=function(b,a){a||(a={});a.listSeparator||(a.listSeparator="\\s;,");return c.isEmailAddressList(b,a)?b.split(RegExp("\\s*["+
a.listSeparator+"]\\s*")):[]};return c});
//# sourceMappingURL=web.js.map