<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>demo</title>
<script id='tt' src='${ctxStatic}/arcmap/js/arcmaps-config.js?rq=${Math.random()}' type="text/javascript"></script>
<script src="${ctxStatic}/arcmap/js/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="${ctxStatic}/typeahead.js/analytics.js" type="text/javascript"></script>
<script src="${ctxStatic}/typeahead.js/handlebars.js" type="text/javascript"></script>
<script src="${ctxStatic}/typeahead.js/typeahead.bundle.js" type="text/javascript"></script>
<!-- bootstrap -->
<link href="${ctxStatic}/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<script src="${ctxStatic}/bootstrap/3.3.4/js/bootstrap.min.js" type="text/javascript"></script>
<!-- 地图样式 -->
<link href="${ctxStatic}/arcmap/css/main.css?rq=${Math.random()}" rel="stylesheet" type="text/css" />
<link href="${ctxStatic}/typeahead.js/examples.css?rq=${Math.random()}" rel="stylesheet" type="text/css" />
<!-- 地图基本工具-->
<script id='arcmapsjs' src='${ctxStatic}/arcmap/js/arcmapsStation.js?rq=${Math.random()}' type="text/javascript"></script>
<script src='${ctxStatic}/arcmap/js/baseMap.js?rq=${Math.random()}' type="text/javascript"></script>
<!-- 地图与数据交互-->
<script id='mainjs' src='${ctxStatic}/arcmap/js/main.js?rq=${Math.random()}&ctx=${ctx}&ctxStatic=${ctxStatic}' type="text/javascript"></script>
<!-- echarts -->
<script src='${ctxStatic}/arcmap/js/echarts-all.js?rq=${Math.random()}' type="text/javascript"></script>
<!-- viewer -->
<link href="${ctxStatic}/arcmap/css/viewer.min.css?rq=${Math.random()}" rel="stylesheet" type="text/css" />
<script src='${ctxStatic}/arcmap/js/viewer-jquery.min.js?rq=${Math.random()}' type="text/javascript"></script>
<%-- 	<link href="${ctxStatic}/arcmap/css/lrtk.css?rq=${Math.random()}"
	rel="stylesheet" type="text/css" /> --%>
<!-- <style type="text/css">
		#content tr:hover{
			cursor:pointer;
			background: #66b3ff;
		}
		#cxjg td{
		 	border:#ccc solid 1px; padding:5px;
		}
	</style> -->
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

