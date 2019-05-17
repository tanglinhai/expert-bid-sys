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
                                {{item.title}}
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-dark overflowText textIndent">
                                业务编号：{{item.num}}
                            </div>
                        </el-col>
                    </template>
                    <el-row class="contentBox" v-for="(stemp,index) in projectConData" :key="index" >
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
                        <el-col :span="8">
                            <div class="grid-content bg-purple-dark overflowText">
                                评标进度：{{stemp.progre}}
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content bg-purple-dark">
                                <div v-if="stemp.beFlag">
                                    <el-button class="btnBg" size="small" @click="stemp.beFlag = !stemp.beFlag">开始评标</el-button>
                                    <el-button size="small">暂停评标</el-button>
                                </div>
                                <div v-else>
                                    <el-button type="primary" size="small" @click="imbeView">我要评标</el-button>
                                    <el-button type="primary" size="small" @click="goto">查看评标</el-button> 
                                    <el-button size="small" class="btnBg" @click="stopBe(stemp)" v-text=" stemp.btnStatus == 0 ? '暂停评标' : '恢复评标' "></el-button>
                                </div>
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
            projectConData:[],
            activeNames:0,
            bodyLoading:false,
            currentPage: 1,
            randomParams:Math.floor(Math.random()*3),
        }
    },
    mounted() {
        $(".NavCommon").hide();
        this.init();
    },
    methods: {
        imbeView(){
            this.$router.push('/groupLeader/Examination?be=makeBe');
        },
        goto(){//开始评标
            switch(this.randomParams){
                case 0:
                    this.$router.push('/groupLeader/SignIn');
                    break;
                case 1:
                    this.$router.push('/groupLeader/Examination?be=see');
                    break;
                case 2:
                    this.$router.push('/groupLeader/ViewBe');
                    break;
            }
        },
        init(){
            this.bodyLoading=true;
            this.$axios.post('/api/leaderBagMsg').then(res => {
                if(res.status == 200){
                    // console.log(res);
                    this.bodyLoading=false;
                    this.projectTitleData = res.data.bagTitleMsg;
                    this.projectConData = res.data.bagConMsg;
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
                        this.projectConData = res.data.bagConMsg;
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
