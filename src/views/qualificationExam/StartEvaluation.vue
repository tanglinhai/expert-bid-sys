<template>
   <div>
       <startVauation :type="type">></startVauation>
   </div>
</template>

<script>
    import startVauation from '../../components/publicVue/startVauation.vue';
    export default {
        name: "start-evaluation",
        components: {
            startVauation
        },
        data() {
            return {
               type: 1
            }
        },
        mounted() {

        },
        computed: {},
        methods: {}
    }
</script>

<style lang="scss">

</style>