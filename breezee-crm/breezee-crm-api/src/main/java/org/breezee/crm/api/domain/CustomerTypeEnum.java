/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm.api.domain;

import org.breezee.common.domain.constants.ConstantEnum;

/**
 * 客户类型的枚举值
 * normal: 指普通的经销商客户
 * direct: 类似以D开头的客户
 * <p>
 * Created by Silence on 2016/5/11.
 */
public enum CustomerTypeEnum implements ConstantEnum {

    /**
     * 正常客户
     */
    NORMAL("normal", 0),

    /**
     * 直供客户
     */
    DIRECT("direct", 1),

    /**
     * 一次性客户
     */
    TEMPORARY("temporary", 2);

    private final String text;

    private final Integer value;

    CustomerTypeEnum(String text, Integer value) {
        this.text = text;
        this.value = value;
    }

    @Override
    public Integer getValue() {
        return this.value;
    }

    @Override
    public String getText() {
        return this.text;
    }
}
