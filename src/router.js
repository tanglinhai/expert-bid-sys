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

        //开始评标页面lp
        { name: '/index/beginEvaluation', path: '/index/beginEvaluation', component: () => import('./views/evaluationpage/beginEvaluation.vue') },


        //用户信息
        { name: '/user/info', path: '/user/info', component: () => import('./views/user/UserInfo.vue') },
        //用户头像
        { name: '/user/logo', path: '/user/logo', component: () => import('./views/user/UserLogo.vue') },
        //用户密码
        { name: '/user/pass', path: '/user/pass', component: () => import('./views/user/Password.vue') },




        //参加评审
        { name: '/participateIn', path: '/participateIn', component: () => import('./views/participateIn/Index.vue') },
        //参加推举
        { name: '/elect/participateIn', path: '/elect/participateIn', component: () => import('./views/teamLeader/ParticipateInElect.vue') },
        //开始推举
        { name: '/elect/startElect', path: '/elect/startElect', component: () => import('./views/teamLeader/StartElect.vue') },
        //等待其他专家推举
        { name: '/elect/waitOhterElect', path: '/elect/waitOhterElect', component: () => import('./views/teamLeader/WaitOhterElect.vue') },
         //资质审查页面
        { name: '/elect/StartEvaluation', path: '/elect/StartEvaluation', component: () => import('./views/qualificationExam/StartEvaluation.vue') },
      ]
    }
  ];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
