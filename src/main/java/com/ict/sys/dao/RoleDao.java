/**
 * Copyright &copy; 2012-2013 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.ict.sys.dao;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.base.dao.Parameter;
import com.ict.sys.entity.Role;

/**
 * 角色DAO接口
 * 
 * @author ThinkGem, nanxiaoqiang
 * @version 2013-05-15
 */
@Repository
public class RoleDao extends BaseDao<Role> {

	public Role findByName(String name) {
		return getByHql("from Role where delFlag = :p1 and name = :p2", new Parameter(Role.DEL_FLAG_NORMAL, name));
	}

	public int deleteById(Long id) {
		return this.updateDelFlag(id, Role.DEL_FLAG_DELETE);
	}

	// @Query("from Role where delFlag='" + Role.DEL_FLAG_NORMAL +
	// "' order by name")
	// public List<Role> findAllList();
	//
	// @Query("select distinct r from Role r, User u where r in elements
	// (u.roleList) and r.delFlag='"
	// + Role.DEL_FLAG_NORMAL +
	// "' and u.delFlag='" + User.DEL_FLAG_NORMAL +
	// "' and u.id=?1 or (r.user.id=?1 and r.delFlag='" + Role.DEL_FLAG_NORMAL +
	// "') order by r.name")
	// public List<Role> findByUserId(Long userId);
}