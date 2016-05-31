/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

/**
 * 业务领域的独有的属性
 * <p>
 * Created by Silence on 2016/5/11.
 */
public class BizInfo extends BaseInfo {

    /**
     * 公司编码,例如:3008,3010
     */
    protected String company;

    /**
     * 渠道
     */
    protected String channel;

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }
}
