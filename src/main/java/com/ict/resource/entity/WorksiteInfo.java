package com.ict.resource.entity;

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
@Table(name = "view_wt_worksiteinfo")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class WorksiteInfo {

	private Long id;

	private String linesection;

	private String measure;

	private String station;
	private String line;

	private Double codeNew;
	private String name;
	private Double x;
	private Double y;

	@Id
	@TableGenerator(name = "view_wt_worksiteinfo_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "view_WT_WORKSITEINFO", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "view_wt_worksiteinfo_generator")
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLinesection() {
		return linesection;
	}

	public void setLinesection(String linesection) {
		this.linesection = linesection;
	}

	public String getMeasure() {
		return measure;
	}

	public void setMeasure(String measure) {
		this.measure = measure;
	}

	public String getStation() {
		return station;
	}

	public void setStation(String station) {
		this.station = station;
	}

	public String getLine() {
		return line;
	}

	public void setLine(String line) {
		this.line = line;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getX() {
		return x;
	}

	public void setX(Double x) {
		this.x = x;
	}

	public Double getY() {
		return y;
	}

	public void setY(Double y) {
		this.y = y;
	}

	public Double getCodeNew() {
		return codeNew;
	}

	public void setCodeNew(Double codeNew) {
		this.codeNew = codeNew;
	}

}