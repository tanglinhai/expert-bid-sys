import Mock from 'mockjs';

import JSON from 'JSON';

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
        'tenderBond': Random.float(10, 100, 2, 2) + '万元',
        'previewFile': '',
        'tenderDocuments': "",
        "attachement": "",
        'pdf_url': ""
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

Mock.mock('/api/table_msg', 'post', (options) => {
    let return_val;
    var submit_type= Random.integer(0, 1);
    // console.log(JSON.parse(options.body));
    let get_type_num=JSON.parse(options.body).type;
    if (get_type_num == 1) {
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
                    'zTreeData': //树形图
                        {
                            id: 1, pId: 0, name: "资格审查-#707478", open: true,
                            children: [
                                {
                                    id: 101, pId: 1, name: "资格审查1", open: false,
                                    fristTableData: {//第一个表格
                                        question: "资格审查评审项：",
                                        answer: "资格审查1",
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
                                    },
                                },
                                {
                                    id: 102, pId: 1, name: "资格审查2", open: false,
                                    fristTableData: {
                                        question: "资格审查评审项：",
                                        answer: "资格审查2",
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
                                    },
                                },
                                {
                                    id: 103, pId: 1, name: "资格审查项目", open: false,
                                    fristTableData: {
                                        question: "资格审查评审项：",
                                        answer: "资格审查项目",
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

                                    }
                                },
                            ]
                        },

                    'mylist': ms,
                    //头部审查类型按钮
                    // vue_type:get_data(1),
                    'viewType': [
                        {
                            value: '1',
                            label: '资格审查项',
                            type: '1'
                        },
                        {
                            value: '2',
                            label: '资格审查项汇总',
                            type: '2'
                        },

                        {
                            value: '3',
                            label: '符合性审查项',
                            type: '3'
                        },
                        {
                            value: '4',
                            label: ' 符合性审查项汇总',
                            type: '4'
                        },
                        {
                            value: '5',
                            label: ' 详细评审（技术）',
                            type: '5'
                        },
                        {
                            value: '6',
                            label: '详细评审（技术）汇总',
                            type: '6'
                        },
                        {
                            value: '7',
                            label: '评审汇总',
                            type: '7'
                        },
                    ],
               },
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
            }
        }
    } else if (get_type_num == 3) {
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
                    'zTreeData': //树形图
                        {
                            id: 1, pId: 0, name: "形式审计-#707478", open: true,
                            children: [
                                {
                                    id: 101, pId: 1, name: "投标人名称", open: false,
                                    fristTableData: {//第一个表格
                                        question: "资格审查评审项：",
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


                                    },
                                },
                                {
                                    id: 102, pId: 1, name: "资质", open: false,
                                    fristTableData: {
                                        question: "资格审查评审项：",
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

                                    },
                                },
                                {
                                    id: 103, pId: 1, name: "审查项目", open: false,
                                    fristTableData: {
                                        question: "资格审查评审项：",
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
                                    }
                                },
                            ]
                        },

                    'mylist': ms,
                    //头部审查类型按钮

                },
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
            }
        }

    } else if (get_type_num == 5) {
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
                    'zTreeData': //树形图
                        {
                            id: 1, pId: 0, name: "详细评审技术", open: true,
                            children: [
                                {
                                    id: 101, pId: 1, name: "详细评审1", open: false,
                                    fristTableData: {//第一个表格
                                        question: "资格审查评审项：",
                                        answer: "详细评审1",
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


                                    },
                                },
                                {
                                    id: 102, pId: 1, name: "详细评审2", open: false,
                                    fristTableData: {
                                        question: "资格审查评审项：",
                                        answer: "详细评审2",
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

                                    },
                                },
                                {
                                    id: 103, pId: 1, name: "详细评审3", open: false,
                                    fristTableData: {
                                        question: "资格审查评审项：",
                                        answer: "详细评审3",
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

                                    }
                                },
                            ]
                        },

                    'mylist': ms,
                    //头部审查类型按钮

                },
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
            }
        }
    }
    return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1,submit_type);
    return return_val;
});

