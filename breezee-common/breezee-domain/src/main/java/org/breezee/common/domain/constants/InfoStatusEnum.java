/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.constants;

/**
 * 实体状态的枚举值设定
 * 在做Jackson数据绑定的时候，请记住直接传递：DISABLE,ENABLE即可
 * Created by Silence on 2016/4/28.
 */
public enum InfoStatusEnum implements ConstantEnum {

    DISABLE("disable", 0),
    ENABLE("enable", 1),
    UNKNOWN("unknown", -1),
    SUCCESS("success", 100),
    ERROR("error", -100);

    private final String text;

    private final Integer value;

    InfoStatusEnum(String text, Integer value) {
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
        return this.getText();
    }

}
