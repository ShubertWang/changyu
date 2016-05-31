/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.domain;

import org.breezee.common.domain.constants.InfoStatusEnum;

import java.util.List;

/**
 * 树状存储对象
 * Created by Silence on 2016/4/15.
 */
public class TreeInfo<T> extends BaseInfo {

    public static final String KEY_TYPE_CODE = "code";
    public static final String KEY_TYPE_ID = "id";

    /**
     * 判断主标识的字符串 //TODO:
     */
    protected String keyType = KEY_TYPE_ID;

    /**
     * 父对象
     */
    protected T parent;

    /**
     * 是否启用
     */
    protected boolean enabled = true;


    /**
     * 存储代码的显示优先级,排序时使用
     */
    protected int index = -1;

    /**
     * 是否可选中
     */
    protected boolean clickable = true;


    /**
     * 选中此代码时，提示的信息
     */
    protected String hint = "";

    /**
     * 存储所有的子对象
     */
    protected List<T> children = null;

    /**
     * 是否叶子节点
     */
    protected boolean leaf = true;

    protected String path;

    public String getKeyType() {
        return keyType;
    }

    public void setKeyType(String keyType) {
        this.keyType = keyType;
    }

    public T getParent() {
        return parent;
    }

    public void setParent(T parent) {
        this.parent = parent;
    }

    public boolean isEnabled() {
        return status.intValue() == InfoStatusEnum.ENABLE.getValue().intValue();
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public boolean isClickable() {
        return clickable;
    }

    public void setClickable(boolean clickable) {
        this.clickable = clickable;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

    public List<T> getChildren() {
        return children;
    }

    public void setChildren(List<T> children) {
        this.children = children;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    /**
     * 获取带分隔符的层级对象的显示名称
     * 在子类中具体实现
     *
     * @return 返回带分隔符的层级对象的显示名称，如“中国/江苏/南京”
     */
    public String getNameWithPath() {
        return null;
    }

    /**
     * 获取节点路径
     * 在子类中具体实现
     *
     * @return 返回路径信息
     */
    public String getPath() {
        return null;
    }

}
