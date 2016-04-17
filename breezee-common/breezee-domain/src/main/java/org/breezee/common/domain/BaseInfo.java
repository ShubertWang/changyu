/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 领域对象的基本信息
 * 将被系统内的所有领域对象所继承
 * Created by Silence on 2016/2/6.
 */
public class BaseInfo implements Serializable, Cloneable {

    public static final int STATUS_ON = 1;
    public static final int STATUS_OFF = 0;
    public static final int STATUS_SUCCESS = 100;
    public static final int STATUS_ERROR = -100;

    protected Long id;

    protected String code;

    protected String name;

    protected int status = STATUS_ON;

    protected String remark;

    protected String creator;

    protected Date createTime;

    protected String updator;

    protected Date updateTime;

    protected String tenantId;

    protected String language;

    protected Map<String,Object> properties;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getUpdator() {
        return updator;
    }

    public void setUpdator(String updator) {
        this.updator = updator;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Map<String, Object> getProperties() {
        if(properties==null)
            this.properties = new HashMap<>();
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    public boolean checkQuery(Map<String,Object> query){
        //在子类中，强制指定其查询条件。
        //1. 使查询条件强类型
        //2. 安全控制
        return false;
    }

    /**
     * 复制对象
     * 我们不用BeanUtil的方式实现，而是自己来实现
     * 一方面减少包的依赖，另外也是提高效率
     */
    @Override
    public BaseInfo clone() {
        BaseInfo bi = new BaseInfo();
        return bi;
    }

    @Override
    public String toString(){
        StringBuffer sb = new StringBuffer();
        sb.append(this.getId());
        if(this.code!=null)
            sb.append(",").append(this.getCode());
        return sb.toString();
    }

}
