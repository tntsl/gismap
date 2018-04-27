package com.ict.resource.service;

import java.io.IOException;
import java.util.List;
import java.util.Properties;
import java.util.StringTokenizer;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.entity.Page;
import com.ict.base.service.BaseService;
import com.ict.base.utils.HttpUtils;
import com.ict.dic.dao.LineDao;
import com.ict.dic.entity.Line;
import com.ict.resource.dao.RescueTeamDao;
import com.ict.resource.entity.RescueTeam;

@Service
@Transactional(readOnly = true)
public class RescueTeamService extends BaseService {

	@Autowired
	private Properties global;

	@Autowired
	private LineDao LineDao;

	@Autowired
	private RescueTeamDao rescueTeamDao;

	public RescueTeam get(Long id) {
		return rescueTeamDao.get(id);
	}

	public List<RescueTeam> findAll() {
		return rescueTeamDao.findAllList();
	}

	public RescueTeam getRescueTeamByName(String name) {
		return rescueTeamDao.findByName(name);
	}

	// public Integer findByLineId(Long lineId) {
	// return RescueTeamDao.findByLineId(lineId);
	// }

	public List<RescueTeam> findRescueTeamList() {
		return rescueTeamDao.findRescueTeamList();
	}

	// public List<RescueTeam> findFlexByLineId(Long lineId) {
	// return RescueTeamDao.findFlexByLineId(lineId);
	// }

	public Page<RescueTeam> find(Page<RescueTeam> page, RescueTeam entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = rescueTeamDao.createDetachedCriteria(new Criterion[0]);
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.like("name", "%" + entity.getName() + "%"));
		}
		// dc.addOrder(Order.asc("lineId"));
		dc.add(Restrictions.eq("delFlag", entity.getDelFlag()));
		return rescueTeamDao.find(page, dc);
	}

	public RescueTeam getRescueTeam(Long id) {
		return (RescueTeam) rescueTeamDao.get(id);
	}

	@Transactional(readOnly = false)
	public void save(RescueTeam rescueTeam) throws IOException {
		Line line = rescueTeam.getLine();
		if (line != null) {
			Long lineId = line.getId();
			line = LineDao.get(lineId);
			rescueTeam.setLine(line);
		}
		rescueTeamDao.save(rescueTeam);
		String features = "[{'geometry':{'y':" + rescueTeam.getY() + ",'x':" + rescueTeam.getX() + "},'attributes':{'POINTID':'" + rescueTeam.getId() + "'}}]";
		addFeature(8, features);
	}

	@Transactional(readOnly = false)
	public void delete(Long id) {
		rescueTeamDao.deleteById(id);
	}

	@Transactional(readOnly = false)
	public void deleteMultiRescueTeam(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			rescueTeamDao.deleteById(id);
		}
	}

	@SuppressWarnings("unchecked")
	public List<RescueTeam> getByIds(String ids) {
		while (ids.endsWith(",")) {
			ids = ids.substring(0, ids.length() - 1);
		}
		List<RescueTeam> teams = rescueTeamDao.createQuery("from RescueTeam where delFlag=0 and id in(" + ids + ")", null).getResultList();
		return teams;
	}

	/**
	 * 添加数据到空间数据库
	 *
	 * @param layer
	 * @return
	 * @throws IOException
	 */
	public String addFeature(int layer, String features) throws IOException {
		String serverUrl = global.getProperty("gis.server.url");
		String featureUrl = serverUrl + "/arcgis/rest/services/Point_PolyLine/FeatureServer/" + layer + "/addFeatures";
		return HttpUtils.sendPostRequest(featureUrl, features);
	}
}