//以下对象为地图中所用到的对象：圆、画布、颜色等等
var myMap, extent, CircleQ, SimpleFillSymbolQ, navToolbar, toolbar, PictureMarkerSymbolQ, GraphicQ, InfoTemplateQ, SpatialReferenceQ, dojoQ, identifyTask, identifyTask2, identifyParams, gl, LengthsParametersQ, AreasAndLengthsParametersQ, symbol, dr, gsvc, showPt, measuregeometry, queryQj, queryTaskQj, querySpa, queryOrAdd, normalizeUtilsQ, esriConfigQ, EditQ, eventQ, editToolbarQ, myDynamicMapServiceLayer, arcgisUtilsQ, bookMarksQ;
var app = {};
require(["esri/map", "esri/geometry/Extent", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", "esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
		"esri/symbols/PictureMarkerSymbol", "esri/geometry/Point", "esri/layers/GraphicsLayer", "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol", "esri/SpatialReference",
		"esri/InfoTemplate", "esri/graphic", "dojo/_base/Color", "dojo/dom", "dojo/on", "dojo/dom-attr", "esri/tasks/GeometryService", "esri/tasks/LengthsParameters",
		"esri/tasks/AreasAndLengthsParameters", "esri/tasks/query", "esri/tasks/QueryTask", "esri/geometry/normalizeUtils", "esri/config", "esri/toolbars/edit", "dojo/_base/event",
		"esri/arcgis/utils", "esri/dijit/Print", "esri/tasks/PrintTemplate", "dojo/_base/array", "esri/dijit/Bookmarks", "dojo/parser", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
		"dojo/domReady!", "esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters", "dijit/dijit", "esri/dijit/OverviewMap", "esri/toolbars/navigation", "esri/tasks/BufferParameters"], function(
		Map, Extent, Circle, SimpleFillSymbol, Draw, SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol, Point, GraphicsLayer, PictureFillSymbol, CartographicLineSymbol, SpatialReference,
		InfoTemplate, Graphic, Color, dom, on, domAttr, GeometryService, LengthsParameters, AreasAndLengthsParameters, Query, QueryTask, normalizeUtils, esriConfig, Edit, event, arcgisUtils, Print,
		PrintTemplate, arrayUtils, bookmarks, parser) {
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
	parser.parse();
	myMap = new Map("map", {
		zoom : 4,
		logo : false,
		slider : false,
		center : new Point(center_X, center_Y, new SpatialReference({
			wkid : 4490
		}))
	// extent : new Extent({
	// xmin : 116.857561,
	// ymin : 38.843284,
	// xmax : 117.606299,
	// ymax : 39.501400,
	// // xmin : 115.4,
	// // ymin : 39.401400,
	// // xmax : 117.606299,
	// // ymax : 41.401400,
	// spatialReference : {
	// wkid : 4490
	// }
	// })
	});
	if (document.getElementById("bookmarks")) {
		bookMarksQ = new bookmarks({
			map : myMap,
			bookmarks : [],
			editable : true
		}, "bookmarks");
		bookMarksQ.on("edit,remove", function(bookMarks) {
			$.ajax({
				url : location.serviceName + "/arcmap/manage/modifyBookMarks",
				type : "POST",
				data : JSON.stringify(bookMarks.target.bookmarks),
				contentType : "application/json",
				success : function(data) {

				}
			});
		});
	}
	// 解析地图服务
	analysis_location();

	// 初始化工具类
	editToolbarQ = new EditQ(myMap);
	toolbar = new esri.toolbars.Draw(myMap);
	navToolbar = new esri.toolbars.Navigation(myMap);
	gsvc = new GeometryService(geometryService);
	gsvc.on("lengths-complete", outputDistance);
	gsvc.on("areas-and-lengths-complete", outputAreaAndLength);
	symbol = new SimpleFillSymbol().setColor(new dojo.Color([255, 0, 0, 0.25]));
	gl = new GraphicsLayer({
		id : 'gl'
	});
	myMap.addLayer(gl, 0);

	// 初始化事件
	myMap.on("load", mapReady);
	dojo.connect(toolbar, "onDrawEnd", addToMap);
	myMap.on("click", createQueryPolygon);

	// proxy页面配置
	esri.config.defaults.io.proxyUrl = "http://" + location.serviceName + "/ictmap/proxy.jsp";
	esri.config.defaults.io.alwaysUseProxy = false;
	// map-click 点击查询车站
	queryOrAdd = "Query";
	function createQueryPolygon(evt) {
		// editToolbarQ.deactivate();
		var x = evt.screenPoint.x;
		var y = evt.screenPoint.y;
		var evtPoint = new esri.geometry.Point(x, y);
		var mapPoint = toMapPoint(evtPoint);
		if (queryOrAdd == "Query") {
			var leftTopPoint = new esri.geometry.Point(x - 3, y + 3);
			var rightTopPoint = new esri.geometry.Point(x + 3, y + 3);
			var rightBottomPoint = new esri.geometry.Point(x + 3, y - 3);
			var leftBottomPoint = new esri.geometry.Point(x - 3, y - 3);
			var polygon = new esri.geometry.Polygon(myMap.spatialReference);
			polygon.addRing([toMapPoint(leftTopPoint), toMapPoint(rightTopPoint), toMapPoint(rightBottomPoint), toMapPoint(leftBottomPoint), toMapPoint(leftTopPoint)]);
			var query = new Query();
			var queryTask = new QueryTask(customService + "/2");
			query.geometry = polygon;
			query.where = "1=1";
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.spatialRelationship = Query.SPATIAL_REL_CONTAINS;
			query.outSpatialReference = myMap.spatialReference;
			queryTask.execute(query, showMaterialByGeo);
			// 查询工区
			queryWorkArea(polygon);
			// 查询救援队
			queryRescueTeam(polygon);
		} else if (queryOrAdd == "AddManage") {
			// ---移除标记在地图上的红点---
			if (myMap.graphics.graphics.length > 0) {
				$(myMap.graphics.graphics).each(function(i) {
					if (myMap.graphics.graphics[i].attributes == "AddManage") {
						myMap.graphics.remove(myMap.graphics.graphics[i]);
					}
				})
			}
			// -----------------------
			var point = new esri.geometry.Point(x, y);
			var symbol = new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 7, null, new Color([255, 0, 0]));
			var graphic = new esri.Graphic(toMapPoint(point), symbol);
			graphic.attributes = "AddManage";
			myMap.graphics.add(graphic);
			myMap.infoWindow.resize(350, 600);
			myMap.infoWindow.setTitle("添加点");
			var station = "";
			var circle = new esri.geometry.Circle(toMapPoint(point), {
				"radius" : 1000
			});
			var query = new esri.tasks.Query();
			var queryTask = new esri.tasks.QueryTask(customService + "/2");
			query.geometry = circle;
			query.where = "1=1";
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
			query.outSpatialReference = myMap.spatialReference;
			queryTask.execute(query, function(msg) {
				if (msg.features.length != 0) {
					station = msg.features[0].attributes.POINTNAME;
				}
				var con = "<form id='socialresForm'>";
				con += "<input type='hidden' name='x' value=" + mapPoint.x + "><input type='hidden' name='y' value=" + mapPoint.y + ">";
				con += "<table><tr><td>资源类型：</td><td><select id='dlx' name='stype' class='select_01' onchange=changexxTable(" + mapPoint.x + "," + mapPoint.y + ",'" + station + "')>";
				con += "<option value='3'>消防队</option><option value='1'>公安</option><option value='2'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
						+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
				con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
				con += "<tr><td>专业器材：</td><td><input type='text' name='specialequip'></td></tr>";
				con += "<tr><td>具体位置：</td><td><input type='text' name='addr'></td></tr>";
				con += "<tr><td>联系人：</td><td><input type='text' name='person'></td></tr>";
				con += "<tr><td>联系人电话：</td><td><input type='text' name='phone'></td></tr>";
				con += "<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + station + "></td></tr>";
				con += "<tr><td colspan='2'><input type='button' onclick=\"addSocialres()\" value='提交'></td></tr>"
				con += "</table></form>";
				myMap.infoWindow.setContent(con);
				myMap.infoWindow.show(toMapPoint(point));
			});
		}
	}
});

