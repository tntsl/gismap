//>>built
define("dojox/gauges/AnalogArrowIndicator",["dojo/_base/declare","./AnalogIndicatorBase"],function(h,k){return h("dojox.gauges.AnalogArrowIndicator",[k],{_getShapes:function(d){if(!this._gauge)return null;var e=this.color?this.color:"black",f={color:this.strokeColor?this.strokeColor:e,width:1};this.color.type&&!this.strokeColor&&(f.color=this.color.colors[0].color);var a=Math.floor(this.width/2),b=5*this.width,g=this.width&1,c=[];c[0]=d.createPolyline([{x:-a,y:0},{x:-a,y:-this.length+b},{x:-2*a,y:-this.length+
b},{x:0,y:-this.length},{x:2*a+g,y:-this.length+b},{x:a+g,y:-this.length+b},{x:a+g,y:0},{x:-a,y:0}]).setStroke(f).setFill(e);c[1]=d.createLine({x1:-a,y1:0,x2:-a,y2:-this.length+b}).setStroke({color:this.highlight});c[2]=d.createLine({x1:-a-3,y1:-this.length+b,x2:0,y2:-this.length}).setStroke({color:this.highlight});c[3]=d.createCircle({cx:0,cy:0,r:this.width}).setStroke(f).setFill(e);return c}})});