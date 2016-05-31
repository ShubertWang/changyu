/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.api.domain;

import org.breezee.common.domain.BaseInfo;

/**
 * 实体域,聚合根: 定时任务配置
 * <p>
 * Created by Silence on 2016/5/11.
 */
public class CronJobInfo extends BaseInfo {

    /**
     * Spring Cron 表达式
     */
    protected String crontab;

    public String getCrontab() {
        return crontab;
    }

    public void setCrontab(String crontab) {
        this.crontab = crontab;
    }
}
