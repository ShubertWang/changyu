/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import javafx.util.Callback;

import java.util.ArrayList;
import java.util.Collection;

/**
 * 列表对象
 * Created by Silence on 2016/2/12.
 */
public class InfoList<R> extends ArrayList {

    public <P> InfoList(Collection<P> c, Callback<P, R> callback) {
        super(c.size());
        if (callback != null)
            c.forEach(a -> {
                this.add(callback.call(a));
            });
    }
}
