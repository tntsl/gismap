//该js处理业务相关方法，删除不影响基本功能的使用
//$(function ($) {
//	$(".tbtools img").on("mouseout", function () {
//		var Index = $(this).attr("src").lastIndexOf(".");
//		$(this).css("height", "26px");
//		$(this).css("border", "none");
//	});
//	$(".tbtools img").on("mouseover", function () {
//		var Index = $(this).attr("src").lastIndexOf(".");
//		// $(this).attr("src", $(this).attr("src").substring(0, Index) +
//		// "1.png")
//		$(this).css("height", "24px");
//		$(this).css("border", "1px solid #6d6d71");
//	});
//});

// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
var curWwwPath = window.document.location.href;
// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
// 获取主机地址，如： http://localhost:8083
var localhostPaht = curWwwPath.substring(0, pos);
// 获取带"/"的项目名，如：/uimcardprj
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
var ctx = localhostPaht + projectName;

// 地图维护页面加载后执行
function manageMapReady() {
	getAllXfd();
	getAllJyd();
// getAllRescueTeams();
	getAllArea();
// getAllWorkAreas();
// getAllPrevention();
}

// 获得所有消防队
function getAllXfd() {
	$.post(ctx + "/arcmap/getAllXfd/", function (fireBrigates) {
		$(fireBrigates).each(function () {
			var fireBrigate=this;
			if (fireBrigate.x != null && fireBrigate.y != null) {
				var point = new esri.geometry.Point(fireBrigate.x, fireBrigate.y, map.spatialReference);
				var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/icon/03.png", 24, 20);
				var graphic = new esri.Graphic(point, symbol);
				graphic.attributes = fireBrigate.id;
				var infoTemplate = new esri.InfoTemplate();
				infoTemplate.setTitle("消防队");
				var selectNode = generateSelectNode(fireBrigate.x, fireBrigate.y, "", socailResourceOptions);
				selectNode.find("option[value='fireBrigate']").attr("selected", "selected");
				var fireBrigateForm= generateFireBrigateForm(rescueTeam.x, rescueTeam.y, "", selectNode, fireBrigate);
				fireBrigateForm.append("<input type='hidden' name='ctype' value='"+fireBrigateForm.find("select[name='ctype']").val()+"'/>")
				fireBrigateForm.find("select[name='ctype']").parents("tr").remove();
				fireBrigateForm.find("input:text").each(function(){
					$(this).parent().append($(this).val());
					$(this).remove();
				})
				fireBrigateForm.find("input[value='提交']:button").parents("tr").remove();
				infoTemplate.setContent(fireBrigateForm[0].outerHTML);
				graphic.setInfoTemplate(infoTemplate);
				myMap.graphics.add(graphic);
			}
		})
	},"json");
}

// 获得所有救援队
function getAllJyd() {
	$.post(ctx + "/arcmap/getAllJyd/", function (rescueTeams) {
		generateRescueTeamList("#rescueTeam",rescueTeams,true);
	},"json");
}

// 获得工区、变电所、段场
function getAllArea() {
	$.post(ctx + "/arcmap/getAllArea/", function (workSites) {
		var html="";
		var workAreas=[];
		var subStations=[];
		var depots=[]; // 段场
		$(workSites).each(function() {
			var workSite=this;
			switch(workSite.stype){
			case 1:
				workAreas.push(workSite);
				break;
			case 2:
				subStations.push(workSite);
				break;
			case 3:
				depots.push(workSite);
				break;
			}
		});
		generateWorkAreaList("#workarea", workAreas, false,true);
		generateSubstationPoint(subStations);
		generateDepotPoint(depots);
	},"json");
}

