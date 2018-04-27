package com.ict.map.dao;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.map.entity.PointCz;

@Repository
public class PointCzDao extends BaseDao<PointCz> {

	/**
	 * 通过CODE查询空间数据库中PointCz
	 * 
	 * @return List<PointCz>
	 */
	public List<PointCz> findPointCz(String code) {
		Query query = entityManager.createNativeQuery("select pointid, pointname, pointcode, lineid, linecode, x, y from sde.pointcz where pointcode like ?1", "pointcz");
		query.setParameter(1, "%" + code + "%");
		return query.getResultList();
	}

	/**
	 * 通过站名查询空间数据库中PointCz
	 * 
	 * @param name
	 * @return
	 */
	public List<Object> findPointCzByName(String name) {
		Query query = createSqlQuery("select x,y from sde.pointcz where pointname= ?1", name);
		return query.getResultList();
	}

	public List<PointCz> findPointCzs() {
		Query query = entityManager.createNativeQuery("select pointid, pointname, pointcode, lineid, linecode, x, y from sde.pointcz", "pointcz");
		return query.getResultList();
	}
}
