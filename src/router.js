import Home from './views/Home.vue'


export const constantRouterMap = [
  {
    path: '/',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('./views/404.vue')
  }
];

export const asyncRouterMap = [
  {
    path: '/SignaturePage',
    name: 'SignaturePage',
    meta: {
      role: 'expert'
    },
    component: () => import('./views/SignaturePage.vue')  //签字
  },
  {
    path: '/LeaderSignaturePage',
    name: 'LeaderSignaturePage',
    meta: {
      role: 'expert'
    },
    component: () => import('./views/LeaderSignaturePage.vue') //组长查看
  },
  {
    path: '/index',
    name: 'index',
    // redirect: '/index/indexcontent',
    redirect: '/index/projects',
    meta: {
      role: 'expert'
    },
    component: () => import('./views/Home.vue'),
    children: [
      //首页
      // { name: '/index/indexcontent', path: '/index/indexcontent', component: () => import('./components/Index.vue') },
      //项目列表页面
      { name: '/index/projects', path: '/index/projects', meta: { role: 'expert' }, component: () => import('./components/Projects.vue') },


      //开始评标页面
      { name: '/index/beginEvaluation', path: '/index/beginEvaluation', meta: { role: 'expert' }, component: () => import('./views/evaluationpage/beginEvaluation.vue') },
      //进入页面所有信息页面
      
      
      //承诺书
      { name: '/index/LetterCommitment', path: '/index/LetterCommitment', meta: { role: 'expert' }, component: () => import('./views/evaluationpage/LetterCommitment.vue') },


      { name: '/index/AllInformation', path: '/index/AllInformation', meta: { role: 'expert' }, component: () => import('./views/evaluationpage/AllInformation.vue') },
       //进入页面所有信息页面
       { name: '/index/AllInformation_beifen', path: '/index/AllInformation_beifen', meta: { role: 'expert' }, component: () => import('./views/evaluationpage/AllInformation_beifen.vue') },
      //推荐组长页面和评标页面(包含按钮判断展示)
      { name: '/index/ElectedLeader', path: '/index/ElectedLeader', meta: { role: 'expert' }, component: () => import('./views/evaluationpage/ElectedLeader.vue') },
      //推荐组长进入推荐轮数
      { name: '/index/WheelPushing', path: '/index/WheelPushing', meta: { role: 'expert' }, component: () => import('./views/evaluationpage/WheelPushing.vue') },


      //用户信息
      { name: '/user/info', path: '/user/info', meta: { role: 'expert' }, component: () => import('./views/user/UserInfo.vue') },
      //用户头像
      { name: '/user/logo', path: '/user/logo', meta: { role: 'expert' }, component: () => import('./views/user/UserLogo.vue') },
      //用户密码
      { name: '/user/pass', path: '/user/pass', meta: { role: 'expert' }, component: () => import('./views/user/Password.vue') },




      //参加评审
      { name: '/participateIn', path: '/participateIn', meta: { role: 'expert' }, component: () => import('./views/participateIn/Index.vue') },
      //参加推举
      { name: '/elect/participateIn', path: '/elect/participateIn', meta: { role: 'expert' }, component: () => import('./views/teamLeader/ParticipateInElect.vue') },
      //开始推举
      { name: '/elect/startElect', path: '/elect/startElect', meta: { role: 'expert' }, component: () => import('./views/teamLeader/StartElect.vue') },
      //等待其他专家推举
      { name: '/elect/waitOhterElect', path: '/elect/waitOhterElect', meta: { role: 'expert' }, component: () => import('./views/teamLeader/WaitOhterElect.vue') },
       //资质审查页面
      { name: '/elect/StartEvaluation', path: '/elect/StartEvaluation', meta: { role: 'expert' }, component: () => import('./views/qualificationExam/StartEvaluation.vue') },
        //资质审查汇总页面
      { name: '/elect/UnFinishQualificationsResult', path: '/elect/UnFinishQualificationsResult', meta: { role: 'expert' }, component: () => import('./views/qualificationExam/UnFinishQualificationsResult.vue') },
        // 详细评审（技术）汇总页面
       { name: '/elect/ReviewSummary', path: '/elect/ReviewSummary', meta: { role: 'expert' }, component: () => import('./views/qualificationExam/ReviewSummary.vue') },
       { name: '/elect/ReviewSummary_1', path: '/elect/ReviewSummary_1', meta: { role: 'expert' }, component: () => import('./views/qualificationExam/ReviewSummary_1.vue') },
        //商务技术服务定档其他
       { name: '/elect/BusinessOther', path: '/elect/BusinessOther', meta: { role: 'expert' }, component: () => import('./views/qualificationExam/BusinessOther.vue') },
    ]
  },
  //临时使用-------------------------------------------------
  {
    path: '/SignaturePage',
    name: 'SignaturePage',
    meta: {
      role: 'leader'
    },
    component: () => import('./views/SignaturePage.vue')  //签字
  },
  //---------------------------------------------------------
  {
    path:'/groupLeader',
    name:'groupLeader',
    redirect: '/groupLeader/Index',
    component: () => import('./views/Home.vue'),
    meta: {
      role: 'leader'
    },
    children:[
      { name: '/groupLeader/Index', path: '/groupLeader/Index', meta: { role: 'leader' }, component: () => import('./views/leader/Index.vue')},
      { name: '/groupLeader/SignIn', path: '/groupLeader/SignIn', meta: { role: 'leader' }, component: () => import('./views/leader/SignIn.vue')},
      { name: '/groupLeader/Examination', path: '/groupLeader/Examination', meta: { role: 'leader' }, component: () => import('./views/leader/Examination.vue')},
      { name: '/groupLeader/BeConfiguration', path: '/groupLeader/BeConfiguration', meta: { role: 'leader' }, component: () => import('./views/leader/BeConfiguration.vue')},
      { name: '/groupLeader/Newaddproject', path: '/groupLeader/Newaddproject', meta: { role: 'leader' }, component: () => import('./views/leader/Newaddproject.vue')},
    ]
  }
];



var vueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})


const whiteList = [
  '/',
];
vueRouter.beforeEach((to, from, next) => {
  if(window.sessionStorage.user){//已经登陆
    var user = JSON.parse(window.sessionStorage.user);
    var store = vueRouter.app.$options.store;
    if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      const roles = user.roles;
      store.dispatch('generateRoutes', { roles }).then(() => { // 生成可访问的路由表
        vueRouter.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
        next(to.path == '/' && roles.indexOf('leader') > -1 ? '/groupLeader' : 
            to.path == '/' && roles.indexOf('expert') > -1 ? '/index' : to.fullPath); // hack方法 确保addRoutes已完成
      })
    } else {
      if (to.matched.length === 0) {
        next('/404')
      }else
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
    }
  }else{//未登陆
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/'); // 否则全部重定向到登录页
    }
  }
});

export default vueRouter;
