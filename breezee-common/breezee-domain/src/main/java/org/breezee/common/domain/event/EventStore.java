/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.event;

import java.io.Serializable;

/**
 * 事件存储
 * 事件重建
 * 事件回溯
 * 典型的情况，是在bus挂掉之后，如何恢复事件。
 * 其持久化的库，建议使用NoSql的
 * Created by Silence on 2016/4/28.
 */
public interface EventStore<T extends EventInfo> extends Serializable {

    /**
     * 保存事件
     *
     * @param eventInfo 事件信息
     */
    void saveEvent(T eventInfo);

    /**
     * 恢复与重建事件聚合
     *
     * @param aggregateId 事件聚合Id
     */
    void restoreEvent(String aggregateId);

    /**
     * 删除事件
     *
     * @param id 事件Id
     */
    void deleteEvent(String id);
}
