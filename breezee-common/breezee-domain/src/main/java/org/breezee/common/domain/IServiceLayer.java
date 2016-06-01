/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import org.breezee.common.domain.constants.InfoStatusEnum;
import org.breezee.common.domain.exception.BreezeeException;

import java.util.List;
import java.util.Map;

/**
 * 服务层高度抽象接口
 * 提供：保存，删除，按ID查找，按Code查找，列表查询，分页查询，条目数，状态更新
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
    T deleteById(String id) throws BreezeeException;

    /**
     * 获取指定主键的领域对象
     * @param id 主键
     * @return 领域对象
     * @throws BreezeeException 异常
     */
    T findById(String id) throws BreezeeException;

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
    InfoPage pageAll(Map<String, Object> query);

    /**
     * 获取指定条件的集合数目
     * @param query 查询条件
     * @return 条数
     */
    long count(Map<String,Object> query);

    /**
     * 更新指定领域对象的状态
     * @param id 对象唯一标识
     * @param status 状态值
     * @throws BreezeeException 异常
     */
    default void updateStatus(String id, InfoStatusEnum status) throws BreezeeException {
        T t = findById(id);
        t.setStatus(status.getValue());
        this.saveInfo(t);
    }
}
