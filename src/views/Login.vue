<template>
  <div class='loginPage'>
    <div class='loginPageWrap'>
      <div class="login_hd">
        <img class="logo" src="@/assets/img/logo.png">
      </div>
      <div class="login_bg">
        <div class="bg"></div>
      </div>
      <div class="login_fd">© 2016 All Rights Reserved.中招联合信息股份有限公司</div>
    	<div class='authent'>
        <div class="loader" style="height: 44px;width: 44px;margin-left: 28px;">
          <div class="loader-inner ball-clip-rotate-multiple">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <p>认证中...</p>
    	</div>


      
      <div class='login'>
        <div class='login_title'>
            <span>评标专家登录</span>
        </div>
        <div class='login_fields'>
            <div class='login_fields__user'>
              <div class='icon'><img alt="" src='/js/plugins/jQueryLogin/img/user_icon_copy.png'/></div>
              <input name="login" placeholder='用户名' maxlength="16" type='text' autocomplete="off" value="leader" />
              <div class='validation'><img alt="" src='/js/plugins/jQueryLogin/img/tick.png'/></div>
            </div>
            <div class='login_fields__password'>
              <div class='icon'><img alt="" src='/js/plugins/jQueryLogin/img/lock_icon_copy.png'/></div>
              <input name="pwd" placeholder='密码' maxlength="16" type='text' autocomplete="off">
              <div class='validation'><img alt="" src='/js/plugins/jQueryLogin/img/tick.png'/></div>
            </div>
            <div class='login_fields__password'>
              <div class='icon'><img alt="" src='/js/plugins/jQueryLogin/img/key.png'/></div>
              <input name="code" placeholder='验证码' maxlength="4" type='text' autocomplete="off">
              <div class='validation' style="opacity: 1; right: -5px;top: -3px;">
                <canvas class="J_codeimg" id="myCanvas" onclick="Code();">对不起，您的浏览器不支持canvas，请下载最新版浏览器!</canvas>
              </div>
            </div>
            <div class='login_fields__submit'>
              <input type='button' value='登录'>
            </div>
        </div>
        <div class='success'></div>
        <div class='disclaimer'>
            <p>欢迎登陆专家评标系统</p>
        </div>
      </div>

      <div class="OverWindows"></div>
    </div>
  </div>
