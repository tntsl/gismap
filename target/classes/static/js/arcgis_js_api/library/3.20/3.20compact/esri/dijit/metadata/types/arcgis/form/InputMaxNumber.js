// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/form/InputMaxNumber","dojo/_base/declare dojo/_base/lang dojo/query dijit/registry dojo/has ../../../../../kernel ../../../base/etc/docUtil ../../../form/InputNumber".split(" "),function(a,e,m,n,f,g,h,k){a=a([k],{postCreate:function(){this.inherited(arguments)},emitInteractionOccurred:function(a){this.inherited(arguments);try{var c=this.parentXNode.target,b=null;"maxVal"===c?b="minVal":"rdommax"===c?b="rdommin":"vertMaxVal"===c&&(b="vertMinVal");if(null!==
b){var d=h.findInputWidget(this.parentXNode.parentElement.gxePath+"/"+b,this.parentXNode.domNode.parentNode);d&&d.emitInteractionOccurred()}}catch(l){console.error(l)}}});f("extend-esri")&&e.setObject("dijit.metadata.types.arcgis.form.InputMaxNumber",a,g);return a});