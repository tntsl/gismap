package com.ict.dic.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.google.gson.annotations.Expose;
import com.ict.base.entity.DataEntity;

/**
 * 原来的是车站、现在要求放入其他的如车辆段停车场等等
 * 
 * @description:
 * @author: nanxiaoqiang
 * @version: V1.00
 * @since 2014年6月6日
 * @create Date: 2015年5月14日下午5:46:38
 */
@Entity
@Table(name = "sys_dic_station")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Station extends DataEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Expose
	private Long id;
	@Expose
	private String name;
	@Expose
	private String isHuancheng;// 是否换乘（1：是；0：否）
	@Expose
	private String stationType;// 车站类型（0：普通车站；1：首末站；）

	@Id
	@TableGenerator(name = "sys_dic_station_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "sys_dic_station", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sys_dic_station_generator")
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

	public String getIsHuancheng() {
		return isHuancheng;
	}

	public void setIsHuancheng(String isHuancheng) {
		this.isHuancheng = isHuancheng;
	}

	public String getStationType() {
		return stationType;
	}

	public void setStationType(String stationType) {
		this.stationType = stationType;
	}

	@Override
	public int hashCode() {
		// 第二个参数可以不填，是不使用的属性名称
		return HashCodeBuilder.reflectionHashCode(this, "remark");
	}

	@Override
	public boolean equals(Object obj) {
		return EqualsBuilder.reflectionEquals(this, obj);
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
}
