import Home from './views/Home.vue'


var routes = [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('./views/Home.vue')
    }
  ];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
