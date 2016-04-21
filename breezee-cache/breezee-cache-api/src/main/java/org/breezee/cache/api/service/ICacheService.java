/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.cache.api.service;

import org.breezee.cache.api.domain.CacheInfo;
import org.breezee.common.domain.ICacheObject;
import org.breezee.common.domain.IServiceLayer;

import java.util.List;

/**
 * 服务域： 缓存服务接口
 * Created by Silence on 2016/4/21.
 */
public interface ICacheService {

    /**
     * 推入到缓存中
     * @param cacheInfo
     */
    void put(CacheInfo cacheInfo);

    /**
     * 从缓存获取
     * @param keys
     * @param <K>
     * @return
     */
    <K> ICacheObject<K> get(List<K> keys);

    /**
     * 从缓存获取列表
     * @param keys
     * @param <K>
     * @return
     */
    <K> List<ICacheObject<K>> list(List<K> keys);
}
