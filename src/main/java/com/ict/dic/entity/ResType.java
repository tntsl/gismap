package com.ict.dic.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.TableGenerator;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.annotations.Expose;
import com.ict.base.entity.DataEntity;

@Entity
@Table(name = "ep_res_restype")
@DynamicInsert
@DynamicUpdate
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ResType extends DataEntity {
    private static final long serialVersionUID = 1L;
    @Expose
    private Long id;
    @Expose
    private String name;
    @Expose
    /**
     * 拼音简称
     */
    private String shortName;
    @Expose
    private String unit;
    private String parentIds;
    @Expose
    private ResType parent;
    private List<ResType> childList = new ArrayList<>();
    @Expose
    private Integer isSelect;
    @Expose
    private String resfunction;

    public ResType() {
        this.sort = SORT_FLAG_DEFAULT;
    }

    public ResType(Long id) {
        this();
        this.id = id;
    }

    @Id
    @TableGenerator(name = "ep_res_restype_generator", table = "web_tab_pk", pkColumnName = "G_KEY", pkColumnValue = "ep_res_restype", valueColumnName = "G_VALUE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "ep_res_restype_generator")
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

    public String getResfunction() {
        return resfunction;
    }

    public void setResfunction(String resfunction) {
        this.resfunction = resfunction;
    }

    public String getParentIds() {
        return this.parentIds;
    }

    public void setParentIds(String parentIds) {
        this.parentIds = parentIds;
    }

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent")
    @NotFound(action = NotFoundAction.IGNORE)
    @NotNull
    public ResType getParent() {
        return this.parent;
    }

    public void setParent(ResType parent) {
        this.parent = parent;
    }

    @JsonIgnore
    @OneToMany(cascade = {javax.persistence.CascadeType.PERSIST, javax.persistence.CascadeType.MERGE, javax.persistence.CascadeType.REMOVE}, fetch = FetchType.LAZY, mappedBy = "parent")
    @Where(clause = "del_flag='0'")
    @OrderBy("sort")
    @NotFound(action = NotFoundAction.IGNORE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    public List<ResType> getChildList() {
        return this.childList;
    }

    public void setChildList(List<ResType> childList) {
        this.childList = childList;
    }

    public Integer getIsSelect() {
        return this.isSelect;
    }

    public void setIsSelect(Integer isSelect) {
        this.isSelect = isSelect;
    }

    public String getUnit() {
        return this.unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    @Transient
    public boolean isRoot() {
        return isRoot(this.id);
    }

    @Transient
    public static boolean isRoot(Long id) {
        return (id != null) && (id.equals(Long.valueOf(1L)));
    }

    @Transient
    public static void sortList(List<ResType> list, List<ResType> sourcelist, Long parentId) {
        for (int i = 0; i < sourcelist.size(); i++) {
            ResType e = (ResType) sourcelist.get(i);
            if ((e.getParent() != null) && (e.getParent().getId() != null) && (e.getParent().getId().equals(parentId))) {
                list.add(e);

                for (int j = 0; j < sourcelist.size(); j++) {
                    ResType child = (ResType) sourcelist.get(j);
                    if ((child.getParent() != null) && (child.getParent().getId() != null) && (child.getParent().getId().equals(e.getId()))) {
                        sortList(list, sourcelist, e.getId());
                        break;
                    }
                }
            }
        }
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}