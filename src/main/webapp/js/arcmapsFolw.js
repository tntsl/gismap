var myMap, extent, CircleQ, SimpleFillSymbolQ, navToolbar, toolbar, PictureMarkerSymbolQ, GraphicQ, InfoTemplateQ, SpatialReferenceQ, dojoQ, identifyTask, identifyTask2, identifyParams, gl, LengthsParametersQ, AreasAndLengthsParametersQ, symbol, dr, gsvc, showPt, measuregeometry, queryQj, queryTaskQj, querySpa, queryOrAdd, normalizeUtilsQ, esriConfigQ, EditQ, eventQ, editToolbarQ, myDynamicMapServiceLayer, arcgisUtilsQ, Chart2DQ;
var app = {};
var lineId = "";
require([ "esri/map", "esri/geometry/Extent", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", "esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
		"esri/symbols/PictureMarkerSymbol", "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/layers/FeatureLayer", "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol",
		"esri/SpatialReference", "esri/InfoTemplate", "esri/graphic", "dojo/_base/Color", "dojo/dom", "dojo/on", "dojo/dom-attr", "esri/tasks/GeometryService", "esri/tasks/LengthsParameters",
		"esri/tasks/AreasAndLengthsParameters", "esri/tasks/query", "esri/tasks/QueryTask", "esri/geometry/normalizeUtils", "esri/config", "esri/toolbars/edit", "dojo/_base/event",
		"esri/arcgis/utils", "esri/dijit/Print", "esri/tasks/PrintTemplate", "dojo/_base/array", "dojo/parser", "dojox/charting/Chart", "dojox/charting/themes/MiamiNice",
		"dojox/charting/action2d/Tooltip", "dojox/charting/action2d/MoveSlice", "dojox/charting/plot2d/Columns", "dojox/charting/axis2d/Default", "dijit/layout/BorderContainer",
		"dijit/layout/ContentPane", "dojo/domReady!", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "dijit/dijit", "esri/dijit/OverviewMap", "esri/toolbars/navigation",
		"esri/tasks/BufferParameters" ], function(Map, Extent, Circle, SimpleFillSymbol, Draw, SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol, Point, GraphicsLayer, FeatureLayer,
		PictureFillSymbol, CartographicLineSymbol, SpatialReference, InfoTemplate, Graphic, Color, dom, on, domAttr, GeometryService, LengthsParameters, AreasAndLengthsParameters, Query, QueryTask,
		normalizeUtils, esriConfig, Edit, event, arcgisUtils, Print, PrintTemplate, arrayUtils, parser, Chart, theme) {
	// 以下对象放入全局
	AreasAndLengthsParametersQ = AreasAndLengthsParameters;
	LengthsParametersQ = LengthsParameters;
	EditQ = Edit;
	eventQ = event;
	dojoQ = dojo;
	PictureMarkerSymbolQ = PictureMarkerSymbol;
	GraphicQ = Graphic;
	InfoTemplateQ = InfoTemplate;
	SpatialReferenceQ = SpatialReference;
	normalizeUtilsQ = normalizeUtils;
	esriConfigQ = esriConfig;
	CircleQ = Circle;
	queryQj = Query;
	querySpa = Query.SPATIAL_REL_CONTAINS;
	QueryTaskQ = QueryTask;
	var showPt = null;

	// 初始化地图
	myMap = new Map("map", {
		zoom : 3,
		logo : false,
		slider : false,
		extent : new Extent({
			xmin : 116.857561,
			ymin : 38.843284,
			xmax : 117.606299,
			ymax : 39.501400,
			spatialReference : {
				wkid : 4490
			}
		})
	});

	// 地图地址
	dLayer = new esri.layers.ArcGISTiledMapServiceLayer(mapservice);
	myMap.addLayer(dLayer);

	// 加载车站和地铁
	myDynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mapservice_l);
	myMap.addLayer(myDynamicMapServiceLayer);
	var stationLayer = new FeatureLayer(mapservice_l + "/2");
	myMap.addLayer(stationLayer);

	// 初始化工具类
	editToolbarQ = new EditQ(myMap);
	toolbar = new esri.toolbars.Draw(myMap);
	navToolbar = new esri.toolbars.Navigation(myMap);

	stationLayer.on("mouse-over", function(evt) {
		var query = new Query();
		var queryTask = new QueryTask(mapservice_l + "/2");
		query.where = "OBJECTID=" + evt.graphic.attributes.OBJECTID;
		query.returnGeometry = true;
		query.outFields = [ "*" ];
		query.outSpatialReference = myMap.spatialReference;
		queryTask.execute(query, function(st) {
			var pointId = st.features[0].attributes.POINTCODE;
			var name = st.features[0].attributes.POINTNAME;
			var x = st.features[0].geometry.x;
			var y = st.features[0].geometry.y;
			var arrival, departure;
			if (pointId == null) {
				return;
			}
			$.get(getparams('ctx') + "/arcmap/stationFlow/findsStationPassengerflowsByStationId/" + pointId + "/", function(msg) {
				if (msg.length == 0)
					return;
				$(msg).each(function(i) {
					if (msg[i].flowType == 1) {
						arrival = msg[i].flow;
					} else {
						departure = msg[i].flow;
					}
				})
				var point = new esri.geometry.Point(x, y, myMap.spatialReference);
				// myMap.infoWindow.setTitle("客流");
				myMap.infoWindow.setContent("<div id=echartsTest  style='height:100px;width:150px;border:1px;'></div>");
				myMap.infoWindow.resize(170, 200);
				myMap.infoWindow.show(point);
				/*
				 * var chartData = [14000,24000]; var chart = new
				 * Chart2D("echartsTest"); chart.addPlot("default", { type:
				 * "Columns",//Bars或者Columns gap: 8 //柱子间的间距 }); chart.ad var
				 * xStr = ["周一","周二"]; // Add axes var myLabelFunc =
				 * function(text, value, precision){ return xStr[text-1]; };
				 * chart.addAxis("x", { labelFunc: myLabelFunc });
				 * //chart.addAxis("y", { vertical:true, fixLower: "major",
				 * fixUpper: "major" }); chart.addSeries("usa",chartData);
				 * chart.render();
				 */
				// Define the data
				var chartData = [ arrival, departure ];
				var xStr = [ "进站", "出站" ];
				var myLabelFunc = function(text, value, precision) {
					return xStr[text - 1];
				};
				// Create the chart within it's "holding" node
				var chart = new Chart("echartsTest");

				// Set the theme
				chart.setTheme(theme);

				// Add the only/default plot
				chart.addPlot("default", {
					type : "Columns",
					markers : true,
					gap : 5
				});

				// Add axes
				chart.addAxis("x", {
					minorTicks : false,
					microTicks : false,
					// minorLabels: false,
					// majorLabels: false,
					labelFunc : myLabelFunc
				});
				chart.addAxis("y", {
					includeZero : true,
					vertical : true,
					minorTicks : false,
					microTicks : false,
					minorLabels : false,
					majorLabels : false
				});

				// Add the series of data
				chart.addSeries("Monthly Sales", chartData);

				// Create the tooltip
				var tip = new dojox.charting.action2d.Tooltip(chart, "default");
				// Create the slice mover
				var mag = new dojox.charting.action2d.MoveSlice(chart, "default");

				// Render the chart!
				chart.render();
			});
		});
	})

	// Geometry服务
	gsvc = new GeometryService(geoService);
	gsvc.on("lengths-complete", outputDistance);
	gsvc.on("areas-and-lengths-complete", outputAreaAndLength);

	// 车站GraphicsLayer
	gl = new GraphicsLayer({
		id : 'gl'
	});
	myMap.addLayer(gl, 0);

	// 地图初始化
	myMap.on("load", mapReady);
	dojo.connect(toolbar, "onDrawEnd", addToMap);

})

