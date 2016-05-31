/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr;

import org.breezee.common.framework.Startup;
import org.breezee.common.framework.util.ContextUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * 系统管理服务启动类
 * <p>
 * Created by Silence on 2016/1/29.
 */
@Configuration
@EnableAutoConfiguration
@ComponentScan("org.breezee")
@ImportResource(value = {"classpath:/sym-provider.xml"})
public class SymService extends Startup {

    /**
     * 启动本服务
     *
     * @param args 传入参数
     * @throws Exception 异常信息
     */
    public static void main(String[] args) throws Exception {
        ContextUtil.current = SpringApplication.run(SymService.class, args);
        shutdownHook(SymService.class);
        startup(SymService.class);
    }
}
