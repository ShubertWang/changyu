/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.UUID;

/**
 * 与系统相关的一些常用工具方法
 * Created by Silence on 2016/6/1.
 */
public class SystemTool {

    /**
     * 获取当前操作系统名称
     * return 操作系统名称
     */
    public static String getOSName() {
        return System.getProperty("os.name").toLowerCase();
    }


    /**
     * 获取本地主机名
     *
     * @return 本机主机名
     */
    public static String getHostName() {
        InetAddress ia = null;
        try {
            ia = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return ia == null ? "unknownHost" : ia.getHostName();
    }

    /**
     * 本机IP地址
     *
     * @return 本机IP地址
     */
    public static String getIPAddress() {
        InetAddress ia = null;
        try {
            ia = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return ia == null ? "unknownIp" : ia.getHostAddress();
    }

    public static String uuid() {
        return UUID.randomUUID().toString();
    }
}
