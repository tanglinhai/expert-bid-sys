import Mock from 'mockjs';
import JSON from "JSON";
Mock.setup({
    timeout: 1000
});

const Random = Mock.Random;

//beginEvaluation开始评标页面数据
let tableMs = Mock.mock('/api/ProjectSubcontract', 'post', {
    projectTables: {  //项目分包
        id: () => Random.id(),
        'baohao|1': ['0635-1909N974/1','0635-1909N974/2'],
        'baoName|1':['第一包','第二包','第三包'],
        'status|1':['0','2','4'],  //0推举组长 1.评标 调整评标价  2.评标  3.查看  4.第一信封评标 5.第一信封查看  第二信封评标  调整评标价 6.第一信封查看  第二信封查看
        id:1234567,
    }
});

let ProjectZiliao = Mock.mock('/api/ProjectZiliao', 'post', {
    PorjectName:'单信封-0305-1',
    ProjectBianhao:'0635-1909qwerN1133',
    'projectZiliao|4':[{  //项目资料
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
        projectInformation_name:'单信封-0305-1',
        projectInformationbian_hao:'0635-1909qwerN1133',
    },
    toubiaorenInformation:[{
        toubiaorenName:'重庆网控科技发展有限公司',
        toubiaorenFenbao:'pad文件1',
        baoname:1,
    },{
        toubiaorenName:'普瑞太阳能有限公司',
        toubiaorenFenbao:'pad文件2',
        baoname:1,
    },{
        toubiaorenName:'夏丰热工研究院有限公司',
        toubiaorenFenbao:'pad文件4',
        baoname:1,
    },{
        'toubiaorenName|1':['北京有限公司','夏丰热工研究院有限公司'],
        toubiaorenFenbao:'pad文件3',
        baoname:1,
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
        zuanjiaName:'萧勇',  //专家姓名
        depiaoshu:'1票',  //得票数
        tel:13121223333, //手机号
        zjhao:'2345',  //证件号
        danwei:'测试单位',   //单位 
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    },{
        id:222,
        zuanjiaName:'孔芳',  //专家姓名
        depiaoshu:'0票',  //得票数
        tel:13121223333, //手机号
        zjhao:'1234',  //证件号
        danwei:'测试单位',   //单位
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    },{
        id:333,
        zuanjiaName:'姚涛',  //专家姓名
        depiaoshu:'5票',  //得票数
        tel:13121223333, //手机号
        zjhao:'5678',  //证件号
        danwei:'测试单位',   //单位
        'caozuo|1':[2,1,3],  //1推举 2未签到  3已推举
    },{
        id:444,
        zuanjiaName:'刘涛',  //专家姓名
        depiaoshu:'0票',  //得票数
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

//AbandonedTender废标弹框数据
let ReasonScrap=Mock.mock('/api/FeiBiao','post',{
    code: 200,
    data: [1234]
})
//AbandonedTender废标弹框数据

//标中质询信息列表(standardChallengeinformation.vue)
let StandardChallengeList=Mock.mock('/api/StandardChallengeList','post',{
    'standList|1-5':[{
        inquiryConten:['111','222','444','333'],
        questionTime:()=>Random.date()+Random.time(),
        requestReplyTime:()=>Random.date(),
        bidder:()=>Random.csentence(3,15),

    }],
    cityOptions: ['重庆网控科技发展有限公司', '普瑞太阳能有限公司', '夏丰热工研究院有限公司'],
})
/*提交按钮的接口*/
let StandardChallengeTijiao=Mock.mock('/api/StandardChallengeTijiao','post',{
    code: 200,
    data: [1234]
})
//标中质询信息列表(standardChallengeinformation.vue)

//SignaturePage签字数据接口
let SignaturePage = Mock.mock('/api/SignaturePage','post',{
    resultBody:{
        id:824,
        peojectCode:"0635-1909N1268",
        projectId:'2c90816d69c6ef430169c6fc0ef700ab',
        projectContactNumber:"16651183417",
        projectContactPerson:'王进',
        projectName:'tlh招标项目-最低价1',
        projectPackageCode:"0635-1909N1268/1",
        projectPackageName:'第一包',
        projectStatus:1,
        userCompany:"测试单位",
        userId:"201805151502504763292886916",
        userName:null,
        userNickname:"1",   //名字
    },
    fileMenuList:[
        {"menuName":"我的签名文档",
            "fileList|1-6":[
            {
                fileId:() => Random.id(),
                fileName:()=>Random.csentence(3,10),
                gmt_modified:()=>Random.date()+Random.time(),
                "fileStatus|1":['1','2','3'],  //1代表待签，2待完成，3完成
            }]
        },
        {"menuName":"我的会签文档",
            "fileList|3-6":[
            {
                fileId:() => Random.id(),
                fileName:()=>Random.csentence(3,10),
                gmt_modified:()=>Random.date()+Random.time(),
                'fileStatus|1':['1','2','3'],  //1代表待签，2待完成，3完成
            }]
        }
    ]
});
let statuss = Mock.mock('/api/status','post',{
    "resultCode":200,
    "resultMsg":"签名已过期",
    "resultBody":null,
    'userStampStatus|1':['1','0'],  //1代表已签名，0代表未签名
});


let BeijingOrHebei=Mock.mock('/api/BeijingOrHebei','post',{  //点击批量签字得接口
    "resultCode": 200,
    "resultMsg": "",
    "resultBody":
        {
            'role|1':[0,1],     // 0:普通评标专家， 1：评标专家组长
            'system|1':[' ','0','1']////,  //空：未选择签字系统，0：主平台签字系统， 1：河北签字系统
        }
});

let seal = Mock.mock('/stamp/seal','post',{   //河北签章提交接口
    "resultCode": 200,
});

let chooseSys = Mock.mock('/stamp/chooseSys','post',{  //选择北京或者河北得签字系统接口
    "resultCode": 200,

});


//包信息接口
let baoInformations=Mock.mock('/api/baoInformations','post',{
    result:{
        'name': '2019年水利运输服务招标项目',
        'biaoNum': '0635—1909qwerN1197',
        'baohao': '0635—1909qwerN1197/1',
        'projectWenjian':'pdf文件',  //项目资料
        'TheCurrentStatus|1':['已完成','进行中','已废标']
    }
})
//包信息接口


//SignaturePage签字数据接口

//leaderSignaturePage接口
let leaderAll=Mock.mock('/api/leaderAllList','post',{
    "resultBody":{
            id:824,
            peojectCode:"0635-1909N1268",
            projectId:'2c90816d69c6ef430169c6fc0ef700ab',
            projectContactNumber:"16651183417",
            projectContactPerson:'王进',
            projectName:'tlh招标项目-最低价1',
            projectPackageCode:"0635-1909N1268/1",
            projectPackageName:'第一包',
            projectStatus:1,
            userCompany:"测试单位",
            userId:"201805151502504763292886916",
            userName:null,
            userNickname:"1",   //名字
       
        fileMenuList:[
            {
                "menuName":"专家一号",
                id:"111",
                "fileList":[
                    {"fileName":"评审专家意见表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:37","fileId":32231},
                    {"fileName":"评审报告","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:38","fileId":32234},
                    {"fileName":"评审专家声明书","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:38","fileId":32237},
                    {"fileName":"评审委员会签字表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:38","fileId":32240},
                    {"fileName":"评审汇总表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:38","fileId":32243}
                ]
            },
            {
                "menuName":"专家三号",
                id:"333",
                "fileList":[
                    {"fileName":"评审委员会签字表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:38","fileId":32241},
                    {"fileName":"评审汇总表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:38","fileId":32244}
                ]
            },
            {
                "menuName":"专家二号",
                id:"222",
                "fileList":[
                    {"fileName":"响应性评审个人报表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:37","fileId":32218},
                    {"fileName":"响应性评审汇总报表","fileStatus|1":['1','2','3'],"gmt_modified":"2019-03-28 16:23:37","fileId":32221},
                   
                ]
            }
        ]
    }
    
})
//leaderSignaturePage接口

//协议书的同意按钮接口
let agreeBtn=Mock.mock('/api/agreeBtn','post',{
    code: 200,
    data: [1234]

})
//协议书的同意按钮接口

//参加评标按钮接口
let EnterEvaluationButton=Mock.mock('/api/EnterEvaluationButton','post',{
    code: 200,
    data: [1234]
})
//参加评标按钮接口
let evaluationBidBtn=Mock.mock('/api/evaluationBidBtn','post',{
    code: 200,
    data: [1234]
})


//1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态；currentPage：当前进行到哪一步；

function get_data(currentPage,is_submit_type,types) {//type
    // console.log(type, is_submit_type);
    function set_type() {
        if (currentPage == 1) {
            if(types==1){
                return [is_submit_type?1:2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,4].splice(types,1,5)
            }else{
                return [is_submit_type?1:2,4,4,4,4,4,4,4,4,4,4,4,4,4]
            }
        }
        if (currentPage == 2) {
            if(types==1){
                var num=[1,4, 4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
                num.splice(types-1,1,5)
                num.splice(currentPage-1,1,is_submit_type?1:3);
                return num;
            }else{
                return [1,is_submit_type?1:2, 4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4]
            }
        }
        if (currentPage == 3) {
            if(types==1){
                var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
                num.splice(types-1,1,5);
                num.splice(currentPage-1,1,is_submit_type?1:3);
                return num;
            }else if(types==2){
                var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
                num.splice(types-1,1,5);
                num.splice(currentPage-1,1,is_submit_type?1:3);
                return num;
            }else{
                return [1, 1, is_submit_type?1:2, 4, 4, 4, 4,4, 4, 4, 4, 4,4,4]
            }
            
        }


       
    }
    //set_type();
    var a;
    a = set_type();
    return [
        {   //综合评标导航    商务，技术，服务，其他，评审汇总：（详细评审(技术)汇总提交完成之后可点）
            value: '1',//
            label: '承诺书',  //步数字段
            types: 1,  //types 代表第几步对应相对应得步数
            typestaus:a[0],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点

        },{
            value: '2',//
            label: '参加评标',
            types: 2,
            typestaus:a[1],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
        },{
            value: '3',//
            label: '推举组长',
            types: 3,
            typestaus:a[2],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
        },{
            value: '4',//
            label: '资格审查',
            types: 4,
            typestaus:a[3],
        },{
            value: '5',//
            label: '资格审查汇总',
            types: 5,
            typestaus:a[4],
        },{
            value: '6',//
            label: '符合性审查',
            types: 6,
            typestaus:a[5],
        },{
            value: '7',//
            label: '符合性审查汇总',
            types: 7,
            typestaus:a[6],
        },{
            value: '8',//
            label: '详细评审(技术)',
            types: 8,
            typestaus:a[7],
        },{
            value: '9',//
            label: '详细评审(技术)汇总',
            types: 9,
            typestaus:a[8],
        },{
            value: '10',//
            label: '商务',
            types: 10,
            typestaus:a[9],
        },{
            value: '11',//
            label: '技术',
            types: 11,
            typestaus:a[10],
        },{
            value: '12',//
            label: '服务',
            types: 12,
            typestaus:a[11],
        },{
            value: '13',//
            label: '其他',
            types: 13,
            typestaus:a[12],
        },{
            value: '14',//
            label: '评审汇总',
            types: 14,
            typestaus:a[13],
        }
        
    ]
}

//公共导航接口
Mock.mock('/api/navcommons','post',(options) =>{
    let CommonsData;
    let currentpage=JSON.parse(options.body).currentpage;
    let is_submit_type=JSON.parse(options.body).is_submit_type;
    let types=JSON.parse(options.body).types;
    console.log(currentpage,is_submit_type,888888);
    CommonsData={
        ProjectInformationsAll:{
            projectName:'单信封-0305-1',
            projectNumber:'0635-1909qwerN1133',
            projectWenjian:'招标文件(pdf)',
            PersonName:'张三'
        },
        navsAll:get_data(currentpage,is_submit_type,types),
    };
    return CommonsData;
        
})
//公共导航接口

Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })
Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
