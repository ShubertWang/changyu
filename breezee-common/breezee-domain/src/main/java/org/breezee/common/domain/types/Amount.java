/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.types;

/**
 * 金额
 * Created by Silence on 2016/2/11.
 */
public class Amount implements ValueType<Amount> {

    /**
     * 币种
     */
    private String currencyCode;

    /**
     * 值
     */
    private Double value;

    public Amount(String currencyCode, Double value) {
        this.currencyCode = currencyCode;
        this.value = value;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public Double getValue() {
        return value;
    }
}
