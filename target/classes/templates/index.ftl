<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>主页</title>
<link type="text/css" rel="stylesheet" href="${urls.getForLookupPath('/js/arcgis_js_api/library/3.20/3.20/esri/css/esri.css')}"/>
<link type="text/css" rel="stylesheet" href="${urls.getForLookupPath('/js/arcgis_js_api/library/3.20/3.20/dijit/themes/tundra/tundra.css')}"/>
<link type="text/css" rel="stylesheet" href="${urls.getForLookupPath('/css/baseMap.css')}">
</head>
<body class="tundra">
	<div class="toolBar">
		<img title="工区" src="${urls.getForLookupPath('/images/material/gq.png')}" />
		<img title="救援队" src="${urls.getForLookupPath('/images/material/jyd.png')}" />
		<img title="缩放" src="${urls.getForLookupPath('/images/icon/sf.png')}" />
		<img title="移动" src="${urls.getForLookupPath('/images/icon/yd.png')}" />
		<img title="放大" src="${urls.getForLookupPath('/images/icon/fd.png')}" />
	</div>
	<div id="map"></div>
<script type="text/javascript" src="${urls.getForLookupPath('/js/mapConfig.js')}"></script>
<script type="text/javascript" src="${urls.getForLookupPath('/js/arcgis_js_api/library/3.20/3.20/init.js')}"></script>
<script type="text/javascript" src="${urls.getForLookupPath('/js/lib/jquery-3.1.0.min.js')}"></script>
<script type="text/javascript" src="${urls.getForLookupPath('/js/lib/jquery-migrate-1.4.1.min.js')}"></script>
<script type="text/javascript" src="${urls.getForLookupPath('/js/lib/arcmaps.js')}"></script>
<script type="text/javascript" src="${urls.getForLookupPath('/js/lib/baseMap.js')}"></script>
<script type="text/javascript" src="${urls.getForLookupPath('/js/lib/main.js')}"></script>
</body>
</html>