package com.ict.dic.web;

import java.io.IOException;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.google.gson.Gson;
import com.ict.base.web.BaseController;
import com.ict.dic.entity.Line;
import com.ict.dic.entity.LineStation;
import com.ict.dic.entity.Station;
import com.ict.dic.service.LineService;
import com.ict.dic.service.LineStationService;
import com.ict.dic.service.StationService;

@Controller
@RequestMapping(value = "sys/dic/linestation")
public class LineStationController extends BaseController {
	@Autowired
	private LineStationService service;
	@Autowired
	private StationService stationService;
	@Autowired
	private LineService lineService;

	@ModelAttribute
	public LineStation get(@RequestParam(required = false) Long id) {
		if (id != null) {
			return service.get(id);
		} else {
			LineStation entity = new LineStation();
			return entity;
		}
	}

	@RequestMapping(value = {"list", ""})
	public String list(Long lineId, LineStation entity, HttpServletRequest request, HttpServletResponse response, Model model) {
		List<LineStation> lss = service.getAllByLineId(lineId);
		model.addAttribute("lss", lss);
		model.addAttribute("lineId", lineId);
		return "modules/sys/dic/linestationList";
	}

	@RequestMapping(value = "form")
	public String form(Long lineId, LineStation entity, Model model) {
		List<Station> slist = stationService.findAll();
		String stationIds = service.getStationIdsByLineId(lineId);
		model.addAttribute("slist", slist);
		model.addAttribute("stationIds", stationIds);
		model.addAttribute("lineStation", entity);
		model.addAttribute("lineId", lineId);
		return "modules/sys/dic/linestationForm";
	}

	/**
	 * @deprecated
	 * @param entity
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "view")
	public String view(LineStation entity, Model model) {
		model.addAttribute("lineStation", entity);
		return "modules/sys/dic/linestationView";
	}

	@RequestMapping(value = "save")
	public String save(@RequestParam String stationid, @RequestParam Long lineId, Model model, RedirectAttributes redirectAttributes, HttpServletRequest request)
			throws IllegalStateException, IOException {

		StringTokenizer delTokens = new StringTokenizer(stationid, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			LineStation entity = service.getByLineStation(lineId, id);
			if (entity == null) {
				entity = new LineStation();
				Station st = stationService.get(id);
				Line line = lineService.get(lineId);
				entity.setStation(st);
				entity.setSort(st.getSort());
				entity.setLine(line);
				service.save(entity);
			}
			model.addAttribute("lineId", entity.getLine().getId());
			addMessage(redirectAttributes, "保存车站成功");
		}
		return "redirect:/sys/dic/linestation/list?lineId=" + lineId;
	}

	@RequestMapping(value = "deleteMulti")
	public String deleteMulti(@RequestParam String assembleDelId, RedirectAttributes redirectAttributes) {
		Long lineId = service.deleteMulti(assembleDelId);
		addMessage(redirectAttributes, "删除所选线路成功");
		return "redirect:/sys/dic/linestation/?lineId=" + lineId + "&repage";//
	}

	@RequestMapping("getStationsByLineId")
	@ResponseBody
	public String getStationsByLineId(Long lineId) {
		List<Station> stations = service.getAllStationsByLineId(lineId);
		return new Gson().toJson(stations);
	}

}