// 显示测量距离
function outputDistance(result) {
	var CurX = measuregeometry.paths[0][measuregeometry.paths[0].length - 1][0];
	var CurY = measuregeometry.paths[0][measuregeometry.paths[0].length - 1][1];
	var CurPos = new esri.geometry.Point(CurX, CurY, myMap.spatialReference);
	myMap.infoWindow.setTitle("距离测量");
	myMap.infoWindow.setContent(" 测 量 长 度 ： <strong>" + (result.result.lengths * 1).toFixed(3) + "千米</strong>");
	myMap.infoWindow.show(CurPos);
}

// 显示测量面积
function outputAreaAndLength(result) {
	var CurX = (measuregeometry.cache._extent.xmax + measuregeometry.cache._extent.xmin) / 2;
	var CurY = (measuregeometry.cache._extent.ymax + measuregeometry.cache._extent.ymin) / 2
	var CurPos = new esri.geometry.Point(CurX, CurY, myMap.spatialReference);
	myMap.infoWindow.setTitle("面积测量");
	myMap.infoWindow.setContent(" 面积 ： <strong>" + (result.result.areas * 1).toFixed(3) + "平方千米</strong><br/> 周长：" + (result.result.lengths * 1).toFixed(3) + "千米");
	myMap.infoWindow.show(CurPos);
}

