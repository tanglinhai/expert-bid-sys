<template>
    <div class="leader">
        <el-row class="headerBox">
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>我的评审项目</h5>
                </div>
            </el-col>
            <el-col :span="12" class="textSty">
                <div class="grid-content bg-purple-dark">
                    <el-button size="small" class="btnBg" style="margin:0 10px;" @click="newadd">新增项目</el-button>
                    <el-input
                        placeholder="项目名称关键字进行检索"
                        v-model="search_value"
                        clearable size="small" class="wi260 ">
                    </el-input>
                    <el-button type="primary"
                                size="small"
                                class=" search_btn"
                                :loading="search_loading"
                                @click="search()"
                                icon="el-icon-search">查询
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <div class="bodyBox" v-loading="bodyLoading">
            <el-collapse v-model="activeNames" @change="handleChange"  v-for="(item,index) in projectTitleData" :key="index">
                <el-collapse-item :name="index">
                    <template slot="title">
                        <span class="imgBox">
                                <img src="../../assets/img/gk.jpg" alt="" class="imgTitle">
                        </span>
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark overflowText textIndent">
                                {{item.title}} <el-button type="text" @click.stop="newadd">编辑</el-button>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark overflowText textIndent">
                                业务编号：{{item.num}}
                            </div>
                        </el-col>
                    </template>
                    <el-row class="contentBox" v-for="(stemp,subIndex) in item.bagConMsg" :key="subIndex" >
                        <el-col :span="3">
                            <div class="grid-content bg-purple-dark overflowText">
                                当前标包：<span class="stempBox">{{stemp.bag}}</span>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple-dark overflowText">
                                项目负责人：{{stemp.pName}}
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="grid-content bg-purple-dark overflowText">
                                评标状态：{{stemp.nowStatus}}
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content bg-purple-dark overflowText">
                                评标进度：{{stemp.progre}}
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark">
                                <div v-if="stemp.beFlag">
                                    <el-button size="small" @click="chModi(stemp,subIndex)">编辑</el-button>
                                    <el-button size="small" @click="beConfig(stemp.beFlag)">评标配置</el-button>
                                    <el-button class="btnBg" size="small" @click="stemp.beFlag = !stemp.beFlag">开始评标</el-button>
                                    <el-button size="small" v-if="!stemp.beFlag">暂停评标</el-button>
                                </div>
                                <div v-else>
                                    <el-button size="small" @click="chModi(stemp,subIndex)">编辑</el-button>
                                    <el-button size="small" @click="beConfig(stemp.beFlag)">评标配置</el-button>
                                    <el-button type="primary" size="small" @click="imbeView(item,stemp)">我要评标</el-button>
                                    <el-button type="primary" size="small" @click="goto">查看评标</el-button> 
                                    <el-button size="small" class="btnBg" @click="stopBe(stemp)" v-text=" stemp.btnStatus == 0 ? '暂停评标' : '恢复评标' "></el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="loadBox">
                        <el-col :span="24">
                            <div class="grid-content bg-purple-dark">
                                <el-button type="text" size="small" :loading="item.loadMore" :icon="item.loadMore == false ? 'el-icon-caret-bottom' : ''" @click="loadMoreBag(item)">加载更多</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="pageBox">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
            >
            </el-pagination>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            search_value:'',
            search_loading:false,
            projectTitleData:[],
            activeNames:0,
            bodyLoading:false,
            currentPage: 1,
            randomParams:Math.floor(Math.random()*2),
        }
    },
    mounted() {
        $(".NavCommon").hide();
        $(".CommonProject").hide();
        this.init();
    },
    methods: {
        newadd(){
            // this.$router.push('/groupLeader/Newaddproject');
            this.$router.push({
                path:'/groupLeader/Newaddproject',
                query:{
                    statu:'newAdd',
                    append:'newPro'
                }
            })
        },
        chModi(val,index){
            // console.log(val,index);
            window.localStorage.setItem('beFlag',val.beFlag);
            this.$store.state.curreentBagMsg = val;
            this.$router.push({
                path:'/groupLeader/Newaddproject',
                query:{
                    statu:'newAdd',
                    modi:'bagMsg'
                }
            })
        },
        imbeView(val,stemp){
            window.localStorage.setItem('sub','0');
            this.$router.push('/groupLeader/Examination');
        },
        goto(){
            switch(this.randomParams){
                case 0:
                    return this.$router.push('/groupLeader/SignIn');
                case 1:
                    window.localStorage.setItem('sub','1');
                    this.$router.push('/groupLeader/Examination');
                    return;
            }
        },
        init(){
            this.bodyLoading=true;
            this.$axios.post('/api/leaderBagMsg').then(res => {
                if(res.status == 200){
                    // console.log(res);
                    this.bodyLoading=false;
                    this.projectTitleData = res.data.bagTitleMsg;
                }
            })
        },
        search(){
            if(this.search_value == '' || this.search_value == undefined){
                this.$message({
                    message: '请输入关键字再查询',
                    type: 'warning',
                    center: true
                });
            }else{
                this.bodyLoading=true;
                this.search_loading=true;
                this.$axios.post('/api/leaderBagMsg',{
                    value:this.search_value,
                }).then(res => {
                    if(res.status == 200){
                        this.search_loading=false;
                        this.bodyLoading=false;
                        this.projectTitleData = res.data.bagTitleMsg;
                        this.seach_value="";
                    }
                })
            }
        },
        handleChange(val) {
            console.log(val);
        },
        handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageLoading = true;
            this.init();
        },
        // 暂停评标
        stopBe(data){
          data.btnStatus == 0 ? data.btnStatus = 1 : data.btnStatus = 0; 
        },
        beConfig(val){
            // console.log(val,'+++++++++++++++++++++++++++');
            window.localStorage.setItem('beFlag',val);
            this.$router.push('/groupLeader/BeConfiguration');
        },
        loadMoreBag(val){
            val.loadMore = true;
            this.$axios.post('/api/leaderBagMsg').then(res => {
                if(res.status == 200){
                    val.loadMore = false;
                    this.projectTitleData = res.data.bagTitleMsg;
                    this.projectConData = res.data.bagConMsg;
                }
            })
        }
    },
}
</script>



