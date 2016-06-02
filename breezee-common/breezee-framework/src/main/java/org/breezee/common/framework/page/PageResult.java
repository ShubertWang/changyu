/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */
package org.breezee.common.framework.page;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javafx.util.Callback;
import org.breezee.common.domain.BaseInfo;
import org.breezee.common.domain.InfoPage;
import org.breezee.common.framework.BaseEntity;
import org.springframework.data.domain.Page;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * 分页的查询结果
 * <p>
 * Created by Silence on 2016/1/22.
 */
public class PageResult<E extends BaseEntity, V extends BaseInfo> extends InfoPage implements Serializable {

    @JsonIgnore
    private transient Page<E> page;

    /**
     * 扩展属性，序列化的时候输出
     */
    private transient Map<String, Object> properties;

    private PageResult() {}

    /**
     * 构造方法
     * 我们必须提供回调来实现
     * @param page 分页数据
     * @param callback 回调方法
     */
    public PageResult(Page<E> page, Callback<E, V> callback) {
        this.page = page;
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
