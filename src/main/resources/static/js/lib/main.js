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
	$.post(location.serviceName + "/arcmap/manage/getAllXfd/", function (fireBrigades) {
		$(fireBrigades).each(function () {
			var fireBrigade = this;
			var point = new esri.geometry.Point(fireBrigade.x || 0, fireBrigade.y || 0, map.spatialReference);
			var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/icon/03.png", 24, 20);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = fireBrigade.id;
			var infoTemplate = new esri.InfoTemplate();
			infoTemplate.setTitle("修改消防队");
			infoTemplate.setContent("<form id='socialResForm'>"
				 + "<input type='hidden' name='id' value='" + fireBrigade.id + "'>"
				 + "<input type='hidden' name='x' value='" + fireBrigade.x + "'>"
				 + "<input type='hidden' name='y' value='" + fireBrigade.y + "'>"
				 + "<input type='hidden' name='stype' value='" + fireBrigade.stype + "'>"
				 + "<table><tr><td>名&nbsp;&nbsp;&nbsp;称:</td><td><input type='text' name='name' value='" + isnull(fireBrigade.name) + "'</td></tr>"
				 + "<tr><td>专业器材:</td><td><input type='text' name='specialequip' value='" + isnull(fireBrigade.specialequip) + "'</td></tr>"
				 + "<tr><td>具体位置:</td><td><input type='text' name='addr' value='" + isnull(fireBrigade.addr) + "'</td></tr>"
				 + "<tr><td>联系人:</td><td><input type='text' name='person' value='" + isnull(fireBrigade.person) + "'</td></tr>"
				 + "<tr><td>联系人电话:</td><td><input type='text' name='phone' value='" + isnull(fireBrigade.phone) + "'</td></tr>"
				 + "<tr><td>临近地铁站:</td><td><input type='text' name='stationname' value='" + isnull(fireBrigade.stationname) + "'</td></tr>"
				 + "<tr><td><input type='button' value='更改' onclick=\"upateXfd()\"></td>"
				 + "<td><input type='button' value='删除' onclick=\"delXfd(" + fireBrigade.id + ")\"></td></tr></table>");
			graphic.setInfoTemplate(infoTemplate);
			myMap.graphics.add(graphic);
		})
	}, "json");
}

// 获得所有救援队
function getAllJyd() {
	$.post(location.serviceName + "/arcmap/manage/getAllJyd/", function (rescueTeams) {
		generateRescueTeamList("#rescueTeam", rescueTeams, true);
	}, "json");
}

// 获得工区、变电所、段场
function getAllArea() {
	$.post(location.serviceName + "/arcmap/manage/getAllArea/", function (workSites) {
		var html = "";
		var workAreas = [];
		var subStations = [];
		var segmentFields = []; // 段场
		$(workSites).each(function () {
			var workSite = this;
			switch (workSite.stype) {
			case 1:
				workAreas.push(workSite);
				break;
			case 2:
				subStations.push(workSite);
				break;
			case 3:
				segmentFields.push(workSite);
				break;
			}
		});
		generateWorkAreaList("#workarea", workAreas, false, true);
		generateSubstationPoint(subStations);
		generateSegmentFieldPoint(segmentFields);
	}, "json");
}

function getAllSubStations(){
	$.post(location.serviceName + "/arcmap/manage/getAllArea/", function (workSites) {
		var html = "";
		var workAreas = [];
		var subStations = [];
		var segmentFields = []; // 段场
		$(workSites).each(function () {
			var workSite = this;
			switch (workSite.stype) {
			case 1:
				workAreas.push(workSite);
				break;
			case 2:
				subStations.push(workSite);
				break;
			case 3:
				segmentFields.push(workSite);
				break;
			}
		});
		generateSubstationPoint(subStations);
	},"json");
}

