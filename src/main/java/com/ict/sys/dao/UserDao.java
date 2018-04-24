/**
 * Copyright &copy; 2012-2013 <a href="https://github.com/thinkgem/jeesite">JeeSite</a> All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.ict.sys.dao;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.sys.entity.User;

/**
 * 用户DAO接口
 * 
 * @author ThinkGem, nanxiaoqiang
 * @version 2013-01-15
 */
@Repository
public class UserDao extends BaseDao<User> {
	public User findByLoginName(String loginName) {
		return getByHql("from User where delFlag = ?1 and loginName = ?2", User.DEL_FLAG_NORMAL, loginName);
	}

	public int deleteById(Long id) {
		return this.updateDelFlag(id, User.DEL_FLAG_DELETE);
	}

	public int updatePasswordById(String newPassword, Long id) {
		// public int updatePasswordById(String newPassword, String id){
		return update("update User set password= ?1 where id = ?2", newPassword, id);
	}

	public int updateLoginInfo(String loginIp, Date loginDate, Long id) {
		return update("update User set loginIp= ?1, loginDate= ?2 where id = ?3", loginIp, loginDate, id);
	}

	public List<User> findAllList() {
		return find("from User where delFlag= ?1 order by id", User.DEL_FLAG_NORMAL);
	}
}