// 显示框选查询、多边形查询和划圆查询后社会资源结果
function showCxjgCommand(msg) {
	var code = "";
	var fireBrigadeHtmlTable = "";
	var policeOfficeHtmlTable = ""
	var hospitalHtmlTable = "";// "<table><tr><td>名称</td><td>地址</td><td>负责人</td><td>联系电话</td></tr>";
	$(msg.features).each(function() {
		code += (this.attributes.CODE || "") + ",";
	});
	if (code != "") {
		$.ajaxSettings.async = false;
		$.post(location.serviceName + "/arcmap/poi/getPoi", {
			data : code
		}, function(jsonlist) {
			$(jsonlist).each(
					function(i) {
						// id,code,addr,name,person,phone,stype
						var point = new esri.geometry.Point(msg.features[i].geometry.x, msg.features[i].geometry.y, map.spatialReference);
						var mobilePhone = isnull(jsonlist[i][5]);
						if (jsonlist[i][6] == "1") {
							var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/04.png", 25, 25);
							policeOfficeHtmlTable += "<table class='materialTable' onclick='FlyToXY(" + msg.features[i].geometry.x + "," + msg.features[i].geometry.y + ", 7)'>"
									+ "<tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'>" + "<td style='width:65px;' colspan='2'>" + "名称：" + jsonlist[i][3]
									+ "<img src='" + location.serviceName + "/arcmap/images/icon/phone.png' onclick='callMobile(\"" + mobilePhone + "\")' style='float:right;margin-right:5px;'/></td>"
									+ "</tr>";
							policeOfficeHtmlTable += "<tr><td colspan=2><div>地址：" + isnull(jsonlist[i][2]) + "</div><div>负责人：" + isnull(jsonlist[i][4]) + "</div><div>电话：" + mobilePhone
									+ "</div></td></tr></table>";
						} else if (jsonlist[i][6] == "2") {
							var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/05.png", 25, 25);
							hospitalHtmlTable += "<table class='materialTable' onclick='FlyToXY(" + msg.features[i].geometry.x + "," + msg.features[i].geometry.y + ", 7)'>"
									+ "<tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'>" + "<td style='width:65px;' colspan='2'>" + "名称：" + jsonlist[i][3]
									+ "<img src='" + location.serviceName + "/arcmap/images/icon/phone.png' onclick='callMobile(\"" + mobilePhone + "\")' style='float:right;margin-right:5px;'/>"
									+ "</td>" + "</tr>";
							hospitalHtmlTable += "<tr><td colspan=2><div>地址：" + isnull(jsonlist[i][2]) + "</div><div>负责人：" + isnull(jsonlist[i][4]) + "</div><div>电话：" + mobilePhone
									+ "</div></td></tr></table>";
						} else if (jsonlist[i][6] == "3") {
							var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/03.png", 25, 25);
							fireBrigadeHtmlTable += "<table class='materialTable' onclick='FlyToXY(" + msg.features[i].geometry.x + "," + msg.features[i].geometry.y
									+ ", 7)'><tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'><td style='width:65px;' colspan='2'>名称：" + jsonlist[i][3] + "<img src='"
									+ location.serviceName + "/arcmap/images/icon/phone.png' onclick='callMobile(\"" + mobilePhone + "\")' style='float:right;margin-right:5px;'/></td>" + "</tr>";
							fireBrigadeHtmlTable += "<tr><td colspan=2><div>地址：" + isnull(jsonlist[i][2]) + "</div><div>负责人：" + isnull(jsonlist[i][4]) + "</div><div>电话：" + isnull(jsonlist[i][5])
									+ "</div></td></tr></table>";
						}
						var graphic = new esri.Graphic(point, symbol);
						graphic.attributes = jsonlist[i][0];
						var infoTemplate = new esri.InfoTemplate();
						infoTemplate.setTitle(jsonlist[i][3]);
						infoTemplate
								.setContent("地&nbsp;&nbsp;&nbsp;址：" + isnull(jsonlist[i][2]) + "<br>" + "电&nbsp;&nbsp;&nbsp;话：" + isnull(jsonlist[i][5]) + "<br>" + "负责人：" + isnull(jsonlist[i][4]));
						graphic.setInfoTemplate(infoTemplate);
						myMap.graphics.add(graphic);
					});
		});
		$.ajaxSettings.async = true;
		policeOfficeHtmlTable = policeOfficeHtmlTable == ""
				? '<table class="materialTable emptyData"><tr><td colspan="2" style="text-align: center;">~~暂时没有相关数据~~</td></tr></table>'
				: policeOfficeHtmlTable;
		hospitalHtmlTable = hospitalHtmlTable == "" ? '<table class="materialTable emptyData"><tr><td colspan="2" style="text-align: center;">~~暂时没有相关数据~~</td></tr></table>' : hospitalHtmlTable;
		fireBrigadeHtmlTable = fireBrigadeHtmlTable == ""
				? '<table class="materialTable emptyData"><tr><td colspan="2" style="text-align: center;">~~暂时没有相关数据~~</td></tr></table>'
				: fireBrigadeHtmlTable;
		$("#policeOffice").html(policeOfficeHtmlTable);
		$("#hospital").html(hospitalHtmlTable);
		$("#fireBrigade").html(fireBrigadeHtmlTable);
		showresult();
		document.getElementById("cxtc").style.visibility = "visible";
	}
	toolbar.deactivate();
}
var graphics = [];
function drawAnnotate(circleX, circleY) {
	for (var i = 0, max = graphics.length; i < max; i++) {
		myMap.graphics.remove(graphics[i]);
	}
	graphics = [];
	var point = new esri.geometry.Point(circleX, circleY, myMap.spatialReference);
	var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/arcmap/images/icon/biaozhured.png", 24, 32);
	symbol.setOffset(0, 16);
	var graphic = new esri.Graphic(point, symbol);
	graphic.attributes = "bz";
	myMap.graphics.add(graphic);
	graphics.push(graphic);
}
// 通过圆心坐标和半径创建一个圆
function radiusquery(x, y) {
	var radius = $("#radius").val();
	var mapPoint = new esri.geometry.Point(x, y, myMap.spatialReference);
	var circle = new esri.geometry.Circle(mapPoint, {
		"radius" : radius * 1000
	});
	var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, null, new dojo.Color([255, 0, 0, 0.15]));
	var graphic = new esri.Graphic(circle, symbol);
	myMap.graphics.add(graphic);
	if (radius * 1 <= 1.5) {
		FlyToXY(x, y, 7);
	} else if (radius * 1 > 1.5 & radius * 1 <= 3) {
		FlyToXY(x, y, 6);
	} else if (radius * 1 > 3 & radius * 1 <= 7) {
		FlyToXY(x, y, 5);
	} else if (radius * 1 > 7 & radius * 1 <= 15) {
		FlyToXY(x, y, 4);
	} else {
		FlyToXY(x, y, 3);
	}
	showBuffer(circle);
	queryWorkArea(circle);
	queryRescueTeam(circle);
	myMap.infoWindow.hide();
}

