import "babel-polyfill";
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


import './assets/css/iconFonts/iconfont.css';
import commonJs from '@/assets/js/common/common.js';
// import '../public/js/plugins/zTree/css/zTreeStyle.css'
// import '../public/js/plugins/jquery.ztree.core.js'



import './mock/mock';
import './mock/lp';
import './mock/leader'
import './mock/pdf'

Vue.prototype.$commonJs = commonJs;
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;

window.$vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
