/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * 加载数据源的配置
 * Created by Silence on 2016/5/31.
 */
@Configuration
@ImportResource(value = {"classpath:/bean/bre-datasource.xml", "classpath:/bean/bre-protocol-dubbo.xml"})
public class FrameworkConfiguration {
}
