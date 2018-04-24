package com.ict.resource.service;

import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.entity.Page;
import com.ict.base.service.BaseService;
import com.ict.resource.dao.AreamanagementDao;
import com.ict.resource.entity.Areamanagement;

@Service
@Transactional(transactionManager = "transactionManager")
public class AreamanagementService extends BaseService {

	@Autowired
	private AreamanagementDao areamanagementDao;

	public Areamanagement get(Long id) {
		return (Areamanagement) areamanagementDao.get(id);
	}

	@Transactional(readOnly = true)
	public List<Areamanagement> findAll() {
		return areamanagementDao.findAllList();
	}

	@Transactional(readOnly = true)
	public Page<Areamanagement> find(Page<Areamanagement> page, Map<String, Object> paramMap) {
		DetachedCriteria dc = areamanagementDao.createDetachedCriteria(new Criterion[0]);
		Object lineid = paramMap.get("line.id");
		if (lineid != null && StringUtils.isNoneBlank(lineid.toString())) {
			dc.add(Restrictions.eq("line.id", lineid));
		}
		Object stype = paramMap.get("stype");
		if (stype != null && StringUtils.isNoneBlank(lineid.toString())) {
			dc.add(Restrictions.eq("stype", stype));
		}
		dc.addOrder(Order.asc("id"));
		dc.add(Restrictions.eq(Areamanagement.FIELD_DEL_FLAG, Areamanagement.DEL_FLAG_NORMAL));
		return areamanagementDao.find(page, dc);
	}

	@Transactional(readOnly = true)
	public Page<Areamanagement> findworksite(Page<Areamanagement> page, Areamanagement entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = areamanagementDao.createDetachedCriteria(new Criterion[0]);
		dc.add(Restrictions.eq("stype", 1));
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%"),
					Restrictions.like("infratype", "%" + entity.getName() + "%"), Restrictions.like("infraarea", "%" + entity.getName() + "%"),
					Restrictions.like("linename", "%" + entity.getName() + "%")));
		}
		dc.addOrder(Order.asc("infratype"));
		dc.add(Restrictions.eq(Areamanagement.FIELD_DEL_FLAG, Areamanagement.DEL_FLAG_NORMAL));
		return areamanagementDao.find(page, dc);
	}

	@Transactional(readOnly = true)
	public List<Areamanagement> findworksiteByLineId(Long lingId) {
		DetachedCriteria dc = areamanagementDao.createDetachedCriteria();
		dc.add(Restrictions.eq("stype", 1));
		dc.add(Restrictions.eq("line.id", lingId));
		dc.add(Restrictions.eq(Areamanagement.FIELD_DEL_FLAG, Areamanagement.DEL_FLAG_NORMAL));
		return areamanagementDao.find(dc);
	}

	@Transactional(readOnly = true)
	public Page<Areamanagement> findpower(Page<Areamanagement> page, Areamanagement entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = areamanagementDao.createDetachedCriteria(new Criterion[0]);
		dc.add(Restrictions.eq("stype", 2));
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%"),
					Restrictions.like("infratype", "%" + entity.getName() + "%"), Restrictions.like("infraarea", "%" + entity.getName() + "%"),
					Restrictions.like("linename", "%" + entity.getName() + "%"), Restrictions.like("stationtype", "%" + entity.getName() + "%"),
					Restrictions.like("addr", "%" + entity.getName() + "%")));
		}
		if (entity.getLine() != null) {
			dc.add(Restrictions.eq("line.id", entity.getLine().getId()));
		}
		dc.add(Restrictions.eq(Areamanagement.FIELD_DEL_FLAG, Areamanagement.DEL_FLAG_NORMAL));
		return areamanagementDao.find(page, dc);
	}

	@Transactional(readOnly = true)
	public Page<Areamanagement> findspot(Page<Areamanagement> page, Areamanagement entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = areamanagementDao.createDetachedCriteria(new Criterion[0]);
		dc.add(Restrictions.eq("stype", 3));
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%"),
					Restrictions.like("infratype", "%" + entity.getName() + "%"), Restrictions.like("infraarea", "%" + entity.getName() + "%"),
					Restrictions.like("linename", "%" + entity.getName() + "%")));
		}
		if (entity.getLine() != null) {
			dc.add(Restrictions.eq("line.id", entity.getLine().getId()));
		}
		dc.add(Restrictions.eq(Areamanagement.FIELD_DEL_FLAG, Areamanagement.DEL_FLAG_NORMAL));
		return areamanagementDao.find(page, dc);
	}

	@Transactional(readOnly = true)
	public Areamanagement getAreamanagement(Long id) {
		return (Areamanagement) areamanagementDao.get(id);
	}

	public void save(Areamanagement areamanagement) {
		areamanagementDao.clear();
		areamanagement.setLinename(areamanagement.getLine().getName());

		areamanagementDao.save(areamanagement);
	}

	public void delete(Long id) {
		areamanagementDao.deleteById(id);
	}

	public void deleteMultiArea(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			areamanagementDao.deleteById(id);
		}
	}

	/**
	 * 通过ID查询
	 * 
	 * @param id
	 * @return
	 */
	@Transactional(readOnly = true)
	public Areamanagement getWorkArea(long id) {
		return areamanagementDao.getWorkArea(id);
	}

	@Transactional(readOnly = true)
	public List<Areamanagement> getAllWorkAreas(String professions) {
		DetachedCriteria detachedCriteria = areamanagementDao.createDetachedCriteria();
		detachedCriteria.add(Restrictions.eq(Areamanagement.FIELD_DEL_FLAG, Areamanagement.DEL_FLAG_NORMAL));
		// 工区
		detachedCriteria.add(Restrictions.eq("stype", 1));
		if (StringUtils.isNotBlank(professions)) {
			detachedCriteria.add(Restrictions.in("infratype", professions.split(",")));
		}
		return areamanagementDao.find(detachedCriteria);
	}

	@Transactional(readOnly = true)
	public List<String> getAllWorkAreaProfessions() {
		List<String> list = areamanagementDao.createQuery("select distinct infratype from Areamanagement where stype=1 and delFlag=0", null).getResultList();
		return list;
	}
	@Transactional(readOnly = true)
	public List<Areamanagement> getWorkAreasByIds(String workAreaIds) {
		while (workAreaIds.endsWith(",")) {
			workAreaIds = workAreaIds.substring(0, workAreaIds.length() - 1);
		}
		List<Areamanagement> workAreas = areamanagementDao.createQuery("from Areamanagement where id in(" + workAreaIds + ") and delFlag=0", null).getResultList();
		return workAreas;
	}

}
