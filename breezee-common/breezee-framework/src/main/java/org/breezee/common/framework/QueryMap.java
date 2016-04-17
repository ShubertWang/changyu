/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework;

import org.breezee.common.framework.page.PageInfo;

import java.io.Serializable;
import java.util.HashMap;

/**
 * Created by Silence on 2016/4/15.
 */
public final class QueryMap extends HashMap<String,Object> implements Serializable {

    protected PageInfo pageInfo;

    public PageInfo getPageInfo() {
        return pageInfo;
    }

    public void setPageInfo(PageInfo pageInfo) {
        this.pageInfo = pageInfo;
    }
}
