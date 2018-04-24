package com.ict.resource.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.resource.entity.Material;
import com.ict.resource.entity.Worksite;
import com.ict.resource.entity.WorksiteInfo;

@Repository
public class WorksiteDao extends BaseDao<Material> {
	public List<Worksite> findByWhere(String wherestr) {
		String hql = "from Worksite  " + wherestr;
		return find(hql);
	}
	public List<WorksiteInfo> findInfoByWhere(String wherestr) {
		String hql = "from WorksiteInfo  " + wherestr;
		return find(hql);
	}
	public List<Worksite> findByPar(float x, float y, float radius) {
		String hql = "from Worksite  where sqrt(power(x-" + x + ",2)+power(y-" + y + ",2))<" + radius;
		return find(hql);
	}
}
