import Mock from 'mockjs';

Mock.setup({
    timeout: 1000
});

const Random = Mock.Random;
let tableMs = Mock.mock('/api/tableMsg', 'post', {
    'tableData|4': [{
        id: () => Random.id(),
        'deleteMsg': '项目澄清状态购标',
        date: () => Random.date(),
        'readM': '审核通过'
    }]
});
//评审项目数据列表
let bagTitMs = Mock.mock('/api/bagMsg', 'post', {
    'projectBagMsg|1-5': [{
        id: () => Random.id(),
        'status|1': [0, 1, 2],
        'functionary': '@cname',
        'projectName': '辅助-招标投标法-最低评标价【二次公告】',

    }],
    'allBagMsg|1-3': [{
        ids: () => Random.id(),
        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
        + '/' + '评委会',
        'bagName': '第' + Random.natural(0, 6) + Random.natural(5, 9) + '包',
        'starTime': () => Random.datetime(),
        'stopTime': () => Random.datetime(),
        'type|1': [0, 1],
        'proBusinessNum': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'q' + 'w' + 'e' + 'r' + 'N'
        + Random.natural(0, 9) + Random.natural(0, 9) + Random.natural(0, 9) + Random.natural(0, 9),
        'sellStartTime': () => Random.datetime(),
        'sellEndTime': () => Random.datetime(),
        'bidOpeningTime': () => Random.datetime(),
        'getBidType': '在线下载',
        'bidOpeningPlace': '北京海淀区',
        'evaluationBidPlace': '北京市朝阳区',
        'evaluationBidTime': () => Random.datetime(),
        'paymentType': [0, 1, 2],
        'uploadWay|1': [0, 1, 2],
        'tenderFree': Random.float(10, 1000, 2, 2),
        'postage': Random.float(10, 100, 2, 2),
        'drawingDeposit': Random.float(10, 100, 2, 2),
        'bidAgencyServiceFee': Random.float(1, 100, 2, 2) + '(浮动费率 （发改价格[2011]534号)',
        'tenderBond': Random.float(10, 100, 2, 2) + '万元'
    }],
});
// 修改密码页面登陆名以及密码
let login = Mock.mock('/api/login', 'post', {
    code: 200,
    message: '成功!',
    'msg': {
        "name": 'dyzs2001@vip.sina.com',
        "pass": '0',
    }
});
//一进页面判断是否已经绑定邮箱以及手机号码，
let isbindingEmailPhone = Mock.mock('/api/isbindingEmailPhone', 'post', {
    'data': {
        name: "123",
        pass: "0"
    },
    'massageList': {
        "emaile": '1315619013@qq.com',
        "phoneNum": "13325689861",
    },
    'type|1': [
        {
            value: '1',
            label: '有头像'
        },
        {
            value: '2',
            label: '没有头像'
        }],
    'img|1': {
        "txph": "../../assets/image/txph.png"
    }
});
//基本信息保存成功
let save = Mock.mock('/api/save', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//基本信息发送手机验证码
let sendPhoneCode = Mock.mock('/api/sendPhoneCode', 'post', {
    code: 200,
    message: '成功!',
    data: [1234]
});
//基本信息手机号绑定
let phoneBinding = Mock.mock('/api/phoneBinding', 'post', {
    code: 200,
    message: '成功!',
    data: [1234]
});
//基本信息发送邮箱验证码
let sendEmailCode = Mock.mock('/api/sendEmailCode', 'post', {
    code: 200,
    message: '成功!',
    data: [1234]
});
//基本信息邮箱绑定
let Emailpd = Mock.mock('/api/Emailpd', 'post', {
    code: 200,
    message: '成功!',
    data: [1234]
});
let esta = Mock.mock('/api/esta', 'post', {
    msg: {
        'status|1': [0, 1]
    },
    'members|0-5': [
        {unitName: '中招联合', editNum: () => Random.id(), name: () => Random.cname(), pNumber: '13253246679'}
    ],
    'mylist|0-5': [
        {
            unitName: '中招国际',
            fileName: '我的联合体协议.pdf',
            newTime: () => Random.date() + ' 12:20:34',
            'status|1': [0, 1],
            id: () => Random.id(),
            name: () => Random.cname(),
            pNumber: '13253246679',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            deleLoad: false
        }
    ],
    'already|0-5': [
        {
            unitName: '中招联合',
            fileName: '我的联合体协议.pdf',
            startDate: () => Random.date() + ' 20:22',
            openTime: () => Random.date() + ' 15:40:59',
            id: () => Random.id(),
            name: () => Random.cname(),
            pNumber: '13253246679',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
    ]
});
//评标页面数据接口
let table_msg = Mock.mock('/api/table_msg', 'post', {
    // 头部标包信息
    'bidMsg|1': [{
        id: () => Random.id(),
        'name': '2019年水利运输服务招标项目',
        'biaoNum': '0635—1909qwerN1197',
        'baohao': '0635—1909qwerN1197/1',
        'type|1':[0,1],//是否提交过
        //审查项
        'eviewrItemsMsg|1': [{
            'viewnBtnName': '个人资格审查项表',//左侧审查项类型
             'zTreeData|1': [//树形图
                {
                    id: 1, pId: 0, name: "形式审计-#707478", open: true,
                    children: [
                        {
                            id: 101, pId: 1, name: "投标人名称", open: false,
                            fristTableData: {//第一个表格
                                question: "形式评审项：",
                                answer: "投标人名称",
                                question1: "审查标准：",
                                answer1: "与营业执照、资质证书一致",
                                tableData: [{
                                    index: 0,
                                    people: '招标人1：',
                                    name: '[1]重庆网控科技发展有限公司',
                                    pass: '1',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 1,
                                }, {
                                    index: 1,
                                    people: '招标人2：',
                                    name: '[2] 普瑞太阳能有限公司',
                                    pass: '1',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 2,
                                }, {
                                    index: 2,
                                    people: '招标人2：',
                                    name: '[2] 夏丰热工研究院有限公司',
                                    pass: '1',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 3,
                                }],

                                submitData: [{
                                    index: 0,
                                    people: '招标人1：',
                                    name: '[1]重庆网控科技发展有限公司',
                                    pass: '1',
                                    content: () => Random.csentence(),
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    is_qualified:"不合格",
                                    id: 1,
                                }, {
                                    index: 1,
                                    people: '招标人2：',
                                    name: '[2] 普瑞太阳能有限公司',
                                    pass: '2',
                                    content:() => Random.csentence(),
                                    ra1: '合格',
                                    ra2: '不合格',
                                    is_qualified:"不合格",
                                    radio: '',
                                    id: 2,
                                }, {
                                    index: 2,
                                    people: '招标人2：',
                                    name: '[2] 夏丰热工研究院有限公司',
                                    pass: '2',
                                    content: () => Random.csentence(),
                                    ra1: '合格',
                                    ra2: '不合格',
                                    is_qualified:"不合格",
                                    radio: '',
                                    id: 3,
                                }],


                               },
                        },
                        {
                            id: 102, pId: 1, name: "资质", open: false,
                            fristTableData: {
                                question: "形式评审项：",
                                answer: "资质",
                                question1: "审查标准",
                                answer1: "与营业执照、资质证书一致",
                                tableData: [{
                                    index: 3,
                                    people: '招标人1：',
                                    name: '[1]重庆网控科技发展有限公司',
                                    pass: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 4,
                                }, {
                                    index: 4,
                                    people: '招标人2：',
                                    name: '[2] 普瑞太阳能有限公司',
                                    pass: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 5,
                                }, {
                                    index: 5,
                                    people: '招标人2：',
                                    name: '[2] 夏丰热工研究院有限公司',
                                    pass: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 6,
                                }],
                                submitData: [{
                                    index: 3,
                                    people: '招标人1：',
                                    name: '[1]重庆网控科技发展有限公司',
                                    pass3: '3',
                                    content: () => Random.csentence(),
                                    address: '',
                                    radio: '',
                                    is_qualified:"不合格",
                                    id: 4,
                                }, {
                                    index: 4,
                                    people: '招标人2：',
                                    name: '[2] 普瑞太阳能有限公司',
                                    pass3: '3',
                                    content: () => Random.csentence(),
                                    ra1: '合格',
                                    ra2: '不合格',
                                    is_qualified:"不合格",
                                    radio: '',
                                    id: 5,
                                }, {
                                    index: 5,
                                    people: '招标人2：',
                                    name: '[2] 夏丰热工研究院有限公司',
                                    pass3: '3',
                                    content: () => Random.csentence(),
                                    address: '1111',
                                    is_qualified:"不合格",
                                    radio: '',
                                    id: 6,
                                }],
                            },
                        },
                        {
                            id: 103, pId: 1, name: "审查项目", open: false,
                            fristTableData: {
                                question: "形式评审项：",
                                answer: "审查项目",
                                question1: "审查标准",
                                answer1: "与营业执照、资质证书一致",
                                tableData: [{
                                    index: 6,
                                    people: '招标人1：',
                                    name: '[1]重庆网控科技发展有限公司',
                                    pass2: '1',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 7,
                                }, {
                                    index: 7,
                                    people: '招标人2：',
                                    name: '[2] 普瑞太阳能有限公司',
                                    pass2: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 8
                                }, {
                                    index: 8,
                                    people: '招标人2：',
                                    name: '[2] 夏丰热工研究院有限公司',
                                    pass2: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    id: 9,
                                }],
                                submitData: [{
                                    index: 6,
                                    people: '招标人1：',
                                    name: '[1]重庆网控科技发展有限公司',
                                    pass2: '1',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    is_qualified:"合格",
                                    radio: '',
                                    id: 7,
                                }, {
                                    index: 7,
                                    people: '招标人2：',
                                    name: '[2] 普瑞太阳能有限公司',
                                    pass2: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    is_qualified:"合格",
                                    id: 8
                                }, {
                                    index: 8,
                                    people: '招标人2：',
                                    name: '[2] 夏丰热工研究院有限公司',
                                    pass2: '2',
                                    content: '',
                                    ra1: '合格',
                                    ra2: '不合格',
                                    radio: '',
                                    is_qualified:"合格",
                                    id: 9,
                                }],
                             }
                        },
                    ]
                },
            ],
            'mylist|3': [
                {
                    date: '0',
                    isFinish: '未完成',
                    id: () => Random.id(),
                    name: () => Random.cname(),
                }
            ],
            //头部审查类型按钮
            'viewType': [
                {
                    value: '1',
                    label: '资格审查项',
                    type:'1'
                },
                {
                    value: '2',
                    label: '资格审查项汇总',
                    type:'1'
                },

                {
                    value: '4',
                    label: '符合性审查项',
                    type:'2'
                },
                {
                    value: '5',
                    label: ' 符合性审查项汇总',
                    type:'3'
                },
                {
                    value: '6',
                    label: ' 详细评审（技术）',
                    type:'4'
                },
                {
                    value: '7',
                    label: '详细评审（技术）汇总',
                    type:'5'
                },
                {
                    value: '8',
                    label: '评审汇总',
                    type:'5'
                },
            ],

        }],
        msg: [{////个人形式审计表数据接口
            number: '1',
            date: '投标人名称',
            name: '√',
            province: '√',
            city: '√',
        }, {
            number: '2',
            date: '资质',
            name: '√',
            province: '√',
            city: '√',
        },
        {
            number: '3',
            date: '审查项目',
            name: '√',
            province: '√',
            city: '√',
        },
        {
            number: '结论',
            date: '审查标准与营业执照、资质证书是否一致',
            name: '合格',
            province: '合格',
            city: '合格',
        }]
    }],
});

//



// 资格审查项汇总页面table接口

let table_data = Mock.mock('/api/table_data', 'post', {
    'bidMsg|1': [{
        id: () => Random.id(),
        'name': '2019年水利运输服务招标项目',
        'biaoNum': '0635—1909qwerN1197',
        'baohao': '0635—1909qwerN1197/1',
        //审查项
        'eviewrItemsMsg|1': [{
            'viewnBtnName': '个人资格审查项表',//左侧审查项类型
            //头部审查类型按钮
            'viewType': [
                {
                    value: '1',
                    label: '资格审查项',
                    type:'1'
                },
                {
                    value: '2',
                    label: '资格审查项汇总',
                    type:'1'
                },

                {
                    value: '4',
                    label: '符合性审查项',
                    type:'2'
                },
                {
                    value: '5',
                    label: ' 符合性审查项汇总',
                    type:'3'
                },
                {
                    value: '6',
                    label: ' 详细评审（技术）',
                    type:'4'
                },
                {
                    value: '7',
                    label: '详细评审（技术）汇总',
                    type:'5'
                },
                {
                    value: '8',
                    label: '评审汇总',
                    type:'5'
                },
            ],
            'isShow|1':[0,1],
             'mylist|3': [
                {
                    dates: '10',
                    isFinish: '未完成',
                    id: () => Random.id(),
                    name: () => Random.cname(),
                }
            ],
            'evaluationLeader':'张三',
            'other_explain':() => Random.csentence(),
            'unlock_table':[
                {num:'1',factor:'投标人名称',name:'√(5√0×)',name1:'√(5√0×)',name2:'√(5√0×)',id:1},
                {num:'2',factor:'资质',name:'√(5√0×)',name1:'√(5√0×)',name2:'√(5√0×)',id:2},
                {num:'3',factor:'审查项目',name:'√(5√0×)',name1:'√(5√0×)',name2:'√(5√0×)',id:3},
                {num:'结论',factor:'是否通过资格审查项检查',name:'合格',name1:'合格',name2:'合格',id:4}
            ],
            'unlock_dialog_check|1':[{
                'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                'applicantPeole':'@cname',
                'applicantTime':Random.datetime(),
                'unlockObject':'@cname',
                'applicantReason':'投标函格式',
                'assessingOfficer':"@cname",
                'assessingResult|1': [ 0,1],
                'unlockReason':() => Random.csentence()
                }]
        }],
    }],
});

// 不合格接口
let comformFailureEntry = Mock.mock('/api/comformFailureEntry', 'post', {
    code: 200,
    message: '成功!',
    data: ''
});
//申请解锁信息保存成功
let save_apply_unlock = Mock.mock('/api/save_apply_unlock', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//StartEvaluation table 中的名称查看pdf
let check_pdf = Mock.mock('/api/check_pdf','post',{
    'basicMessage':{
        url:"/documents/younojsxia.pdf"
    }
});

Mock.mock('/Ajax/Login', 'post', {"Status": "ok", "Text": "登陆成功<br /><br />欢迎回来"})


Mock.mock('/Ajax/LoginFalse', 'post', {"Status": "Erro", "Erro": "账号名或密码或验证码有误"})
