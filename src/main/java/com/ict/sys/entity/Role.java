package com.ict.sys.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Transient;

import org.apache.commons.lang3.StringUtils;
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
 * 角色
 *
 * @author nanxiaoqiang
 * @version 2014年1月30日
 */
@Entity
@Table(name = "sys_role")
public class Role extends DataEntity {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private Long id; // 编号
	private String name; // 角色名称
	private String enname; // 角色英文名称
	private String roleType;// 权限类型
	private String dataScope; // 数据范围

	private List<User> userList = new ArrayList<>(); // 拥有用户列表
	private List<Menu> menuList = new ArrayList<>(); // 拥有菜单列表
	private List<Office> officeList = new ArrayList<>(); // 按明细设置数据范围

	// 数据范围（1：所有数据；2：所在公司及以下数据；3：所在公司数据；4：所在部门及以下数据；5：所在部门数据；8：仅本人数据；9：按明细设置）
	public static final String DATA_SCOPE_ALL = "1";
	public static final String DATA_SCOPE_COMPANY_AND_CHILD = "2";
	public static final String DATA_SCOPE_COMPANY = "3";
	public static final String DATA_SCOPE_OFFICE_AND_CHILD = "4";
	public static final String DATA_SCOPE_OFFICE = "5";
	public static final String DATA_SCOPE_SELF = "8";
	public static final String DATA_SCOPE_CUSTOM = "9";

	public Role() {
		super();
		this.dataScope = DATA_SCOPE_CUSTOM;
	}

	public Role(Long id, String name) {
		this();
		this.id = id;
		this.name = name;
	}

	/**
	 * 按照原有的表结构，用一个通用的表来管理ID，暂时只是用于Oracle
	 *
	 * @return
	 */
	@Id
	@TableGenerator(name = "sys_role_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "sys_role", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sys_role_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Length(min = 1, max = 255)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Length(min = 1, max = 255)
	public String getEnname() {
		return enname;
	}

	public void setEnname(String enname) {
		this.enname = enname;
	}

	@Length(min = 1, max = 100)
	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public String getDataScope() {
		return dataScope;
	}

	public void setDataScope(String dataScope) {
		this.dataScope = dataScope;
	}

	@ManyToMany(mappedBy = "roleList", fetch = FetchType.LAZY)
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy("id")
	@Fetch(FetchMode.SUBSELECT)
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<User> getUserList() {
		return userList;
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "sys_role_menu", joinColumns = {@JoinColumn(name = "role_id")}, inverseJoinColumns = {@JoinColumn(name = "menu_id")})
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy("id")
	@Fetch(FetchMode.SUBSELECT)
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Menu> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "sys_role_office", joinColumns = {@JoinColumn(name = "role_id")}, inverseJoinColumns = {@JoinColumn(name = "office_id")})
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy("id")
	@Fetch(FetchMode.SUBSELECT)
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	public List<Office> getOfficeList() {
		return officeList;
	}

	public void setOfficeList(List<Office> officeList) {
		this.officeList = officeList;
	}

	@Transient
	public List<Long> getOfficeIdList() {
		List<Long> officeIdList = new ArrayList<>();
		for (Office office : officeList) {
			officeIdList.add(office.getId());
		}
		return officeIdList;
	}

	@Transient
	public void setOfficeIdList(List<Long> officeIdList) {
		officeList = new ArrayList<>();
		for (Long officeId : officeIdList) {
			Office office = new Office();
			office.setId(officeId);
			officeList.add(office);
		}
	}

	@Transient
	public String getOfficeIds() {
		List<Long> nameIdList = new ArrayList<>();
		for (Office office : officeList) {
			nameIdList.add(office.getId());
		}
		return StringUtils.join(nameIdList, ",");
	}

	@Transient
	public void setOfficeIds(String officeIds) {
		officeList = new ArrayList<>();
		if (officeIds != null) {
			String[] ids = StringUtils.split(officeIds, ",");
			for (String officeId : ids) {
				Office office = new Office();
				office.setId(new Long(officeId));
				officeList.add(office);
			}
		}
	}

	@Transient
	public List<Long> getUserIdList() {
		List<Long> nameIdList = new ArrayList<>();
		for (User user : userList) {
			nameIdList.add(user.getId());
		}
		return nameIdList;
	}

	@Transient
	public String getUserIds() {
		List<Long> nameIdList = new ArrayList<>();
		for (User user : userList) {
			nameIdList.add(user.getId());
		}
		return StringUtils.join(nameIdList, ",");
	}

	@Transient
	public List<Long> getMenuIdList() {
		List<Long> menuIdList = new ArrayList<>();
		for (Menu menu : menuList) {
			menuIdList.add(menu.getId());
		}
		return menuIdList;
	}

	@Transient
	public void setMenuIdList(List<Long> menuIdList) {
		menuList = new ArrayList<>();
		for (Long menuId : menuIdList) {
			Menu menu = new Menu();
			menu.setId(menuId);
			menuList.add(menu);
		}
	}

	@Transient
	public String getMenuIds() {
		List<Long> nameIdList = new ArrayList<>();
		for (Menu menu : menuList) {
			nameIdList.add(menu.getId());
		}
		return StringUtils.join(nameIdList, ",");
	}

	@Transient
	public void setMenuIds(String menuIds) {
		menuList = new ArrayList<>();
		if (menuIds != null) {
			String[] ids = StringUtils.split(menuIds, ",");
			for (String menuId : ids) {
				Menu menu = new Menu();
				menu.setId(new Long(menuId));
				menuList.add(menu);
			}
		}
	}

	/**
	 * 获取权限字符串列表
	 */
	@Transient
	public List<String> getPermissions() {
		List<String> permissions = new ArrayList<>();
		for (Menu menu : menuList) {
			if (menu.getPermission() != null && !"".equals(menu.getPermission())) {
				permissions.add(menu.getPermission());
			}
		}
		return permissions;
	}

	@Transient
	public boolean isAdmin() {
		return isAdmin(this.id);
	}

	@Transient
	public static boolean isAdmin(Long id) {
		return id != null && id.equals(1L);
	}

}
