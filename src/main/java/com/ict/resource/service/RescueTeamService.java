package com.ict.resource.service;

import java.util.List;
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
import com.ict.resource.dao.RescueTeamDao;
import com.ict.resource.entity.RescueTeam;

@Service
@Transactional(readOnly = true)
public class RescueTeamService extends BaseService {

	@Autowired
	private RescueTeamDao rescueTeamDao;

	public RescueTeam get(Long id) {
		return this.rescueTeamDao.get(id);
	}

	public List<RescueTeam> findAll() {
		return this.rescueTeamDao.findAllList();
	}

	public RescueTeam getRescueTeamByName(String name) {
		return this.rescueTeamDao.findByName(name);
	}

	// public Integer findByLineId(Long lineId) {
	// return this.RescueTeamDao.findByLineId(lineId);
	// }

	public List<RescueTeam> findRescueTeamList() {
		return this.rescueTeamDao.findRescueTeamList();
	}

	// public List<RescueTeam> findFlexByLineId(Long lineId) {
	// return this.RescueTeamDao.findFlexByLineId(lineId);
	// }

	public Page<RescueTeam> find(Page<RescueTeam> page, RescueTeam entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = this.rescueTeamDao.createDetachedCriteria(new Criterion[0]);
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.like("name", "%" + entity.getName() + "%"));
		}
		// dc.addOrder(Order.asc("lineId"));
		dc.add(Restrictions.eq("delFlag", entity.getDelFlag()));
		return this.rescueTeamDao.find(page, dc);
	}

	public RescueTeam getRescueTeam(Long id) {
		return (RescueTeam) this.rescueTeamDao.get(id);
	}

	@Transactional(readOnly = false)
	public void save(RescueTeam RescueTeam) {
		this.rescueTeamDao.clear();
		this.rescueTeamDao.save(RescueTeam);
	}

	@Transactional(readOnly = false)
	public void delete(Long id) {
		this.rescueTeamDao.deleteById(id);
	}

	@Transactional(readOnly = false)
	public void deleteMultiRescueTeam(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			this.rescueTeamDao.deleteById(id);
		}
	}

	@SuppressWarnings("unchecked")
	public List<RescueTeam> getByIds(String ids) {
		while (ids.endsWith(",")) {
			ids = ids.substring(0, ids.length() - 1);
		}
		List<RescueTeam> teams = rescueTeamDao.createQuery("from Team where delFlag=0 and id in(" + ids + ")", null).getResultList();
		return teams;
	}
}