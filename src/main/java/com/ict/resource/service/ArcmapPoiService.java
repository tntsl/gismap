package com.ict.resource.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.dic.entity.ResType;
import com.ict.resource.dao.ArcMapPOIDao;

@Service
@Transactional(readOnly = true)
public class ArcmapPoiService {

	@Autowired
	private ArcMapPOIDao aPoiDao;

	public List<Object[]> findArcmapPoi(List<String> code) {
		return aPoiDao.findArcmapPoi(code);
	}

	public List<Object[]> findAllRestypeName() {
		return aPoiDao.findAllRestypeName();
	}

	public List<ResType> findRestypeidByName(String resName) {
		return aPoiDao.findRestypeidByName(resName);
	}

}
