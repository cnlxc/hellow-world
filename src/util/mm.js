'use strict';
var conf ={
    serverHost : ''
};
var Hongan = require('hogan.js'); 
var _mm = {
    request : function(param){

      $.ajax({
          type      : param.method || 'get',
          url       : param.url    || '',
          dataType  : param.type   ||  'json',
          data      : param.data   ||  '',
          sucess    : function(res){
                if(0=== res.status){
                  typeof param.sucess === 'function' && param.sucess(res.data,res.msg);
                //10表示没有登陆 
                }else if(10 === res.status){
                    doLogin();
                }else if(1=== res.status){
                    typeof param.error === 'function' && param.error(res.data,res.msg);
                }
          },
          error    : function(err){
            typeof param.error === 'function' && param.error(err.status);
          }
      });

      console.log('why nothing happend');
    },
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    getUrlParam : function(name){
        var reg = new RegExp('(&|^)'+name+'=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml : function(htmlTemplate,data){
        var template = Hongan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    successTips : function(msg){
        alert(msg+ "operation success!");
    },
    errorTips : function(msg){
        alert(msg+"something is not correct...");
    },
    validate : function(data,type){
        if(type === 'require'){
            return !!data;
        }
        if(type === 'phone'){
            return /^1\d{10}/.test(data);
        }
        if(type === 'email'){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data);
        }
    },
    //统一跳转页面
    doLogin : function(){
        window.location.href = './user-login.html?redirect='+ encodeURIComponent(window.location.href);
    },
    //回到主页
    gohome : function(){
        window.location.href = './index.html';
    }

};

module.exports= _mm;