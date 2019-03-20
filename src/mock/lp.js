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
        baostatuss: '进行中'
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

//beginEvaluation开始评标页面数据
Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })
Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
