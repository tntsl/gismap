package com.ict.resource.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ict.base.service.BaseService;
import com.ict.resource.dao.FloodControlsDao;
import com.ict.resource.entity.FloodControls;

@Service
public class FloodControlsService extends BaseService {
	@Autowired
	private FloodControlsDao floodControlsDao;

	public List<FloodControls> getLastFloodControls() {
		List<FloodControls> list = floodControlsDao.createSqlQuery(
				"select ID ,CODE ,CREATE_DATE ,DEL_FLAG ,REMARK ,SORT ,UPDATE_DATE ,SEND_DATE ,CREATE_BY ,CREATE_OFFICE ,UPDATE_BY ,UPDATE_OFFICE ,LINE_ID ,BEGIN_DATE from (select i.*,ROW_NUMBER() OVER (PARTITION BY i.LINE_ID ORDER BY i.BEGIN_DATE desc) rIndex from occ_floodcontrols_infor i) where rIndex=1",
				null).getResultList();
		return list;
	}

}
