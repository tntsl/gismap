// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/geoenrichment/BaseWidget","../../declare dojo/_base/lang dojo/Evented dojo/dom-construct dojo/dom-attr dojo/dom-class dojo/string ./dom dojo/on ./lang dijit/Destroyable dijit/layout/BorderContainer dijit/layout/ContentPane ./formatVariable".split(" "),function(k,f,g,e,n,l,p,q,r,t,u,v,w,m){g=k("esri.dijit.geoenrichment.BaseWidget",g,{data:null,metadata:null,parent:null,dataEvents:null,_state:null,expanded:!0,title:null,titleDiv:null,subtitle:null,subtitleDiv:null,constructor:function(a){if(!a)throw"Parent HTML element was not specified";
this._state={sortBy:0,sortDesc:!1};this.parent=a},setDataProvider:function(a){this._destroyDataEvents();a&&(this.feedData(a),this.dataEvents=new u,this.dataEvents.own(a.on("data",f.hitch(this,this.feedData,a))))},_destroyDataEvents:function(){this.dataEvents&&(this.dataEvents.destroy(),this.dataEvents=null)},feedData:function(a){if(this.data=a.getData())this.metadata=a.metadata,this.update()},destroy:function(a){a||this._destroyDataEvents();this.ui&&(this.ui.destroy(),this.ui=null)},updateUI:function(){if(this.sortTriangles)for(var a in this.sortTriangles)this.sortTriangles[a].innerHTML=
this._state.sortBy==+a?this._state.sortDesc?"\x26#9660;":"\x26#9650;":"";this.title?(this.titleDiv.innerHTML=this.title,this.titleDiv.style.display=""):(this.titleDiv.innerHTML="",this.titleDiv.style.display="none");if(this.subtitle){a={};var b=this.data.features[0].attributes,c=this.metadata,d;for(d in c)c.hasOwnProperty(d)&&(a[d]=b[c[d]]||"");this.subtitleDiv.innerHTML=p.substitute(this.subtitle,a);this.subtitleDiv.style.display=""}else this.subtitleDiv.innerHTML="",this.subtitleDiv.style.display=
"none"},updateUIExpanded:function(){this.updateUI()},updateUICollapsed:function(){this.updateUI()},createUI:function(a){this.titleDiv=a.addHeader("div",{"class":"BaseWidget_Title"});this.subtitleDiv=a.addHeader("div",{"class":"BaseWidget_Subtitle"})},createUIExpanded:function(a){this.createUI(a)},createUICollapsed:function(a){this.createUI(a)},createUIPrivate:function(){var a=new x;this.expanded?this.createUIExpanded(a):this.createUICollapsed(a);this.ui=a.build(this.parent)},updateUIPrivate:function(){this.expanded?
this.updateUIExpanded():this.updateUICollapsed();this.resize();r.emit(this,"resize",[this.parent.scrollWidth,this.parent.scrollHeight])},resize:function(){this.ui&&this.ui.resize()},update:function(){this.data&&this._state&&(this.ui||(l.add(this.parent,"WidgetBack"),this.createUIPrivate(),this.baseClass&&l.add(this.ui.domNode,this.baseClass)),this.updateUIPrivate())},_appendSortHeader:function(a,b,c,d){a=a.insertCell(-1);for(var h in d)d.hasOwnProperty(h)&&n.set(a,h,d[h]);b=e.create("span",{"class":"SortLink",
innerHTML:b},a);b.onclick=f.hitch(this,this.sortBy,c);q.text(b," ");this.sortTriangles||(this.sortTriangles=[]);this.sortTriangles[c]=e.create("span",{"class":"SortArrow"},b)},sortBy:function(a){this._state.sortDesc=this._state.sortBy==a?!this._state.sortDesc:!1;this._state.sortBy=a;this.updateUIPrivate()},_sortRows:function(a){var b=this._state.sortBy;if(t.isNumber(b)){var c=this._state.sortDesc;a.sort(function(a,e){var d;d=a[b];var f=e[b];d=d>f?c?-1:1:d<f?c?1:-1:0;return d})}},getFeatureTitle:function(a){return this.data.features[a].attributes[this.metadata.name]},
getValueByName:function(a,b){return this.data.features[a].attributes[b]},getValueByIndex:function(a,b){return this.getValueByName(a,this.getFieldByIndex(b).name)},formatByName:function(a,b){return m(this.getFieldByName(b),this.data.features[a].attributes[b])},formatByIndex:function(a,b){var c=this.getFieldByIndex(b);return m(c,this.data.features[a].attributes[c.name])},getDataFields:function(){for(var a=[],b=this.data.fields.length,c=0;c<b;c++){var d=this.data.fields[c].fullName;d&&"AREA_ID"!=d&&
a.push(c)}return a},getFieldByName:function(a){for(var b=this.data.fields.length,c=0;c<b;c++){var d=this.data.fields[c];if(d.name==a)return d}},getFieldByIndex:function(a){return this.data.fields[a]},setState:function(a){f.mixin(this._state,a)},getState:function(a){return this._state?this._state[a]:null}});var x=k(null,{headerClass:null,contentClass:null,footerClass:null,constructor:function(){this.headerClass=["BaseWidget_HeaderPane"];this.contentClass=["BaseWidget_ContentPane"];this.footerClass=
["BaseWidget_FooterPane"]},addHeader:function(a,b){this.header||(this.header=document.createDocumentFragment());return e.create(a,b,this.header)},addContent:function(a,b){this.content||(this.content=document.createDocumentFragment());return e.create(a,b,this.content)},addFooter:function(a,b){this.footer||(this.footer=document.createDocumentFragment());return e.create(a,b,this.footer)},build:function(a){this.border=new v({style:"height: 100%; width: 100%;",gutters:!1});this._append("top",this.header,
this.headerClass);this._append("center",this.content,this.contentClass);this._append("bottom",this.footer,this.footerClass);a.appendChild(this.border.domNode);return this.border},_append:function(a,b,c){if(b){var d;c&&0<c.length&&(d=c.join(" "));this.border.addChild(new w({region:a,content:b,"class":d}))}}});return g});