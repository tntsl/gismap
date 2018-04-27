<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
<head>
<title>demo</title>
<meta name="decorator" content="default" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link href="${ctxStatic}/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="${ctxStatic}/arcmap/css/colpick.css" rel="stylesheet" type="text/css" />
<link href="${ctxStatic}/arcmap/css/main.css" rel="stylesheet" type="text/css" />
<link href="${ctxStatic}/typeahead.js/examples.css" rel="stylesheet" type="text/css" />
<style type="text/css">
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

#feedback a:hover, #feedback a:active, #feedback a:visited {
	border: none;
	color: #666;
	text-decoration: none;
}

.color-box {
	width: 20px;
	height: 20px;
	margin: 2px;
	border: 1px solid white;
}

#sectionTable tr {
	height: 26px;
	font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
}

#sectionTable input {
	width: 70px;
	height: 20px;
}

.white {
	color: #606060;
	border: solid 1px #b7b7b7;
	background: #fff;
	background: -webkit-gradient(linear, left top, left bottom, from(#fff),
		to(#ededed));
	background: -moz-linear-gradient(top, #fff, #ededed);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff',
		endColorstr='#ededed');
}

.white:hover {
	background: #ededed;
	background: -webkit-gradient(linear, left top, left bottom, from(#fff),
		to(#dcdcdc));
	background: -moz-linear-gradient(top, #fff, #dcdcdc);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff',
		endColorstr='#dcdcdc');
}

.white:active {
	color: #999;
	background: -webkit-gradient(linear, left top, left bottom, from(#ededed),
		to(#fff));
	background: -moz-linear-gradient(top, #ededed, #fff);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ededed',
		endColorstr='#ffffff');
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
								<img src="${ctxStatic}/arcmap/images/icon/yd.png" title="移动" onClick="movemap()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/MapFullExtent.png" title="全图" onclick="fullmap()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/fd.png" title="放大" onClick="boostmap()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/sx.png" title="缩小" onClick="lessenmap()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/left.png" title="后退" onClick="backmap()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/right.png" title="前进" onClick="aheadmap()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/yy.png" style="width: 27px; height: 26px;" title="鹰眼" onClick="showOverview()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/cdcl.png" style="width: 27px; height: 26px;" title="距离测量" onClick="measutreLength('jl')" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/mjcl.png" style="width: 27px; height: 26px;" title="面积测量" onClick="measutreArea('mj')" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/bh.png" style="width: 27px; height: 26px;" title="标绘" onClick="ceshianniu()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/bh.png" style="width: 27px; height: 26px;" title="断面客流" onClick="sectionFlow()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/bh.png" style="width: 27px; height: 26px;" title="历史断面客流" onClick="historyFlow()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/LayersControl.png" style="width: 27px; height: 26px;" title="图层控制" onClick="loadLayerList()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/qc.gif" style="width: 27px; height: 26px;" title="清除" onClick="qc();document.getElementById('sectionPassenger').style.visibility = 'hidden';" />
							</td>
						</tr>
					</table>
				</td>
				<td align="right">
					<table>
						<tr>
							<td>
								<div style='width: 36px;' id="serchM" onmouseover='btnmouse(this,1)' onmouseout='btnmouse(this,0)' onclick="SerchM()" class='divbtn'>查询</div>
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/SelectionRectangle.png" style="width: 27px; height: 26px;" title="框选查询" onClick="drowextent('cx')" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/SelectionPolygon.png" title="多边形选择" onClick="drowpolygon('cx')" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/SelectionOval.png" title="划圆选择" onClick="drowcircle('circle')" />
							</td>
							<%-- <td><img src="${ctxStatic}/arcmap/images/icon/biaozhu.png"
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
			<table id="showMerTable">
				<tbody id="showMerTbody"></tbody>
			</table>
		</div>
		<!-- showMaterialToMap弹出div -->
		<!-- 弹出浮动框 -->
		<table style="right: 1050px;" class='infoTemplate' id='TBinfoTemplate' cellpadding='0' cellspacing='0'>
			<tr>
				<td>
					<table style='width: 100%' class='infotbQT' cellpadding='0' cellspacing='0'>
						<tr>
							<td id='stationHT' style='font-size: 13px; padding-right: 5px'></td>
							<td onclick="closediv()" style='width: 20px; padding-right: 2px; cursor: pointer'>
								<img src="${ctxStatic}/arcmap/images/pic_cha.png" />
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
		<!-- 查询弹出div -->
		<!-- <div id="cxtc" style="position:absolute;top:80px;right:10px;max-height:500px;max-width:400px;z-index:999;
         overflow:auto;visibility:hidden;background:#fff;filter: alpha(opacity=70); opacity: 0.7;">
         	<table id="cxjg" style="border-collapse:collapse;">
         		
			</table>
         </div> -->
		<!-- 查询弹出div -->
		<!-- 图层控制div -->
		<div id="layerControl"
			style="position: absolute; top: 45px; left: 250px; max-height: 500px; max-width: 400px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 90); opacity: 0.9;"></div>
		<!-- 测试bootstrap -->
		<div id="cxtc" class="panel panel-primary"
			style="position: absolute; SCROLLBAR-TRACK-COLOR: white; top: 80px; right: 10px; z-index: 999; max-width: 400px; visibility: hidden; filter: alpha(opacity = 90); opacity: 0.9;">
			<div class="panel-heading">
				<h4 class="panel-title" style="display: inline;">
					查询结果
					<!-- 					<a id="queryresult" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"> 查询结果 </a> -->
				</h4>
				<a href="javascript:void(0)" onclick="closeResult()" title="关闭" style="text-decoration: none; color: white; margin-left: 238px;">
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
						<a href="#rescue" data-toggle="tab"> 救援队</a>
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
				<div id="myTabContent" class="tab-content" style="overflow: auto; max-height: 500px;">
					<div class="tab-pane fade in active" id="emergency">
						<table class="table table-bordered table-striped">
							<tbody id="showMerByGeoContent">
							</tbody>
						</table>
					</div>
					<div class="tab-pane fade" id="rescue">
						<table class="table table-bordered table-striped">
							<tbody id="rescueContent">
							</tbody>
						</table>
					</div>
					<div class="tab-pane fade" id="workarea">
						<table class="table table-bordered table-striped">
							<tbody id="workareaContent">
							</tbody>
						</table>
					</div>
					<div class="tab-pane fade" id="hospital">
						<table class="table table-bordered table-striped">
							<!-- 						<thead id="rightDivThead" style="font-weight: bold;">
						</thead> -->
							<tbody id="hospitalContent">
							</tbody>
						</table>
					</div>
					<div class="tab-pane fade" id="policeOffice">
						<table class="table table-bordered table-striped">
							<!-- 						<thead id="rightDivThead" style="font-weight: bold;">
						</thead> -->
							<tbody id="policeOfficeContent">
							</tbody>
						</table>
					</div>
					<div class="tab-pane fade" id="fireBrigade">
						<table class="table table-bordered table-striped">
							<!-- 						<thead id="rightDivThead" style="font-weight: bold;">
						</thead> -->
							<tbody id="fireBrigadeContent">
							</tbody>
						</table>
					</div>
				</div>
				<!-- <div class="panel-body">
					<table class="table table-bordered table-striped table-hover">
						<thead id="rightDivThead" style="font-weight: bold;">
						</thead>
						<tbody id="content">
						</tbody>
					</table>
				</div> -->
			</div>
		</div>
		<!-- 测试bootstrap -->
		<!-- 断面客流 -->
		<div id="sectionPassenger"
			style="max-width: 350px; height: 200px; position: absolute; right: 0; bottom: 0; z-index: 500; overflow: auto; visibility: hidden; background: #FFFFFF; filter: alpha(opacity = 85); opacity: 0.85;">
			<table id="sectionTable">
				<tr>
					<td colspan="3" style="font-weight: bold;">客流设置：</td>
				</tr>
				<tr>
					<td colspan="3">
						地图刷新时间：
						<input id="refreshTime" style="width: 140px;" value="5">
						分钟
					</td>
				</tr>
				<tr>
					<td>Ⅰ级响应：颜色：</td>
					<td>
						<div id="response1Color" class="color-box" style="background-color: red;"></div>
					</td>
					<td>
						人数
						<input id="response1" value="50000">
					</td>
				</tr>
				<tr>
					<td>Ⅱ级响应：颜色：</td>
					<td>
						<div id="response2Color" class="color-box" style="background-color: orange"></div>
					</td>
					<td>
						人数
						<input id="response2" value="40000">
					</td>
				</tr>
				<tr>
					<td>Ⅲ级响应：颜色：</td>
					<td>
						<div id="response3Color" class="color-box" style="background-color: yellow"></div>
					</td>
					<td>
						人数
						<input id="response3" value="30000">
					</td>
				</tr>
				<tr>
					<td>Ⅳ级响应：颜色：</td>
					<td>
						<div id="response4Color" class="color-box" style="background-color: blue"></div>
					</td>
					<td>
						人数
						<input id="response4" value="20000">
					</td>
				</tr>
			</table>
			<div style="height: 30px; text-align: center;">
				<input type="button" class="white" onclick="saveSet()" value="保存当前设置">
				<input style="margin-left: 30px;" class="white" type="button" onclick="restoreDefault()" value="恢复默认设置">
			</div>
		</div>
		<!-- 断面客流 -->
		<!-- 历史客流 -->
		<div id="historyFlow"
			style="max-width: 350px; max-height: 150px; position: absolute; right: 0; bottom: 0; z-index: 500; overflow: auto; visibility: hidden; background: #FFFFFF; filter: alpha(opacity = 85); opacity: 0.85;">
			<table>
				<tr>
					<td>时间：</td>
				</tr>
				<tr>
					<td>
						<input id="beginDate" name="beginDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false});"
							style="width: 120px; height: 25px;" />
						-
						<input id="endDate" name="endDate" type="text" readonly="readonly" maxlength="20" class="input-medium Wdate" onclick="WdatePicker({dateFmt:'yyyy-MM-dd',isShowClear:false});"
							style="width: 120px; height: 25px;" />
					</td>
				</tr>
				<tr>
					<td>
						<input type="text" id="totalTime" />
						分钟
					</td>
				</tr>
				<tr>
					<td>
						<input type="button" class="white" onclick="saveHistorySet()" value="保存">
					</td>
				</tr>
			</table>
		</div>
		<!-- 历史客流 -->
	</div>
	<script type="text/javascript">
		var ctx = "${ctx}";
		var ctxStatic = "${ctxStatic}";
	</script>
	<script id='tt' src='${ctxStatic}/arcmap/js/arcmaps-config.js' type="text/javascript"></script>
	<script src="${ctxStatic}/arcmap/js/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="${ctxStatic}/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
	<script src="${ctxStatic}/typeahead.js/analytics.js" type="text/javascript"></script>
	<script src="${ctxStatic}/typeahead.js/handlebars.js" type="text/javascript"></script>
	<script src="${ctxStatic}/typeahead.js/typeahead.bundle.js" type="text/javascript"></script>
	<script src="${ctxStatic}/bootstrap/3.3.4/js/bootstrap.min.js" type="text/javascript"></script>
	<script src='${ctxStatic}/arcmap/js/colpick.js' type="text/javascript"></script>
	<script id='arcmapsjs' src='${ctxStatic}/arcmap/js/arcmapsFolw.js' type="text/javascript"></script>
	<script src='${ctxStatic}/arcmap/js/baseMap.js' type="text/javascript"></script>
	<script id='mainjs' src='${ctxStatic}/arcmap/js/main.js?ctx=${ctx}&ctxStatic=${ctxStatic}' type="text/javascript"></script>
	<script src='${ctxStatic}/arcmap/js/echarts-all.js' type="text/javascript"></script>
	<script type="text/javascript">
		var substringMatcher = function(strs) {
			return function findMatches(q, cb) {
				var matches, substringRegex;

				// an array that will be populated with substring matches
				matches = [];

				// regex used to determine if a string contains the substring `q`
				substrRegex = new RegExp(q, 'i');

				// iterate through the pool of strings and for any string that
				// contains the substring `q`, add it to the `matches` array
				$.each(strs, function(i, str) {
					if (substrRegex.test(str)) {
						matches.push(str);
					}
				});
				cb(matches);
			};
		};
		$(function() {
			$("[data-toggle='popover']").popover();
			//bootstrap panel 默认打开
			$('#collapseFour').collapse('show');
			//---颜色选择器---
			$('.color-box').colpick({
				colorScheme : 'dark',
				layout : 'rgbhex',
				color : 'ff8800',
				onSubmit : function(hsb, hex, rgb, el) {
					flowcolor[$(el).context.id.substring(8, 9) - 1] = [ rgb.r, rgb.g, rgb.b ];
					$(el).css('background-color', '#' + hex);
					$(el).colpickHide();
				}
			});
		})
	</script>
</body>
</html>