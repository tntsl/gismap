//---onDrawStart---绘制图形结束后执行回调
function addToMap(geometry) {
	// 更加类型设置显示样式
	measuregeometry = geometry;
	// myMap.graphics.clear();
	if (dr == "circle") {
		var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 3, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,
				0, 0]), 1), new esri.Color([0, 255, 0, 0.25]));
		var graphic = new esri.Graphic(geometry, symbol);
		myMap.graphics.add(graphic);
		myMap.infoWindow.setTitle("请输入测量需要的半径");
		myMap.infoWindow
				.setContent("<table><tr><td style='color:white;'>半径：</td><td style='color:white;'><input type='text' style='width:80px;color:black;' id='radius'>千米</td><td><input type='button' onclick='radiusquery("
						+ geometry.x + "," + geometry.y + ")' value='确定'></td></tr>");
		myMap.infoWindow.show(geometry);
	} else if (dr == "cx") {
		showBuffer(geometry);
		queryWorkArea(geometry);
		queryRescueTeam(geometry);
		var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, null, new dojo.Color([255, 0, 0, 0.15]));
		var graphic = new esri.Graphic(geometry, symbol);
		myMap.graphics.add(graphic);
	} else if (dr == "jl" || dr == "mj") {
		myMap.setMapCursor("default");
		switch (geometry.type) {
			case "polyline" : {
				toolOrCom = "tool";
				var length = geometry.paths[0].length;
				showPt = new esri.geometry.Point(geometry.paths[0][length - 1], new esri.SpatialReference({
					wkid : 4490
				}));
				var lengthParams = new LengthsParametersQ();
				lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
				lengthParams.polylines = [geometry];
				gsvc.lengths(lengthParams);
				var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2);
				break;
			}
			case "polygon" : {
				showPt = new esri.geometry.Point(geometry.rings[0][0], new esri.SpatialReference({
					wkid : 4490
				}));
				var areasAndLengthParams = new AreasAndLengthsParametersQ();
				areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
				areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_KILOMETERS;
				areasAndLengthParams.calculationType = "geodesic";
				gsvc.simplify([geometry], function(simplifiedGeometries) {
					areasAndLengthParams.polygons = simplifiedGeometries;
					gsvc.areasAndLengths(areasAndLengthParams);
				});
				var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_NONE, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,
						0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
				break;
			}
		}
		var graphic = new esri.Graphic(geometry, symbol);
		gl.add(graphic);
		toolbar.deactivate();
		dr = "";
	} else {
		var symbol = new esri.symbol.SimpleFillSymbol();
		var graphic = new esri.Graphic(geometry, symbol);
		gl.add(graphic);
		toolbar.deactivate();
	}
}
// ---onDrawEnd---

// 显示测量距离
function outputDistance(result) {
	if (toolOrCom == "com") {
		var diameter = (result.result.lengths * 1).toFixed();
		var radius = diameter / 2 + circleRadius;
		var point = new esri.geometry.Point(circleX, circleY, myMap.spatialReference);
		var symbolPoint = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/SelPoint.gif", 30, 30);
		var graphicPoint = new esri.Graphic(point, symbolPoint);
		myMap.graphics.add(graphicPoint);
		var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, null, new dojo.Color([255, 0, 0, 0.15]));
		var circle = new esri.geometry.Circle(point, {
			"radius" : radius
		});
		var graphic = new esri.Graphic(circle, symbol);
		myMap.graphics.add(graphic);
		myMap.centerAndZoom(point, 7);
		showBufferCommand(circle);
		queryStationByGeometry(circle);
	} else if (toolOrCom == "tool") {
		var CurX = measuregeometry.paths[0][measuregeometry.paths[0].length - 1][0];
		var CurY = measuregeometry.paths[0][measuregeometry.paths[0].length - 1][1];
		var CurPos = new esri.geometry.Point(CurX, CurY, myMap.spatialReference);
		myMap.infoWindow.setTitle("距离测量");
		myMap.infoWindow.setContent(" 测 量 长 度 ： <strong>" + (result.result.lengths * 1).toFixed(3) + "千米</strong>");
		myMap.infoWindow.show(CurPos);
	}
}

