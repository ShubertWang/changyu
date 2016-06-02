/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.server.servlet;

import com.alibaba.dubbo.remoting.http.servlet.ServletManager;
import org.springframework.boot.context.embedded.ServletContextInitializer;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

/**
 * 注册dubbo的context
 * Created by Silence on 2016/2/7.
 */
public class DubboServletContextInitializer implements ServletContextInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        System.out.println("dubbo remoting servlet startup...");
        ServletManager.getInstance().addServletContext(ServletManager.EXTERNAL_SERVER_PORT, servletContext);
    }
}