var feature;
// 地图初始化加载
function mapReady() {
	gl.on("click", function(evt) {
		eventQ.stop(evt);
		editToolbarQ.activate(EditQ.EDIT_VERTICES | EditQ.MOVE | EditQ.ROTATE | EditQ.SCALE, evt.graphic);
	});
	editToolbarQ.on("graphic-move-stop,rotate-stop,scale-stop,vertex-delete,vertex-move-stop", function(evt) {
		if (evt.graphic.geometry.type == "polyline") {
			dr = "jl"
		}
		;
		if (evt.graphic.geometry.type == "polygon") {
			dr = "mj"
		}
		;
		addToMap(evt.graphic.geometry);
	});

	// 所有父类图片名称（按照sort降序排列）
	var restypeImages = [ "zml", "jjl", "gbqcl", "yjfhl", "ryjzl", "fxun", "fxue", "gwzyqx", "xhzyqx", "gdyj", "txyj", "afcqj", "hkyj" ];
	// 得到所有资源类型的父类
	$.get(getparams('ctx') + "/arcmap/poi/findByParentId/" + 1 + "/", function(msg) {
		var tdStrs = "";
		$(msg).each(
				function(i) {
					tdStrs += "<td><img src='" + getparams('ctxStatic') + "/arcmap/images/restypeImage/" + restypeImages[i] + ".png' style='width:27px;' title='" + msg[i].name + "'"
							+ "onClick=\"showMaterialToMap(" + msg[i].id + ",'" + restypeImages[i] + "')\"";
				});
		$("#leftTools").prepend(tdStrs);
	})

	var query = new esri.tasks.Query();
	var queryTask = new esri.tasks.QueryTask(mapservice_l + "/3");
	query.geometry = myMap.extent;
	query.where = "1=1";
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;
	query.returnGeometry = true;
	query.outFields = [ "*" ];
	queryTask.execute(query, function(lineFeature) {
		feature = lineFeature.features;
		$(feature).each(function(i) {
			lineId += feature[i].attributes.LINEID + ",";
		});
	});
}

