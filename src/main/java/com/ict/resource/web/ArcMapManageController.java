package com.ict.resource.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ict.dic.entity.Station;
import com.ict.dic.service.StationService;
import com.ict.map.entity.BookMark;
import com.ict.map.entity.PointCz;
import com.ict.map.service.BookMarkService;
import com.ict.map.service.PointCzService;
import com.ict.resource.entity.Areamanagement;
import com.ict.resource.entity.FloodControl;
import com.ict.resource.entity.Prevention;
import com.ict.resource.entity.RescueTeam;
import com.ict.resource.entity.SocialResource;
import com.ict.resource.service.AreamanagementService;
import com.ict.resource.service.PreventionService;
import com.ict.resource.service.RescueTeamService;
import com.ict.resource.service.SocialResourceService;

@Controller
@RequestMapping("arcmap")
public class ArcMapManageController {

	@Autowired
	private SocialResourceService socialResourceService;

	@Autowired
	private RescueTeamService rescueTeamService;

	@Autowired
	private AreamanagementService areamanagementService;

	@Autowired
	private PreventionService preventionService;

	@Autowired
	private StationService stationService;

	@Autowired
	private PointCzService pointCzService;

	@Autowired
	private BookMarkService bookMarkService;

	@RequestMapping({"baseMap"})
	public String baseMap() {
		return "baseMap";
	}
	/**
	 * 管理地图页面加载
	 *
	 * @return
	 */
	@RequestMapping({"manageMap"})
	public String map() {
		return "manageMap";
	}

	/**
	 * 客流地图页面加载
	 *
	 * @return
	 */
	@RequestMapping({"folwMap"})
	public String folwMap() {
		return "folwMap";
	}

	/**
	 * proxy页面加载
	 *
	 * @return
	 */
	@RequestMapping({"proxy"})
	public String proxy() {
		return "proxy";
	}

	/**
	 * 指挥地图页面加载
	 *
	 * @return
	 */
	@RequestMapping({"commandMap/{type}/{id1}/{id2}/"})
	public String cmdmap(Model model, @PathVariable String type, @PathVariable String id1, @PathVariable String id2) {
		if (type.equals("1")) {
			Station station = stationService.get(Long.parseLong(id1));
			List<PointCz> list = pointCzService.findPointCz(station.getCode());
			PointCz coordinate = list.get(0);
			Double x = coordinate.getX();
			Double y = coordinate.getY();
			model.addAttribute("comX", x);
			model.addAttribute("comY", y);
		} else if (type.equals("2")) {
			Station station1 = stationService.get(Long.parseLong(id1));
			List<PointCz> list1 = pointCzService.findPointCz(station1.getCode());
			PointCz coordinate1 = list1.get(0);
			Double x = coordinate1.getX();
			Double y = coordinate1.getY();
			Station station2 = stationService.get(Long.parseLong(id2));
			List<PointCz> list2 = pointCzService.findPointCz(station2.getCode());
			PointCz coordinate2 = list2.get(0);
			String comX = x + "," + coordinate2.getX();
			String comY = y + "," + coordinate2.getY();
			model.addAttribute("comX", comX);
			model.addAttribute("comY", comY);
		} else if (type.equals("3")) {
			Areamanagement areamanagement = areamanagementService.get(Long.parseLong(id1));
			String x = areamanagement.getX();
			String y = areamanagement.getY();
			model.addAttribute("comX", x);
			model.addAttribute("comY", y);
		} else {

		}
		return "commandMap";
	}

	/**
	 * 添加社会资源
	 *
	 * @param data
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("addSocialResource")
	@ResponseBody
	public String addSocialResource(@Valid SocialResource socialResource, BindingResult result) throws Exception {
		if (result.hasErrors()) {
			return new Gson().toJson(result.getFieldError().getDefaultMessage());
		} else {
			try {
				socialResourceService.save(socialResource);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return "success";
		}
	}

	/**
	 * 添加救援队|更新救援队
	 *
	 * @param data
	 * @return
	 */
	@RequestMapping("addRescueTeam")
	@ResponseBody
	public String addRescueTeam(@Valid RescueTeam rescueTeam, BindingResult result) {
		if (result.hasErrors()) {
			return result.getFieldError().getDefaultMessage();
		} else {
			try {
				rescueTeamService.save(rescueTeam);
			} catch (IOException e) {
				e.printStackTrace();
			}
			return "success";
		}
	}

	/**
	 * 删除救援队
	 *
	 * @param id
	 * @return
	 */
	@RequestMapping("delJyd")
	@ResponseBody
	public String delJyd(Long id) {
		rescueTeamService.delete(id);
		return "success";
	}

	/**
	 * 添加工区、段场、变电所|修改工区、段场、变电所
	 *
	 * @param data
	 * @return
	 */
	@RequestMapping("addWork")
	@ResponseBody
	public String addWork(@Valid Areamanagement areamanagement, BindingResult result) {
		if (result.hasErrors()) {
			return result.getFieldError().getDefaultMessage();
		} else {
			try {
				areamanagementService.save(areamanagement);
				return "success";
			} catch (Exception e) {
				return "fail";
			}
		}

	}