// 划圆查询Command
function showBufferCommand(geometries) {

	var query = new esri.tasks.Query();
	var queryTask = new esri.tasks.QueryTask(customService + "/4");
	query.geometry = geometries;
	query.where = "Ctype in ('消防队','公安警察','综合医院')";
	query.returnGeometry = true;
	query.outFields = ["*"];
	query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
	query.outSpatialReference = myMap.spatialReference;
	queryTask.execute(query, showCxjgCommand);
	dr = "";
}

// 通过geometry查询得到工区msg，通过ID查询工区
function showWorkArea(msg) {
	if (msg.features.length == 0) {
		$("#workarea").html('<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>');
		return;
	}
	$(myMap.graphics.graphics).each(function() {
		var graphic = this;
		if (graphic.attributes && "workArea" === graphic.attributes) {
			myMap.graphics.remove(graphic);
		}
	});
	var pointIds = "";
	$(msg.features).each(function() {
		pointIds += this.attributes.POINTID + ",";
	});
	var html = "";
	$.post(location.serviceName + "/arcmap/manage/getWorkArea/" + pointIds + "/", function(workAreas) {
		generateWorkAreaList("#workarea", workAreas);
	}, "json");
}

// 通过geometry查询得到救援队msg，通过ID查询救援队
function showRescueTeam(msg) {
	if (msg.features.length == 0) {
		$("#rescueTeam").html('<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>');
		return;
	}
	$(myMap.graphics.graphics).each(function() {
		var graphic = this;
		if (graphic.attributes && "rescueTeam" === graphic.attributes) {
			myMap.graphics.remove(graphic);
		}
	});
	var pointIds = "";
	$(msg.features).each(function() {
		pointIds += this.attributes.POINTID + ",";
	});
	$.post(location.serviceName + "/arcmap/manage/getRescueTeam/" + pointIds + "/", function(rescueTeams) {
		generateRescueTeamList("#rescueTeam", rescueTeams);
	}, "json");
}

