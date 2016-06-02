/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.facade.resource;

import org.breezee.common.domain.IFacadeLayer;
import org.breezee.sysmgr.api.domain.EnumInfo;

/**
 * 系统管理的聚合类
 * Created by Silence on 2016/5/31.
 */
public interface ISysmgrFacade extends IFacadeLayer {

    /**
     * 枚举值保存
     *
     * @param info 枚举信息
     * @return 保存后的枚举信息
     */
    EnumInfo saveEnum(EnumInfo info);

    /**
     * 根据id查找枚举对象
     *
     * @param id
     * @return
     */
    EnumInfo findById(String id);

}