// 显示测量面积
function outputAreaAndLength(result) {
	var CurX = (measuregeometry.cache._extent.xmax + measuregeometry.cache._extent.xmin) / 2;
	var CurY = (measuregeometry.cache._extent.ymax + measuregeometry.cache._extent.ymin) / 2
	var CurPos = new esri.geometry.Point(CurX, CurY, myMap.spatialReference);
	myMap.infoWindow.setTitle("面积测量");
	myMap.infoWindow.setContent(" 面积 ： <strong>" + (result.result.areas * 1).toFixed(3) + "平方千米</strong><br/> 周长： <strong>" + (result.result.lengths * 1).toFixed(3) + "千米</strong>");
	myMap.infoWindow.show(CurPos);
}

// 划圆查询区域内消防队、公安局、医院
function showBuffer(geometries) {
	var query = new esri.tasks.Query();
	var queryTask = new esri.tasks.QueryTask(customService + "/4");
	query.geometry = geometries;
	query.where = "Ctype='消防队'or Ctype='公安警察' or Ctype='综合医院'";
	query.returnGeometry = true;
	query.outFields = ["*"];
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
	query.outSpatialReference = myMap.spatialReference;
	queryTask.execute(query, showCxjgCommand);
	queryStationByGeometry(geometries);
	// dr = "";
}

// 通过geometries所画图形查询工区
function queryWorkArea(geometries) {
	var query = new esri.tasks.Query();
	var queryTask = new esri.tasks.QueryTask(customService + "/5");
	query.geometry = geometries;
	query.where = "1=1";
	query.returnGeometry = true;
	query.outFields = ["*"];
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
	query.outSpatialReference = myMap.spatialReference;
	queryTask.execute(query, showWorkArea);
	// queryStationByGeometry(geometries);
	// dr = "";
}

// 通过geometries所画图形查询救援队
function queryRescueTeam(geometries) {
	var query = new esri.tasks.Query();
	var queryTask = new esri.tasks.QueryTask(customService + "/8");
	query.geometry = geometries;
	query.where = "1=1";
	query.returnGeometry = true;
	query.outFields = ["*"];
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
	query.outSpatialReference = myMap.spatialReference;
	queryTask.execute(query, showRescueTeam);
	// queryStationByGeometry(geometries);
	// dr = "";
}

// 通过geometries所画图形查询所包含车站及救援物资
function queryStationByGeometry(geometries) {
	var query = new esri.tasks.Query();
	var queryTask = new esri.tasks.QueryTask(customService + "/2");
	query.geometry = geometries;
	query.where = "1=1";
	query.returnGeometry = true;
	query.outFields = ["*"];
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
	query.outSpatialReference = myMap.spatialReference;
	queryTask.execute(query, showMaterialByGeo);
}

// 显示通过geometries所画图形查询的救援物资结果
function showMaterialByGeo(msg) {
	// 仅点选一个点时可以标注一下这个点
	if (msg.features.length == 1) {
		// 清除之前的标注项
		$(myMap.graphics.graphics).each(function() {
			var graphic = this;
			if (graphic.attributes && "bz" === graphic.attributes) {
				myMap.graphics.remove(graphic);
			}
		});
		var point0 = new esri.geometry.Point(msg.features[0].geometry.x, msg.features[0].geometry.y, msg.features[0].geometry.spatialReference);
		var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/biaozhured.png", 24, 32);
		symbol.setOffset(0, 16);
		var graphic = new esri.Graphic(point0, symbol);
		graphic.attributes = "bz";
		myMap.graphics.add(graphic);
	}
	var pointCodes = "";
	$(msg.features).each(function(j) {
		pointCodes += this.attributes.POINTCODE + ",";
	});
	// 获取应急资源
	$.post(location.serviceName + "/arcmap/poi/getMaterial/" + pointCodes + "/", function(materials) {
		$("#emergency").empty();
		generateMaterialList("#emergency", materials, null, true);
	}, "json");
}
// -----工具栏------
// 移动
function movemap() {
	navToolbar.activate(esri.toolbars.Navigation.PAN);
	toolbar.deactivate()
}
// 清除单个选中的
function qcSingleOne() {
	if (storeGraphic) {
		gl.remove(storeGraphic);
		editToolbarQ.deactivate();
		myMap.infoWindow.hide();
	}
}
// 清除
function qc() {
	navToolbar.deactivate();
	myMap.graphics.clear();
	toolbar.deactivate();
	gl.clear();
	myMap.infoWindow.hide();
	document.getElementById("cxtc").style.visibility = "hidden";
	document.getElementById("showMer").style.visibility = "hidden";
	document.getElementById("layerControl").style.visibility = "hidden";
}
// 全图
function fullmap() {
	var position = new esri.geometry.Point(center_X, center_y, new esri.SpatialReference({
		wkid : 4490
	}));
	myMap.centerAndZoom(position, 4); // 根据经纬度和地图层级定位居中
}
// 放大
function boostmap() {
	navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
}
// 缩小
function lessenmap() {
	navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT)
}
// 后退
function backmap() {
	navToolbar.deactivate();
	navToolbar.zoomToPrevExtent();
}
// 前进
function aheadmap() {
	navToolbar.deactivate();
	navToolbar.zoomToNextExtent();
}
// 框选查询
function drowextent(dw) {
	navToolbar.deactivate();
	dr = dw;
	toolbar.activate(esri.toolbars.Draw.EXTENT);
}

