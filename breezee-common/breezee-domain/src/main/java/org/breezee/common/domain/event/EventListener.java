/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.event;

import org.breezee.common.domain.exception.EventException;

/**
 * 事件监听器
 * Created by Silence on 2016/4/28.
 */
public abstract class EventListener implements java.util.EventListener {

    /**
     * 是否可用
     */
    protected boolean enable = true;

    /**
     * 排序号
     * 从小到大
     */
    protected int sortNo = 0;

    /**
     * 是否接受此事件
     *
     * @param event 事件信息
     * @return 是否接受此事件
     */
    abstract boolean accept(EventInfo event);

    /**
     * 真正处理事件的逻辑
     *
     * @param event 需要处理的事件信息
     */
    abstract void handle(EventInfo event) throws EventException;

    /**
     * 事件处理前
     *
     * @param event 事件信息
     */
    protected void beforeHandle(EventInfo event) {
        //子类中实现
        event.eventStatus = EventStatus.ONGO;
    }

    /**
     * 事件处理完成后
     * 此方法在有异常抛出时候，不会被执行
     *
     * @param event 事件信息
     */
    protected void afterHandle(EventInfo event) {
        //子类中实现
        event.eventStatus = EventStatus.COMPLETE;
    }

    /**
     * 异常发生时的处理方法
     * 一般我们可以在此定义补偿机制实现回退操作
     *
     * @param event 事件信息
     * @param ex    异常信息
     */
    protected void exceptionHandle(EventInfo event, EventException ex) {
        //子类中实现
        event.eventStatus = EventStatus.INTERRUPT;
    }

    /**
     * 处理事件
     *
     * @param event 事件信息
     */
    public void onEvent(EventInfo event) throws EventException {
        if (isEnable() && accept(event)) {
            beforeHandle(event);
            try {
                handle(event);
            } catch (EventException e) {
                exceptionHandle(event, e);
                throw e;
            }
            afterHandle(event);
        }
    }

    public int getSortNo() {
        return sortNo;
    }

    public void setSortNo(int sortNo) {
        this.sortNo = sortNo;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
}
