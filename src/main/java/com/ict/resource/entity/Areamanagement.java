package com.ict.resource.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.google.gson.annotations.Expose;
import com.ict.base.entity.DataEntity;
import com.ict.dic.entity.Line;
import com.ict.dic.entity.Station;

@Entity
@Table(name = "ep_res_worksite")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)

public class Areamanagement extends DataEntity {
	private static final long serialVersionUID = 1L;
	@Expose
	private Long id;
	@Expose
	@NotBlank
	private String name;// 车站名称
	@Expose
	private Line line;// 线路
	@Expose
	private String linename;
	@Expose
	private Station station;
	@Expose
	private String mobile;// 电话
	@Expose
	private String person;// 联系人
	@Expose
	private Integer stype;// 1:工区；2：变电所；3；段场
	private String ctype;
	@Expose
	@NotNull
	private String x;
	@Expose
	@NotNull
	private String y;
	@Expose
	private String stationtype;// 车站型式
	@Expose
	private String infratype;// 变电所或工区类型/专业
	@Expose
	private String addr;// 变电所或工区位置
	@Expose
	private String infraarea;// 变电所或工区辖区

	@Id
	@TableGenerator(name = "ep_res_worksite_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_worksite", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_worksite_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne()
	@JoinColumn(name = "line")
	@NotFound(action = NotFoundAction.IGNORE)
	public Line getLine() {
		return this.line;
	}

	public void setLine(Line line) {
		this.line = line;
	}

	public String getLinename() {
		return linename;
	}

	public void setLinename(String linename) {
		this.linename = linename;
	}

	@ManyToOne()
	@JoinColumn(name = "station_id")
	@NotFound(action = NotFoundAction.IGNORE)
	public Station getStation() {
		return station;
	}

	public void setStation(Station station) {
		this.station = station;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getStype() {
		return stype;
	}

	public void setStype(Integer stype) {
		this.stype = stype;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getStationtype() {
		return stationtype;
	}

	public void setStationtype(String stationtype) {
		this.stationtype = stationtype;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPerson() {
		return person;
	}

	public void setPerson(String person) {
		this.person = person;
	}

	public String getInfratype() {
		return infratype;
	}

	public void setInfratype(String infratype) {
		this.infratype = infratype;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getInfraarea() {
		return infraarea;
	}

	public void setInfraarea(String infraarea) {
		this.infraarea = infraarea;
	}

	@Transient
	public String getCtype() {
		return ctype;
	}

	public void setCtype(String ctype) {
		this.ctype = ctype;
	}

}