// 多边形选择
function drowpolygon(dw) {
	navToolbar.deactivate();
	dr = dw;
	toolbar.activate(esri.toolbars.Draw.POLYGON);
}

// 划圆查询
function drowcircle(dw) {
	navToolbar.deactivate();
	dr = "circle";
	toolbar.activate(esri.toolbars.Draw.POINT);
}

// 传入经纬度和地图的缩放级别进行飞行定位
function FlyToXY(X, Y, Zoom) {
	var newPoint = new esri.geometry.Point(X, Y, new esri.SpatialReference({
		wkid : 4490
	}));
	myMap.centerAndZoom(newPoint, Zoom);
	drawAnnotate(X, Y);
}

// 穿入事件的X,Y和地图的缩放级别进行飞行定位
function FlyToXYEvent(X, Y, Zoom) {
	var newPoint = new esri.geometry.Point(X, Y, new esri.SpatialReference({
		wkid : 4490
	}));
	var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/fly.gif", 16, 13);
	var graphic = new esri.Graphic(point, symbol);
	myMap.graphics.add(graphic);
	myMap.centerAndZoom(newPoint, Zoom);
}

// 穿入point和地图的缩放级别进行飞行定位
function FlyTo(point, Zoom) {
	myMap.centerAndZoom(point, Zoom);
}
// 鹰眼
var bj = false;
var overviewMapDijit;
function showOverview() {
	navToolbar.deactivate();
	if (overviewMapDijit == null) {
		overviewMapDijit = new esri.dijit.OverviewMap({
			map : myMap
		}, dojo.byId('overviewDiv'));
	}
	if (!bj) {
		document.getElementById("ovWin").style.visibility = "visible";
		overviewMapDijit.startup();
		overviewMapDijit.show();
		bj = true;
	} else {
		document.getElementById("ovWin").style.visibility = "hidden";
		overviewMapDijit.hide();
		bj = false;
	}
}

// 距离测量
function measutreLength(dw) {
	navToolbar.deactivate();
	dr = dw;
	toolbar.activate(esri.toolbars.Draw.POLYLINE);
}
// 面积测量
function measutreArea(dw) {
	navToolbar.deactivate();
	dr = dw;
	toolbar.activate(esri.toolbars.Draw.POLYGON);
}
// 标绘(画箭头)
function ceshianniu() {
	navToolbar.deactivate();
	dr = "";
	toolbar.activate(esri.toolbars.Draw.ARROW);
}

// ---图层控制START---
var visibleLayers;
// 图层名字
var ObjName = ["车站（大）", "线路（大）", "车站", "线路"];
var ObjLayerName = ["PointCZB", "PolyLineB", "PointCZ", "PolyLineXg"];
var showLayerd = [0, 1, 2, 3];

