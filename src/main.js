import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


import './assets/css/iconFonts/iconfont.css';
import commonJs from '@/assets/js/common/common.js';
import './mock/mock';

Vue.prototype.$commonJs = commonJs;
Vue.config.productionTip = false;
Vue.prototype.$axios=axios;

window.$vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
