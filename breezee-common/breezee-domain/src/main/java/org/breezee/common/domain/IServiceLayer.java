/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import org.breezee.common.domain.exception.BreezeeException;

import java.util.List;
import java.util.Map;

/**
 * 服务层高度抽象接口
 * Created by Silence on 2016/4/15.
 */
public interface IServiceLayer<T extends BaseInfo> {

    /**
     * 保存领域对象
     * @param t 领域对象
     * @return 持久化后的对象
     * @throws BreezeeException 异常
     */
    T saveInfo(T t) throws BreezeeException;

    /**
     * 删除指定主键的领域对象
     * @param id 主键
     * @return 被删除的对象
     * @throws BreezeeException 异常
     */
    T deleteById(Long id) throws BreezeeException;

    /**
     * 获取指定主键的领域对象
     * @param id 主键
     * @return 领域对象
     * @throws BreezeeException 异常
     */
    T findById(Long id) throws BreezeeException;

    /**
     * 获取指定业务主键的领域对象
     * @param code 业务主键
     * @return 领域对象
     * @throws BreezeeException 异常
     */
    T findByCode(String code) throws BreezeeException;

    /**
     * 根据条件获取领域对象列表
     * @param query 查询条件
     * @return 列表
     */
    List<T> listAll(Map<String,Object> query);

    /**
     * 分页获取指定条件的领域对象集合
     * @param query 查询条件
     * @return 分页集合
     */
    InfoPage<T> pageAll(Map<String,Object> query);

    /**
     * 获取指定条件的集合数目
     * @param query 查询条件
     * @return 条数
     */
    long count(Map<String,Object> query);

    /**
     * 更新指定领域对象的状态
     * @param id
     * @param status
     * @throws BreezeeException
     */
    default void updateStatus(Long id, int status) throws BreezeeException{
        T t = findById(id);
        t.setStatus(status);
        this.saveInfo(t);
    }
}
