<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE>
<head>
<title>应急指挥定位</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="${global['gis.resource.url']}/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/css/main.css" rel="stylesheet" type="text/css" />
<%-- <link href="${global['gis.resource.url']}/typeahead.js/examples.css" rel="stylesheet" type="text/css" /> --%>
<style type="text/css">
#cxtc {
	position: absolute;
	scrollbar-track-color: white;
	top: 45px;
	right: 10px;
	z-index: 999;
	height: 90%;
	max-width: 450px;
	visibility: hidden;
	filter: alpha(opacity = 90);
	opacity: 0.9;
}

#cxtc div {
	scrollbar-face-color: #fcfcfc;
	scrollbar-highlight-color: #6c6c90;
	scrollbar-shadow-color: #fcfcfc;
	scrollbar-3dlight-color: #fcfcfc;
	scrollbar-arrow-color: #240024;
	scrollbar-track-color: #fcfcfc;
	scrollbar-darkshadow-color: #48486c;
	scrollbar-base-color: #fcfcfc
}

.caret {
	display: none;
}

#feedback a:hover, #feedback a:active, #feedback a:visited {
	border: none;
	color: #666;
	text-decoration: none;
}

.esriPopup {
	z-index: 999 !important;
}

.esriPopup .sizer {
	min-width: 300px;
}

.esriPopup .titlePane {
	font-size: medium;
	font-weight: bold;
	line-height: 40px !important;
	text-align: center;
	background-color: rgba(64, 64, 64, 0.8) !important;
}

.esriPopup .contentPane {
	font-size: medium;
	background-color: rgba(64, 64, 64, 0.8) !important;
	line-height: 40px !important;
	color: #FFFFFF !important;
	min-height: 150px;
}

.esriPopup .actionsPane {
	background-color: rgba(64, 64, 64, 0.8) !important;
}

.tbtools td img {
	width: 27px !important;
	height: 27px !important;
}

.tbtools td img:hover {
	border: 1px solid #000 !important;
}

#showMerTbody td {
	text-align: center;
	padding: 5px;
}

.materialTable {
	width: 100%;
}

.materialTable th {
	line-height: 2em;
	padding-left: 10px;
}

.materialTable td {
	padding: 5px;
}

.emptyData {
	height: 100%;
	font-size: 20px;
	font-weight: boler;
	color: blue;
}

