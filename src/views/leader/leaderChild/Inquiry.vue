<template>
    <div class="inquiry">
        <el-dialog
            title="标中质询信息列表"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        type="index">
                    </el-table-column>
                    <el-table-column
                        prop="cont"
                        label="质询内容">
                    </el-table-column>
                    <el-table-column
                        prop="twTime"
                        label="提问时间">
                    </el-table-column>
                    <el-table-column
                        prop="hfTime"
                        label="要求回复时间">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="提问时间">
                    </el-table-column>
                </el-table>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            tableData:[],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/inquiry').then(res => {
                if(res.status == 200){
                    this.tableData = res.data.data;
                }
            })
        }
    },
}
</script>

<style lang="scss">
.inquiry{

}
</style>
