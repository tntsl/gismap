package com.ict.dic.service;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.service.BaseService;
import com.ict.dic.dao.ResTypeDao;
import com.ict.dic.entity.ResType;

@Service
@Transactional(readOnly = true)
public class ResTypeService extends BaseService {

	@Autowired
	private ResTypeDao resTypeDao;

	public ResType get(Long id) {
		return (ResType) resTypeDao.get(id);
	}

	public List<ResType> findAll() {
		DetachedCriteria dc = resTypeDao.createDetachedCriteria(new Criterion[0]);

		dc.add(Restrictions.eq("delFlag", "0"));
		List<ResType> resTypeList = resTypeDao.find(dc);
		return resTypeList;
	}

	public ResType getByName(String name) {
		DetachedCriteria dc = resTypeDao.createDetachedCriteria(new Criterion[0]);

		dc.add(Restrictions.eq("delFlag", "0"));
		dc.add(Restrictions.eq("name", name));
		List<ResType> resTypeList = resTypeDao.find(dc);
		if ((resTypeList != null) && (resTypeList.size() != 0)) {
			return (ResType) resTypeList.get(0);
		}
		return null;
	}

	public List<ResType> findchild(Long id) {
		return resTypeDao.findchild(id);
	}

	public List<ResType> findTypeList() {
		return resTypeDao.findTypeList();
	}
	public List<ResType> treeList() {
		List<ResType> rtlist = resTypeDao.findRoot();
		List<ResType> treelist = new ArrayList<>();
		if (rtlist.size() > 0) {
			for (Integer i = 0; i < rtlist.size(); i++) {
				ResType rt = rtlist.get(i);
				List<ResType> childlist = resTypeDao.findByParentId(rt.getId());
				if (childlist.size() > 0) {
					for (Integer j = 0; j < childlist.size(); j++) {
						rt.getChildList().add(childlist.get(j));
					}
				}
				treelist.add(rt);
			}
		}
		return treelist;
	}
	public List<ResType> findRoot() {
		return resTypeDao.findRoot();
	}

	@Transactional(readOnly = false)
	public void save(ResType resType) {
		resType.setParent(get(resType.getParent().getId()));
		String oldParentIds = resType.getParentIds();
		resType.setParentIds(resType.getParent().getParentIds() + resType.getParent().getId() + ",");
		resTypeDao.clear();
		resTypeDao.save(resType);
		List<ResType> list = resTypeDao.findByParentIdsLike(resType.getId() + "");
		for (ResType e : list) {
			e.setParentIds(e.getParentIds().replace(oldParentIds, resType.getParentIds()));
		}
		resTypeDao.save(list);
	}

	@Transactional(readOnly = false)
	public void deleteResType(Long id) {
		resTypeDao.deleteById(id, "%," + id + ",%");
	}

	public List<ResType> findByParentId(Long pid) {
		return resTypeDao.findByParentId(pid);
	}

	public ResType findByCode(String code) {
		DetachedCriteria dc = resTypeDao.createDetachedCriteria(new Criterion[0]);

		dc.add(Restrictions.eq("delFlag", "0"));
		dc.add(Restrictions.eq("code", code));
		List<ResType> resTypeList = resTypeDao.find(dc);
		if ((resTypeList != null) && (resTypeList.size() != 0)) {
			return (ResType) resTypeList.get(0);
		}
		return null;
	}
}