/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.constants;

import java.io.Serializable;

/**
 * 状态的枚举接口
 * Created by Silence on 2016/4/28.
 */
public interface ConstantEnum extends Serializable {

    /**
     * 值
     *
     * @return 内部传递的值
     */
    Integer getValue();

    /**
     * 展现值
     *
     * @return 需要展现的值
     */
    String getText();

}
