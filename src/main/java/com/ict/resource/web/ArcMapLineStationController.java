package com.ict.resource.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.ict.base.web.BaseController;
import com.ict.dic.entity.Station;
import com.ict.dic.service.StationService;
import com.ict.map.entity.PointCz;
import com.ict.map.service.PointCzService;

@Controller
@RequestMapping("arcmap/line")
public class ArcMapLineStationController extends BaseController {

	@Autowired
	private StationService stationService;

	@Autowired
	private PointCzService pointCzService;

	@RequestMapping("getStation/{id}")
	@ResponseBody
	public String getCode(@PathVariable String id) {
		Long number = Long.parseLong(id);
		Station station = stationService.get(number);
		List<PointCz> list = pointCzService.findPointCz(station.getCode());
		return new Gson().toJson(list);
	}

	@RequestMapping("stations.json")
	@ResponseBody
	public String getStations() {
		List<PointCz> list = pointCzService.findPointCzs();
		return new Gson().toJson(list);
	}

	/**
	 * 通过车站名称查询空间坐标
	 * 
	 * @param name
	 * @return
	 */
	@RequestMapping("findPointCzByName/{name}")
	@ResponseBody
	public List<Object> findPointCzByName(@PathVariable String name) {
		return pointCzService.findPointCzByName(name);
	}

	/**
	 * 车站信息地图页面加载
	 * 
	 * @return
	 */
	@RequestMapping({"stationMap"})
	public String stationMap() {
		return "modules/resource/rescue/arcgismapStation";
	}

	/**
	 * proxy页面加载
	 * 
	 * @return
	 */
	@RequestMapping({"proxy"})
	public String proxy() {
		return "modules/resource/rescue/proxy";
	}

}
