<template>
    <div>
        <startVauation :type="type">></startVauation>
        <!--<start-evaluation :type="type"></start-evaluation>-->
    </div>
</template>

<script>
    import startVauation from '../../components/publicVue/startVauation.vue';
    export default {
        name: "start-evaluation-fhx",
        components: {
            startVauation
        },
        data() {
            return {
                type: 4
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