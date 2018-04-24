package com.ict.map.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.map.dao.PointCzDao;
import com.ict.map.entity.PointCz;

@Service
@Transactional(readOnly = true)
public class PointCzService {

	@Autowired
	private PointCzDao pointCzDao;

	public List<PointCz> findPointCz(String code) {
		return pointCzDao.findPointCz(code);
	}

	public List<Object> findPointCzByName(String name) {
		return pointCzDao.findPointCzByName(name);
	}

	public List<PointCz> findPointCzs() {
		return pointCzDao.findPointCzs();
	}

}
