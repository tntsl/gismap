package com.ict.resource.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.resource.entity.RescueTeam;

@Repository
public class RescueTeamDao extends BaseDao<RescueTeam> {

	public List<RescueTeam> findRescueTeamList() {
		String hql = "from RescueTeam where delFlag='0' ";

		return find(hql);
	}

	public RescueTeam findByName(String name) {
		String hql = "from RescueTeam where delFlag='0' and name='" + name + "' order by sort";
		return (RescueTeam) getByHql(hql);
	}

	// public Integer findByLineId(Long lineId) {
	// String hql = "select count(*) from RescueTeam where lineId.id=" + lineId
	// + " order by sort";
	// Query query = getSession().createQuery(hql);
	// Object resultObj = query.uniqueResult();
	// if (resultObj != null) {
	// return Integer.valueOf(resultObj.toString());
	// }
	// return Integer.valueOf(0);
	// }

	// public List<RescueTeam> findFlexByLineId(Long lineid) {
	// String hql = "from RescueTeam where lineId.id=" + lineid + " and
	// delFlag='"
	// + "0" + "' order by sort";
	// return find(hql);
	// }

	public List<RescueTeam> findByEqName(String name) {
		String hql = "from RescueTeam where delFlag='0' and name='" + name + "' order by sort";
		return find(hql);
	}
}