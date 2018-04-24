package com.ict.dic.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
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
import com.ict.dic.service.LineService;

/**
 * 更改，去掉无意义的施工外键关联
 * 
 * @author nanxiaoqiang
 * 
 * @version 2014年6月7日
 * 
 */
@Controller
@RequestMapping(value = "sys/dic/line")
public class LineController extends BaseController {
	@Autowired
	private LineService lineService;

	@ModelAttribute
	public Line get(@RequestParam(required = false) Long id) {
		if (id != null) {
			return lineService.get(id);
		} else {
			Line entity = new Line();
			return entity;
		}
	}

	@RequestMapping(value = {"list", ""})
	public String list(Line entity, HttpServletRequest request, HttpServletResponse response, Model model) {
		Page<Line> page = lineService.find(new Page<Line>(request, response), entity, true);
		model.addAttribute("page", page);
		return "modules/sys/dic/lineList";
	}

	@RequestMapping(value = "form")
	public String form(Line entity, Model model) {
		model.addAttribute("line", entity);
		return "modules/sys/dic/lineForm";
	}

	@RequestMapping(value = "view")
	public String view(Line entity, Model model) {
		model.addAttribute("line", entity);
		return "modules/sys/dic/lineView";
	}

	@RequestMapping(value = "save")
	public String save(Line entity, Model model, RedirectAttributes redirectAttributes, HttpServletRequest request) throws IllegalStateException, IOException {
		if (!beanValidator(model, entity)) {
			return form(entity, model);
		}
		lineService.save(entity);
		addMessage(redirectAttributes, "保存线路" + entity.getName() + "'成功");
		return "redirect:/sys/dic/line";
	}

	@RequestMapping(value = "deleteMulti")
	public String deleteMulti(@RequestParam String assembleDelId, RedirectAttributes redirectAttributes) {
		lineService.deleteMulti(assembleDelId);
		addMessage(redirectAttributes, "删除所选线路成功");
		return "redirect:/sys/dic/line/?repage";//
	}

	@RequestMapping(value = {"getLineByAjax"})
	public @ResponseBody String getLineByAjax() {
		List<Line> jsonlist = new ArrayList<>();
		List<Line> linelist = lineService.findAll();
		List<Map<String, Object>> mapList = new ArrayList<>();
		for (int i = 0; i < linelist.size(); i++) {
			Line line = linelist.get(i);
			/*
			 * Line e=new Line(); Long lineid=linelist.get(i).getId();
			 * e.setId(lineid); e.setName(linelist.get(i).getName()) ;
			 * jsonlist.add(e);
			 */
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("id", line.getId());
			map.put("name", line.getName());
			map.put("officeId", line.getOffice() != null ? line.getOffice().getId() : 0);
			mapList.add(map);
		}
		return new Gson().toJson(mapList);
	}

}
