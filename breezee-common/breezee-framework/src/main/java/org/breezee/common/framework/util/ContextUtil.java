/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved.
 */

package org.breezee.common.framework.util;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Spring容器Bean的管理类
 * cy-common
 * Created by Zhong, An-Jing on 2015/6/3.
 */
public final class ContextUtil implements ApplicationContextAware {

    public static String contextPath = "ROOT";

    public static ApplicationContext current = null;

    public static String getProperty(String key) {
        return current.getEnvironment().getProperty(key);
    }

    protected static BeanFactory factory() {
        return current;
    }

    public static String getProperty(String key, String defaultValue) {
        return current.getEnvironment().getProperty(key, defaultValue);
    }

    public static String getMessage(String code) {
        return current.getMessage(code, null, code,LocaleContextHolder.getLocale());
    }

    public static String getMessage(String code, Object[] params) {
        return current.getMessage(code, params,code, LocaleContextHolder.getLocale());
    }

    public static String getMessage(String code, String language) {
        return current.getMessage(code, null, code, new Locale(language));
    }

    public static String getMessage(String code, Object[] params, String language) {
        return current.getMessage(code, params,code, new Locale(language));
    }

    public static Object getBean(String name) {
        return current.getBean(name);
    }

    public static <T> T getBean(String name, Class<T> requiredType)
            throws BeansException {
        return factory().getBean(name, requiredType);
    }

    public static boolean containsBean(String name) {
        return factory().containsBean(name);
    }

    public static boolean isSingleton(String name)
            throws NoSuchBeanDefinitionException {
        return factory().isSingleton(name);
    }

    public static Class<?> getType(String name)
            throws NoSuchBeanDefinitionException {
        return factory().getType(name);
    }

    public static String[] getAliases(String name)
            throws NoSuchBeanDefinitionException {
        return factory().getAliases(name);
    }

    public static String getWebContextPath() {
        if (contextPath.equals("ROOT"))
            return "";
        return "/" + contextPath;
    }

    public void setApplicationContext(ApplicationContext applicationContext) {
        ContextUtil.current = applicationContext;
    }

    public static void run(Class<?> cla, String... file) {
        run(cla, true, file);
    }

    public static void run(Class<?> cla, boolean common, String... file) {
        List<String> cf = new ArrayList<>();
        if (common) {
            cf.add("classpath*:/bean/bre-*.xml");
            cf.add("classpath*:/bean/*-bean.xml");
        }
        if (file != null && file.length > 0) {
            for (String s : file) {
                cf.add(s);
            }
        }
        String[] tmp = new String[cf.size()];
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(cf.toArray(tmp));
        context.start();
        current = context;
        dump(cla);
    }

    /**
     * 以注解的形式启动容器
     *
     * @param cla
     */
    public static void runAnnotation(Class<?> cla, Class<?>... app) {
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(app);
        rootContext.refresh();
        current = rootContext;
        dump(cla);
    }

    private static void dump(Class<?> cla) {
        System.out.println("***************************************************************");
        System.out.println(cla.getName() + " Start Completed.");
        System.out.println("***************************************************************");
    }
}
