//多个图层用逗号分隔。
var mapservice = "http://172.21.11.135:6080/arcgis/rest/services/tjbasemap/MapServer";
var mapservice_l = "http://172.21.11.135:6080/arcgis/rest/services/Point_PolyLine/MapServer";
// var
// mapservice="http://130.1.2.21:6080/arcgis/rest/services/tjbasemap/MapServer";
// var
// mapservice_l="http://130.1.2.21:6080/arcgis/rest/services/Point_PolyLine/MapServer";

// proxy页面地址
// var proxyPath="130.1.2.33:7001";
var proxyPath = location.host + "/gismap";

// GeometryService服务
var geoService = "http://172.21.11.135:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
// var geoService =
// "http://130.1.2.21:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";

// 地图中心点坐标、级别
// 以天津站为中心
var center_X = 117.2034899;
var center_y = 39.165486;
var scale = 10;
// *********定义要加载的arcgis for js 库地址,用来给arcigs 库文件指定路径,如无必要，请到application.properties设置*********
//location.gisResourceUrl = "localhost";