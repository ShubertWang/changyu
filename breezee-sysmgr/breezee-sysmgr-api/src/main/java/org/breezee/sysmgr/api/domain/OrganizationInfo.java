/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.api.domain;

import org.breezee.common.domain.TreeInfo;

import java.util.List;

/**
 * 实体域：组织信息对象
 * 省，城市，营销部 构成一个树形结构
 * Created by Silence on 2016/4/25.
 */
public class OrganizationInfo extends TreeInfo<OrganizationInfo> {

    protected List<String> companies;

    public List<String> getCompanies() {
        return companies;
    }

    public void setCompanies(List<String> companies) {
        this.companies = companies;
    }
}
