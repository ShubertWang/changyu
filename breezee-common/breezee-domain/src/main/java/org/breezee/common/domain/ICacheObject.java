/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import java.io.Serializable;

/**
 * 支持可以被缓存的对象
 * Created by Silence on 2016/4/21.
 */
public interface ICacheObject<K> extends Serializable {

    /**
     * 获取缓存对象的主键
     * @return 缓存主键
     */
    K getKey();

    /**
     * 是否添加到缓存中了
     * 如果没有添加到缓存中的对象，则直接去DB获取
     * 在缓存服务失效的时候，可以返回为false，从而支持可用性
     * @return 是否被缓存
     */
    boolean isCached();
}
