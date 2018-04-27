package com.ict.resource.entity;

import javax.persistence.CascadeType;
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

@Entity
@Table(name = "ep_res_team")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RescueTeam extends DataEntity {
	private static final long serialVersionUID = 1L;
	@Expose
	private Long id;
	@Expose
	private String name;// 名称
	// private String personName;//副队长
	// private String personMobile;//
	// private String personPhone;//
	// private String personFax;//
	// private String personEmail;//
	@Expose
	private Line line;
	// private Station station;
	@Expose
	private String leaderName;// 队长
	@Expose
	private String mobile;// 手机
	@Expose
	private String department;// 隶属
	@Expose
	private String x;
	@Expose
	private String y;
	@Expose
	private String specialty;// 专业
	@Expose
	private String addr;// 驻地
	// private String subordinate;//
	@Expose
	private Integer num;// 数量；
	@Expose
	private String tel;// 电话

	@Id
	@TableGenerator(name = "ep_res_team_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_team", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_team_generator")
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

	public String getSpecialty() {
		return specialty;
	}

	public void setSpecialty(String specialty) {
		this.specialty = specialty;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	// public String getPersonName() {
	// return this.personName;
	// }
	// public void setPersonName(String personName) {
	// this.personName = personName;
	// }
	// public String getPersonMobile() {
	// return this.personMobile;
	// }
	// public void setPersonMobile(String personMobile) {
	// this.personMobile = personMobile;
	// }
	// public String getPersonPhone() {
	// return this.personPhone;
	// }
	// public void setPersonPhone(String personPhone) {
	// this.personPhone = personPhone;
	// }
	// public String getPersonFax() {
	// return this.personFax;
	// }
	// public void setPersonFax(String personFax) {
	// this.personFax = personFax;
	// }
	// public String getPersonEmail() {
	// return this.personEmail;
	// }
	// public void setPersonEmail(String personEmail) {
	// this.personEmail = personEmail;
	// }
	@ManyToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "line_id")
	public Line getLine() {
		return this.line;
	}

	public void setLine(Line line) {
		this.line = line;
	}

	// @ManyToOne
	// @JoinColumn(name="stationId")
	// public Station getStation() {
	// return this.station;
	// }
	// public void setStation(Station station) {
	// this.station = station;
	// }
	public String getLeaderName() {
		return this.leaderName;
	}

	public void setLeaderName(String leaderName) {
		this.leaderName = leaderName;
	}

	public String getDepartment() {
		return this.department;
	}

	public void setDepartment(String department) {
		this.department = department;
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

}