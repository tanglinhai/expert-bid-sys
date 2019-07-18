import Mock from 'mockjs';
import JSON from 'JSON';
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
        "inquiryConten|1":['111','222','444','333'],
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

let SignatureReceipt= Mock.mock('/stamp/SignatureReceipt','post',{  //签名回执
    "resultCode": 200,
    url:'http://localhost:7000/img/download.svc',
});


//头部包信息接口
let baoInformations=Mock.mock('/api/baoInformations','post',{
    result:{
        'name': '2019年水利运输服务招标项目',
        'biaoNum': '0635—1909qwerN1197',
        'baohao': '0635—1909qwerN1197/1',
        'projectWenjian':'pdf文件',  //项目资料
        'TheCurrentStatus|1':['已完成','进行中','已废标']
    }
});
//头部包信息接口


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

});
//协议书的同意按钮接口

//参加评标按钮接口
let EnterEvaluationButton=Mock.mock('/api/EnterEvaluationButton','post',{
    code: 200,
    data: [1234]
});
//参加评标按钮接口
let evaluationBidBtn=Mock.mock('/api/evaluationBidBtn','post',{
    code: 200,
    data: [1234]
});


//1; 通过,2:正在进行:4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态；currentPage：当前进行到哪一步；


// lipan(导航):
// function get_data(currentPage,is_submit_type,types) {//type
//     // console.log(currentPage, is_submit_type,66666666);
//     function set_type() {
//         if (currentPage == 1) {
//             if(is_submit_type==0||is_submit_type==null){
//                 return [2,2,4,4,4,4,4]
//             }else{
//                 return [2,1,4,4,4,4,4]
//             }
//
//         }
//         if (currentPage == 2) {
//             return [2,1, 2, 4, 4, 4, 4]
//         }
//         if (currentPage == 3) {
//             // if(types==1){
//             //     var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
//             //     num.splice(types-1,1,5);
//             //     num.splice(currentPage-1,1,is_submit_type?1:3);
//             //     return num;
//             // }else if(types==2){
//             //     var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
//             //     num.splice(types-1,1,5);
//             //     num.splice(currentPage-1,1,is_submit_type?1:3);
//             //     return num;
//             //}else{
//                 return [1,1,1,2,4,4,4]
//             //}
//
//         }
//
//
//
//     }
//     //set_type();
//     var a;
//     a = set_type();
//     return [
//         {   //综合评标导航    商务，技术，服务，其他，评审汇总：（详细评审(技术)汇总提交完成之后可点）
//             value: '1',//
//             label: '签到',  //步数字段
//             types: 1,  //types 代表第几步对应相对应得步数
//             typestaus:a[0],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//             children:[{
//                 value: '1-1',//
//                 label: '承诺书',  //步数字段
//                 types: "1-1",  //types 代表第几步对应相对应得步数
//                 typestaus:a[1],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//             },{
//                 value: '1-2',//
//                 label: '参加评标',  //步数字段
//                 types: "1-2",  //types 代表第几步对应相对应得步数
//                 typestaus:a[2],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//             }]
//         },{
//             value: '2',//
//             label: '推举组长',
//             types: 2,
//             typestaus:a[3],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//         },{
//             value: '3',//
//             label: '评标',
//             types: 3,
//             typestaus:a[4],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//             children:[{
//                 value: '3-1',//
//                 label: '资格审查',  //步数字段
//                 types: 3-1,  //types 代表第几步对应相对应得步数
//                 typestaus:a[5],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//             },{
//                 value: '3-2',//
//                 label: '资格审查汇总',  //步数字段
//                 types: 3-2,  //types 代表第几步对应相对应得步数
//                 typestaus:a[6],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//             }]
//          }
//          //,{
//         //     value: '4',//
//         //     label: '资格审查',
//         //     types: 4,
//         //     typestaus:a[3],
//         // },{
//         //     value: '5',//
//         //     label: '资格审查汇总',
//         //     types: 5,
//         //     typestaus:a[4],
//         // },{
//         //     value: '6',//
//         //     label: '符合性审查',
//         //     types: 6,
//         //     typestaus:a[5],
//         // },{
//         //     value: '7',//
//         //     label: '符合性审查汇总',
//         //     types: 7,
//         //     typestaus:a[6],
//         // },{
//         //     value: '8',//
//         //     label: '详细评审(技术)',
//         //     types: 8,
//         //     typestaus:a[7],
//         // },{
//         //     value: '9',//
//         //     label: '详细评审(技术)汇总',
//         //     types: 9,
//         //     typestaus:a[8],
//         // },{
//         //     value: '10',//
//         //     label: '商务',
//         //     types: 10,
//         //     typestaus:a[9],
//         // },{
//         //     value: '11',//
//         //     label: '技术',
//         //     types: 11,
//         //     typestaus:a[10],
//         // },{
//         //     value: '12',//
//         //     label: '服务',
//         //     types: 12,
//         //     typestaus:a[11],
//         // },{
//         //     value: '13',//
//         //     label: '其他',
//         //     types: 13,
//         //     typestaus:a[12],
//         // },{
//         //     value: '14',//
//         //     label: '评审汇总',
//         //     types: 14,
//         //     typestaus:a[13],
//         // }
//
//     ]
// }




Mock.mock('/Ajax/LoginLeader', 'post', { 
    "Status": "ok", 
    "Text": "登陆成功<br /><br />欢迎回来",
    "id": Random.id(),
    "name": Random.cname(),
    "roles": ['leader']
});
Mock.mock('/Ajax/LoginExpert', 'post', { 
    "Status": "ok", 
    "Text": "登陆成功<br /><br />欢迎回来",
    "id": Random.id(),
    "name": Random.cname(),
    "roles": ['expert']
});






/*---------------------------------ll接口----------------------------------------------*/

// /*----------------------审查项页面数据接口---------------------*/
/**
 * [factors_standards description]
 * @param  {[type]} type [type:10 资格11符合12详细评审，1定档评议2，商务，3技术4服务5其他]
 * @return {[type]}      [description]
 */
function factors_standards(type){

    var factor1s = [null, '商务 商务1（50.00分）', '第一章，商务10分', '第一章，技术(14.00)分', '第一章、服务1(50.00分)', '第一章、其他(1.00分-60.00分)', null, null, null, null,
        '内存大小大于8G',        '投标人名称', '详细评审1'
    ];
    var factor2s = [null, '商务 商务1（50.00分）', '第二章，商务20分', '第二章，技术(24.00)分', '第二章、服务1(25.00分)', '第二章、其他(2.00分-33.00分)', null, null, null, null,
        '是否为INTEL生产',       '资质', '详细评审2'
    ];
    var factor3s = [null, '商务 商务1（50.00分）', '第三章，商务30分', '第三章，技术(24.00)分', '第三章、服务1(25.00分)', '第三章、其他(2.00分-33.00分)', null, null, null, null,
        '分辨率是否为15英寸以上', '审查项目', '详细评审3'
    ];
    /*
    192.168.153.23调试数据，别要删除
     */
    return [
        [{
            factor: factor1s[type],
            standard: '大于等于8G',
            relativePoints:[{
                id: 'pdf1_1',
                name: 'pdf文件11.pdf',
                page: 11659,
                txt: 'Vestibulum tincidunt malesuada tellus'
            },{
                id: 'pdf1_1',
                name: 'pdf文件11.pdf',
                page: 11660,
                txt: 'facilisis'
            },{
                id: 'pdf1_1',
                name: 'pdf文件11.pdf',
                page: 11658,
                txt: 'Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.'
            }]
        },{
            factor: factor2s[type],
            standard: '必须是INTEL生产',
            relativePoints:[{
                id: 'pdf1_2',
                name: 'pdf文件12.pdf',
                page: 1,
                txt: '选视频侵权使用蝙蝠侠配乐'
            },{
                id: 'pdf1_2',
                name: 'pdf文件12.pdf',
                page: 1,
                txt: '中的配乐作为背景音乐'
            }]
        },{
            factor: factor3s[type],
            standard: '可达到1366*768以上即可',
            relativePoints:[{
                id: 'pdf1_3',
                name: 'pdf文件13.pdf',
                page: 1,
                txt: '从雷达上消失。机上有1人'
            }]
        }],[{
            factor: factor1s[type],
            standard: '大于等于8G',
            relativePoints:[]
        },{
            factor: factor2s[type],
            standard: '必须是INTEL生产',
            relativePoints:[]
        },{
            factor: factor3s[type],
            standard: '可达到1366*768以上即可',
            relativePoints:[{
                id: 'pdf2_1',
                name: 'pdf文件21.pdf',
                page: 1495,
                txt: '王胜国给王家黔说'
            }]
        }],[{
            factor: factor1s[type],
            standard: '大于等于8G',
            relativePoints:[{
                id: 'pdf3_2',
                name: 'pdf文件32.pdf',
                page: 2,
                txt: '其中销量较高的一样的在线占卜：“免'
            }]
        },{
            factor: factor2s[type],
            standard: '必须是INTEL生产',
            relativePoints:[]
        },{
            factor: factor3s[type],
            standard: '可达到1366*768以上即可',
            relativePoints:[{
                id: 'pdf3_1',
                name: 'pdf文件31.pdf',
                page: 3,
                txt: '夏丰热工研究院有限公司。资格审查评审项：内'
            }]
        }]

    ];

    /*
    本地调试数据，别要删除
     */
    /*[
        [{
            factor: factor1s[type],
            standard: '大于等于8G',
            relativePoints:[{
                id: 'pdf1_1',
                name: 'pdf文件11.pdf',
                page: 1,
                txt: 'Vestibulum tincidunt malesuada tellus'
            },{
                id: 'pdf1_1',
                name: 'pdf文件11.pdf',
                page: 3,
                txt: 'facilisis'
            },{
                id: 'pdf1_1',
                name: 'pdf文件11.pdf',
                page: 1,
                txt: 'Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.'
            }]
        },{
            factor: factor2s[type],
            standard: '必须是INTEL生产',
            relativePoints:[{
                id: 'pdf1_2',
                name: 'pdf文件12.pdf',
                page: 1,
                txt: '选视频侵权使用蝙蝠侠配乐'
            },{
                id: 'pdf1_2',
                name: 'pdf文件12.pdf',
                page: 2,
                txt: '中的配乐作为背景音乐'
            }]
        },{
            factor: factor3s[type],
            standard: '可达到1366*768以上即可',
            relativePoints:[{
                id: 'pdf1_3',
                name: 'pdf文件13.pdf',
                page: 2,
                txt: '从雷达上消失。机上有1人'
            }]
        }],[{
            factor: factor1s[type],
            standard: '大于等于8G',
            relativePoints:[]
        },{
            factor: factor2s[type],
            standard: '必须是INTEL生产',
            relativePoints:[]
        },{
            factor: factor3s[type],
            standard: '可达到1366*768以上即可',
            relativePoints:[{
                id: 'pdf2_1',
                name: 'pdf文件21.pdf',
                page: 2,
                txt: '王胜国给王家黔说'
            }]
        }],[{
            factor: factor1s[type],
            standard: '大于等于8G',
            relativePoints:[{
                id: 'pdf3_2',
                name: 'pdf文件32.pdf',
                page: 2,
                txt: '其中销量较高的一样的在线占卜：“免'
            }]
        },{
            factor: factor2s[type],
            standard: '必须是INTEL生产',
            relativePoints:[]
        },{
            factor: factor3s[type],
            standard: '可达到1366*768以上即可',
            relativePoints:[{
                id: 'pdf3_1',
                name: 'pdf文件31.pdf',
                page: 3,
                txt: '夏丰热工研究院有限公司。资格审查评审项：内'
            }]
        }]

    ];

     */
}



