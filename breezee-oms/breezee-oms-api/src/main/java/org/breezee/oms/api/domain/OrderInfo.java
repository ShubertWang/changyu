/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.oms.api.domain;

import org.breezee.common.domain.BaseInfo;

import java.util.Date;

/**
 * 实体域，聚合根：订单信息对象
 * 订单拆分为以下几个信息，基本信息，物料信息(orderLineInfo), Fico信息(orderFico), 物流信息(orderLogistics)
 * <p>
 * Order必须有对应的客户信息，否则就不能称为一个有效的Order
 * 同理，Order对OrderLineItem有不变性约束，Order也必须至少有一个OrderLineInfo，否则就不能称为一个有效的Order
 * 另外，Order中的任何OrderLineItem的数量都不能为0，否则认为该OrderLineItem是无效的
 * Created by Silence on 2016/4/26.
 */
public class OrderInfo extends BaseInfo {

    /**
     * 此订单的当前处理人
     */
    protected String assign;

    /**
     * 订单的执行主体。即订单的客户
     */
    protected String executor;

    /**
     * 下单人
     */
    protected String placeOrderPerson;

    /**
     * 下单时间
     */
    protected Date placeOrderTime;

    /**
     * 销售组织
     */
    protected String site;

    /**
     * 订单类型
     */
    protected String orderType;


}
