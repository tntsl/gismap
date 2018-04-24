package com.ict.resource.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
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
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.google.gson.annotations.Expose;
import com.ict.base.entity.DataEntity;
import com.ict.dic.entity.Line;
import com.ict.dic.entity.ResType;
import com.ict.dic.entity.Station;

@Entity
@Table(name = "ep_res_materials")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Material extends DataEntity {
	private static final long serialVersionUID = 1L;
	@Expose
	private Long id;
	@Expose
	private String name;// 名称
	@Expose
	private String unit;// 单位
	@Expose
	private Integer amount;// 数量
	@Expose
	private Integer standerdNum;// 标配数量
	@Expose
	private String model;// 规格
	@Expose
	private String addressDetail;
	@Expose
	private String personName;
	@Expose
	private String personMobile;
	@Expose
	private String personPhone;
	@Expose
	private String personFax;
	@Expose
	private String personEmail;
	@Expose
	private ResType restypeId;// 物资类型
	@Expose
	private String leaderName;
	@Expose
	private String leaderMobile;
	@Expose
	private String addName;
	@Expose
	private String department;
	@Expose
	private Line line;// 所属线路
	@Expose
	private Station station;
	@Expose
	private Areamanagement worksite;// 工区

	@Id
	@TableGenerator(name = "ep_res_materials_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_materials", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_materials_generator")
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUnit() {
		return this.unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Integer getAmount() {
		return this.amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	public Integer getStanderdNum() {
		return standerdNum;
	}

	public void setStanderdNum(Integer standerdNum) {
		this.standerdNum = standerdNum;
	}

	public String getModel() {
		return this.model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getAddressDetail() {
		return this.addressDetail;
	}

	public void setAddressDetail(String addressDetail) {
		this.addressDetail = addressDetail;
	}

	public String getPersonName() {
		return this.personName;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
	}

	public String getPersonMobile() {
		return this.personMobile;
	}

	public void setPersonMobile(String personMobile) {
		this.personMobile = personMobile;
	}

	public String getPersonPhone() {
		return this.personPhone;
	}

	public void setPersonPhone(String personPhone) {
		this.personPhone = personPhone;
	}

	public String getPersonFax() {
		return this.personFax;
	}

	public void setPersonFax(String personFax) {
		this.personFax = personFax;
	}

	public String getPersonEmail() {
		return this.personEmail;
	}

	public void setPersonEmail(String personEmail) {
		this.personEmail = personEmail;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "restypeId")
	@NotFound(action = NotFoundAction.IGNORE)
	public ResType getRestypeId() {
		return this.restypeId;
	}

	public void setRestypeId(ResType restypeId) {
		this.restypeId = restypeId;
	}

	public String getLeaderName() {
		return this.leaderName;
	}

	public void setLeaderName(String leaderName) {
		this.leaderName = leaderName;
	}

	public String getLeaderMobile() {
		return this.leaderMobile;
	}

	public void setLeaderMobile(String leaderMobile) {
		this.leaderMobile = leaderMobile;
	}

	public String getAddName() {
		return this.addName;
	}

	public void setAddName(String addName) {
		this.addName = addName;
	}

	public String getDepartment() {
		return this.department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "line")
	@NotFound(action = NotFoundAction.IGNORE)
	public Line getLine() {
		return this.line;
	}

	public void setLine(Line line) {
		this.line = line;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "worksite")
	@NotFound(action = NotFoundAction.IGNORE)
	public Areamanagement getWorksite() {
		return worksite;
	}

	public void setWorksite(Areamanagement worksite) {
		this.worksite = worksite;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "station")
	@NotFound(action = NotFoundAction.IGNORE)
	public Station getStation() {
		return this.station;
	}

	public void setStation(Station station) {
		this.station = station;
	}
}