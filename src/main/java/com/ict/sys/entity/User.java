package com.ict.sys.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ict.base.entity.DataEntity;
import com.ict.base.utils.Collections3;

/**
 * @author nanxiaoqiang
 * @version 2014年1月31日
 */
@Entity
@Table(name = "sys_user")
public class User extends DataEntity {
	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private Long id; // 编号
	private Office company; // 归属公司
	private Office office; // 归属部门
	private String loginName;// 登录名
	private String password;// 密码
	private String no; // 工号
	private String name; // 姓名
	private String email; // 邮箱
	private String phone; // 电话
	private String mobile; // 手机
	private String userType;// 用户类型
	private String loginIp; // 最后登陆IP
	private Date loginDate; // 最后登陆日期
	private String salt;// 用于加密的随机生成的salt
	private String plainPassword;// 用户输入的password,不放在数据库中

	private List<Role> roleList = new ArrayList<>(); // 拥有角色列表

	public User() {
		super();
	}

	public User(Long id) {
		this();
		this.id = id;
	}

	@Id
	@TableGenerator(name = "sys_user_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "sys_user", valueColumnName = "G_VALUE", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "sys_user_generator")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@ManyToOne
	@JoinColumn(name = "company_id")
	@NotFound(action = NotFoundAction.IGNORE)
	@JsonIgnore
	@NotNull(message = "归属公司不能为空")
	// @ExcelField(title = "归属公司", align = 2, sort = 20)
	public Office getCompany() {
		return company;
	}

	public void setCompany(Office company) {
		this.company = company;
	}

	@ManyToOne
	@JoinColumn(name = "office_id")
	@NotFound(action = NotFoundAction.IGNORE)
	@JsonIgnore
	@NotNull(message = "归属部门不能为空")
	// @ExcelField(title="归属部门", align=2, sort=25)
	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}

	@Length(min = 1, max = 100)
	// @ExcelField(title="登录名", align=2, sort=30)
	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	@JsonIgnore
	@Length(min = 1, max = 100)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Length(min = 1, max = 100)
	// @ExcelField(title="工号", align=2, sort=45)
	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	@Length(min = 1, max = 100)
	// @ExcelField(title="姓名", align=2, sort=40)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Length(min = 0, max = 200)
	// @ExcelField(title="邮箱", align=1, sort=50)
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Length(min = 0, max = 200)
	// @ExcelField(title="电话", align=2, sort=60)
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Length(min = 0, max = 200)
	// @ExcelField(title="手机", align=2, sort=70)
	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	@Length(min = 0, max = 100)
	// @ExcelField(title="用户类型", align=2, sort=80, dictType="sys_user_type")
	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getLoginIp() {
		return loginIp;
	}

	public void setLoginIp(String loginIp) {
		this.loginIp = loginIp;
	}

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	// @ExcelField(title="最后登录日期", type=1, align=1, sort=110)
	public Date getLoginDate() {
		return loginDate;
	}

	public void setLoginDate(Date loginDate) {
		this.loginDate = loginDate;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

	/**
	 * 不持久化到数据库，也不显示在Restful接口的属性.
	 *
	 * @return
	 */
	@Transient
	@JsonIgnore
	public String getPlainPassword() {
		return plainPassword;
	}

	public void setPlainPassword(String plainPassword) {
		this.plainPassword = plainPassword;
	}

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "sys_user_role", joinColumns = {@JoinColumn(name = "user_id")}, inverseJoinColumns = {@JoinColumn(name = "role_id")})
	@Where(clause = "del_flag='" + DEL_FLAG_NORMAL + "'")
	@OrderBy("id")
	@Fetch(FetchMode.SUBSELECT)
	@NotFound(action = NotFoundAction.IGNORE)
	@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
	@JsonIgnore
	// @ExcelField(title="拥有角色", align=1, sort=800,
	// fieldType=RoleListType.class)
	public List<Role> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<Role> roleList) {
		this.roleList = roleList;
	}

	@Transient
	@JsonIgnore
	public List<Long> getRoleIdList() {
		List<Long> roleIdList = new ArrayList<>();
		for (Role role : roleList) {
			roleIdList.add(role.getId());
		}
		return roleIdList;
	}

	@Transient
	public void setRoleIdList(List<Long> roleIdList) {
		roleList = new ArrayList<>();
		for (Long roleId : roleIdList) {
			Role role = new Role();
			role.setId(roleId);
			roleList.add(role);
		}
	}

	/**
	 * 用户拥有的角色名称字符串, 多个角色名称用','分隔.
	 */
	@Transient
	public String getRoleNames() {
		return Collections3.extractToString(roleList, "name", ", ");
	}

	@Transient
	public boolean isAdmin() {
		return isAdmin(this.id);
	}

	@Transient
	public static boolean isAdmin(Long id) {
		return id != null && id.equals(1L);
	}

	@Override
	public String toString() {
		return String.valueOf(id);
	}

}