function loadLayerList(node) {
	if (node) {
		var position = node.getBoundingClientRect();
		$("#layerControl").css("left", position.left + 1);
		$("#layerControl").css("top", position.bottom + 1);
	}
	var contentHtml = "";
	contentHtml += "<div style='font-weight:bold;'>图层控制</div>"
	contentHtml += "<div><input type='checkbox' id='selectAllLayer' name='layerd' value='全选' onclick='allLayerd()'>全选</div>";
	for (var i = 0; i < ObjName.length; i++) {
		contentHtml += "<div><input type='checkbox' id='" + ObjLayerName[i] + "' name='layerd' value='" + ObjName[i] + "' onclick='switchover(" + ObjLayerName[i] + ")'>" + ObjName[i] + "</div>";
	}
	dojo.byId("layerControl").innerHTML = contentHtml;
	document.getElementById("PointCZ").checked = true;
	document.getElementById("PolyLineXg").checked = true;
	var showAble = document.getElementById("layerControl").style.visibility;
	if ("hidden" === showAble) {
		document.getElementById("layerControl").style.visibility = "visible";
	} else
		document.getElementById("layerControl").style.visibility = "hidden";
}
// 书签
var bookMarks;
function showBookMarks() {
	var showAble = document.getElementById("bookMarks").style.visibility;
	if ("hidden" === showAble) {
		document.getElementById("bookMarks").style.visibility = "visible";
	} else {
		document.getElementById("bookMarks").style.visibility = "hidden";
	}
	var primaryBookMarks = bookMarksQ.toJson();
	$.post(location.serviceName + "/arcmap/manage/bookMarks.json", function(data) {
		if (data.length == primaryBookMarks.length) {
			return;
		}
		$(data).each(function() {
			bookMarksQ.addBookmark(this);
		});
	}, "json");
}
function switchover(clickRdo) {
	visibleLayers = [];
	for (var i = 0; i < ObjLayerName.length; i++) {
		if (document.getElementById(ObjLayerName[i]).checked == true) {
			visibleLayers.push(i);
		} else {
			addArr("-" + i);
		}
	}
	setLayerVisibility();
}
// 添加删除图层方法
function addArr(n) {
	if (n.toString().indexOf("-") > -1) {
		for (var i = 0; i < visibleLayers.length; i++) {
			if (visibleLayers[i] == Number(n.toString().replace("-", "")))
				visibleLayers.remove(i);
		}
	} else {
		var visibleStr = Number(n.toString().replace("+", ""));
		visibleLayers.push(visibleStr);
	}
}
// 设置图层是否可视的方法
function setLayerVisibility() {
	if (visibleLayers.length == 0) {
		HideAllPointLayers();
	}
	if (visibleLayers.length > 0) {
		for (var i = 0; i < visibleLayers.length; i++) {
			for (var j = 0; j < showLayerd.length; j++) {
				if (i == showLayerd[j]) {
					selectCheckBox(true, visibleLayers[i]);
				}
			}
		}
		myDynamicMapServiceLayer.show();
		// 设置可视图层
		myDynamicMapServiceLayer.setVisibleLayers(visibleLayers);
	}
}
// 图层全选
function allLayerd() {
	var checkObj = document.getElementsByName("layerd");
	if (document.getElementById("selectAllLayer").checked == true) {
		ShowAllPointLayers();
		switchover();
	} else {
		HideAllPointLayers();
	}
}
// 控制checkBox 状态
function selectCheckBox(state, id) {
	var cb = document.getElementById(id);
	if (cb == null)
		return;
	cb.checked = state;
}
// 显示所有对象图层
function ShowAllPointLayers() {
	selectCheckboxAll(true, "layerd");
}
// 隐藏所有对象图层
function HideAllPointLayers() {
	selectCheckboxAll(false, "layerd");
	myDynamicMapServiceLayer.hide();
}
// 控制CheckBox 全选/反选
function selectCheckboxAll(state, name) {
	var ids = document.getElementsByName(name);
	for (var i = 0; i < ids.length; i++) {
		ids[i].checked = state;
	}
}
// ---图层控制END---

// 将地理坐标系转换成屏幕坐标系
function toScreenPoint(mapPoint) {
	var screetPoint = esri.geometry.toScreenPoint(myMap.extent, myMap.width, myMap.height, mapPoint);
	return screetPoint;
}

// 将屏幕坐标系转换成地理坐标系
function toMapPoint(screenPoint) {
	var mapPoint = esri.geometry.toMapPoint(myMap.extent, myMap.width, myMap.height, screenPoint);
	return mapPoint;
}
// 显示右侧列表框
function showresult() {
	$("#cxtc").css("visibility", "visible");
	$("#cxtc").show();
	$("#cxtc").unbind();
	$("#cxtcTitle").unbind();
}
// 初始化显示为没有数据
function initResult() {
	$("#myTabContent div").empty();
	$("#myTabContent div").append('<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>');
}
// 重新重置为空并赋值为没有数据
function closeResult() {
	$("#cxtc").hide();
	$("#myTabContent div").empty();
	$("#myTabContent div").append('<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>');
}