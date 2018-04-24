// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.20/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/core/pbf",["require","exports"],function(g,h){return function(){function b(a,c,b,d){this._tag=0;this._dataType=99;this._data=a;this._dataView=c;this._pos=b||0;this._end=d||a.byteLength}b.prototype.clone=function(){return new b(this._data,this._dataView,this._pos,this._end)};b.prototype.next=function(a){for(;;){if(this._pos===this._end)return!1;var c=this._decodeVarint();this._tag=c>>3;this._dataType=c&7;if(!a||a===this._tag)break;this.skip()}return!0};b.prototype.empty=
function(){return this._pos>=this._end};b.prototype.tag=function(){return this._tag};b.prototype.getInt32=function(){return this._decodeVarint()};b.prototype.getInt64=function(){return this._decodeVarint()};b.prototype.getUInt32=function(){return this._decodeVarint()};b.prototype.getUInt64=function(){return this._decodeVarint()};b.prototype.getSInt32=function(){return this._decodeSVarint()};b.prototype.getSInt64=function(){return this._decodeSVarint()};b.prototype.getBool=function(){var a=0!==this._data[this._pos];
this._skip(1);return a};b.prototype.getEnum=function(){return this._decodeVarint()};b.prototype.getFixed64=function(){var a=this._dataView,c=this._pos,a=a.getUint32(c,!0)+4294967296*a.getUint32(c+4,!0);this._skip(8);return a};b.prototype.getSFixed64=function(){var a=this._dataView,c=this._pos,a=a.getUint32(c,!0)+4294967296*a.getInt32(c+4,!0);this._skip(8);return a};b.prototype.getDouble=function(){var a=this._dataView.getFloat64(this._pos,!0);this._skip(8);return a};b.prototype.getFixed32=function(){var a=
this._dataView.getUint32(this._pos,!0);this._skip(4);return a};b.prototype.getSFixed32=function(){var a=this._dataView.getInt32(this._pos,!0);this._skip(4);return a};b.prototype.getFloat=function(){var a=this._dataView.getFloat32(this._pos,!0);this._skip(4);return a};b.prototype.getString=function(){var a=this._getLength(),c=this._pos,c=this._toString(this._data,c,c+a);this._skip(a);return c};b.prototype.getBytes=function(){var a=this._getLength(),c=this._pos,c=this._toBytes(this._data,c,c+a);this._skip(a);
return c};b.prototype.getMessage=function(){var a=this._getLength(),c=this._pos,c=new b(this._data,this._dataView,c,c+a);this._skip(a);return c};b.prototype.skip=function(){switch(this._dataType){case 0:this._decodeVarint();break;case 1:this._skip(8);break;case 2:this._skip(this._getLength());break;case 5:this._skip(4);break;default:throw Error("Invalid data type!");}};b.prototype._skip=function(a){if(this._pos+a>this._end)throw Error("Attempt to skip past the end of buffer!");this._pos+=a};b.prototype._decodeVarint=
function(){var a=this._data,c=this._pos,b=0,d;if(10<=this._end-c){if(d=a[c++],b|=d&127,0!==(d&128)&&(d=a[c++],b|=(d&127)<<7,0!==(d&128)&&(d=a[c++],b|=(d&127)<<14,0!==(d&128)&&(d=a[c++],b|=(d&127)<<21,0!==(d&128)&&(d=a[c++],b+=268435456*(d&127),0!==(d&128)&&(d=a[c++],b+=34359738368*(d&127),0!==(d&128)&&(d=a[c++],b+=4398046511104*(d&127),0!==(d&128)&&(d=a[c++],b+=562949953421312*(d&127),0!==(d&128)&&(d=a[c++],b+=72057594037927936*(d&127),0!==(d&128)&&(d=a[c++],b+=0x7fffffffffffffff*(d&127),0!==(d&128)))))))))))throw Error("Varint too long!");
}else{for(var e=1;c!==this._end;){d=a[c];if(0===(d&128))break;++c;b+=(d&127)*e;e*=128}if(c===this._end)throw Error("Varint overrun!");++c;b+=d*e}this._pos=c;return b};b.prototype._decodeSVarint=function(){var a=this._decodeVarint();return a%2?-(a+1)/2:a/2};b.prototype._getLength=function(){if(2!==this._dataType)throw Error("Not a delimited data type!");return this._decodeVarint()};b.prototype._toString=function(a,c,b){var d="",e="";for(b=Math.min(this._end,b);c<b;++c){var f=a[c];f&128?e+="%"+f.toString(16):
(d+=decodeURIComponent(e)+String.fromCharCode(f),e="")}e.length&&(d+=decodeURIComponent(e));return d};b.prototype._toBytes=function(a,b,f){f=Math.min(this._end,f);return new Uint8Array(a.buffer,b,f-b)};return b}()});