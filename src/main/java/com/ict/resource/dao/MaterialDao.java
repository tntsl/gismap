package com.ict.resource.dao;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.resource.entity.Material;

@Repository
public class MaterialDao extends BaseDao<Material> {
	public List<Material> findbySiteId(Long id) {
		String hql = "from Material where delFlag='0' and station.id=" + id + " order by sort";
		return find(hql);
	}

	public List<Material> findbyStationRes(Long stationId, Long resId) {
		String hql = "from Material where delFlag='0' and station.id=" + stationId + " and restypeId.id=" + resId + " order by sort";
		return find(hql);
	}

	public List<Material> findbyRestypeId(String ids) {
		while (ids.endsWith(",")) {
			ids = ids.substring(0, ids.length() - 1);
		}
		String hql = "from Material where delFlag='0' and restypeId.id in (" + ids + ") order by restypeId.id desc";
		return find(hql);
	}

	public List<Material> findbySiteAndtype(Long siteId, Long typeId) {
		String hql = "from Material where delFlag='0' and station.id=" + siteId + " and restypeId.id=" + typeId + "  order by sort";
		return find(hql);
	}

	public Integer findByLineId(Long rtId, Long lineId) {
		String hql = "select count(*) from Material where restypeId.id=" + rtId + " and  line.id=" + lineId + "  order by sort";
		Query query = getEntityManager().createQuery(hql);
		Object resultObj = query.getSingleResult();
		if (resultObj != null) {
			return Integer.valueOf(resultObj.toString());
		}
		return Integer.valueOf(0);
	}

	public List<Material> findByLineRes(Long rtId, Long lineId) {
		String hql = "from Material where restypeId.id=" + rtId + " and  line.id=" + lineId + "  order by sort";
		return find(hql);
	}

	public List<Material> findByPrj(Long no) {
		String hql = "from Material where delFlag='0' and line.id in (select l.id from Line l where l.prjcenter.id=" + no + ") order by sort";
		return find(hql);
	}
}
