package com.ict.resource.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ict.base.service.BaseService;
import com.ict.resource.dao.PreventionDao;
import com.ict.resource.entity.FloodControl;
import com.ict.resource.entity.FloodControls;
import com.ict.resource.entity.Prevention;

@Service
@Transactional(readOnly = true)
public class PreventionService extends BaseService {

    @Autowired
    private PreventionDao preventionDao;
    @Autowired
    private FloodControlsService floodControlsService;
    @Autowired
    private FloodControlService floodControlService;

    /**
     * 查询所有防汛Prevention
     *
     * @return
     */
    public List<FloodControl> findPreventionAll() {
        List<FloodControls> nearestOnes = floodControlsService.getLastFloodControls();
        List<FloodControl> floodControls = new ArrayList<>();
        for (FloodControls floodControl : nearestOnes) {
            floodControls.addAll(floodControlService.getAllPreventions(floodControl.getId()));
        }
        return floodControls;
    }

    /**
     * 添加和更新Prevention
     *
     * @param Prevention
     */
    @Transactional(readOnly = false)
    public void save(Prevention Prevention) {
        this.preventionDao.clear();
        this.preventionDao.save(Prevention);
    }

    /**
     * 通过id删除Prevention
     *
     * @param id
     */
    @Transactional(readOnly = false)
    public void delete(long id) {
        this.preventionDao.deleteById(id);
    }
}
