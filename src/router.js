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


        //开始评标页面
        { name: '/index/beginEvaluation', path: '/index/beginEvaluation', component: () => import('./views/evaluationpage/beginEvaluation.vue') },
        //进入页面所有信息页面
        { name: '/index/AllInformation', path: '/index/AllInformation', component: () => import('./views/evaluationpage/AllInformation.vue') },
        //推荐组长页面和评标页面(包含按钮判断展示)
        { name: '/index/ElectedLeader', path: '/index/ElectedLeader', component: () => import('./views/evaluationpage/ElectedLeader.vue') },
        //推荐组长进入推荐轮数
        { name: '/index/WheelPushing', path: '/index/WheelPushing', component: () => import('./views/evaluationpage/WheelPushing.vue') },


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
          //资质审查汇总页面
        { name: '/elect/UnFinishQualificationsResult', path: '/elect/UnFinishQualificationsResult', component: () => import('./views/qualificationExam/UnFinishQualificationsResult.vue') },
          //全部提交页面
         { name: '/elect/SubmitResult', path: '/elect/SubmitResult', component: () => import('./views/qualificationExam/SubmitResult.vue') },
          // 符合性审查项页面
         { name: '/elect/StartEvaluation_fhx', path: '/elect/StartEvaluation_fhx', component: () => import('./views/qualificationExam/StartEvaluation_fhx.vue') },
          // 符合性审查项汇总页面
         { name: '/elect/UnFinishQualificationsResult_fhx', path: '/elect/UnFinishQualificationsResult_fhx', component: () => import('./views/qualificationExam/UnFinishQualificationsResult_fhx.vue') },
          // 详细评审（技术）页面
         { name: '/elect/StartEvaluation_xxjs', path: '/elect/StartEvaluation_xxjs', component: () => import('./views/qualificationExam/StartEvaluation_xxjs.vue') },
          // 详细评审（技术）汇总页面
          { name: '/elect/UnFinishQualificationsResult_xxjs', path: '/elect/UnFinishQualificationsResult_xxjs', component: () => import('./views/qualificationExam/UnFinishQualificationsResult_xxjs.vue') },
          // 详细评审（技术）汇总页面
          { name: '/elect/ReviewSummary', path: '/elect/ReviewSummary', component: () => import('./views/qualificationExam/ReviewSummary.vue') },
      ]
    }
  ];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
