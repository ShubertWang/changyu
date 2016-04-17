/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework.page;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javafx.util.Callback;
import org.breezee.common.domain.InfoPage;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 分页的查询结果
 * <p>
 * Created by Silence on 2016/1/22.
 */
public class PageResult<V> extends InfoPage implements Serializable {

    @JsonIgnore
    private transient Page<? extends Serializable> page;

    /**
     * 扩展属性，序列化的时候输出
     */
    private transient Map<String, Object> properties;

    private PageResult() {}

    /**
     * 构造方法
     * 我们必须提供回调来实现
     *
     * @param page
     * @param cla
     * @param <E>
     */
    protected <E> PageResult(Page<E> page, Class<V> cla) {
        this(page, cla, null);
    }

    public <E> PageResult(Page<E> page, Class<V> cla, Callback<E, V> callback) {
        this.page = (Page<? extends Serializable>) page;
        this.total = page.getTotalElements();
        content = new ArrayList<>();
        page.getContent().forEach(a -> {
            if (callback != null) {
                try {
                    content.add(callback.call(a));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public String toString() {
        return page.toString();
    }

    @JsonAnyGetter
    public Map<String, Object> getProperties() {
        if (this.properties == null)
            this.properties = new HashMap<>();
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }
}
