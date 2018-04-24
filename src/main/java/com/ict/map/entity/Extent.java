package com.ict.map.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "ep_res_extent")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Extent {
	private Long id;
	private Double xmin;
	private Double ymin;
	private Double xmax;
	private Double ymax;
	private SpatialReference spatialReference;

	@Id
	@TableGenerator(name = "ep_res_extent_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_extent", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_extent_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getXmin() {
		return xmin;
	}

	public void setXmin(Double xmin) {
		this.xmin = xmin;
	}

	public Double getYmin() {
		return ymin;
	}

	public void setYmin(Double ymin) {
		this.ymin = ymin;
	}

	public Double getXmax() {
		return xmax;
	}

	public void setXmax(Double xmax) {
		this.xmax = xmax;
	}

	public Double getYmax() {
		return ymax;
	}

	public void setYmax(Double ymax) {
		this.ymax = ymax;
	}

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "spatial_id")
	public SpatialReference getSpatialReference() {
		return spatialReference;
	}

	public void setSpatialReference(SpatialReference spatialReference) {
		this.spatialReference = spatialReference;
	}

}
