// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/SpriteSource","require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper dojo/Deferred dojo/promise/all ../../request ../../kernel ../../core/promiseUtils".split(" "),function(q,r,t,u,l,m,n,h,p){return function(){function f(c,b){this.baseURL=c;this.devicePixelRatio=b;this._isRetina=!1;this._spritesData={};this.height=this.width=this.image=null;this.loadStatus="not-loaded"}f.prototype.getSpritePosition=function(c){return this._spritesData[c]};
f.prototype.load=function(){var c=this;this.loadStatus="loading";return this.baseURL?this._loadSprites().then(function(){c.loadStatus="loaded";return c}).otherwise(function(b){c.loadStatus="failed";return c}):p.resolve(this)};f.prototype._loadSprites=function(){var c=this;this._isRetina=1.15<this.devicePixelRatio?!0:!1;var b=this.baseURL,g=this._isRetina?"@2x":"",f=n(b+g+".json",{callbackParamName:"callback",responseType:"json"}).then(function(a){c._spritesData=a.data}),k=new l,d=new Image;d.crossOrigin=
"anonymous";d.onload=function(){d.onload=null;c.width=d.width;c.height=d.height;var a=document.createElement("canvas");a.width=d.width;a.height=d.height;a=a.getContext("2d");a.drawImage(d,0,0,d.width,d.height);for(var a=a.getImageData(0,0,d.width,d.height),a=new Uint8Array(a.data),b,e=0;e<a.length;e+=4)b=a[e+3]/255,a[e]*=b,a[e+1]*=b,a[e+2]*=b;c.image=a;k.resolve()};b=""+b+g+".png";h.id&&(g=h.id.findCredential(b))&&g.token&&(b+="?token\x3d"+g.token);d.src=b;return m([f,k.promise])};return f}()});