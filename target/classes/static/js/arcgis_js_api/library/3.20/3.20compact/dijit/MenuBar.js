//>>built
require({cache:{"url:dijit/templates/MenuBar.html":'\x3cdiv class\x3d"dijitMenuBar dijitMenuPassive" data-dojo-attach-point\x3d"containerNode" role\x3d"menubar" tabIndex\x3d"${tabIndex}"\r\n\t \x3e\x3c/div\x3e\r\n'}});
define("dijit/MenuBar",["dojo/_base/declare","dojo/keys","./_MenuBase","dojo/text!./templates/MenuBar.html"],function(c,d,e,f){return c("dijit.MenuBar",e,{templateString:f,baseClass:"dijitMenuBar",popupDelay:0,_isMenuBar:!0,_orient:["below"],_moveToPopup:function(a){if(this.focusedChild&&this.focusedChild.popup&&!this.focusedChild.disabled)this.onItemClick(this.focusedChild,a)},focusChild:function(a){this.inherited(arguments);this.activated&&a.popup&&!a.disabled&&this._openItemPopup(a,!0)},_onChildDeselect:function(a){this.currentPopupItem==
a&&(this.currentPopupItem=null,a._closePopup());this.inherited(arguments)},_onLeftArrow:function(){this.focusPrev()},_onRightArrow:function(){this.focusNext()},_onDownArrow:function(a){this._moveToPopup(a)},_onUpArrow:function(){},onItemClick:function(a,b){!a.popup||!a.popup.isShowingNow||/^key/.test(b.type)&&b.keyCode===d.DOWN_ARROW?this.inherited(arguments):(a.focusNode.focus(),this._cleanUp(!0))}})});