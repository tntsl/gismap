/**
 * Copyright &copy; 2012-2013 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.ict.sys.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.base.dao.Parameter;
import com.ict.sys.entity.Menu;

/**
 * 菜单DAO接口
 * 
 * @author ThinkGem, nanxiaoqiang
 * @version 2013-05-15
 */
@Repository
public class MenuDao extends BaseDao<Menu> {

	public int deleteById(Long id, String likeParentIds) {
		return this.updateDelFlag(id, Menu.DEL_FLAG_DELETE);
	}

	public List<Menu> findAllActivitiList() {
		return find("from Menu where delFlag=:p1 and isActiviti = :p2 order by sort", Menu.DEL_FLAG_NORMAL, Menu.YES);
	}

	public List<Menu> findByParentIdsLike(String parentIds) {
		return find("from Menu where parentIds like :p1", parentIds);
	}

	public List<Menu> findAllList() {
		return find("from Menu where delFlag=:p1 order by sort", Menu.DEL_FLAG_NORMAL);
	}

	// public List<Menu> findByUserId(String userId) {
	public List<Menu> findByUserId(Long userId) {
		return find("select distinct m from Menu m, Role r, User u where m in elements (r.menuList) and r in elements (u.roleList)"
				+ " and m.delFlag=:p1 and r.delFlag=:p1 and u.delFlag=:p1 and u.id=:p2" + // or
																							// (m.user.id=:p2
																							// and
																							// m.delFlag=:p1)"
																							// +
				" order by m.sort", Menu.DEL_FLAG_NORMAL, userId);
	}

	public List<Menu> findFirstMenuByUserIdAndSite(String site) {
		return find("from Menu where delFlag=:p1 and site like :p2 order by sort", new Parameter(Menu.DEL_FLAG_NORMAL, "%" + site + "%"));
	}

	public List<Menu> findFirstMenuByUserIdAndSite(Long userId, String site) {
		return find("select distinct m from Menu m, Role r, User u where m in elements (r.menuList) and r in elements (u.roleList)"
				+ " and m.delFlag=:p1 and r.delFlag=:p1 and u.delFlag=:p1 and u.id=:p2" + " and m.site like :p3 order by m.sort", new Parameter(Menu.DEL_FLAG_NORMAL, userId, "%" + site + "%"));
	}
	public List<Menu> findByParentIds(String parentIds) {
		return find("from Menu where delFlag=:p1 and parent.id = :p2 order by sort", new Parameter(Menu.DEL_FLAG_NORMAL, Long.parseLong(parentIds)));
	}
}
