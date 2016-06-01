/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

/**
 * 通用的数据库查询类
 * Just for DB
 * Created by Silence on 2016/5/31.
 */
@NoRepositoryBean
public interface ICommonRepository<T extends BaseEntity, ID extends String>
        extends JpaRepository<T, ID> {

    /**
     * 根据code查找对象
     *
     * @param code
     * @return 指定code的对象
     */
    T findByCode(String code);
}
