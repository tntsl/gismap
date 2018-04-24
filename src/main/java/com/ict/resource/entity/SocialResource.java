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

import com.ict.base.entity.DataEntity;

/**
 * @ClassName: <br/>
 * @Description:社会资源<br/>
 * @date: <br/>
 * @author: 大刘
 */
@Entity
@Table(name = "ep_res_social")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SocialResource extends DataEntity {

	private static final long serialVersionUID = 1L;
	private Long id;
	private String name;// 名称
	private String addr;// 地址
	private String person; // 负责人
	private String phone;// 电话
	private Integer stype;// 1-公安；2-医院；3-消防
	private String x;
	private String y;

	private String region;// 区域
	private String hsplevel;// 医院级别
	private String subject;// 科室
	private String stationname;// 临近车站

	private String specialequip;// 专业器材
	@Id
	@TableGenerator(name = "ep_res_social_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_social", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_social_generator")

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getPerson() {
		return person;
	}
	public void setPerson(String person) {
		this.person = person;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
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
	public String getRegion() {
		return region;
	}
	public void setRegion(String region) {
		this.region = region;
	}
	public String getHsplevel() {
		return hsplevel;
	}
	public void setHsplevel(String hsplevel) {
		this.hsplevel = hsplevel;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getStationname() {
		return stationname;
	}
	public void setStationname(String stationname) {
		this.stationname = stationname;
	}
	public String getSpecialequip() {
		return specialequip;
	}
	public void setSpecialequip(String specialequip) {
		this.specialequip = specialequip;
	}

}
