/*! functions.js */
var $ = require('jquery');
var vue = require('vue');
$.fn.slider = require('ui/slider.js');



var mainVue = new vue({
    el: '#userStatus',
    data: {
        userEmail: 'Hello haichen !'
    }
});

var newsVue = new vue({
    el: '#newsContainer',
    data: {
        showMoreMsg: '查看更多...',
        newsList: []
    },
    created: function () {
        this.newsList = ["在线购卡价格调整公告", "大话2经典版、免费版充值送大礼",
            "1月10日23点-1月11日7点工商银行", "在线购卡价格调整公告", "大话2经典版、免费版充值送大礼", "1月10日23点-1月11日7点工商银行"];
        this.init();
    },
    methods: {
        init: function () {
            console.log("======init=========");
        },
        showMore: function () {
            window.location.href = contextPath + "/news-detail.htm";
        }
    }
});

$(window).load(function () {
    var slider = $('.banner').slider({
        dots: true,
        fluid: true,
        arrows: true
    });
    $('.slider-arrow').click(function () {
        var fn = this.className.split(' ')[1];

        //  Either do slider.data('slider').next() or .prev() depending on the className
        slider.data('slider')[fn]();
    });
});


