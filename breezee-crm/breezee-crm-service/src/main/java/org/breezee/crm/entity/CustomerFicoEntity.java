/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm.entity;

import org.breezee.common.framework.BaseEntity;
import org.breezee.crm.api.domain.CustomerFicoInfo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * 持久域：客户财务信息，一般指开票信息
 * <p>
 * Created by Silence on 2016/5/11.
 */
@Entity
@Table(name = "CRM_TF_CUSTOMER_FICO")
public class CustomerFicoEntity extends BaseEntity<CustomerFicoEntity, CustomerFicoInfo> {

    protected String typeCode;
    protected String typeName;
    protected String ficoCode;
    private CustomerOrgEntity orgEntity;

    @Id
    @GeneratedValue(generator = "assigned-uid")
    @GenericGenerator(name = "assigned-uid", strategy = "assigned")
    @Column(name = "PK_ID", unique = true, nullable = false, updatable = false, length = 64)
    public String getId() {
        return id;
    }

    @ManyToOne(cascade = {CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ORG_ID", nullable = false)
    public CustomerOrgEntity getOrgEntity() {
        return orgEntity;
    }

    public void setOrgEntity(CustomerOrgEntity orgEntity) {
        this.orgEntity = orgEntity;
    }

    @Column(name = "TYPE_CODE", nullable = false)
    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode;
    }

    @Column(name = "TYPE_NAME")
    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    @Column(name = "FICO_CODE", nullable = false)
    public String getFicoCode() {
        return ficoCode;
    }

    public void setFicoCode(String ficoCode) {
        this.ficoCode = ficoCode;
    }
}
