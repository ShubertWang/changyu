/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

package org.breezee.crm.api.domain;

import org.breezee.common.domain.BaseInfo;

/**
 * 实体域： 客户开票信息
 * Created by Silence on 2016/5/11.
 */
public class CustomerFicoInfo extends BaseInfo {

    protected String orgId;

    protected String typeCode;

    protected String typeName;

    protected String ficoCode;

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getFicoCode() {
        return ficoCode;
    }

    public void setFicoCode(String ficoCode) {
        this.ficoCode = ficoCode;
    }
}
