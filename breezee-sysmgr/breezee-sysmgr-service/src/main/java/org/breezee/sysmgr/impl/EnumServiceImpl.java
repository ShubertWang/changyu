/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.sysmgr.impl;

import javafx.util.Callback;
import org.breezee.common.domain.BaseInfo;
import org.breezee.common.domain.InfoList;
import org.breezee.common.domain.InfoPage;
import org.breezee.common.domain.exception.BreezeeException;
import org.breezee.common.domain.exception.EntityNotFoundException;
import org.breezee.common.framework.DynamicSpecifications;
import org.breezee.common.framework.page.PageInfo;
import org.breezee.common.framework.page.PageResult;
import org.breezee.sysmgr.api.domain.EnumInfo;
import org.breezee.sysmgr.api.service.IEnumService;
import org.breezee.sysmgr.entity.EnumEntity;
import org.breezee.sysmgr.repository.IEnumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * 枚举服务实现类
 * Created by Silence on 2016/5/31.
 */
@Service("enumService")
public class EnumServiceImpl implements IEnumService {

    @Autowired
    private IEnumRepository enumRepository;

    @Override
    public EnumInfo saveInfo(EnumInfo enumInfo) throws BreezeeException {
        try {
            EnumEntity enumEntity = new EnumEntity().parseInfo(enumInfo);
            enumRepository.saveAndFlush(enumEntity);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BreezeeException(e.getMessage(), e);
        }
        return enumInfo;
    }

    @Override
    public EnumInfo deleteById(String id) throws BreezeeException {
        EnumInfo enumInfo = findById(id);
        enumRepository.delete(id);
        return enumInfo;
    }

    @Override
    public EnumInfo findById(String id) throws BreezeeException {
        EnumEntity enumEntity = enumRepository.findOne(id);
        if (enumEntity == null)
            throw new EntityNotFoundException(id);
        return enumEntity.toInfo(new EnumInfo());
    }

    @Override
    public EnumInfo findByCode(String code) throws BreezeeException {
        EnumEntity enumEntity = enumRepository.findByCode(code);
        if (enumEntity == null)
            throw new EntityNotFoundException(code);
        return enumEntity.toInfo(new EnumInfo());
    }

    @Override
    public List<EnumInfo> listAll(Map<String, Object> query) {
        List<EnumEntity> l = enumRepository.findAll(DynamicSpecifications.createSpecification(query));
        return new InfoList<>(l, (Callback<EnumEntity, EnumInfo>) param -> param.toInfo(new EnumInfo()));
    }

    @Override
    public InfoPage pageAll(Map<String, Object> query) {
        PageInfo pageInfo = new PageInfo(query);
        Page<EnumEntity> page = enumRepository.findAll(DynamicSpecifications.createSpecification(query), pageInfo);
        return new PageResult<>(page, (Callback<EnumEntity, BaseInfo>) param -> param.toInfo(new EnumInfo()));
    }

    @Override
    public long count(Map<String, Object> query) {
        return enumRepository.count(DynamicSpecifications.createSpecification(query));
    }
}
