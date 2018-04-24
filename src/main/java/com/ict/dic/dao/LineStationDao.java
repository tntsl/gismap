package com.ict.dic.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.dic.entity.Line;
import com.ict.dic.entity.LineStation;
import com.ict.dic.entity.Station;

@Repository
public class LineStationDao extends BaseDao<LineStation> {
	public int deleteById(Long id) {
		return this.updateDelFlag(id, LineStation.DEL_FLAG_DELETE);
	}

	public List<LineStation> findByLine(Long lineId) {
		return find("from LineStation where delFlag=:p1 and line.id =:p2 and line.delFlag=:p3 order by sort", Station.DEL_FLAG_NORMAL, lineId, Line.DEL_FLAG_NORMAL);
	}

	public List<LineStation> findByLineIdStartEndStationSort(Long lineId, Float startStationSort, Float endStationSort) {
		return find("from LineStation where delFlag=:p1 and line.id =:p2 and line.delFlag=:p3 and sort between :p4 and :p5 order by sort", Station.DEL_FLAG_NORMAL, lineId, Line.DEL_FLAG_NORMAL,
				startStationSort, endStationSort);
	}
	public LineStation getByLineStation(Long lineId, Long stId) {
		return getByHql("from LineStation where delFlag=:p1 and  line.id=:p2 and station.id=:p3", LineStation.DEL_FLAG_NORMAL, lineId, stId);
	}
}
