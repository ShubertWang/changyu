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
public interface RetInfoBuilder {

    /**
     * 成功信息
     */
    class SuccessInfo implements RetInfoBuilder {

        public static <T extends BaseInfo> T build(T t) {
            t.setStatus(InfoStatusEnum.SUCCESS.getValue());
            return t;
        }

        public static <T extends BaseInfo> T build(T t, String msg) {
            t.setStatus(InfoStatusEnum.SUCCESS.getValue());
            if (msg != null)
                t.setRemark(msg);
            return t;
        }
    }

    /**
     * 异常信息返回
     */
    class ErrorInfo implements RetInfoBuilder {

        public static <T extends BaseInfo> T build(T t) {
            t.setStatus(InfoStatusEnum.ERROR.getValue());
            return t;
        }

        public static <T extends BaseInfo> T build(T t, String msg) {
            t.setStatus(InfoStatusEnum.ERROR.getValue());
            if (msg != null)
                t.setRemark(msg);
            return t;
        }
    }
}
