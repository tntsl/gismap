package com.ict.sys.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.ict.base.entity.DataEntity;

/**
 * 菜单
 *
 * @author nanxiaoqiang
 * @version 2014年1月30日
 */
@Entity
@Table(name = "sys_menu")
public class Menu extends DataEntity {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private Long id; // 编号
	private Menu parent; // 父级菜单
	private String parentIds; // 所有父级编号
	private String name; // 名称
	private String href; // 链接
	private String target; // 目标（ mainFrame、_blank、_self、_parent、_top）
	private String icon; // 图标
	private String isShow; // 是否在菜单中显示（1：显示；0：不显示）
	private String permission; // 权限标识

	private String site;// 所在的site

	private List<Menu> childList = new ArrayList<>();// 拥有子菜单列表
	private List<Role> roleList = new ArrayList<>(); // 拥有角色列表

	// 测试用
	// private List<Attachment> attachmentList = Lists.newArrayList(); // 拥有角色列表

	public Menu() {
		super();
		this.sort = SORT_FLAG_DEFAULT;
	}

	public Menu(Long id) {
		this();
		this.id = id;
	}

	/**
	 * 按照原有的表结构，用一个通用的表来管理ID，暂时只是用于Oracle
	 *
	 * @return
	 */
	@Id
	@TableGenerator(name = "sys_menu_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "sys_menu", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sys_menu_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "parent_id")
	@NotFound(action = NotFoundAction.IGNORE)
	@NotNull
	public Menu getParent() {
		return parent;
	}

	public void setParent(Menu parent) {
		this.parent = parent;
	}

	@Length(min = 1, max = 255)
	public String getParentIds() {
		return parentIds;
	}

	public void setParentIds(String parentIds) {
		this.parentIds = parentIds;
	}

	@Length(min = 1, max = 100)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Length(min = 0, max = 1000)
	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	@Length(min = 0, max = 20)
	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	@Length(min = 0, max = 255)
	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	@Length(min = 1, max = 1)
	public String getIsShow() {
		return isShow;
	}

	public void setIsShow(String isShow) {
		this.isShow = isShow;
	}

	@Length(min = 0, max = 255)
	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	@OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY, mappedBy = "parent")
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy(value = "sort")
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Menu> getChildList() {
		return childList;
	}

	public void setChildList(List<Menu> childList) {
		this.childList = childList;
	}

	@ManyToMany(mappedBy = "menuList", fetch = FetchType.LAZY)
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy("id")
	@Fetch(FetchMode.SUBSELECT)
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	@Length(min = 0, max = 4000)
	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	@Transient
	public static void sortList(List<Menu> list, List<Menu> sourcelist, Long parentId) {
		for (int i = 0; i < sourcelist.size(); i++) {
			Menu e = sourcelist.get(i);
			if (e.getParent() != null && e.getParent().getId() != null && e.getParent().getId().equals(parentId)) {
				list.add(e);
				// 判断是否还有子节点, 有则继续获取子节点
				for (int j = 0; j < sourcelist.size(); j++) {
					Menu child = sourcelist.get(j);
					if (child.getParent() != null && child.getParent().getId() != null && child.getParent().getId().equals(e.getId())) {
						sortList(list, sourcelist, e.getId());
						break;
					}
				}
			}
		}
	}

	@Transient
	public boolean isRoot() {
		return isRoot(this.id);
	}

	@Transient
	public static boolean isRoot(Long id) {
		return id != null && id.equals(1L);
	}

	// // 开始测试
	// // 避免定义CascadeType.REMOVE, 否则删除案例库时会连带删除拥有它的附件.
	// @OneToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })//, fetch
	// = FetchType.LAZY)
	// // 多对多定义.
	// @JoinTable(name = "sys_menu_attachment", joinColumns = { @JoinColumn(name
	// = "menu_id") }, inverseJoinColumns = { @JoinColumn(name =
	// "attachment_id") })
	// @Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	// // @OrderBy(value = "create_date")
	// @NotFound(action = NotFoundAction.IGNORE)
	// @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	// public List<Attachment> getAttachmentList() {
	// return attachmentList;
	// }
	//
	// public void setAttachmentList(List<Attachment> attachmentList) {
	// this.attachmentList = attachmentList;
	// }

}
