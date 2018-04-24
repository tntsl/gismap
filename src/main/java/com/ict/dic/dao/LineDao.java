package com.ict.dic.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.dic.entity.Line;

@Repository
public class LineDao extends BaseDao<Line> {
	public int deleteById(Long id) {
		return this.updateDelFlag(id, Line.DEL_FLAG_DELETE);
	}

	public List<Line> findAllList() {
		return find("from Line where delFlag=:p1 order by sort", Line.DEL_FLAG_NORMAL);
	}

	public List<Line> findName(String name) {
		return find("from Line where delFlag=:p1 and name=:p2 order by sort", Line.DEL_FLAG_NORMAL, name);
	}
	public Line findByCode(String code) {
		return getByHql("from Line where delFlag=:p1 and code=:p2", Line.DEL_FLAG_NORMAL, code);
	}
}
