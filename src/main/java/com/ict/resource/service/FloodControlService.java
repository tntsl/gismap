package com.ict.resource.service;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.base.service.BaseService;
import com.ict.resource.dao.FloodControlDao;
import com.ict.resource.entity.FloodControl;

@Service
public class FloodControlService extends BaseService {

	@Autowired
	private FloodControlDao floodControlDao;

	public List<FloodControl> getAllPreventions(Long id) {
		DetachedCriteria detachedCriteria = floodControlDao.createDetachedCriteria();
		detachedCriteria.add(Restrictions.eq(FloodControl.FIELD_DEL_FLAG, FloodControl.DEL_FLAG_NORMAL));
		detachedCriteria.add(Restrictions.eq("pid", id));
		return floodControlDao.find(detachedCriteria);
	}

}
