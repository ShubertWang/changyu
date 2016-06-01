/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.facade;

import com.alibaba.dubbo.remoting.http.servlet.DispatcherServlet;
import org.breezee.common.server.filter.DubboLocaleFilter;
import org.breezee.common.server.servlet.DubboServletContextInitializer;
import org.breezee.common.start.Startup;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ServletContextInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

import java.io.IOException;

/**
 * Created by Silence on 2016/5/31.
 */
@Configuration
@EnableAutoConfiguration
@ComponentScan("org.breezee")
@ImportResource(value = {"classpath:/facade-provider.xml"})
public class FacadeBoot extends Startup {

    /**
     * 启动程序
     *
     * @param args
     * @throws IOException
     */
    public static void main(String[] args) throws IOException {
        SpringApplication.run(FacadeBoot.class, args);
//        shutdownHook(FacadeBoot.class);
//        startup(FacadeBoot.class);
    }

    @Bean
    public DispatcherServlet services() {
        return new DispatcherServlet();
    }

    @Bean
    public ServletContextInitializer servletContextInitializer() {
        return new DubboServletContextInitializer();
    }

    @Bean
    public DubboLocaleFilter dubboLocaleFilter() {
        return new DubboLocaleFilter();
    }
}
