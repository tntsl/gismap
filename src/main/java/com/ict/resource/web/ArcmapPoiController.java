package com.ict.resource.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ict.dic.entity.ResType;
import com.ict.dic.service.ResTypeService;
import com.ict.resource.entity.Material;
import com.ict.resource.entity.SocialResource;
import com.ict.resource.service.ArcmapPoiService;
import com.ict.resource.service.MaterialService;
import com.ict.resource.service.SocialResourceService;

@Controller
@RequestMapping("arcmap/poi")
public class ArcmapPoiController {

	@Autowired
	private ArcmapPoiService aPoiService;

	@Autowired
	private MaterialService materialService;

	@Autowired
	private SocialResourceService socialResourceService;

	@Autowired
	private ResTypeService resTypeService;

	/**
	 * 获得code获得社会资源
	 * 
	 * @param data
	 * @return
	 */
	@RequestMapping("getPoi")
	@ResponseBody
	public String findArcmapPoi(String data) {
		List<SocialResource> socialResources = socialResourceService.findAll();
		return new Gson().toJson(socialResources);
	}

	/**
	 * 通过车站ID获得站内资源
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("getMaterial")
	@ResponseBody
	public String getMaterial(String pointCodes) {
		List<Material> material = materialService.listByStationCode(pointCodes);
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(material);
	}

	/**
	 * 获得所有资源名称
	 * 
	 * @return
	 */
	@RequestMapping("getRestypeName")
	@ResponseBody
	public String findAllRestypeName() {
		List<ResType> resTypes = resTypeService.findAll();
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(resTypes);
	}

	/**
	 * 通过资源名称获得拥有该资源的车站
	 * 
	 * @param name
	 * @return
	 */
	@RequestMapping("getMaterialByResName")
	@ResponseBody
	public String findMaterialByResName(String names) {
		List<ResType> resId = aPoiService.findRestypeidByName(names);
		List<Material> meterial = materialService.findbyRestypeId(String.valueOf(resId.get(0).getId()));
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(meterial);
	}

	/**
	 * 通过资源父类ID查询所有子类
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("findByParentId/{id}")
	@ResponseBody
	public List<ResType> findByParentId(@PathVariable long id) {
		List<ResType> resType = resTypeService.findByParentId(id);
		return resType;
	}

	/**
	 * 通过资源子类ID查询所有关联车站
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping("findbyRestypeId/{ids}")
	@ResponseBody
	public String findbyRestypeId(@PathVariable String ids) {
		List<Material> meterial = materialService.findbyRestypeId(ids);
		return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(meterial);
	}

}
