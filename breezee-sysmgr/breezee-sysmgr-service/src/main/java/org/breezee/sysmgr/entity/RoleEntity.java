/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.entity;

import org.breezee.common.framework.BaseEntity;
import org.breezee.sysmgr.api.domain.RoleInfo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * 持久域：角色实体
 * Created by Silence on 2016/5/10.
 */
@Entity
@Table(name = "SYM_TF_ROLE")
public class RoleEntity extends BaseEntity<RoleEntity, RoleInfo> {

    private String permits;

    private Set<AccountEntity> accounts;

    @Id
    @GeneratedValue(generator = "assigned-uid")
    @GenericGenerator(name = "assigned-uid", strategy = "assigned")
    @Column(name = "PK_ID", unique = true, nullable = false, updatable = false, length = 64)
    public String getId() {
        return id;
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

    @Column(name = "ROLE_PERMIT", length = 4000)
    public String getPermits() {
        return permits;
    }

    public void setPermits(String permits) {
        this.permits = permits;
    }

    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY)
    public Set<AccountEntity> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<AccountEntity> accounts) {
        this.accounts = accounts;
    }
}
