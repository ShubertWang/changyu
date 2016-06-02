/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework;

import javafx.util.Callback;
import org.springframework.beans.BeanUtils;

/**
 * 对bean的一些通用操作
 * Created by Silence on 2016/2/7.
 */
public class BeanUtil {

    /**
     * 使用Spring的bean 2 bean
     * @param source
     * @param target
     * @param ignoreProperties
     * @param <P>
     * @param <R>
     */
    public static <P,R> R beanCopy(P source, R target, String... ignoreProperties){
        return beanCopy(source,target,null,ignoreProperties);
    }

    /**
     * 存在回调的bean 2 bean
     * @param source
     * @param target
     * @param callback
     * @param ignoreProperties
     * @param <P>
     * @param <R>
     */
    public static <P,R> R beanCopy(P source, R target,
                                   Callback<P,R> callback, String... ignoreProperties){
        BeanUtils.copyProperties(source, target, ignoreProperties);
        if(callback!=null){
            target = callback.call(source);
        }
        return target;
    }

}
