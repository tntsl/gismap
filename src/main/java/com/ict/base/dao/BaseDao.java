package com.ict.base.dao;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.persistence.EntityManager;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.internal.CriteriaImpl;
import org.hibernate.transform.ResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;

import com.ict.base.entity.BaseEntity;
import com.ict.base.entity.Page;
import com.ict.base.utils.Reflections;
import com.ict.base.utils.StringUtils;

/**
 * DAO支持类实现
 *
 * @param <T>
 * @author ThinkGem
 * @version 2013-05-15
 */
public class BaseDao<T> {

	@Autowired
	protected EntityManager entityManager;

	/**
	 * 实体类类型(由构造方法自动赋值)
	 */
	private Class<?> entityClass;

	/**
	 * 构造方法，根据实例类自动获取实体类类型
	 */
	public BaseDao() {
		entityClass = Reflections.getClassGenricType(getClass());
	}

	/**
	 * 获取 Session
	 */
	public EntityManager getEntityManager() {
		return entityManager;
	}

	/**
	 * 强制与数据库同步
	 */
	public void flush() {
		entityManager.flush();
	}

	/**
	 * 清除缓存数据
	 */
	public void clear() {
		entityManager.clear();
	}

	// -------------- QL Query --------------

	/**
	 * QL 分页查询
	 *
	 * @param page
	 * @param qlString
	 * @return
	 */
	public <E> Page<E> find(Page<E> page, String qlString) {
		return find(page, qlString, null);
	}

	/**
	 * QL 分页查询
	 *
	 * @param page
	 * @param qlString
	 * @param parameter
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <E> Page<E> find(Page<E> page, String qlString, Object... parameter) {
		// get count
		if (!page.isDisabled() && !page.isNotCount()) {
			String countQlString = "select count(*) " + removeSelect(removeOrders(qlString));
			// page.setCount(Long.valueOf(createQuery(countQlString,
			// parameter).uniqueResult().toString()));
			Query query = createQuery(countQlString, parameter);
			List<Object> list = query.getResultList();
			if (list.size() > 0) {
				page.setCount(Long.valueOf(list.get(0).toString()));
			} else {
				page.setCount(list.size());
			}
			if (page.getCount() < 1) {
				return page;
			}
		}
		// order by
		String ql = qlString;
		if (StringUtils.isNotBlank(page.getOrderBy())) {
			ql += " order by " + page.getOrderBy();
		}
		Query query = createQuery(ql, parameter);
		// set page
		if (!page.isDisabled()) {
			query.setFirstResult(page.getFirstResult());
			query.setMaxResults(page.getMaxResults());
		}
		page.setList(query.getResultList());
		return page;
	}

	/**
	 * QL 查询
	 *
	 * @param qlString
	 * @return
	 */
	public <E> List<E> find(String qlString) {
		return find(qlString, null);
	}

	/**
	 * QL 查询
	 *
	 * @param qlString
	 * @param parameter
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <E> List<E> find(String qlString, Object... parameter) {
		Query query = createQuery(qlString, parameter);
		return query.getResultList();
	}

	/**
	 * QL 查询所有
	 *
	 * @return
	 */
	@SuppressWarnings({"unchecked", "rawtypes"})
	public List<?> findAll() {
		CriteriaQuery query = entityManager.getCriteriaBuilder().createQuery(entityClass);
		Root<?> root = query.from(entityClass);
		query.select(root);
		return entityManager.createQuery(query).getResultList();
	}

	/**
	 * QL 查询所有
	 *
	 * @return
	 */
	public List<T> findAllList() {
		return find("from " + entityClass.getSimpleName() + " where delFlag='" + BaseEntity.DEL_FLAG_NORMAL + "' order by sort");
	}

	public Object finfByHQL(String qlString, Object... parameter) {
		Query query = createQuery(qlString, parameter);
		return query.getSingleResult();
	}
	/**
	 * QL 查询所有线路
	 *
	 * @return
	 */
	/*
	 * public List<T> findWorksite() { return
	 * find(" OBJECTID,LINESECTION,REMARKS,MEASURE,车站 station,LINE,CODE_NEW,NAME, sde.st_minx (SHAPE)  minx,sde.st_maxx (SHAPE) maxx, sde.st_miny (SHAPE) miny,sde.st_maxy (SHAPE) maxy from sde.worksite "
	 * ); }
	 */

