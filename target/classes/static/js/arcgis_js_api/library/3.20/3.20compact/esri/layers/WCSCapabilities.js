// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/WCSCapabilities",["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../geometry/Extent"],function(h,k,m,n,l){var g=function(b,a){if(null===b||null===a||null===b.tagName||void 0===b.tagName)return!1;var c=b.tagName.toLowerCase(),d=a.toLowerCase();return c===d||0<c.indexOf(":"+d)};h=h(null,{declaredClass:"esri.layers.WCSCapabilities",version:null,name:null,onlineResources:null,coverages:null,supportedFormats:null,supportedVersions:null,profiles:null,supportedInterpolations:null,
constructor:function(b){this._parse=k.hitch(this,this._parse);b&&k.mixin(this,this._parse(b))},_parse:function(b){var a=this._getElement(b,"Capabilities")||this._getElement(b,"WCS_Capabilities");if(null===a)throw"not a valid capabilities file -- cannot find Capabilities or WCS_Capabilities root element";this.version=a=a.getAttribute("version");switch(a){case "1.0.0":this._parse100(b);break;case "1.1.0":case "1.1.1":case "1.1.2":this._parse110(b);break;case "2.0.1":this._parse201(b);break;default:throw"unsupported WCS version "+
a;}},_getElements:function(b,a){if(!b)return null;if(!a)return b;var c=a;-1<a.indexOf("/")?(c=a.slice(0,a.indexOf("/")),a=a.slice(a.indexOf("/")+1)):a="";return a?this._getElement(b,c).getElementsByTagNameNS("*",a):b.getElementsByTagNameNS("*",c)},_getElement:function(b,a){if(!b)return null;if(!a)return b;var c=a;-1<a.indexOf("/")?(c=a.slice(0,a.indexOf("/")),a=a.slice(a.indexOf("/")+1)):a="";c=this._getElements(b,c);return 0<c.length?a?this._getElement(c[0],a):c[0]:null},_getElementValue:function(b,
a){var c=this._getElement(b,a);return c?(c=c.textContent||c.text||c.nodeValue||c.innerText)?c.trim():null:null},_getElementValues:function(b,a){var c=this._getElements(b,a),d=[],e,f;for(f=0;f<c.length;f++)if(e=c[f].textContent||c[f].text||c[f].nodeValue||c[f].innerText)e=e.trim(),""!==e&&d.push(e);return d},_removeTrailingQuestionMark:function(b){return b?b.indexOf("?")===b.length-1?b.substring(0,b.length-1):b:null},_parse100:function(b){var a=this._getElement(b,"Service");this.name=this._getElementValue(a,
"name");this.supportedVersions=["1.0.0"];var a={},c=this._getElement(b,"Capability");a.getCapabilities=this._removeTrailingQuestionMark(this._getElement(c,"GetCapabilities/Get/OnlineResource").getAttribute("xlink:href"));a.describeCoverage=this._removeTrailingQuestionMark(this._getElement(c,"DescribeCoverage/Get/OnlineResource").getAttribute("xlink:href"));a.getCoverage=this._removeTrailingQuestionMark(this._getElement(c,"GetCoverage/Get/OnlineResource").getAttribute("xlink:href"));this.onlineResources=
a;b=this._getElements(b,"CoverageOfferingBrief");for(var c=[],d,e,f,a=0;a<b.length;a++)d=b[a],e={},e.id=this._getElementValue(d,"name"),e.label=this._getElementValue(d,"label"),e.description=this._getElementValue(d,"description"),f=this._getElements(d,"pos"),d=this._getElementValue(f[0]).split(" "),f=this._getElementValue(f[1]).split(" "),e.lonLatEnvelope=new l({xmin:parseFloat(d[0]),ymin:parseFloat(d[1]),xmax:parseFloat(f[0]),ymax:parseFloat(f[1]),spatialReference:{wkid:4326}}),c.push(e);this.coverages=
c;return!0},_parse110:function(b){var a=k.hitch(this,function(b){var c,d,e,f;d={};for(e=0;e<b.childNodes.length;e++)c=b.childNodes[e],g(c,"title")?d.title=this._getElementValue(c):g(c,"abstract")?d["abstract"]=this._getElementValue(c):g(c,"identifier")?d.id=this._getElementValue(c):g(c,"WGS84BoundingBox")?(f=this._getElementValue(c,"LowerCorner").split(" "),c=this._getElementValue(c,"UpperCorner").split(" "),d.lonLatEnvelope=new l({xmin:parseFloat(f[0]),ymin:parseFloat(f[1]),xmax:parseFloat(c[0]),
ymax:parseFloat(c[1]),spatialReference:{wkid:4326}})):g(c,"CoverageSummary")&&(d.coverageSummaries=d.coverageSummaries||[],d.coverageSummaries.push(a(c)));return d}),c=function(a,b){var d;if(a.coverageSummaries)for(d=0;d<a.coverageSummaries.length;d++)a.coverageSummaries[d]["abstract"]=a.coverageSummaries[d]["abstract"]||a["abstract"],a.coverageSummaries[d].lonLatEnvelope=a.coverageSummaries[d].lonLatEnvelope||a.lonLatEnvelope,a.coverageSummaries[d].title=a.coverageSummaries[d].title||a.title,c(a.coverageSummaries[d],
b);void 0!==a.id&&b.push(a)};this.name=this._getElementValue(b,"ServiceIdentification/Title");this.supportedVersions=this._getElementValues(b,"ServiceIdentification/ServiceTypeVersion");var d={},e=this._getElement(b,"OperationsMetadata");d.getCapabilities=this._removeTrailingQuestionMark(this._getElement(e.querySelector("Operation[name\x3dGetCapabilities]"),"Get").getAttribute("xlink:href"));d.describeCoverage=this._removeTrailingQuestionMark(this._getElement(e.querySelector("Operation[name\x3dDescribeCoverage]"),
"Get").getAttribute("xlink:href"));d.getCoverage=this._removeTrailingQuestionMark(this._getElement(e.querySelector("Operation[name\x3dGetCoverage]"),"Get").getAttribute("xlink:href"));this.onlineResources=d;var d=this._getElement(b,"Contents"),e=[],f;for(b=0;b<d.childNodes.length;b++)f=d.childNodes[b],g(f,"coveragesummary")&&c(a(f),e);this.coverages=e;e=[];d=this._getElements(d,"SupportedFormat");for(b=0;b<d.length;b++)e.push(this._getElementValue(d[b]));this.supportedFormats=e;return!0},_parse201:function(b){var a;
a=this._getElement(b,"ServiceIdentification");this.name=this._getElementValue(a,"Title");this.supportedVersions=this._getElementValues(a,"ServiceTypeVersion");var c=this._getElements(a,"Profile"),d=[];for(a=0;a<c.length;a++)d.push(this._getElementValue(c[a]));this.profiles=d;a={};c=this._getElement(b,"OperationsMetadata");a.getCapabilities=this._removeTrailingQuestionMark(this._getElement(c.querySelector("Operation[name\x3dGetCapabilities]"),"Get").getAttribute("xlink:href"));a.describeCoverage=this._removeTrailingQuestionMark(this._getElement(c.querySelector("Operation[name\x3dDescribeCoverage]"),
"Get").getAttribute("xlink:href"));a.getCoverage=this._removeTrailingQuestionMark(this._getElement(c.querySelector("Operation[name\x3dGetCoverage]"),"Get").getAttribute("xlink:href"));this.onlineResources=a;var c=this._getElements(b,"Contents/CoverageSummary"),d=[],e,f,g;for(a=0;a<c.length;a++){e=c[a];f={};f.id=this._getElementValue(e,"CoverageId");if(g=this._getElement(e,"WGS84BoundingBox"))e=this._getElementValue(g,"LowerCorner").split(" "),g=this._getElementValue(g,"UpperCorner").split(" "),f.lonLatEnvelope=
new l({xmin:parseFloat(e[0]),ymin:parseFloat(e[1]),xmax:parseFloat(g[0]),ymax:parseFloat(g[1]),spatialReference:{wkid:4326}});d.push(f)}this.coverages=d;b=this._getElement(b,"ServiceMetadata");c=this._getElements(b,"formatSupported");d=[];for(a=0;a<c.length;a++)d.push(this._getElementValue(c[a]));this.supportedFormats=d;b=this._getElements(b,"interpolationSupported");c=[];for(a=0;a<b.length;a++)c.push(this._getElementValue(b[a]));this.supportedInterpolations=c.map(function(a){var b=null;-1<a.toLowerCase().indexOf("nearest")?
b=0:-1<a.toLowerCase().indexOf("linear")?b=1:-1<a.toLowerCase().indexOf("cubic")&&(b=2);return b}).filter(function(a){return null!==a});return!0}});m("extend-esri")&&k.setObject("layers.WCSCapabilities",h,n);return h});