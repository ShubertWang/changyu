/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.api.domain;

import org.breezee.common.domain.BaseInfo;

import java.util.List;

/**
 * 实体域：枚举值信息
 * Created by Silence on 2016/5/5.
 */
public class EnumInfo extends BaseInfo {

    protected List<EnumItemInfo> items;

    public List<EnumItemInfo> getItems() {
        return items;
    }

    public void setItems(List<EnumItemInfo> items) {
        this.items = items;
    }
}
