<template>
  <div class="unlock">
    <el-dialog
      title="tishi"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      center
    >
      <div slot="title" class="header-title">
        <el-row class="titleBox">
          <el-col :span="24">
            <div class="commonTitle" style="padding-top:6px;color:#348fe2;font-weight:bold;">评标解锁</div>
          </el-col>
        </el-row>
      </div>
      <el-row class="bodyBox">
          <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                  prop="sqr"
                  label="申请人">
              </el-table-column>
              <el-table-column
                  prop="scjd"
                  label="审查阶段" >
              </el-table-column>
              <el-table-column
                  prop="sqrq"
                  label="申请日期">
              </el-table-column>
              <el-table-column
                  prop="zt"
                  label="状态">
              </el-table-column>
              <el-table-column
                  prop="sqyy"
                  label="申请原因">
              </el-table-column>
          </el-table>
      </el-row>
      <span slot="footer">
        <el-button size="small" @click="dialogVisible = false">返 回</el-button> 
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
        tableData:[],
        dialogVisible:false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
        this.$axios.post('./api/ppycjl').then(res => {
            if(res.status == 200){
                this.tableData = res.data.data;
            }
        })
    }
  }
};
</script>


<style lang="scss">
@import '../../../assets/css/common/common.scss';
.unlock{
    .bodyBox{
        line-height:40px;
        .textRight{
            text-align: right;
        }
    }
    @include common-el-table;
}
</style>
