import Mock from 'mockjs';
Mock.setup({
    timeout: 1000
});

const Random = Mock.Random;

//beginEvaluation开始评标页面数据
let tableMs = Mock.mock('/api/ProjectSubcontract', 'post', {
    'projectTables|5': [{  //项目分包
        id: () => Random.id(),
        'baohao|1': ['0635-1909N974/1','0635-1909N974/2'],
        'baoName|1':['第一包','第二包','第三包'],
        'status|1':['0','1','2','3'],
    }]
});

let ProjectZiliao = Mock.mock('/api/ProjectZiliao', 'post', {
    PorjectName:'单信封-0305-1',
    ProjectBianhao:'0635-1909qwerN1133',
    'projectZiliao|30':[{  //项目资料
        id: () => Random.id(),
        'ziliaoName|1':['招标文件1','招标文件2','招标文件3'],
    }],
    'projectChaxun':[
        {
            "id":'1',
            "bianhao":"0635-1901qwerN1133/1",
            "children":[
                {"id":"1-1","baoname":"第一包","bianhao":"0635-1901qwerN1133/1","name":"北京蓝天环境保护有限公司"},
                {"id":"1-2","baoname":"第一包","bianhao":"0635-1901qwerN1133/1","name":"益达天然产物有限公司"},
            ]
        },
        {
            "id":'2',
            "bianhao":"0635-1901qwerN1133/2",
            "children":[
                {"id":"2-1","baoname":"第二包","bianhao":"0635-1901qwerN1133/2","name":"北京蓝天环境保护有限公司"},
                {"id":"2-2","baoname":"第二包","bianhao":"0635-1901qwerN1133/2","name":"北京蓝天环境保护有限公司"},
                {"id":"2-3","baoname":"第二包","bianhao":"0635-1901qwerN1133/2","name":"益达天然产物有限公司"},
            ]
        },
        {
            "id":'3',
            "bianhao":"0635-1901qwerN1133/3",
            "children":[
                {"id":"3-1","baoname":"第三包","bianhao":"0635-1901qwerN1133/3","name":"北京蓝天环境保护有限公司"},
                {"id":"3-2","baoname":"第三包","bianhao":"0635-1901qwerN1133/3","name":"益达天然产物有限公司"},
                {"id":"3-3","baoname":"第三包","bianhao":"0635-1901qwerN1133/3","name":"益达天然产物有限公司"},
            ]
        },
        {
            "id":'4',
            "bianhao":"0635-1901qwerN1133/4",
            "children":[
                {"id":"4-1","baoname":"第四包","bianhao":"0635-1901qwerN1133/4","name":"北京蓝天环境保护有限公司"},
                {"id":"4-2","baoname":"第四包","bianhao":"0635-1901qwerN1133/4","name":"益达天然产物有限公司"},
                {"id":"4-3","baoname":"第四包","bianhao":"0635-1901qwerN1133/4","name":"益达天然产物有限公司"},
                {"id":"4-4","baoname":"第四包","bianhao":"0635-1901qwerN1133/4","name":"益达天然产物有限公司"},
            ]
        },
        {
            "id":'5',
            "bianhao":"0635-1901qwerN1133/5",
            "children":[
                {"id":"4-1","baoname":"第五包","bianhao":"0635-1901qwerN1133/5","name":"北京蓝天环境保护有限公司"},
                {"id":"4-2","baoname":"第五包","bianhao":"0635-1901qwerN1133/5","name":"益达天然产物有限公司"},
                {"id":"4-3","baoname":"第五包","bianhao":"0635-1901qwerN1133/5","name":"益达天然产物有限公司"},
                {"id":"4-4","baoname":"第五包","bianhao":"0635-1901qwerN1133/5","name":"益达天然产物有限公司"},
            ]
        }
    ],
    'projectLeiFenxi|1-20':[{  //雷同性分析
        id: () => Random.id(),
        'ziliaoName|1':['分包1','分包2','分包3'],
    }],
    'projectYinjianFenxi|1-20':[{  //硬件特征码防串围标分析
        id: () => Random.id(),
        'ziliaoName|1':['硬件特征码1','硬件特征码2','硬件特征码3'],
    }],
});

//beginEvaluation查看推举情况弹框接口
let CheckReferrals=Mock.mock('/api/CheckReferralsTuiju','post',{
    leader:'张三',
    baohao:'0635-1909N963/2[2]',
    'CheckReferralsList':[{
        id:1,
        number:'1',
        children:[
            {"name":"张三",'peopleNumber':'1'},
            {"name":"李四",'peopleNumber':'0'},
            {"name":"王五",'peopleNumber':'0'},
        ]
    },{
        id:2,
        number:'2',
        children:[
            {"name":"张三",'peopleNumber':'0'},
            {"name":"李四",'peopleNumber':'1'},
            {"name":"王五",'peopleNumber':'0'},
        ]
    },{
        id:3,
        number:'3',
        children:[
            {"name":"张三",'peopleNumber':'1'},
            {"name":"李四",'peopleNumber':'0'},
            {"name":"王五",'peopleNumber':'0'},
            {"name":"赵六",'peopleNumber':'5'},
        ]
    }]
});

//beginEvaluation开始评标页面数据

//AllInformation进入页面数据接口
let AllInformation=Mock.mock('/api/CheckReferrals','post',{  //专家个人信息,投标人信息
    personInformation:{
        personName:'张三',
        personTel:'13123434567',
        personNumber:'352226199505120036',
    },
    toubiaorenInformation:[{
        toubiaorenName:'重庆网控科技发展有限公司',
        toubiaorenFenbao:'0635-198N517/1',
    },{
        toubiaorenName:'普瑞太阳能有限公司',
        toubiaorenFenbao:'0635-198N517/1',
    },{
        toubiaorenName:'夏丰热工研究院有限公司',
        toubiaorenFenbao:'0635-198N517/1',
    },{
        toubiaorenName:'北京有限公司',
        toubiaorenFenbao:'0635-198N517/1',
    }]
})
//AllInformation进入页面数据接口
Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })
Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