</template>
<style lang="scss">
@import '../assets/css/common/mixin.scss';
.loginPage{
  .loginPageWrap{
    display: none;
    width: 1200px;
    margin: auto;
    .login_hd{
      height: 100px;
      background: url(../assets/img/header-bg-tel.png) right 15px no-repeat;
      @include clearfix;
      .logo{
        position: absolute;
        top: 16px;
      }
    }
    .login_bg{
      width: 1200px;
      margin: auto;
      .bg{
        width: 1920px;
        height: 583px;
        margin-left: -360px;
      }
    }
    .login_fd{
      color: #333;
      font-size: 14px;
      text-align: center;
      height: 120px;
      line-height: 120px;
    }
  }
}
</style>
<script>
export default {
  name: 'login',
  data() {
    return {
      jsDownCount: 0,
      CodeVal: 0,

      canGetCookie: 0, //是否支持存储Cookie 0 不支持 1 支持
      ajaxmockjax: 1, //是否启用虚拟Ajax的请求响 0 不启用  1 启用
    };
  },
  components: {
    
  },


  mounted(){
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/jQueryLogin/layui/css/layui.all.css',
        download_files_key: '/js/plugins/jQueryLogin/layui/css/layui.all.css'
    });
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/jQueryLogin/css/styles.css',
        download_files_key: '/js/plugins/jQueryLogin/css/styles.css'
    });
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/jQueryLogin/css/loaders.css',
        download_files_key: '/js/plugins/jQueryLogin/css/loaders.css'
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/lib/jquery-ui.min.js',
        download_files_key: '/js/lib/jquery-ui.min.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/jQueryLogin/layui/layui.all.js',
        download_files_key: '/js/plugins/jQueryLogin/layui/layui.all.js',
        callback: this.init
    });
    $('.loginPageWrap').addClass('bg'+(Math.floor(Math.random() * 5 + 1)));
  },
  methods: {
    ErroAlert(e) {
        var index = layer.alert(e, { icon: 5, time: 2000, offset: 't', closeBtn: 0, title: '错误信息', btn: [], anim: 2, shade: 0 });
        layer.style(index, {
            color: '#777'
        }); 
    },
    //hours为空字符串时,cookie的生存期至浏览器会话结束。  
    //hours为数字0时,建立的是一个失效的cookie,  
    //这个cookie会覆盖已经建立过的同名、同path的cookie（如果这个cookie存在）。     
    setCookie(name, value, hours, path) {
        var name = escape(name);
        var value = escape(value);
        var expires = new Date();
        expires.setTime(expires.getTime() + hours * 3600000);
        path = path == "" ? "" : ";path=" + path;
        _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
        document.cookie = name + "=" + value + _expires + path;
    },
    //cookie名获取值  
    getCookieValue(name) {
        var name = escape(name);
        //读cookie属性，这将返回文档的所有cookie     
        var allcookies = document.cookie;
        //查找名为name的cookie的开始位置     
        name += "=";
        var pos = allcookies.indexOf(name);
        //如果找到了具有该名字的cookie，那么提取并使用它的值     
        if (pos != -1) {    //如果pos值为-1则说明搜索"version="失败     
            var start = pos + name.length;   //cookie值开始的位置     
            var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置     
            if (end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie     
            var value = allcookies.substring(start, end);  //提取cookie的值     
            return unescape(value);       //对它解码           
        }
        else return "-1";    //搜索失败，返回-1  
    },
    createCode(e) {
        var code = "";
        var codeLength = 4;
        var selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * 60);
            code += selectChar[charIndex];
        }
        if (code.length != codeLength) {
            this.createCode(e);
        }
      if(this.canGetCookie == 1){
          this.setCookie(e, code, 60 * 60 * 60, '/');
      }else{
        return code;
      }
    },
    Code() {
        if (this.canGetCookie == 1) {
            this.createCode("AdminCode");
            var AdminCode = this.getCookieValue("AdminCode");
            this.showCheck(AdminCode);
        } else {
            this.showCheck(this.createCode(""));
        }
    },

    showCheck(a) {
        this.CodeVal = a;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "80px 'Hiragino Sans GB'";
        ctx.fillStyle = "#E8DFE8";
        ctx.fillText(a, 0, 100);
    },
    init(){
      this.jsDownCount++;
      if(this.jsDownCount < 2){
        return;
      }
      $('.loginPageWrap').show();
      this.Code();
      
      $(document).keypress(function(e) {
          // 回车键事件  
          if (e.which == 13) {
              $('input[type="button"]').click();
          }
      });
      $('input[name="pwd"]').focus(function() {
          $(this).attr('type', 'password');
      });
      $('input[type="text"]').focus(function() {
          $(this).prev().animate({ 'opacity': '1' }, 200);
      });
      $('input[type="text"],input[type="password"]').blur(function() {
          $(this).prev().animate({ 'opacity': '.5' }, 200);
      });
      $('input[name="login"],input[name="pwd"]').keyup(function() {
          var Len = $(this).val().length;
          if (!$(this).val() == '' && Len >= 5) {
              $(this).next().animate({
                  'opacity': '1',
                  'right': '30'
              }, 200);
          } else {
              $(this).next().animate({
                  'opacity': '0',
                  'right': '20'
              }, 200);
          }
      });
      var open = 0;
      var _this = this;
      layui.use('layer', function() {
          var msgalert = '专家账号:expert<br/> 项目经理账号:leader<br/> 默认密码:随便填写';
          var index = layer.alert(msgalert, { icon: 6, time: 4000, offset: 't', closeBtn: 0, title: '友情提示', btn: [], anim: 2, shade: 0 });
          layer.style(index, {
              color: '#777'
          });
          //非空验证
          $('input[type="button"]').click(function() {
              var login = $('input[name="login"]').val();
              var pwd = $('input[name="pwd"]').val();
              var code = $('input[name="code"]').val();
              if (login == '') {
                  _this.ErroAlert('请输入您的账号');
              } else if (pwd == '') {
                  _this.ErroAlert('请输入密码');
              } else if (code == '' || code.length != 4) {
                  _this.ErroAlert('输入验证码');
              } else {
                  //认证中..
                  //fullscreen();
                  $('.login').addClass('test'); //倾斜特效
                  setTimeout(function() {
                      $('.login').addClass('testtwo'); //平移特效
                  }, 300);
                  setTimeout(function() {
                      $('.authent').show().animate({ right: '24%' }, {
                          easing: 'easeOutQuint',
                          duration: 600,
                          queue: false
                      });
                      $('.authent').animate({ opacity: 1 }, {
                          duration: 200,
                          queue: false
                      }).addClass('visible');
                  }, 500);

                  //登陆
                  var JsonData = { login: login, pwd: pwd, code: code };
                  //此处做为ajax内部判断
                  var url = "";
                  /*if (JsonData.login == _this.truelogin && JsonData.pwd == _this.truepwd && JsonData.code.toUpperCase() == _this.CodeVal.toUpperCase()) {
                      url = "/Ajax/Login";
                  } else {
                      url = "/Ajax/LoginFalse";
                  }*/

                  if (JsonData.login == 'leader') {
                      url = "/Ajax/LoginLeader";
                  } else {
                      url = "/Ajax/LoginExpert";
                  }
                  _this.$axios.post(url, JsonData).then(res => {
                    $('.authent').show().animate({ right: 90 }, {
                        easing: 'easeOutQuint',
                        duration: 600,
                        queue: false,
                        complete: function(){
                          $('.authent').hide();
                          $('.login').removeClass('test');
                          if (res.data.Status == 'ok') {
                              //登录成功
                              $('.login div').fadeOut(100);
                              $('.success').fadeIn(1000);
                              $('.success').html(res.data.Text);
                              //添加路由leaderRoutes,expertRoutes, default as vueRouter
                              window.sessionStorage.setItem('user', JSON.stringify(res.data));
                              //console.log(_this);
                              setTimeout(function(){
                                if(res.data.roles.indexOf('leader') > -1){
                                  //vueRouter.addRoutes(leaderRoutes);
                                  _this.$router.push({
                                    path: '/groupLeader'
                                  });
                                }else if(res.data.roles.indexOf('expert') > -1){
                                  //vueRouter.addRoutes(expertRoutes);
                                  _this.$router.push({
                                    path: '/index'
                                  });
                                }
                              }, 500);
                          } else {
                              if (res.data.Status == "Erro") {
                                  switch (res.data.Erro) {
                                      case "500":
                                          top.location.href = '/Erro/Erro500';
                                          break;
                                      case "100001":
                                          var index = layer.alert("错误 : 错误代码 '10001'", { icon: 5, time: 2000, offset: 't', closeBtn: 0, title: '错误信息', btn: [], anim: 2, shade: 0 });
                                          layer.style(index, {
                                              color: '#777'
                                          }); 
                                          break;
                                      default:
                                          var index = layer.alert(res.data.Erro, { icon: 5, time: 2000, offset: 't', closeBtn: 0, title: '错误信息', btn: [], anim: 2, shade: 0, fix: false });
                                          layer.style(index, {
                                              color: '#777'
                                          });
                                  }
                              } else {
                                  layer.msg("未知错误！");
                              }
                          }
                        }
                    });
                    $('.authent').animate({ opacity: 0 }, {
                        duration: 200,
                        queue: false
                    }).addClass('visible');
                    $('.login').removeClass('testtwo'); //平移特效
                });
              }
          })
      })
    }

  }
}
</script>
