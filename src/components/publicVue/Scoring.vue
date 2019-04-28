<template>

</template>
<script>
    export default {
        name: 'Scoring',
        props:{
            scoreQuotationData: {
                type: Array
            },

        },
        components: {},
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            scoring() {
                this.dialogVisible = true;
            },
            sumbit() {
                var isNotFilled = false;
                for(var i=0;i<this.scoreQuotationData.length;i++){
                    if(!$.trim(this.scoreQuotationData[i].score)){
                        isNotFilled = true;
                        break;
                    }
                }
                if(isNotFilled)
                    this.$message('请先填写计算得分或者接受系统计算得分！');
                else
                    this.$emit("calcScore",this.scoreQuotationData);
            },
            reback() {

            },
          acceptanceSystemScor(){
            for(let i=0;i<this.scoreQuotationData.length;i++){
                this.scoreQuotationData[i].score = this.scoreQuotationData[i].scoringSystem;
            }
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .Scoring {
        .failureEntryDialog {
            .failureoOject {
                line-height: 38px;
                height: 38px;
                border-top: 1px dotted #ccc;
                border-bottom: 1px dotted #ccc;
            }
            .dijilun {
                line-height: 38px;
                height: 38px;
                border-bottom: 1px dotted #ccc;
                margin-bottom: 25px;
            }
        }
    }
</style>


