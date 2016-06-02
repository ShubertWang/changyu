/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import java.util.List;

/**
 * 分页对象
 * Created by Silence on 2016/4/15.
 */
public class InfoPage {

    protected List<Object> content;

    protected Long total;

    public List<Object> getContent() {
        return content;
    }

    public void setContent(List<Object> content) {
        this.content = content;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
