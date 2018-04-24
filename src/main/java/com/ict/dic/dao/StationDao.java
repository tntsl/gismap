package com.ict.dic.dao;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.base.dao.Parameter;
import com.ict.dic.entity.Station;

@Repository
public class StationDao extends BaseDao<Station> {
	public int deleteById(Long id) {
		return this.updateDelFlag(id, Station.DEL_FLAG_DELETE);
	}

	public List<Station> findAllList() {
		return find("from Station where delFlag=:p1 order by sort", new Parameter(Station.DEL_FLAG_NORMAL));
	}

	public List<Station> findStation(String name) {
		return find("from Station where delFlag=:p1 and name=:p2 order by sort", new Parameter(Station.DEL_FLAG_NORMAL, name));
	}

	public List<Station> findAllByStationType(String type) {
		return find("from Station where delFlag=:p1 and stationType=:p2 order by sort", new Parameter(Station.DEL_FLAG_NORMAL, type));
	}

	public List<Station> getByCode(String[] strings) {
		return find("from Station where delFlag=:p1 and code in ('" + StringUtils.join(strings, "','") + "') order by sort", new Parameter(Station.DEL_FLAG_NORMAL));
	}
	// 综合监控报警
	public Station findByCode(String code) {
		return getByHql("from Station where delFlag=:p1 and code=:p2", new Parameter(Station.DEL_FLAG_NORMAL, code));
	}
}