// 资格审查全部提交接口
let alltijiao = Mock.mock('/api/alltijiao', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(4),

});
// 符合性审查全部提交接口
let alltijiao_fhx = Mock.mock('/api/alltijiao_fhx', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(6),
});
// 详细技术审查全部提交接口
let alltijiao_xxjs = Mock.mock('/api/alltijiao_xxjs', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(8),
});
/*--------------------资格审查项接口start--------------------*/
Mock.mock('/api/table_msg', 'post', (options) => {
    // console.log(options);
    let return_val;
    var submit_type;
    let aaa=JSON.parse(options.body).is_submit_type;
    // console.log(aaa);
    if(aaa){
        submit_type=aaa;
    }else{
        submit_type= Random.integer(0, 1);
    }
    let get_type_num=JSON.parse(options.body).currentPage;
    // console.log(get_type_num,);
    // var bidderIds = [Random.id(),Random.id(),Random.id(),Random.id(),Random.id(),Random.id(),Random.id()];

    if (get_type_num == 4) {
    // if (get_type_num == 1) {
        let ms = [];
        for (var i = 0; i < Random.integer(1, 5); i++) {
            ms.push({
                date: '0',
                isFinish: '未完成',
                id: Random.id(),
                name: Random.cname(),
            })
        }
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type': submit_type,//是否提交过//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'viewnBtnName': '个人资格审查项表',//左侧审查项类型
                    'shenchaName':"资格审查-电脑硬件配置工作",
                    'companyNameList': [//(投标人)公司名
                        // { "title":"（1）重庆网控科技发展有限公司",
                        { "title":"公司",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],
                            factors_standards:factors_standards(10)[0]
                        },
                        { "title": "（2）普瑞太阳能有限公司",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],
                            factors_standards:factors_standards(10)[1]

                        },
                        {
                            "title":"（3）夏丰热工研究院有限公司",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（4）上海科技信息股份有限公司",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（5）益达天热产物有限公司",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（6）白云电力试验研究所",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（7）上海科技信息股份有限公司",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（8）大连跃胜贸易有限公司",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（9）跃胜贸易有限公司",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（10）招管通测试一",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（11）招管通测试二",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（12）北京麦德森医疗器械有限公司",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },
                        {
                            "title":"（13）闪电果业发展股份有限公司",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },

                        {
                            "title":"（14）中招国际招标有限公司",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        },

                        {
                            "title":"（15）上海盛泰广告有限责任公司",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(10)[2]
                        }
                    ],
                    "dingdang_tableData":[
                        {
                            evaluationFactors: '内存大小大于8G',
                            standardReview:'大于等于8G',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num: '合格'},
                                {typeTitle: '不合格', num:'不合格'  },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },

                        {
                            evaluationFactors: '是否为INTEL生产',
                            standardReview:'必须是INTEL生产',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num:'合格'},
                                {typeTitle: '不合格', num: '不合格' },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                        {
                            evaluationFactors: '分辨率是否为15英寸以上',//(资格审查的评审因素)
                            standardReview:'可达到1366*768以上即可',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num:'合格'},
                                {typeTitle: '不合格', num: '不合格' },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                    ],
                    'mylist': ms,
                    vue_type: get_data(1),       //头部审查类型按钮
                },
                msg: [  //个人形式审计表数据接口(改动)
                    {
                        'number': '1',
                        'evaluationFactors': '资格审查1',
                    },
                    {
                        'number': '2',
                        'evaluationFactors': '资格审查2',
                    },
                    {
                        'number': '3',
                        'evaluationFactors': '资格审查3',
                    },
                    {
                        'number': '结论',
                        'evaluationFactors': '是否通过资格审查项检查',
                    }
                ],
                'companyNameData': [
                    {
                        'companyName':'（1）重庆网控科技发展有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["√",  "√","√",'合格']
                            } ,

                        ]
                    },
                    {
                        'companyName':'（2）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（3）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "×",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（4）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（5）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（6）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（7）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（8）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'（9）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },      {
                        'companyName':'（10）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },      {
                        'companyName':'（11）夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                ],
                'grcs_titile_data':{
                    'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                    + '/' + '评委会',//     评标委员会
                    'bagName':  '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                    +'['+'第-包'+']',//分包号
                    'professorName':'张三'
                },
                'grzgscFailureData':[{
                    'zhaunjia':'评审专家五',
                    'gongsi':'北京科技信息股份有限公司',
                    'pingshenyinsu':'资格审查项2',
                    'reason':' 不符合审查标准'
                },{
                    'zhaunjia':'评审专家五',
                    'gongsi':'闪电果业发展股份有限公司',
                    'pingshenyinsu':'资格审查项1',
                    'reason':'不符合审查标准'
                }]
            }
        }
    }
    // else if (get_type_num == 3) {
    else if (get_type_num ==6) {
        let ms = [];
        for (var i = 0; i < Random.integer(1, 5); i++) {
            ms.push({
                date: '0',
                isFinish: '未完成',
                id: Random.id(),
                name: Random.cname(),
            })
        }
        // 头部标包信息
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type': submit_type,//是否提交过//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'viewnBtnName': '个人资格审查项表',//左侧审查项类型
                    'shenchaName':"形式审计-#707478",
                    'companyNameList': [//(投标人)公司名
                        // { "title":"重庆网控科技发展有限公司（1）",
                        { "title":"（1）",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],

                            factors_standards:factors_standards(11)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],

                            factors_standards:factors_standards(11)[1]

                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],

                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（4）上海科技信息股份有限公司",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（5）益达天热产物有限公司",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（6）白云电力试验研究所",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（7）上海科技信息股份有限公司",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（8）大连跃胜贸易有限公司",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（9）跃胜贸易有限公司",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（10）招管通测试一",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（11）招管通测试二",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（12）北京麦德森医疗器械有限公司",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },
                        {
                            "title":"（13）闪电果业发展股份有限公司",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },

                        {
                            "title":"（14）中招国际招标有限公司",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        },

                        {
                            "title":"（15）上海盛泰广告有限责任公司",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(11)[2]
                        }
                    ],
                    "dingdang_tableData":[
                        {
                            evaluationFactors: '投标人名称',
                            standardReview:'与营业执照、资质证书一致',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num: '合格'},
                                {typeTitle: '不合格', num:'不合格'  },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                        {
                            evaluationFactors: '资质',
                            standardReview:'与营业执照、资质证书一致',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num:'合格'},
                                {typeTitle: '不合格', num: '不合格' },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                        {
                            evaluationFactors: '审查项目',//(资格审查的评审因素)
                            standardReview:'与营业执照、资质证书一致',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num:'合格'},
                                {typeTitle: '不合格', num: '不合格' },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                    ],
                    'mylist': ms,
                    //头部审查类型按钮
                },
                msg: [  //个人形式审计表数据接口(改动)
                    {
                        'number': '1',
                        'evaluationFactors': '投标人名称',
                    },
                    {
                        'number': '2',
                        'evaluationFactors': '资质',
                    },
                    {
                        'number': '3',
                        'evaluationFactors': '审查项目',
                    },
                    {
                        'number': '结论',
                        'evaluationFactors': '是否通过资格审查项检查',
                    }
                ],
                'companyNameData': [
                    {
                        'companyName':'重庆网控科技发展有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["√", "√", "√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "×", "√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },      {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },      {
                        'companyName':'夏丰热工研究院有限公司',

                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√", "√",'不合格']
                            } ,
                        ]
                    },
                ],
                'grcs_titile_data':{
                    'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                    + '/' + '评委会',//     评标委员会
                    'bagName':  '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                    +'['+'第-包'+']',//分包号
                    'professorName':'张三'
                },
                'grzgscFailureData':[{
                    'zhaunjia':'评审专家五',
                    'gongsi':'北京科技信息股份有限公司',
                    'pingshenyinsu':'资格审查项2',
                    'reason':' 不符合审查标准'
                },{
                    'zhaunjia':'评审专家五',
                    'gongsi':'闪电果业发展股份有限公司',
                    'pingshenyinsu':'资格审查项1',
                    'reason':'不符合审查标准'
                }]
            }
        }

    // } else if (get_type_num == 5) {
    } else if (get_type_num == 8) {
        var ms = [];
        for (var i = 0; i < Random.integer(1, 5); i++) {
            ms.push({
                date: '0',
                isFinish: '未完成',
                id: Random.id(),
                name: Random.cname(),
            })
        }
        // 头部标包信息
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type':submit_type,//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'viewnBtnName': '个人资格审查项表',//左侧审查项类型
                    'shenchaName':"详细评审技术",
                    'companyNameList': [//(投标人)公司名
                        { "title":"重庆网控科技发展有限公司（1）",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],

                            factors_standards:factors_standards(12)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],

                            factors_standards:factors_standards(12)[1]

                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],

                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（4）上海科技信息股份有限公司",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（5）益达天热产物有限公司",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（6）白云电力试验研究所",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[0]
                        },
                        {
                            "title":"（7）上海科技信息股份有限公司",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（8）大连跃胜贸易有限公司",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（9）跃胜贸易有限公司",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（10）招管通测试一",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（11）招管通测试二",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（12）北京麦德森医疗器械有限公司",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },
                        {
                            "title":"（13）闪电果业发展股份有限公司",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },

                        {
                            "title":"（14）中招国际招标有限公司",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        },

                        {
                            "title":"（15）上海盛泰广告有限责任公司",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(12)[2]
                        }
                    ],
                    "dingdang_tableData":[
                        {
                            evaluationFactors: '详细评审1',
                            standardReview:'与营业执照、资质证书一致111',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num: '合格'},
                                {typeTitle: '不合格', num:'不合格'  },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                        {
                            evaluationFactors: '详细评审2',
                            standardReview:'与营业执照、资质证书一致222',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num:'合格'},
                                {typeTitle: '不合格', num: '不合格' },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                        {
                            evaluationFactors: '详细评审3',//(资格审查的评审因素)
                            standardReview:'与营业执照、资质证书一致333',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: '合格', num:'合格'},
                                {typeTitle: '不合格', num: '不合格' },
                            ],
                            value1:'',
                            value2:'' ,
                            value3:'' ,
                            value4:'' ,
                            value5:'' ,
                            value6:'' ,
                            value7:'' ,
                            value8:'',
                            value9:'' ,
                            value10:'' ,
                            value11:'' ,
                            value12:'' ,
                            value13:'' ,
                            value14:'' ,
                            value15:'' ,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                        },
                    ],
                    'mylist': ms,
                    //头部审查类型按钮

                },
                msg: [  //个人形式审计表数据接口(改动)
                    {
                        'number': '1',
                        'evaluationFactors': '详情评审1',
                    },
                    {
                        'number': '2',
                        'evaluationFactors': '详情评审2',
                    },
                    {
                        'number': '3',
                        'evaluationFactors': '详情评审3',
                    },
                    {
                        'number': '结论',
                        'evaluationFactors': '是否通过资格审查项检查',
                    }
                ],
                'companyNameData': [
                    {
                        'companyName':'重庆网控科技发展有限公司',

                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["√", "√","√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',

                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',

                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "×","√",'合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',

                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',

                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },
                    {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },      {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },      {
                        'companyName':'夏丰热工研究院有限公司',
                        'zhaunjiadata_gs':[
                            {
                                'zhaunjia1':["×", "√","√",'不合格']
                            } ,
                        ]
                    },
                ],
                'grcs_titile_data':{
                    'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                    + '/' + '评委会',//     评标委员会
                    'bagName':  '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                    + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                    +'['+'第-包'+']',//分包号
                    'professorName':'张三'
                },
                'grzgscFailureData':[{
                    'zhaunjia':'评审专家五',
                    'gongsi':'北京科技信息股份有限公司',
                    'pingshenyinsu':'资格审查项2',
                    'reason':' 不符合审查标准'
                },{
                    'zhaunjia':'评审专家五',
                    'gongsi':'闪电果业发展股份有限公司',
                    'pingshenyinsu':'资格审查项1',
                    'reason':'不符合审查标准'
                }]
            }
        }
    }
    // return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1,submit_type);
    return return_val;
});
/*----------------------审查项页面数据接口end---------------------*/

