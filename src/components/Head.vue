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

		<!--环境检测弹框-->
		<el-dialog
		class="environmentDialog"
		title="您还没有安装必备得组件，请先下载环境检测工具安装系统必备组件"
		:visible.sync="environmentTestDialogVisible"
		width="40%"
		center
		>
			<el-row :gutter="20" class="environmentFirst">
				<el-col :span="18" :offset="3" class="environmentFirstBg">
					<div class="grid-content bg-purple environmentFirstCot">
						<div class="environmentFirst_icon">
							<i class="el-icon-warning"></i>
						</div>
						<span>尚未安装请先下载并安装</span>
						<a href="http://365trade-pub.cn-bj.ufileos.com/client/tools-test/Installers/ZZLH.EA.Installer.exe">
							<i class="el-icon-download" id="envDownload">下载环境检测工具 </i>
						</a>
					</div>
				</el-col>
				<el-col :span="18" :offset="3" class="environmentFirstBg">
					<div class="grid-content bg-purple environmentFirstCot">
						<i class=" icon iconfont icon-1 xe664 mr20 ver_al_m" ></i>
						<div class="environmentFirst_icon">
							<i class="el-icon-circle-check"></i>
						</div>
						<span>已安装检测工具可直接启动</span>
						<a href="javascript:;">
							<i class="el-icon-download" id="envDownload">启动环境检测工具 </i>
						</a>
					</div>
				</el-col>
			</el-row>
		</el-dialog>
		<!--环境检测弹框-->
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
			environmentTestDialogVisible: true,  //环境检测弹框默认展开
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
.v-modal{
	top:61px;
}
.environmentDialog{
	.el-dialog__title{
		color:red;
		font-size:14px;
	}
}
.environmentFirst{
	.environmentFirstBg{
		padding-top:20px;
		padding-bottom:20px;
		margin-bottom:20px;
		&:hover{
			background:#f6f6f6;
			border-radius:5px;
		}
	}
	.environmentFirstCot{
		text-align: center;
		span{
			display:block;
			text-align:center;
			margin-bottom: 15px;
			font-size: 14px;
			color: #666;
			font-weight: bold;
		}
		a{
			color: #fff;
    	background-color: #409eff;
			display: inline-block;
			padding:10px 15px;
			border-radius:4px;
			&:hover{
				background:#66b1ff;
			}
		}
	}
	.environmentFirst_icon{
		
		i{
			font-size:30px;
			display:block;
			margin:0 auto 10px;
			color:#409eff;
		}
	}
}
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