// 获得所有防汛点
function getAllPrevention() {
	$.post(ctx + "/arcmap/findPreventionAll/", function (msg) {
		var html = "";
		var dics={"safetyDoor":"安全门","escalator":"电梯","passageway":"出入口","stationHall":"站厅","stationPlat":"站台","interval":"区间","remarks":"其他"};
		$.ajaxSettings.async = false;
		$(msg).each(function(){
			var prevention=this;
			if(prevention.safetyDoor=="正常"&&prevention.escalator=="正常"&&prevention.passageway=="正常"&&prevention.stationHall=="正常"&&prevention.stationPlat=="正常"&&prevention.interval=="正常"&&prevention.remarks=="正常"){
				return;
			}
			var station=getStationByCode(prevention.station.code);
			if(!station){
				return;
			}
			var point = new esri.geometry.Point(station.x, station.y, new esri.SpatialReference({
				wkid: 4490
			}));
			var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/icon/fx.png", 27, 27);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "prevention";
			myMap.graphics.add(graphic);
			html += "<table class='materialTable' style='width:100%;' onclick='FlyToXY("+station.x+", "+station.y+", 7);'><tr style='font-weight:bold;width:150px;background-color:#cbfed0;cursor:hand;'><td colspan='2'>车站：" + isnull(prevention.station.name) + "</td></tr>";
			if(prevention.safetyDoor!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["safetyDoor"] + "</div><div>事因：" + isnull(prevention.safetyDoor) + "</div></td></tr>";
			}
			if(prevention.escalator!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["escalator"] + "</div><div>事因：" + isnull(prevention.escalator) + "</div></td></tr>";
			}
			if(prevention.passageway!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["passageway"] + "</div><div>事因：" + isnull(prevention.passageway) + "</div></td></tr>";
			}
			if(prevention.stationHall!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["stationHall"] + "</div><div>事因：" + isnull(prevention.stationHall) + "</div></td></tr>";
			}
			if(prevention.stationPlat!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["stationPlat"] + "</div><div>事因：" + isnull(prevention.stationPlat) + "</div></td></tr>";
			}
			if(prevention.interval!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["interval"] + "</div><div>事因：" + isnull(prevention.interval) + "</div></td></tr>";
			}
			if(prevention.remarks!="正常"){
				html += "<tr><td colspan=2><div>位置：" + dics["remarks"] + "</div><div>事因：" + isnull(prevention.remarks) + "</div></td></tr>";
			}
			html+="</table>";
		});
		$.ajaxSettings.async = true;
		$("#prevention").html(html);
		showresult();
		$("#myTab a").filter("[href$='prevention']").tab("show");
	},"json");
}




// 普通业务事件-----------------------------------------
// 按钮的鼠标移上移下事件
function btnmouse(btn, type) {
	if (type == 1) {
		$(btn).addClass("divbtn1");
	} else {
		$(btn).removeClass("divbtn1");
	}
}

// select的change事件
function ChangeLine(Lineid, stationid) {
	var stationstr = "<option value='-8'>请选择车站</option>";
	$.ajaxSettings.async = false;
	$.post(ctx + "/sys/dic/station/getStationByLineIdAjax", {
		lineId: $("#" + Lineid).val(),
		random: Math.random()
	}, function (jsonlist) {
		$(jsonlist).each(
			function (i) {
			stationstr += "<option value=\"" + jsonlist[i].id + "\">" + jsonlist[i].name + "</option>";
		});
	},"json");
	$.ajaxSettings.async = true;
	$("#" + stationid).html(stationstr);
}

// 普通业务事件-----------------------------------------

// 查询按钮
var OptionStr = "";
function SerchM() {
	navToolbar.deactivate();
	if (OptionStr == "") {
		OptionStr = "<option value='-8'>请选择路线</option>";
		$.ajaxSettings.async = false;
		$.post(ctx + "/sys/dic/line/getLineByAjax", {
			random: Math.random()
		}, function (jsonlist) {
			$(jsonlist).each(
				function (i) {
				OptionStr += "<option value=\"" + jsonlist[i].id + "\">" + jsonlist[i].name + "</option>";
			});
		},"json");
		$.ajaxSettings.async = true;
	}
	// GetData(" where 1=1 ");


	// 给线路和车站赋值
	// var trstr="<tr><td><form:select id='line' path='line.id'
	// onchange='getStation();'/>";
	// trstr+="<form:options items='${lineList}' itemValue='id' itemLabel='name'
	// htmlEscape='false' /></form:select></td></tr>";
	// trstr+="<tr><td><form:select id='station'
	// path='station.id'></form:select></td></tr>";
	// trstr+="<tr><td style='padding-left:60px;padding-right:60px'
	// align='center'><div style='width:36px;' onmouseover='btnmouse(this,1)'
	// onmouseout='btnmouse(this,0)'
	// onclick='SerchByCondition(\"se_line\",\"se_station\")'
	// class='divbtn'>查询</div></td></tr>";
	// var OptionStr="<option value='-8'>请选择线路</option><option
	// value='Line5'>5号线</option><option value='Line6'>6号线</option><option
	// value='Line10'>10号线</option><option value='Line1'>1号线</option>";
	var trstr = "<tr><td><select id='se_line' onchange='ChangeLine(\"se_line\",\"se_station\")' class='select_01'>" + OptionStr + "</select></td></tr>";
	trstr += "<tr><td><select id='se_station' class='select_01'><option>请选择车站</option></select></td></tr>";
	trstr += "<tr><td style='padding-left:60px;padding-right:60px' align='center'><div style='width:36px;'  onmouseover='btnmouse(this,1)' onmouseout='btnmouse(this,0)' onclick='SerchByCondition()' class='divbtn'>查询</div></td></tr>";
	ShowMark(" 请选择查询条件", trstr, 60, 210, 0);
}
/**
 * 根据线路和车站区间查看视频
 * 
 * @returns
 */