// ---断面客流start---
var flowSet = [ 50000, 40000, 30000, 20000 ];
var flowcolor = [ [ 255, 40, 0 ], [ 255, 136, 0 ], [ 247, 255, 0 ], [ 0, 76, 255 ] ];
// 显示断面客流设置
function sectionFlow() {
	document.getElementById("sectionPassenger").style.visibility = "visible";
	saveSet();
}

// 保存断面客流设置
function saveSet() {
	flowSet[0] = $("#response1").val();
	flowSet[1] = $("#response2").val();
	flowSet[2] = $("#response3").val();
	flowSet[3] = $("#response4").val();
	$.post(getparams('ctx') + "/arcmap/sectionFlow/findBySectionLineId", {
		data : lineId
	}, function(msg) {
		console.log(msg);
		changeColor(msg, 0);
	});
}

// 重置断面客流设置
function restoreDefault() {
	$("#response1").val("50000");
	$("#response2").val("40000");
	$("#response3").val("30000");
	$("#response4").val("20000");
}
// ---断面客流end---

// 历史客流
var executionTimes = 1;
var loops = 0;
function historyFlow() {
	document.getElementById("historyFlow").style.visibility = "visible";
}
function saveHistorySet() {
	var beginDate = $("#beginDate").val();
	var endDate = $("#endDate").val();
	var date = beginDate + "," + endDate;
	var time = $("#totalTime").val();
	$.post(getparams('ctx') + "/arcmap/sectionFlow/getFlowByDate", {
		data : date,
		lineId : lineId
	}, function(msg) {
		if (msg.length == 0)
			return;
		var len = msg[0].length;
		if (len == 1) {
			changeColor(msg, 0);
		} else {
			var interval = (time * 60) / (len - 1);
			if (interval > 3) {
				changeColor(msg, 0);
				loops = setInterval(function() {
					changeColor(msg, executionTimes);
				}, interval * 1000);
			}
		}
	})
}

// 断面改变颜色
function changeColor(msg, k) {
	if (k > 0) {
		if (msg[0].length == k) {
			clearInterval(loops);
			executionTimes = 1;
			return;
		}
	}
	for (var i = 0; i < msg.length; i++) {
		for (var j = 0; j < feature.length; j++) {
			if (feature[j].attributes.LINEID == msg[i][k].lineId) {
				var flow = msg[i][k].flow;
				var geometry = feature[j].geometry;
				var symbol;
				if (flow < flowSet[3]) {// 当客流量小于Ⅳ级响应时，显示绿色
					symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([ 0, 255, 119 ]), 3);
				} else if (flow > flowSet[3] && flow <= flowSet[2]) {// 当客流量大于Ⅳ级响应小于Ⅲ级响应时，显示蓝色
					symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(flowcolor[3]), 3);
				} else if (flow > flowSet[2] && flow <= flowSet[1]) {// 当客流量大于Ⅲ级响应小于Ⅱ级响应时，显示黄色
					symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(flowcolor[2]), 3);
				} else if (flow > flowSet[1] && flow <= flowSet[0]) {// 当客流量大于Ⅱ级响应小于Ⅰ级响应时，显示橙色
					symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(flowcolor[1]), 3);
				} else {// 当客流量大于Ⅰ级响应时，显示红色
					symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(flowcolor[0]), 3);
				}
				var graphic = new esri.Graphic(geometry, symbol);
				myMap.graphics.add(graphic);
			}
		}
	}
	executionTimes++;
}

