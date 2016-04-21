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
public class BaseInfo implements Serializable, Cloneable, IDumpObject {

    public static final int STATUS_ON = 1;
    public static final int STATUS_OFF = 0;
    public static final int STATUS_SUCCESS = 100;
    public static final int STATUS_ERROR = -100;

    /**
     * 数据主键
     */
    protected String id;

    /**
     * 业务主键
     */
    protected String code;

    /**
     * 名称
     */
    protected String name;

    /**
     * 状态
     */
    protected int status = STATUS_ON;

    /**
     * 描述或者备注信息
     */
    protected String remark;

    /**
     * 创建人
     */
    protected String creator;

    /**
     * 创建时间
     */
    protected Date createTime;

    /**
     * 更新人
     */
    protected String updator;

    /**
     * 更新时间
     */
    protected Date updateTime;

    /**
     * 租户ID
     */
    protected String tenantId;

    /**
     * 语言
     */
    protected String language;

    /**
     * 每张表，确保此值被写入
     * 行数，一般用来做排序的
     * 在存入缓存的时候，也可以用来做分页查询
     * 所以我们在保存对象的时候，一定要设置好此值得正确性。
     */
    protected Long rowNum;

    /**
     * 版本，用来实现乐观锁
     */
    protected Integer version;

    /**
     * 扩展属性信息
     */
    protected Map<String,Object> properties;

    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public Long getRowNum() {
        return rowNum;
    }

    public void setRowNum(Long rowNum) {
        this.rowNum = rowNum;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Map<String, Object> getProperties() {
        if(properties==null)
            this.properties = new HashMap<>();
        return properties;
    }

    public void setProperties(Map<String, Object> properties) {
        this.properties = properties;
    }

    /**
     * 查询的强类型映射控制。
     * 在子类中实现
     * @param query
     * @return
     */
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

    @Override
    public void dump() {
        System.out.println(this.id+"--"+this.code+"--"+this.name+"--"+this.status);
    }
}
