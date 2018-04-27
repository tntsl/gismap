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
		extent : new Extent({
			xmin : 116.857561,
			ymin : 38.843284,
			xmax : 117.606299,
			ymax : 39.501400,
			// xmin : 115.4,
			// ymin : 39.401400,
			// xmax : 117.606299,
			// ymax : 41.401400,
			spatialReference : {
				wkid : 4490
			}
		})
	});
	if (document.getElementById("bookmarks")) {
		bookMarksQ = new bookmarks({
			map : myMap,
			bookmarks : [],
			editable : true
		}, "bookmarks");
		bookMarksQ.on("edit,remove", function(bookMarks) {
			$.ajax({
				url : ctx + "/arcmap/modifyBookMarks",
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
	gsvc = new GeometryService(geoService);
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
	// esri.config.defaults.io.proxyUrl = "http://" + proxyPath + "/proxy.jsp";
	// esri.config.defaults.io.alwaysUseProxy = true;
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
			var queryTask = new QueryTask(mapservice_l + "/2");
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
			// 查询救援物资
			queryMaterialByGeometries(polygon);
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
			var queryTask = new esri.tasks.QueryTask(mapservice_l + "/2");
			query.geometry = circle;
			query.where = "1=1";
			query.returnGeometry = true;
			query.outFields = ["*"];
			query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_CONTAINS;
			query.outSpatialReference = myMap.spatialReference;
			queryTask.execute(query, function(msg) {
				if (msg.features.length != 0) {
					station = msg.features[0].attributes.POINTNAME;
					var con = "<table>";
					con += "<input type='hidden' id='socialresX' value=" + mapPoint.x + "><input type='hidden' id='socialresY' value=" + mapPoint.y + ">";
					con += "<tr><td>资源类型：</td><td><select id='dlx' class='select_01' onchange=changexxTable(" + mapPoint.x + "," + mapPoint.y + ",'" + station + "')>";
					con += "<option value='xfd'>消防队</option><option value='police'>公安</option><option value='hospital'>医院</option><option value='jyd'>救援队</option><option value='gq'>工区</option>"
							+ "<option value='bds'>变电所</option><option value='dc'>段场</option></select></td>";
					con += "<tr><td>名称：</td><td><input type='text' id='socialresName'></td></tr>";
					con += "<tr><td>地址：</td><td><input type='text' id='socialresAddr'></td></tr>";
					con += "<tr><td>负责人：</td><td><input type='text' id='socialresPerson'></td></tr>";
					con += "<tr><td>电话：</td><td><input type='text' id='socialresPhone'></td></tr>";
					con += "<tr><td>专业器材：</td><td><input type='text' id='xfdSpecialequip'></td></tr>";
					con += "<tr><td>临近地铁站：</td><td><input type='text' id='socialresStationname' value=" + station + "></td></tr>";
					con += "<tr><td colspan='2'><input type='button' id='tj' onclick=addSocialResource(this) value='提交'></td></tr>"
					con += "</table>";
					myMap.infoWindow.setContent(con);
					myMap.infoWindow.show(toMapPoint(point));
				} else {
					var selectNode = generateSelectNode(mapPoint.x, mapPoint.y, station, socailResourceOptions);
					selectNode.find("option[value='fireBrigate']").attr("selected", "selected");
					var formNode = generateFireBrigateForm(mapPoint.x, mapPoint.y, station, selectNode);
					myMap.infoWindow.setContent(formNode[0].outerHTML);
					myMap.infoWindow.show(toMapPoint(point));
				}
			});
		}
	}
});

var graphics = [];
function drawAnnotate(circleX, circleY) {
	for (var i = 0, max = graphics.length; i < max; i++) {
		myMap.graphics.remove(graphics[i]);
	}
	graphics = [];
	var point = new esri.geometry.Point(circleX, circleY, myMap.spatialReference);
	var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/icon/biaozhured.png", 24, 32);
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
	querySocialResources(circle);
	queryWorkArea(circle);
	queryRescueTeam(circle);
	// 查询救援物资
	queryMaterialByGeometries(circle);
	myMap.infoWindow.hide();
}

// 解析地址,根据配置添加地图图层
function analysis_location() {
	var listlocation = mapservice.split(',');
	for (var i = 0; i < listlocation.length; i++) {
		var myTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(listlocation[i]);
		// $(".logo-med").hide();// 去掉arcgis的logo
		myMap.addLayer(myTiledMapServiceLayer);
	}
	myDynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(mapservice_l);
	myMap.addLayer(myDynamicMapServiceLayer);

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
	$.get(ctx + "/arcmap/poi/findByParentId/" + id + "/", function(msg) {
		$(msg).each(
				function(i) {
					showMerTbodyHtml += "<tr><td><input type='checkbox' id='material" + msg[i].id + "' name='material' onclick=showMaterialsByParentId() value='" + msg[i].id + "'></td><td>"
							+ msg[i].name + "</td></tr>";
				});
		$("#showMerTbody").html(showMerTbodyHtml);
		showresult();
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
	$.get(ctx + "/arcmap/getAllWorkAreaProfessions", function(professions) {
		$(professions).each(function() {
			showMerTbodyHtml += "<tr><td><input type='checkbox' name='workAreas' onclick='getAllWorkAreas()' value='" + this + "'></td><td>" + this + "</td></tr>";
		});
		$("#showMerTbody").html(showMerTbodyHtml);
		showresult();
		var showAble = document.getElementById("showMer").style.visibility;
		if ("hidden" === showAble) {
			document.getElementById("showMer").style.visibility = "visible";
		} else
			document.getElementById("showMer").style.visibility = "hidden";
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
		$.post(ctx + "/arcmap/getAllWorkAreas", {
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
	$.post(ctx + "/arcmap/getAllRescueTeams", function(rescueTeams) {
		generateRescueTeamList("#rescueTeam", rescueTeams);
	}, "json");
}
// 查询应急资源
function showMaterialsByParentId() {
	myMap.graphics.clear();
	var materialsToQuery = $("input[name='material']:checked");
	if (materialsToQuery.length > 0) {
		var materialParentIds = "";
		$("input[name='material']:checked").each(function() {
			materialParentIds += $(this).val() + ",";
		});
		$.get(ctx + "/arcmap/poi/findbyRestypeId/" + materialParentIds + "/", function(materials) {
			generateMaterialList("#emergency", materials, false, true);
		}, "json");
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
	var restypeImages = ["zml", "jjl", "gbqcl", "yjfhl", "ryjzl", "fxun", "fxue", "gwzyqx", "xhzyqx", "gdyj", "txyj", "afcqj", "hkyj", "fhbp"];
	// 得到所有资源类型的父类
	$.get(ctx + "/arcmap/poi/findByParentId/" + 1 + "/", function(msg) {
		var tdStrs = "<td><font style='margin-left:20px;color:red;'>资源：</font></td>";
		$(msg).each(
				function(i) {
					tdStrs += '<td><img src="' + ctxStatic + '/images/restypeImage/' + restypeImages[i] + '.png" style="margin:3 3 3 3;" title="' + msg[i].name
							+ '" onclick="queryForMaterialByParentId(' + msg[i].id + ',\'' + restypeImages[i] + '\')"/></td>';
				});
		$("#leftTools").prepend(tdStrs);
	})
}
var socailResourceOptions = [{
	"name" : "消防队",
	"value" : "fireBrigate"
}, {
	"name" : "公安",
	"value" : "police"
}, {
	"name" : "医院",
	"value" : "hospital"
}, {
	"name" : "救援队",
	"value" : "rescueTeam"
}, {
	"name" : "工区",
	"value" : "workArea"
}, {
	"name" : "变电所",
	"value" : "substation"
}, {
	"name" : "段场",
	"value" : "depot"
}];

// 生成线路下拉框
function generateLineSelectNode(properties) {
	var lines = getLinesDic();
	var selectNode = $("<select><option value=''>~~请选择路线~~</option></select>");
	if (properties) {
		for (obj in properties) {
			selectNode.attr(obj, properties[obj]);
		}
	}
	$(lines).each(function() {
		var line = this;
		selectNode.append("<option value='" + line.id + "'>" + line.name + "</option>");
	});
	return selectNode;
}
// 地图维护新增标点,切换不同类型标点表单类型
function changexxTable(x, y, station, node) {
	var selectNode = $(node);
	var stype = selectNode.val();
	var selectNodeClone = selectNode.clone();
	selectNodeClone.find("option").removeAttr("selected");
	selectNodeClone.find("option[value='" + stype + "']").attr("selected", "selected");
	var formNode;
	switch (stype) {
		case "fireBrigate" :
			formNode = generateFireBrigateForm(x, y, station, selectNodeClone);
			break;
		case "police" :
			formNode = generatePoliceForm(x, y, station, selectNodeClone);
			break;
		case "hospital" :
			formNode = generateHospitalForm(x, y, station, selectNodeClone);
			break;
		case "rescueTeam" :
			formNode = generateRescueTeamForm(x, y, station, selectNodeClone);
			break;
		case "workArea" :
			formNode = generateWorkAreaForm(x, y, station, selectNodeClone);
			break;
		case "substation" :
			formNode = generateSubstationForm(x, y, station, selectNodeClone);
			break;
		case "depot" :
			formNode = generateDepotForm(x, y, station, selectNodeClone);
			break;
		default :
	}
	myMap.infoWindow.setContent(formNode[0].outerHTML);
}

// 添加社会资源
function addSocialResource(node) {
	$.post(ctx + "/arcmap/addSocialResource", $(node).parents("form").serialize(), function(result) {
		if (result === "success") {
			alert("添加成功！！！！");
			queryOrAdd = "Query";
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			getAllXfd();
		} else {
			alert(result);
		}
	});
}

// 添加救援队
function addRescueTeam(node) {
	$.post(ctx + "/arcmap/addRescueTeam", $(node).parents("form").serialize(), function(msg) {
		alert("添加成功！！！！");
		queryOrAdd = "Query";
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		getAllJyd();
	});
}

// 添加变电所、工区、段场
function addWorkArea(node) {
	$.post(ctx + "/arcmap/addWork", $(node).parents("form").serialize(), function(msg) {
		alert("添加成功！！！！");
		queryOrAdd = "Query";
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		getAllArea();
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
	$.post(ctx + "/arcmap/addPreventionInfo", {
		data : code
	}, function(msg) {
		myMap.infoWindow.hide();
		myMap.graphics.clear();
	});
}
// 删除消防队
function delFireBrigate(id) {
	if (confirm("确认要删除？")) {
		$.get(ctx + "/arcmap/delXfd/" + id + "/", function(success) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			alert("删除成功");
		});
	}
}

// 删除救援队
function delRescueTeam(id) {
	if (confirm("确认要删除？")) {
		$.get(ctx + "/arcmap/delJyd/", "id=" + id, function(msg) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			getAllJyd();
			alert("删除成功");
		});
	}
}

// 删除工区、段场、变电所
function delWorkArea(id) {
	if (confirm("确认要删除？")) {
		$.post(ctx + "/arcmap/delWork/", "id=" + id, function(msg) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			getAllArea();
			alert("删除成功");
		});
	}
}

// 更新防汛点
function upatePrevention(id, x, y) {
	var code = "";
	code += x + ",";
	code += y + ",";
	code += isEmpty($("#preventionName" + id).val()) + ",";
	code += isEmpty($("#preventionPosition" + id)).val() + ",";
	code += isEmpty($("#preventionReason" + id)).val() + ",";
	code += isEmpty($("#preventionRemark" + id)).val() + ",";
	code += id + ",";
	$.post(ctx + "/arcmap/addPreventionInfo", {
		data : code
	}, function(msg) {
		myMap.graphics.clear();
		alert("更改成功");
	});
}

// 删除防汛点
function delPrevention(id) {
	if (confirm("确认要删除？")) {
		$.get(ctx + "/arcmap/delPrevention/" + id + "/", function(msg) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			alert("删除成功");
		});
	}
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
			url : ctx + "/arcmap/shareScreen.json",
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
					url : ctx + "/arcmap/shareScreen.json",
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
					url : ctx + "/arcmap/currentScreen.json",
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
			url : ctx + "/arcmap/shareScreen.json",
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
		url : ctx + "/arcmap/currentScreen.json",
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
