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
import com.google.gson.GsonBuilder;
import com.ict.base.entity.Page;
import com.ict.base.web.BaseController;
import com.ict.dic.entity.Station;
import com.ict.dic.service.StationService;

@Controller
@RequestMapping(value = "sys/dic/station")
public class StationController extends BaseController {
    @Autowired
    private StationService service;

    @ModelAttribute
    public Station get(@RequestParam(required = false) Long id) {
        if (id != null) {
            return service.get(id);
        } else {
            Station entity = new Station();
            return entity;
        }
    }

    @RequestMapping(value = {"list", ""})
    public String list(Station entity, HttpServletRequest request, HttpServletResponse response, Model model) {
        Page<Station> page = service.find(new Page<Station>(request, response), entity, true);
        model.addAttribute("page", page);
        return "modules/sys/dic/stationList";
    }

    @RequestMapping(value = "form")
    public String form(Station entity, Model model) {
        model.addAttribute("station", entity);
        return "modules/sys/dic/stationForm";
    }

    @RequestMapping(value = "view")
    public String view(Station entity, Model model) {
        model.addAttribute("station", entity);
        return "modules/sys/dic/stationView";
    }

    @RequestMapping(value = "save")
    public String save(Station entity, Model model, RedirectAttributes redirectAttributes, HttpServletRequest request) throws IllegalStateException, IOException {
        if (!beanValidator(model, entity)) {
            return form(entity, model);
        }
        service.save(entity);
        addMessage(redirectAttributes, "保存车站" + entity.getName() + "'成功");
        return "redirect:/sys/dic/station";
    }

    @RequestMapping(value = "deleteMulti")
    public String deleteMulti(@RequestParam String assembleDelId, RedirectAttributes redirectAttributes) {
        service.deleteMulti(assembleDelId);
        addMessage(redirectAttributes, "删除所选线路成功");
        return "redirect:/sys/dic/station/?repage";//
    }

    /**
     * Ajax方法：根据线路ID返回车站的JSON
     *
     * @param lineId
     * @return
     */
    @RequestMapping(value = {"getStationByLineIdAjax"})
    public @ResponseBody
    String getStationByLineIdAjax(@RequestParam("lineId") Long lineId) {
        List<Station> stations = service.findAllByLineId(lineId);
        return new Gson().toJson(stations);
    }

    @ResponseBody
    @RequestMapping(value = "treeData")
    public List<Map<String, Object>> treeData(@RequestParam(required = false) String type, HttpServletResponse response) {
        response.setContentType("application/json; charset=UTF-8");
        List<Map<String, Object>> mapList = new ArrayList<>();
        List<Station> list = service.findAllByStationType(type);
        for (Station e : list) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", e.getId());
            map.put("pId", 0);
            map.put("name", e.getName());
            mapList.add(map);
        }
        return mapList;
    }

    @RequestMapping("stations.json")
    @ResponseBody
    public String getStations() {
        List<Station> stations = service.findAll();
        return new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create().toJson(stations);
    }

}