// 资格审查项汇总页面table接口
Mock.mock('/api/table_data', 'post', (options) => {
    // console.log(JSON.parse(options.body));
    let return_val;
    let get_type_num=JSON.parse(options.body).type;
    if (get_type_num == 2) {
        let msg = [];
        for (var i = 0; i < Random.integer(1, 5); i++) {
            msg.push({
                'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                + '/' + '评委会',//     评标委员会
                'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                'panduan1': "√",
                'evaluationFactors': Random.csentence(),//评审因素
                'panduan2': "√",
                'panduan3': "√",
                'bidder|1-5': [
                    {
                        name: "重庆网控科技发展有限公司"
                    }
                ]//投标人
            })
        }

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
                    'mylist': [
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        },
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        },
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        }
                    ],
                    'evaluationLeader': '张三',
                    'other_explain': Random.csentence(),
                    'unlock_table': [
                        {num: '1', factor: '资格审查1', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 1},
                        {num: '2', factor: '资格审查2', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 2},
                        {num: '3', factor: '资格审查项目', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 3},
                        {num: '结论', factor: '是否通过资格审查项检查', name: '合格', name1: '合格', name2: '合格', id: 4}
                    ],
                    'unlock_dialog_check': {
                        'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': Random.integer(0, 1),
                        'unlockReason': Random.csentence()
                    },
                    'msgBox': msg,
                    companyName: ["重庆网控科技发展有限公司", "重庆网控科技有限公司", "重庆网有限公司"]
                }
            }
        }
    } else if (get_type_num == 4) {
        // console.log(JSON.parse(options.body));
        let msg = [];
        for (var i = 0; i < Random.integer(1, 5); i++) {
            msg.push({
                'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                + '/' + '评委会',//     评标委员会
                'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                'panduan1': "√",
                'evaluationFactors': Random.csentence(),//评审因素
                'panduan2': "√",
                'panduan3': "√",
                'bidder|1-5': [
                    {
                        name: "重庆网控科技发展有限公司"
                    }
                ]//投标人
            })
        }
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
                    'mylist': [
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        },
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        },
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        }
                    ],
                    'evaluationLeader': '张三',
                    'other_explain': Random.csentence(),
                    'unlock_table': [
                        {num: '1', factor: '投标人名称', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 1},
                        {num: '2', factor: '资质', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 2},
                        {num: '3', factor: '审查项目', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 3},
                        {num: '结论', factor: '是否通过资格审查项检查', name: '合格', name1: '合格', name2: '合格', id: 4}
                    ],
                    'unlock_dialog_check': {
                        'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': Random.integer(0, 1),
                        'unlockReason': Random.csentence()
                    },
                    'msgBox': msg,
                    companyName: ["重庆网控科技发展有限公司", "重庆网控科技有限公司", "重庆网有限公司"]
                }
            }
        }
    } else if (get_type_num == 6) {
        // console.log(JSON.parse(options.body));
        let msg = [];
        for (var i = 0; i < Random.integer(1, 5); i++) {
            msg.push({
                'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                + '/' + '评委会',//     评标委员会
                'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                'panduan1': "√",
                'evaluationFactors': Random.csentence(),//评审因素
                'panduan2': "√",
                'panduan3': "√",
                'bidder|1-5': [
                    {
                        name: "重庆网控科技发展有限公司"
                    }
                ]//投标人
            })
        }
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
                    'mylist': [
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        },
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        },
                        {
                            dates: '5',
                            isFinish: '未完成',
                            id: Random.id(),
                            name: Random.cname(),
                        }
                    ],
                    'evaluationLeader': '张三',
                    'other_explain': Random.csentence(),
                    'unlock_table': [
                        {num: '1', factor: '详细评审1', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 1},
                        {num: '2', factor: '详细评审2', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 2},
                        {num: '3', factor: '详细评审3', name: '√(5√0×)', name1: '√(5√0×)', name2: '√(5√0×)', id: 3},
                        {num: '结论', factor: '是否通过资格审查项检查', name: '合格', name1: '合格', name2: '合格', id: 4}
                    ],
                    'unlock_dialog_check': {
                        'title_mg': ' 0635-1809 NB15/7评委会的初审类解锁申请',
                        'applicantPeole': Random.cname(),
                        'applicantTime': Random.datetime(),
                        'unlockObject': Random.cname(),
                        'applicantReason': '投标函格式',
                        'assessingOfficer': Random.cname(),
                        'assessingResult': Random.integer(0, 1),
                        'unlockReason': Random.csentence()
                    },
                    'msgBox': msg,
                    companyName: ["重庆网控科技发展有限公司", "重庆网控科技有限公司", "重庆网有限公司"]
                }
            }
        }
    }
    return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1);
    return return_val;
});


