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
@Table(name = "view_wt_worksite")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_ONLY)
public class Worksite {

	private Long id;

	private String department;

	private String personName;
	private String personPhone;

	private int amount;
	private String restypeName;

	private String linesection;

	private String measure;

	private String station;
	private String line;

	private Double codeNew;
	private String name;
	private Double x;
	private Double y;

	private int scount;

	@Id
	@TableGenerator(name = "view_wt_worksite_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "view_WT_WORKSITE", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "view_wt_worksite_generator")
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPersonName() {
		return personName;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
	}

	public String getPersonPhone() {
		return personPhone;
	}

	public void setPersonPhone(String personPhone) {
		this.personPhone = personPhone;
	}

	public String getRestypeName() {
		return restypeName;
	}

	public void setRestypeName(String restypeName) {
		this.restypeName = restypeName;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public Double getCodeNew() {
		return codeNew;
	}

	public void setCodeNew(Double codeNew) {
		this.codeNew = codeNew;
	}
	public int getScount() {
		return scount;
	}

	public void setScount(int scount) {
		this.scount = scount;
	}
}