/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework;

import org.breezee.common.domain.BaseInfo;

/**
 * 结果信息构建器
 * Created by Silence on 2016/4/15.
 */
public  interface RetInfoBuilder {

    /**
     * 构建返回结构
     * @param t
     * @param <T>
     * @return
     */
    <T extends BaseInfo> T build(T t);

    default <T extends BaseInfo> T build(T t,String errorMessage){
        t.setRemark(errorMessage);
        return build(t);
    }

    /**
     * 成功信息
     */
    class SuccessInfo implements RetInfoBuilder {

        @Override
        public <T extends BaseInfo> T build(T t) {
            t.setStatus(BaseInfo.STATUS_SUCCESS);
            return t;
        }
    }

    /**
     * 异常信息返回
     */
    class ErrorInfo implements RetInfoBuilder {

        @Override
        public <T extends BaseInfo> T build(T t) {
            t.setStatus(BaseInfo.STATUS_ERROR);
            return t;
        }
    }
}
