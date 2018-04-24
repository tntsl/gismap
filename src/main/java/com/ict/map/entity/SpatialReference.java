package com.ict.map.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "ep_res_spatial")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SpatialReference {
	private Long id;
	private Long wkid;
	private Long latestWkid;

	@Id
	@TableGenerator(name = "ep_res_spatial_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_spatial", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_spatial_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getWkid() {
		return wkid;
	}

	public void setWkid(Long wkid) {
		this.wkid = wkid;
	}

	public Long getLatestWkid() {
		return latestWkid;
	}

	public void setLatestWkid(Long latestWkid) {
		this.latestWkid = latestWkid;
	}

}
