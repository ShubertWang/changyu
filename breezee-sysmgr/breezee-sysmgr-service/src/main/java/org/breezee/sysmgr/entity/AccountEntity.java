/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.entity;

import org.breezee.common.framework.BaseEntity;
import org.breezee.sysmgr.api.domain.AccountInfo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * 持久域：账号实体
 * Created by Silence on 2016/5/5.
 */
@Entity
@Table(name = "SYM_TF_ACCOUNT")
public class AccountEntity extends BaseEntity<AccountEntity, AccountInfo> {

    private OrganizationEntity organization;

    private Set<RoleEntity> roles;

    @Id
    @GeneratedValue(generator = "assigned-uid")
    @GenericGenerator(name = "assigned-uid", strategy = "assigned")
    @Column(name = "PK_ID", unique = true, nullable = false, updatable = false, length = 64)
    public String getId() {
        return id;
    }

    @Column(name = "CODE", unique = true, nullable = false, updatable = false, length = 64)
    public String getCode() {
        return code;
    }

    @Column(name = "NAME", nullable = false, length = 2000)
    public String getName() {
        return name;
    }

    @Column(name = "TENANT_ID", nullable = false, updatable = false, length = 64)
    public String getTenantId() {
        return tenantId;
    }

    @Column(name = "CREATOR", nullable = false, updatable = false, length = 64)
    public String getCreator() {
        return creator;
    }

    @Column(name = "CREATE_TIME", nullable = false, updatable = false)
    public Date getCreateTime() {
        return createTime;
    }

    @Column(name = "UPDATOR", nullable = false, length = 64)
    public String getUpdator() {
        return updator;
    }

    @Column(name = "UPDATE_TIME", nullable = false)
    public Date getUpdateTime() {
        return updateTime;
    }

    @Column(name = "REMARK", length = 3000)
    public String getRemark() {
        return remark;
    }

    @Column(name = "COMPANY", nullable = false, length = 32)
    public String getCompany() {
        return company;
    }

    @Column(name = "CHANNEL", nullable = false, length = 32)
    public String getChannel() {
        return channel;
    }

    @Column(name = "ROW_NUM", nullable = false)
    public Long getRowNum() {
        return rowNum;
    }

    @Column(name = "VERSION", nullable = false)
    public Integer getVersion() {
        return version;
    }

    @Column(name = "STATUS", nullable = false)
    public Integer getStatus() {
        return this.status;
    }

    @Column(name = "NODE_HOST", nullable = false, length = 128)
    public String getNode() {
        return node;
    }

    @ManyToOne(cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
    @JoinTable(name = "SYM_TF_ORGANIZATION_ACNT", joinColumns = @JoinColumn(name = "ACNT_ID", referencedColumnName = "PK_ID"),
            inverseJoinColumns = @JoinColumn(name = "ORG_ID", referencedColumnName = "PK_ID"))
    public OrganizationEntity getOrganization() {
        return organization;
    }

    public void setOrganization(OrganizationEntity organization) {
        this.organization = organization;
    }

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "SYM_TF_ROLE_ACNT", joinColumns = @JoinColumn(name = "ACNT_ID", referencedColumnName = "PK_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID", referencedColumnName = "PK_ID"))
    public Set<RoleEntity> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleEntity> roles) {
        this.roles = roles;
    }
}
