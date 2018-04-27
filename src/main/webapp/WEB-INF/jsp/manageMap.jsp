<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
<head>
<title>地图维护</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="${pageContext.request.contextPath}/css/main.css" rel="stylesheet" type="text/css" />
<link href="${global['gis.resource.url']}/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
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

#content tr:hover {
	cursor: pointer;
	background: #66b3ff;
}

#cxjg td {
	border: #ccc solid 1px;
	padding: 5px;
}

.caret {
	display: none;
}

.esriPopup .sizer {
	min-width: 300px;
}

.esriPopup .titlePane {
	font-size: medium;
	font-weight: bold;
	/* 	line-height: 40px !important; */
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

.esriPopup .contentPane table tr td:first-child {
	color: white !important;
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
<body scroll=no>
	<div id="map" style="position: relative;">
		<!-- 工具框 -->
		<table class="tbtools">
			<tr>
				<td align="left">
					<table>
						<tr>
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
								<img src="${global['gis.resource.url']}/images/icon/bookmark.png" title="书签" onclick="showBookMarks()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/qc.png" title="删除" onClick="qcSingleOne()" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/qcAll.png" title="清空" onClick="qc()" />
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
								<img src="${global['gis.resource.url']}/images/icon/SelectionRectangle.png" title="框选查询" onClick="drowextent('cx')" />
							</td>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/SelectionPolygon.png" title="多边形选择" onClick="drowpolygon('cx')" />
							</td>
							<%-- <td><img src="${global['gis.resource.url']}/images/icon/biaozhu.png"  title="标注" onClick="markMetro()" /></td> --%>
							<td>
								<img src="${global['gis.resource.url']}/images/icon/plus.png" title="添加点" onClick="manage()" />
							</td>
							<!-- 							<td> -->
							<%-- 								<img src="${global['gis.resource.url']}/images/restypeImage/fxun.png" title="防汛" onClick="addPrevention()" /> --%>
							<!-- 							</td> -->
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<!-- 工具框 -->
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
		<div id="bookMarks"
			style="position: absolute; top: 45px; left: 285px; max-height: 500px; width: 215px; z-index: 999; overflow: auto; visibility: hidden; background: #fff; filter: alpha(opacity = 90); opacity: 0.9;">
			<div style='font-weight: bold; margin: 0, auto;'>书签</div>
			<div class="bookmark-container">
				<div id="bookmarks"></div>
			</div>
		</div>
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
		<!-- <div id="cxtc" style="position:absolute;top:45px;right:10px;height:500px;width:400px;z-index:999;
         overflow:auto;visibility:hidden;">
         	<table id="cxjg" style="border-collapse:collapse;">
         		<thead style="font-weight: bold;">
         			<tr><td>名称</td><td>地址</td><td>负责人</td><td>联系电话</td></tr>
         		</thead>
				<tbody id="content">
				</tbody>
			</table>
         </div> -->
		<!-- 测试bootstrap -->
		<div id="cxtc" class="panel panel-primary">
			<div class="panel-heading">
				<h4 class="panel-title">
					查询结果
					<!-- 					<a id="queryresult" data-toggle="collapse" data-parent="#accordion" href="#collapseFour"> 查询结果 </a> -->
					<a href="javascript:void(0)" onclick="closeResult()" title="关闭" style="text-decoration: none; color: white; margin-left: 285px;">
						<span class="glyphicon glyphicon-remove"></span>
					</a>
				</h4>
			</div>
			<div id="collapseFour" class="panel-collapse" style="background: #fff;">
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
				<div id="myTabContent" class="tab-content" style="overflow: auto; height: 90%">
					<div class="tab-pane fade in active" id="emergency"></div>
					<div class="tab-pane fade" id="rescueTeam"></div>
					<div class="tab-pane fade" id="prevention"></div>
					<div class="tab-pane fade" id="workarea"></div>
					<div class="tab-pane fade" id="hospital"></div>
					<div class="tab-pane fade" id="policeOffice"></div>
					<div class="tab-pane fade" id="fireBrigade"></div>
				</div>
			</div>
		</div>
		<!-- 测试bootstrap -->
	</div>
	<script type="text/javascript">
		var ctx = "${pageContext.request.contextPath}";
		var ctxStatic = "${global['gis.resource.url']}";
	</script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/arcmaps-config.js"></script>
	<link type="text/css" rel="stylesheet" href="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/dijit/themes/tundra/tundra.css" />
	<link type="text/css" rel="stylesheet" href="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/esri/css/esri.css" />
	<script type="text/javascript" src="${global['gis.resource.url']}/js/arcgis_js_api/library/3.20/3.20/init.js"></script>
	<script type="text/javascript" src="${global['gis.resource.url']}/js/jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/arcmaps.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/baseMap.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/main.js"></script>
	<script type="text/javascript" src="${global['gis.resource.url']}/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		window.onload = function() {
			setTimeout(manageMapReady(), 1000);
		}
	</script>
</body>
</html>