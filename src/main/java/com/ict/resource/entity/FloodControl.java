package com.ict.resource.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.google.gson.annotations.Expose;
import com.ict.base.entity.DataEntity;
import com.ict.dic.entity.Line;
import com.ict.dic.entity.Station;

@Entity
@Table(name = "occ_floodcontrol_infor")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FloodControl extends DataEntity {

	private static final long serialVersionUID = 1L;
	@Expose
	private Long id;
	@Expose
	private Long pid;
	@Expose
	private Line line;// 线路
	@Expose
	private Station station;// 车站
	@Expose
	private String safetyDoor;// 安全门
	@Expose
	private String escalator;// 电扶梯
	@Expose
	private String passageway;// 出入口
	@Expose
	private String stationHall;// 站厅
	@Expose
	private String stationPlat;// 站厅
	@Expose
	private String interval;// 区间
	@Expose
	private String remarks;// 备注
	@Expose
	private String sendDate;// 日期

	@Id
	@TableGenerator(name = "occ_floodcontrol_infor_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "occ_floodcontrol_infor", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "occ_floodcontrol_infor_generator")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@ManyToOne
	@JoinColumn(name = "lineId")
	public Line getLine() {
		return line;
	}
	public void setLine(Line line) {
		this.line = line;
	}
	@ManyToOne
	@JoinColumn(name = "stationId")
	public Station getStation() {
		return station;
	}
	public void setStation(Station station) {
		this.station = station;
	}
	public String getSafetyDoor() {
		return safetyDoor;
	}
	public void setSafetyDoor(String safetyDoor) {
		this.safetyDoor = safetyDoor;
	}
	public String getEscalator() {
		return escalator;
	}
	public void setEscalator(String escalator) {
		this.escalator = escalator;
	}
	public String getPassageway() {
		return passageway;
	}
	public void setPassageway(String passageway) {
		this.passageway = passageway;
	}
	public String getStationHall() {
		return stationHall;
	}
	public void setStationHall(String stationHall) {
		this.stationHall = stationHall;
	}
	public String getInterval() {
		return interval;
	}
	public void setInterval(String interval) {
		this.interval = interval;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getSendDate() {
		return sendDate;
	}
	public void setSendDate(String sendDate) {
		this.sendDate = sendDate;
	}
	public Long getPid() {
		return pid;
	}
	public void setPid(Long pid) {
		this.pid = pid;
	}
	public String getStationPlat() {
		return stationPlat;
	}
	public void setStationPlat(String stationPlat) {
		this.stationPlat = stationPlat;
	}

}
