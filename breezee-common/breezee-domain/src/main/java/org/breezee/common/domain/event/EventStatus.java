/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.event;

import org.breezee.common.domain.constants.ConstantEnum;

/**
 * 事件状态
 * <p>
 * Created by Silence on 2016/4/28.
 */
public enum EventStatus implements ConstantEnum {

    NEW("new", 0),

    ONGO("ongo", 1),

    INTERRUPT("interrupt", 2),

    COMPLETE("complete", 3);

    private final String text;

    private final Integer value;

    EventStatus(String text, Integer value) {
        this.text = text;
        this.value = value;
    }

    public Integer getValue() {
        return this.value;
    }

    public String getText() {
        return this.text;
    }

    public String toString() {
        return this.getValue() + ":" + this.getText();
    }
}