// 资格审查合格不合格接口
let isFailure = Mock.mock('/api/isFailure', 'post', {
    code: 200,
    message: '成功!',
    data: '',
    type: ''
});
//符合性审查项合格不合格接口
let isFailure_fhx = Mock.mock('/api/isFailure_fhx', 'post', {
    code: 200,
    message: '成功!',
    data: '',
    type: ''
});
//详细技术项合格不合格接口
let isFailure_xxjs = Mock.mock('/api/isFailure_xxjs', 'post', {
    code: 200,
    message: '成功!',
    data: '',
    type: ''
});
// 不合格录入接口
let comformFailureEntry = Mock.mock('/api/comformFailureEntry', 'post', {
    code: 200,
    message: '成功!',
    data: ''
});
// 资格审查全部选中接口
let allChecked = Mock.mock('/api/allChecked', 'post', {
    code: 200,
    message: '成功!',
    data: ''
});
//符合性审查项全部选中接口
let allChecked_fhx = Mock.mock('/api/allChecked_fhx', 'post', {
    code: 200,
    message: '成功!',
    data: ''
});
//详细技术项全部选中接口
let allChecked_xxjs = Mock.mock('/api/allChecked_xxjs', 'post', {
    code: 200,
    message: '成功!',
    data: ''
});
// 通过：绿色，正在进行：橘色；可点：灰色；不可点：白色
//1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态( 不是汇总页面提交)；type：菜单传的状态；zong_type：是否提交的状态( 是汇总页面提交)；
function get_data(type,is_submit_type) {//type
    function set_type() {
        if (type == 0) {
            return [is_submit_type?1:2, 3, 4, 4, 4, 4, 4,]
        }
        if (type == 1) {
            return [1, 3, 4, 4, 4, 4, 4,]
        }
        if (type == 2) {
            return [1, 1, is_submit_type?1:2, 3, 4, 4, 4,]
        }
        if (type == 3) {//符合性审查项
            return [1, 1, 1, is_submit_type?1:2, 4, 4, 4,]
        }
        if (type == 4) {//符合性审查项汇总
            return [1, 1, 1, 1, is_submit_type?1:2, 3, 4,]
        }
        if (type == 5) {//详细
            return [1, 1, 1, 1, 1, is_submit_type?1:2, 3,]
        }
        if (type == 6) {//详细汇总
            return [1, 1, 1, 1, 1, 1, is_submit_type?1:2,]
        }
        if (type == 7) {//详细汇总
            return [1, 1, 1, 1, 1, 1, is_submit_type?1:2,]
        }
    }

    set_type();
    var a;
    a = set_type();
    // console.log(a);
    return [
        {
            value: '1',
            label: '资格审查项',
            type: a[0],
        },
        {
            value: '2',
            label: '资格审查项汇总',
            type: a[1]
        },

        {
            value: '3',
            label: '符合性审查项',
            type: a[2]
        },
        {
            value: '4',
            label: '符合性审查项汇总',
            type: a[3]
        },
        {
            value: '5',
            label: '详细评审（技术）',
            type: a[4]
        },
        {
            value: '6',
            label: '详细评审（技术）汇总',
            type: a[5]
        },
        {
            value: '7',
            label: '评审汇总',
            type: a[6]
        },
    ]

}

