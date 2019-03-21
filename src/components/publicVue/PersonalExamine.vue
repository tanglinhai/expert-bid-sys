<template>
   <div class="personal_examine">
       <el-row >
           <h6 class="pl15  col747 pt15 pb10">审查项</h6>
           <div class="content_wrap">
               <div class="zTreeDemoBackground left">
                   <ul id="treeDemo" class="ztree">{{msg}}</ul>
               </div>
           </div>
       </el-row>
   </div>
</template>

<script>
    function dblClickExpand(treeId, treeNode) {
        return treeNode.level > 0;
    }
    export default {
        name: "personal -examine",
        props:{
            msg: {
                type: Array
            },
        },
        components: {},
        data () {
            return {
                msgBox:[],
                setting : {   //zTree配置
                    view: {
                        dblClickExpand: dblClickExpand,
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                },
                zNodes:[]//zTree数据
            }
        },
        computed: {

        },
        mounted(){
            this.$axios.post('/api/treeData').then(res => {
                if (res.status === 200) {
                    this.zNodes=res.data.tableData;
                    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
                }
            });
            setTimeout(function(){
                $("#treeDemo_1_a").addClass("curSelectedNode");
            },200);
        },
        methods: {
            personalAuditFormBtn(){

            }
        }
    }
</script>

<style lang="scss">
    .personal_examine{


    }

</style>