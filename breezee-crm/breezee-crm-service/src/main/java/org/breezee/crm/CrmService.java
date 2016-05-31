/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.crm;

import org.breezee.common.framework.Startup;
import org.breezee.common.framework.util.ContextUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * 客户服务启动程序
 * Created by Silence on 2016/1/29.
 */
@Configuration
@EnableAutoConfiguration
@ComponentScan("org.breezee")
@ImportResource(value = {"classpath:/crm-provider.xml"})
public class CrmService extends Startup {

    /**
     * 其客户服务
     *
     * @param args 传入参数
     * @throws Exception 异常信息
     */
    public static void main(String[] args) throws Exception {
        ContextUtil.current = SpringApplication.run(CrmService.class, args);
        shutdownHook(CrmService.class);
        startup(CrmService.class);
    }
}
