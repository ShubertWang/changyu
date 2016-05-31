/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.event;

import org.breezee.common.domain.exception.EventException;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

/**
 * 事件分发中心
 * Created by Silence on 2016/4/28.
 */
public class EventCenter {

    /**
     * 监听器列表
     */
    private List<EventListener> listeners;

    /**
     * 构建事件中心
     *
     * @param listeners 事件监听器
     */
    public EventCenter(List<EventListener> listeners) {
        this.listeners = listeners;
        sort();
    }

    /**
     * 运行期增加监听
     *
     * @param listener 事件监听
     */
    public synchronized void addListeners(EventListener listener) {
        if (this.listeners == null)
            this.listeners = new ArrayList<>();
        this.listeners.add(listener);
        sort();
    }

    /**
     * 监听器排序
     */
    private synchronized void sort() {
        if (this.listeners != null) {
            this.listeners.sort((o1, o2) -> o1.getSortNo() - o2.getSortNo());
        }
    }

    /**
     * 发布事件
     *
     * @param event              事件
     * @param async              是否异步执行
     * @param exceptionInterrupt 异常发生时候，是否中断
     * @throws EventException 事件异常
     */
    public void fireEvent(EventInfo event, boolean async, boolean exceptionInterrupt) throws EventException {
        if (listeners == null)
            throw new EventException("无事件监听器！");
        if (async) {
            //即使我在这里想使用弱一致性，但是我如何做到呢？难题啊--Anjing
            //TODO: 在这里，我们需要merge clone出来的 event对象。
            CountDownLatch latch = new CountDownLatch(listeners.size());
            EventException eventException = new EventException(null);
            listeners.forEach(a -> new EventRun(a, event.clone(), latch, eventException).start());
            try {
                latch.await();
            } catch (InterruptedException e) {
                throw new EventException(e.getMessage());
            }
            if (eventException.getMessage() != null) {
                throw new EventException(eventException.getMessage());
            }
        } else {
            listeners.forEach(a -> {
                try {
                    a.onEvent(event);
                } catch (EventException e) {
                    e.printStackTrace();
                    if (exceptionInterrupt)
                        throw e;
                }
            });
        }
    }

    /**
     * 发布事件
     *
     * @param event 事件信息
     * @param async 是否异步执行监听
     * @throws EventException 事件异常
     */
    public void fireEvent(EventInfo event, boolean async) throws EventException {
        fireEvent(event, async, true);
    }

    /**
     * 发布事件
     *
     * @param event 事件信息
     * @throws EventException 事件异常
     */
    public void fireEvent(EventInfo event) throws EventException {
        fireEvent(event, false, true);
    }

    /**
     * 异步分发事件
     */
    class EventRun extends Thread {

        CountDownLatch latch;

        EventListener listener;

        EventInfo eventInfo;

        EventException exception;

        EventRun(EventListener listener, EventInfo eventInfo, CountDownLatch latch, EventException exception) {
            if (eventInfo == null)
                throw new IllegalArgumentException("null eventInfo");
            this.listener = listener;
            this.eventInfo = eventInfo;
            this.latch = latch;
            this.exception = exception;
        }

        @Override
        public void run() {
            try {
                listener.onEvent(eventInfo);
            } catch (EventException e) {
                exception.addMessage(e.getMessage());
            } finally {
                latch.countDown();
            }
        }
    }
}
