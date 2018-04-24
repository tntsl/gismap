// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/dijit/analysis/HelpWindow","require dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/event dojo/_base/kernel dojo/aspect dojo/has dojo/dom-construct dojo/dom-class dojo/dom-attr dojo/dom-style dojo/query dojo/window dojo/dom-geometry dijit/_Widget dijit/TooltipDialog dijit/popup ../../kernel ../../lang ../../urlUtils ../../request ../_EventedWidget dojo/i18n!../../nls/jsapi".split(" "),function(m,p,f,g,E,F,h,u,q,G,H,I,v,w,x,y,z,A,l,B,r,C,D,J,t){f=f([z],
{declaredClass:"esri.dijit.analysis.HelpWindow",i18n:null,onlineHelpMap:null,showLearnMore:!1,"class":"esriAnalyisHelpWindow",postMixInProperties:function(){this.inherited(arguments);this.i18n={};g.mixin(this.i18n,t.common);g.mixin(this.i18n,t.analysisHelp)},postCreate:function(){this.inherited(arguments);var b=["ar","he"],a,d;this.onlineHelpMap={};for(a=0;a<b.length;a+=1)d=b[a],h.locale&&-1!==h.locale.indexOf(d)&&(-1!==h.locale.indexOf("-")?-1!==h.locale.indexOf(d+"-")&&(this._isRightToLeft=!0):
this._isRightToLeft=!0);b=m.toUrl("./help/helpmap.json");D({url:b}).then(g.hitch(this,function(a){this.onlineHelpMap=a.map}))},_getAbsoluteUrl:function(b){var a=C.getProtocolForWebResource();if(/^https?\:/i.test(b))return b;if(/^\/\//i.test(b))return a+b;if(/^\//i.test(b))return a+"//"+window.location.host+b},_computeSize:function(b){var a={w:400,h:200};q("esri-mobile")?a={w:"50%",h:"90%"}:-1!==b.indexOf("Category")?(a.w=400,a.h=320):-1!==b.indexOf("Tool")?(a.w=400,a.h=320):-1!==b.indexOf("toolDescription")&&
(a.w=400,a.h=520);return a},_setHelpTopicAttr:function(b){this.tooltipHelpDlg&&(l.close(this.tooltipHelpDlg),this.tooltipHelpDlg.destroy(),this.tooltipHelpDlg=null);var a,d,c,n,k="",e;this.showLearnMore=!1;d=this._analysisGpServer&&-1!==this._analysisGpServer.indexOf("dev")?"dev":this._analysisGpServer&&-1!==this._analysisGpServer.indexOf("qa")?"uat":"";k=this.isPortal?"-PortalOnly":"-OnlineOnly";a=g.clone(h.locale);"nb"===a&&(a="no");c=m.toUrl("esri/dijit/analysis/help/"+this.helpFileName+".html");
e="bigdata"===this.analysisMode?this.helpFileName+"_bd":"raster"===this.analysisMode?this.helpFileName+"_ra":this.helpFileName;r.isDefined(this.onlineHelpMap[e])&&r.isDefined(this.onlineHelpMap[e][b])&&(this.showLearnMore=!0,n="http://doc"+d+".arcgis.com/en/arcgis-online/analyze/"+this.onlineHelpMap[e][b]);-1!==p.indexOf("ar bs cs da de es el et fi fr hi hr id it ja ko lt lv ru nl no pl pt-br pt-pt ro sv sr th tr vi zh-cn zh-hk zh-tw".split(" "),a)&&(-1!==a.indexOf("-")&&(c=a.split("-"),a=c[0]+"-"+
c[1].toUpperCase()),c=m.toUrl("esri/dijit/analysis/help/"+a+"/"+this.helpFileName+".html"));-1!==p.indexOf("ar de es fr it ja ko ru nl pl pt-br ro zh-cn zh-hk zh-tw".split(" "),a)&&this.showLearnMore&&(n="http://doc"+d+".arcgis.com/"+a+"/arcgis-online/analyze/"+this.onlineHelpMap[e][b]);this._size=d=this._computeSize(b);this.tooltipHelpDlg=new A({preload:!0,content:"\x3cdiv class\x3d'' style\x3d'position:relative'\x3cdiv class\x3d'sizer content'\x3e\x3cdiv class\x3d'contentPane'\x3e\x3cdiv class\x3d'esriFloatTrailing' style\x3d'padding:0;'\x3e\x3ca href\x3d'#' class\x3d'esriAnalysisCloseIcon' title\x3d'"+
this.i18n.close+"'\x3e\x3c/a\x3e\x3c/div\x3e\x3ciframe frameborder\x3d'0'  id\x3d'"+b+"' src\x3d'"+c+"#"+b+k+"' width\x3d'"+d.w+"' height\x3d'"+d.h+"' marginheight\x3d'0' marginwidth\x3d'0'\x3e\x3c/iframe\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d'sizer'\x3e\x3cdiv class\x3d'actionsPane'\x3e\x3cdiv class\x3d'actionList"+(this.showLearnMore?"'\x3e":" hidden'\x3e")+"\x3ca class\x3d'action zoomTo' href\x3d'"+(this.showLearnMore?n:"#")+"' target\x3d'_help'\x3e"+this.i18n.learnMore+"\x3c/a\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e",
"class":"esriHelpPopup esriHelpPopupWrapper esriAnalyisHelpWindow"});this.tooltipHelpDlg.startup()},show:function(b,a){this.helpFileName=a.helpFileName;this._analysisGpServer=a.analysisGpServer;this.isPortal=a.isPortal;a.analysisMode&&(this.analysisMode=a.analysisMode);this.set("helpTopic",a.helpId);var d=u.after(l,"open",g.hitch(this,function(){w(".esriAnalysisCloseIcon",this.tooltipHelpDlg.domNode).on("click",g.hitch(this,this.close));d.remove()})),c=b.pageX,h=x.getBox(),k,e,f;f=!1;a.helpParentNode&&
(k=a.helpParentNode);k&&(e=y.position(k));e&&h.w-b.pageX<e.w?(f=!0,c=e.x-this._size.w-10,this._isRightToLeft&&(c-=10)):this._isRightToLeft&&c-40<this._size.w&&(c=e.w+this._size.w+80);l.open({popup:this.tooltipHelpDlg,x:!0===this._isRightToLeft||f?c-40:c+40,y:b.screenY-b.pageY+10,onCancel:g.hitch(this,function(){this.close()}),onExecute:function(){this.close()}});this.tooltipHelpDlg.domNode.parentNode&&v.set(this.tooltipHelpDlg.domNode.parentNode,"overflowY","hidden")},close:function(b,a){l.close(this.tooltipHelpDlg)}});
q("extend-esri")&&g.setObject("dijit.analysis.HelpWindow",f,B);return f});