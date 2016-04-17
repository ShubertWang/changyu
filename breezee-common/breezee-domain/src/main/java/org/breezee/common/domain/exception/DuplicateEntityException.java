/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.exception;

/**
 * 出现重复业务实体时候的异常
 * Created by Silence on 2016/2/11.
 */
public class DuplicateEntityException extends PersistenceException {

    public DuplicateEntityException(String message) {
        super(message);
    }

    public DuplicateEntityException(String message, Throwable cause) {
        super(message, cause);
    }
}
