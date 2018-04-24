// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/StreamMode","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/has ../kernel ../SpatialReference ../tasks/query ../tasks/QueryTask ../geometry/jsonUtils ./RenderMode".split(" "),function(p,l,m,q,r,t,u,v,w,x){p=p([x],{declaredClass:"esri.layers._StreamMode",constructor:function(a,b){this.featureLayer=a;this._featureMap={};this._setRefreshRate();this._drawBuffer={adds:[],updates:[]};this._timeoutId=null;this._flushDrawBuffer=l.hitch(this,this._flushDrawBuffer);this._featuresByTime=
{};this._lastEndTimeCheck=null;this._maxFeatureAge=0;a.purgeOptions&&a.purgeOptions.age&&"number"===typeof a.purgeOptions.age&&(this._maxFeatureAge=1E3*Math.ceil(60*a.purgeOptions.age));this._drawFeatures=l.hitch(this,this._drawFeatures);this._queryErrorHandler=l.hitch(this,this._queryErrorHandler)},startup:function(){},propertyChangeHandler:function(a){this._init&&(0===a?this._applyTimeFilter():3===a?this._redrawAllTracks():console.debug("StreamLayer: Stream Layer only supports changing map time or maximumTrackPoints. Layer id \x3d "+
this.featureLayer.id))},destroy:function(){this.inherited(arguments);clearTimeout(this._timeoutId);this._featuresByTime=this._drawBuffer=this._featureMap=null},drawFeature:function(a){var b=this.featureLayer,d=b.objectIdField;this._timeoutId||(this._timeoutId=setTimeout(this._flushDrawBuffer,this._refreshRate));b._joinField&&this._getFeature(a.attributes[d])?this._drawBuffer.updates.push({oid:a.attributes[d],updates:a}):this._drawBuffer.adds.push(a)},resume:function(){this.propertyChangeHandler(0)},
refresh:function(){var a=this.featureLayer;a&&(a._relatedUrl||a._keepLatestUrl?(a._fireUpdateStart(),a._refreshing=!0,a.disconnect(),a.clear(),a._relatedQueried=!1,a._keepLatestQueried=!1,a.connect()):(a._fireUpdateStart(),a.clear(),a._fireUpdateEnd()))},_drawFeatures:function(a,b){this._purgeRequests();var d=this.featureLayer;d._create(a.features||[]);d._fireUpdateEnd(null,b)},_applyTimeFilter:function(a){this.inherited(arguments);this._redrawAllTracks()},_removeFeatures:function(a){var b=this.featureLayer,
d=b.objectIdField;a&&m.forEach(a,function(a){a=a.attributes[d];b._unSelectFeatureIIf(a,this);this._decRefCount(a);this._removeFeatureIIf(a)},this)},_addFeatures:function(a){var b=this.featureLayer,d=b._endTimeField,e=b._startTimeField,c,g,f,h=[],k=[],n=[];c=b._trackManager;g=b.objectIdField;if(c)for(f in a=c.addFeatures(a),a)a.hasOwnProperty(f)&&(h.push(f),a[f].adds&&(k=k.concat(a[f].adds)),a[f].deletes&&(n=n.concat(a[f].deletes)));else k=a;m.forEach(k,function(a){var b=a.attributes[g],c;c=d&&a.attributes[d];
!c&&this._maxFeatureAge&&(c=e&&a.attributes[e]?a.attributes[e]+this._maxFeatureAge:Date.now()+this._maxFeatureAge);c&&(c=1E3*Math.ceil(c/1E3),this._featuresByTime[c]?this._featuresByTime[c].push(b):this._featuresByTime[c]=[b]);this._addFeatureIIf(b,a);this._incRefCount(b)},this);n.length&&this._removeFeatures(n);c&&c.refreshTracks(h)},_updateFeatures:function(a){var b=this.featureLayer,d,e,c=[];d=b._trackManager;e=b._trackIdField;m.forEach(a,function(a){var f=a.updates;a=this._getFeature(a.oid);var g;
if(a){f.geometry&&a.setGeometry(f.geometry);f=f.attributes||{};for(g in f)f.hasOwnProperty(g)&&(a.attributes[g]=f[g]);a.setAttributes(a.attributes);a.visible=this._checkFeatureTimeIntersects(a);d&&a.attributes[e]?c.push(a.attributes[e]):b._repaint(a,null,!0)}},this);c.length&&d.refreshTracks(c)},_redrawAllTracks:function(){var a=this.featureLayer._trackManager,b;a&&(b=a.trimTracks())&&0<b.length&&(this._removeFeatures(b),a.refreshTracks())},_flushDrawBuffer:function(){clearTimeout(this._timeoutId);
var a=this._drawBuffer,b=a.adds.splice(0,a.adds.length),d=a.updates.splice(0,a.updates.length),a=this.featureLayer;if(!a)return!1;a.updating||a._fireUpdateStart();this._addFeatures(b);this._updateFeatures(d);(b=this._getExpiredFeatures())&&b.length&&(this._removeFeatures(b),a._trackManager&&a._trackManager.removeFeatures(b));a._purge();a._fireUpdateEnd();this._timeoutId=null},_clearDrawBuffer:function(){var a=this._timeoutId,b=this._drawBuffer,d=b.adds,b=b.updates;a&&clearTimeout(a);d.splice(0,d.length);
b.splice(0,b.length);this._timeoutId=null},_clearTimeBin:function(){this._featuresByTime={};this._lastEndTimeCheck=1E3*Math.ceil(Date.now()/1E3)},_clearFeatureMap:function(){this._featureMap={}},_setRefreshRate:function(a){a=a||0===a?a:200;0>a&&(a=200);this._refreshRate=a},_checkFeatureTimeIntersects:function(a){var b=this.featureLayer,d=b.getMap();return(d=d?d.timeExtent:null)&&b.timeInfo&&(b.timeInfo.startTimeField||b.timeInfo.endTimeField)?0<b._filterByTime([a],d.startTime,d.endTime).match.length:
!0},_getRequestId:function(a){return("_"+a.name+a.layerId+a._ulid).replace(/[^a-zA-Z0-9\_]+/g,"_")},_fetchArchive:function(a){function b(a){n++;c.execute(g).then(function(b){a(null,b)},function(b){a(b)})}function d(a,c){if(a)n>=p||!e._relatedUrl?l._queryErrorHandler(Error("Could not get features from related feature service")):(m={relatedFeatureWarning:"Querying related feature service using the current filter failed. All related features are displayed, and the filter is applied to the stream service only"},
g.where="1\x3d1",b(d));else{var f=l._fixFieldNameCasing(e,c);c.features=f;l._drawFeatures(c,m)}}var e=this.featureLayer,c,g,f,h,k;e._fireUpdateStart();if(a&&this.map){c=new v(a);g=new u;a=this.map;f=e.getFilter()||{};h=f.where||"1\x3d1";k=f.geometry?w.fromJson(f.geometry):null;f=f.outFields?f.outFields.split(","):["*"];g.geometry=k;g.where=h;g.outFields=f;g.returnGeometry=!0;g.outSpatialReference=new t(a.spatialReference.toJson());e._usePatch&&(a=this._getRequestId(e),this._cancelPendingRequest(null,
a));var n=0,p=2,l=this,m=null;b(d)}else return this._fireUpdateEnd({error:"Archive data cannot be fetched if no feature service url is provided or if the layer is not added to a map"}),!1},_queryErrorHandler:function(a){this._purgeRequests();var b=this.featureLayer;b._errorHandler(a);b._fireUpdateEnd(a)},_fixFieldNameCasing:function(a,b){var d=b.features||[],e=b.fields;if(!e||!d.length)return d;for(var e=this._mapFieldNameDifferences(a.fields,e),c=[],g,f,h=0,k=b.features.length;h<k;h++)g=d[h],f=this._swizzleResponseAttributes(g.attributes,
e),c.push({geometry:g.geometry,attributes:f});return c},_mapFieldNameDifferences:function(a,b){var d=[],e={},c,g;c=0;for(g=b.length;c<g;c++)d.push(b[c].name);c=0;for(g=a.length;c<g;c++){var f=a[c].name,h=this._checkForStreamFieldName(f,d);h&&(e[h]=f)}return e},_checkForStreamFieldName:function(a,b){for(var d=a.toLowerCase(),e,c=0,g=b.length;c<g;c++)if(b[c].toLowerCase()===d){e=b[c];break}return e},_swizzleResponseAttributes:function(a,b){var d={},e;for(e in a)if(a.hasOwnProperty(e)){var c=a[e];b.hasOwnProperty(e)?
d[b[e]]=c:d[e]=c}return d},_getExpiredFeatures:function(){var a,b,d,e=[],c=[];if(!this.featureLayer._endTimeField&&!this._maxFeatureAge)return c;a=1E3*Math.floor(this._lastEndTimeCheck/1E3);this._lastEndTimeCheck=b=1E3*Math.ceil(Date.now()/1E3);if(a&&a!==b)for(d=this._featuresByTime;a<=b;a+=1E3)d[a]&&(e=e.concat(d[a]),delete d[a]);m.forEach(e,function(a){(a=this._getFeature(a))&&c.push(a)},this);return c}});q("extend-esri")&&l.setObject("layers._StreamMode",p,r);return p});