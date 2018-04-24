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
	@SuppressWarnings("unchecked")
	public List<PointCz> findPointCz(String code) {
		Query query = entityManager.createNativeQuery("select * from SDE.POINTCZ where pointcode like ?1", PointCz.class);
		query.setParameter(0, "%" + code + "%");
		return query.getResultList();
	}

	/**
	 * 通过站名查询空间数据库中PointCz
	 * 
	 * @param name
	 * @return
	 */
	public List<Object> findPointCzByName(String name) {
		Query query = entityManager.createNativeQuery("select x,y from SDE.POINTCZ where POINTNAME= ?1", PointCz.class);
		query.setParameter(0, name);
		return query.getResultList();
	}

	public List<PointCz> findPointCzs() {
		Query query = entityManager.createNativeQuery("select * from SDE.POINTCZ", PointCz.class);
		return query.getResultList();
	}
}
