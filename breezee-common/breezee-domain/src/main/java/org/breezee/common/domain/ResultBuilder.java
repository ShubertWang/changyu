/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import org.breezee.common.domain.constants.InfoStatusEnum;

/**
 * 结果信息构建器
 * 构建返回结构
 * Created by Silence on 2016/4/15.
 */
public final class ResultBuilder {

    /**
     * 成功信息
     *
     * @param t
     * @param <T>
     * @return
     */
    public static <T extends BaseInfo> T success(T t) {
        t.setStatus(InfoStatusEnum.SUCCESS.getValue());
        return t;
    }

    /**
     * 成功信息
     *
     * @param t
     * @param msg
     * @param <T>
     * @return
     */
    public static <T extends BaseInfo> T success(T t, String msg) {
        t.setStatus(InfoStatusEnum.SUCCESS.getValue());
        return t;
    }

    /**
     * 异常信息返回
     *
     * @param t
     * @param <T>
     * @return
     */
    public static <T extends BaseInfo> T error(T t) {
        t.setStatus(InfoStatusEnum.ERROR.getValue());
        return t;
    }

    /**
     * 异常信息返回
     *
     * @param t
     * @param msg
     * @param <T>
     * @return
     */
    public static <T extends BaseInfo> T error(T t, String msg) {
        t.setStatus(InfoStatusEnum.ERROR.getValue());
        return t;
    }

}
