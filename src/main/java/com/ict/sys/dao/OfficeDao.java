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
import com.ict.sys.entity.Office;

/**
 * 机构DAO接口
 * 
 * @author ThinkGem, nanxiaoqiang
 * @version 2013-05-15
 */
@Repository
public class OfficeDao extends BaseDao<Office> {

	public int deleteById(Long id, String likeParentIds) {
		return this.updateDelFlag(id, Office.DEL_FLAG_DELETE);
	}

	public List<Office> findByParentIdsLike(String parentIds) {
		return find("from Office where parentIds like :p1", new Parameter(parentIds));
	}
	public Office findRoot() {
		return (Office) finfByHQL("from Office where delFlag = :p1 and id = 1", new Parameter(Office.DEL_FLAG_NORMAL));
	}
}