// 解析地址,根据配置添加地图图层
function analysis_location() {
	var myTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(baseMapService);
	// $(".logo-med").hide();// 去掉arcgis的logo
	myMap.addLayer(myTiledMapServiceLayer);
	myDynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(customService);
	myMap.addLayer(myDynamicMapServiceLayer);
	// 获得工区、变电所、段场
	$.post(location.serviceName + "/arcmap/manage/getAllArea/", function(workSites) {
		var html = "";
		var segmentFields = []; // 段场
		$(workSites).each(function() {
			var workSite = this;
			switch (workSite.stype) {
				case 3 :
					segmentFields.push(workSite);
					break;
			}
		});
		generateSegmentFieldPoint(segmentFields);
	}, "json");
}

// 添加救援队、工区、变电所、段场
function manage() {
	queryOrAdd = "AddManage";
}
// 添加防汛
function addPrevention() {
	queryOrAdd = "AddPrevention";
}
// 通过资源类型显示子类待选列表
function queryForMaterialByParentId(id, img) {
	var showMerTbodyHtml = "";
	$.get(location.serviceName + "/arcmap/poi/findByParentId/" + id + "/", function(msg) {
		$(msg).each(
				function(i) {
					showMerTbodyHtml += "<tr><td><input type='checkbox' id='material" + msg[i].id + "' name='material' onclick=showMatToMap('" + img + "') value='" + msg[i].id + "'></td><td>"
							+ msg[i].name + "</td></tr>";
				});
		$("#showMerTbody").html(showMerTbodyHtml);
		// showresult();
		var showAble = document.getElementById("showMer").style.visibility;
		if ("hidden" === showAble) {
			$("#showMer").addClass(img);
			document.getElementById("showMer").style.visibility = "visible";
		} else if ($("#showMer").hasClass(img)) {
			$("#showMer").removeClass(img);
			document.getElementById("showMer").style.visibility = "hidden";
		} else {
			$("#showMer").removeClass();
			$("#showMer").addClass(img);
		}
	});
}
// 列出所有的工区专业
function getAllWorkAreaProfessions() {
	var showMerTbodyHtml = "";
	$.get(location.serviceName + "/arcmap/manage/getAllWorkAreaProfessions", function(professions) {
		$(professions).each(function() {
			showMerTbodyHtml += "<tr><td><input type='checkbox' name='workAreas' onclick='getAllWorkAreas()' value='" + this + "'></td><td>" + this + "</td></tr>";
		});
		$("#showMerTbody").html(showMerTbodyHtml);
		// showresult();
		var showAble = document.getElementById("showMer").style.visibility;
		if ("hidden" === showAble) {
			$("#showMer").addClass("gq");
			document.getElementById("showMer").style.visibility = "visible";
		} else if ($("#showMer").hasClass("gq")) {
			$("#showMer").removeClass("gq");
			document.getElementById("showMer").style.visibility = "hidden";
		} else {
			$("#showMer").removeClass();
			$("#showMer").addClass("gq");
		}
	}, "json");
}
// 获取并显示所有工区
function getAllWorkAreas() {
	var materialsToQuery = $("input[name='workAreas']:checked");
	$("#workarea").empty();
	myMap.graphics.clear();
	if (materialsToQuery.length > 0) {
		var workAreaProfessions = "";
		$(materialsToQuery).each(function() {
			workAreaProfessions += $(this).val() + ",";
		});
		$.post(location.serviceName + "/arcmap/manage/getAllWorkAreas", {
			"workAreaProfessions" : workAreaProfessions
		}, function(workAreas) {
			generateWorkAreaList("#workarea", workAreas);
		}, "json");
	} else {
		var emptyResult = '<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$("#workarea").append(emptyResult);
	}
}

// 获取并显示所有救援队
function getAllRescueTeams() {
	$("#rescueTeam").empty();
	$.post(location.serviceName + "/arcmap/manage/getAllRescueTeams", function(rescueTeams) {
		generateRescueTeamList("#rescueTeam", rescueTeams);
	}, "json");
}
// 查询应急资源
function showMatToMap(img) {
	myMap.graphics.clear();
	var materialsToQuery = $("input[name='material']:checked");
	if (materialsToQuery.length > 0) {
		var materialParentIds = "";
		$("input[name='material']:checked").each(function() {
			materialParentIds += $(this).val() + ",";
		});
		$.get(location.serviceName + "/arcmap/poi/findbyRestypeId/" + materialParentIds + "/", function(materials) {
			generateMaterialList("#emergency", materials, img);
		}, "json");
	} else {
		$("#emergency").html("<table class='materialTable emptyData' style='width:100%;'><tr><td colspan='2' align='center'>~~暂时没有数据~~</td></tr></table>");
	}
}
// 地图上面的工具栏----------------------------------------------------------------

