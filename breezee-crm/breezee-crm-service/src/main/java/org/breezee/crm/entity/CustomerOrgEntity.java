/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm.entity;

import org.breezee.common.framework.BaseEntity;
import org.breezee.crm.api.domain.CustomerOrgInfo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Set;

/**
 * 持久域：客户组织实体
 * Created by Silence on 2016/5/11.
 */
@Entity
@Table(name = "CRM_TF_CUSTOMER_ORG")
public class CustomerOrgEntity extends BaseEntity<CustomerOrgEntity, CustomerOrgInfo> {

    /**
     * 客户主体
     */
    private CustomerEntity customer;

    /**
     * 此组织下的财务开票信息
     */
    private Set<CustomerFicoEntity> ficoEntitySet;

    /**
     * 组织编码
     */
    private String orgCode;

    /**
     * 装运方式
     */
    private String shipment;

    /**
     * 考核类别
     */
    private String rateType;

    @Id
    @GeneratedValue(generator = "assigned-uid")
    @GenericGenerator(name = "assigned-uid", strategy = "assigned")
    @Column(name = "PK_ID", unique = true, nullable = false, updatable = false, length = 64)
    public String getId() {
        return id;
    }

    @Column(name = "COMPANY", nullable = false, length = 32)
    public String getCompany() {
        return company;
    }

    @Column(name = "CHANNEL", nullable = false, length = 32)
    public String getChannel() {
        return channel;
    }

    @ManyToOne(cascade = {CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ID", nullable = false)
    public CustomerEntity getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerEntity customer) {
        this.customer = customer;
    }

    @Column(name = "ORG_CODE", nullable = false, length = 64)
    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    @Column(name = "SHIPMENT", nullable = false, length = 32)
    public String getShipment() {
        return shipment;
    }

    public void setShipment(String shipment) {
        this.shipment = shipment;
    }

    @Column(name = "RATE_TYPE")
    public String getRateType() {
        return rateType;
    }

    public void setRateType(String rateType) {
        this.rateType = rateType;
    }

    @OneToMany(mappedBy = "orgEntity", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy(value = "typeCode asc")
    public Set<CustomerFicoEntity> getFicoEntitySet() {
        return ficoEntitySet;
    }

    public void setFicoEntitySet(Set<CustomerFicoEntity> ficoEntitySet) {
        this.ficoEntitySet = ficoEntitySet;
    }
}
