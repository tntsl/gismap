package com.ict.resource.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.dic.entity.ResType;

@Repository
public class ArcMapPOIDao extends BaseDao<Object> {

	/**
	 * 框选查询
	 * 
	 * @param code
	 * @return ArcmapPoi
	 */
	public List<Object[]> findArcmapPoi(List<String> code) {
		List<Object[]> apoi = new ArrayList<Object[]>();
		for (int i = 0; i < code.size(); i++) {
			String sqlString = "select id,code,addr,name,person,phone,stype FROM ep_res_social where code=" + code.get(i);
			List<Object[]> lpoi = createSqlQuery(sqlString, null).getResultList();
			apoi.addAll(lpoi);
		}
		return apoi;
	}

	/**
	 * 查询所有资源类型
	 * 
	 * @return
	 */
	public List<Object[]> findAllRestypeName() {
		List<Object[]> restypeName = createSqlQuery("select distinct name FROM ep_res_restype", null).getResultList();
		return restypeName;
	}

	/**
	 * 通过资源名字获得资源ID
	 * 
	 * @param ResName
	 * @return
	 */
	public List<ResType> findRestypeidByName(String resName) {
		// List<Object[]> resId = createSqlQuery("select id FROM
		// ep_res_restype where name ='"+resName+"'", null)
		// .addScalar("id", StandardBasicTypes.STRING).addScalar("name",
		// StandardBasicTypes.STRING).list();
		String hql = "from ResType where delFlag='" + ResType.DEL_FLAG_NORMAL + "' and name='" + resName + "'";
		return find(hql);
	}
}