import menu from './menu'
import api from './api'
import formCommon from './formCommon'

import '../static/jqwidgets/globalization/globalize.js'
import '../static/jqwidgets/globalization/globalize-zh.js'


global.Site = {
    http: (opts, isLogin) => {
        let dtd = $.Deferred(),
            options = _.extend({
                type: 'get',
                dataType: "json",
                beforeSend: requst => {
                    requst.setRequestHeader("tokenStr", Site.loginInfo.TokenStr);
                }
            }, opts);
        if(isLogin === false){
            delete options.beforeSend;
        }
        if(options.url && options.url.indexOf('http://') !== 0 && options.url.indexOf('https://') !== 0){
            options.url = Site.api.preUrl + options.url;
        }
        $.ajax(options).done(res => {
            //1001正常，1005列表没数据
            res.code = res.code || res.Code
            if(res.code == 1001 || res.code == 1005)
                dtd.resolve(res);
            else
                dtd.reject(res);
        }).fail(err => {
            dtd.reject(err);
        });
        return dtd;
    },
    get: (opts, isLogin) => {
        let dtd = $.Deferred()
        opts.type = 'get';
        Site.http(opts, isLogin).done(res => {
            dtd.resolve(res);
        }).fail(err => {
            dtd.reject(err);
        });
        return dtd;
    },
    post: (opts, isLogin) => {
        let dtd = $.Deferred()
        opts.type = 'post';
        opts.contentType = "application/json; charset=utf-8";
        if(opts.data){
            opts.data = JSON.stringify(opts.data);
        }
        Site.http(opts, isLogin).done(res => {
            dtd.resolve(res);
        }).fail(err => {
            dtd.reject(err);
        });
        return dtd;
    },
    get loginInfo(){
        let obj = {};
        try {
            obj = JSON.parse(localStorage.getItem('loginInfo'));
            if (!obj) obj = {};
        } catch (e) {
            obj = {};
        }
        return obj;
    },
    set loginInfo(obj){
        if(!obj)
            localStorage.removeItem('loginInfo');
        else
            localStorage.setItem('loginInfo', JSON.stringify(obj));
    },
    get isLogin(){
        return !!Site.loginInfo.TokenStr;
    },
    set menuList(obj){
        var str = JSON.stringify(obj);
        localStorage.setItem('menuList', str);
    },
    get menuList(){
        var obj = localStorage.getItem('menuList')
        if(obj){
           return JSON.parse(obj)
        }
        return []
    },
    set userMsg (obj){
      var str = JSON.stringify(obj);
      if(!obj){
        localStorage.removeItem('userMsg');
      }else{
        localStorage.setItem('userMsg',str);
      }
    },
    get userMsg (){
      let obj = {};
      try {
        obj = JSON.parse(localStorage.getItem('userMsg'));
        if(!obj){
          obj = {}
        }
      }catch (e){
        obj ={};
      }
      return obj;
	},
    api: api,
    menu: menu,
    formCommon: formCommon,
    globalize: document.Globalize //日期，数字，货币格式化
};
