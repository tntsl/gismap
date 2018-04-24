package com.ict.dic.service;

import java.util.List;
import java.util.StringTokenizer;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.entity.Page;
import com.ict.base.service.BaseService;
import com.ict.base.utils.StringUtils;
import com.ict.dic.dao.LineDao;
import com.ict.dic.entity.Line;

/**
 * 名称：线路Service<br/>
 * 
 * @author 封博卿
 *
 */
@Service
@Transactional(readOnly = true)
public class LineService extends BaseService {
	@Autowired
	private LineDao lineDao;

	public Line get(Long id) {
		return lineDao.get(id);
	}
	/*
	 * public Line findByCode(String code) { return lineDao.findByCode(code); }
	 */
	public Line findByCode(String code) {
		DetachedCriteria dc = lineDao.createDetachedCriteria(new Criterion[0]);
		dc.add(Restrictions.eq("delFlag", "0"));
		dc.add(Restrictions.eq("code", code));
		List<Line> list = lineDao.find(dc);
		if ((list != null) && (list.size() != 0)) {
			return (Line) list.get(0);
		}
		return null;
	}

	public Line findName(String name) {
		List<Line> list = lineDao.findName(name);
		if (list != null && list.size() > 0)
			return list.get(0);
		else
			return null;

	}

	public List<Line> findAll() {
		return lineDao.findAllList();
	}

	public Page<Line> find(Page<Line> page, Line entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = lineDao.createDetachedCriteria();
		// 根据名称查找预案
		if (StringUtils.isNotEmpty(entity.getName())) {
			dc.add(Restrictions.like("name", "%" + entity.getName() + "%"));
		}

		// 删除标记
		dc.add(Restrictions.eq(Line.FIELD_DEL_FLAG, entity.getDelFlag()));
		dc.addOrder(Order.asc("sort"));
		return lineDao.find(page, dc);
	}

	@Transactional(readOnly = false)
	public void save(Line entity) {
		lineDao.clear();
		lineDao.save(entity);
	}

	// public Line getEntity(Long id) {
	// return lineDao.get(id);
	// }

	@Transactional(readOnly = false)
	public void delete(Long id) {
		lineDao.deleteById(id);
	}

	@Transactional(readOnly = false)
	public void deleteMulti(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			lineDao.deleteById(id);

		}
	}
}
