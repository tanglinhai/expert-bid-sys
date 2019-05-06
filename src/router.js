import Home from './views/Home.vue'


var routes = [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/SignaturePage',
      name: 'SignaturePage',
      component: () => import('./views/SignaturePage.vue')  //签字
    },
    {
      path: '/LeaderSignaturePage',
      name: 'LeaderSignaturePage',
      component: () => import('./views/LeaderSignaturePage.vue') //组长查看
    },
    {
      path: '/index',
      name: 'index',
      // redirect: '/index/indexcontent',
      redirect: '/index/projects',
      component: () => import('./views/Home.vue'),
      children: [
        //首页
        // { name: '/index/indexcontent', path: '/index/indexcontent', component: () => import('./components/Index.vue') },
        //项目列表页面
        { name: '/index/projects', path: '/index/projects', component: () => import('./components/Projects.vue') },


        //开始评标页面
        { name: '/index/beginEvaluation', path: '/index/beginEvaluation', component: () => import('./views/evaluationpage/beginEvaluation.vue') },
        //进入页面所有信息页面
        
        
        //承诺书
        { name: '/index/LetterCommitment', path: '/index/LetterCommitment', component: () => import('./views/evaluationpage/LetterCommitment.vue') },


        { name: '/index/AllInformation', path: '/index/AllInformation', component: () => import('./views/evaluationpage/AllInformation.vue') },
         //进入页面所有信息页面
         { name: '/index/AllInformation_beifen', path: '/index/AllInformation_beifen', component: () => import('./views/evaluationpage/AllInformation_beifen.vue') },
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
          // 详细评审（技术）汇总页面
         { name: '/elect/ReviewSummary', path: '/elect/ReviewSummary', component: () => import('./views/qualificationExam/ReviewSummary.vue') },
          //商务技术服务定档其他
         { name: '/elect/BusinessOther', path: '/elect/BusinessOther', component: () => import('./views/qualificationExam/BusinessOther.vue') },
      ]
    },
    // 组长
    {
      path:'/groupLeader',
      name:'groupLeader',
      redirect: '/groupLeader/Index',
      component: () => import('./views/Home.vue'),
      children:[
        { name: '/groupLeader/Index', path: '/groupLeader/Index', component: () => import('./views/leader/Index.vue')},
        { name: '/groupLeader/ViewBe', path: '/groupLeader/ViewBe', component: () => import('./views/leader/ViewBe.vue')},
        { name: '/groupLeader/SignIn', path: '/groupLeader/SignIn', component: () => import('./views/leader/SignIn.vue')},
        { name: '/groupLeader/Examination', path: '/groupLeader/Examination', component: () => import('./views/leader/Examination.vue')},
      ]
    }
  ];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
