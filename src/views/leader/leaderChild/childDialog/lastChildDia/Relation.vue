<template>
    <div class="relation">
        <el-dialog
            title="关联投标资料"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row>
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            data:[
                {
                    label:'投标文件目录',
                    children:[
                            {label:'开标一览表'}
                    ]
                }
            ]
        }
    },
    mounted() {
        
    },
    methods: {
        save(){
            this.dialogVisible = false;
        }
    },
}
</script>

<style lang="scss">
.relation{
    
}
</style>
