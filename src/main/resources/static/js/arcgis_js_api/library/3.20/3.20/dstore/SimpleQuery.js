//>>built
define("dstore/SimpleQuery",["dojo/_base/declare","dojo/_base/array"],function(n,e){function p(a,b){if(-1<a.indexOf(".")){var d=a.split("."),k=d.length;return function(a){for(var f=0;f<k;f++)a=a&&(b&&a.get?a.get(d[f]):a[d[f]]);return a}}return function(b){return b.get?b.get(a):b[a]}}var r={eq:function(a,b){return a===b},"in":function(a,b){return-1<e.indexOf(b.data||b,a)},ne:function(a,b){return a!==b},lt:function(a,b){return a<b},lte:function(a,b){return a<=b},gt:function(a,b){return a>b},gte:function(a,
b){return a>=b},match:function(a,b,d){return b.test(a,d)},contains:function(a,b,d,k){var g=this;return e.every(b.data||b,function(b){if("object"===typeof b&&b.type){var f=g._getFilterComparator(b.type);return e.some(a,function(a){return f.call(g,a,b.args[1],d,k)})}return-1<e.indexOf(a,b)})}};return n(null,{_createFilterQuerier:function(a){function b(a){var c=a.type;a=a.args;var f=k._getFilterComparator(c);if(f){var h=a[0],e=p(h,d),m=a[1];m&&m.fetchSync&&(m=m.fetchSync());return function(a){return f.call(k,
e(a),m,a,h)}}switch(c){case "and":case "or":for(var l=0,n=a.length;l<n;l++){var q=b(a[l]);g=g?function(a,b){return"and"===c?function(c){return a(c)&&b(c)}:function(c){return a(c)||b(c)}}(g,q):q}return g;case "function":return a[0];case "string":l=k[a[0]];if(!l)throw Error("No filter function "+a[0]+" was found in the collection");return l;case void 0:return function(){return!0};default:throw Error('Unknown filter operation "'+c+'"');}}var d=this.queryAccessors,k=this,g=b(a);return function(a){return e.filter(a,
g)}},_getFilterComparator:function(a){return r[a]||this.inherited(arguments)},_createSelectQuerier:function(a){return function(b){var d=a.length;return e.map(b,a instanceof Array?function(b){for(var g={},f=0;f<d;f++){var c=a[f];g[c]=b[c]}return g}:function(b){return b[a]})}},_createSortQuerier:function(a){var b=this.queryAccessors;return function(d){d=d.slice();d.sort("function"==typeof a?a:function(d,g){for(var f=0;f<a.length;f++){var c,e=a[f];if("function"==typeof e)c=e(d,g);else{c=e.get||(e.get=
p(e.property,b));var e=e.descending,h=c(d);c=c(g);null!=h&&(h=h.valueOf());null!=c&&(c=c.valueOf());c=h===c?0:!!e===("undefined"===typeof c||null===c&&"undefined"!==typeof h||null!=h&&h<c)?1:-1}if(0!==c)return c}return 0});return d}}})});