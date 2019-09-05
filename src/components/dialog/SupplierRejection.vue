<template>
    <div class="StandardChallengeInformation">
      <el-tabs type="border-card">
        <el-tab-pane label="未否决供应商">
          <el-row class="borderLine">
              <el-col :span="22"><div class="grid-content bg-purple-dark">
                  <el-input placeholder="快速查找" size="medium"  v-model="search"></el-input>
              </div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple-dark fr">
                  <div class="block">
                      <el-button type="primary" size="medium" @click="foujueBtn()">否决</el-button>
                      <!-- <el-button  size="medium" @click="close">关闭</el-button> -->
                  </div>
              </div></el-col>
          </el-row>
          <div class="fiexd">
              全选/全不选
          </div>
          <el-table
            :data="tableData.filter(data => !search || data.SupplieName.toLowerCase().includes(search.toLowerCase()))"
            ref="multipleTable"
            stripe
            @selection-change="Change"
            row-key="ID"
            style="width: 100%">
            <el-table-column
              type="selection"
              prop="ID" 
              :reserve-selection="true" 
              width="150">
            </el-table-column>
            <el-table-column
              prop="SupplieName"
              label="供应商名称">
            </el-table-column>
            <el-table-column
              prop="SupplieStatus"
              label="状态">
            </el-table-column>
            <el-table-column
              label="否决原因">
                <template slot-scope="scope">
                    <div class="grid-content bg-purple-light">
                        <el-input class="ValueEmpty" required style="width:80%" v-model="scope.row.RejectReason"></el-input>
                    </div>
                </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin:10px auto; text-align:center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="10">
            </el-pagination>
          </div>
          <el-dialog
            title="选中后的数据"
            :visible.sync="centerDialogVisible"
            width="25%"
            center
            append-to-body
            >
            <div>
                <el-table v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          element-loading-background="rgba(0, 0, 0, 0.8)"
                          stripe
                          style="width: 100%"
                          :data="selectTableUndData"
                          ref='unTab'
                >
                    <el-table-column prop="SupplieName" label="供应商名称"></el-table-column>
                    <el-table-column prop="SupplieStatus" label="状态"></el-table-column>
                    <el-table-column prop="RejectReason" label="否决原因"></el-table-column>
                </el-table> 
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="confirm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
            </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="已否决供应商">
          <el-row class="borderLine">
              <el-col :span="22"><div class="grid-content bg-purple-dark">
                  <el-input placeholder="快速查找" size="medium"  v-model="searchDeny"></el-input>
              </div></el-col>
              <el-col :span="2"><div class="grid-content bg-purple-dark fr">
                  <div class="block">
                      <el-button type="primary" size="medium" @click="centerDialogVisibleDeny=true">恢复</el-button>
                      <!-- <el-button  size="medium" @click="close">关闭</el-button> -->
                  </div>
              </div></el-col>
          </el-row>
          <div class="fiexd">
              全选/全不选
          </div>
          <el-table
            ref="TableDeny"
            empty-text="暂无数据"
            :data="SametableData.filter(data => !searchDeny || data.SupplieName.toLowerCase().includes(searchDeny.toLowerCase()))"
            @selection-change="changeDeny"
            row-key="ID"
            style="width: 100%">
            <el-table-column width="150" type="selection" prop="ID" :reserve-selection="true"></el-table-column>
            <el-table-column
              prop="SupplieName"
              label="供应商名称"
              >
            </el-table-column>
            <el-table-column
              prop="SupplieStatus"
              label="状态"
              >
            </el-table-column>
            <el-table-column 
              prop="RejectPhase" 
              label="否决阶段"
              >
            </el-table-column>
            <el-table-column 
              prop="RejectReason" 
              label="否决原因"
              >
            </el-table-column>
          </el-table>
          <div class="block" style="margin:10px auto; text-align:center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage5"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="10">
            </el-pagination>
          </div>
          <el-dialog
            title="选中后的数据"
            :visible.sync="centerDialogVisibleDeny"
            width="25%"
            center
            append-to-body
            >
              <div>
                  <el-table v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            stripe
                            style="width: 100%"
                            :data="selectTableDataDeny"
                            ref='unTab'
                  >
                      <el-table-column prop="SupplieName" label="供应商名称"></el-table-column>
                      <el-table-column prop="SupplieStatus" label="状态"></el-table-column>
                  </el-table> 
              </div>
              <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="confirm">确 定</el-button>
                      <el-button @click="cancelDeny">取 消</el-button>
              </span>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
    // const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "ClusterAnalysis",
        props:{
         
        },
      data() {
        return {
         tableData: [{   //未否决供应商
            SupplieName: '北京蓝天环境保护有限公司（测试）',
            SupplieStatus: '未否决',
            RejectReason:'',
            ID:'11111',
          }, {
            SupplieName: '夏丰热工研究院有限公司（测试）',
            SupplieStatus: '未否决',
            RejectReason:'',
            ID:'222222',
          }],
          SametableData:[{//已否决供应商
            SupplieName: '北京蓝天环境保护有限公司（测试）',
            SupplieStatus: '未否决',
            RejectReason:'SDFSSSDF',
            RejectPhase:'符合性评审',
            ID:'11111',
          },{
            SupplieName: '大连跃胜贸易有限公司',
            SupplieStatus: '未否决',
            RejectReason:'SDFSSSDF',
            RejectPhase:'符合性评审',
            ID:'44444444',
          }],
          //multipleSelection:[],
          currentPage4: 4,
          currentPage5: 1,
          search: '',//未否决供应商搜索输入值
          searchDeny:'',//已否决供应商搜索输入值
          centerDialogVisible: false,  //否决点击弹框
          selectTableUndData:[],   //弹框数据推进

          centerDialogVisibleDeny:false,
          selectTableDataDeny:[],
        }
      },
      mounted(){
        
      },
      methods: {
        Change(val) {
          this.selectTableUndData = val;
          //console.log(this.multipleSelection,val,this.selectTableUndData,99999)
        },
        changeDeny(val){
          this.selectTableDataDeny = val;
        },
        foujueBtn(){   //未否决供应商否决按钮
          var count = this.selectTableUndData.length;
          var count1 = 0;
          if(this.selectTableUndData.length==0){
            this.centerDialogVisible=true;
          }else{
            this.selectTableUndData.forEach(function (item) {
                console.log(item);
                if (item.RejectReason == ''||item.RejectReason==undefined) {
                    count1--;
                }else{
                    count1++;
                }
            });
            if(count1==count){
                this.centerDialogVisible=true;
            }else{
                this.$message.error('否决原因不能为空！');
            }
           }
        },
        cancel() {    
           this.centerDialogVisible=false;
           this.selectTableUndData.forEach(function (item) {
               console.log(item,44444);
               item.RejectReason = ''
            });
           this.$refs.multipleTable.clearSelection();
        },
        cancelDeny() {
            this.centerDialogVisibleDeny = false;
            this.$refs.TableDeny.clearSelection();
        },
        
      }
    }
</script>

<style lang="scss">
.StandardChallengeInformation{
  .tishiWrap{
    width:740px;
    margin:10px auto;
    display: none;
    .tishi{
      width:740px;
      border:1px solid #ccc;
      .xiaolian{
        width:100%;
        background:#ebeff3;
        height:76px;
        img{
          display: block;
          height:80px;
          margin:0px auto;
          vertical-align: middle;
        }
      }
      .tishi_wenzi{
        text-align: center;
        color:#000000;
        line-height:40px;
      }
    }
    .sureBtns{
      display: block;
      margin:10px auto;
    }
    .djsTime{
      text-align: center;
      color:#000000;
      line-height:40px;
      span{
        color:red;
        display: inline-block;
        padding:0px 3px;
      }
    }
  }
  .MinHeight{
    .MinHeightMore{
      .el-textarea__inner{
        min-height:40px!important;
      }
    }
    .el-input__inner{
      min-height:40px!important;
    }
  }
  .fiexd {
      font-size: 14px;
      color: #909399;
      position: absolute;
      top: 64px;
      left: 48px;
      z-index: 1;
  }
}
</style>