/*---------------------  审查项汇总页面接口------------------*/
Mock.mock('/api/table_data', 'post', (options) => {
    // console.log(options,'前端返回来的参数');
    let return_val;
    // let get_type_num=JSON.parse(options.body).type;

    var submit_type;
    let aaa=JSON.parse(options.body).is_submit_type;
    // console.log(aaa);
    if(aaa){
        submit_type=aaa;
    }else{
        submit_type= Random.integer(0, 1);
    }

    let get_type_num=JSON.parse(options.body).currentPage;
    // console.log(get_type_num,'当前进行的是第一个');
    // if (get_type_num == 2) {//是区别那个页面
    if (get_type_num ==5) {//是区别那个页面
        let msg = [];
        // for (var i = 0; i < Random.integer(1, 5); i++) {
        msg.push(
            {
                'xuhao': '1',
                'evaluationFactors': '资格审查1',
            },
            {
                'xuhao': '2',
                'evaluationFactors': '资格审查2',
            },
            {
                'xuhao': '3',
                'evaluationFactors': '资格审查3',
            },
            {
                'xuhao': '结论',
                'evaluationFactors': '是否通过资格审查项检查',
            }
        );
        // }
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                //审查项
                'eviewrItemsMsg': {
                    'viewnBtnName': '个人资格审查项表',//左侧审查项类型
                    // 'isShow': Random.integer(0, 1),//1：解锁的那个页面显示，反之进度条的那个显示
                    'isShow': submit_type,//1：解锁的那个页面显示，反之0：进度条的那个显示
                    'tables': [{//综合评标页面进度条数据
                        'evaluationExpert': '评审专家七',
                        'businessReviewProgress': '5',
                        'isResultsBusinessReview': '未完成',
                        ' technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress':'5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }, {
                        'evaluationExpert': '评审专家五',
                        'businessReviewProgress':  '5',
                        'isResultsBusinessReview': '未完成',
                        'technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress': '5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }, {
                        'evaluationExpert': '评审专家一',
                        'businessReviewProgress':  '50',
                        'isResultsBusinessReview': '未完成',
                        'technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress': '5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }],

                    'tableData': [{
                        'dataItem': 'evaluationExpert',//评审专家（动态表头的名字绑定数据）
                        'dataName': '评审专家',//动态表头的名字
                        'type': '1'//文字
                    }, {
                        'dataItem': 'businessReviewProgress',
                        'dataName': '资格审查项进度',
                        ' type': '2'//进度条
                    }, {
                        'dataItem': 'isResultsBusinessReview',
                        'dataName': '是否提交资格审查结果',
                        'type': '1'//文字
                    },],
                    'evaluationLeader': '张三',
                    'other_explain': Random.csentence(),
                    'unlock_table_data':[
                        {
                            'number': '1',
                            'evaluationFactors': '资格审查1',
                        },
                        {
                            'number': '2',
                            'evaluationFactors': '资格审查2',
                        },
                        {
                            'number': '3',
                            'evaluationFactors': '资格审查3',
                        },
                        {
                            'number': '结论',
                            'evaluationFactors': '是否通过资格审查项检查',
                        }
                    ],
                    'unlock_table_company_name': [
                        {
                            'companyName':'（1）重庆网控科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)",  "√(5√0×)","√(5√0×)",'合格']
                                } ,
                            ]
                        },
                        {
                            'companyName':'（2）普瑞太阳能有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)", "√(5√0×)", "√(5√0×)",'合格']
                                } ,
                            ]
                        },
                        {
                            'companyName':'（3）夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)", "√(5√0×)", "√(5√0×)",'合格'],
                                } ,
                            ]
                        },
                    ],
                    'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',//解锁记录弹框里面的头部信息
                    'unlock_dialog_check':[{
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult':"同意",
                        'unlockReason': Random.csentence()
                    },
                        {
                            'applicantPeole': Random.cname(),
                            'applicantTime': Random.datetime(),
                            'unlockObject': Random.cname(),
                            'applicantReason': '格式',
                            'assessingOfficer': Random.cname(),
                            'assessingResult':"同意",
                            'unlockReason': Random.csentence()
                        },
                    ],
                    'msgBox': msg,
                    'companyNameData': [
                        {
                            'companyName':'重庆网控科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["√", "√", "√",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","√",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","√",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "×","√",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        }, {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "×","√",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                    ],
                    // "重庆网控科技发展有限公司", "重庆网控科技有限公司", "重庆网有限公司","重庆网控科技发展有限公司", "重庆网控科技有限公司", "重庆网有限公司","重庆网控科技发展有限公司", "重庆网控科技有限公司", "重庆网有限公司"],
                    'grcs_titile_data':{
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    }
                }
            }
        }
    // } else if (get_type_num == 4) {
    } else if (get_type_num == 7) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',
                'evaluationFactors': '投标人名称',
            },
            {
                'xuhao': '2',
                'evaluationFactors': '资质',
            },
            {
                'xuhao': '3',
                'evaluationFactors': '审查项目',
            },
            {
                'xuhao': '结论',
                'evaluationFactors': '是否通过资格审查项检查',
            }
        );
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                //审查项
                'eviewrItemsMsg': {
                    'viewnBtnName': '个人资格审查项表',//左侧审查项类型
                    //头部审查类型按钮
                    'isShow': Random.integer(0, 1),//1：解锁的那个页面显示，反之进度条的那个显示
                    'tables': [{//综合评标页面进度条数据
                        'evaluationExpert': '评审专家七',
                        'businessReviewProgress': '5',
                        'isResultsBusinessReview': '未完成',
                        ' technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress':'5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }, {
                        'evaluationExpert': '评审专家五',
                        'businessReviewProgress':  '5',
                        'isResultsBusinessReview': '未完成',
                        'technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress': '5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }, {
                        'evaluationExpert': '评审专家一',
                        'businessReviewProgress':  '50',
                        'isResultsBusinessReview': '未完成',
                        'technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress': '5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }],

                    'tableData': [{
                        'dataItem': 'evaluationExpert',//评审专家（动态表头的名字绑定数据）
                        'dataName': '评审专家',//动态表头的名字
                        'type': '1'//文字
                    }, {
                        'dataItem': 'businessReviewProgress',
                        'dataName': '符合性审查项进度',
                        ' type': '2'//进度条
                    }, {
                        'dataItem': 'isResultsBusinessReview',
                        'dataName': '是否提交符合性审查评审结果',
                        'type': '1'//文字
                    },],
                    'evaluationLeader': '张三',
                    'other_explain': Random.csentence(),
                    'unlock_table_data':[
                        {
                            'number': '1',
                            'evaluationFactors': '投标人名称',
                        },
                        {
                            'number': '2',
                            'evaluationFactors': '资质',
                        },
                        {
                            'number': '3',
                            'evaluationFactors': '审查项目',
                        },
                        {
                            'number': '结论',
                            'evaluationFactors': '是否通过资格审查项检查',
                        }
                    ],
                    'unlock_table_company_name': [
                        {
                            'companyName':'重庆网控科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)",  "√(5√0×)","√(5√0×)",'合格']
                                } ,
                            ]
                        },
                        {
                            'companyName':'普瑞太阳能有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)", "√(5√0×)", "√(5√0×)",'合格']
                                } ,
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)", "√(5√0×)", "√(5√0×)",'合格'],
                                } ,
                            ]
                        },
                    ],
                    'unlock_dialog_check': [{
                        'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': Random.integer(0, 1),
                        'unlockReason': Random.csentence()
                    }],
                    'msgBox': msg,
                    'companyNameData': [
                        {
                            'companyName':'重庆网控科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["√", "×","√",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","×", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'普瑞太阳能有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","×", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","×", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "×","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "×","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","×", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "×","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","×", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","×", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","×", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","×", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","×", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","×", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "×","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","×", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","×",'合格']
                                }
                            ]
                        },
                    ],
                    'grcs_titile_data':{
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    }
                }
            }
        }
    // } else if (get_type_num == 6) {
    } else if (get_type_num == 9) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',
                'evaluationFactors': '详细评审1',
            },
            {
                'xuhao': '2',
                'evaluationFactors': '详细评审2',
            },
            {
                'xuhao': '3',
                'evaluationFactors': '详细评审3',
            },
            {
                'xuhao': '结论',
                'evaluationFactors': '是否通过资格审查项检查',
            }
        );
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                //审查项
                'eviewrItemsMsg': {
                    'viewnBtnName': '个人资格审查项表',//左侧审查项类型
                    //头部审查类型按钮

                    'isShow': Random.integer(0, 1),//1：解锁的那个页面显示，反之进度条的那个显示
                    'tables': [{//综合评标页面进度条数据
                        'evaluationExpert': '评审专家七',
                        'businessReviewProgress': '5',
                        'isResultsBusinessReview': '未完成',
                        ' technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress':'5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }, {
                        'evaluationExpert': '评审专家五',
                        'businessReviewProgress':  '5',
                        'isResultsBusinessReview': '未完成',
                        'technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress': '5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }, {
                        'evaluationExpert': '评审专家一',
                        'businessReviewProgress':  '50',
                        'isResultsBusinessReview': '未完成',
                        'technicalReviewProgress': '5',
                        'isResultsTechnicalReview': '未完成',
                        'serviceReviewProgress': '5',
                        'isResultsServiceReview':"未完成",
                        'otherReviewProgress':'5',
                        'isResultsOtherReview':"未完成"
                    }],

                    'tableData': [{
                        'dataItem': 'evaluationExpert',//评审专家（动态表头的名字绑定数据）
                        'dataName': '评审专家',//动态表头的名字
                        'type': '1'//文字
                    }, {
                        'dataItem': 'businessReviewProgress',
                        'dataName': '详细评审（技术）进度',
                        ' type': '2'//进度条
                    }, {
                        'dataItem': 'isResultsBusinessReview',
                        'dataName': '是否提交详细评审（技术）进度结果',
                        'type': '1'//文字
                    },],
                    'evaluationLeader': '张三',
                    'other_explain': Random.csentence(),
                    'unlock_table_data':[
                        {
                            'number': '1',
                            'evaluationFactors': '详细评审1',
                        },
                        {
                            'number': '2',
                            'evaluationFactors': '详细评审2',
                        },
                        {
                            'number': '3',
                            'evaluationFactors': '详细评审3',
                        },
                        {
                            'number': '结论',
                            'evaluationFactors': '是否通过资格审查项检查',
                        }
                    ],
                    'unlock_table_company_name': [
                        {
                            'companyName':'重庆网控科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)",  "√(5√0×)","√(5√0×)",'合格']
                                } ,
                            ]
                        },
                        {
                            'companyName':'普瑞太阳能有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)", "√(5√0×)", "√(5√0×)",'合格']
                                } ,
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["√(5√0×)", "√(5√0×)", "√(5√0×)",'合格'],
                                } ,
                            ]
                        },
                    ],
                    'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                    'unlock_dialog_check':[ {
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult':"同意",
                        'unlockReason': Random.csentence()
                    },{

                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult':"同意",
                        'unlockReason': Random.csentence()
                    }
                    ],
                    'msgBox': msg,
                    'companyNameData': [
                        {
                            'companyName':'重庆网控科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["√","√", "√",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","√",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","√",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'普瑞太阳能有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "×","√",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "×","√",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "×","√",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        }, {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×", "√","×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×","√", "×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×","√", "×",'合格']
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': "张三",
                                    'zhaunjia1':["×","√", "×",'合格']
                                } ,
                                {
                                    'zhaunjiamingcheng': "李二",
                                    'zhaunjia1':["×", "√","×",'合格']
                                },
                                {
                                    'zhaunjiamingcheng': "李四",
                                    'zhaunjia1':["×", "√","×",'合格']
                                }
                            ]
                        },
                    ],
                    'grcs_titile_data':{
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    }
                }
            }
        }
    }
    // return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1);
    return return_val;
});
//资格审查汇总审查提交（table）
let tijiao = Mock.mock('/api/tijiao', 'post', {
    code: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(5),

});

//符合汇总提交（table）
let tijiao_fhx = Mock.mock('/api/tijiao_fhx', 'post', {
    code: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(7),
});

//详细汇总提交（table）
let tijiao_xxjs = Mock.mock('/api/tijiao_xxjs', 'post', {
    code: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(9),
});





