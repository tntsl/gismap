package com.ict.resource.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.resource.entity.Prevention;

@Repository
public class PreventionDao extends BaseDao<Prevention> {

	/**
	 * 查询所有防汛Prevention
	 * 
	 * @return
	 */
	public List<Prevention> findPreventionAll() {
		String hql = "from Prevention where delFlag='0' order by sort";
		return find(hql);
	}
}