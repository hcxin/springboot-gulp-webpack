var $ = require('jquery');
var vue = require('vue');


var mainVue = new vue({
    el: '#profile-menu',
    data: {
        username: '桃谷绘里香',
        userCompany: '蚊香社'
    }
});