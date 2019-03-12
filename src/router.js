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
      redirect: '/index/indexcontent',
      component: () => import('./views/Home.vue'),
      children: [
        //首页
        { name: '/index/indexcontent', path: '/index/indexcontent', component: () => import('./components/Index.vue') },
        //项目列表页面
        { name: '/index/projects', path: '/index/projects', component: () => import('./components/Projects.vue') },
      ]
    }
  ];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
