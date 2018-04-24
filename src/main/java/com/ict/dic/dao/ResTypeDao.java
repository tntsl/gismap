package com.ict.dic.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.dic.entity.ResType;

@Repository
public class ResTypeDao extends BaseDao<ResType> {

	public List<ResType> findByParentIdsLike(String parentIds) {
		String hql = "from ResType where delFlag='" + ResType.DEL_FLAG_NORMAL + "' and parentIds like '%" + parentIds + "%' order by sort";
		return this.find(hql);
	}

	public List<ResType> findTypeList() {
		String hql = "from ResType where delFlag='" + ResType.DEL_FLAG_NORMAL + "' and id!=1 order by sort";
		return this.find(hql);
	}

	public List<ResType> findByParentId(Long pid) {
		String hql = "from ResType where delFlag='" + ResType.DEL_FLAG_NORMAL + "' and parent.id=" + pid + " order by sort";
		return this.find(hql);
	}

	public List<ResType> findchild(Long id) {
		String hql = "from ResType where delFlag='" + ResType.DEL_FLAG_NORMAL + "' and parent.id=" + id + " order by sort";
		return this.find(hql);
	}

	public List<ResType> findRoot() {
		String hql = "from ResType where delFlag='" + ResType.DEL_FLAG_NORMAL + "' and parent.id =1 order by sort";
		return this.find(hql);
	}
}
