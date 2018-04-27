package com.ict.map.entity;

import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;

@Entity
@SqlResultSetMapping(name = "pointcz", entities = {@EntityResult(entityClass = PointCz.class, fields = {@FieldResult(name = "pointid", column = "pointid"),
		@FieldResult(name = "pointName", column = "pointname"), @FieldResult(name = "pointCode", column = "pointcode"), @FieldResult(name = "lineId", column = "lineid"),
		@FieldResult(name = "lineCode", column = "linecode"), @FieldResult(name = "x", column = "x"), @FieldResult(name = "y", column = "y")})})
public class PointCz {
	private Long pointid;
	private String pointName;
	private String pointCode;
	private Long lineId;
	private String lineCode;
	private Double x;
	private Double y;

	@Id
	public Long getPointid() {
		return pointid;
	}

	public void setPointid(Long pointid) {
		this.pointid = pointid;
	}

	public String getPointName() {
		return pointName;
	}

	public void setPointName(String pointName) {
		this.pointName = pointName;
	}

	public String getPointCode() {
		return pointCode;
	}

	public void setPointCode(String pointCode) {
		this.pointCode = pointCode;
	}

	public Long getLineId() {
		return lineId;
	}

	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}

	public String getLineCode() {
		return lineCode;
	}

	public void setLineCode(String lineCode) {
		this.lineCode = lineCode;
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
}
