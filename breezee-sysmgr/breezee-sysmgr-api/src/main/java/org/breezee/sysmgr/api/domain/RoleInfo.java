/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.api.domain;

import org.breezee.common.domain.BaseInfo;

import java.util.Set;

/**
 * 实体域：角色信息对象
 * Created by Silence on 2016/4/26.
 */
public class RoleInfo extends BaseInfo {

    /**
     * 权限串
     */
    protected Set<String> permits;

    /**
     * 排序号
     */
    protected int orderNo;

    public Set<String> getPermits() {
        return permits;
    }

    public void setPermits(Set<String> permits) {
        this.permits = permits;
    }

    public int getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(int orderNo) {
        this.orderNo = orderNo;
    }
}