// 资格审查全部提交接口
let alltijiao = Mock.mock('/api/alltijiao', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(1),

});
// 符合性审查全部提交接口
let alltijiao_fhx = Mock.mock('/api/alltijiao_fhx', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(3),
});
// 详细技术审查全部提交接口
let alltijiao_xxjs = Mock.mock('/api/alltijiao_xxjs', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(5),
});
//申请解锁信息保存成功
let save_apply_unlock = Mock.mock('/api/save_apply_unlock', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//StartEvaluation table 中的名称查看pdf
let check_pdf = Mock.mock('/api/check_pdf', 'post', {
    'basicMessage': {
        url: "/documents/younojsxia.pdf"
    }
});
//  符合性审查的名称查看pdf
let check_pdf_fhx = Mock.mock('/api/check_pdf_fhx', 'post', {
    'basicMessage': {
        url: "/documents/younojsxia.pdf"
    }
});
//  详细技术的名称查看pdf
let check_pdf_xxjs = Mock.mock('/api/check_pdf_xxjs', 'post', {
    'basicMessage': {
        url: "/documents/younojsxia.pdf"
    }
})
//资格审查项目审查提交（table）
let tijiao = Mock.mock('/api/tijiao', 'post', {
    code: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(2),

});

//资格审查项目审查提交（table）
let tijiao_fhx = Mock.mock('/api/tijiao_fhx', 'post', {
    code: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(4),
});

//资格审查项目审查提交（table）
let tijiao_xxjs = Mock.mock('/api/tijiao_xxjs', 'post', {
    code: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(6),
});

// 资格审查项汇总页面table接口
Mock.mock('/api/pingshen_huizong', 'post', (options) => {
    // console.log(JSON.parse(options.body));
    var msg = [];
    var data_msg = [];
    var dataMsg = [];
    let is_tijaio=Random.integer(0, 1);
    for (var i = 0; i < Random.integer(3,8); i++) {
        msg.push({//报价评审弹框报价计算table
            'id': Random.id(),
            'bid_name': "重庆网控科技发展有限公司",
            'tender_offer': Random.integer(100, 9999),
            'bid_price': Random.integer(100, 9999),
            'base_rice': Random.integer(100, 9999),
            'bias_ratio': Random.integer(0, 100),
            'radio': 2,
        });
        data_msg.push({//评审汇总table
            'id': Random.id(),
            'num': Random.integer(1, 7),
            'name': "重庆网控科技发展有限公司",
            'tender_offer': '10000.0000',
            'total': '10000.0000',
            'ranking': Random.integer(1, 7),
        });
        dataMsg.push({
            'company_name': Random.csentence(1, 10),
            'id': Random.id(),
            'ranking': Random.integer(1, 7),
        })
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
                'viewType':get_data(7,is_tijaio),
                'isShow':is_tijaio,//0：提交前那个页面显示，1:提交的页面
                'other_explain': Random.csentence(),//其他说明
                'bidEvaluation': msg,
                'review_summary': data_msg,
                'sort_data': dataMsg,
            }
        }
    }
});

//报价审核是否有效接口
let radio_is_valid = Mock.mock('/api/radio_is_valid', 'post', {
    code: 200,
    message: '成功!',
    data: '',
    type: ''
});

//报价审核提交接口
let radio_is_valid_tijiao = Mock.mock('/api/radio_is_valid_tijiao', 'post', {
    code: 200,
    message: '成功!',
    data: '',
    type: ''
});

//评审汇总页面提交（table）
let pshz_tijiao = Mock.mock('/api/pshz_tijiao', 'post', {
    status: 200,
    message: '提交成功!',
    data: [],
    vue_type: get_data(7),
});

//排序(向上)
let sort_up = Mock.mock('/api/sort_up', 'post', {
    code: 200,
    message: '向上排序成功!',
    data: []
});
//排序(向下)
let sort_down = Mock.mock('/api/sort_down', 'post', {
    code: 200,
    message: '向下排序成功!',
    data: []
});
//排序(提交)
let sort_tijaio = Mock.mock('/api/sort_tijaio', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//树形图页面全部提交弹框点击确定接口
let all_submit_confirm = Mock.mock('/api/all_submit_confirm','post',{
    id: () => Random.id(),
    code: 200,
    message: '确定提交!',
    data: []
});

//评审汇总的提交之后返回按钮接口
let pingshenhuizong_fanhui = Mock.mock('/api/pingshenhuizong_fanhui', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});

//子节点全部选中接口
let allChecked_son = Mock.mock('/api/allChecked_son', 'post', {
    code: 200,
    message: '成功!',
    data: ''
});
//子节点全部选中提交
let son_allchecked_submit=Mock.mock('/api/son_allchecked_submit', 'post', {
    status: 200,
    message: '成功!',
    data: '',
});
Mock.mock('/Ajax/Login', 'post', {"Status": "ok", "Text": "登陆成功<br /><br />欢迎回来"})


Mock.mock('/Ajax/LoginFalse', 'post', {"Status": "Erro", "Erro": "账号名或密码或验证码有误"})
