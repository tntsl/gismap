/**
 * 自动获取js路径
 */
var hostPort = location.port;
var serverName = location.hostname;
if ("" !== hostPort) {
	serverName += ":" + location.port;
}
location.serverName = serverName;
location.serviceName = "http://" + serverName;
/**
 * dojo的一些默认设置
 */
var dojoConfig = {
	tlmSiblingOfDojo : false,
	packages : [{
		"name" : "lib",
		"location" : "/js/lib"
	}]
};
/**
 * 一些服务地址
 */
var gisServer = "172.21.11.135:6080";
var baseMapService = "http://" + gisServer + "/arcgis/rest/services/tjbasemap/MapServer";
var customService = "http://" + gisServer + "/arcgis/rest/services/Point_PolyLine/MapServer";
var geometryService = "http://" + gisServer + "/arcgis/rest/services/Utilities/Geometry/GeometryServer";
var center_X = 117.2034899, center_Y = 39.165486;