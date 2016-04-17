/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.config;

import com.alibaba.dubbo.remoting.http.servlet.DispatcherServlet;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.breezee.common.framework.RetInfoBuilder;
import org.breezee.common.framework.filter.DubboLocaleFilter;
import org.breezee.common.framework.servlet.DubboServletContextInitializer;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.embedded.ServletContextInitializer;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * Created by Silence on 2016/2/9.
 */
@Configuration
@ImportResource(value = {
        "classpath:/bean/bre-datasource.xml",
        "classpath:/bean/bre-dubbo.xml"
})
public class EnvConfiguration implements InitializingBean {

    @Bean
    public DispatcherServlet services() {
        return new DispatcherServlet();
    }

    @Bean
    public ServletContextInitializer servletContextInitializer() {
        return new DubboServletContextInitializer();
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
//        messageSource.setBasenames("messages","i18n");
        return messageSource;
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public DubboLocaleFilter dubboLocaleFilter() {
        return new DubboLocaleFilter();
    }

    @Bean
    public RetInfoBuilder successInfo() {
        return new RetInfoBuilder.SuccessInfo();
    }

    @Bean
    public RetInfoBuilder errorInfo() {
        return new RetInfoBuilder.ErrorInfo();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.setProperty("user.timezone", "Asia/Shanghai");
        System.out.println(this.getClass().getName() + ": user.timezone--->Asia/Shanghai");
    }
}
