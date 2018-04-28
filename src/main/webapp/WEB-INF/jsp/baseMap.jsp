<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
<head>
<title>资源地图</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="${global['gis.resource.url']}/typeahead/examples.css" rel="stylesheet" type="text/css" />
<link href="${pageContext.request.contextPath}/css/main.css" rel="stylesheet" type="text/css" />
<link href="${global['gis.resource.url']}/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<style type="text/css">
#cxtc {
	position: absolute;
	scrollbar-track-color: white;
	top: 150px;
	right: 10px;
	z-index: 99;
	height: 80%;
	width: 480px;
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
	line-height: 40px;
	text-align: center;
	background-color: rgba(64, 64, 64, 0.8) !important;
}

.esriPopup .contentPane {
	font-size: medium;
	background-color: rgba(64, 64, 64, 0.8) !important;
	line-height: 40px;
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

#leftTools img:visited {
	background-color: #000;
}

#videoTable {
	
}

#videoTable td, #videoTable th {
	text-align: center;
	height: 30px;
}

.materialTable {
	width: 100%;
}

.materialTable th {
	line-height: 2em;
	padding-left: 10px;
}

.emptyData {
	height: 100%;
	font-size: 20px;
	font-weight: boler;
	color: blue;
}

.materialTable td {
	padding: 5px;
}

