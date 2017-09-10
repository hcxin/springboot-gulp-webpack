package com.chen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 类的功能描述：
 * 页面跳转控制
 *
 * @ClassName: BaseController
 * @Author haichen
 * @Date 2017-09-10 10:06:49
 */

@Controller
public class PageController extends BaseController {

    /**
     * 首页
     *
     * @return
     */
    @RequestMapping("/index.htm")
    public String index() {
        return "index";
    }

    @RequestMapping("/news-list.htm")
    public String newsList() {
        return "news-list";
    }

    @RequestMapping("/news-detail.htm")
    public String newsDetail() {
        return "news-detail";
    }

    @RequestMapping("/tables.htm")
    public String tables() {
        return "tables";
    }
}
