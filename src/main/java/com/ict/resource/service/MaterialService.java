package com.ict.resource.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.ict.base.entity.Page;
import com.ict.base.service.BaseService;
import com.ict.base.utils.StringUtils;
import com.ict.dic.dao.StationDao;
import com.ict.dic.entity.Station;
import com.ict.resource.dao.MaterialDao;
import com.ict.resource.dao.WorksiteDao;
import com.ict.resource.entity.Material;
import com.ict.resource.entity.Worksite;
import com.ict.resource.entity.WorksiteInfo;

@Service
@Transactional(readOnly = true)
public class MaterialService extends BaseService {

	@Autowired
	private MaterialDao materialDao;

	@Autowired
	private StationDao stationDao;

	@Autowired
	private WorksiteDao worksiteDao;

	public Material get(Long id) {
		return (Material) materialDao.get(id);
	}

	public List<Material> listByStationCode(String stationCode) {
		List<Station> stations = stationDao.getByCode(stationCode.split(","));
		List<Material> materials = new ArrayList<>();
		if (stations != null && stations.size() > 0) {
			for (Station station : stations) {
				materials.addAll(materialDao.findbySiteId(station.getId()));
			}
			return materials;
		}
		return new ArrayList<>();
	}

	public List<Material> findbyStationRes(Long stationId, Long resId) {
		return materialDao.findbyStationRes(stationId, resId);

	}

	public List<Material> findbyRestypeId(String ids) {
		return materialDao.findbyRestypeId(ids);
	}

	public List<Material> findbySiteAndtype(Long siteId, Long typeId) {
		return materialDao.findbySiteAndtype(siteId, typeId);
	}

	public List<Material> findAll() {
		return materialDao.findAllList();
	}

	public List<Worksite> findWorksite(String wherestr) {
		List<Worksite> list = worksiteDao.findByWhere(wherestr);
		return list;
	}

	public List<Worksite> findByPar(float x, float y, float radius) {
		List<Worksite> list = worksiteDao.findByPar(x, y, radius);
		return list;
	}

	public List<WorksiteInfo> findWorksiteInfo(String wherestr) {
		List<WorksiteInfo> list = worksiteDao.findInfoByWhere(wherestr);
		return list;
	}

	public List<Material> findByPrj(Long no) {
		return materialDao.findByPrj(no);
	}

	public List<Object[]> findByLine(Long lineId) {
		return materialDao.findBySql(
				"with sql1 as (select count(*) as c,  restype_id from (select m.restype_id  from dw_res_materials m where m.line_id = ?1) group by restype_id) select mt.id, mt.c, ax.name, ax.unit  from dw_res_restype ax right outer join (select sum(c) as c, id from (select sum(count) as c, parent as id from (select nvl(u.c, 0) as count, r.parent from dw_res_restype r left outer join sql1 u on r.id = u.restype_id where r.id != 1 and r.del_flag = 0 and r.parent != 1) group by parent union select sum(count) as c, id from (select nvl(u.c, 0) as count, r.id from dw_res_restype r left outer join sql1 u on r.id = u.restype_id where r.id != 1  and r.del_flag = 0 and r.parent = 1) group by id) group by id) mt on mt.id = ax.id union select r.id, nvl(u.c, 0) as c, r.name, r.unit from dw_res_restype r left outer join sql1 u on r.id = u.restype_id where r.id != 1 and r.del_flag = 0 and r.parent != 1",
				lineId);
	}

	public Integer findByLineId(Long rtId, Long lineId) {
		return materialDao.findByLineId(rtId, lineId);
	}

	public List<Material> findByLineRes(Long lineid, Long worksiteid) {
		return materialDao.findByLineRes(lineid, worksiteid);
	}

	public List<Material> findmlist(Long lineId, Long tenderId, Long worksiteId, Long restypeId) {
		DetachedCriteria dc = materialDao.createDetachedCriteria(new Criterion[0]);
		if ((lineId != null) && (lineId.longValue() != 0L)) {
			dc.add(Restrictions.eq("lineId.id", lineId));
		}
		if ((tenderId != null) && (tenderId.longValue() != 0L)) {
			dc.add(Restrictions.eq("tenderId.id", tenderId));
		}
		if ((worksiteId != null) && (worksiteId.longValue() != 0L)) {
			dc.add(Restrictions.eq("worksiteId.id", worksiteId));
		}
		if ((restypeId != null) && (restypeId.longValue() != 0L)) {
			dc.add(Restrictions.eq("restypeId.id", restypeId));
		}
		return materialDao.find(dc);
	}

	public Page<Material> find(Page<Material> page, @RequestParam Map<String, Object> paramMap, boolean isDataScopeFilter) {
		DetachedCriteria dc = materialDao.createDetachedCriteria(new Criterion[0]);

		Object lineId = paramMap.get("lineId");
		if (lineId != null)
			if ((StringUtils.isNoneBlank(new CharSequence[]{lineId.toString()})) && (!lineId.toString().equals("0"))) {
				dc.add(Restrictions.eq("line.id", Long.valueOf(lineId.toString())));
			}

		Object stationId = paramMap.get("stationId");
		if (stationId != null)
			if ((StringUtils.isNoneBlank(new CharSequence[]{stationId.toString()})) && (!stationId.toString().equals("0"))) {
				dc.add(Restrictions.eq("station.id", Long.valueOf(stationId.toString())));
			}

		Object restypeId = paramMap.get("restypeId.id");
		Object restypename = paramMap.get("restypeId.name");
		if (restypeId != null)
			if ((StringUtils.isNoneBlank(new CharSequence[]{restypeId.toString()})) && (!restypeId.toString().equals("0"))) {
				dc.add(Restrictions.eq("restypeId.id", Long.valueOf(restypeId.toString())));
				paramMap.put("rtId", restypeId);
				paramMap.put("rtname", restypename);
			}

		dc.add(Restrictions.eq("delFlag", "0"));
		dc.addOrder(Order.asc("sort"));
		return materialDao.find(page, dc);
	}

	public Material getMaterial(Long id) {
		return (Material) materialDao.get(id);
	}

	@Transactional(readOnly = false)
	public void save(Material material) {
		materialDao.clear();
		materialDao.save(material);
	}

	@Transactional(readOnly = false)
	public void delete(Long id) {
		materialDao.deleteById(id);
	}

	@Transactional(readOnly = false)
	public void deleteMultiMaterial(String ids) {
		StringTokenizer delTokens = new StringTokenizer(ids, ",");
		while (delTokens.hasMoreTokens()) {
			Long id = Long.valueOf(delTokens.nextToken());
			materialDao.deleteById(id);
		}
	}

}