.emptyData td {
	line-height: 2em;
}
</style>
</head>
<body class="tundra" style="overflow: visible;">
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
								<img title="工区" src="${global['gis.resource.url']}/images/restypeImage/gq.png" onclick="getAllWorkAreaProfessions()">
							</td>
							<td>
								<img title="救援队" src="${global['gis.resource.url']}/images/restypeImage/jyd.png" onclick="getAllRescueTeams()">
							</td>
							<td>
								<img title="防汛点" src="${global['gis.resource.url']}/images/icon/fx.png" onclick="getAllPrevention()">
							</td>
							<%-- <td><img src="${global['gis.resource.url']}/images/icon/biaozhu.png"
								title="照明类" onClick="queryForMaterialByParentId(2)" /></td> --%>
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
								<img src="${global['gis.resource.url']}/images/icon/bookmark.png" title="书签" onclick="showBookMarks()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/qc.png" title="清除单个" onClick="qcSingleOne()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/qcAll.png" title="清除全部" onClick="qc()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/video.png" onclick="showVideo()" title="区间视频" />
							</td>
							<td>
								<button type="button" onclick='addTextDiv()'>标题</button>
							</td>
						</tr>
					</table>
				</td>
				<td align="right">
					<table>
						<tr>
							<td>
								<div style='width: 36px;' id="serchM" onclick="SerchM()" class='divbtn'>查询</div>
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/08.png" title="防汛查询" onClick="getAllPrevention()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionRectangle.png" title="框选查询" onClick="drowextent('cx')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionPolygon.png" title="多边形选择" onClick="drowpolygon('cx')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionOval.png" title="划圆选择" onClick="drowcircle('circle')" />
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<!-- 工具框 -->
		<!-- queryForMaterialByParentId弹出div -->
		<div id="showMer"
			style="position: absolute; top: 45px; left: 5px; max-height: 500px; width: 200px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 70); opacity: 0.7;">
			<table id="showMerTable" style="width: 100%;">
				<tbody id="showMerTbody"></tbody>
			</table>
		</div>
		<!-- queryForMaterialByParentId弹出div -->
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
		<div id="allQ" style="position: absolute; top: 40px; right: 40px; width: 200px; height: 150px; z-index: 998; overflow: auto;">
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
			style="position: absolute; top: 45px; left: 815px; max-height: 500px; width: 150px; max-width: 150px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 90); opacity: 0.9;"></div>
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
				<a href="javascript:void(0)" onclick="closeResult()" title="关闭" style="text-decoration: none; color: white; margin-left: 360px;">
					<span class="glyphicon glyphicon-remove"></span>
				</a>
			</div>
			<div id="collapseFour" class="panel-collapse collapse" style="background: #fff;">
				<ul id="myTab" class="nav nav-tabs">
					<li class="active">
						<a href="#emergency" data-toggle="tab"> 应急物资</a>
					</li>
					<li>
						<a href="#workarea" data-toggle="tab"> 工区</a>
					</li>
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
					<div class="tab-pane fade" id="workarea"></div>
					<div class="tab-pane fade" id="rescueTeam"></div>
					<div class="tab-pane fade" id="prevention"></div>
					<div class="tab-pane fade" id="fireBrigade"></div>
					<div class="tab-pane fade" id="policeOffice"></div>
					<div class="tab-pane fade" id="hospital"></div>
				</div>
			</div>
		</div>
		<!-- 测试bootstrap -->
		<!-- 视频查询结果 -->
		<div id="videoList" class="panel panel-primary"
			style="position: absolute; SCROLLBAR-TRACK-COLOR: white; top: 95px; left: 50%; z-index: 999; max-width: 450px; visibility: hidden; filter: alpha(opacity = 90); opacity: 0.9;">
			<div id='videoTitle' class="panel-heading">
				<h4 class="panel-title" style="display: inline;">
					视频列表
					<!-- 					<a id="queryresult" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"> 查询结果 </a> -->
				</h4>
				<a href="javascript:void(0)" onclick="$('#videoList').css('visibility','hidden');" title="关闭" style="text-decoration: none; color: white; margin-left: 285px;">
					<span class="glyphicon glyphicon-remove"></span>
				</a>
			</div>
			<table id="videoTable" style="width: 100%;">
				<thead>
					<tr>
						<th>视频名称</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
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
		location.gisResourceUrl = ctxStatic.replace("http://", "");
	</script>
	<script src="${pageContext.request.contextPath}/js/arcmaps-config.js" type="text/javascript"></script>
	<link type="text/css" rel="stylesheet" href="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/dijit/themes/tundra/tundra.css" />
	<link type="text/css" rel="stylesheet" href="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/esri/css/esri.css" />
	<script type="text/javascript" src="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/init.js"></script>
	<script src="${global['gis.resource.url']}/js/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="${global['gis.resource.url']}/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="${global['gis.resource.url']}/typeahead/analytics.js" type="text/javascript"></script>
	<script src="${global['gis.resource.url']}/typeahead/handlebars.js" type="text/javascript"></script>
	<script src="${global['gis.resource.url']}/typeahead/typeahead.bundle.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/arcmaps.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/baseMap.js" type="text/javascript"></script>
	<script src="${pageContext.request.contextPath}/js/main.js" type="text/javascript"></script>
	<%-- 	<script src="${global['gis.resource.url']}/arcmap/js/echarts-all.js" type="text/javascript"></script> --%>
	<script type="text/javascript">
		$(function() {
			$("[data-toggle='popover']").popover();
			//bootstrap panel 默认打开
			$('#collapseFour').collapse('show');
			getAllMaterials();
		});
		function getAllMaterials() {
			//查询所有应急资源
			$.get(ctx + "/arcmap/poi/getRestypeName/", function(resourceTypes) {
				var names = [];
				$(resourceTypes).each(function() {
					var resourceType = this;
					names.push(resourceType.name);
				});
				$('#allQ .typeahead').typeahead({
					highlight : true
				}, {
					name : 'names',
					displayKey : 'value',
					source : substringMatcher(names)
				});
				$('#allQ .typeahead').bind('typeahead:select', function(ev, suggestion) {
					$.post(ctx + "/arcmap/poi/getMaterialByResName/", "names=" + suggestion.value, function(materials) {
						generateMaterialList("#emergency", materials);
					}, "json")
				});
			}, "json");
		}

		var substringMatcher = function(strs) {
			return function findMatches(q, cb) {
				var matches, substrRegex;
				matches = [];//定义字符串数组
				substrRegex = new RegExp(q, 'i');
				//用正则表达式来确定哪些字符串包含子串的'q'
				$.each(strs, function(i, str) {
					//遍历字符串池中的任何字符串
					if (substrRegex.test(str)) {
						matches.push({
							value : str
						});
					}
					//包含子串的'q',将它添加到'match'
				});
				cb(matches);
			};
		};
	</script>
</body>
</html>