// 获得所有防汛点
function getAllPrevention() {
	$.post(location.serviceName + "/arcmap/manage/findPreventionAll/", function (msg) {
		var html = "";
		var dics = {
			"safetyDoor": "安全门",
			"escalator": "电梯",
			"passageway": "出入口",
			"stationHall": "站厅",
			"stationPlat": "站台",
			"interval": "区间",
			"remarks": "其他"
		};
		$.ajaxSettings.async = false;
		$(msg).each(function () {
			var prevention = this;
			if (prevention.safetyDoor == "正常" && prevention.escalator == "正常" && prevention.passageway == "正常" && prevention.stationHall == "正常" && prevention.stationPlat == "正常" && prevention.interval == "正常" && prevention.remarks == "正常") {
				return;
			}
			var station = getStationByCode(prevention.station.code);
			if (!station) {
				return;
			}
			var point = new esri.geometry.Point(station.x, station.y, new esri.SpatialReference({
						wkid: 4490
					}));
			var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/icon/fx.png", 27, 27);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "prevention";
			myMap.graphics.add(graphic);
			html += "<table class='materialTable' style='width:100%;' onclick='FlyToXY(" + station.x + ", " + station.y + ", 7);'><tr style='font-weight:bold;width:150px;background-color:#cbfed0;cursor:hand;'><td colspan='2'>车站：" + isnull(prevention.station.name) + "</td></tr>";
			if (prevention.safetyDoor != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["safetyDoor"] + "</div><div>事因：" + isnull(prevention.safetyDoor) + "</div></td></tr>";
			}
			if (prevention.escalator != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["escalator"] + "</div><div>事因：" + isnull(prevention.escalator) + "</div></td></tr>";
			}
			if (prevention.passageway != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["passageway"] + "</div><div>事因：" + isnull(prevention.passageway) + "</div></td></tr>";
			}
			if (prevention.stationHall != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["stationHall"] + "</div><div>事因：" + isnull(prevention.stationHall) + "</div></td></tr>";
			}
			if (prevention.stationPlat != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["stationPlat"] + "</div><div>事因：" + isnull(prevention.stationPlat) + "</div></td></tr>";
			}
			if (prevention.interval != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["interval"] + "</div><div>事因：" + isnull(prevention.interval) + "</div></td></tr>";
			}
			if (prevention.remarks != "正常") {
				html += "<tr><td colspan=2><div>位置：" + dics["remarks"] + "</div><div>事因：" + isnull(prevention.remarks) + "</div></td></tr>";
			}
			html += "</table>";
		});
		$.ajaxSettings.async = true;
		$("#prevention").html(html);
		showresult();
		$("#myTab a").filter("[href$='prevention']").tab("show");
	}, "json");
}

// 列出所有的安全隐患类型
function getAllSecurityConcernTypes() {
	var showMerTbodyHtml = "";
	$.get(location.serviceName + "/manage/securityConcerns/getTypes.json", function(types) {
		$(types).each(function() {
			showMerTbodyHtml += "<tr><td><input type='checkbox' name='securityConcernType' onclick='getAllSecurityConcerns()' value='" + this.value + "'></td><td>" + this.label + "</td></tr>";
		});
		$("#showMerTbody").html(showMerTbodyHtml);
		// showresult();
		var showAble = document.getElementById("showMer").style.visibility;
		if ("hidden" === showAble) {
			$("#showMer").addClass("aqyh");
			document.getElementById("showMer").style.visibility = "visible";
		} else if ($("#showMer").hasClass("aqyh")) {
			$("#showMer").removeClass("aqyh");
			document.getElementById("showMer").style.visibility = "hidden";
		} else {
			$("#showMer").removeClass();
			$("#showMer").addClass("aqyh");
		}
	}, "json");
}

// 获取并显示所有安全隐患
function getAllSecurityConcerns() {
	var materialsToQuery = $("input[name='securityConcernType']:checked");
	$("#securityConcern").empty();
	myMap.graphics.clear();
	if (materialsToQuery.length > 0) {
		var securityConcernTypes = "";
		$(materialsToQuery).each(function() {
			securityConcernTypes += $(this).val() + ",";
		});
		$.post(location.serviceName + "/manage/securityConcerns/getSecurityConcerns.json", {
			"securityConcernTypes" : securityConcernTypes
		}, function(securityConcerns) {
			generateSecurityConcernsList("#securityConcern", securityConcerns);
		}, "json");
	} else {
		var emptyResult = '<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$("#securityConcern").append(emptyResult);
	}
}

// 更新消防队
function upateXfd() {
	$.post(location.serviceName + "/arcmap/manage/upateXfd", $("#socialResForm").serialize(), function (msg) {
		myMap.graphics.clear();
		myMap.infoWindow.hide();
		manageMapReady();
		alert("更改成功");
	});
}

// 删除消防队
function delXfd(id) {
	if (confirm("确认要删除？")) {
		$.get(location.serviceName + "/arcmap/manage/delXfd/" + id + "/", function (success) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			manageMapReady();
			alert("删除成功");
		});
	}
}

// 更新救援队
function upateJyd() {
	$.post(location.serviceName + "/arcmap/manage/updateJyd", $("#rescueTeamForm").serialize(), function (msg) {
		myMap.graphics.clear();
		myMap.infoWindow.hide();
		manageMapReady();
		alert("更改成功");
	});
}

// 删除救援队
function delJyd(id) {
	if (confirm("确认要删除？")) {
		$.get(location.serviceName + "/arcmap/manage/delJyd/" + id + "/",
			function (msg) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			manageMapReady();
			alert("删除成功");
		});
	}
}

