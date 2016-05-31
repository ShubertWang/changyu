/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.event;

import java.util.EventObject;
import java.util.UUID;

/**
 * 事件领域
 * Created by Silence on 2016/4/28.
 */
public class EventInfo extends EventObject implements Cloneable {

    /**
     * 事件的状态
     */
    protected EventStatus eventStatus;
    /**
     * 事件标识
     * 在集群，分布式部署的时候，确定此事件的唯一性
     */
    private String id;
    /**
     * 事件人
     */
    private String userId;
    /**
     * 事件的类型
     */
    private String type;
    /**
     * 事件的版本号
     * Source在生命周期过程中，会经历各种事件
     * 通过version我们可以明确哪个事件先发生，哪个事件后发生
     * 在并发控制的时候，我们要明确的知道，一个source不可能产生两个版本号一样的事件
     */
    private int version;

    /**
     * Constructs a prototypical Event.
     *
     * @param source The object on which the Event initially occurred.
     * @throws IllegalArgumentException if source is null.
     */
    public EventInfo(Object source) {
        super(source);
    }

    public EventInfo(Object source, String userId, String type) {
        this(source, UUID.randomUUID().toString(), userId, type);
    }

    public EventInfo(Object source, String id, String userId, String type) {
        this(source, UUID.randomUUID().toString(), userId, type, 0);
    }

    public EventInfo(Object source, String id, String userId, String type, int version) {
        super(source);
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.version = version;
        eventStatus = EventStatus.NEW;
    }

    /**
     * 克隆一个新的事件
     * 事件的ID会被重新赋予
     * 但是记住,source依然保持了一致性
     *
     * @return 复制后的事件
     */
    public EventInfo clone() {
        try {
            super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return new EventInfo(this.getSource(), this.id + "-" + Thread.currentThread().getId(), this.userId, this.type);
    }
}
