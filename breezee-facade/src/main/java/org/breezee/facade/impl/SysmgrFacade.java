/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.facade.impl;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import org.breezee.facade.resource.ISysmgrFacade;
import org.breezee.sysmgr.api.domain.EnumInfo;
import org.breezee.sysmgr.api.service.IEnumService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.ws.rs.*;

/**
 * 系统管理服务的对外实现
 * <p>
 * Created by Silence on 2016/5/31.
 */
@Service
@Produces(ContentType.APPLICATION_JSON_UTF_8)
@Consumes(ContentType.APPLICATION_JSON_UTF_8)
@Path("/system")
public class SysmgrFacade implements ISysmgrFacade {

    @Resource
    private IEnumService enumService;

    @Path("/enum")
    @Override
    public EnumInfo saveEnum(EnumInfo info) {
        return enumService.saveInfo(info);
    }

    @Path("/enum/{id}")
    @GET
    @Override
    public EnumInfo findById(@PathParam("id") String id) {
        System.out.println(id);
        return new EnumInfo();
    }
}
