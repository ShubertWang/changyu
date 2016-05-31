/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.types;

/**
 * 数量
 * Created by Silence on 2016/2/11.
 */
public class Quantity implements ValueType<Quantity> {

    /**
     * 单位
     */
    private String unitCode;

    /**
     * 值
     */
    private Number value;

    public Quantity(String unitCode, Integer value) {
        this.unitCode = unitCode;
        this.value = value;
    }

    public String getUnitCode() {
        return unitCode;
    }

    public Number getValue() {
        return value;
    }

    public String toString() {
        return this.value + (this.unitCode == null ? "" : this.unitCode);
    }
}
