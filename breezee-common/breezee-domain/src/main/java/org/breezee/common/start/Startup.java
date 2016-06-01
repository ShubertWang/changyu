/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.start;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

/**
 * 所有需要启动的服务类基类
 * Created by Silence on 2016/5/10.
 */
public class Startup {

    /**
     * 日志输出器
     */
    protected final static Logger logger = LoggerFactory.getLogger(Startup.class);

    /**
     * 运行的标识
     */
    protected static volatile boolean running = true;

    /**
     * 启动进程
     *
     * @param cla 需要启动的类
     * @param <T> Startup子类
     */
    protected static <T extends Startup> void startup(Class<T> cla) {
        synchronized (cla) {
            logger.info("****************************************************************************");
            logger.info("*" + LocalDateTime.now() + " service: " + cla.getName() + " started!");
            logger.info("****************************************************************************");
            while (running) {
                try {
                    cla.wait();
                } catch (Throwable e) {
                }
            }
        }
    }

    /**
     * 正常或者异常关闭时候的清理行为
     * 例如数据的清理等等
     *
     * @param cla 启动的类
     * @param <T> Startup子类
     */
    protected static <T extends Startup> void shutdownHook(Class<T> cla) {
        Runtime.getRuntime().addShutdownHook(new Thread() {
            public void run() {
                synchronized (cla) {
                    running = false;
                    cla.notify();
                }
            }
        });
    }

}