// 标注------------------------------------------------------------------------
// x、y为标注的经纬度。attributes为该标注的属性标识，imgsrc为该标注的图片地址，width,height为该标注在地图上显示的大小
function markpic(x, y, attributes, imgsrc, width, height) {
	var newPoint = new esri.geometry.Point(x, y, myMap.spatialReference);
	var picSymbol = new esri.symbol.PictureMarkerSymbol(imgsrc, width, height);
	var picGraphic = new esri.Graphic(newPoint, picSymbol);
	picGraphic.attributes = attributes;
	myMap.graphics.add(picGraphic);
}

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
// 弹出信息框，分别为弹出的对话框气泡，和浮动的div-------------------------------------------

// 获取目标点地理信息---------------------------------------------------------------
// 已选中的单个元素
var storeGraphic;
// 地图加载完毕后执行的方法
function mapReady() {
	initResult();
	// 注销右键菜单项
	document.oncontextmenu = function(e) {
		e.preventDefault();
	};

	gl.on("click", function(evt) {
		eventQ.stop(evt);
		editToolbarQ.activate(EditQ.EDIT_VERTICES | EditQ.MOVE | EditQ.ROTATE | EditQ.SCALE, evt.graphic);
		storeGraphic = evt.graphic;
	});
	document.onkeyup = function(event) {
		if (event.key === "46" || storeGraphic) {
			gl.remove(storeGraphic);
			editToolbarQ.deactivate();
		}
	}
	editToolbarQ.on("graphic-move-stop,rotate-stop,scale-stop,vertex-delete,vertex-move-stop", function(evt) {
		if (evt.graphic.geometry.type == "polyline") {
			dr = "jl"
		}
		if (evt.graphic.geometry.type == "polygon") {
			dr = "mj"
		}
		addToMap(evt.graphic.geometry);
	});

	// 所有父类图片名称（按照sort降序排列）
	var restypeImages = ["zml", "jjl", "gbqcl", "yjfhl", "ryjzl", "fxun", "fxue", "gwzyqx", "xhzyqx", "gdyj", "txyj", "afcqj", "hkyj"];
	// 得到所有资源类型的父类
	$.get(location.serviceName + "/arcmap/poi/findByParentId/" + 1 + "/", function(resTypes) {
		var tdStrs = "<td><font style='margin-left:20px;color:red;'>资源：</font></td>";
		$(resTypes).each(
				function() {
					var resType = this;
					tdStrs += '<td><img src="' + location.serviceName + '/arcmap/images/restypeImage/' + resType.shortName + '.png" style="margin:3 3 3 3;" title="' + resType.name
							+ '" onclick="queryForMaterialByParentId(' + resType.id + ',\'' + resType.shortName + '\')"/></td>';
				});
		$("#leftTools").prepend(tdStrs);
	})
	if (typeof addCommandCircle == "function") {
		addCommandCircle();
	}

}

