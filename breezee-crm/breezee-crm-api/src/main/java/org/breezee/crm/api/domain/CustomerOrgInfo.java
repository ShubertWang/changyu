/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm.api.domain;

import org.breezee.common.domain.BizInfo;

import java.util.List;

/**
 * 实体域： 客户组织信息
 * <p>
 * Created by Silence on 2016/5/11.
 */
public class CustomerOrgInfo extends BizInfo {

    protected List<CustomerFicoInfo> ficoInfoList;

    /**
     * 客户标识
     */
    protected String customerId;

    /**
     * 组织编码
     */
    protected String orgCode;

    /**
     * 装运方式
     */
    protected String shipment;

    /**
     * 考核类别
     */
    protected String rateType;

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getShipment() {
        return shipment;
    }

    public void setShipment(String shipment) {
        this.shipment = shipment;
    }

    public String getRateType() {
        return rateType;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    public List<CustomerFicoInfo> getFicoInfoList() {
        return ficoInfoList;
    }

    public void setFicoInfoList(List<CustomerFicoInfo> ficoInfoList) {
        this.ficoInfoList = ficoInfoList;
    }
}

/*
 *  客户主数据是由SAP同步而来，DMS支持手动更新客户信息。
 *  其数据对应关系如下：
 *  dms         sap     描述
 *  ---------------------------------
 *  company     VKORG1   销售组织(公司)
 *  rateType    KVGR3   经销商考核类别
 *  channel     KVGR4   客户渠道
 *  orgCode     VKGRP   销售组
 *  shipment    VSBED   装运条件
 *
 */