// 重置断面客流设置
function restoreDefault() {
	$("#response1").val("50000");
	$("#response2").val("40000");
	$("#response3").val("30000");
	$("#response4").val("20000");
}
// ---断面客流end---
// ShowType=1则是从左到右，0则是从右到左
function ShowMark(tittlestr, contentstr, toppar, leftpar, ShowType) {
	$("#stationHT").html(tittlestr);
	$(".infoTemplateTB").html(contentstr);
	$(".infoTemplate").css("top", toppar);
	if (ShowType == 1) {
		$(".infoTemplate").css("left", leftpar);
	} else {
		$(".infoTemplate").css("left", $(window).width() - parseInt($(".infoTemplate").css("width")) - leftpar);
	}
	$(".infoTemplate").show();
}
//通过资源父类ID查询子类
function showMaterialToMap(id, img) {
	var showMerTbodyHtml = "";
	$.get(getparams('ctx') + "/arcmap/poi/findByParentId/" + id + "/", function(msg) {
		$(msg).each(
				function(i) {
					showMerTbodyHtml += "<tr><td><input type='checkbox' id='material" + msg[i].id + "' name='material' onclick=showMatToMap('" + img + "') value='" + msg[i].id + "'></td><td>" + msg[i].name
							+ "</td></tr>";
				});
		$("#showMerTbody").html(showMerTbodyHtml);
		showresult();
		var showAble=document.getElementById("showMer").style.visibility;
		if("hidden"===showAble){
			document.getElementById("showMer").style.visibility = "visible";
		}else
		document.getElementById("showMer").style.visibility = "hidden";
	});
}
//点击资源子类，查询相关联车站，工区等，地图显示分布（用父类图标），右侧显示列表
function showMatToMap(img) {
	var html = "";
	$.ajaxSettings.async = false;
	$("input[name='material']:checked").each(
			function() {
				$.get(getparams('ctx') + "/arcmap/poi/findbyRestypeId/" + $(this).val() + "/", function(msg) {
					if (msg.length == 0) {
						return;
					}
					$(msg).each(
							function(i) {
								$.get(getparams('ctx') + "/arcmap/line/getStation/" + msg[i].station.id, function(stations) {
									$(stations).each(function(){
										var station=this;
										var point = new esri.geometry.Point(station.x, station.y, new esri.SpatialReference({
											wkid : 4490
										}));
										var symbol = new esri.symbol.PictureMarkerSymbol(getparams('ctxStatic') + "/arcmap/images/restypeImage/" + img + ".png", 20, 20);
										var graphic = new esri.Graphic(point, symbol);
										graphic.attributes = "cz";
										myMap.graphics.add(graphic);
										html += "<tr style='font-weight: bold;background-color:#cbfed0;cursor:hand;'><td>站点名称：</td><td>" + msg[i].station.name + "<img src='"+getparams('ctxStatic') + "/arcmap/images/icon/phone.png"+"' onclick='callMobile(\""+msg[i].personMobile+"\")' style='float:right;margin-right:5px;'/></td>" + "<input type='hidden' value='"
												+ station.x + "," + station.y + "'>" + "</tr>";
										html += "<tr><td><div>资源名称：" + isnull(msg[0].restypeId.name) + "</div><div>型号：" + isnull(msg[i].model) + "</div><div>数量：" + isnull(msg[i].amount) + "</div></td>";
										html += "<td><div>负责人：" + isnull(msg[i].personName) + "</div><div>电话：" + isnull(msg[i].personMobile) + "</div></td></tr>";
									});
								},"json");
							});
				}, "json");
				$.ajaxSettings.async = true;
			})
	$("#showMerByGeoContent").html(html);
	showresult();
	$("#myTab a").eq(0).tab("show");
	document.getElementById("cxtc").style.visibility = "visible";
	$("#showMerByGeoContent tr").click(function() {
		var coordinate=$(this).find("input").val();
		if(coordinate&&coordinate!=""){
			var x = coordinate.split(",")[0] * 1;
			var y = coordinate.split(",")[1] * 1;
			FlyToXY(x, y, 7);
			drawAnnotate(x, y);
		}
	});
}
//""|无
function isEmpty(sts) {
	if (sts == "") {
		return "无";
	} else {
		return sts;
	}
}

// ""|null
function isnull(sts) {
	if (sts == null) {
		return "";
	} else {
		return sts;
	}
}