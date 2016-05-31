/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm.api.domain;

import org.breezee.common.domain.BizInfo;

import java.util.List;

/**
 * 实体域,聚合根：客户信息
 *
 * Created by Silence on 2016/4/21.
 */
public class CustomerInfo extends BizInfo {

    /**
     * 客户的组织信息
     */
    protected List<CustomerOrgInfo> orgInfoList;

    /**
     * 客户类型
     */
    protected Integer customerType = CustomerTypeEnum.NORMAL.getValue();

    /**
     * 国家
     */
    protected String country;

    /**
     * 身份代码
     */
    protected String region;

    /**
     * 城市代码
     */
    protected String city;

    /**
     * 县级代码
     */
    protected String prefectural;

    /**
     * 地址
     */
    protected String address;

    /**
     * 邮编
     */
    protected String postcode;

    /**
     * 电话
     */
    protected String telephone;

    /**
     * 传真
     */
    protected String fax;

    /**
     * 增值税号
     */
    protected String vatCode;

    /**
     * 税号
     */
    protected String taxCode;

    /**
     * 法人代表
     */
    protected String personName;

    /**
     * 客户级别
     */
    protected Integer rank = CustomerRankEnum.GENERAL.getValue();

    public Integer getCustomerType() {
        return customerType;
    }

    public void setCustomerType(Integer customerType) {
        this.customerType = customerType;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPrefectural() {
        return prefectural;
    }

    public void setPrefectural(String prefectural) {
        this.prefectural = prefectural;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getVatCode() {
        return vatCode;
    }

    public void setVatCode(String vatCode) {
        this.vatCode = vatCode;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public List<CustomerOrgInfo> getOrgInfoList() {
        return orgInfoList;
    }

    public void setOrgInfoList(List<CustomerOrgInfo> orgInfoList) {
        this.orgInfoList = orgInfoList;
    }

    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}

/*
 *  客户主数据是由SAP同步而来，DMS支持手动更新客户信息。
 *  其数据对应关系如下：
 *  dms         sap     描述
 *  ------------------------------------
 *  code        KUNNR   客户编码
 *  name        NAME1   名称
 *  country     LAND1   国家
 *  region      REGIO   地区
 *  address     STRAS   地址
 *  postcode    PSTLZ   邮编
 *  telephone   TELF1   电话
 *  fax         TELFX   传真
 *  vatCode     STCD1   录入增值税
 *  taxCode     STCD2   税号2
 *  personName  STKZN   自然人
 *  city        ZCITY1  地级市
 *  prefectural ZCITY2  县级市
 */