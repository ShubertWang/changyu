/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.oms.api.domain;

import org.breezee.common.domain.BaseInfo;

/**
 * 实体域：订单行信息对象
 * <p>
 * 订单和订单项一样是一个内聚的关系
 * 我们是没有什么情况会绕开订单实体，直接对订单行做操作的
 * 我们对 OrderLineItem的所有的操作都是以Order为出发点，
 * 我们总是会面向整个Order在做业务操作，
 * 比如向Order中增加明细，修改 Order的某个明细对应的商品的购买数量，
 * 从Order中移除某个明细，等等类似操作，我们从来不会从OrderLineInfo为出发点去执行一些业务操作；
 * 另外，从生命周期的角度去理解，那么OrderLineInfo离开Order没有任何存在的意义，也就是说OrderLineInfo的生命周期是从属于Order的
 * <p>
 * Created by Silence on 2016/4/26.
 */
public class OrderLineInfo extends BaseInfo {

}
