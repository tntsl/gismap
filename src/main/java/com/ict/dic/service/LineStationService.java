package com.ict.dic.service;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.entity.Page;
import com.ict.base.service.BaseService;
import com.ict.dic.dao.LineStationDao;
import com.ict.dic.entity.LineStation;
import com.ict.dic.entity.Station;

@Service
@Transactional(readOnly = true)
public class LineStationService extends BaseService {
	@Autowired
	private LineStationDao dao;

	public LineStation get(Long id) {
		return dao.get(id);
	}

	public Page<LineStation> find(Page<LineStation> page, LineStation entity, boolean isDataScopeFilter) {
		DetachedCriteria dc = dao.createDetachedCriteria();
		if (entity.getLine() != null && entity.getLine().getId() != null) {
			dc.add(Restrictions.eq("line.id", entity.getLine().getId()));
		}
		// 删除标记
		dc.add(Restrictions.eq(LineStation.FIELD_DEL_FLAG, entity.getDelFlag()));
		// 车站删除标记
		dc.createAlias("station", "s").add(Restrictions.eq("s." + Station.FIELD_DEL_FLAG, entity.getDelFlag()));
		dc.addOrder(Order.asc("sort"));
		return dao.find(page, dc);
	}

	public List<Station> getAllStationsByLineId(Long lineId) {
		List<LineStation> lineStations = getAllByLineId(lineId);
		List<Station> stations = new ArrayList<>();
		for (LineStation lineStation : lineStations) {
			Station station = lineStation.getStation();
			if (station != null) {
				stations.add(station);
			}
		}
		return stations;
	}

	@Transactional(readOnly = false)
	public void save(LineStation entity) {
		dao.clear();
		dao.save(entity);
	}

	public LineStation getEntity(Long id) {
		return dao.get(id);
	}

	@Transactional(readOnly = false)
	public void delete(Long id) {
		dao.deleteById(id);
	}

	/**
	 * 做过更改，返回线路
	 * 
	 * @param ids
	 * @return
	 */
	@Transactional(readOnly = false)
	public Long deleteMulti(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		Long id = null;
		while (delTokens.hasMoreTokens()) {
			id = Long.valueOf(delTokens.nextToken());
			dao.deleteById(id);
		}
		if (id != null) {
			return get(id).getLine().getId();
		}
		return null;
	}

	/**
	 * 根据线路查找所有的排列
	 * 
	 * @param lineId
	 * @return
	 */
	public List<LineStation> getAllByLineId(Long lineId) {
		return dao.findByLine(lineId);
	}

	/**
	 * 查找线路区段的所有排列
	 * 
	 * @param startStationId
	 * @param endStationId
	 * @return
	 */
	public List<LineStation> getAllByStartEndStation(Long lineId, Float startStationSort, Float endStationSort) {
		return dao.findByLineIdStartEndStationSort(lineId, startStationSort, endStationSort);
	}

	public String getStationIdsByLineId(Long lineId) {
		StringBuffer str = new StringBuffer();
		List<LineStation> lineStationList = dao.findByLine(lineId);
		if (lineStationList != null && lineStationList.size() != 0) {
			for (LineStation lineStation : lineStationList) {
				str.append(lineStation.getStation().getId()).append(",");
			}
		}
		return str.toString();
	}

	public LineStation getByLineStation(Long lineId, Long stationId) {
		return dao.getByLineStation(lineId, stationId);
	}
}