function showVideo() {
	navToolbar.deactivate();
	var options="";
	if (options == "") {
		options = "<option value='-8'>~~请选择线路~~</option>";
		$.post(ctx + "/sys/dic/line/getLineByAjax",function (data) {
			$(data).each(function () {
				options += "<option value=\"" + this.id + "\">" + this.name + "</option>";
			});
			var trstr = "<tr><td><select name='lineId' onchange='listStationsByLine(\"lineId\",\"stationId1\",\"stationId2\")'>" + options + "</select></td></tr>";
			trstr += "<tr><td><select name='stationId1'><option value=''>~~请选择车站~~</option></select></td></tr>";
			trstr += "<tr><td><select name='stationId2'><option value=''>~~请选择车站~~</option></select></td></tr>";
			trstr += "<tr><td><select name='directory'><option value=''>~~选择方向~~</option><option value='1'>上行</option><option value='2'>下行</option></select></td></tr>";
			trstr += "<tr><td style='text-align:center;' align='center'><div style='width:36px;margin:0 auto;' onmouseover='btnmouse(this,1)' onmouseout='btnmouse(this,0)' onclick='searchForVideo()' class='divbtn'>查看</div></td></tr>";
			ShowMark("请选择", trstr, 60, 260, 0);
		},"json");
	}
}
/**
 * 根据线路获取车站列表
 * 
 * @param lineId
 * @param stationId1
 * @param stationId2
 * @returns
 */
function listStationsByLine(lineId,stationId1,stationId2){
	$.post(ctx+"/sys/dic/station/getStationByLineIdAjax","lineId="+$("select[name='"+lineId+"']").val(),function(data){
		$("select[name='"+stationId1+"']").empty();
		$("select[name='"+stationId2+"']").empty();
		var options="<option value=''>~~请选择车站~~</option>";
		$(data).each(function(){
			options += "<option value=\"" + this.id + "\">" + this.name + "</option>";
		});
		$("select[name='"+stationId1+"']").append(options);
		$("select[name='"+stationId2+"']").append(options);
	},"json");
}
/**
 * 根据线路车站，获取视频列表
 * 
 * @returns
 */
function searchForVideo(){
	$.post(ctx+"/arcmap/videoInfo/searchForVideo","lineId="+$("select[name='lineId']").val()+"&stationId1="+$("select[name='stationId1']").val()+"&stationId2="+$("select[name='stationId2']").val()+"&directory="+$("select[name='directory']").val(),function(data){
		$("#videoTable tbody").empty();
		if(data&&data.length>0){
			$(data).each(function(){
				$("#videoTable tbody").append("<tr><td>"+this.name+"</td><td><a href='"+ctx+"/arcmap/videoInfo/play?id="+this.id+"' target='_blank'>播放</a></td></tr>")
			})
		}else{
			$("#videoTable tbody").append("<tr><td colspan='2'>~~暂时没有视频~~</td></tr>")
		}
		$("#videoList").css("visibility","visible");
	},"json");
}
// 按条件查询
function SerchByCondition() {
	var lineId = $("#se_line option:selected").val();
	var stationId = $("#se_station option:selected").val();
	var selectIndex = document.getElementById("se_station").selectedIndex;
	var selectText = document.getElementById("se_station").options[selectIndex].text;
	if (lineId == '-8') {
		alert("请选择线路");
		return
	}
	if (stationId == '-8') {
		alert("请选择车站");
		return
	}
	GetData(stationId, selectText);
}

// 标注
var IsBiaozhu = false;
function markMetro() {
	myMap.setMapCursor("url(" + ctxStatic+ "/biaozhu.ico),auto");
	IsBiaozhu = true;
}

// 定位车站
function GetData(stationid, selectText) {
	myMap.graphics.clear();
	$.get(ctx+ "/arcmap/line/getStation/" + stationid,
		function (stations) {
		$(stations).each(function(){
			var station=this;
			var point = new esri.geometry.Point(station.x, station.y, new esri.SpatialReference({
				wkid: 4490
			}));
			var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/icon/biaozhured.png", 24, 32);
			symbol.setOffset(0, 16);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "cz";
			myMap.graphics.add(graphic);
			myMap.centerAndZoom(point, 7);
		});
	},"json");
}

// 关闭弹出框浮动层
function closediv() {
	$("#TBinfoTemplate").hide();
	myMap.setMapCursor("url(),auto");
	// 根据标注的attributes来移除图标
	if ($("#hd_GPH").val() != "") {
		for (var i = 0; i < myMap.graphics.graphics.length; i++) {
			if (typeof(myMap.graphics.graphics[i].attributes) == 'undefined')
				continue;
			if (myMap.graphics.graphics[i].attributes.split('@')[0] == "pointYJZH") {
				myMap.graphics.clear();
				gl.clear();
				break;
			}
			if (myMap.graphics.graphics[i].attributes.split('@')[0] == $("#hd_GPH").val()) {
				myMap.graphics.remove(myMap.graphics.graphics[i]);
			}
		}
	}
	$("#hd_GPH").val("");
}

