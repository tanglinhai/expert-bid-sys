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

//evaluationcommon得硬件特征码防串围标分析点击弹框内容数据供应商名称接口
let HardwareDataTk=Mock.mock('/api/HardwareDataTk','post',{
    "YinjiantableData|1-10": [{  //硬件特征码分析弹框数据
        'gongyinshang|1': ['益达天然产物有限公司（测试）','北京蓝天环境保护有限公司','夏丰热工研究院有限公司','重庆网控科技发展有限公司'],
        cpu: 'CPU序号',
        yinpan: '硬盘序列号',
        wangka: '网卡MAC地址',
        ip: 'IP地址',
        ruanjian: '软件序列号',
        caozuo: '操作系统及版本号',
        shijian: '操作时间'
    }]
})

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
        "personNumber|1":['352226199505120036','352266199505120036'],
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
        'toubiaorenName|1':['北京有限公司','夏丰热工研究院有限公司'],
        toubiaorenFenbao:'0635-198N517/1',
    }]
});
//申请回避弹框原因接口
let reRefuse=Mock.mock('/api/refuseWhy','post',{
    code: 200,
    data: [1234]
});
//AllInformation进入页面数据接口

//WheelPushing推荐组长进入推荐接口
let WheelPushing=Mock.mock('/api/WheelPushing','post',{
    'LunNumber|1':['1','3','4'],
    leaderList:[{
        id:111,
        zuanjiaName:'1',  //专家姓名
        depiaoshu:'1',  //得票数
        tel:13121223333, //手机号
        zjhao:'2345',  //证件号
        danwei:'测试单位',   //单位 
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    },{
        id:222,
        zuanjiaName:'2',  //专家姓名
        depiaoshu:'0',  //得票数
        tel:13121223333, //手机号
        zjhao:'1234',  //证件号
        danwei:'测试单位',   //单位
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    },{
        id:333,
        zuanjiaName:'3',  //专家姓名
        depiaoshu:'5',  //得票数
        tel:13121223333, //手机号
        zjhao:'5678',  //证件号
        danwei:'测试单位',   //单位
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    },{
        id:444,
        zuanjiaName:'4',  //专家姓名
        depiaoshu:'0',  //得票数
        tel:13121223333, //手机号
        zjhao:'23456',  //证件号
        danwei:'单位',   //单位
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    }]
});
//WheelPushing推荐组长进入推荐接口

//ElectedLeader数据
//投标人最新报价列表弹框表格数据
let NewChange=Mock.mock('/api/NewChangePrice','post',{
    msgBox: [{
            firstPrice: '100000000人民币',
            name: '重庆网控科技发展有限公司',
            finalQuotation: 0
        },
        {
            firstPrice: '200000000人民币',
            name: '普瑞太1阳能有限公司',
            finalQuotation: 0
        },
        {
            firstPrice: '100000000人民币',
            name: '夏丰热工研究院有限公司',
            finalQuotation: 0
        },
    ]
})

//ElectedLeader数据
Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })
Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
