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
		List<FloodControls> list = floodControlsDao
				.createEntitySqlQuery(
						"select id ,code ,create_date ,del_flag ,remark ,sort ,update_date ,send_date ,create_by ,create_office ,update_by ,update_office ,line_id ,begin_date from (select i.*,row_number() over (partition by i.line_id order by i.begin_date desc) rindex from occ_floodcontrols_infor i) where rindex=1")
				.getResultList();
		return list;
	}

}
