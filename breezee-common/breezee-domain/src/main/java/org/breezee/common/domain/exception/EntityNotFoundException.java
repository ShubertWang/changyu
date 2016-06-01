/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain.exception;

/**
 * 实体未找到的异常
 * Created by Silence on 2016/2/11.
 */
public class EntityNotFoundException extends PersistenceException {

    public EntityNotFoundException(String message) {
        super(message + ":Not Found");
    }

    public EntityNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
