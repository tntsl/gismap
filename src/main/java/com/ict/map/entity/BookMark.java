package com.ict.map.entity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "ep_res_bookmark")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BookMark {

	private Long id;
	// 书签名
	private String name;
	private Extent extent;

	@Id
	@TableGenerator(name = "ep_res_bookmark_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_bookmark", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_bookmark_generator")
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

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "extent_id")
	public Extent getExtent() {
		return extent;
	}

	public void setExtent(Extent extent) {
		this.extent = extent;
	}
}
