<template>

    <div class="beginEvaluation">
        <!--开始评标页面-->
        <!--公共部分组件-->
        <evaluationcommonVue></evaluationcommonVue>
        <!--公共部分组件-->
    </div>
</template>

<script>
    import evaluationcommonVue from '../components/publicVue/evaluationcommon.vue';
    export default {
        name: 'index',
        props: {},
        components: {
            evaluationcommonVue
        },
    }
</script>
<style lang="scss">
    .beginEvaluation {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
    }
</style>