// 添加文本框
function addTextDiv(){
	if($("#titleDiv").length){
		var showAble=$("#titleDiv").css("display");
		if(showAble==="none"){
			$("#titleDiv").css("display","");
		}else{
			$("#titleDiv").css("display","none");
		}
	}else{
		var textDiv=$('<div id="titleDiv" class="panel panel-default textDiv"><div class="panel-body"><font onclick="editTitleDivContent(this)">输入标题</font></div></div>');
		$(textDiv).appendTo("body");
		$(textDiv).css({"position": "absolute","left": "0px","top": "50px","z-index": "999","font-size":"40px","font-weight":"bold","max-width":"50%","text-align":"center","background-color":"#fff","border": "1px solid transparent","border-radius":"4px","box-shadow": "0 1px 1px rgba(0, 0, 0, .05)"});
	}
	reloadPosition("#titleDiv");
}

// 重新定位指定元素的位置
function reloadPosition(obj){
	var left="0px";
	$(obj).css("left",left);
	var windowWidth=document.body.clientWidth;
	var width=$(obj)[0].clientWidth;
	if(windowWidth<width){
		width="100%";
	}else{
		left=(windowWidth-width)/2+"px";
	}
	$(obj).css("left",left);
}

// 编辑div中内容
function editTitleDivContent(obj){
	var content=$(obj).text();
	$(obj).before("<textarea oncontextmenu='confirmContent(this)'>"+content+"</textarea>");
	$(obj).remove();
	reloadPosition("#titleDiv");
}

// 确认输入的内容
function confirmContent(obj){
	var content=$(obj).val();
	$(obj).before("<font onclick='editTitleDivContent(this)'>"+content+"</font>");
	$(obj).remove();
	reloadPosition("#titleDiv");
}

// 公用方法，可多次调用-----------------------------------------------------------------------------------------------------
// 获取线路列表
function getLinesDic(){
	var lines=JSON.parse(sessionStorage.getItem("gis_lines"))||[];
	if(!lines.length){
		$.ajax({
			url:ctx + "/sys/dic/line/getLineByAjax",
			dataType:"json",
			async:false,
			success:function(linesData){
				lines=linesData;
				sessionStorage.setItem("gis_lines",JSON.stringify(lines));
			}
		});
	}
	return lines;
}
// 获取车站坐标点列表
function getStationPointDic(){
	var stations=JSON.parse(sessionStorage.getItem("gis_stationPoints"))||[];
	if(!stations.length){
		$.ajax({
			url:ctx+"/arcmap/line/stations.json",
			dataType:"json",
			async:false,
			success:function(stationsData){
				stations=stationsData;
				sessionStorage.setItem("gis_stationPoints",JSON.stringify(stations));
			}
		});
	}
	return stations;
}
// 根据车站编号获取车站
function getStationByCode(stationCode){
	var stations=getStationPointDic();
	for(var i=0,max=stations.length;i<max;i++){
		var station=stations[i];
		if(station&&station.pointCode&&(station.pointCode===stationCode||station.pointCode.indexOf(stationCode)!=-1)){
			return station;
		}
	}
}

function addEnterListen(target,obj){
	document.onkeydown=function(e){
		if(e.keyCode===13){
			filterMaterialList(target,$(obj).next()[0]);
		}
	}
}

function clearEnterListen(){
	document.onkeydown=null;
}
// 生成下拉选项
function generateSelectNode(x, y, station, options) {
	var selectNode = $("<select name='ctype' class='select_01' onchange=changexxTable(" + x + "," + y + ",'" + station + "',this)></select>");
	$(options).each(function() {
		var option = this;
		selectNode.append("<option value='" + option.value + "'>" + option.name + "</option>");
	});
	return selectNode;
}

