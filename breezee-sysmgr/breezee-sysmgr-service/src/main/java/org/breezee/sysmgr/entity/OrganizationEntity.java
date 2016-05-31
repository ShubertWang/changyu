/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.entity;

import org.breezee.common.framework.BaseEntity;
import org.breezee.sysmgr.api.domain.OrganizationInfo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * 持久域：组织实体。
 * 省，城市，营销部 构成一个树形结构
 * Created by Silence on 2016/5/10.
 */
@Entity
@Table(name = "SYM_TF_ORGANIZATION")
public class OrganizationEntity extends BaseEntity<OrganizationEntity, OrganizationInfo> {

    private Set<AccountEntity> accounts;

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

    @Column(name = "COMPANY", length = 32)
    public String getCompany() {
        return company;
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

    @Column(name = "NODE_ID", nullable = false)
    public String getNodeId() {
        return nodeId;
    }

    @OneToMany(mappedBy = "organization", cascade = {CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @OrderBy(value = "code ASC")
    public Set<AccountEntity> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<AccountEntity> accounts) {
        this.accounts = accounts;
    }
}