.white {
	margin: 5px 0;
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

.station-button {
	display: inline-block;
	position: relative;
	margin: 5px;
	padding: 0 20px;
	width: 150px;
	height: 38px;
	text-align: center;
	text-decoration: none;
	font: bold 12px/25px Arial, sans-serif;
	text-shadow: 1px 1px 1px rgba(255, 255, 255, .22);
	-webkit-border-radius: 30px;
	-moz-border-radius: 30px;
	border-radius: 30px;
	-webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 1px 1px 1px
		rgba(255, 255, 255, .44);
	-moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 1px 1px 1px
		rgba(255, 255, 255, .44);
	box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 1px 1px 1px
		rgba(255, 255, 255, .44);
	-webkit-transition: all 0.15s ease;
	-moz-transition: all 0.15s ease;
	-o-transition: all 0.15s ease;
	-ms-transition: all 0.15s ease;
	transition: all 0.15s ease;
}

.gray {
	color: white;
	background: #70c9e3; /* Old browsers */
	background: -moz-linear-gradient(top, #70c9e3 0%, #39a0be 100%);
	/* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #70c9e3),
		color-stop(100%, #39a0be)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top, #70c9e3 0%, #39a0be 100%);
	/* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top, #70c9e3 0%, #39a0be 100%);
	/* Opera 11.10+ */
	background: -ms-linear-gradient(top, #70c9e3 0%, #39a0be 100%);
	/* IE10+ */
	background: linear-gradient(top, #70c9e3 0%, #39a0be 100%); /* W3C */
}

.station-button:hover {
	-webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 0px 0px 2px
		rgba(0, 0, 0, .5);
	-moz-box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 0px 0px 2px
		rgba(0, 0, 0, .5);
	box-shadow: 1px 1px 1px rgba(0, 0, 0, .29), inset 0px 0px 2px
		rgba(0, 0, 0, .5);
}

.station-button:active {
	-webkit-box-shadow: inset 0px 0px 3px rgba(0, 0, 0, .8);
	-moz-box-shadow: inset 0px 0px 3px rgba(0, 0, 0, .8);
	box-shadow: inset 0px 0px 3px rgba(0, 0, 0, .8);
}
</style>
<script>
	$(function() {
		$("[data-toggle='popover']").popover();
	});
	$(function() {
		$('li').hover(function() {
			$(this).addClass('on');
			var wl = $(this).find('img').attr('width');
			if (wl < 190) {
				$(this).find('.in').css('left', '0')
			} else {
				$(this).find('.in').css('left', -wl / 4)
			}
		}, function() {
			$(this).animate({
				height : "120px"
			}, 100).removeClass('on');
			$(this).find('.in').css('left', '0')
		});
	});
</script>
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
	$(
			function() {
				//bootstrap panel 默认打开
				$('#collapseFour').collapse('show');

				//查询所有应急资源
				$.get(getparams('ctx') + "/arcmap/poi/getRestypeName/", function(msg) {
					$('#allQ .typeahead').typeahead({
						hint : true,
						highlight : true,
						minLength : 1
					}, {
						name : 'msg',
						source : substringMatcher(msg)
					});
					$('#allQ .typeahead').bind(
							'typeahead:select',
							function(ev, suggestion) {
								$.get(getparams('ctx') + "/arcmap/poi/getMaterialByResName/", "names=" + suggestion, function(jsonList) {
									if (jsonList.length != 0) {
										var html = "";
										for (var i = 0; i < jsonList.length; i++) {
											html += "<tr style='font-weight: bold;'><td>站点名称：</td><td>" + jsonList[i].station.name + "</td>";
											html += "<tr><td colspan=2><div>资源名称：" + jsonList[i].restypeId.name + "</div><div>型号：" + jsonList[i].model + "</div><div>数量：" + jsonList[i].amount
													+ "</div><div>负责人：" + jsonList[i].personName + "</div><div>电话：" + jsonList[i].personMobile + "</div></td></tr>"
										}
										$("#showMerByGeoContent").html(html);
										document.getElementById("cxtc").style.visibility = "visible";
									} else {
										alert("没有该资源");
									}
								})
							});
				})
			})
</script>
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
							<%-- <td><img src="${ctxStatic}/arcmap/images/icon/biaozhu.png"
								title="照明类" onClick="showMaterialToMap(2)" /></td> --%>
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
								<img src="${ctxStatic}/arcmap/images/icon/LayersControl.png" style="width: 27px; height: 26px;" title="图层控制" onClick="loadLayerList()" />
							</td>
							<td>
								<img src="${ctxStatic}/arcmap/images/icon/qc.gif" style="width: 27px; height: 26px;" title="清除" onClick="qc()" />
							</td>
							<%-- <td><img src="${ctxStatic}/arcmap/images/icon/qc.gif"
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
		<!-- 全文搜索框 -->
		<div id="allQ" style="position: absolute; top: 45px; right: 10px; width: 200px; height: 300px; z-index: 999; overflow: auto;">
			<input type="text" class="typeahead" id="allQuery" name="allQuery" placeholder="资源名称" />
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
			style="position: absolute; top: 45px; left: 250px; max-height: 500px; max-width: 400px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 90); opacity: 0.9;"></div>
		<!-- 测试bootstrap -->
		<div id="cxtc" class="panel panel-primary"
			style="position: absolute; SCROLLBAR-TRACK-COLOR: white; top: 95px; right: 10px; z-index: 999; max-width: 400px; visibility: hidden; filter: alpha(opacity = 90); opacity: 0.9;">
			<div class="panel-heading">
				<h4 class="panel-title">
					<a data-toggle="collapse" data-parent="#accordion" href="#collapseFour"> 查询结果 </a>
				</h4>
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
	</div>
</body>
</html>