<template>
  <div class="home">
  	<Head/>
    <router-view/>
  	<Foot/>
  </div>
</template>
<style lang="scss">
.home{
	
	
}
</style>
<script>
// @ is an alias to /src
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
export default {
  name: 'home',
  components: {
    Head,
    Foot
  }
}
</script>
