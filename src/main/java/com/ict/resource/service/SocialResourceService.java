package com.ict.resource.service;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;
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
import com.ict.base.utils.FeatureUtils;
import com.ict.base.utils.HttpUtils;
import com.ict.resource.dao.SocialResourceDao;
import com.ict.resource.entity.SocialResource;

@Service
@Transactional
public class SocialResourceService extends BaseService {
	@Autowired
	private Properties global;

	@Autowired
	private SocialResourceDao socialResourceDao;

	@Transactional(readOnly = true)
	public SocialResource get(Long id) {
		return socialResourceDao.get(id);
	}
	@Transactional(readOnly = true)
	public List<SocialResource> findAll() {
		return socialResourceDao.findAll();
	}
	@Transactional(readOnly = true)
	public List<SocialResource> findAllXFD() {
		return socialResourceDao.findAllXFD();
	}
	@Transactional(readOnly = true)
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
	@Transactional(readOnly = true)
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
	@Transactional(readOnly = true)
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
	@Transactional(readOnly = true)
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
	public void save(SocialResource socialResource) throws Exception {
		// stype 1-公安；2-医院；3-消防
		String ctype = socialResource.getCtype();
		int stype = 0;
		switch (ctype) {
			case "police" :
				stype = 1;
				break;
			case "hospital" :
				stype = 2;
				break;
			case "fireBrigate" :
				stype = 3;
				break;
			default :
				break;
		}
		socialResource.setStype(stype);
		socialResourceDao.save(socialResource);
		String features = "[{'geometry':{'y':" + socialResource.getY() + ",'x':" + socialResource.getX() + "},'attributes':{'NAME':" + socialResource.getName() + ",'CTYPE':'" + ctype + "','X':"
				+ socialResource.getX() + ",'Y':" + socialResource.getY() + ",'POICODE':" + socialResource.getId() + "}}]";
		String layerUrl = FeatureUtils.getProperty(global, ctype);
		FeatureUtils.addFeature(layerUrl, features);
	}

	public void delete(Long id) {
		socialResourceDao.deleteById(id);
	}

	public void deleteMulti(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			socialResourceDao.deleteById(id);
		}
	}

}
