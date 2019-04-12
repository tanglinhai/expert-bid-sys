<template>
  <div class="home">
  	<Head/>
    <transition :name="transitionName">
      <router-view class="Router"/>
    </transition>
  	<Foot/>
  </div>
</template>
<style lang="scss">
.home{
  /* .Router{
    position: absolute;
    width: 100%;
    transition: all .8s ease;
    top: 40px;
  }
  .slide-left-enter,
  .slide-right-leave-active{
    opacity: 0;
    transform: translate(100%, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter{
    opacity: 0;
    transform: translate(-100% 0);
  } */
}
</style>
<script>
// @ is an alias to /src
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
export default {
  name: 'home',
  data() {
    return {
      transitionName: 'slide-right'  // 默认动态路由变化为slide-right
    }
  },
  components: {
    Head,
    Foot
  }
}
</script>
