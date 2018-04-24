package com.ict.resource.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ict.base.dao.BaseDao;
import com.ict.resource.entity.SocialResource;

@Repository
public class SocialResourceDao extends BaseDao<SocialResource> {
	public List<SocialResource> findAll() {
		return find("from SocialResource where delFlag= ?1 order by sort", SocialResource.DEL_FLAG_NORMAL);
	}

	public List<SocialResource> findAllXFD() {
		return find("from SocialResource where stype=3 and delFlag= ?1 order by sort", SocialResource.DEL_FLAG_NORMAL);
	}
}
