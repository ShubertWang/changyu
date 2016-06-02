/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.constants;

/**
 * 终端设备类型的枚举
 * Created by Silence on 2016/5/5.
 */
public enum EquipmentEnum implements ConstantEnum {

    DESKTOP("desktop", 1),
    PAD("pad", 3),
    MOBILE("mobile", 5);

    private final String text;

    private final Integer value;

    EquipmentEnum(String text, Integer value) {
        this.text = text;
        this.value = value;
    }

    @Override
    public Integer getValue() {
        return value;
    }

    @Override
    public String getText() {
        return text;
    }
}
