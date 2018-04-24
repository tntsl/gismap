package com.ict.resource.dao;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.resource.entity.Areamanagement;

@Repository
public class AreamanagementDao extends BaseDao<Areamanagement> {

	/**
	 * 通过ID查询
	 * 
	 * @param id
	 * @return
	 */
	public Areamanagement getWorkArea(long id) {
		Areamanagement areamanagement = getByHql("from Areamanagement where id=:p1 and delFlag = :p2 order by sort", id, Areamanagement.DEL_FLAG_NORMAL);
		return areamanagement;
	}

}
