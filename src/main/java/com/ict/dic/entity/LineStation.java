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

import com.ict.base.entity.DataEntity;

/**
 * 车站线路关联表（不自动关联，手动关联）
 * 
 * @author nanxiaoqiang
 * 
 * @version 2014年6月6日
 * 
 */
@Entity
@Table(name = "sys_dic_line_station")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LineStation extends DataEntity {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	private Long id;

	/**
	 * 线路
	 */
	private Line line;

	/**
	 * 车站
	 */
	private Station station;

	@Id
	@TableGenerator(name = "sys_dic_line_station_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "sys_dic_line_station", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sys_dic_line_station_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "line_id")
	@NotFound(action = NotFoundAction.IGNORE)
	public Line getLine() {
		return line;
	}

	public void setLine(Line line) {
		this.line = line;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "station_id")
	@NotFound(action = NotFoundAction.IGNORE)
	public Station getStation() {
		return station;
	}

	public void setStation(Station station) {
		this.station = station;
	}

	@Override
	public int hashCode() {
		return HashCodeBuilder.reflectionHashCode(this);
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
