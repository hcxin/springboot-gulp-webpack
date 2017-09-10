package com.chen.controller;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Objects;

/**
 * 类的功能描述：
 * 通用控制器
 *
 * @ClassName: BaseController
 * @Author haichen
 * @Date 2017-09-10 10:06:49
 */
public abstract class BaseController {

    public HttpServletRequest getRequest() {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();

        return request;
    }
}