<style lang="scss">
@import '../../assets/css/common/font.scss'; 
@import '../../assets/css/common/common.scss';
.home .WrapBig .Router{
    padding-left: 20px;
}
.leader{
    padding:15px 20px 15px 20px;
    .headerBox{
        background: #fff;
        padding:15px;
        border-bottom: 1px solid #f3f3f3;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        line-height: 31px;
        .textSty{
            text-align: right;
        }
        .commonTitle::before{
            margin-top: 6px;
        }
    }
    .bodyBox{
        padding: 15px;
        background: #fff;
        .el-collapse{
            border:none;
            margin-bottom:15px;
            .el-collapse-item__arrow{
                color: #000104;
                font-weight: bold;
                font-size: 14px;
            }
        }
        .el-collapse-item__wrap{
            border-bottom: none;
        }
        .el-collapse-item__content{
            padding-bottom: 0px;
        }
        .el-collapse-item__header{
            background: #f0f3f5;
            border: 1px solid #d9e0e7;
            padding-right:8px;
        }
        .imgBox{
            display: inline-block;
            padding-left: 18px;
            .imgTitle{
                width: 49px;
                height: 49px;
                vertical-align: middle;
            }
        }
        .textIndent{
            text-indent: 15px;
        }
        .loadBox{
            border-bottom: 1px solid #d9e0e7;
            border-left: 1px solid #d9e0e7;
            border-right: 1px solid #d9e0e7;
            line-height: 40px;
            text-align: center;
            &:hover{
                background: #f9fafc;
                cursor: pointer;
            }
        }
        .contentBox{
            border-bottom: 1px solid #d9e0e7;
            padding-left: 15px;
            padding-right: 15px;
            border-left: 1px solid #d9e0e7;
            border-right: 1px solid #d9e0e7;
            line-height: 68px;
            .stempBox{
                border: 1px solid #409EFF;
                border-radius: 20px;
                padding: 4px 7px;
                font-size: 10px;
                color: #409EFF;
            }
        }
        
    }
    .pageBox{
        text-align: right;
        background: #fff;
        padding: 15px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
}
</style>