// 地图维护新增标点,切换不同类型标点表单类型
function changexxTable(x, y, station) {
	var linesOptions = "";
	$(getLinesDic()).each(function() {
		linesOptions += "<option value='" + this.id + "'>" + this.name + "</option>"
	});
	var sel = $('#dlx option:selected').val();
	if (sel == "xfd") {// 消防队
		var con = "<form id='socialresForm'>";
		con += "<input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'><input type='hidden' name='stype' value='3'>";
		con += "<table><tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3' selected='selected'>消防队</option><option value='1'>公安</option><option value='2'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
				+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
		con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>专业器材：</td><td><input type='text' name='specialequip'></td></tr>";
		con += "<tr><td>具体位置：</td><td><input type='text' name='addr'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person'></td></tr>";
		con += "<tr><td>联系人电话：</td><td><input type='text' name='phone'></td></tr>";
		con += "<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + station + "></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addSocialres()\" value='提交'></td></tr>"
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	} else if (sel == "police") {// 公安局
		var con = "<form id='socialresForm'>";
		con += "<input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'><input type='hidden' name='stype' value='1'>";
		con += "<table><tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3'>消防队</option><option value='1' selected='selected'>公安</option><option value='2'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
				+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
		con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>具体位置：</td><td><input type='text' name='addr'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person'></td></tr>";
		con += "<tr><td>联系人电话：</td><td><input type='text' name='phone'></td></tr>";
		con += "<tr><td>管辖范围：</td><td><input type='text' name='region'></td></tr>";
		con += "<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + station + "></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addSocialres()\" value='提交'></td></tr>"
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	} else if (sel == "hospity") {// 医院
		var con = "<form id='socialresForm'>";
		con += "<input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'><input type='hidden' name='stype' value='2'>";
		con += "<table><tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3'>消防队</option><option value='1'>公安</option><option value='2' selected='selected'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
				+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
		con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>区域：</td><td><input type='text' name='region'></td></tr>";
		con += "<tr><td>级别：</td><td><input type='text' name='hsplevel'></td></tr>";
		con += "<tr><td>专科：</td><td><input type='text' name='subject'></td></tr>";
		con += "<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + station + "></td></tr>";
		con += "<tr><td>具体位置：</td><td><input type='text' name='addr'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person'></td></tr>";
		con += "<tr><td>联系人电话：</td><td><input type='text' name='phone'></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addSocialres()\" value='提交'></td></tr>"
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	} else if (sel == "jyd") {
		var con = "<form id='rescueTeamForm'>";
		con += "<input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'>";
		con += "<table><tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3'>消防队</option><option value='1'>公安</option><option value='2'>医院</option><option value='jyd' selected='selected'>救援队</option><option value='gq'>工区</option>"
				+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
		con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>专业：</td><td><input type='text' name='specialty'></td></tr>";
		con += "<tr><td>隶属：</td><td><input type='text' name='department'></td></tr>";
		con += "<tr><td>队长姓名：</td><td><input type='text' name='leaderName'></td></tr>";
		con += "<tr><td>手机：</td><td><input type='text' name='mobile'></td></tr>";
		con += "<tr><td>电话：</td><td><input type='text' name='tel'></td></tr>";
		con += "<tr><td>队员数量：</td><td><input type='text' name='num'></td></tr>";
		con += "<tr><td>具体位置：</td><td><input type='text' name='addr'></td></tr>";
		con += "<tr><td>线路：</td><td><select name='line.id' class='select_01'>" + linesOptions + "</select></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addJyd()\" value='提交'></td></tr>"
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	} else if (sel == "gq") {
		var con = "<form id='workForm'>";
		con += "<table><input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'><input type='hidden' name='stype' value='1'>";
		con += "<tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3'>消防队</option><option value='1'>公安</option><option value='2'>医院</option><option value='jyd'>救援队</option><option value='gq' selected='selected'>工区</option>"
				+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
		con += "<tr><td>工区名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>专业：</td><td><input type='text' name='infratype'></td></tr>";
		con += "<tr><td>线路：</td><td><select name='line.id' class='select_01'>" + linesOptions + "</select></td></tr>";
		con += "<tr><td>管辖范围：</td><td><input type='text' name='infraarea'></td></tr>";
		con += "<tr><td>地点：</td><td><input type='text' name='addr'></td></tr>";
		con += "<tr><td>联系电话：</td><td><input type='text' name='mobile'></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addWork()\" value='提交'></td></tr>";
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	} else if (sel == "bds") {
		var con = "<form id='workForm'>";
		con += "<table><input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'><input type='hidden' name='stype' value='2'>";
		con += "<tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3'>消防队</option><option value='1'>公安</option><option value='2'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
				+ "<option value='bds' selected='selected'>变电所</option><option value='dc'>段场</option></select></td>";
		con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>类型：</td><td><input type='text' name='infratype'></td></tr>";
		con += "<tr><td>位置：</td><td><input type='text' name='addr'></td></tr>";
		con += "<tr><td>线路：</td><td><select name='line.id' class='select_01'>" + linesOptions + "</select></td></tr>";
		con += "<tr><td>管辖范围：</td><td><input type='text' name='infraarea'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person'></td></tr>";
		con += "<tr><td>电话：</td><td><input type='text' name='mobile'></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addWork()\" value='提交'></td></tr>";
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	} else if (sel == "dc") {
		var con = "<form id='workForm'>";
		con += "<table><input type='hidden' name='x' value='" + x + "'><input type='hidden' name='y' value='" + y + "'><input type='hidden' name='stype' value='3'>";
		con += "<tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "')>";
		con += "<option value='3'>消防队</option><option value='1'>公安</option><option value='2'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
				+ "<option value='bds'>变电所</option><option value='dc' selected='selected'>段场</option></select></td>";
		con += "<tr><td>名称：</td><td><input type='text' name='name'></td></tr>";
		con += "<tr><td>线路：</td><td><select name='line.id' class='select_01'>" + linesOptions + "</select></td></tr>";
		con += "<tr><td>附属机关：</td><td><input type='text' name='infraarea'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person'></td></tr>";
		con += "<tr><td>电话：</td><td><input type='text' name='mobile'></td></tr>";
		con += "<tr><td colspan='2'><input type='button' onclick=\"addWork()\" value='提交'></td></tr>";
		con += "</table></form>";
		myMap.infoWindow.setContent(con);
	}
}