// 生成消防队表单
function generateFireBrigateForm(x, y, station, selectNode, firBrigate) {
	firBrigate = firBrigate || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (firBrigate.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>地址：</td><td><input type='text' name='addr' value='" + (firBrigate.addr || "") + "'></td></tr>");
	tableNode.append("<tr><td>负责人：</td><td><input type='text' name='person' value='" + (firBrigate.person || "") + "'></td></tr>");
	tableNode.append("<tr><td>电话：</td><td><input type='text' name='phone' value='" + (firBrigate.phone || "") + "'></td></tr>");
	tableNode.append("<tr><td>专业器材：</td><td><input type='text' name='specialequip' value='" + (firBrigate.specialequip || "") + "'></td></tr>");
	tableNode.append("<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + (station || firBrigate.stationname || "") + "></td></tr>");
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addSocialResource(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (firBrigate.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || firBrigate.x || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || firBrigate.y || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}

// 生成警察局表单
function generatePoliceForm(x, y, station, selectNode, police) {
	police = police || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (police.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>地址：</td><td><input type='text' name='addr' value='" + (police.addr || "") + "'></td></tr>");
	tableNode.append("<tr><td>负责人：</td><td><input type='text' name='person' value='" + (police.person || "") + "'></td></tr>");
	tableNode.append("<tr><td>电话：</td><td><input type='text' name='phone' value='" + (police.phone || "") + "'></td></tr>");
	tableNode.append("<tr><td>管辖范围：</td><td><input type='text' name='region' value='" + (police.region || "") + "'></td></tr>");
	tableNode.append("<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + (station || police.stationname || "") + "></td></tr>");
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addSocialResource(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (police.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || police.x || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || police.y || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}
// 生成医院表单
function generateHospitalForm(x, y, station, selectNode, hospital) {
	hospital = hospital || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (hospital.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>地址：</td><td><input type='text' name='addr' value='" + (hospital.addr || "") + "'></td></tr>");
	tableNode.append("<tr><td>负责人：</td><td><input type='text' name='person' value='" + (hospital.person || "") + "'></td></tr>");
	tableNode.append("<tr><td>电话：</td><td><input type='text' name='phone' value='" + (hospital.phone || "") + "'></td></tr>");
	tableNode.append("<tr><td>区域：</td><td><input type='text' name='region' value='" + (hospital.region || "") + "'></td></tr>");
	tableNode.append("<tr><td>级别：</td><td><input type='text' name='hsplevel' value='" + (hospital.hsplevel || "") + "'></td></tr>");
	tableNode.append("<tr><td>专科：</td><td><input type='text' name='subject' value='" + (hospital.subject || "") + "'></td></tr>");
	tableNode.append("<tr><td>临近地铁站：</td><td><input type='text' name='stationname' value=" + (station || hospital.stationname || "") + "></td></tr>");
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addSocialResource(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (hospital.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || hospital.id || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || hospital.id || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}
// 生成救援队表单
function generateRescueTeamForm(x, y, station, selectNode, rescueTeam) {
	rescueTeam = rescueTeam || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (rescueTeam.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>队长：</td><td><input type='text' name='leaderName' value='" + (rescueTeam.leaderName || "") + "'></td></tr>");
	tableNode.append("<tr><td>队长电话：</td><td><input type='text' name='mobile' value='" + (rescueTeam.mobile || "") + "'></td></tr>");
	var lineSelectNode = generateLineSelectNode({
		"name" : "line.id",
		"class" : "select_01"
	});
	lineSelectNode.find("option[value='" + (rescueTeam.line && rescueTeam.line.id || "") + "']").attr("selected", "selected");
	var lineTrNode = $("<tr><td>线路：</td></tr>");
	var lineTdNode = $("<td></td>");
	lineTdNode.append(lineSelectNode);
	lineTrNode.append(lineTdNode);
	tableNode.append(lineTrNode);
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addRescueTeam(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (rescueTeam.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || rescueTeam.x || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || rescueTeam.y || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}

// 生成工区表单
function generateWorkAreaForm(x, y, station, selectNode, workArea) {
	workArea = workArea || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (workArea.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>电话：</td><td><input type='text' name='mobile' value='" + (workArea.mobile || "") + "'></td></tr>");
	tableNode.append("<tr><td>地点：</td><td><input type='text' name='person' value='" + (workArea.person || "") + "'></td></tr>");
	tableNode.append("<tr><td>工区专业：</td><td><input type='text' name='infratype' value='" + (workArea.infratype || "") + "'></td></tr>");
	tableNode.append("<tr><td>管辖范围：</td><td><input type='text' name='infraarea' value='" + (workArea.infraarea || "") + "'></td></tr>");
	var lineSelectNode = generateLineSelectNode({
		"name" : "line.id",
		"class" : "select_01"
	});
	lineSelectNode.find("option[value='" + (workArea.line && workArea.line.id || "") + "']").attr("selected", "selected");
	var lineTrNode = $("<tr><td>线路：</td></tr>");
	var lineTdNode = $("<td></td>");
	lineTdNode.append(lineSelectNode);
	lineTrNode.append(lineTdNode);
	tableNode.append(lineTrNode);
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addWorkArea(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (workArea.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || workArea.x || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || workArea.y || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}

// 生成变电厂表单
function generateSubstationForm(x, y, station, selectNode, substation) {
	substation = substation || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (substation.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>电话：</td><td><input type='text' name='mobile' value='" + (substation.mobile || "") + "'></td></tr>");
	tableNode.append("<tr><td>地点：</td><td><input type='text' name='person' value='" + (substation.person || "") + "'></td></tr>");
	tableNode.append("<tr><td>车站型式：</td><td><input type='text' name='stationtype' value='" + (substation.stationtype || "") + "'></td></tr>");
	tableNode.append("<tr><td>管辖范围：</td><td><input type='text' name='infraarea' value='" + (substation.infraarea || "") + "'></td></tr>");
	tableNode.append("<tr><td>类型：</td><td><input type='text' name='infratype' value='" + (substation.infratype || "") + "'></td></tr>");
	tableNode.append("<tr><td>位置：</td><td><input type='text' name='addr' value='" + (substation.addr || "") + "'></td></tr>");
	var lineSelectNode = generateLineSelectNode({
		"name" : "line.id",
		"class" : "select_01"
	});
	lineSelectNode.find("option[value='" + (substation.line && substation.line.id || "") + "']").attr("selected", "selected");
	var lineTrNode = $("<tr><td>线路：</td></tr>");
	var lineTdNode = $("<td></td>");
	lineTdNode.append(lineSelectNode);
	lineTrNode.append(lineTdNode);
	tableNode.append(lineTrNode);
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addWorkArea(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (substation.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || substation.x || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || substation.y || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}

// 生成车辆段表单
function generateDepotForm(x, y, station, selectNode, depot) {
	depot = depot || {};
	var tableNode = $("<table></table>");
	var resourceTrNode = $("<tr><td>资源类型：</td></tr>");
	var resourceSelectTdNode = $("<td></td>");
	resourceSelectTdNode.append(selectNode);
	resourceTrNode.append(resourceSelectTdNode);
	tableNode.append(resourceTrNode);
	tableNode.append("<tr><td>名称：</td><td><input type='text' name='name' value='" + (depot.name || "") + "'></td></tr>");
	tableNode.append("<tr><td>电话：</td><td><input type='text' name='mobile' value='" + (depot.mobile || "") + "'></td></tr>");
	tableNode.append("<tr><td>负责人：</td><td><input type='text' name='person' value='" + (depot.person || "") + "'></td></tr>");
	tableNode.append("<tr><td>管辖范围：</td><td><input type='text' name='infraarea' value='" + (depot.infraarea || "") + "'></td></tr>");
	var lineSelectNode = generateLineSelectNode({
		"name" : "line.id",
		"class" : "select_01"
	});
	lineSelectNode.find("option[value='" + (depot.line && depot.line.id || "") + "']").attr("selected", "selected");
	var lineTrNode = $("<tr><td>线路：</td></tr>");
	var lineTdNode = $("<td></td>");
	lineTdNode.append(lineSelectNode);
	lineTrNode.append(lineTdNode);
	tableNode.append(lineTrNode);
	tableNode.append("<tr><td colspan='2'><input type='button' onclick='addWorkArea(this)' value='提交'></td></tr>");
	var formNode = $("<form></form>");
	formNode.append("<input type='hidden' name='id' value='" + (depot.id || "") + "'/>");
	formNode.append("<input type='hidden' name='x' value='" + (x || depot.x || "") + "'/>");
	formNode.append("<input type='hidden' name='y' value='" + (y || depot.y || "") + "'/>");
	formNode.append(tableNode);
	return formNode;
}
// 生成应急物资列表
var colorFulSelections=["blue","red","green","purple"];
function generateMaterialList(target,materials,keepPreviousData){
	var searchTool="<table id='queryTable' style='width:100%;'><tr><td><input name='keyWords' style='margin:5px;width:65%;' placeholder='请输入要查询的关键字。。' onfocus='addEnterListen(\""+target+"\",this)' onblur='clearEnterListen();' /><button type='button' onclick='filterMaterialList(\""+target+"\",this)'>查找</button>&nbsp;<button type='button' onclick='resetMaterialList(\""+target+"\",this)'>重置</button></td></tr></table>";
	// 是否保留之前的记录
	if(keepPreviousData!==true){
		$(target).empty();
	}else{
		$(target).find(".emptyData").remove();
	}
	if($(target).find("#queryTable").length==0){
		$(target).append(searchTool);
	}
	var currentFontColor="blue";
	var currentType=0;
	if(materials.length){
		var previousMaterialTypeId;
		$(materials).each(function() {
			var material=this;
			if(previousMaterialTypeId&&previousMaterialTypeId!==material.restypeId.id){
				currentType++;
				if(currentType<4){
					currentFontColor=colorFulSelections[currentType];
				}else{
					currentFontColor=colorFulSelections[currentType%4];
				}
			}
			previousMaterialTypeId=material.restypeId.id;
			if(material.station&&material.station.code){
				var station=getStationByCode(material.station.code);
				if(!station){
					return;
				}
				var img=material.restypeId.parent.shortName;
				var graphic= generateMaterialPoint(station,img);
				myMap.graphics.add(graphic);
				var addressDetail="";
				if(material.addressDetail){
					addressDetail =material.addressDetail=="库存"?"":"<font color='red' >&nbsp;["+material.addressDetail+"]</font>";
				}
				var tableNode="<table class='materialTable' style='width:100%;' onclick='FlyToXY("+station.x+", "+station.y+", 7);'></table>";
				var stationInfoTrNode="<tr style='font-weight: bold;background-color:#cbfed0;cursor:hand;'><input type='hidden' value='"+ station.x + "," + station.y + "'></tr>";
				var stationInfoTdNode="<th colspan='2'>站点：" + material.station.name + addressDetail + "<img src='"+ctxStatic + "/images/icon/phone.png"+"' onclick='callMobile(\""+material.personMobile+"\")' style='float:right;margin-right:5px;'/></th>";
				var materialInfoTr="<tr><td colspan='2'>资源名称：<font style='color:"+currentFontColor+";font-weight:bold;'>" + isnull(material.restypeId.name)+ "</font><font style='font-size:14px;'>(数量：" + isnull(material.amount) + ")</font></td></tr>";
				var materialInfoDetailTr="<tr><td colspan='2'>型号：" + isnull(material.model) + "</td></tr><tr><td style='width:50%;'>负责人：" + isnull(material.personName) + "</td><td>电话：" + isnull(material.personMobile) + "</td></tr>";
				stationInfoTrNode=$(stationInfoTrNode).append(stationInfoTdNode);
				tableNode=$(tableNode).append(stationInfoTrNode).append(materialInfoTr).append(materialInfoDetailTr);
				$(target).append(tableNode);
			}
		});
	}
	if(!$(target).find(".materialTable").length&&!$(target).find(".emptyData").length)
	{
		var emptyResult='<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
		$(target).find("#queryTable").remove();
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='emergency']").tab("show");
	$("#myTabContent").find("div#emergency").addClass("active in");
}
// 生成工区列表
function generateWorkAreaList(target,workAreas,keepPreviousData,needInfoTemplate){
	// 是否保留之前的记录
	if(keepPreviousData!==true){
		$(target).empty();
	}else{
		$(target).find(".emptyData").remove();
	}
	if(workAreas.length){
		$(workAreas).each(function() {
			var workArea=this;
			var positionX=workArea.x||0,positionY=workArea.y||0;
			var point = new esri.geometry.Point(positionX, positionY, myMap.spatialReference);
			var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/restypeImage/gq.png", 25, 25);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "workArea";
			if(needInfoTemplate===true){
				var infoTemplate = new esri.InfoTemplate();
				infoTemplate.setTitle("工区");
				var selectNode = generateSelectNode(workArea.x, workArea.y, "", socailResourceOptions);
				selectNode.find("option[value='workArea']").attr("selected", "selected");
				var workAreaForm= generateWorkAreaForm(workArea.x, workArea.y, "", selectNode, workArea);
				workAreaForm.append("<input type='hidden' name='ctype' value='"+workAreaForm.find("select[name='ctype']").val()+"'/>")
				workAreaForm.find("select[name='ctype']").parents("tr").remove();
				workAreaForm.find("input[value='提交']:button").parent().append("<input type='button' onclick='delWorkArea("+workArea.id+")' value='删除'>");
				infoTemplate.setContent(workAreaForm[0].outerHTML);
				graphic.setInfoTemplate(infoTemplate);
				myMap.infoWindow.resize(350, 600);
			}
			myMap.graphics.add(graphic);
			var professionName=workArea.infratype?"&nbsp;<font color='red'>[" + (workArea.infratype||"")+"]</font>":"";
			var html = "<table class='materialTable' style='width:100%;' onclick='FlyToXY("+positionX+", "+positionY+", 7);'><tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'><td colspan='2'>名称：" + workArea.name + professionName + "</td>" + "<input type='hidden' value='"
			+ positionX + "," + positionY + "'>" + "</tr>";
			html += "<tr><td colspan=2><div>电话：" + isnull(workArea.mobile) + "</div><div>地点：" + isnull(workArea.person) + "</div></td></tr>";
			$(target).append(html+"</table>");
		});
	}
	if(!$(target).find(".materialTable").length&&!$(target).find(".emptyData").length)
	{
		var emptyResult='<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='workarea']").tab("show");
	$("#myTabContent").find("div#workarea").addClass("active in");
}

// 生成救援队列表
function generateRescueTeamList(target,rescueTeams,needInfoTemplate){
	$(target).empty();
	$(rescueTeams).each(function() {
		var rescueTeam = this;
		var positionX = rescueTeam.x||0, positionY = rescueTeam.y||0;
		var point = new esri.geometry.Point(positionX, positionY, myMap.spatialReference);
		var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/restypeImage/jyd.png", 25, 25);
		var graphic = new esri.Graphic(point, symbol);
		graphic.attributes = "rescueTeam";
		if(needInfoTemplate===true){
			var infoTemplate = new esri.InfoTemplate();
			infoTemplate.setTitle("救援队");
			var selectNode = generateSelectNode(rescueTeam.x, rescueTeam.y, "", socailResourceOptions);
			selectNode.find("option[value='rescueTeam']").attr("selected", "selected");
			var rescueTeamForm= generateRescueTeamForm(rescueTeam.x, rescueTeam.y, "", selectNode, rescueTeam);
			rescueTeamForm.append("<input type='hidden' name='ctype' value='"+rescueTeamForm.find("select[name='ctype']").val()+"'/>")
			rescueTeamForm.find("select[name='ctype']").parents("tr").remove();
			rescueTeamForm.find("input[value='提交']:button").parent().append("<input type='button' onclick='delRescueTeam("+rescueTeam.id+")' value='删除'>");
			infoTemplate.setContent(rescueTeamForm[0].outerHTML);
			graphic.setInfoTemplate(infoTemplate);
		}
		myMap.graphics.add(graphic);
		var html = "<table class='materialTable' style='width:100%;' onclick='FlyToXY("+positionX+", "+positionY+", 7);'><tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'><td colspan='2'>名称：" + rescueTeam.name + "<img src='"+ctxStatic + "/images/icon/phone.png"+"' onclick='callMobile(\""+rescueTeam.mobile+"\")' style='float:right;margin-right:5px;'/></td></tr>";
		html += "<tr><td colspan='2'><div>电话：" + rescueTeam.mobile + "</div><div>负责人：" + rescueTeam.leaderName + "</div></td></tr>";
		$("#rescueTeam").append(html);
	});
	if(!$(target).find(".materialTable").length&&!$(target).find(".emptyData").length)
	{
		var emptyResult='<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='rescueTeam']").tab("show");
	$("#myTabContent").find("div#rescueTeam").addClass("active in");
}

// 生成变电所点
function generateSubstationPoint(subStations){
	$(subStations).each(function(){
		var subStation =this;
		var point = new esri.geometry.Point(subStation.x||0, subStation.y||0, new esri.SpatialReference({
			wkid : 4490
		}));
		var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/restypeImage/bds.png", 24, 20);
		var infoTemplate = new esri.InfoTemplate();
		var graphic = new esri.Graphic(point, symbol);
		var selectNode = generateSelectNode(subStation.x, subStation.y, "", socailResourceOptions);
		selectNode.find("option[value='substation']").attr("selected", "selected");
		var substationForm= generateSubstationForm(subStation.x, subStation.y, "", selectNode, subStation);
		substationForm.append("<input type='hidden' name='ctype' value='"+substationForm.find("select[name='ctype']").val()+"'/>")
		substationForm.find("select[name='ctype']").parents("tr").remove();
		substationForm.find("input[value='提交']:button").parent().append("<input type='button' onclick='delWorkArea("+subStation.id+")' value='删除'>");
		infoTemplate.setContent(substationForm[0].outerHTML);
		graphic.setInfoTemplate(infoTemplate);
		graphic.attributes = subStation.id;
		myMap.graphics.add(graphic);
	});
}

// 生成段场点
function generateDepotPoint(depots){
	$(depots).each(function(){
		var depot=this;
		var point = new esri.geometry.Point(depot.x||0, depot.y||0, new esri.SpatialReference({
			wkid : 4490
		}));
		var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/restypeImage/dc.png", 24, 20);
		var infoTemplate = new esri.InfoTemplate();
		var graphic = new esri.Graphic(point, symbol);
		var selectNode = generateSelectNode(depot.x, depot.y, "", socailResourceOptions);
		selectNode.find("option[value='workArea']").attr("selected", "selected");
		var depotForm= generateDepotForm(depot.x, depot.y, "", selectNode, depot);
		depotForm.append("<input type='hidden' name='ctype' value='"+depotForm.find("select[name='ctype']").val()+"'/>")
		depotForm.find("select[name='ctype']").parents("tr").remove();
		depotForm.find("input[value='提交']:button").parent().append("<input type='button' onclick='delWorkArea("+depot.id+")' value='删除'>");
		infoTemplate.setContent(depotForm[0].outerHTML);
		graphic.setInfoTemplate(infoTemplate);
		graphic.attributes = depot.id;
		myMap.graphics.add(graphic);
	});
}

// 生成应急物资点
function generateMaterialPoint(station,img){
	var point = new esri.geometry.Point(station.x||0, station.y||0, new esri.SpatialReference({
		wkid : 4490
	}));
	var symbol = new esri.symbol.PictureMarkerSymbol(ctxStatic + "/images/restypeImage/" + img + ".png", 25, 25);
	var graphic = new esri.Graphic(point, symbol);
	graphic.attributes = "cz";
	return graphic;
}

// 根据输入关键字过滤显示应急资源表
function filterMaterialList(target,obj){
	var keyWord=$(obj).prev().val();
	var keyWords=keyWord.split(" ");
	$(target).find("table").not($(obj).parents("table")).hide();
	var showAableElements=$(target).find("table");
	$(keyWords).each(function(){
		showAableElements=$(showAableElements).filter(":contains('"+this+"')");
	});
	$(showAableElements).show();
}
// 恢复默认显示
function resetMaterialList(target,obj){
	$(obj).siblings("input:text").val("");
	$(target).find("table").show();
}
