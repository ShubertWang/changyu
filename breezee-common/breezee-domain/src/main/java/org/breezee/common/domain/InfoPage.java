/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import java.util.List;

/**
 * 分页对象
 * Created by Silence on 2016/4/15.
 */
public class InfoPage<R> {

    protected List<R> content;

    protected Long total;

    public List<R> getContent() {
        return content;
    }

    public void setContent(List<R> content) {
        this.content = content;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
