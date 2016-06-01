/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.repository;

import org.breezee.common.framework.ICommonRepository;
import org.breezee.sysmgr.entity.EnumEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * Created by Silence on 2016/5/31.
 */
@Repository("enumRepository")
public interface IEnumRepository extends ICommonRepository<EnumEntity, String>,
        JpaSpecificationExecutor<EnumEntity> {

}
