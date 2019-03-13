<template>
  <div class="head cf">
  	<div class="logo">
			<img src="/img/logo_zzlh.png"/>
  	</div>
  	<el-menu :default-active="activeIndex" class="menu-le" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1" @click="goto('/index/indexcontent')">首页</el-menu-item>
		  <el-menu-item index="2" @click="goto('/index/projects')">评审项目</el-menu-item>
		</el-menu>


  	<el-menu :default-active="activeIndex2" class="menu-ri" mode="horizontal" @select="handleSelect">
		  <el-menu-item index="1">
		  	<a href="javascript:void(0);" @click="enviromentDialog=false"><i class="iconfont icon-huanjingjianceyi"></i>环境检测</a>
		  </el-menu-item>
		  <el-submenu index="2" popper-class="head-submenu">
		    <template slot="title">
		    	<i class="iconfont icon-jiaoseqiehuan"></i>角色切换
		    </template>
		    <el-menu-item index="5-1"><i class="iconfont icon-ABSxitong-dangqianjiaosetubiao"></i>当前角色</el-menu-item>
		    <el-menu-item index="5-2"><i class="iconfont icon-dailijigou"></i>招标代理机构</el-menu-item>
		    <el-menu-item index="5-3"><i class="iconfont icon-Viconzq-"></i>招标人</el-menu-item>
		    <el-menu-item index="5-4"><i class="iconfont icon-Viconzq-1"></i>投标人</el-menu-item>
		  </el-submenu>
		  <el-menu-item index="3">
		  	<a href="http://www.365trade.com.cn/help/index.jhtml" target="_blank"><i class="iconfont icon-bangzhu"></i>帮助</a>
		  </el-menu-item>
		  <el-menu-item index="4">
		  	<a href="http://www.365trade.com.cn/ggtz/index.jhtml" target="_blank"><i class="iconfont icon-xitonggonggao"></i>系统公告</a>
		  </el-menu-item>
		  <el-submenu index="5" popper-class="head-submenu">
		    <template slot="title">
		    	<img src=""/>张三
		    </template>
		    <el-menu-item index="5-1"><i class="iconfont icon-xiugaitouxiang"></i>修改头像</el-menu-item>
		    <el-menu-item index="5-2"><i class="iconfont icon-gerenziliao"></i>个人资料</el-menu-item>
		    <el-menu-item index="5-3"><i class="iconfont icon-xiugaimima"></i>修改密码</el-menu-item>
		    <el-menu-item index="5-4"><i class="iconfont icon-shenqing"></i>CA申请</el-menu-item>
		    <el-menu-item index="5-5"><i class="iconfont icon-bangding"></i>CA绑定</el-menu-item>
		    <el-menu-item index="5-6"><i class="iconfont icon-tuichu"></i>安全退出</el-menu-item>
		  </el-submenu>
		</el-menu>



		<el-dialog
		  title="环境检测"
		  :visible.sync="enviromentDialog"
		  width="30%"
			custom-class="enviromentDialog"
		  >
		  <div class="bd">
				
		  </div>
		</el-dialog>
  </div>
</template>

<script>
export default {
  name: 'head',
  props: {},
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      enviromentDialog: false
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goto(url){
    	this.$router.push({
    		path: url
    	});
    }
  }
}
</script>
<style lang="scss">
.head-submenu{
	.iconfont{
  	font-size: 18px;
  	padding-right: 7px;
  }
}
.enviromentDialog{
	.bd{
		height: 380px;
	}
}

.head{
	padding: 0 15px;
	background-color: #fff;
  .logo{
		float: left;
		margin-top: 7px;
  }
  .menu-le{
		float: left;
		margin-left: 25px;
  }
  .menu-ri{
		float: right;
		>.el-submenu.is-active .el-submenu__title,>.el-menu-item.is-active{
			border-bottom: none;
		}
		
  }


  .iconfont{
  	font-size: 18px;
  	padding-right: 7px;
  }
}
</style>