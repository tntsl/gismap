package com.ict.resource.service;

import java.util.List;
import java.util.StringTokenizer;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.entity.Page;
import com.ict.base.service.BaseService;
import com.ict.resource.dao.SocialResourceDao;
import com.ict.resource.entity.SocialResource;

@Service
@Transactional
public class SocialResourceService extends BaseService {
	@Autowired
	private SocialResourceDao socialResourceDao;

	public SocialResource get(Long id) {
		return (SocialResource) socialResourceDao.get(id);
	}

	public List<SocialResource> findAll() {
		return socialResourceDao.findAll();
	}

	public List<SocialResource> findAllXFD() {
		return socialResourceDao.findAllXFD();
	}

	public Page<SocialResource> find(Page<SocialResource> page, SocialResource entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = socialResourceDao.createDetachedCriteria();

		// if (StringUtils.isNotEmpty(entity.getName())) {
		// dc.add(Restrictions.like("name", "%" + entity.getName() + "%"));
		// }
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%")));

		}
		if (entity.getStype() != null) {
			dc.add(Restrictions.eq("stype", entity.getStype()));
		}

		// 删除标记
		dc.add(Restrictions.eq(SocialResource.FIELD_DEL_FLAG, SocialResource.DEL_FLAG_NORMAL));
		dc.addOrder(Order.asc("sort"));
		return socialResourceDao.find(page, dc);
	}
	public Page<SocialResource> findpolice(Page<SocialResource> page, SocialResource entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = socialResourceDao.createDetachedCriteria();
		dc.add(Restrictions.eq("stype", 1));
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%"),
					Restrictions.like("addr", "%" + entity.getName() + "%"), Restrictions.like("region", "%" + entity.getName() + "%"),
					Restrictions.like("stationname", "%" + entity.getName() + "%")));
		}
		// 删除标记
		dc.add(Restrictions.eq(SocialResource.FIELD_DEL_FLAG, SocialResource.DEL_FLAG_NORMAL));
		dc.addOrder(Order.asc("sort"));
		return socialResourceDao.find(page, dc);
	}
	public Page<SocialResource> findhospital(Page<SocialResource> page, SocialResource entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = socialResourceDao.createDetachedCriteria();
		dc.add(Restrictions.eq("stype", 2));
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%"),
					Restrictions.like("addr", "%" + entity.getName() + "%"), Restrictions.like("region", "%" + entity.getName() + "%"), Restrictions.like("stationname", "%" + entity.getName() + "%"),
					Restrictions.like("hsplevel", "%" + entity.getName() + "%"), Restrictions.like("subject", "%" + entity.getName() + "%")));
		}
		// 删除标记
		dc.add(Restrictions.eq(SocialResource.FIELD_DEL_FLAG, SocialResource.DEL_FLAG_NORMAL));
		dc.addOrder(Order.asc("sort"));
		return socialResourceDao.find(page, dc);
	}
	public Page<SocialResource> findfirealarm(Page<SocialResource> page, SocialResource entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = socialResourceDao.createDetachedCriteria();
		dc.add(Restrictions.eq("stype", 3));
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.or(Restrictions.like("name", "%" + entity.getName() + "%"), Restrictions.like("person", "%" + entity.getName() + "%"),
					Restrictions.like("addr", "%" + entity.getName() + "%"), Restrictions.like("region", "%" + entity.getName() + "%"), Restrictions.like("stationname", "%" + entity.getName() + "%"),
					Restrictions.like("specialequip", "%" + entity.getName() + "%")));
		}
		// 删除标记
		dc.add(Restrictions.eq(SocialResource.FIELD_DEL_FLAG, SocialResource.DEL_FLAG_NORMAL));
		dc.addOrder(Order.asc("sort"));
		return socialResourceDao.find(page, dc);
	}
	@Transactional(readOnly = false)
	public void save(SocialResource expert) {
		socialResourceDao.clear();
		socialResourceDao.save(expert);
	}

	@Transactional(readOnly = false)
	public void delete(Long id) {
		socialResourceDao.deleteById(id);
	}

	@Transactional(readOnly = false)
	public void deleteMulti(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			socialResourceDao.deleteById(id);
		}
	}
}