/*----------------------商务技术服务其他-----------------*/
Mock.mock('/api/BusinessOther', 'post', (options) => {
    // let return_val;
    // var submit_type= 1;
    // let get_type_num=JSON.parse(options.body).type;
    // var submit_type= Random.integer(0, 1);//0:未提交,1:
    // console.log(options,'前端返回来的参数');
    let return_val;
// let get_type_num=JSON.parse(options.body).type;
    let aaa=JSON.parse(options.body).is_submit_type;
    var submit_type;
    // console.log(aaa);
    if(aaa){
        submit_type=aaa;
    }else{
        submit_type= Random.integer(0, 1);
    }
    let get_type_num=JSON.parse(options.body).currentPage;
    // console.log(get_type_num,'当前进行的是第一个');
    // if (get_type_num == 7) {
    // if (get_type_num == 10) {
    //     let msg = [];
    //     msg.push(
    //         {
    //             'xuhao': '1',//序号
    //             'dafenxiang': ' 0、商务1是否是官方配置？(50.00分) ',//打分项
    //             'dingDang':'50.00'//定档
    //         },
    //     );
    //     return_val= {
    //         'bidMsg': {
    //             id: Random.id(),
    //             'name': '2019年水利运输服务招标项目',
    //             'biaoNum': '0635—1909qwerN1197',
    //             'baohao': '0635—1909qwerN1197/1',
    //             'type':submit_type,//是否提交过
    //             //审查项
    //             'eviewrItemsMsg': {
    //                 'is_tijiao': Random.integer(0, 1),//0：未提交；1：已经提交完成
    //                 'evaluationExpert': '评审专家五',//评审专家
    //                 'leibie':"商务",//大类别
    //                 'companyNameList': [//(投标人)公司名
    //
    //                     { "title":"重庆网控科技发展有限公司（1）",
    //                         'laber':' 是否是官方配置？（50.00分）',
    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
    //                             {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
    //                             {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],
    //
    //                         factors_standards:factors_standards(1)[0]
    //                     },
    //                     { "title": "普瑞太阳能有限公司（2）",
    //                         'laber':' 是否是官方配置？（50.00分）',
    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],
    //
    //                         factors_standards:factors_standards(1)[1]
    //
    //                     },
    //                     {
    //                         "title":"夏丰热工研究院有限公司（3）",
    //                         'laber':' 是否是官方配置？（50.00分）',
    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
    //                             {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
    //                             {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
    //
    //                         factors_standards:factors_standards(1)[2]
    //                     }
    //                 ],
    //                 "dingdang_tableData":[//打分项
    //                     { "grade":'商务  商务1（50.00分）', },
    //                     // { "grade":'商务   商务2（50.00分）',},
    //                 ],
    //                 'msgBox': msg,
    //                 'committeeGudges': [
    //                     {
    //                         'companyName':'重庆网科技发展有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         'companyName':'夏丰热工研究院有限公司',
    //                         'zhaunjiadata_gs':[
    //                             {
    //                                 'zhaunjiamingcheng': " 评标专家1",
    //                                 'zhaunjia1':["50.00", "50.00", "50.00"]
    //                             } ,
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家5",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             },
    //                             {
    //                                 'zhaunjiamingcheng': "评标专家7",
    //                                 'zhaunjia1':["50.00", "50.00","50.00"]
    //                             }
    //                         ]
    //                     },
    //                 ],
    //
    //                 'viewScheduleTitileData':{
    //                     'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
    //                     + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
    //                     + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
    //                     + '/' + '评委会',//     评标委员会
    //                     'bagName': '第' + Random.natural(0, 9) + '包',//分包号
    //                 },
    //                 'viewUnfinishedData':[
    //                     {
    //                         'gongyingshang': '重庆网控科技发展有限公司',//序号
    //                         'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
    //                     },
    //                     {
    //                         'gongyingshang': '普瑞太阳能有限公司',//序号
    //                         'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
    //                     },
    //                     {
    //                         'gongyingshang': '夏丰热工研究院有限公司',//序号
    //                         'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
    //                     },
    //                 ]
    //             }
    //         }
    //     }
    //     // } else if (get_type_num == 8) {
    // }
     if (get_type_num == 10) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',//序号
                'dafenxiang': ' 0、商务1是否是官方配置？(50.00分) ',//打分项
                'dingDang':'50.00',//定档
            },
        );
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type':submit_type,//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'is_tijiao': Random.integer(0, 1),//0：未提交；1：已经提交完成
                    'evaluationExpert': '评审专家五',//评审专家
                    'leibie':"商务",//大类别
                    'gongzuo_name':'评分',
                    'companyNameList': [//(投标人)公司名
                        { "title":"重庆网控科技发展有限公司（1）",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],
                            factors_standards:factors_standards(2)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],
                            factors_standards:factors_standards(2)[1]
                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（4）",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"益达天热产物有限公司（5）",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"白云电力试验研究所（6）",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（7）",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"大连跃胜贸易有限公司（8）",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"跃胜贸易有限公司（9）",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"招管通测试一（10）",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"招管通测试二（11）",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"北京麦德森医疗器械有限公司（12）",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"闪电果业发展股份有限公司（13）",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"中招国际招标有限公司（14）",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        },
                        {
                            "title":"上海盛泰广告有限责任公司（15）",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(2)[2]
                        }
                    ],
                    "dingdang_tableData":[
                        // /*加的数据*/
                        //
                        // {
                        //     projectName: '第一章、其他(1.00分-60.00分)',
                        //     type: 'inputLabour',// 人工录入法
                        //     radioList: [],
                        //     min: 1,
                        //     max: 60,
                        //     tit: '是否是官方配置？',
                        //     value1: '',
                        //     value2: '',
                        //     value3: ''
                        // },
                        //
                        // {
                        //     projectName: '第一章、服务1(50.00分)',
                        //     type: 'inputSelect',// 布距法
                        //     radioList: [{
                        //         num: '0',
                        //         typeTitle: '0',
                        //         gradeExplain:'',
                        //
                        //     }, {
                        //         num: '5',
                        //         typeTitle: '5',
                        //         gradeExplain:"",
                        //
                        //     }, {
                        //         num: '10',
                        //         typeTitle: '10',
                        //         gradeExplain:"",
                        //
                        //     }, {
                        //         num: '15',
                        //         typeTitle: '15',
                        //         gradeExplain:"",
                        //rowIndex: 0
                        //     }, {
                        //         num: "20",
                        //         typeTitle: '20',
                        //         gradeExplain:"" ,
                        //
                        //     },{
                        //         num: '25',
                        //         typeTitle: '25',
                        //         gradeExplain:"",
                        //
                        //     }, {
                        //         num: '30',
                        //         typeTitle: '30',
                        //         gradeExplain:"",
                        //
                        //     }, {
                        //         num: '35',
                        //         typeTitle: '35',
                        //         gradeExplain:"",
                        //
                        //     }, {
                        //         num: '40',
                        //         typeTitle: '40',
                        //         gradeExplain:"",
                        //
                        //     },{
                        //         num: '45',
                        //         typeTitle: '45',
                        //         gradeExplain:"",
                        //
                        //     }, {
                        //         num: '50',
                        //         typeTitle: '50',
                        //         gradeExplain:"",
                        //     },
                        //     ],
                        //     min: 10,
                        //     max: 50,
                        //     tit: '是否是官方配置？',
                        //     value1: '',
                        //     value2: '',
                        //     value3: '',//有多少个投标人就有多少个value(index+1)
                        //     typeTitle: '10',
                        // },
                        // {
                        //     projectName: '第一章，技术(14.00)分',
                        //     type: 'checkbox',//复选
                        //     radioList: [
                        //         {typeTitle: 'A (2.00)分', num: '2'},
                        //         {typeTitle: 'B (3.00)分', num:'3' },
                        //         {typeTitle: 'C (4.00)分', num: '4',},
                        //         {typeTitle: 'D (5.00)分', num: '5',}
                        //     ],
                        //     min: null,
                        //     max: null,
                        //     tit: '',
                        //     value1:[],
                        //     value2:[] ,
                        //     value3: [],
                        // },
                        //
                        // /*加的数据*/
                        {
                            projectName: '第一章，商务10分',
                            type: 'radio',//单选
                            radioList: [
                                {typeTitle: 'A 10分', num: 10},
                                {typeTitle: 'B 20分', num: 20 },
                                {typeTitle: 'C 30分', num: 30,}
                            ],
                            min: null,
                            max: null,
                            tit: '',
                            value1:'',
                            value2:'' ,
                            value3: '',
                            value4:'',
                            value5:'' ,
                            value6: '',
                            value7: '',
                            value8: '',
                            value9: '',
                            value10: '',
                            value11: '',
                            value12: '',
                            value13: '',
                            value14: '',
                            value15: '',
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 0
                        },
                        {
                            projectName: '第二章，商务20分',
                            type: 'input',// 两步法
                            radioList: [],
                            min: 10,
                            max: 50,
                            tit: '是否是官方配置？',
                            // value1: '',
                            // value2: '',
                            // value3: '',
                            // bool1:true,
                            // bool2:true,
                            // bool3:true,
                            value1:'',
                            value2:'' ,
                            value3: '',
                            value4:'',
                            value5:'' ,
                            value6: '',
                            value7: '',
                            value8: '',
                            value9: '',
                            value10: '',
                            value11: '',
                            value12: '',
                            value13: '',
                            value14: '',
                            value15: '',
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 1
                        },
                        {
                            projectName: '商务小计',
                            type: 'numberShangwu',
                            radioList: [],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2:0,
                            value3:0,
                            value4:0,
                            value5:0 ,
                            value6: 0,
                            value7: 0,
                            value8: 0,
                            value9: 0,
                            value10:0,
                            value11: 0,
                            value12: 0,
                            value13: 0,
                            value14: 0,
                            value15: 0,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 2
                        },
                        {
                            projectName: '总计',
                            type: 'numberTotle',
                            radioList: [ ],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2: 0,
                            value3: 0,
                            value4:0,
                            value5:0 ,
                            value6: 0,
                            value7: 0,
                            value8: 0,
                            value9: 0,
                            value10:0,
                            value11: 0,
                            value12: 0,
                            value13: 0,
                            value14: 0,
                            value15: 0,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 3
                        },
                    ],
                    'msgBox': msg,//查看定档评议弹框表投标人数据
                    'committeeGudges': [//查看定档评议表table数据
                        {
                            'companyName':'重庆网科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },

                    ],
                    'viewScheduleTitileData':{//查看定档评议表弹框表表头数据
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    },
                    'viewUnfinishedData':[//未完成弹框table数据
                        {
                            'gongyingshang': '重庆网控科技发展有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '普瑞太阳能有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '夏丰热工研究院有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                    ]
                }
            }
        }
    }
    else if (get_type_num == 11) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',//序号
                'dafenxiang': ' 0、商务1是否是官方配置？(50.00分) ',//打分项
                'dingDang':'50.00',//定档
            },
        );
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type':submit_type,//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'is_tijiao': Random.integer(0, 1),//0：未提交；1：已经提交完成
                    'evaluationExpert': '评审专家五',//评审专家
                    'leibie':"商务",//大类别
                    'gongzuo_name':'评分',
                    'companyNameList': [//(投标人)公司名
                        { "title":"重庆网控科技发展有限公司（1）",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],

                            factors_standards:factors_standards(3)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],

                            factors_standards:factors_standards(3)[1]

                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],

                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（4）",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"益达天热产物有限公司（5）",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"白云电力试验研究所（6）",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（7）",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"大连跃胜贸易有限公司（8）",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"跃胜贸易有限公司（9）",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"招管通测试一（10）",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"招管通测试二（11）",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"北京麦德森医疗器械有限公司（12）",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"闪电果业发展股份有限公司（13）",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"中招国际招标有限公司（14）",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        },
                        {
                            "title":"上海盛泰广告有限责任公司（15）",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(3)[2]
                        }
                    ],
                    "dingdang_tableData":[

                        {
                            projectName: '第一章，技术(14.00)分',
                            type: 'checkbox',//单选
                            radioList: [
                                {typeTitle: 'A (2.00)分', num: '2'},
                                {typeTitle: 'B (3.00)分', num:'3' },
                                {typeTitle: 'C (4.00)分', num: '4',},
                                {typeTitle: 'D (5.00)分', num: '5',}
                            ],
                            min: null,
                            max: null,
                            tit: '',
                            value1:[],
                            value2:[] ,
                            value3: [],
                            value4:[],
                            value5:[] ,
                            value6: [],
                            value7:[],
                            value8:[] ,
                            value9: [],
                            value10:[],
                            value11:[] ,
                            value12: [],
                            value13: [],
                            value14: [],
                            value15: [],
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain14:'',
                            gradeExplain15:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 0
                        },
                        {
                            projectName: '技术小计',
                            type: 'numberJishu',
                            radioList: [],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2:0,
                            value3:0,
                            value4: 0,
                            value5:0,
                            value6:0,
                            value7: 0,
                            value8:0,
                            value9:0,
                            value10: 0,
                            value11:0,
                            value12:0,
                            value13: 0,
                            value14:0,
                            value15:0,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 1
                        },
                        {
                            projectName: '总计',
                            type: 'numberTotle',
                            radioList: [ ],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2: 0,
                            value3: 0,
                            value4: 0,
                            value5:0,
                            value6:0,
                            value7: 0,
                            value8:0,
                            value9:0,
                            value10: 0,
                            value11:0,
                            value12:0,
                            value13: 0,
                            value14:0,
                            value15:0,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 2
                        },
                    ],
                    'msgBox': msg,//查看定档评议弹框表投标人数据
                    'committeeGudges': [//查看定档评议表table数据
                        {
                            'companyName':'重庆网科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },

                    ],
                    'viewScheduleTitileData':{//查看定档评议表弹框表表头数据
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    },
                    'viewUnfinishedData':[//未完成弹框table数据
                        {
                            'gongyingshang': '重庆网控科技发展有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '普瑞太阳能有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '夏丰热工研究院有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                    ]
                }
            }
        }
    }
    else if (get_type_num == 12) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',//序号
                'dafenxiang': ' 0、商务1是否是官方配置？(50.00分) ',//打分项
                'dingDang':'50.00',//定档
            },
        );
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type':submit_type,//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'is_tijiao': Random.integer(0, 1),//0：未提交；1：已经提交完成
                    'evaluationExpert': '评审专家五',//评审专家
                    'leibie':"商务",//大类别
                    'gongzuo_name':'评分',
                    'companyNameList': [//(投标人)公司名
                        { "title":"重庆网控科技发展有限公司（1）",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],

                            factors_standards:factors_standards(4)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],
                            factors_standards:factors_standards(4)[1]
                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（4）",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"益达天热产物有限公司（5）",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"白云电力试验研究所（6）",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（7）",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"大连跃胜贸易有限公司（8）",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"跃胜贸易有限公司（9）",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"招管通测试一（10）",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"招管通测试二（11）",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"北京麦德森医疗器械有限公司（12）",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"闪电果业发展股份有限公司（13）",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"中招国际招标有限公司（14）",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        },
                        {
                            "title":"上海盛泰广告有限责任公司（15）",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(4)[2]
                        }
                    ],
                    "dingdang_tableData":[
                        {
                            projectName: '第一章、服务1(50.00分)',
                            type: 'inputSelect',// 两步法
                            radioList: [{
                                num: '0',
                                typeTitle: '0',
                            }, {
                                num: '5',
                                typeTitle: '5',
                            }, {
                                num: '10',
                                typeTitle: '10',
                            }, {
                                num: '15',
                                typeTitle: '15',
                            }, {
                                num: "20",
                                typeTitle: '20',
                            },{
                                num: '25',
                                typeTitle: '25',
                            }, {
                                num: '30',
                                typeTitle: '30',
                            }, {
                                num: '35',
                                typeTitle: '35',
                            }, {
                                num: '40',
                                typeTitle: '40',
                            },{
                                num: '45',
                                typeTitle: '45',
                            }, {
                                num: '50',
                                typeTitle: '50',
                            },
                            ],
                            min: 10,
                            max: 50,
                            tit: '是否是官方配置？',
                            value1: '',
                            value2: '',
                            value3: '',//有多少个投标人就有多少个value(index+1)
                            value4:'',
                            value5:'' ,
                            value6: '',
                            value7: '',
                            value8: '',
                            value9: '',
                            value10: '',
                            value11: '',
                            value12: '',
                            value13: '',
                            value14: '',
                            value15: '',
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 0
                        },
                        {
                            projectName: '服务小计',
                            type: 'numberFuwu',
                            radioList: [],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2:0,
                            value3:0,
                            value4: 0,
                            value5:0,
                            value6:0,
                            value7: 0,
                            value8:0,
                            value9:0,
                            value10: 0,
                            value11:0,
                            value12:0,
                            value13: 0,
                            value14:0,
                            value15:0,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,//控制radio，是不是显示状态
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 1
                        },
                        {
                            projectName: '总计',
                            type: 'numberTotle',
                            radioList: [ ],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2: 0,
                            value3: 0,
                            value4: 0,
                            value5:0,
                            value6:0,
                            value7: 0,
                            value8:0,
                            value9:0,
                            value10: 0,
                            value11:0,
                            value12:0,
                            value13: 0,
                            value14:0,
                            value15:0,
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 2
                        },
                    ],
                    'msgBox': msg,//查看定档评议弹框表投标人数据
                    'committeeGudges': [//查看定档评议表table数据
                        {
                            'companyName':'重庆网科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                    ],
                    'viewScheduleTitileData':{//查看定档评议表弹框表表头数据
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    },
                    'viewUnfinishedData':[//未完成弹框table数据
                        {
                            'gongyingshang': '重庆网控科技发展有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '普瑞太阳能有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '夏丰热工研究院有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                    ]
                }
            }
        }
    }
    else if (get_type_num == 13) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',//序号
                'dafenxiang': ' 0、商务1是否是官方配置？(50.00分) ',//打分项
                'dingDang':'50.00',//定档
            },
        );
        return_val= {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'type':submit_type,//是否提交过
                //审查项
                'eviewrItemsMsg': {
                    'is_tijiao': Random.integer(0, 1),//0：未提交；1：已经提交完成
                    'evaluationExpert': '评审专家五',//评审专家
                    'leibie':"商务",//大类别
                    'gongzuo_name':'评分',
                    'companyNameList': [//(投标人)公司名
                        { "title":"重庆网控科技发展有限公司（1）",
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],

                            factors_standards:factors_standards(5)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],

                            factors_standards:factors_standards(5)[1]

                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],

                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（4）",
                            pdf: [{id: 'pdf4_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf4_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"益达天热产物有限公司（5）",
                            pdf: [{id: 'pdf5_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf5_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"白云电力试验研究所（6）",
                            pdf: [{id: 'pdf6_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf6_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"上海科技信息股份有限公司（7）",
                            pdf: [{id: 'pdf7_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf7_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"大连跃胜贸易有限公司（8）",
                            pdf: [{id: 'pdf8_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf8_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"跃胜贸易有限公司（9）",
                            pdf: [{id: 'pdf9_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf9_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"招管通测试一（10）",
                            pdf: [{id: 'pdf10_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf10_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"招管通测试二（11）",
                            pdf: [{id: 'pdf11_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf11_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"北京麦德森医疗器械有限公司（12）",
                            pdf: [{id: 'pdf12_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf12_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"闪电果业发展股份有限公司（13）",
                            pdf: [{id: 'pdf13_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf13_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"中招国际招标有限公司（14）",
                            pdf: [{id: 'pdf14_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf14_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        },
                        {
                            "title":"上海盛泰广告有限责任公司（15）",
                            pdf: [{id: 'pdf15_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf15_3', pdf_name: 'pdf文件33', 'url1': "/documents/投标人4.pdf"}],
                            factors_standards:factors_standards(5)[2]
                        }
                    ],
                    "dingdang_tableData":[
                        {
                            projectName: '第一章、其他(1.00分-60.00分)',
                            type: 'inputLabour',// 两步法
                            radioList: [],
                            min: 1,
                            max: 60,
                            tit: '是否是官方配置？',
                            value1: '',
                            value2: '',
                            value3: '',
                            value4:'',
                            value5:'' ,
                            value6: '',
                            value7: '',
                            value8: '',
                            value9: '',
                            value10: '',
                            value11: '',
                            value12: '',
                            value13: '',
                            value14: '',
                            value15: '',
                            gradeExplain1:"",
                            gradeExplain2:"",
                            gradeExplain3:"",
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 0
                        },
                        {
                            projectName: '其他小计',
                            type: 'numberOther',
                            radioList: [],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2:0,
                            value3:0,
                            value4: 0,
                            value5:0,
                            value6:0,
                            value7: 0,
                            value8:0,
                            value9:0,
                            value10: 0,
                            value11:0,
                            value12:0,
                            value13: 0,
                            value14:0,
                            value15:0,
                            gradeExplain1:"",
                            gradeExplain2:"",
                            gradeExplain3:"",
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 1
                        },
                        {
                            projectName: '总计',
                            type: 'numberTotle',
                            radioList: [ ],
                            min: null,
                            max: null,
                            tit: '',
                            value1: 0,
                            value2: 0,
                            value3: 0,
                            value4: 0,
                            value5:0,
                            value6:0,
                            value7: 0,
                            value8:0,
                            value9:0,
                            value10: 0,
                            value11:0,
                            value12:0,
                            value13: 0,
                            value14:0,
                            value15:0,
                            gradeExplain1:"",
                            gradeExplain2:"",
                            gradeExplain3:"",
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                            gradeExplain8:'',
                            gradeExplain9:'',
                            gradeExplain10:'',
                            gradeExplain11:'',
                            gradeExplain12:'',
                            gradeExplain13:'',
                            gradeExplain114:'',
                            gradeExplain115:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            bool4:true,
                            bool5:true,
                            bool6:true,
                            bool7:true,
                            bool8:true,
                            bool9:true,
                            bool10:true,
                            bool11:true,
                            bool12:true,
                            bool13:true,
                            bool14:true,
                            bool15:true,
                            rowIndex: 2//相当于id
                        },
                    ],
                    'msgBox': msg,//查看定档评议弹框表投标人数据
                    'committeeGudges': [//查看定档评议表table数据
                        {
                            'companyName':'重庆网科技发展有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjiamingcheng': " 评标专家1",
                                    'zhaunjia1':["50.00", "50.00", "50.00"]
                                } ,
                                {
                                    'zhaunjiamingcheng': "评标专家5",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                },
                                {
                                    'zhaunjiamingcheng': "评标专家7",
                                    'zhaunjia1':["50.00", "50.00","50.00"]
                                }
                            ]
                        },

                    ],
                    'viewScheduleTitileData':{//查看定档评议表弹框表表头数据
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    },
                    'viewUnfinishedData':[//未完成弹框table数据
                        {
                            'gongyingshang': '重庆网控科技发展有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '普瑞太阳能有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                        {
                            'gongyingshang': '夏丰热工研究院有限公司',//序号
                            'dafenxiangweizhi': ' 第1.0页；商务1 ',//打分项
                        },
                    ]
                }
            }
        }
    }
    // return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1,submit_type);
    return return_val;
});

//商务提交
let business_tijiao = Mock.mock('/api/business_tijiao', 'post', {
    status: 200,
    message: '成功!',
    data:
        {
            projectName: '总计',
            type: 'numberTotle',
            radioList: [ ],
            min: null,
            max: null,
            tit: '',
            value1: 23,
            value2: 45,
            value3: 36,
            gradeExplain1:"",
            gradeExplain2:"",
            gradeExplain3:"",
        },
    // [{
    //         projectName: '第一章，商务10分',
    //             type: 'radio',//单选
    //         radioList: [
    //
    //     ],
    //         min: null,
    //         max: null,
    //         tit: '',
    //         value1:10,
    //         value2:10 ,
    //         value3: 10
    //     },
    //     {
    //         projectName: '第二章，商务20分',
    //         type: 'input',// 两步法
    //         radioList: [],
    //         min: 10,
    //         max: 50,
    //         tit: '',
    //         value1: 10,
    //         value2: 10,
    //         value3: 10
    //     },
    //     {
    //         projectName: '商务小计',
    //         type: 'numberShangwu',
    //         radioList: [],
    //         min: null,
    //         max: null,
    //         tit: '',
    //         value1: 10,
    //         value2:10,
    //         value3:10,
    //     },
    //     {
    //         projectName: '总计',
    //          type: 'numberTotle',
    //         radioList: [ ],
    //         min: null,
    //         max: null,
    //         tit: '',
    //         value1: 23,
    //         value2: 45,
    //         value3: 36
    //     },
    //     ],
    vue_type: get_data(10),
});

//技术提交
let jishu_tijiao = Mock.mock('/api/jishu_tijiao', 'post', {
    status: 200,
    message: '成功!',
    data:  {
        projectName: '总计',
        type: 'numberTotle',
        radioList: [ ],
        min: null,
        max: null,
        tit: '',
        value1: 23,
        value2: 45,
        value3: 36,
        gradeExplain1:"",
        gradeExplain2:"",
        gradeExplain3:"",
    },

    vue_type: get_data(11),
});
//服务提交
let fuwu_tijiao = Mock.mock('/api/fuwu_tijiao', 'post', {
    status: 200,
    message: '成功!',
    data:  {
        projectName: '总计',
        type: 'numberTotle',
        radioList: [ ],
        min: null,
        max: null,
        tit: '',
        value1: 23,
        value2: 45,
        value3: 36,
        gradeExplain1:"",
        gradeExplain2:"",
        gradeExplain3:"",
    },
    vue_type: get_data(12),
});

//其他提交
let qita_tijiao = Mock.mock('/api/qita_tijiao', 'post', {
    status: 200,
    message: '成功!',
    data:  {
        projectName: '总计',
        type: 'numberTotle',
        radioList: [ ],
        min: null,
        max: null,
        tit: '',
        value1: 23,
        value2: 45,
        value3: 36,
        gradeExplain1:"",
        gradeExplain2:"",
        gradeExplain3:"",
    },
    vue_type: get_data(13),
});

/*----------------------定档商务技术服务其他end-----------------*/


// 资格审查项汇总页面table接口
Mock.mock('/api/pingshen_huizong', 'post', (options) => {
    // console.log(options,'前端返回来的参数');
    let return_val;
// let get_type_num=JSON.parse(options.body).type;

    var submit_type;
    let aaa=JSON.parse(options.body).is_submit_type;
    // console.log(aaa);
    if(aaa){
        submit_type=aaa;
    }else{
        submit_type= Random.integer(0, 1);
    }

    let get_type_num=JSON.parse(options.body).currentPage;
    // console.log(get_type_num,'当前进行的是第一个');
    // let get_type_num=JSON.parse(options.body).type;
    let methodType=JSON.parse(options.body).methodType;
    // console.log(methodType);
    if(get_type_num==14&& methodType==1){//合理低价
        let msg = [];
        let data_msg = [];
        let dataMsg = [];
        let is_tijaio=Random.integer(0, 1);
        for (let i = 0; i < Random.integer(3,8); i++) {
            msg.push({//报价评审弹框报价计算table
                'id': Random.id(),
                'bid_name': "重庆网控科技发展有限公司",
                'tender_offer': Random.integer(100, 9999),
                'bid_price': Random.integer(100, 9999),
                // 'base_rice': Random.integer(100, 9999),
                // 'bias_ratio': Random.integer(0, 100),
                'base_rice':'',
                'bias_ratio':"",
                'radio': 2,

            });
            data_msg.push({//评审汇总table
                'id': Random.id(),
                'num': Random.integer(1, 7),
                'name': "（1）重庆网控科技发展有限公司",
                'tender_offer': '10000.0000',
                'total': '10000.0000',
                'ranking': Random.integer(1, 7),
            });
            dataMsg.push({//排序
                'company_name': Random.csentence(1, 10),
                'id': Random.id(),
                'ranking': Random.integer(1, 7),
            });
        }
        return {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                //审查项
                'eviewrItemsMsg': {
                    //头部审查类型按钮
                    // 'viewType':get_data(70,is_tijaio),
                    'isShow':submit_type,//0：提交前那个页面显示，1:提交的页面
                    'tijiao':'is_tijaio',
                    'bidEvaluation': msg,
                    'scoringBasePrice':1000,//合理低价的系统计算评分基准价(报价评审弹框)
                    'review_summary': data_msg,
                    'sort_data': dataMsg,//排序

                    //没有用

                    //'pingbiao_yijian': dataMsg,
                    'jiesuoData':{//评分解锁
                        'radioList': [{
                            value: '1',
                            label:'商务'
                        },{
                            value: '2',
                            label:'技术'
                        }, {
                            value: '3',
                            label:'服务'
                        },{
                            value: '4',
                            label:'其他'
                        } ],
                        'checkedList': ['评审专家七', '评审专家五', '评审专家一'],
                        "tippsDialogName":'解锁申请'//评分解锁成功提示框的name
                    },
                    'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                    'unlock_dialog_check':[ {
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': "同意",
                        'unlockReason': Random.csentence()
                    },{

                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': "同意",
                        'unlockReason': Random.csentence()
                    }],
                    "zhaunjiaGerenMarkData":  [
                        {
                            'evaluationFactors': '第一章、商务(10.00分)',
                            value1:'-',
                            value2:'-',
                            value3:'-',
                            value4:'-',
                            value5:'-',
                            value6:'-',
                            value7:'-',
                            value8:'-',
                            value9:'-',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'10.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',

                        },
                        {
                            'evaluationFactors': '第二章、商务2(20.00分)',
                            value1:'5.00',
                            value2:'14.00 ',
                            value3:'7.00',
                            value4:'10.00',
                            value5:'17.00',
                            value6:'13.00',
                            value7:'8.00',
                            value8:'9.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、商务2(20.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(8.00分)',
                            value1:'64.00',
                            value2:'80.00 ',
                            value3:'34.00',
                            value4:'16.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'23.00',
                            value8:'34.00',
                            value9:'57.00',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'49.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'13.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '第三章、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'12.00',
                            value5:'18.00',
                            value6:'15.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'14.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '专家个人打分',
                            value1:'40.00',
                            value2:'40.00 ',
                            value3:'38.00',
                            value4:'15.00',
                            value5:'17.00',
                            value6:'18.00',
                            value7:'33.00',
                            value8:'37.00',
                            value9:'53.00',
                        },
                    ],
                    'companyNameData': [
                        {
                            'name':'张三',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                        {
                            'name':'王五',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                        {
                            'name':'李四',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                    ],
                    'pingshenhuizongTableData': [
                        {
                            // 'bidderNumber': '2',
                            'bidder': '(2)夏丰热工研究院有限公司',
                            "pricePoints":'21.00',
                            'finalScore':'12.00',
                            "ranking":'3',
                            'creditScoring':'9.50',
                        },
                        {
                            // 'bidderNumber': '3',
                            'bidder': '(3)普瑞太阳能有限公司',
                            "pricePoints":'49.00',
                            'finalScore':'10.00',
                            "ranking":'2',
                            'creditScoring':'7.00'
                        },
                        {
                            // 'bidderNumber': '1',
                            'bidder': '(1)阿里巴巴',
                            "pricePoints":'29.00',
                            'finalScore':'10.00',
                            "ranking":'1',
                            'creditScoring':'8.00'
                        },
                    ],
                    'pingshenweiyuanData': [
                        {
                            'name':'评标专家七',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["33.00",  "31.00","38.00",]
                                } ,
                            ]
                        },
                        {
                            'name':'评标专家五',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["31.00",  "36.00","39.00",]
                                } ,
                            ]
                        },
                        {
                            'name':'评标专家一',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["32.00",  "31.00","38.00",]
                                } ,
                            ]
                        },
                    ],
                    tables: [{//综合评标页面进度条数据
                        evaluationExpert: '评审专家七',
                        businessReviewProgress: '5',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress:'5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }, {
                        evaluationExpert: '评审专家五',
                        businessReviewProgress:  '5',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress: '5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }, {
                        evaluationExpert: '评审专家一',
                        businessReviewProgress:  '50',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress: '5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }],
                    'biddersScoreTitleData':[],
                    tableData: [{
                        dataItem: 'evaluationExpert',//评审专家（动态表头的名字绑定数据）
                        dataName: '评审专家',//动态表头的名字
                        type: '1'//文字
                    }, {
                        dataItem: 'businessReviewProgress',
                        dataName: '商务评审进度',
                        type: '2'//进度条
                    }, {
                        dataItem: 'isResultsBusinessReview',
                        dataName: '是否提交商务评审结果',
                        type: '1'//文字
                    }, {
                        dataItem: 'technicalReviewProgress',
                        dataName: '技术评审进度',
                        type: '2'//进度条
                    }, {
                        dataItem: 'isResultsTechnicalReview',
                        dataName: '是否提交技术评审结果',
                        type: '1'//文字

                    }, {
                        dataItem: 'serviceReviewProgress',
                        dataName: '服务评审进度',
                        type: '2'//进度条

                    },{
                        dataItem: 'isResultsServiceReview',
                        dataName: '是否提交服务评审结果',
                        type: '1'//文字

                    },{
                        dataItem: 'otherReviewProgress',
                        dataName: '其他评审进度',
                        type: '2'//进度条

                    },{
                        dataItem: 'isResultsOtherReview',
                        dataName: '其他评审评审结果',
                        type: '1'//文字
                    }]
                    //没有用
                },
            }
        }
    }
    else if(get_type_num==14 && methodType==2){//综合评标
        let msg = [];
        let data_msg = [];
        let dataMsg = [];
        let is_tijaio=Random.integer(0, 1);
        let tijaio=Random.integer(0, 1);
        for (let i = 0; i < Random.integer(3,8); i++) {
            dataMsg.push({//排序
                'company_name': Random.csentence(1, 10),
                'id': Random.id(),
                'ranking': Random.integer(1, 7),
            });
        }
        return {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                'eviewrItemsMsg': {
                    //头部审查类型按钮
                    // 'viewType':get_data(70,is_tijaio),
                    'isShow':submit_type,//0：提交前那个页面显示，1:提交的页面
                    'tijiao':tijaio,//综合评标评审汇总页面是否提交
                    'scoringBasePrice':1000,//综合评标的系统计算评分基准价(报价评审弹框)
                    'bidEvaluation': [{//计算报价得分
                        toubiaoPrice: '31,000,00',
                        name: '（1）夏丰热工研究院有限公司',
                        evaluationBid: '31,000,00',
                        // standardPrice:'30,000,00',
                        // beitaValue:'-10.00',
                        // scoringSystem:'52.2',
                        standardPrice:'',
                        beitaValue:'',
                        scoringSystem:'',
                        score: ''
                    },{
                        toubiaoPrice: '33,000,00 ',
                        name: '（2）普瑞太阳能有限公司',
                        evaluationBid: '28,000,00',
                        // standardPrice:'30,000,00',
                        // beitaValue:'-20.00',
                        // scoringSystem:'45.2',
                        standardPrice:'',
                        beitaValue:'',
                        scoringSystem:'',
                        score: ''
                    }, {
                        toubiaoPrice: '30,000,00',
                        name: '（3）夏风热工研究有限公司',
                        evaluationBid: '30,000,00',
                        // standardPrice:'30,000,00',
                        // beitaValue:'-0.00',
                        // scoringSystem:'53',
                        standardPrice:'',
                        beitaValue:'',
                        scoringSystem:'',
                        score: ''
                    }],
                   // 'pingbiao_yijian': dataMsg,
                    'sort_data': dataMsg,//排序
                    'jiesuoData':{//评分解锁
                        'radioList': [{
                            value: '1',
                            label:'商务'
                        },{
                            value: '2',
                            label:'技术'
                        }, {
                            value: '3',
                            label:'服务'
                        },{
                            value: '4',
                            label:'其他'
                        } ],
                        'checkedList': ['评审专家七', '评审专家五', '评审专家一'],
                        "tippsDialogName":'解锁申请'//评分解锁成功提示框的name
                    },
                    'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                    'unlock_dialog_check':[ {
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult':"同意",
                        'unlockReason': Random.csentence()
                    },{
                         'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult':"同意",
                        'unlockReason': Random.csentence()
                    }],
                    'biddersScoreTable':[//投标人分项得分表数据
                        {
                            'evaluationFactors': '第一章、商务(10.00分)',
                            value1:'-',
                            value2:'-',
                            value3:'-',
                            value4:'-',
                            value5:'-',
                            value6:'-',
                            value7:'-',
                            value8:'-',
                            value9:'-',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'10.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '第二章、商务2(20.00分)',
                            value1:'5.00',
                            value2:'14.00 ',
                            value3:'7.00',
                            value4:'10.00',
                            value5:'17.00',
                            value6:'13.00',
                            value7:'8.00',
                            value8:'9.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、商务2(20.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(8.00分)',
                            value1:'64.00',
                            value2:'80.00 ',
                            value3:'34.00',
                            value4:'16.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'23.00',
                            value8:'34.00',
                            value9:'57.00',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'49.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'13.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '第三章、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'12.00',
                            value5:'18.00',
                            value6:'15.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'14.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '专家个人打分',
                            value1:'40.00',
                            value2:'40.00 ',
                            value3:'38.00',
                            value4:'15.00',
                            value5:'17.00',
                            value6:'18.00',
                            value7:'33.00',
                            value8:'37.00',
                            value9:'53.00',
                        },
                    ],
                    'biddersScoreTitleData':[
                        {
                            'companyName':'重庆网控科技发展有限公司(1)',//投标人
                            'NameList':[//评审人
                                {  'name':'张三', },
                                {  'name':'王五', },
                                {  'name':'李四', }
                                ]
                        },
                        {
                            'companyName':'普瑞太阳能有限公司(1)',//投标人
                            'NameList':[//评审人
                                {  'name':'张三', },
                                {  'name':'王五', },
                                {  'name':'李四', }
                            ]
                        },
                        {
                            'companyName':'夏丰热工研究院有限公司(1)',//投标人
                            'NameList':[//评审人
                                {  'name':'张三', },
                                {  'name':'王五', },
                                {  'name':'李四', }
                            ]
                        },
                    ],//投标人
                    "zhaunjiaGerenMarkData":  [//专家个人打分表数据
                        {
                            'evaluationFactors': '第一章、商务(10.00分)',
                            value1:'-',
                            value2:'-',
                            value3:'-',
                            value4:'-',
                            value5:'-',
                            value6:'-',
                            value7:'-',
                            value8:'-',
                            value9:'-',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'10.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '第二章、商务2(20.00分)',
                            value1:'5.00',
                            value2:'14.00 ',
                            value3:'7.00',
                            value4:'10.00',
                            value5:'17.00',
                            value6:'13.00',
                            value7:'8.00',
                            value8:'9.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、商务2(20.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(8.00分)',
                            value1:'64.00',
                            value2:'80.00 ',
                            value3:'34.00',
                            value4:'16.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'23.00',
                            value8:'34.00',
                            value9:'57.00',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'49.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'13.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '第三章、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'12.00',
                            value5:'18.00',
                            value6:'15.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'14.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '专家个人打分',
                            value1:'40.00',
                            value2:'40.00 ',
                            value3:'38.00',
                            value4:'15.00',
                            value5:'17.00',
                            value6:'18.00',
                            value7:'33.00',
                            value8:'37.00',
                            value9:'53.00',
                        },
                    ],
                    'companyNameData': [//评审人和投标人数据
                        {
                            'name':'张三',//评审人
                            'companyNameList': [//投标人
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                        {
                            'name':'王五',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                        {
                            'name':'李四',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                    ],//评审人数据
                    'pingshenhuizongTableData': [
                        {
                            // 'bidderNumber': '2',
                            'bidder': '(2)夏丰热工研究院有限公司',
                            "pricePoints":'21.00',
                            'finalScore':'12.00',
                            "ranking":'3',
                            'creditScoring':'9.50',
                        },
                        {
                            // 'bidderNumber': '3',
                            'bidder': '(3)普瑞太阳能有限公司',
                            "pricePoints":'49.00',
                            'finalScore':'10.00',
                            "ranking":'2',
                            'creditScoring':'7.00'
                        },
                        {
                            // 'bidderNumber': '1',
                            'bidder': '(1)阿里巴巴',
                            "pricePoints":'29.00',
                            'finalScore':'10.00',
                            "ranking":'1',
                            'creditScoring':'8.00'
                        },
                    ],
                    'pingshenweiyuanData': [
                        {
                            'name':'评标专家七',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["33.00",  "31.00","38.00",]
                                } ,
                            ]
                        },
                        {
                            'name':'评标专家五',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["31.00",  "36.00","39.00",]
                                } ,
                            ]
                        },
                        {
                            'name':'评标专家一',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["32.00",  "31.00","38.00",]
                                } ,
                            ]
                        },
                    ],
                    tables: [{//综合评标页面进度条数据
                        evaluationExpert: '评审专家七',
                        businessReviewProgress: '5',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress:'5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }, {
                        evaluationExpert: '评审专家五',
                        businessReviewProgress:  '5',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress: '5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }, {
                        evaluationExpert: '评审专家一',
                        businessReviewProgress:  '50',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress: '5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }],

                    tableData: [{
                        dataItem: 'evaluationExpert',//评审专家（动态表头的名字绑定数据）
                        dataName: '评审专家',//动态表头的名字
                        type: '1'//文字
                    }, {
                        dataItem: 'businessReviewProgress',
                        dataName: '商务评审进度',
                        type: '2'//进度条
                    }, {
                        dataItem: 'isResultsBusinessReview',
                        dataName: '是否提交商务评审结果',
                        type: '1'//文字
                    }, {
                        dataItem: 'technicalReviewProgress',
                        dataName: '技术评审进度',
                        type: '2'//进度条
                    }, {
                        dataItem: 'isResultsTechnicalReview',
                        dataName: '是否提交技术评审结果',
                        type: '1'//文字

                    }, {
                        dataItem: 'serviceReviewProgress',
                        dataName: '服务评审进度',
                        type: '2'//进度条

                    },{
                        dataItem: 'isResultsServiceReview',
                        dataName: '是否提交服务评审结果',
                        type: '1'//文字

                    },{
                        dataItem: 'otherReviewProgress',
                        dataName: '其他评审进度',
                        type: '2'//进度条

                    },{
                        dataItem: 'isResultsOtherReview',
                        dataName: '是否提交其他评审结果',
                        type: '1'//文字
                    }]
                }
            }
        }
    }
    else if(get_type_num==14&& methodType==3){//最低价
        let msg = [];
        let data_msg = [];
        let dataMsg = [];
        let is_tijaio=Random.integer(0, 1);
        for (let i = 0; i < Random.integer(3,8); i++) {
            msg.push({//报价评审弹框报价计算table
                'id': Random.id(),
                'bid_name': "重庆网控科技发展有限公司",
                'tender_offer': Random.integer(100, 9999),
                'bid_price': Random.integer(100, 9999),
                // 'base_rice': Random.integer(100, 9999),
                // 'bias_ratio': Random.integer(0, 100),
                'base_rice':'',
                'bias_ratio':"",
                'radio': 2,

            });
            data_msg.push({//评审汇总table
                'id': Random.id(),
                'num': Random.integer(1, 7),
                'name': "（1）重庆网控科技发展有限公司",
                'tender_offer': '10000.0000',
                'total': '10000.0000',
                'ranking': Random.integer(1, 7),
            });
            dataMsg.push({//排序
                'company_name': Random.csentence(1, 10),
                'id': Random.id(),
                'ranking': Random.integer(1, 7),
            });
        }
        return {
            'bidMsg': {
                id: Random.id(),
                'name': '2019年水利运输服务招标项目',
                'biaoNum': '0635—1909qwerN1197',
                'baohao': '0635—1909qwerN1197/1',
                //审查项
                'eviewrItemsMsg': {
                    //头部审查类型按钮
                    // 'viewType':get_data(70,is_tijaio),
                    'isShow':submit_type,//0：提交前那个页面显示，1:提交的页面
                    'tijiao':'is_tijaio',
                    'bidEvaluation': msg,
                    'scoringBasePrice':1000,//合理低价的系统计算评分基准价(报价评审弹框)
                    'review_summary': data_msg,
                    'sort_data': dataMsg,//排序

                    //没有用

                    //'pingbiao_yijian': dataMsg,
                    'jiesuoData':{//评分解锁
                        'radioList': [{
                            value: '1',
                            label:'商务'
                        },{
                            value: '2',
                            label:'技术'
                        }, {
                            value: '3',
                            label:'服务'
                        },{
                            value: '4',
                            label:'其他'
                        } ],
                        'checkedList': ['评审专家七', '评审专家五', '评审专家一'],
                        "tippsDialogName":'解锁申请'//评分解锁成功提示框的name
                    },
                    'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                    'unlock_dialog_check':[ {
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': "同意",
                        'unlockReason': Random.csentence()
                    },{

                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': "同意",
                        'unlockReason': Random.csentence()
                    }],
                    "zhaunjiaGerenMarkData":  [
                        {
                            'evaluationFactors': '第一章、商务(10.00分)',
                            value1:'-',
                            value2:'-',
                            value3:'-',
                            value4:'-',
                            value5:'-',
                            value6:'-',
                            value7:'-',
                            value8:'-',
                            value9:'-',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'10.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',

                        },
                        {
                            'evaluationFactors': '第二章、商务2(20.00分)',
                            value1:'5.00',
                            value2:'14.00 ',
                            value3:'7.00',
                            value4:'10.00',
                            value5:'17.00',
                            value6:'13.00',
                            value7:'8.00',
                            value8:'9.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、商务2(20.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(8.00分)',
                            value1:'64.00',
                            value2:'80.00 ',
                            value3:'34.00',
                            value4:'16.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'23.00',
                            value8:'34.00',
                            value9:'57.00',
                        },
                        {
                            'evaluationFactors': '一、商务1(10.00分)(1)A(3.00分)  (2)B(4.00分) (3)C(5.00分)(4)D(10.00分) ',
                            value1:'49.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'10.00',
                            value5:'13.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '第三章、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'12.00',
                            value5:'18.00',
                            value6:'15.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '一、技术1(10.00分)',
                            value1:'4.00',
                            value2:'10.00 ',
                            value3:'3.00',
                            value4:'14.00',
                            value5:'18.00',
                            value6:'10.00',
                            value7:'3.00',
                            value8:'3.00',
                            value9:'5.00',
                        },
                        {
                            'evaluationFactors': '专家个人打分',
                            value1:'40.00',
                            value2:'40.00 ',
                            value3:'38.00',
                            value4:'15.00',
                            value5:'17.00',
                            value6:'18.00',
                            value7:'33.00',
                            value8:'37.00',
                            value9:'53.00',
                        },
                    ],
                    'companyNameData': [
                        {
                            'name':'张三',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                        {
                            'name':'王五',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                        {
                            'name':'李四',
                            'companyNameList': [
                                {"title":"重庆网控科技发展有限公司（1） "},
                                {"title":"普瑞太阳能有限公司（2） "},
                                {"title":"夏丰热工研究院有限公司（1） "},
                            ]
                        },
                    ],
                    'pingshenhuizongTableData': [
                        {
                            // 'bidderNumber': '2',
                            'bidder': '(2)夏丰热工研究院有限公司',
                            "pricePoints":'21.00',
                            'finalScore':'12.00',
                            "ranking":'3',
                            'creditScoring':'9.50',
                        },
                        {
                            // 'bidderNumber': '3',
                            'bidder': '(3)普瑞太阳能有限公司',
                            "pricePoints":'49.00',
                            'finalScore':'10.00',
                            "ranking":'2',
                            'creditScoring':'7.00'
                        },
                        {
                            // 'bidderNumber': '1',
                            'bidder': '(1)阿里巴巴',
                            "pricePoints":'29.00',
                            'finalScore':'10.00',
                            "ranking":'1',
                            'creditScoring':'8.00'
                        },
                    ],
                    'pingshenweiyuanData': [
                        {
                            'name':'评标专家七',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["33.00",  "31.00","38.00",]
                                } ,
                            ]
                        },
                        {
                            'name':'评标专家五',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["31.00",  "36.00","39.00",]
                                } ,
                            ]
                        },
                        {
                            'name':'评标专家一',
                            'zhaunjiadata_gs':[
                                {
                                    'zhaunjia1':["32.00",  "31.00","38.00",]
                                } ,
                            ]
                        },
                    ],
                    tables: [{//综合评标页面进度条数据
                        evaluationExpert: '评审专家七',
                        businessReviewProgress: '5',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress:'5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }, {
                        evaluationExpert: '评审专家五',
                        businessReviewProgress:  '5',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress: '5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }, {
                        evaluationExpert: '评审专家一',
                        businessReviewProgress:  '50',
                        isResultsBusinessReview: '未完成',
                        technicalReviewProgress: '5',
                        isResultsTechnicalReview: '未完成',
                        serviceReviewProgress: '5',
                        isResultsServiceReview:"未完成",
                        otherReviewProgress:'5',
                        isResultsOtherReview:"未完成"
                    }],
                    'biddersScoreTitleData':[],
                    tableData: [{
                        dataItem: 'evaluationExpert',//评审专家（动态表头的名字绑定数据）
                        dataName: '评审专家',//动态表头的名字
                        type: '1'//文字
                    }, {
                        dataItem: 'businessReviewProgress',
                        dataName: '商务评审进度',
                        type: '2'//进度条
                    }, {
                        dataItem: 'isResultsBusinessReview',
                        dataName: '是否提交商务评审结果',
                        type: '1'//文字
                    }, {
                        dataItem: 'technicalReviewProgress',
                        dataName: '技术评审进度',
                        type: '2'//进度条
                    }, {
                        dataItem: 'isResultsTechnicalReview',
                        dataName: '是否提交技术评审结果',
                        type: '1'//文字

                    }, {
                        dataItem: 'serviceReviewProgress',
                        dataName: '服务评审进度',
                        type: '2'//进度条

                    },{
                        dataItem: 'isResultsServiceReview',
                        dataName: '是否提交服务评审结果',
                        type: '1'//文字

                    },{
                        dataItem: 'otherReviewProgress',
                        dataName: '其他评审进度',
                        type: '2'//进度条

                    },{
                        dataItem: 'isResultsOtherReview',
                        dataName: '其他评审评审结果',
                        type: '1'//文字
                    }]
                    //没有用
                },
            }
        }
        // return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1,submit_type);
        return return_val;

    }
});

//评审汇总页面合理低价提交（table）
let pshz_tijiao = Mock.mock('/api/pshz_tijiao', 'post', {
    status: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(14),
});
//评审汇总页面合理低价提交（table）
let pshz_tijiao_zdj = Mock.mock('/api/pshz_tijiao_zdj', 'post', {
    status: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(14),
});
//评审汇总页面综合评标表格提交按钮接口
let submitBtnZHPB = Mock.mock('/api/submitBtnZHPB', 'post', {
    code: 200,
    message: '保存成功!',
    data: [],
    vue_type: get_data(14)
});


//商务保存接口
let fuwu_save = Mock.mock('/api/fuwu_save', 'post', {
    status: 200,
    message: '成功!',
    data: {
        projectName: '总计',
        type: 'numberTotle',
        radioList: [ ],
        min: null,
        max: null,
        tit: '',
        value1: 23,
        value2: 45,
        value3: 36,
        gradeExplain1:"",
        gradeExplain2:"",
        gradeExplain3:""
    },
    vue_type: get_data(10),
});
//导航ll添加
//1; 通过,2:正在进行:4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态；currentPage：当前进行到哪一步；
function get_data(currentPage,is_submit_type,types) {//type
    // console.log(currentPage, is_submit_type,'导航状态');
    function set_type() {
        if (currentPage == 1) {
            if(is_submit_type==0||is_submit_type==null){
                return [2,2,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
            }else{
                return [2,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
            }
        }
        if (currentPage == 2) {
            //return [2,1, 2, 4, 4, 4, 4]
            return [2,1,2,4,4,4,4,4,4,4,4,4,4,4,4,4]
        }
        if (currentPage == 3) {
            // if(types==1){
            //     var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
            //     num.splice(types-1,1,5);
            //     num.splice(currentPage-1,1,is_submit_type?1:3);
            //     return num;
            // }else if(types==2){
            //     var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
            //     num.splice(types-1,1,5);
            //     num.splice(currentPage-1,1,is_submit_type?1:3);
            //     return num;
            //}else{
            //return [1,1,1,2,4,4,4]
            return [1,1,1,2,4,4,4,4,4,4,4,4,4,4,4,4]
            //}

        }else if(currentPage == 4){//资格审查
            return [1,1,1,1,2,is_submit_type?1:2,2,4,4,4,4,4,4,4,4,4]
        }
        else if(currentPage == 5){//资格审查汇总
            return [1,1,1,1,2,1,is_submit_type?1:2,is_submit_type?2:4,is_submit_type?2:4,4,4,4,4,4,4,4]
        }
        else if(currentPage == 6){//符合性审查
            return [1,1,1,1,2,1,1,is_submit_type?1:2,2,4,4,4,4,4,4,4]
        }else if(currentPage ==7){//符合性审查汇总
            return [1,1,1,1,2,1,1,1,is_submit_type?1:2,is_submit_type?2:4,is_submit_type?2:4,4,4,4,4,4]
        }else if(currentPage ==8){//技术
            return [1,1,1,1,2,1,1,1,1,is_submit_type?1:2,2,4,4,4,4,4]
        }else if(currentPage ==9){//技术汇总
            return [1,1,1,1,2,1,1,1,1,1,is_submit_type?1:2,is_submit_type?2:4,is_submit_type?2:4,is_submit_type?2:4,is_submit_type?2:4,4]
        }
        else if(currentPage ==10){//商务
            return [1,1,1,1,2,1,1,1,1,1,1,is_submit_type?1:2,is_submit_type?2:4,is_submit_type?2:4,is_submit_type?2:4,4]
        }
        else if(currentPage ==11){//技术
            return [1,1,1,1,2,1,1,1,1,1,1,1,is_submit_type?1:2,is_submit_type?2:4,is_submit_type?2:4,4]
        }else if(currentPage ==12){//服务
            return [1,1,1,1,2,1,1,1,1,1,1,1,1,is_submit_type?1:2,is_submit_type?2:4,4]
        }else if(currentPage ==13){//其他
            return [1,1,1,1,2,1,1,1,1,1,1,1,1,1,is_submit_type?1:2,is_submit_type?2:4]
        }else if(currentPage ==14){//评审汇总
            return [1,1,1,1,is_submit_type?1:2,1,1,1,1,1,1,1,1,1,1,is_submit_type?1:2]
        }
    }
    //set_type();
    var a;
    a = set_type();
    // console.log(a);
    return [
        {   //综合评标导航    商务，技术，服务，其他，评审汇总：（详细评审(技术)汇总提交完成之后可点）
           // value: '1',//
            label: '签到',  //步数字段
            types: 1,  //types 代表第几步对应相对应得步数
            typestaus:a[0],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
            children:[{
               // value: '1-1',//
                label: '承诺书',  //步数字段
                types: "1-1",  //types 代表第几步对应相对应得步数
                typestaus:a[1],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
            },{
               // value: '1-2',//
                label: '参加评标',  //步数字段
                types: "1-2",  //types 代表第几步对应相对应得步数
                typestaus:a[2],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
            }]
        },{
            //value: '2',//
            label: '推举组长',
            types: 2,
            typestaus:a[3],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
        },{
           // value: '3',//
            label: '评标',
            types: 3,
            typestaus:a[4],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
            children:[{
                value: '3-1',//
                label: '资格审查',  //步数字段
                types: '3-1',  //types 代表第几步对应相对应得步数
                typestaus:a[5],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
            },{
                value: '3-2',//
                label: '资格审查汇总',  //步数字段
                types: '3-2',  //types 代表第几步对应相对应得步数
                typestaus:a[6],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
            },
                {
                    value: '3-3',
                    label: '符合性审查',
                    types: '3-3',
                    typestaus:a[7],
                },
                {
                    value: '3-4',
                    label: '符合性审查汇总',
                    types: '3-4',
                    typestaus:a[8],
                },
                {
                    value: '3-5',//
                    label: '详细评审(技术)',
                    types: '3-5',
                    typestaus:a[9],
                },
                {
                    value: '3-6',
                    label: '详细评审(技术)汇总',
                    types: '3-6',
                    typestaus:a[10],
                },
                {
                    value: '3-7',
                    label: '商务',
                    types: '3-7',
                    typestaus:a[11],
                },
                {
                    value: '3-8',
                    label: '技术',
                    types: '3-8',
                    typestaus:a[12],
                },
                {
                    value: '3-9',
                    label: '服务',
                    types: '3-9',
                    typestaus:a[13],
                },
                {
                    value: '3-10',
                    label: '其他',
                    types: '3-10',
                    typestaus:a[14],
                },
                {
                    value: '3-11',
                    label: '评审汇总',
                    types: '3-11',
                    typestaus:a[15],
                },
            ]
        }
        //,{
        //     value: '4',//
        //     label: '资格审查',
        //     types: 4,
        //     typestaus:a[3],
        // },{
        //     value: '5',//
        //     label: '资格审查汇总',
        //     types: 5,
        //     typestaus:a[4],
        // },{
        //     value: '6',//
        //     label: '符合性审查',
        //     types: 6,
        //     typestaus:a[5],
        // },{
        //     value: '7',//
        //     label: '符合性审查汇总',
        //     types: 7,
        //     typestaus:a[6],
        // },{
        //     value: '8',//
        //     label: '详细评审(技术)',
        //     types: 8,
        //     typestaus:a[7],
        // },{
        //     value: '9',//
        //     label: '详细评审(技术)汇总',
        //     types: 9,
        //     typestaus:a[8],
        // },{
        //     value: '10',//
        //     label: '商务',
        //     types: 10,
        //     typestaus:a[9],
        // },{
        //     value: '11',//
        //     label: '技术',
        //     types: 11,
        //     typestaus:a[10],
        // },{
        //     value: '12',//
        //     label: '服务',
        //     types: 12,
        //     typestaus:a[11],
        // },{
        //     value: '13',//
        //     label: '其他',
        //     types: 13,
        //     typestaus:a[12],
        // },{
        //     value: '14',//
        //     label: '评审汇总',
        //     types: 14,
        //     typestaus:a[13],
        // }

    ]
}


//头部项目信息接口
Mock.mock('/api/getProjectInformation','get',{
    ProjectInformationsAll:{
        projectName:'单信封-0305-1',
        projectNumber:'0635-1909qwerN1133',
        projectWenjian:'招标文件(pdf)',
        PersonName:'张三'
    },
});
//头部项目信息接口

//推举组长按钮接口
Mock.mock('/api/ElectedLeaderBtn','get',{
    "resultCode":200,
})
//推举组长按钮接口
//评标按钮接口
Mock.mock('/api/BidEvaluationButton','get',{
    "resultCode":200,
})
//评标按钮接口
//查看招标文件
Mock.mock('/api/BiddingDocuments','get',{
    "resultCode":200,
})
//查看招标文件
//查看开标一览表接口
Mock.mock('/api/ListOfbidOpen','get',{
    "resultCode":200,
})
//查看开标一览表接口


//公共导航接口
Mock.mock('/api/navcommons','post',(options) =>{
    let CommonsData;
    let currentpage=JSON.parse(options.body).currentpage;
    let is_submit_type=JSON.parse(options.body).is_submit_type;
    let types=JSON.parse(options.body).types;
    // console.log(currentpage,is_submit_type,888888);
    CommonsData={
        // ProjectInformationsAll:{
        //     projectName:'单信封-0305-1',
        //     projectNumber:'0635-1909qwerN1133',
        //     projectWenjian:'招标文件(pdf)',
        //     PersonName:'张三'
        // },
        navsAll:get_data(currentpage,is_submit_type,types),
    };
    return CommonsData;

})
//公共导航接口


















































Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })





