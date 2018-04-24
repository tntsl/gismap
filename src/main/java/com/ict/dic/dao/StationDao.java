package com.ict.dic.dao;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.dic.entity.Station;

@Repository
public class StationDao extends BaseDao<Station> {
	public int deleteById(Long id) {
		return this.updateDelFlag(id, Station.DEL_FLAG_DELETE);
	}

	public List<Station> findAllList() {
		return find("from Station where delFlag= ?1 order by sort", Station.DEL_FLAG_NORMAL);
	}

	public List<Station> findStation(String name) {
		return find("from Station where delFlag= ?1 and name= ?2 order by sort", Station.DEL_FLAG_NORMAL, name);
	}

	public List<Station> findAllByStationType(String type) {
		return find("from Station where delFlag= ?1 and stationType= ?2 order by sort", Station.DEL_FLAG_NORMAL, type);
	}

	public List<Station> getByCode(String[] strings) {
		return find("from Station where delFlag= ?1 and code in ('" + StringUtils.join(strings, "','") + "') order by sort", Station.DEL_FLAG_NORMAL);
	}
	// 综合监控报警
	public Station findByCode(String code) {
		return getByHql("from Station where delFlag= ?1 and code= ?2", Station.DEL_FLAG_NORMAL, code);
	}
}