.emptyData td {
	line-height: 2em;
}
</style>
</head>
<body class="tundra" scroll=no>
	<div id="map" style="position: relative;">
		<!-- <div id="feedback">
	<div id="print_button" class="z-index:999;position:absolute;top:100px;"></div>
	</div> -->
		<!-- 工具框 -->
		<table class="tbtools">
			<tr>
				<td align="left">
					<table>
						<tr id="leftTools">
							<td>
								<img title="防汛点" src="${global['gis.resource.url']}/images/icon/fx.png" onclick="getAllPrevention()">
							</td>
							<td>
								<font style="margin-left: 20px; color: red;">工具：</font>
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/yd.png" title="移动" onClick="movemap()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/sf.png" title="全图" onclick="fullmap()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/fd.png" title="放大" onClick="boostmap()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/sx.png" title="缩小" onClick="lessenmap()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/left.png" title="后退" onClick="backmap()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/right.png" title="前进" onClick="aheadmap()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/yy.png" title="鹰眼" onClick="showOverview()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/cdcl.png" title="距离测量" onClick="measutreLength('jl')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/mjcl.png" title="面积测量" onClick="measutreArea('mj')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/bh.png" title="标绘" onClick="ceshianniu()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/LayersControl.png" title="图层控制" onClick="loadLayerList()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/qc.png" title="清除单个" onClick="qcSingleOne()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/qcAll.png" title="清空" onClick="qc()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/bookmark.png" title="书签" onclick="showBookMarks()" />
							</td>
							<td>
								<button type="button" onclick='addTextDiv()'>标题</button>
							</td>
							<td style="padding-left: 3px; padding-right: 3px;">
								<img src="${global['gis.resource.url']}/images/icon/shareScreen.png" title="投影当前屏幕" onClick="shareScreen()" />
							</td>
							<td style="padding-left: 3px; padding-right: 3px;">
								<img src="${global['gis.resource.url']}/images/icon/disconnect.png" title="断开连接" onClick="closeScreen()" />
							</td>
							<%-- <td><img src="${global['gis.resource.url']}/images/icon/qc.gif"
								style="width: 27px; height: 26px;" title="清除" onClick="qc()"
								data-container="body" data-toggle="popover"
								data-placement="right" data-content="HI" /></td> --%>
						</tr>
					</table>
				</td>
				<td align="right">
					<table>
						<tr>
							<td>
								<div style='width: 36px;' id="serchM" onmouseover='btnmouse(this,1)' onmouseout='btnmouse(this,0)' onclick="SerchM()" class='divbtn'>查询</div>
							</td>
							<!-- 							<td> -->
							<%-- 								<img src="${global['gis.resource.url']}/images/icon/08.png" style="width: 27px; height: 26px;" title="防汛查询" onClick="getAllPrevention()" /> --%>
							<!-- 							</td> -->
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionRectangle.png" title="框选查询" onClick="drowextent('cx')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionPolygon.png" title="多边形选择" onClick="drowpolygon('cx')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionOval.png" title="划圆选择" onClick="drowcircle('circle')" />
							</td>
							<%-- <td><img src="${global['gis.resource.url']}/images/icon/biaozhu.png"
								title="标注" onClick="markMetro()" /></td> --%>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<!-- 工具框 -->
		<!-- showMaterialToMap弹出div -->
		<div id="showMer"
			style="position: absolute; top: 45px; left: 5px; max-height: 500px; width: 200px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 70); opacity: 0.7;">
			<table id="showMerTable" style="width: 100%;">
				<tbody id="showMerTbody"></tbody>
			</table>
		</div>
		<!-- showMaterialToMap弹出div -->
		<!-- 弹出浮动框 -->
		<table class='infoTemplate' id='TBinfoTemplate' cellpadding='0' cellspacing='0'>
			<tr>
				<td>
					<table style='width: 100%' class='infotbQT' cellpadding='0' cellspacing='0'>
						<tr>
							<td id='stationHT' style='font-size: 13px; padding-right: 5px'></td>
							<td onclick="closediv()" style='width: 20px; padding-right: 2px; cursor: pointer'>
								<img src="${global['gis.resource.url']}/images/pic_cha.png" />
								<input type='hidden' id='hd_GPH' />
							</td>
						</tr>
					</table>
				</td>
			</tr>
			<tr>
				<td style='padding: 5px; padding-bottom: 10px;'>
					<table style='font-size: 12px;' class='infoTemplateTB' cellpadding='0' cellspacing='0'>
						<tr class='infoTemplateTBTittle'>
					</table>
				</td>
			</tr>
		</table>
		<!-- 弹出浮动框 -->
		<!-- 鹰眼 -->
		<div id="ovWin" class="shadow" style="position: absolute; right: 75px; bottom: 38px; width: 200px; height: 150px; visibility: hidden;">
			<div id="overviewDiv" style="width: 100%; height: 100%;"></div>
		</div>
		<!-- 鹰眼 -->
		<!-- 标绘 -->
		<!-- <div id="bh" style="position:absolute;left:300px;top:45px;width:200px;height:150px;z-index:999;">
         	<table>
         		<tr>
         			<td><input type="text" value="1111111"></td>
         		</tr>
         	</table>
         </div> -->
		<!-- 标绘 -->
		<!-- 全文搜索框 -->
		<div id="allQ" style="position: absolute; top: 45px; right: 10px; width: 210px; height: 150px; z-index: 998; overflow: auto;">
			<input type="text" class="typeahead" id="allQuery" name="allQuery" placeholder="请输入物资名称" />
		</div>
		<!-- 全文搜索框 -->
		<!-- 查询弹出div -->
		<!-- <div id="cxtc" style="position:absolute;top:80px;right:10px;max-height:500px;max-width:400px;z-index:999;
         overflow:auto;visibility:hidden;background:#fff;filter: alpha(opacity=70); opacity: 0.7;">
         	<table id="cxjg" style="border-collapse:collapse;">
         		
			</table>
         </div> -->
		<!-- 查询弹出div -->
		<!-- 图层控制div -->
		<div id="layerControl"
			style="position: fixed; top: 45px; left: 250px; max-height: 500px; max-width: 450px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 90); opacity: 0.9;"></div>
		<div id="bookMarks"
			style="position: absolute; top: 45px; left: 815px; max-height: 500px; width: 215px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 90); opacity: 0.9;">
			<div style='font-weight: bold; margin: 0, auto;'>书签</div>
			<div class="bookmark-container">
				<div id="bookmarks"></div>
			</div>
		</div>
		<!-- 测试bootstrap -->
		<div id="cxtc" class="panel panel-primary">
			<div id='cxtcTitle' class="panel-heading">
				<h4 class="panel-title" style="display: inline;">
					查询结果
					<!-- 					<a id="queryresult" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"> 查询结果 </a> -->
				</h4>
				<a href="javascript:void(0)" onclick="closeResult()" title="关闭" style="text-decoration: none; color: white; display: inline; margin-left: 225px;">
					<span class="glyphicon glyphicon-remove"></span>
				</a>
			</div>
			<div id="collapseFour" class="panel-collapse collapse" style="background: #fff;">
				<ul id="myTab" class="nav nav-tabs">
					<li class="active">
						<a href="#emergency" data-toggle="tab"> 应急物资</a>
					</li>
					<!-- 					<li> -->
					<!-- 						<a href="#workarea" data-toggle="tab"> 工区</a> -->
					<!-- 					</li> -->
					<li>
						<a href="#rescueTeam" data-toggle="tab"> 救援队</a>
					</li>
					<li>
						<a href="#prevention" data-toggle="tab">防汛</a>
					</li>
					<li class="dropdown">
						<a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown">
							社会资源
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1" style="background: #fff;">
							<li>
								<a href="#fireBrigade" tabindex="-1" data-toggle="tab">消防队</a>
							</li>
							<li>
								<a href="#policeOffice" tabindex="-1" data-toggle="tab">警察局</a>
							</li>
							<li>
								<a href="#hospital" tabindex="-1" data-toggle="tab">医院</a>
							</li>
						</ul>
					</li>
				</ul>
				<div id="myTabContent" class="tab-content" style="overflow: auto; height: 90%;">
					<div class="tab-pane fade in active" id="emergency"></div>
					<div class="tab-pane fade" id="rescueTeam"></div>
					<div class="tab-pane fade" id="prevention"></div>
					<div class="tab-pane fade" id="hospital"></div>
					<div class="tab-pane fade" id="policeOffice"></div>
					<div class="tab-pane fade" id="fireBrigade"></div>
				</div>
			</div>
		</div>
		<!-- 测试bootstrap -->
		<!-- 断面客流 -->
		<div id="sectionPassenger"
			style="width: 300px; height: 200px; position: absolute; right: 0; bottom: 0; z-index: 999; overflow: auto; visibility: hidden; background: #cfd3e9; filter: alpha(opacity = 70); opacity: 0.7;">
			<div>客流设置：</div>
			<div style="height: 30px;">
				地图刷新时间：
				<input id="refreshTime" style="width: 140px;" value="5">
				分钟
			</div>
			<div style="height: 30px;">
				Ⅰ级响应：人数
				<input id="response1" value="50000">
			</div>
			<div style="height: 30px;">
				Ⅱ级响应：人数
				<input id="response2" value="40000">
			</div>
			<div style="height: 30px;">
				Ⅲ级响应：人数
				<input id="response3" value="30000">
			</div>
			<div style="height: 30px;">
				Ⅳ级响应：人数
				<input id="response4" value="20000">
			</div>
			<div style="height: 30px; text-align: center;">
				<input type="button" onclick="saveSet()" value="保存当前设置">
				<input style="left: 100px;" type="button" onclick="restoreDefault()" value="恢复默认设置">
			</div>
		</div>
		<!-- 断面客流 -->
	</div>
	<script type="text/javascript">
		var ctx = "${pageContext.request.contextPath}";
		var ctxStatic = "${global['gis.resource.url']}";
	</script>
	<script id='tt' src="${pageContext.request.contextPath}/js/arcmaps-config.js" type="text/javascript"></script>
	<link type="text/css" rel="stylesheet" href="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/dijit/themes/tundra/tundra.css" />
	<link type="text/css" rel="stylesheet" href="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/esri/css/esri.css" />
	<script type="text/javascript" src="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/init.js"></script>
	<script src="${global['gis.resource.url']}/js/jquery-1.11.1.min.js" type="text/javascript"></script>
	<%-- 	<script src="${global['gis.resource.url']}/typeahead.js/analytics.js" type="text/javascript"></script> --%>
	<%-- 	<script src="${global['gis.resource.url']}/typeahead.js/handlebars.js" type="text/javascript"></script> --%>
	<%-- 	<script src="${global['gis.resource.url']}/typeahead.js/typeahead.bundle.js" type="text/javascript"></script> --%>
	<script src="${global['gis.resource.url']}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script id='arcmapsjs' src="${pageContext.request.contextPath}/js/arcmaps.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/baseMap.js" type="text/javascript"></script>
	<script id='mainjs' src="${pageContext.request.contextPath}/js/main.js" type="text/javascript"></script>
	<script src="${global['gis.resource.url']}/echarts/echarts-all.js" type="text/javascript"></script>
	<script type="text/javascript">
		var circleRadius = 1000;
		var substringMatcher = function(strs) {
			return function findMatches(q, cb) {
				var matches, substringRegex;
				matches = [];
				substrRegex = new RegExp(q, 'i');
				$.each(strs, function(i, str) {
					if (substrRegex.test(str)) {
						matches.push(str);
					}
				});
				cb(matches);
			};
		};
		var cxLeft = 0, cxTop = 0;
		$(function() {
			$("[data-toggle='popover']").popover();
			$('#collapseFour').collapse('show');
			getAllMaterials();
		})
		function getAllMaterials() {
			//查询所有应急资源
			$.post(ctx + "/arcmap/poi/getRestypeName/", function(msg) {
				$('#allQ .typeahead').typeahead({
					hint : true,
					highlight : true,
					minLength : 1
				}, {
					name : 'msg',
					source : substringMatcher(msg)
				});
				$('#allQ .typeahead').bind('typeahead:select', function(ev, suggestion) {
					$.get(ctx + "/arcmap/poi/getMaterialByResName/" + suggestion + "/", function(materials) {
						generateMaterialList("#emergency", materials);
					}, "json");
				});
			}, "json")
		}
		// 预警提示圈
		function addCommandCircle() {
			var comX = "${comX}".split(",");
			var comY = "${comY}".split(",");
			if (comX.length == 1) {
				circleX = comX[0] * 1;
				circleY = comY[0] * 1;
				var point = new esri.geometry.Point(circleX, circleY, myMap.spatialReference);
				var symbolPoint = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/icon/SelPoint.gif", 30, 30);
				var graphicPoint = new esri.Graphic(point, symbolPoint);
				myMap.graphics.add(graphicPoint);
				var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, null, new dojo.Color([255, 0, 0, 0.15]));
				var circle = new esri.geometry.Circle(point, {
					"radius" : circleRadius
				});
				var graphic = new esri.Graphic(circle, symbol);
				myMap.graphics.add(graphic);
				myMap.centerAndZoom(point, 7);
				showBufferCommand(circle);
				queryRescueTeam(circle);
			} else if (comX.length == 2) {
				toolOrCom = "com";
				circleX = (comX[0] * 1 + comX[1] * 1) / 2;
				circleY = (comY[0] * 1 + comY[1] * 1) / 2;
				var polylineJson = {
					"paths" : [[[comX[0] * 1, comY[0] * 1], [comX[1] * 1, comY[1] * 1]]],
					"spatialReference" : {
						"wkid" : 4490
					}
				};
				var polyline = new esri.geometry.Polyline(polylineJson);
				var lengthParams = new LengthsParametersQ();
				lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
				lengthParams.polylines = [polyline];
				gsvc.lengths(lengthParams);
			}
		}
		// 		getScreen();
		window.onbeforeunload = function() {
			closeWindow();
		}
	</script>
</body>
</html>