	/**
	 * 获取实体
	 *
	 * @param id
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T get(Serializable id) {
		return (T) entityManager.find(entityClass, id);
	}

	/**
	 * 获取实体
	 *
	 * @param qlString
	 * @return
	 */
	public T getByHql(String qlString) {
		return getByHql(qlString, null);
	}

	/**
	 * 获取实体
	 *
	 * @param qlString
	 * @param parameter
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public T getByHql(String qlString, Object... parameter) {
		Query query = createQuery(qlString, parameter);
		return (T) query.getSingleResult();
	}

	/**
	 * 保存实体
	 *
	 * @param entity
	 */
	public void save(T entity) {
		try {
			// 获取实体编号
			Object id = null;
			for (Method method : entity.getClass().getMethods()) {
				Id idAnn = method.getAnnotation(Id.class);
				if (idAnn != null) {
					id = method.invoke(entity);
					break;
				}
			}
			// 插入前执行方法
			if (id == null || StringUtils.isBlank(id + "")) {
				// if (StringUtils.isBlank((String)id)){
				for (Method method : entity.getClass().getMethods()) {
					PrePersist pp = method.getAnnotation(PrePersist.class);
					if (pp != null) {
						method.invoke(entity);
						break;
					}
				}
			}
			// 更新前执行方法
			else {
				for (Method method : entity.getClass().getMethods()) {
					PreUpdate pu = method.getAnnotation(PreUpdate.class);
					if (pu != null) {
						method.invoke(entity);
						break;
					}
				}
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		entityManager.merge(entity);
	}

	/**
	 * 保存实体列表
	 *
	 * @param entityList
	 */
	public void save(List<T> entityList) {
		for (T entity : entityList) {
			save(entity);
		}
	}

	/**
	 * 更新
	 *
	 * @param qlString
	 * @return
	 */
	public int update(String qlString) {
		return update(qlString, null);
	}

	/**
	 * 更新
	 *
	 * @param qlString
	 * @param parameter
	 * @return
	 */
	public int update(String qlString, Object... parameter) {
		return createQuery(qlString, parameter).executeUpdate();
	}

	/**
	 * 逻辑删除
	 *
	 * @param id
	 * @return
	 */
	public int deleteById(Serializable id) {
		return update("update " + entityClass.getSimpleName() + " set delFlag='" + BaseEntity.DEL_FLAG_DELETE + "' where id = ?1", id);
	}

	/**
	 * 逻辑删除
	 *
	 * @param id
	 * @param likeParentIds
	 * @return
	 */
	public int deleteById(Serializable id, String likeParentIds) {
		return update("update " + entityClass.getSimpleName() + " set delFlag = '" + BaseEntity.DEL_FLAG_DELETE + "' where id = ?1 or parentIds like ?2", id, likeParentIds);
	}

	/**
	 * 更新删除标记
	 *
	 * @param id
	 * @param delFlag
	 * @return
	 */
	public int updateDelFlag(Serializable id, String delFlag) {
		return update("update " + entityClass.getSimpleName() + " set delFlag = ?1 where id = ?2", delFlag, id);
	}

	/**
	 * 创建 QL 查询对象
	 *
	 * @param qlString
	 * @param parameter
	 * @return
	 */
	public Query createQuery(String qlString, Object... parameter) {
		Query query = entityManager.createQuery(qlString);
		if (qlString.lastIndexOf('?') != -1) {
			setParameter(query, parameter);
		}
		return query;
	}

	// -------------- SQL Query --------------

	/**
	 * SQL 分页查询
	 *
	 * @param page
	 * @param sqlString
	 * @return
	 */
	public <E> Page<E> findBySql(Page<E> page, String sqlString) {
		return findBySql(page, sqlString, null, null);
	}

	/**
	 * SQL 分页查询
	 *
	 * @param page
	 * @param sqlString
	 * @param parameter
	 * @return
	 */
	public <E> Page<E> findBySql(Page<E> page, String sqlString, Object... parameter) {
		return findBySql(page, sqlString, parameter, null);
	}

	/**
	 * SQL 分页查询
	 *
	 * @param page
	 * @param sqlString
	 * @param resultClass
	 * @return
	 */
	public <E> Page<E> findBySql(Page<E> page, String sqlString, Class<?> resultClass) {
		return findBySql(page, sqlString, null, resultClass);
	}

	/**
	 * SQL 分页查询
	 *
	 * @param page
	 * @param sqlString
	 * @param resultClass
	 * @param parameter
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <E> Page<E> findBySql(Page<E> page, String sqlString, Object[] parameter, Class<?> resultClass) {
		// get count
		if (!page.isDisabled() && !page.isNotCount()) {
			String countSqlString = "select count(*) " + removeSelect(removeOrders(sqlString));
			// page.setCount(Long.valueOf(createSqlQuery(countSqlString,
			// parameter).uniqueResult().toString()));
			Query query = createSqlQuery(countSqlString, parameter);
			List<Object> list = query.getResultList();
			if (list.size() > 0) {
				page.setCount(Long.valueOf(list.get(0).toString()));
			} else {
				page.setCount(list.size());
			}
			if (page.getCount() < 1) {
				return page;
			}
		}
		// order by
		String sql = sqlString;
		if (StringUtils.isNotBlank(page.getOrderBy())) {
			sql += " order by " + page.getOrderBy();
		}
		Query query = entityManager.createQuery(sql, resultClass);
		setParameter(query, parameter);
		// set page
		if (!page.isDisabled()) {
			query.setFirstResult(page.getFirstResult());
			query.setMaxResults(page.getMaxResults());
		}
		page.setList(query.getResultList());
		return page;
	}

	/**
	 * SQL 查询
	 *
	 * @param sqlString
	 * @return
	 */
	public <E> List<E> findBySql(String sqlString) {
		List<E> listE = findBySql(sqlString, null, null);
		return listE;
	}

	/**
	 * SQL 查询
	 *
	 * @param sqlString
	 * @param parameter
	 * @return
	 */
	public <E> List<E> findBySql(String sqlString, Object... parameter) {
		return findBySql(sqlString, parameter, null);
	}

	/**
	 * SQL 查询
	 *
	 * @param sqlString
	 * @param resultClass
	 * @param parameter
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public <E> List<E> findBySql(String sqlString, Object[] parameter, Class<?> resultClass) {
		Query query = entityManager.createQuery(sqlString, resultClass);
		setParameter(query, parameter);
		System.out.println(query);
		System.out.println(query.getResultList());
		return query.getResultList();
	}

	/**
	 * SQL 更新
	 *
	 * @param sqlString
	 * @param parameter
	 * @return
	 */
	public int updateBySql(String sqlString, Object... parameter) {
		return createSqlQuery(sqlString, parameter).executeUpdate();
	}

	/**
	 * 创建 SQL 查询对象
	 *
	 * @param sqlString
	 * @param parameter
	 * @return
	 */
	public Query createSqlQuery(String sqlString, Object... parameter) {
		Query query = entityManager.createNativeQuery(sqlString);
		setParameter(query, parameter);
		return query;
	}

	// -------------- Query Tools --------------

	/**
	 * 设置查询参数
	 *
	 * @param query
	 * @param parameter
	 */
	private void setParameter(Query query, Object[] parameter) {
		if (parameter != null && parameter.length > 0) {
			for (int i = 0; i < parameter.length; i++) {
				query.setParameter(i + 1, parameter[i]);
			}
		}
	}

	/**
	 * 去除qlString的select子句。
	 *
	 * @param qlString
	 * @return
	 */
	private String removeSelect(String qlString) {
		int beginPos = qlString.toLowerCase().indexOf("from");
		return qlString.substring(beginPos);
	}

	/**
	 * 去除hql的orderBy子句。
	 *
	 * @param qlString
	 * @return
	 */
	private String removeOrders(String qlString) {
		Pattern p = Pattern.compile("order\\s*by[\\w|\\W|\\s|\\S]*", Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(qlString);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, "");
		}
		m.appendTail(sb);
		return sb.toString();
	}

	// -------------- Criteria --------------

	/**
	 * 分页查询
	 *
	 * @param page
	 * @return
	 */
	public Page<T> find(Page<T> page) {
		return find(page, createDetachedCriteria());
	}

	/**
	 * 使用检索标准对象分页查询
	 *
	 * @param page
	 * @param detachedCriteria
	 * @return
	 */
	public Page<T> find(Page<T> page, DetachedCriteria detachedCriteria) {
		return find(page, detachedCriteria, Criteria.DISTINCT_ROOT_ENTITY);
	}

	/**
	 * 使用检索标准对象分页查询
	 *
	 * @param page
	 * @param detachedCriteria
	 * @param resultTransformer
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Page<T> find(Page<T> page, DetachedCriteria detachedCriteria, ResultTransformer resultTransformer) {
		// get count
		if (!page.isDisabled() && !page.isNotCount()) {
			page.setCount(count(detachedCriteria));
			if (page.getCount() < 1) {
				return page;
			}
		}
		Criteria criteria = detachedCriteria.getExecutableCriteria(entityManager.unwrap(Session.class));
		criteria.setResultTransformer(resultTransformer);
		// set page
		if (!page.isDisabled()) {
			criteria.setFirstResult(page.getFirstResult());
			criteria.setMaxResults(page.getMaxResults());
		}
		// order by
		if (StringUtils.isNotBlank(page.getOrderBy())) {
			for (String order : StringUtils.split(page.getOrderBy(), ",")) {
				String[] o = StringUtils.split(order, " ");
				if (o.length == 1) {
					criteria.addOrder(Order.asc(o[0]));
				} else if (o.length == 2) {
					if ("DESC".equals(o[1].toUpperCase())) {
						criteria.addOrder(Order.desc(o[0]));
					} else {
						criteria.addOrder(Order.asc(o[0]));
					}
				}
			}
		}
		page.setList(criteria.list());
		return page;
	}

	/**
	 * 使用检索标准对象查询
	 *
	 * @param detachedCriteria
	 * @return
	 */
	public List<T> find(DetachedCriteria detachedCriteria) {
		return find(detachedCriteria, Criteria.DISTINCT_ROOT_ENTITY);
	}

	/**
	 * 使用检索标准对象查询
	 *
	 * @param detachedCriteria
	 * @param resultTransformer
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<T> find(DetachedCriteria detachedCriteria, ResultTransformer resultTransformer) {
		Criteria criteria = detachedCriteria.getExecutableCriteria(entityManager.unwrap(Session.class));
		criteria.setResultTransformer(resultTransformer);
		return criteria.list();
	}

	/**
	 * 使用检索标准对象查询记录数
	 *
	 * @param detachedCriteria
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public long count(DetachedCriteria detachedCriteria) {
		Criteria criteria = detachedCriteria.getExecutableCriteria(entityManager.unwrap(Session.class));
		long totalCount = 0;
		try {
			// Get orders
			Field field = CriteriaImpl.class.getDeclaredField("orderEntries");
			field.setAccessible(true);
			List orderEntrys = (List) field.get(criteria);
			// Remove orders
			field.set(criteria, new ArrayList());
			// Get count
			criteria.setProjection(Projections.rowCount());
			totalCount = Long.valueOf(criteria.uniqueResult().toString());
			// Clean count
			criteria.setProjection(null);
			// Restore orders
			field.set(criteria, orderEntrys);
		} catch (NoSuchFieldException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return totalCount;
	}

	/**
	 * 创建与会话无关的检索标准对象
	 *
	 * @param criterions
	 *            Restrictions.eq("name", value);
	 * @return
	 */
	public DetachedCriteria createDetachedCriteria(Criterion... criterions) {
		DetachedCriteria dc = DetachedCriteria.forClass(entityClass);
		for (Criterion c : criterions) {
			dc.add(c);
		}
		return dc;
	}

}