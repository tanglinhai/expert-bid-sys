<template>
    <div class="StandardChallengeInformation">
      <el-tabs type="border-card">
        <el-tab-pane label="硬件特征码分析">
          <el-table
            :data="tableData"
            :header-cell-style="rowClass"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="SupplieName"
              label="供应商名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="CPUSerialNumber"
              class-name="red"
              label="CPU序号">
            </el-table-column>
             <el-table-column
              prop="HardDiskSerialNumber"
              class-name="red"
              label="硬盘序列号">
            </el-table-column>
             <el-table-column
              prop="NetworkCardMACAddress"
              class-name="red"
              label="网卡MAC地址">
            </el-table-column>
             <el-table-column
              prop="IPAddress"
              class-name="red"
              label="IP地址">
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
        </el-tab-pane>
        <el-tab-pane label="雷同性分析">
          <el-table
            empty-text="暂无数据"
            :data="SametableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="450">
            </el-table-column>
            <el-table-column
              prop="SameSupplieName"
              label="供应商名称"
              width="450">
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
         tableData: [{   //硬件特征码分析数据
            SupplieName: '北京蓝天环境保护有限公司（测试）',
            CPUSerialNumber: 'BFEBFBFF000406E3',
            HardDiskSerialNumber: 'S3YLNX0M243417K',
            NetworkCardMACAddress:'50:7B:9D:8D:43:52',
            IPAddress:'192.168.156.191;36.110.50.50'
          }, {
            SupplieName: '夏丰热工研究院有限公司（测试）',
            CPUSerialNumber: 'BFEBFBFF000406E3',
            HardDiskSerialNumber: 'S3YLNX0M243417K',
            NetworkCardMACAddress:'50:7B:9D:8D:43:52',
            IPAddress:'192.168.156.191;36.110.50.50'
          }, {
            SupplieName: '钱唐江110101200501011458（测试）',
            CPUSerialNumber: 'BFEBFBFF000406E3',
            HardDiskSerialNumber: 'S3YLNX0M243417K',
            NetworkCardMACAddress:'50:7B:9D:8D:43:52',
            IPAddress:'192.168.156.191;36.110.50.50'
          }, {
            SupplieName: '广州科技信息股份有限公司（测试）',
            CPUSerialNumber: 'BFEBFBFF000406E3',
            HardDiskSerialNumber: 'S3YLNX0M243417K',
            NetworkCardMACAddress:'50:7B:9D:8D:43:52',
            IPAddress:'192.168.156.191;36.110.50.50'
          }],
          
          currentPage4: 4,
          currentPage5: 1
          
        }
      },
      mounted(){
        
      },
      methods: {
        rowClass({ row, rowIndex}) {   //表头颜色设置颜色
          console.log(rowIndex) //表头行标号为0
          return 'color:#606266'
        }
        
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
  .red{
    color:red;
  }
}
</style>