// 添加社会资源
function addSocialres() {
	$.post(location.serviceName + "/arcmap/manage/addSocialres", $("#socialresForm").serialize(), function(msg) {
		alert("添加消防队成功");
		queryOrAdd = "Query";
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		manageMapReady();
	});
}

// 添加救援队
function addJyd() {
	$.post(location.serviceName + "/arcmap/manage/addJyd", $("#rescueTeamForm").serialize(), function(msg) {
		alert("添加消防队成功");
		queryOrAdd = "Query";
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		manageMapReady();
	});
}

// 添加变电所、工区、段场
function addWork() {
	$.post(location.serviceName + "/arcmap/manage/addWork", $("#workForm").serialize(), function(msg) {
		alert("添加成功");
		queryOrAdd = "Query";
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		manageMapReady();
	});

}

// 添加防汛点
function addPreventionInfo() {
	var code = "";
	code += $("#preventionX").val() + ",";
	code += $("#preventionY").val() + ",";
	code += isEmpty($("#preventionName").val()) + ",";
	code += isEmpty($("#preventionPosition").val()) + ",";
	code += isEmpty($("#preventionReason").val()) + ",";
	code += isEmpty($("#preventionRemark").val()) + ",";
	$.post(location.serviceName + "/arcmap/manage/addPreventionInfo", {
		data : code
	}, function(msg) {
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		manageMapReady();
	});
}

// ""|无
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
// 屏幕共享
var shareScreenInterval, getScreenInterval;
function shareScreen() {
	if (!shareScreenInterval) {
		if (confirm("开始分享当前屏幕？")) {
			shareScreenInterval = setInterval(shareCurrentScreen, 500);
			clearInterval(getScreenInterval);
			getScreenInterval = null;
		}
	}
}
var preHtml = "";
function shareCurrentScreen() {
	var currentHtml = document.body.innerHTML;
	if (preHtml != currentHtml) {
		preHtml = currentHtml;
		$.ajax({
			url : location.serviceName + "/arcmap/manage/shareScreen.json",
			type : "POST",
			async : false,
			data : {
				"screen" : currentHtml
			},
			dataType : "json",
			success : function(data) {

			}
		});
	}
}
var nowTimes = 500;
function getScreen() {
	if (!getScreenInterval) {
		getScreenInterval = setInterval(getCurrentScreen, nowTimes);
	}
}
/**
 * 修改获取频率
 * 
 * @returns
 */
function changeIntervalTimes(newTime) {
	if (nowTimes != newTime) {
		nowTimes = newTime;
		clearInterval(getScreenInterval);
		getScreenInterval = setInterval(getCurrentScreen, newTime);
	}
}
function closeScreen() {
	if (getScreenInterval || shareScreenInterval) {
		if (confirm("断开与分享屏幕的连接？")) {
			if (shareScreenInterval) {
				clearInterval(shareScreenInterval);
				shareScreenInterval = null;
				$.ajax({
					url : location.serviceName + "/arcmap/manage/shareScreen.json",
					type : "POST",
					async : false,
					data : {
						"screen" : "stop"
					},
					dataType : "json",
					success : function(data) {
						alert("已停止分享当前屏幕!!");
						getScreen();
					}
				});
			} else {
				$.ajax({
					url : location.serviceName + "/arcmap/manage/currentScreen.json",
					type : "POST",
					async : false,
					dataType : "json",
					success : function(data) {
						if ("stop" == data.screen) {
							clearInterval(getScreenInterval);
							getScreenInterval = null;
							location.reload();
						} else {
							alert("当前正在接受连接，无法断开!!");
						}
					}
				});
			}
		}
	}
}
function closeWindow() {
	if (shareScreenInterval) {
		clearInterval(shareScreenInterval);
		shareScreenInterval = null;
		$.ajax({
			url : location.serviceName + "/arcmap/manage/shareScreen.json",
			type : "POST",
			async : false,
			data : {
				"screen" : "stop"
			},
			dataType : "json",
			success : function(data) {
			}
		});
	}
}
var preScreen;
function getCurrentScreen() {
	$.ajax({
		url : location.serviceName + "/arcmap/manage/currentScreen.json",
		type : "POST",
		async : false,
		dataType : "json",
		success : function(data) {
			if ("stop" != data.screen && "" != data.screen) {
				if (preScreen != data.screen) {
					changeIntervalTimes(500);
					document.body.innerHTML = data.screen;
					preScreen = data.screen;
					confirmedNotAlert = false;
				}
			} else {
				changeIntervalTimes(5000);
			}
		}
	});
}
