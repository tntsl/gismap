// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/dijit/analysis/templates/DeriveNewLocations.html":'\x3cdiv class\x3d"esriAnalysis"\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" style\x3d"margin-top:0.5em; margin-bottom: 0.5em;"\x3e\r\n      \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentTitle" class\x3d"analysisTitle"\x3e\r\n        \x3ctable class\x3d"esriFormTable" \x3e \r\n          \x3ctr\x3e\r\n            \x3ctd class\x3d"esriToolIconTd"\x3e\x3cdiv class\x3d"findNewLocationsIcon"\x3e\x3c/div\x3e\x3c/td\x3e\r\n            \x3ctd class\x3d"esriAlignLeading esriAnalysisTitle" data-dojo-attach-point\x3d"_toolTitle"\x3e\r\n              \x3clabel data-dojo-attach-point\x3d"_titleLbl"\x3e${i18n.deriveNewLocations}\x3c/label\x3e\r\n              \x3cnav class\x3d"breadcrumbs"  data-dojo-attach-point\x3d"_analysisModeLblNode" style\x3d"display:none;"\x3e\r\n                \x3ca href\x3d"#" class\x3d"crumb" style\x3d"font-size:12px;" data-dojo-attach-event\x3d"onclick:_handleModeCrumbClick" data-dojo-attach-point\x3d"_analysisModeCrumb"\x3e\x3c/a\x3e\r\n                \x3ca href\x3d"#" class\x3d"crumb is-active" data-dojo-attach-point\x3d"_analysisTitleCrumb" style\x3d"font-size:16px;"\x3e${i18n.deriveNewLocations}\x3c/a\x3e\r\n              \x3c/nav\x3e               \r\n            \x3c/td\x3e\r\n            \x3ctd\x3e\r\n              \x3cdiv class\x3d"esriFloatTrailing" style\x3d"padding:0;"\x3e\r\n                  \x3cdiv class\x3d"esriFloatLeading"\x3e\r\n                    \x3ca href\x3d"#" class\x3d\'esriFloatLeading helpIcon\' esriHelpTopic\x3d"toolDescription"\x3e\x3c/a\x3e\r\n                  \x3c/div\x3e\r\n                  \x3cdiv class\x3d"esriFloatTrailing"\x3e\r\n                    \x3ca href\x3d"#" data-dojo-attach-point\x3d"_closeBtn" title\x3d"${i18n.close}" class\x3d"esriAnalysisCloseIcon"\x3e\x3c/a\x3e\r\n                  \x3c/div\x3e              \r\n              \x3c/div\x3e                \r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n        \x3c/table\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv style\x3d"clear:both; border-bottom: #CCC thin solid; height:1px;width:100%;"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"_form" readOnly\x3d"true"\x3e\r\n       \x3ctable class\x3d"esriFormTable"  data-dojo-attach-point\x3d"_aggregateTable"  style\x3d"border-collapse:collapse;border-spacing:5px;" cellpadding\x3d"5px" cellspacing\x3d"5px"\x3e \r\n         \x3ctbody\x3e\r\n          \x3ctr data-dojo-attach-point\x3d"_analysisLabelRow" style\x3d"display:none;"\x3e\r\n            \x3ctd colspan\x3d"2" style\x3d"padding-bottom:0;"\x3e\r\n              \x3clabel class\x3d"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.oneLabel}\x3c/label\x3e\r\n              \x3clabel class\x3d"esriAnalysisStepsLabel"\x3e${i18n.analysisLayerLabel}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"shortTextInput" style\x3d"padding-bottom:0;"\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"analysisLayer"\x3e\x3c/a\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e           \r\n          \x3ctr data-dojo-attach-point\x3d"_selectAnalysisRow" style\x3d"display:none;"\x3e\r\n            \x3ctd  colspan\x3d"3" style\x3d"padding-top:0;"\x3e\r\n              \x3cselect class\x3d"esriLeadingMargin1 longInput esriLongLabel"  style\x3d"margin-top:1.0em;" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-point\x3d"_analysisSelect" data-dojo-attach-event\x3d"onChange:_handleAnalysisLayerChange"\x3e\x3c/select\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"2"\x3e\r\n              \x3clabel class\x3d"esriFloatLeading  esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.oneLabel}\x3c/label\x3e\r\n              \x3clabel data-dojo-attach-point\x3d"_findExpLabel" class\x3d"esriAnalysisStepsLabel"\x3e${i18n.findExpLabel}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"shortTextInput"\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"Expression"\x3e\x3c/a\x3e\r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e           \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" style\x3d"padding:1px" data-dojo-attach-point\x3d"_expressionGridTd"\x3e\r\n            \x3c/td\x3e    \r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3" class\x3d"clear"\x3e\x3c/td\x3e\r\n          \x3c/tr\x3e\r\n           \r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"2"\x3e\r\n              \x3clabel class\x3d"esriFloatLeading esriTrailingMargin025 esriAnalysisNumberLabel"\x3e${i18n.twoLabel}\x3c/label\x3e\r\n              \x3clabel class\x3d"esriAnalysisStepsLabel"\x3e${i18n.outputLayerLabel}\x3c/label\x3e\r\n            \x3c/td\x3e\r\n            \x3ctd class\x3d"shortTextInput"\x3e\r\n              \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' esriHelpTopic\x3d"OutputName"\x3e\x3c/a\x3e \r\n            \x3c/td\x3e             \r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3"\x3e\r\n              \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" class\x3d"esriLeadingMargin1 longInput" data-dojo-props\x3d"trim:true,required:true" data-dojo-attach-point\x3d"_outputLayerInput" value\x3d""\x3e\x3c/input\x3e\r\n            \x3c/td\x3e                \r\n          \x3c/tr\x3e\r\n          \x3ctr\x3e\r\n            \x3ctd colspan\x3d"3"\x3e\r\n               \x3cdiv class\x3d"esriLeadingMargin1" data-dojo-attach-point\x3d"_chooseFolderRow"\x3e\r\n                 \x3clabel style\x3d"width:9px;font-size:smaller;"\x3e${i18n.saveResultIn}\x3c/label\x3e\r\n                 \x3cinput class\x3d"longInput esriFolderSelect" data-dojo-attach-point\x3d"_webMapFolderSelect" dojotype\x3d"dijit/form/FilteringSelect" trim\x3d"true"\x3e\x3c/input\x3e\r\n               \x3c/div\x3e              \r\n            \x3c/td\x3e\r\n          \x3c/tr\x3e\r\n        \x3c/tbody\x3e         \r\n       \x3c/table\x3e\r\n     \x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentButtons" style\x3d"padding:5px;margin-top:5px;border-top:solid 1px #BBB;"\x3e\r\n      \x3cdiv class\x3d"esriExtentCreditsCtr"\x3e\r\n        \x3ca class\x3d"esriFloatTrailing esriSmallFont"  href\x3d"#" data-dojo-attach-point\x3d"_showCreditsLink" data-dojo-attach-event\x3d"onclick:_handleShowCreditsClick"\x3e${i18n.showCredits}\x3c/a\x3e\r\n       \x3clabel data-dojo-attach-point\x3d"_chooseExtentDiv" class\x3d"esriSelectLabel esriExtentLabel"\x3e\r\n         \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"_useExtentCheck" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"checked:true" name\x3d"extent" value\x3d"true"/\x3e\r\n           ${i18n.useMapExtent}\r\n       \x3c/label\x3e\r\n      \x3c/div\x3e\r\n      \x3cbutton data-dojo-type\x3d"dijit/form/Button" type\x3d"submit" data-dojo-attach-point\x3d"_saveBtn" style\x3d"margin-top:10px;" class\x3d"esriLeadingMargin2 esriAnalysisSubmitButton" data-dojo-attach-event\x3d"onClick:_handleSaveBtnClick"\x3e\r\n          ${i18n.runAnalysis}\r\n      \x3c/button\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv data-dojo-type\x3d"dijit/Dialog" title\x3d"${i18n.creditTitle}" data-dojo-attach-point\x3d"_usageDialog" style\x3d"width:40em;"\x3e\r\n      \x3cdiv data-dojo-type\x3d"esri/dijit/analysis/CreditEstimator"  data-dojo-attach-point\x3d"_usageForm"\x3e\x3c/div\x3e\r\n    \x3c/div\x3e    \r\n  \x3c/div\x3e\r\n'}});
define("esri/dijit/analysis/DeriveNewLocations","require dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/has dojo/json dojo/string dojo/dom-style dojo/dom-attr dojo/dom-construct dojo/query dojo/dom-class dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/_OnDijitClickMixin dijit/_FocusMixin dijit/registry dijit/form/Button dijit/form/CheckBox dijit/form/Form dijit/form/Select dijit/form/TextBox dijit/form/ValidationTextBox dijit/layout/ContentPane dijit/form/FilteringSelect dijit/Dialog ../../kernel ../../lang ./AnalysisBase ./_AnalysisOptions ./utils ./CreditEstimator ./ExpressionGrid dojo/i18n!../../nls/jsapi dojo/text!./templates/DeriveNewLocations.html".split(" "),
function(g,q,b,h,m,e,r,F,n,c,G,t,k,u,v,w,x,y,z,H,I,J,K,L,M,N,O,P,Q,A,R,B,C,f,S,D,p,E){g=q([v,w,x,y,z,C,B],{declaredClass:"esri.dijit.analysis.DeriveNewLocations",templateString:E,widgetsInTemplate:!0,i18n:null,toolName:"DeriveNewLocations",helpFileName:"DeriveNewLocations",resultParameter:"resultLayer",primaryActionButttonClass:"esriAnalysisSubmitButton",analysisLayer:null,inputLayers:[],constructor:function(a){this._pbConnects=[];a.containerNode&&(this.container=a.containerNode)},destroy:function(){this.inherited(arguments);
h.forEach(this._pbConnects,m.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);b.mixin(this.i18n,p.deriveNewLocations);b.mixin(this.i18n,p.expressionGrid)},postCreate:function(){this.inherited(arguments);u.add(this._form.domNode,"esriSimpleForm");this._outputLayerInput.set("validator",b.hitch(this,this.validateServiceName));this._buildUI()},startup:function(){},_onClose:function(a){a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:a})},
_handleSaveBtnClick:function(){if(this._form.validate()&&this.expressionGrid.validate()){this._saveBtn.set("disabled",!0);var a={},b={},d,c;c=this.expressionGrid.get("expressionMap");a.expressions=e.toJson(c.expressions);d=[];d=h.map(c.inputLayers,function(a){return this.constructAnalysisInputLyrObj(a)},this);a.inputLayers=e.toJson(d);this.returnFeatureCollection||(a.OutputName=e.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}}));this.showChooseExtent&&this._useExtentCheck.get("checked")&&
(a.context=e.toJson({extent:this.map.extent._normalize(!0)}));this.returnFeatureCollection&&(d={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(d.extent=this.map.extent._normalize(!0)),a.context=e.toJson(d));b.jobParams=a;a=this.i18n.itemDescription;a+="\x3cdiv\x3e\x3ci\x3e\x3cu\x3e"+this.i18n.expression+"\x3c/u\x3e "+c.expressionString+"\x3c/i\x3e\x3c/div\x3e";b.itemParams={description:a,tags:n.substitute(this.i18n.itemTags,{analysisLayerName:this.analysisLayer.name}),
snippet:this.i18n.itemSnippet};this.showSelectFolder&&(b.itemParams.folder=this.get("folderId"));this.execute(b)}},_handleShowCreditsClick:function(a){a.preventDefault();a={};var l,d;this._form.validate()&&this.expressionGrid.validate()?(c.set(this._showCreditsLink,"color",""),c.set(this._showCreditsLink,"cursor",""),l=this.expressionGrid.get("expressionMap"),a.expressions=e.toJson(l.expressions),d=[],d=h.map(l.inputLayers,function(a){return this.constructAnalysisInputLyrObj(a)},this),a.inputLayers=
e.toJson(d),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=e.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,a).then(b.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()}))):(c.set(this._showCreditsLink,"color","grey"),c.set(this._showCreditsLink,"cursor","default"))},_save:function(){},_buildUI:function(){var a=!0;this.signInPromise.then(b.hitch(this,f.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer}));
this.get("showSelectAnalysisLayer")&&(!this.get("analysisLayer")&&this.get("analysisLayers")&&this.set("analysisLayer",this.analysisLayers[0]),f.populateAnalysisLayers(this,"analysisLayer","analysisLayers"));f.addReadyToUseLayerOption(this,[this._analysisSelect]);this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),a=!1);this._updateAnalysisLayerUI(a);c.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(b.hitch(this,
function(a){this.folderStore=a;f.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}));c.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none");c.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none");this._loadConnections()},_updateAnalysisLayerUI:function(a){this.analysisLayer&&(a&&(this.outputLayerName=n.substitute(this.i18n.outputLayerName,
{analysisLayerName:this.analysisLayer.name})),this._outputLayerInput.set("value",this.outputLayerName));this.expressionGrid||(this.expressionGrid=new D({analysisLayer:this.analysisLayer,inputLayers:this.inputLayers,allowAllInputOperands:!0,primaryActionButttonClass:this.get("primaryActionButttonClass"),showReadyToUseLayers:this.get("showReadyToUseLayers"),owningWidget:this},t.create("div",{style:"width:100%;"},this._expressionGridTd)),this._updateHandle=this.expressionGrid.on("update-expressions",
b.hitch(this,this._handleUpdateExpressions)))},_handleUpdateExpressions:function(a){1<a.length?(c.set(this._showCreditsLink,"color",""),c.set(this._showCreditsLink,"cursor","")):(c.set(this._showCreditsLink,"color","grey"),c.set(this._showCreditsLink,"cursor","default"))},_handleAnalysisLayerChange:function(a){"browse"===a?this.showReadyToUseLayersDialog(!0):"browselayers"===a?(this.showGeoAnalyticsParams&&(k=this._browseLyrsdlg.browseItems.get("query"),k.types.push('type:"Big Data File Share"'),
this._browseLyrsdlg.browseItems.set("query",k)),this._isAnalysisSelect=!0,this._browseLyrsdlg.show()):(this.analysisLayer=this.analysisLayers[a],this._updateAnalysisLayerUI(!0))},showReadyToUseLayersDialog:function(a){this.signInPromise.then(b.hitch(this,function(){this._browsedlg&&(this._isAnalysisSelect=a,this._browsedlg.show())}))},_handleBrowseItemsSelect:function(a){a&&a.selection&&f.addAnalysisReadyLayer({item:a.selection,layers:this.inputLayers,layersSelect:this.layersSelect,browseDialog:a.dialog||
this._browsedlg,widget:this}).always(b.hitch(this,function(){this._isAnalysisSelect&&(this.analysisLayer=this.inputLayers[this.layersSelect.get("value")],this.showSelectAnalysisLayer&&this._updateAnalysisLayerUI(!0))}))},_loadConnections:function(){this.on("start",b.hitch(this,"_onClose",!0));this._connect(this._closeBtn,"onclick",b.hitch(this,"_onClose",!1))},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",
a)},_setInputLayersAttr:function(a){this.inputLayers=a},_getInputLayersAttr:function(){return this.inputLayers},_setAnalysisLayerAttr:function(a){this.analysisLayer=a},_getAnalysisLayerAttr:function(){return this.analysisLayer},_setAnalysisLayersAttr:function(a){this.analysisLayers=a},validateServiceName:function(a){return f.validateServiceName(a,{textInput:this._outputLayerInput})},_setPrimaryActionButttonClassAttr:function(a){this.primaryActionButttonClass=a},_getPrimaryActionButttonClassAttr:function(){return this.primaryActionButttonClass},
_connect:function(a,b,c){this._pbConnects.push(m.connect(a,b,c))}});r("extend-esri")&&b.setObject("dijit.analysis.DeriveNewLocations",g,A);return g});