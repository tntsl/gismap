package com.ict.resource.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
import com.ict.base.entity.Page;
import com.ict.base.web.BaseController;
import com.ict.dic.entity.Line;
import com.ict.dic.entity.ResType;
import com.ict.dic.service.LineService;
import com.ict.dic.service.ResTypeService;
import com.ict.resource.entity.Material;
import com.ict.resource.entity.Worksite;
import com.ict.resource.service.MaterialService;

@Controller
@RequestMapping({"material"})
public class MaterialController extends BaseController {

	@Autowired
	private MaterialService materialService;

	@Autowired
	private ResTypeService resTypeService;

	@Autowired
	private LineService lineService;

	@ModelAttribute
	public Material get(@RequestParam(required = false) Long id) {
		if (id != null) {
			return materialService.getMaterial(id);
		}
		return new Material();
	}

	@RequestMapping({"list", ""})
	public String list(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam Map<String, Object> paramMap) {
		List<ResType> typeList = resTypeService.findAll();
		Page<Material> page = materialService.find(new Page(request, response), paramMap, true);
		model.addAttribute("typeList", typeList);
		model.addAttribute("page", page);
		model.addAllAttributes(paramMap);
		return "modules/resource/rescue/materialList";
	}

	@RequestMapping({"viewlist"})
	public String viewlist(HttpServletRequest request, HttpServletResponse response, Model model, @RequestParam Map<String, Object> paramMap) {
		List<ResType> typeList = resTypeService.findAll();
		Page<Material> page = materialService.find(new Page(request, response), paramMap, true);
		model.addAttribute("typeList", typeList);
		model.addAttribute("page", page);
		model.addAllAttributes(paramMap);
		return "modules/resource/rescue/materialViewList";
	}

	@RequestMapping({"form"})
	public String form(Material material, Model model) {
		List<Line> lineList = lineService.findAll();
		model.addAttribute("lineList", lineList);
		model.addAttribute("material", material);
		return "modules/resource/rescue/materialForm";
	}
	@RequestMapping({"view"})
	public String view(Material material, Model model) {
		model.addAttribute("material", material);
		return "modules/resource/rescue/materialView";
	}

	@RequestMapping({"save"})
	public String save(Material material, Model model, RedirectAttributes redirectAttributes, HttpServletRequest request) throws IllegalStateException, IOException {
		if (!beanValidator(model, material, new Class[0])) {
			return form(material, model);
		}

		materialService.save(material);
		addMessage(redirectAttributes, new String[]{"保存物资成功"});
		return "redirect:/resource/rescue/material/?line=&tender=&worksite=&rtId=";
	}

	@RequestMapping({"deleteMulti"})
	public String deleteMulti(@RequestParam String assembleDelId, RedirectAttributes redirectAttributes) {
		materialService.deleteMultiMaterial(assembleDelId);
		addMessage(redirectAttributes, new String[]{"删除所选物资成功"});
		return "redirect:/resource/rescue/material/?line=&tender=&worksite=&rtId=";
	}

	@RequestMapping({"getRes"})
	@ResponseBody
	public String getRes(@RequestParam("id") String siteId) {
		List<Material> json = new ArrayList<Material>();
		List<Material> listp = materialService.listByStationCode(siteId);
		for (Integer i = Integer.valueOf(0); i.intValue() < listp.size(); i = Integer.valueOf(i.intValue() + 1)) {
			Material bean = (Material) listp.get(i.intValue());
			json.add(bean);
		}
		return new Gson().toJson(json);
	}

	@RequestMapping({"queryRes"})
	@ResponseBody
	public String queryRes(@RequestParam("lineId") Long lineId, @RequestParam("tenderId") Long tenderId, @RequestParam("worksiteId") Long worksiteId, @RequestParam("restypeId") Long restypeId) {
		List<Material> listp = materialService.findmlist(lineId, tenderId, worksiteId, restypeId);
		List<Material> json = new ArrayList<Material>();
		if (listp.size() > 0) {
			for (Integer i = Integer.valueOf(0); i.intValue() < listp.size(); i = Integer.valueOf(i.intValue() + 1)) {
				Material bean = (Material) listp.get(i.intValue());
				json.add(bean);
			}
			return new Gson().toJson(json);
		}
		return null;
	}
	@RequestMapping({"getall"})
	@ResponseBody
	public String getAllRes() {
		List<Material> json = new ArrayList<Material>();
		List<Material> listp = materialService.findAll();
		for (Integer i = Integer.valueOf(0); i.intValue() < listp.size(); i = Integer.valueOf(i.intValue() + 1)) {
			Material bean = (Material) listp.get(i.intValue());
			json.add(bean);
		}
		return new Gson().toJson(json);
	}

	@RequestMapping({"getworksite"})
	@ResponseBody
	public String getWorksite(String wherestr) {
		List<Worksite> json = new ArrayList<Worksite>();
		List<Worksite> listp = materialService.findWorksite(wherestr);
		for (Integer i = Integer.valueOf(0); i.intValue() < listp.size(); i = Integer.valueOf(i.intValue() + 1)) {
			Worksite bean = (Worksite) listp.get(i.intValue());
			json.add(bean);
		}
		return new Gson().toJson(json);
	}

	@RequestMapping({"findByPar"})
	@ResponseBody
	public String findByPar(float x, float y, float radius) {
		List<Worksite> json = new ArrayList<Worksite>();
		List<Worksite> listp = materialService.findByPar(x, y, radius);
		for (Integer i = Integer.valueOf(0); i.intValue() < listp.size(); i = Integer.valueOf(i.intValue() + 1)) {
			Worksite bean = (Worksite) listp.get(i.intValue());
			json.add(bean);
		}
		return new Gson().toJson(json);
	}

	@RequestMapping({"resstatistics"})
	public String resstatistics(Material material, Model model) {
		List<ResType> list = resTypeService.findTypeList();
		if (list.size() > 0) {
			Long rtId = ((ResType) list.get(0)).getId();
			model.addAttribute("rtId", rtId);
		}
		return "modules/resource/statistics/resstatistics";
	}
	// @RequestMapping({"getresstatistics"})
	// @ResponseBody
	// public String getResStatistics(@RequestParam("rtId") Long rtId) {
	// List<Convertjson> json = Lists.newArrayList();
	// List<Line> linelist = lineService.findAll();
	// ResType rt = resTypeService.get(rtId);
	// if ((linelist.size() > 0) && (rt != null)) {
	// Convertjson convertjson = new Convertjson();
	// for (Integer i = Integer.valueOf(0); i.intValue() < linelist.size(); i =
	// Integer.valueOf(i.intValue() + 1)) {
	// Line lineId = (Line) linelist.get(i.intValue());
	// convertjson.getData().add(materialService.findByLineId(rt.getId(),
	// lineId.getId()));
	// }
	// convertjson.setName("线路");
	// json.add(convertjson);
	// }
	// return new Gson().toJson(json);
	// }
}