package com.ict.base.entity;

import javax.persistence.MappedSuperclass;

/**
 * 放一些基础的属性，以后最好不要在类里边直接写1或者0，要写定义的属性
 * 
 * @author nanxiaoqiang
 * 
 * @version 2014年1月29日
 * 
 */
@MappedSuperclass
public abstract class BaseEntity {
	// 显示/隐藏
	public static final String SHOW = "1";
	public static final String HIDE = "0";

	// 是/否
	public static final String YES = "1";
	public static final String NO = "0";

	// 删除标记（0：正常；1：删除；2：审核；）
	public static final String FIELD_DEL_FLAG = "delFlag";
	public static final String DEL_FLAG_NORMAL = "0";
	public static final String DEL_FLAG_DELETE = "1";
	public static final String DEL_FLAG_AUDIT = "2";

	// 排序(默认排序为0.0)
	public static final String SORT_FLAG = "sort";
	public static final Float SORT_FLAG_DEFAULT = 0.0F;

}
