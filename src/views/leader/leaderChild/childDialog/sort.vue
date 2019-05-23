<template>
    <div class="sort">
        <el-dialog
            title="增加审查类别"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <div class="sortList" v-for="(item,index) in 3" :key="index" :class="{'setBg':index == sub}" @click="setBg(index)">{{index}}</div>
            <el-button size="mini" @click="handSort">上</el-button>
            <el-button size="mini" @click="handSort">下</el-button>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            sub:'undefined',
        }
    },
    mounted() {
        
    },
    methods: {
        setBg(index){
            this.sub=index;
        },
        handSort(){
            
        }
    },
}
</script>

<style lang="scss">
.sort{
    .setBg{
        background: red;
    }
}
</style>