	/**
	 * 删除工区、段场、变电所
	 *
	 * @param id
	 * @return
	 */
	@RequestMapping("delWork")
	@ResponseBody
	public String delWork(@RequestParam(required = true) Long id) {
		areamanagementService.delete(id);
		return "success";
	}

	/**
	 * 查询所有消防队
	 *
	 * @return
	 */
	@RequestMapping("getAllXfd")
	@ResponseBody
	public List<SocialResource> getAllXfd() {
		List<SocialResource> list = socialResourceService.findAllXFD();
		return list;
	}

	/**
	 * 查询所有救援队
	 */
	@RequestMapping("getAllJyd")
	@ResponseBody
	public String getAllJyd() {
		List<RescueTeam> list = rescueTeamService.findAll();
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(list);
	}

	/**
	 * 查询所有的工区，段场，变电所
	 */
	@RequestMapping("getAllArea")
	@ResponseBody
	public String getAllArea() {
		List<Areamanagement> list = areamanagementService.findAll();
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(list);
	}

	/**
	 * 通过ID查询工区
	 *
	 * @return
	 */
	@RequestMapping("getWorkArea/{workAreaIds}")
	@ResponseBody
	public String getWorkArea(@PathVariable String workAreaIds) {
		List<Areamanagement> workAreas = areamanagementService.getWorkAreasByIds(workAreaIds);
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(workAreas);
	}

	@RequestMapping("getAllWorkAreaProfessions")
	@ResponseBody
	public String getAllWorkAreaProfessions() {
		List<String> areaProfessions = areamanagementService.getAllWorkAreaProfessions();
		return new Gson().toJson(areaProfessions);
	}

	/**
	 * 获取所有工区
	 *
	 * @return
	 */
	@RequestMapping("getAllWorkAreas")
	@ResponseBody
	public String getAllWorkAreas(String workAreaProfessions) {
		List<Areamanagement> workAreas = areamanagementService.getAllWorkAreas(workAreaProfessions);
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(workAreas);
	}

	@RequestMapping("getAllRescueTeams")
	@ResponseBody
	public String getAllRescueTeams() {
		List<RescueTeam> rescueTeams = rescueTeamService.findAll();
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(rescueTeams);
	}

	/**
	 * 通过ID查询救援队
	 *
	 * @return
	 */
	@RequestMapping("getRescueTeam/{ids}")
	@ResponseBody
	public String getRescueTeam(@PathVariable String ids) {
		List<RescueTeam> rescueTeams = rescueTeamService.getByIds(ids);
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(rescueTeams);
	}

	/**
	 * 查询所有防汛Prevention
	 *
	 * @return
	 */
	@RequestMapping("findPreventionAll")
	@ResponseBody
	public String findPreventionAll() {
		List<FloodControl> floodControls = preventionService.findPreventionAll();
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(floodControls);
	}

	/**
	 * 添加、更新防汛点Prevention
	 *
	 * @param data
	 * @return
	 */
	@RequestMapping("addPreventionInfo")
	@ResponseBody
	public String addPreventionInfo(String data) {
		String[] strs = data.split(",");
		for (int i = 0; i < strs.length; i++) {
			if (strs[i].equals("无")) {
				strs[i] = "";
			}
		}
		Prevention prevention = new Prevention();
		prevention.setX(strs[0]);
		prevention.setY(strs[1]);
		prevention.setStationName(strs[2]);
		prevention.setPosition(strs[3]);
		prevention.setReason(strs[4]);
		prevention.setRemark(strs[5]);
		if (strs.length == 7) {
			prevention.setId(Long.parseLong(strs[6]));
		}
		preventionService.save(prevention);
		return "success";
	}

	/**
	 * 删除防汛点Prevention
	 *
	 * @param id
	 */
	@RequestMapping("delPrevention/{id}")
	@ResponseBody
	public String delPrevention(@PathVariable Long id) {
		preventionService.delete(id);
		return "success";
	}

	@RequestMapping("bookMarks.json")
	@ResponseBody
	public String getBookMarks() {
		List<BookMark> bookMarks = bookMarkService.getAllBookMarks();
		return new Gson().toJson(bookMarks);
	}

	@RequestMapping("modifyBookMarks")
	@ResponseBody
	public String modifyBookMarks(@RequestBody List<BookMark> bookMarks) {
		bookMarkService.modifyBookMarks(bookMarks);
		return "success";
	}

	@RequestMapping("shareScreen.json")
	@ResponseBody
	public String shareScreen(String screen) throws UnsupportedEncodingException {
		screen = HtmlUtils.htmlUnescape(screen);
		return "{\"result\":\"success\"}";
	}

	@RequestMapping("currentScreen.json")
	@ResponseBody
	public String shareScreen() {
		Map<String, String> screen = new HashMap<>();
		return new Gson().toJson(screen);
	}
}
