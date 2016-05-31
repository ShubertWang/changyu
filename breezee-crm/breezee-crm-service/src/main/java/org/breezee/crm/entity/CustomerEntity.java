/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm.entity;

import org.breezee.common.framework.BaseEntity;
import org.breezee.crm.api.domain.CustomerInfo;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

/**
 * 持久域：客户实体
 * Created by Silence on 2016/5/11.
 */
@Entity
@Table(name = "CRM_TF_CUSTOMER")
public class CustomerEntity extends BaseEntity<CustomerEntity, CustomerInfo> {

    private Set<CustomerOrgEntity> orgEntitySet;

    /**
     * 客户类型
     */
    private Integer customerType;

    /**
     * 国家
     */
    private String country;

    /**
     * 身份代码
     */
    private String region;

    /**
     * 城市代码
     */
    private String city;

    /**
     * 县级代码
     */
    private String prefectural;

    /**
     * 地址
     */
    private String address;

    /**
     * 邮编
     */
    private String postcode;

    /**
     * 电话
     */
    private String telephone;

    /**
     * 传真
     */
    private String fax;

    /**
     * 增值税号
     */
    private String vatCode;

    /**
     * 税号
     */
    private String taxCode;

    /**
     * 法人代表
     */
    private String personName;

    /**
     * 客户级别
     */
    private Integer rank;

    @Id
    @GeneratedValue(generator = "assigned-uid")
    @GenericGenerator(name = "assigned-uid", strategy = "assigned")
    @Column(name = "PK_ID", unique = true, nullable = false, updatable = false, length = 64)
    public String getId() {
        return id;
    }

    @Column(name = "CODE", unique = true, nullable = false, updatable = false, length = 64)
    public String getCode() {
        return code;
    }

    @Column(name = "NAME", nullable = false, length = 2000)
    public String getName() {
        return name;
    }

    @Column(name = "TENANT_ID", nullable = false, updatable = false, length = 64)
    public String getTenantId() {
        return tenantId;
    }

    @Column(name = "CREATOR", nullable = false, updatable = false, length = 64)
    public String getCreator() {
        return creator;
    }

    @Column(name = "CREATE_TIME", nullable = false, updatable = false)
    public Date getCreateTime() {
        return createTime;
    }

    @Column(name = "UPDATOR", nullable = false, length = 64)
    public String getUpdator() {
        return updator;
    }

    @Column(name = "UPDATE_TIME", nullable = false)
    public Date getUpdateTime() {
        return updateTime;
    }

    @Column(name = "REMARK", length = 3000)
    public String getRemark() {
        return remark;
    }

    @Column(name = "ROW_NUM", nullable = false)
    public Long getRowNum() {
        return rowNum;
    }

    @Column(name = "VERSION", nullable = false)
    public Integer getVersion() {
        return version;
    }

    @Column(name = "STATUS", nullable = false)
    public Integer getStatus() {
        return this.status;
    }

    @Column(name = "CUSTOMER_TYPE", nullable = false)
    public Integer getCustomerType() {
        return customerType;
    }

    public void setCustomerType(Integer customerType) {
        this.customerType = customerType;
    }

    @Column(name = "COUNTRY")
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Column(name = "REGION")
    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Column(name = "CITY")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name = "PREFECTURAL")
    public String getPrefectural() {
        return prefectural;
    }

    public void setPrefectural(String prefectural) {
        this.prefectural = prefectural;
    }

    @Column(name = "ADDRESS")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column(name = "POSTCODE")
    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    @Column(name = "TELEPHONE")
    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Column(name = "FAX")
    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    @Column(name = "VAT_CODE")
    public String getVatCode() {
        return vatCode;
    }

    public void setVatCode(String vatCode) {
        this.vatCode = vatCode;
    }

    @Column(name = "TAX_CODE")
    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    @Column(name = "PERSON_NAME")
    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    @Column(name = "RANK")
    public Integer getRank() {
        return rank;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }

    @OneToMany(mappedBy = "customer", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy(value = "company asc")
    public Set<CustomerOrgEntity> getOrgEntitySet() {
        return orgEntitySet;
    }

    public void setOrgEntitySet(Set<CustomerOrgEntity> orgEntitySet) {
        this.orgEntitySet = orgEntitySet;
    }
}
