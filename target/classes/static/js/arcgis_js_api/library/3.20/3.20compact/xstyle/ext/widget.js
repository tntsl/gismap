//>>built
define("xstyle/ext/widget",["dojo/Deferred"],function(p){function d(a,e,c,b){if(b){var f="x-widget-"+q++;b.addSheetRule("."+f,b.cssText);f=" "+f}if(a.eachProperty){var g={};a.eachProperty(function(a,b){a=a.replace(/-\w/g,function(a){return a.charAt(1).toUpperCase()});b=d(b);"type"==a&&e?c=b:g[a]=b});a=g;c?(b=function(a,b){b&&(a=dojo.declare([].slice.call(arguments,0)));var c=a.prototype,k;for(k in g){var l=g[k];if(k in c){var d=typeof c[k];"string"!=d&&"string"==typeof l&&(g[k]="number"==d?+l:eval(l))}}e(function(b){b=
new a(g,b);f&&(b.domNode.className+=" "+f)})},window[c]&&b(window[c]),require("string"==typeof c?c.split(/\s*,\s*/):c,b)):e&&console.error("No type defined for widget")}else"object"!=typeof a&&("'"==a.charAt(0)||'"'==a.charAt(0)?a=eval(a):isNaN(a)?m.hasOwnProperty(a)&&(a=m[a]):a=+a);return a}function h(a){return{widget:function(e,c){var b=[];e.replace(/require\s*\(\s*['"]([^'"]*)['"]\s*\)/g,function(a,c){b.push(c)});require(b);return function(f){require(b,function(){with(a){var b=eval(e),d=b.prototype,
h={};d&&c.eachProperty(function(a,b,c){b in d&&(a=typeof d[b],h[b]="string"==a||"string"!=typeof c?c:"number"==a?+c:eval(c))});b(h,f)}})}},role:"layout"}}var q=0,m={"true":!0,"false":!1,"null":null},n=new h({});h.widget=n.widget;h.role=n.role;return{put:function(a,e){return{then:function(c){var b=new p;d(a[0].eachProperty?a[0]:e,function(a){b.resolve({forElement:function(b){a(b)}})},"string"==typeof a&&a,e);return b.then(c)}}},parse:d}});