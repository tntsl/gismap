package com.ict.dic.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.google.gson.annotations.Expose;
import com.ict.base.entity.DataEntity;
import com.ict.sys.entity.Office;

/**
 * 车站表修改
 * 
 * @description:
 * @author: nanxiaoqiang
 * @version: V1.00
 * @since 2014年6月6日
 * @create Date: 2015年5月14日下午5:45:11
 */
@Entity
@Table(name = "sys_dic_line")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Line extends DataEntity {

	private static final long serialVersionUID = 1L;
	@Expose
	private Long id;
	@Expose
	private String name;// 线路名称
	@Expose
	private String scribe;// 线路描述
	@Expose
	private Double linelength;// 线路长度

	private Office office;// 对应机构

	@Id
	@TableGenerator(name = "sys_dic_line_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "sys_dic_line", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sys_dic_line_generator")
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

	public String getScribe() {
		return scribe;
	}

	public void setScribe(String scribe) {
		this.scribe = scribe;
	}

	public Double getLinelength() {
		return linelength;
	}

	public void setLinelength(Double linelength) {
		this.linelength = linelength;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "office_id")
	@NotFound(action = NotFoundAction.IGNORE)
	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}
}
