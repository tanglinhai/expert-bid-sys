<template>
  <div class='loginPage'>
    <div class='login'>
      <div class='login_title'>
          <span>管理员登录</span>
      </div>
      <div class='login_fields'>
          <div class='login_fields__user'>
            <div class='icon'><img alt="" src='/js/plugins/jQueryLogin/img/user_icon_copy.png'/></div>
            <input name="login" placeholder='用户名' maxlength="16" type='text' autocomplete="off" value="kbcxy" />
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
          <p>欢迎登陆后台管理系统</p>
      </div>
    </div>
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
    <div class="OverWindows"></div>
  </div>
</template>
<style lang="scss">
.loginPage{
  display: none;
}
</style>
<script>
export default {
  name: 'login',
  data() {
    return {
      jsDownCount: 0,
      CodeVal: 0,
      truelogin: "kbcxy",
      truepwd: "mcwjs",

      canGetCookie: 0, //是否支持存储Cookie 0 不支持 1 支持
      ajaxmockjax: 1, //是否启用虚拟Ajax的请求响 0 不启用  1 启用
    };
  },
  components: {
    
  },
  created(){
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/jQueryLogin/layui/css/layui.all.css',
        download_files_key: '/js/plugins/jQueryLogin/layui/css/layui.all.css'
    });
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/jQueryLogin/css/styles.css',
        download_files_key: '/js/plugins/jQueryLogin/css/styles.css'
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
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/jQueryLogin/js/Particleground.js',
        download_files_key: '/js/plugins/jQueryLogin/js/Particleground.js',
        callback: this.init
    });

  },
  methods: {
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
      if(this.jsDownCount < 3){
        return;
      }
      $('.loginPage').show();
      this.Code();
      
      $(document).keypress(function(e) {
          // 回车键事件  
          if (e.which == 13) {
              $('input[type="button"]').click();
          }
      });
      //粒子背景特效
      $('body').particleground({
          dotColor: '#E8DFE8',
          lineColor: '#133b88'
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
        layer.alert('你好么，体验者');
          var msgalert = '默认账号:' + _this.truelogin + '<br/> 默认密码:' + _this.truepwd;
          var index = layer.alert(msgalert, { icon: 6, time: 400000, offset: 't', closeBtn: 0, title: '友情提示', btn: [], anim: 2, shade: 0 });
          layer.style(index, {
              color: '#777'
          });
          //非空验证
          $('input[type="button"]').click(function() {
              var login = $('input[name="login"]').val();
              var pwd = $('input[name="pwd"]').val();
              var code = $('input[name="code"]').val();
              if (login == '') {
                  ErroAlert('请输入您的账号');
              } else if (pwd == '') {
                  ErroAlert('请输入密码');
              } else if (code == '' || code.length != 4) {
                  ErroAlert('输入验证码');
              } else {
                  //认证中..
                  fullscreen();
                  $('.login').addClass('test'); //倾斜特效
                  setTimeout(function() {
                      $('.login').addClass('testtwo'); //平移特效
                  }, 300);
                  setTimeout(function() {
                      $('.authent').show().animate({ right: -320 }, {
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
                  if (JsonData.login == _this.truelogin && JsonData.pwd == _this.truepwd && JsonData.code.toUpperCase() == _this.CodeVal.toUpperCase()) {
                      url = "/Ajax/Login";
                  } else {
                      url = "/Ajax/LoginFalse";
                  }

                  _this.$axios.post(url, JsonData).then(res => {
                    setTimeout(function() {
                        $('.authent').show().animate({ right: 90 }, {
                            easing: 'easeOutQuint',
                            duration: 600,
                            queue: false
                        });
                        $('.authent').animate({ opacity: 0 }, {
                            duration: 200,
                            queue: false
                        }).addClass('visible');
                        $('.login').removeClass('testtwo'); //平移特效
                    }, 2000);
                    setTimeout(function() {
                        $('.authent').hide();
                        $('.login').removeClass('test');
                        if (res.data.Status == 'ok') {
                            //登录成功
                            $('.login div').fadeOut(100);
                            $('.success').fadeIn(1000);
                            $('.success').html(res.data.Text);
                            //跳转操作

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
                                        var index = layer.alert(res.data.Erro, { icon: 5, time: 2000, offset: 't', closeBtn: 0, title: '错误信息', btn: [], anim: 2, shade: 0 });
                                        layer.style(index, {
                                            color: '#777'
                                        }); 
                                }
                            } else {
                                layer.msg("未知错误！");
                            }
                        }
                    }, 2400);
                });
              }
          })
      })
      var fullscreen = function() {
          var elem = document.body;
          if (elem.webkitRequestFullScreen) {
              elem.webkitRequestFullScreen();
          } else if (elem.mozRequestFullScreen) {
              elem.mozRequestFullScreen();
          } else if (elem.requestFullScreen) {
              elem.requestFullscreen();
          } else {
              //浏览器不支持全屏API或已被禁用  
          }
      }
    }

  },

  mounted(){
    
  }
}
</script>