// 更新工区、段场、变电所
function upateWork() {
	$.post(location.serviceName + "/arcmap/manage/addWork",$("#workForm").serialize(), function (msg) {
		myMap.infoWindow.hide();
		myMap.graphics.clear();
		manageMapReady();
		alert("更改成功");
	});
}

// 删除工区、段场、变电所
function delWork(id) {
	if (confirm("确认要删除？")) {
		$.post(location.serviceName + "/arcmap/manage/delWork",{"id":id},function (msg) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			manageMapReady();
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
	$.post(location.serviceName + "/arcmap/manage/addPreventionInfo", {
		data: code
	},
		function (msg) {
		myMap.graphics.clear();
		manageMapReady();
		alert("更改成功");
	});
}

// 删除防汛点
function delPrevention(id) {
	if (confirm("确认要删除？")) {
		$.get(location.serviceName + "/arcmap/manage/delPrevention/" + id + "/",
			function (msg) {
			myMap.infoWindow.hide();
			myMap.graphics.clear();
			manageMapReady();
			alert("删除成功");
		});
	}
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
	$.post(location.serviceName + "/sys/dic/station/getStationByLineIdAjax", {
		lineId: $("#" + Lineid).val(),
		random: Math.random()
	}, function (jsonlist) {
		$(jsonlist).each(
			function (i) {
			stationstr += "<option value=\"" + jsonlist[i].id + "\">" + jsonlist[i].name + "</option>";
		});
	}, "json");
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
		$.post(location.serviceName + "/sys/dic/line/getLineByAjax", {
			random: Math.random()
		}, function (jsonlist) {
			$(jsonlist).each(
				function (i) {
				OptionStr += "<option value=\"" + jsonlist[i].id + "\">" + jsonlist[i].name + "</option>";
			});
		}, "json");
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
	var options = "";
	if (options == "") {
		options = "<option value='-8'>~~请选择线路~~</option>";
		$.post(location.serviceName + "/sys/dic/line/getLineByAjax", function (data) {
			$(data).each(function () {
				options += "<option value=\"" + this.id + "\">" + this.name + "</option>";
			});
			var trstr = "<tr><td><select name='lineId' onchange='listStationsByLine(\"lineId\",\"stationId1\",\"stationId2\")'>" + options + "</select></td></tr>";
			trstr += "<tr><td><select name='stationId1'><option value=''>~~请选择车站~~</option></select></td></tr>";
			trstr += "<tr><td><select name='stationId2'><option value=''>~~请选择车站~~</option></select></td></tr>";
			trstr += "<tr><td><select name='directory'><option value=''>~~选择方向~~</option><option value='1'>上行</option><option value='2'>下行</option></select></td></tr>";
			trstr += "<tr><td style='text-align:center;' align='center'><div style='width:36px;margin:0 auto;' onmouseover='btnmouse(this,1)' onmouseout='btnmouse(this,0)' onclick='searchForVideo()' class='divbtn'>查看</div></td></tr>";
			ShowMark("请选择", trstr, 60, 260, 0);
		}, "json");
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
function listStationsByLine(lineId, stationId1, stationId2) {
	$.post(location.serviceName + "/sys/dic/station/getStationByLineIdAjax", "lineId=" + $("select[name='" + lineId + "']").val(), function (data) {
		$("select[name='" + stationId1 + "']").empty();
		$("select[name='" + stationId2 + "']").empty();
		var options = "<option value=''>~~请选择车站~~</option>";
		$(data).each(function () {
			options += "<option value=\"" + this.id + "\">" + this.name + "</option>";
		});
		$("select[name='" + stationId1 + "']").append(options);
		$("select[name='" + stationId2 + "']").append(options);
	}, "json");
}
/**
 * 根据线路车站，获取视频列表
 * 
 * @returns
 */
function searchForVideo() {
	$.post(location.serviceName + "/arcmap/videoInfo/searchForVideo", "lineId=" + $("select[name='lineId']").val() + "&stationId1=" + $("select[name='stationId1']").val() + "&stationId2=" + $("select[name='stationId2']").val() + "&directory=" + $("select[name='directory']").val(), function (data) {
		$("#videoTable tbody").empty();
		if (data && data.length > 0) {
			$(data).each(function () {
				$("#videoTable tbody").append("<tr><td>" + this.name + "</td><td><a href='" + location.serviceName + "/arcmap/videoInfo/play?id=" + this.id + "' target='_blank'>播放</a></td></tr>")
			})
		} else {
			$("#videoTable tbody").append("<tr><td colspan='2'>~~暂时没有视频~~</td></tr>")
		}
		$("#videoList").css("visibility", "visible");
	}, "json");
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
	myMap.setMapCursor("url(" + location.serviceName + "/images/biaozhu.ico),auto");
	IsBiaozhu = true;
}

// 定位车站
function GetData(stationid, selectText) {
	myMap.graphics.clear();
	$.get(location.serviceName + "/arcmap/line/getStation/" + stationid,
		function (stations) {
		$(stations).each(function () {
			var station = this;
			var point = new esri.geometry.Point(station.x, station.y, new esri.SpatialReference({
						wkid: 4490
					}));
			var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/icon/biaozhured.png", 24, 32);
			symbol.setOffset(0, 16);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "cz";
			myMap.graphics.add(graphic);
			myMap.centerAndZoom(point, 7);
		});
	}, "json");
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
function addTextDiv() {
	if ($("#titleDiv").length) {
		var showAble = $("#titleDiv").css("display");
		if (showAble === "none") {
			$("#titleDiv").css("display", "");
		} else {
			$("#titleDiv").css("display", "none");
		}
	} else {
		var textDiv = $('<div id="titleDiv" class="panel panel-default textDiv"><div class="panel-body"><font onclick="editTitleDivContent(this)">请输入标题</font></div></div>');
		$(textDiv).appendTo("body");
		$(textDiv).css({
			"position": "absolute",
			"left": "0px",
			"top": "50px",
			"z-index": "999",
			"font-size": "40px",
			"font-weight": "bold",
			"max-width": "50%",
			"text-align": "center",
			"background-color": "#fff",
			"border": "1px solid transparent",
			"border-radius": "4px",
			"box-shadow": "0 1px 1px rgba(0, 0, 0, .05)"
		});
	}
	reloadPosition("#titleDiv");
}

// 重新定位指定元素的位置
function reloadPosition(obj) {
	var left = "0px";
	$(obj).css("left", left);
	var windowWidth = document.body.clientWidth;
	var width = $(obj)[0].clientWidth;
	if (windowWidth < width) {
		width = "100%";
	} else {
		left = (windowWidth - width) / 2 + "px";
	}
	$(obj).css("left", left);
}

// 编辑div中内容
function editTitleDivContent(obj) {
	var content = $(obj).text().trim();
	if (content === "请输入标题") {
		content = "";
	}
	$(obj).before("<textarea oncontextmenu='confirmContent(this)'>" + content + "</textarea>");
	$(obj).remove();
	reloadPosition("#titleDiv");
}

// 确认输入的内容
function confirmContent(obj) {
	var content = $(obj).val().trim();
	if (content == "") {
		content = "请输入标题";
	}
	$(obj).before("<font onclick='editTitleDivContent(this)'>" + content + "</font>");
	$(obj).remove();
	reloadPosition("#titleDiv");
}

// 公用方法，可多次调用-----------------------------------------------------------------------------------------------------
// 获取车站坐标点列表
function getStationPointDic() {
	var stations = JSON.parse(sessionStorage.getItem("gis_stationPoints")) || [];
	if (!stations.length) {
		$.ajax({
			url: location.serviceName + "/arcmap/line/stations.json",
			dataType: "json",
			async: false,
			success: function (stationsData) {
				stations = stationsData;
				sessionStorage.setItem("gis_stationPoints", JSON.stringify(stations));
			}
		});
	}
	return stations;
}

// 获取车站坐标点列表
function getLinesDic() {
	var lines = JSON.parse(sessionStorage.getItem("gis_lines")) || [];
	if (!lines.length) {
		$.ajax({
			url: location.serviceName + "/sys/dic/line/getLineByAjax",
			dataType: "json",
			async: false,
			success: function (linesData) {
				lines = linesData;
				sessionStorage.setItem("gis_lines", JSON.stringify(lines));
			}
		});
	}
	return lines;
}
// 根据车站编号获取车站
function getStationByCode(stationCode) {
	var stations = getStationPointDic();
	for (var i = 0, max = stations.length; i < max; i++) {
		var station = stations[i];
		var stationCodes=station.pointCode&&station.pointCode.split(",")||[];
		for(var cIndex=0,cMax=stationCodes.length;cIndex<cMax;cIndex++){
			var currentStationCode=stationCodes[cIndex];
			if (currentStationCode===stationCode) {
				return station;
			}
		}
	}
}

function addEnterListen(target, obj) {
	document.onkeydown = function (e) {
		if (e.keyCode === 13) {
			filterMaterialList(target, $(obj).next()[0]);
		}
	}
}

function clearEnterListen() {
	document.onkeydown = null;
}

// 生成应急物资列表
var colorFulSelections = ["blue", "red", "green", "purple"];
function generateMaterialList(target, materials, img, keepPreviousData) {
	var searchTool = "<table id='queryTable' style='width:100%;'><tr><td><input name='keyWords' style='margin:5px;width:65%;' placeholder='请输入要查询的关键字。。' onfocus='addEnterListen(\"" + target + "\",this)' onblur='clearEnterListen();' /><button type='button' onclick='filterMaterialList(\"" + target + "\",this)'>查找</button>&nbsp;<button type='button' onclick='resetMaterialList(\"" + target + "\",this)'>重置</button></td></tr></table>";
	// 是否保留之前的记录
	if (keepPreviousData !== true) {
		$(target).empty();
	} else {
		$(target).find(".emptyData").remove();
	}
	if ($(target).find("#queryTable").length == 0) {
		$(target).append(searchTool);
	}
	var currentFontColor = "blue";
	var currentType = 0;
	if (materials.length) {
		var previousMaterialTypeId;
		$(materials).each(function () {
			var material = this;
			if (previousMaterialTypeId && previousMaterialTypeId !== material.restypeId.id) {
				currentType++;
				if (currentType < 4) {
					currentFontColor = colorFulSelections[currentType];
				} else {
					currentFontColor = colorFulSelections[currentType % 4];
				}
			}
			previousMaterialTypeId = material.restypeId.id;
			if (material.station && material.station.code) {
				var station = getStationByCode(material.station.code);
				if (!station) {
					return;
				}
				station.x = station.x || 0;
				station.y = station.y || 0;
				if (img) {
					var graphic = generateMaterialPoint(station, img);
					myMap.graphics.add(graphic);
				}
				var addressDetail = "";
				if (material.addressDetail) {
					addressDetail = material.addressDetail == "库存" ? "" : "<font color='red' style='font-size:12px;' >&nbsp;[" + material.addressDetail + "]</font>";
				}
				var tableNode = "<table class='materialTable' style='width:100%;' ></table>";
				var stationInfoTrNode = "<tr style='font-weight: bold;background-color:#cbfed0;'><input type='hidden' value='" + station.x + "," + station.y + "'></tr>";
				var stationInfoTdNode = "<th colspan='2'>站点：" + material.station.name + addressDetail + "<img src='" + location.serviceName + "/images/icon/biaozhured.png" + "' onclick='FlyToXY(" + station.x + ", " + station.y + ", 7);' style='height:18px;margin-left:5px;cursor:pointer;'/><img src='" + location.serviceName + "/images/icon/phone.png" + "' onclick='callMobile(\"" + material.personMobile + "\")' style='float:right;margin-right:5px;cursor:pointer;'/></th>";
				var materialInfoTr = "<tr><td colspan='2'>资源名称：<font style='color:" + currentFontColor + ";font-weight:bold;'>" + isnull(material.restypeId.name) + "</font><font style='font-size:14px;'>(数量：" + isnull(material.amount) + ")</font></td></tr>";
				var materialInfoDetailTr = "<tr><td colspan='2'>型号：" + isnull(material.model) + "</td></tr><tr><td style='width:50%;'>负责人：" + isnull(material.personName) + "</td><td>电话：" + isnull(material.personMobile) + "</td></tr>";
				stationInfoTrNode = $(stationInfoTrNode).append(stationInfoTdNode);
				tableNode = $(tableNode).append(stationInfoTrNode).append(materialInfoTr).append(materialInfoDetailTr);
				$(target).append(tableNode);
			}
		});
	}
	if (!$(target).find(".materialTable").length && !$(target).find(".emptyData").length) {
		var emptyResult = '<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
		$(target).find("#queryTable").remove();
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='emergency']").tab("show");
	$("#myTabContent").find("div#emergency").addClass("active in");
}
// 生成工区列表
function generateWorkAreaList(target, workAreas, keepPreviousData, needInfoTemplate) {
	// 是否保留之前的记录
	if (keepPreviousData !== true) {
		$(target).empty();
	} else {
		$(target).find(".emptyData").remove();
	}
	if (workAreas.length) {
		$(workAreas).each(function () {
			var workArea = this;
			var positionX = workArea.x || 0,
			positionY = workArea.y || 0;
			var point = new esri.geometry.Point(positionX, positionY, myMap.spatialReference);
			var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/restypeImage/gq.png", 27, 27);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "workArea";
			if (needInfoTemplate === true) {
				var linesOptions = "";
				$(getLinesDic()).each(function () {
					if(workArea.line&&workArea.line.id==this.id){
						linesOptions += "<option value='" + this.id + "' selected='selected'>" + this.name + "</option>"
					}else{
						linesOptions += "<option value='" + this.id + "'>" + this.name + "</option>"
					}
				});
				var infoTemplate = new esri.InfoTemplate();
				infoTemplate.setTitle("工区");
				var con = "<form id='workForm'>";
				con += "<input type='hidden' name='id' value='" + workArea.id + "'>";
				con += "<input type='hidden' name='x' value='" + positionX + "'><input type='hidden' name='y' value='" + positionY + "'>";
				con += "<table><input type='hidden' name='stype' value='" + workArea.stype + "'>";
				con += "<tr><td>工区名称：</td><td><input type='text' name='name' value='" + workArea.name + "'></td></tr>";
				con += "<tr><td>专业：</td><td><input type='text' name='infratype' value='" + workArea.infratype + "'></td></tr>";
				con += "<tr><td>线路：</td><td><select name='line.id' class='select_01' value='" + (workArea.line && workArea.line.id || "") + "'>" + linesOptions + "</select></td></tr>";
				con += "<tr><td>管辖范围：</td><td><input type='text' name='infraarea' value='" + workArea.infraarea + "'></td></tr>";
				con += "<tr><td>地点：</td><td><input type='text' name='addr' value='" + (workArea.addr||workArea.person||"") + "'></td></tr>";
				con += "<tr><td>联系电话：</td><td><input type='text' name='mobile' value='" + workArea.mobile + "'></td></tr>";
				con += "<tr><td><input type='button' value='更改' onclick=\"upateWork()\"></td><td><input type='button' value='删除' onclick=delWork(" + workArea.id + ")></td></tr></table>";
				con += "</table></form>";
				infoTemplate.setContent(con);
				graphic.setInfoTemplate(infoTemplate);
				myMap.infoWindow.resize(350, 600);
			}
			myMap.graphics.add(graphic);
			var professionName = workArea.infratype ? "&nbsp;<font color='red'>[" + (workArea.infratype || "") + "]</font>" : "";
			var html = "<table class='materialTable' style='width:100%;' onclick='FlyToXY(" + positionX + ", " + positionY + ", 7);'><tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'><td colspan='2'>名称：" + workArea.name + professionName + "</td>" + "<input type='hidden' value='"
				 + positionX + "," + positionY + "'>" + "</tr>";
			html += "<tr><td colspan=2><div>电话：" + isnull(workArea.mobile) + "</div><div>地点：" + isnull(workArea.person) + "</div></td></tr>";
			$(target).append(html + "</table>");
		});
	}
	if (!$(target).find(".materialTable").length && !$(target).find(".emptyData").length) {
		var emptyResult = '<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='workarea']").tab("show");
	$("#myTabContent").find("div#workarea").addClass("active in");
}

// 生成救援队列表
function generateRescueTeamList(target, rescueTeams, needInfoTemplate) {
	$(target).empty();
	$(rescueTeams).each(function () {
		var rescueTeam = this;
		var positionX = rescueTeam.x || 0,
		positionY = rescueTeam.y || 0;
		var point = new esri.geometry.Point(positionX, positionY, myMap.spatialReference);
		var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/restypeImage/jyd.png", 27, 27);
		var graphic = new esri.Graphic(point, symbol);
		graphic.attributes = "rescueTeam";
		if (needInfoTemplate === true) {
			var linesOptions = "";
			$(getLinesDic()).each(function () {
				if(rescueTeam.line&&rescueTeam.line.id==this.id){
					linesOptions += "<option value='" + this.id + "' selected='selected'>" + this.name + "</option>"
				}else{
					linesOptions += "<option value='" + this.id + "'>" + this.name + "</option>"
				}
			});
			var infoTemplate = new esri.InfoTemplate();
			infoTemplate.setTitle("修改救援队");
			var con = "<form id='rescueTeamForm'>";
			con += "<input type='hidden' name='id' value='" + rescueTeam.id + "'/>";
			con += "<input type='hidden' name='x' value='" + positionX + "'/><input type='hidden' name='y' value='" + positionY + "'/>";
			con += "<table><tr><td>名称：</td><td><input type='text' name='name' value='" + rescueTeam.name + "'></td></tr>";
			con += "<tr><td>专业：</td><td><input type='text' name='specialty' value='" + rescueTeam.specialty + "'></td></tr>";
			con += "<tr><td>隶属：</td><td><input type='text' name='department' value='" + rescueTeam.department + "'></td></tr>";
			con += "<tr><td>队长姓名：</td><td><input type='text' name='leaderName' value='" + rescueTeam.leaderName + "'></td></tr>";
			con += "<tr><td>手机：</td><td><input type='text' name='mobile' value='" + rescueTeam.mobile + "'></td></tr>";
			con += "<tr><td>电话：</td><td><input type='text' name='tel' value='" + rescueTeam.tel + "'></td></tr>";
			con += "<tr><td>队员数量：</td><td><input type='text' name='num' value='" + rescueTeam.num + "'></td></tr>";
			con += "<tr><td>具体位置：</td><td><input type='text' name='addr' value='" + rescueTeam.addr + "'></td></tr>";
			con += "<tr><td>线路：</td><td><select name='line.id' class='select_01' value='" + (rescueTeam.line && rescueTeam.line.id || "") + "'>" + linesOptions + "</select></td></tr>";
			con += "<tr><td colspan='2'><input type='button' value='更改' onclick=\"upateJyd()\"><input type='button' style='margin-left:20px;' value='删除' onclick=delJyd(" + rescueTeam.id + ")></td></tr>";
			con += "</table></form>";
			infoTemplate.setContent(con);
			graphic.setInfoTemplate(infoTemplate);
		}
		myMap.graphics.add(graphic);
		var html = "<table class='materialTable' style='width:100%;' ><tr style='font-weight: bold;width:150px;background-color:#cbfed0;'><td colspan='2'>名称：" + rescueTeam.name + "<img src='" + location.serviceName + "/images/icon/biaozhured.png" + "' onclick='FlyToXY(" + positionX + ", " + positionY + ", 7);' style='height:18px;margin-left:5px;cursor:pointer;'/><img src='" + location.serviceName + "/images/icon/phone.png" + "' onclick='callMobile(\"" + rescueTeam.mobile + "\")' style='float:right;margin-right:5px;cursor:pointer;'/></td></tr>";
		html += "<tr><td colspan='2'><div>电话：" + rescueTeam.mobile + "</div><div>负责人：" + rescueTeam.leaderName + "</div></td></tr>";
		$("#rescueTeam").append(html);
	});
	if (!$(target).find(".materialTable").length && !$(target).find(".emptyData").length) {
		var emptyResult = '<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='rescueTeam']").tab("show");
	$("#myTabContent").find("div#rescueTeam").addClass("active in");
}

// 生成变电所点
function generateSubstationPoint(subStations) {
	$(subStations).each(function () {
		var subStation = this;
		var positionX = subStation.x || 0,
		positionY = subStation.y || 0;
		var point = new esri.geometry.Point(positionX, positionY, new esri.SpatialReference({
					wkid: 4490
				}));
		var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/restypeImage/bds.png", 24, 20);
		var linesOptions = "";
		$(getLinesDic()).each(function () {
			if(subStation.line&&subStation.line.id==this.id){
				linesOptions += "<option value='" + this.id + "' selected='selected'>" + this.name + "</option>"
			}else{
				linesOptions += "<option value='" + this.id + "'>" + this.name + "</option>"
			}
		});
		var infoTemplate = new esri.InfoTemplate();
		var graphic = new esri.Graphic(point, symbol);
		var con = "<form id='workForm'>";
		con += "<input type='hidden' name='id' value='" + subStation.id + "'>";
		con += "<input type='hidden' name='x' value='" + positionX + "'><input type='hidden' name='y' value='" + positionY + "'>";
		con += "<table><input type='hidden' name='stype' value='" + subStation.stype + "'>";
		con += "<tr><td>名称：</td><td><input type='text' name='name' value='" + subStation.name + "'></td></tr>";
		con += "<tr><td>类型：</td><td><input type='text' name='infratype' value='" + subStation.infratype + "'></td></tr>";
		con += "<tr><td>位置：</td><td><input type='text' name='addr' value='" + subStation.addr + "'></td></tr>";
		con += "<tr><td>线路：</td><td><select name='line.id' value='" + (subStation.line&&subStation.line.id||"") + "' class='select_01'>" + linesOptions + "</select></td></tr>";
		con += "<tr><td>管辖范围：</td><td><input type='text' name='infraarea' value='" + subStation.infraarea + "'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person' value='" + subStation.person + "'></td></tr>";
		con += "<tr><td>电话：</td><td><input type='text' name='mobile' value='" + subStation.mobile + "'></td></tr>";
		con += "<tr><td><input type='button' value='更改' onclick=\"upateWork()\"></td><td><input type='button' value='删除' onclick=delWork(" + subStation.id + ")></td></tr></table>";
		con += "</table></form>";
		infoTemplate.setContent(con);
		graphic.setInfoTemplate(infoTemplate);
		graphic.attributes = subStation.id;
		myMap.graphics.add(graphic);
	});
}

// 生成段场点
function generateSegmentFieldPoint(segmentFields) {
	$(segmentFields).each(function () {
		var segmentField = this;
		var positionX = segmentField.x || 0,
		positionY = segmentField.y || 0;
		var point = new esri.geometry.Point(positionX, positionY, new esri.SpatialReference({
					wkid: 4490
				}));
		var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/restypeImage/dc.png", 24, 20);
		var linesOptions = "";
		$(getLinesDic()).each(function () {
			if(segmentField.line&&segmentField.line.id==this.id){
				linesOptions += "<option value='" + this.id + "' selected='selected'>" + this.name + "</option>"
			}else{
				linesOptions += "<option value='" + this.id + "'>" + this.name + "</option>"
			}
		});
		var infoTemplate = new esri.InfoTemplate();
		var graphic = new esri.Graphic(point, symbol);
		var con = "<form id='workForm'>";
		con += "<input type='hidden' name='id' value='" + segmentField.id + "'>";
		con += "<input type='hidden' name='x' value='" + positionX + "'><input type='hidden' name='y' value='" + positionY + "'>";
		con += "<table><input type='hidden' name='stype' value='" + segmentField.stype + "'>";
		con += "<tr><td>名称：</td><td><input type='text' name='name' value='" + segmentField.name + "'></td></tr>";
		con += "<tr><td>线路：</td><td><select name='line.id'  value='" + (segmentField.line&&segmentField.line.id||"") + "' class='select_01'>" + linesOptions + "</select></td></tr>";
		con += "<tr><td>附属机关：</td><td><input type='text' name='infraarea' value='" + segmentField.infraarea + "'></td></tr>";
		con += "<tr><td>联系人：</td><td><input type='text' name='person' value='" + segmentField.person + "'></td></tr>";
		con += "<tr><td>电话：</td><td><input type='text' name='mobile' value='" + segmentField.mobile + "'></td></tr>";
		con += "<tr><td><input type='button' value='更改' onclick=\"upateWork()\"></td><td><input type='button' value='删除' onclick=delWork(" + segmentField.id + ")></td></tr></table>";
		con += "</table></form>";
		infoTemplate.setContent(con);
		graphic.setInfoTemplate(infoTemplate);
		graphic.attributes = segmentField.id;
		myMap.graphics.add(graphic);
	});
}

function generateSecurityConcernsList(target, securityConcerns, keepPreviousData, needInfoTemplate) {
	// 是否保留之前的记录
	if (keepPreviousData !== true) {
		$(target).empty();
	} else {
		$(target).find(".emptyData").remove();
	}
	if (securityConcerns.length) {
		$(securityConcerns).each(function () {
			var securityConcern = this;
			var station=getStationByCode(securityConcern.station.code);
			var positionX = station.x || 0,
			positionY = station.y || 0;
			var point = new esri.geometry.Point(positionX, positionY, myMap.spatialReference);
			var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/icon/aqyh.png", 27, 27);
			var graphic = new esri.Graphic(point, symbol);
			graphic.attributes = "securityConcerns";
			myMap.graphics.add(graphic);
			var html = "<table class='materialTable' style='width:100%;' onclick='FlyToXY(" + positionX + ", " + positionY + ", 7);'><tr style='font-weight: bold;width:150px;background-color:#cbfed0;cursor:hand;'><td colspan='2'>位置：" + securityConcern.station.name + "</td>" + "<input type='hidden' value='"
				 + positionX + "," + positionY + "'>" + "</tr>";
			html += "<tr><td colspan=4><div style='color:red;font-weight:bold;'>名称：" + isnull(securityConcern.dangersDetail) + "</div></td></tr>";
			html += "<tr><td colspan=2><div>危害分析：" + isnull(securityConcern.hazardAnalysis) + "</div><div>防护措施：" + isnull(securityConcern.protection) + "</div></td></tr>";
			$(target).append(html + "</table>");
		});
	}
	if (!$(target).find(".materialTable").length && !$(target).find(".emptyData").length) {
		var emptyResult = '<table class="materialTable emptyData" style="width:100%;"><tr><td colspan="2" style="text-align: center;">~~暂时没有数据~~</td></tr></table>';
		$(target).append(emptyResult);
	}
	showresult();
	$("#myTabContent div").removeClass("active").removeClass("in");
	$("#myTab a").filter("[href$='securityConcern']").tab("show");
	$("#myTabContent").find("div#securityConcern").addClass("active in");
}

// 生成应急物资点
function generateMaterialPoint(station, img) {
	var point = new esri.geometry.Point(station.x || 0, station.y || 0, new esri.SpatialReference({
				wkid: 4490
			}));
	var symbol = new esri.symbol.PictureMarkerSymbol(location.serviceName + "/images/restypeImage/" + img + ".png", 25, 25);
	var graphic = new esri.Graphic(point, symbol);
	graphic.attributes = "cz";
	return graphic;
}

// 根据输入关键字过滤显示应急资源表
function filterMaterialList(target, obj) {
	var keyWord = $(obj).prev().val();
	var keyWords = keyWord.split(" ");
	$(target).find("table").not($(obj).parents("table")).hide();
	var showAableElements = $(target).find("table");
	$(keyWords).each(function () {
		showAableElements = $(showAableElements).filter(":contains('" + this + "')");
	});
	$(showAableElements).show();
}
// 恢复默认显示
function resetMaterialList(target, obj) {
	$(obj).siblings("input:text").val("");
	$(target).find("table").show();
}