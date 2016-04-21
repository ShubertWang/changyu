/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.cache.api.domain;

import org.breezee.common.domain.ICacheObject;

import java.io.Serializable;

/**
 * Created by Silence on 2016/4/21.
 */
public class CacheInfo<V extends ICacheObject> implements Serializable {


    protected V cacheObject;

    public CacheInfo(V object){
        this.cacheObject = object;
    }

    public V getCacheObject() {
        return cacheObject;
    }
}
