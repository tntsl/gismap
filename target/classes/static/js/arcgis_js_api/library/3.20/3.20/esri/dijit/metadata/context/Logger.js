// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/context/Logger",["dojo/_base/declare","dojo/_base/lang","dojo/has","../../../kernel"],function(a,b,c,d){a=a(null,{debugEnabled:!0,constructor:function(a){b.mixin(this,a)},debug:function(){window.console&&this.debugEnabled&&(console.debug?console.debug(arguments):console.log&&console.log(arguments))},error:function(a){window.console&&(console.error?a?console.error(a):console.error(arguments):console.log&&console.log(arguments))},info:function(){window.console&&(console.info?
console.info(arguments):console.log&&console.log(arguments))},log:function(){window.console&&console.log&&console.log(arguments)},warn:function(){window.console&&(console.warn?console.warn(arguments):console.log&&console.log(arguments))},_test:function(){this.debug("Debug message.");this.log("Log message.");this.info("Info message.");this.warn("Warn message.");this.error(Error("Error message."),"additionalArgument");console.error(Error("Error2 message2."),"additionalArgument")}});c("extend-esri")&&
b.setObject("dijit.metadata.context.Logger",a,d);return a});