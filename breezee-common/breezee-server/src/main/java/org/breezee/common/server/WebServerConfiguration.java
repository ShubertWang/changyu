/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.server;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * 配置Rest的服务接口暴露
 * Created by Silence on 2016/5/31.
 */
@Configuration
@ImportResource(value = {"classpath:/bean/bre-protocol-rest.xml"})
public class WebServerConfiguration {
}
