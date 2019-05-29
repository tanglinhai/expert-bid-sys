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
    'projectBagMsg|0-2': [{
        id: () => Random.id(),
        'status|1': [0, 1, 2],
        'functionary': '@cname',
        'projectName': '辅助-招标投标法-最低评标价【二次公告】',

    }],
    'allBagMsg|1-3': [{
        ids: () => Random.id(),
        'biaobaomingcheng':  Random.natural(0, 6) + Random.natural(5, 9)+ Random.natural(0, 6) + Random.natural(5, 9) +Random.natural(0, 6) + Random.natural(5, 9) + 'J'
        + '/' +  Random.natural(0, 6) + Random.natural(5, 9),
        'bagName': '第' + Random.natural(0, 6) + Random.natural(5, 9) + '包',
        'starTime': () => Random.datetime(),
        'stopTime': () => Random.datetime(),
        'methodType': Random.integer(1,2,3,),//新加的（合理低价的还是综合评标）1:合理低价的;2:综合评标；3:最低价
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
        'pdf_url': "/documents/younojsxia.pdf"
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
        'IDNumber':'352226199505120036'//新加证件号码
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
//基本信息确定裁剪
let comfirm_crop = Mock.mock('/api/comfirm_crop', 'post', {
    code: 200,
    message: '成功!',
    data: []
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
//密码修改页面的保存接口
let save_pass = Mock.mock('/api/save_pass', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
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
                page: 11057,
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
Mock.mock('/api/table_msg', 'post', (options) => {
    console.log(options);
    let return_val;
    var submit_type= Random.integer(0, 1);
    let get_type_num=JSON.parse(options.body).type;
    console.log(get_type_num);
    var bidderIds = [Random.id(),Random.id(),Random.id(),Random.id(),Random.id(),Random.id(),Random.id()];

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
                    'shenchaName':"资格审查-电脑硬件配置工作",
                    'companyNameList': [//(投标人)公司名

                        { "title":"（1）重庆网控科技发展有限公司",
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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',

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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',

                        },

                    ],

                    // 'zTreeData': //树形图
                    //     {
                    //         id: 1, pId: 0, name: "资格审查-电脑硬件配置", open: true,
                    //         children: [
                    //             {
                    //                 id: 101, pId: 1, name: "资格审查1：内存大小", open: false,
                    //                 fristTableData: {//第一个表格
                    //                     question: "资格审查评审项：",
                    //                     answer: "内存大小大于8G",
                    //                     question1: "审查标准：",
                    //                     answer1: "大于等于8G",
                    //                     tableData: [{
                    //                         index: 0,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 1,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf1_1',
                    //                         pdf: [{
                    //                             //增加字段 PDF id
                    //                             id: 'pdf1_1',
                    //                             pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //
                    //                     }, {
                    //                         index: 1,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 2,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf2_1',
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 2,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 3,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf3_1',
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"},]
                    //                     }],
                    //                 },
                    //             },
                    //             {
                    //                 id: 102, pId: 1, name: "资格审查2：CPU型号", open: false,
                    //                 fristTableData: {
                    //                     question: "资格审查评审项：",
                    //                     answer: "是否为INTEL生产",
                    //                     question1: "审查标准",
                    //                     answer1: "必须是INTEL生产",
                    //                     tableData: [{
                    //                         index: 3,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 4,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf1_2',
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 4,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 5,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf2_1',
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 5,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 6,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf3_1',
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"},]
                    //                     }],
                    //                 },
                    //             },
                    //             {
                    //                 id: 103, pId: 1, name: "资格审查3：分辨率是否为15英寸以上", open: false,
                    //                 fristTableData: {
                    //                     question: "资格审查评审项：",
                    //                     answer: "分辨率是否为15英寸以上",
                    //                     question1: "审查标准3",
                    //                     answer1: "可达到1366*768以上即可",
                    //                     tableData: [{
                    //                         index: 6,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass2: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 7,
                    //                         //增加字段 关联的资格审查 PDF 的 id（即这个资格审查项，能在这个PDF文件里面找到）
                    //                         relativePDF: 'pdf1_3',
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 7,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass2: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 8,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 8,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass2: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 9,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"},]
                    //                     }],
                    //                 }
                    //             },
                    //         ]
                    //     },
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
                    'shenchaName':"形式审计-#707478",
                    'companyNameList': [//(投标人)公司名

                        { "title":"重庆网控科技发展有限公司（1）",
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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',

                        },

                    ],
                    // 'zTreeData': //树形图
                    //     {
                    //         id: 1, pId: 0, name: "形式审计-#707478", open: true,
                    //         children: [
                    //             {
                    //                 id: 101, pId: 1, name: "投标人名称", open: false,
                    //                 fristTableData: {//第一个表格
                    //                     question: "资格审查评审项：",
                    //                     answer: "投标人名称",
                    //                     question1: "审查标准4：",
                    //                     answer1: "与营业执照、资质证书一致4444",
                    //                     tableData: [{
                    //                         index: 0,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 1,
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 1,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 2,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 2,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 3,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"}]
                    //                     }],
                    //                 },
                    //             },
                    //             {
                    //                 id: 102, pId: 1, name: "资质", open: false,
                    //                 fristTableData: {
                    //                     question: "资格审查评审项：",
                    //                     answer: "资质",
                    //                     question1: "审查标准5",
                    //                     answer1: "与营业执照、资质证书一致5555",
                    //                     tableData: [{
                    //                         index: 3,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 4,
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 4,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 5,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 5,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 6,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"}]
                    //                     }],
                    //                 },
                    //             },
                    //             {
                    //                 id: 103, pId: 1, name: "审查项目", open: false,
                    //                 fristTableData: {
                    //                     question: "资格审查评审项：",
                    //                     answer: "审查项目",
                    //                     question1: "审查标准6",
                    //                     answer1: "与营业执照、资质证书一致6666",
                    //                     tableData: [{
                    //                         index: 6,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass2: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 7,
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 7,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass2: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 8,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 8,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass2: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 9,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"}]
                    //                     }],
                    //                 }
                    //             },
                    //         ]
                    //     },

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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            gradeExplain4:'',
                            gradeExplain5:'',
                            gradeExplain6:'',
                            gradeExplain7:'',
                        },

                    ],
                    // 'zTreeData': //树形图
                    //     {
                    //         id: 1, pId: 0, name: "详细评审技术", open: true,
                    //         children: [
                    //             {
                    //                 id: 101, pId: 1, name: "详细评审1", open: false,
                    //                 fristTableData: {//第一个表格
                    //                     question: "资格审查评审项：",
                    //                     answer: "详细评审1",
                    //                     question1: "审查标准7：",
                    //                     answer1: "与营业执照、资质证书一致77777",
                    //                     tableData: [{
                    //                         index: 0,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 1,
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 1,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 2,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 2,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 3,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"}]
                    //                     }],
                    //                 },
                    //             },
                    //             {
                    //                 id: 102, pId: 1, name: "详细评审2", open: false,
                    //                 fristTableData: {
                    //                     question: "资格审查评审项：",
                    //                     answer: "详细评审2",
                    //                     question1: "审查标准8",
                    //                     answer1: "与营业执照、资质证书一致8888",
                    //                     tableData: [{
                    //                         index: 3,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 4,
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 4,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 5,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 5,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 6,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"}]
                    //                     }],
                    //                 },
                    //             },
                    //             {
                    //                 id: 103, pId: 1, name: "详细评审3", open: false,
                    //                 fristTableData: {
                    //                     question: "资格审查评审项：",
                    //                     answer: "详细评审3",
                    //                     question1: "审查标准9",
                    //                     answer1: "与营业执照、资质证书一致999",
                    //                     tableData: [{
                    //                         index: 6,
                    //                         people: '招标人1：',
                    //                         name: '[1]重庆网控科技发展有限公司',
                    //                         pass2: '1',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 7,
                    //                         pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件1', 'url1': "/documents/投标人1.pdf"},
                    //                             {id: 'pdf1_2', pdf_name: 'pdf文件11', 'url1': "/documents/投标人11.pdf"},
                    //                             {id: 'pdf1_3', pdf_name: 'pdf文件111', 'url1': "/documents/投标人111.pdf"},]
                    //                     }, {
                    //                         index: 7,
                    //                         people: '招标人2：',
                    //                         name: '[2] 普瑞太阳能有限公司',
                    //                         pass2: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 8,
                    //                         pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件2', 'url1': "/documents/投标人2.pdf"}]
                    //                     }, {
                    //                         index: 8,
                    //                         people: '招标人3：',
                    //                         name: '[3] 夏丰热工研究院有限公司',
                    //                         pass2: '2',
                    //                         content: '',
                    //                         ra1: '合格',
                    //                         ra2: '不合格',
                    //                         radio: '',
                    //                         id: 9,
                    //                         pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件3', 'url1': "/documents/投标人3.pdf"}]
                    //                     }],
                    //                 }
                    //             },
                    //         ]
                    //     },
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
    return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1,submit_type);
    return return_val;
});
/*----------------------审查项页面数据接口end---------------------*/
/*---------------------  审查项汇总页面接口------------------*/
Mock.mock('/api/table_data', 'post', (options) => {
    let return_val;
    let get_type_num=JSON.parse(options.body).type;
    if (get_type_num == 2) {//是区别那个页面
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
    } else if (get_type_num == 4) {
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
    } else if (get_type_num == 6) {
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
    return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1);
    return return_val;
});
/*---------------------审查项汇总页面接口end------------------*/

// 资格审查( 商务服务技术其他radio)合格不合格radio接口
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


//公共导航接口
//蓝色icon是正在进行，绿色icon：完成，灰色的文本icon是可以点；
//1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态( 不是汇总页面提交)；type：菜单传的状态(按钮状态)；zong_type：是否提交的状态( 是汇总页面提交)；

function get_data(type,is_submit_type) {
    // console.log(type, is_submit_type);
    function set_type() {
        if (type == 0) {
            return [is_submit_type?1:2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, ]
        }
        if (type == 1) {//资格审查
            return [1, 3, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,]
        }
        if (type == 2) {//资格审查汇总
            return [1, 1, is_submit_type?1:2, 3, 4, 4, 4,4, 4, 4, 4, 4,]
        }
        if (type == 3) {//符合性审查项
            return [1, 1, 1, is_submit_type?1:2, 4, 4, 4,4, 4, 4, 4, 4,]
        }
        if (type == 4) {//符合性审查项汇总
            return [1, 1, 1, 1, is_submit_type?1:2, 3, 4,4, 4, 4, 4, 4,]
        }
        if (type == 5) {//详细
            return [1, 1, 1, 1, 1, is_submit_type?1:2, 4,4, 4, 4, 4, 4,]
        }
        if (type == 6) {//详细汇总
            // return [1, 1, 1, 1, 1, 1, is_submit_type?1:2,4, 4, 4, 4, 4,]//之前的
            return [1, 1, 1, 1, 1, 1 , is_submit_type?1:2,3,3,3,3,3]
        }
        if (type == 7) {//定档
            return [1, 1, 1, 1, 1, 1 , is_submit_type?1:2,3,3,3,3,3]
        }
        if (type == 8) {//商务
            return [1, 1, 1, 1, 1, 1 ,1, is_submit_type?1:2,3,3,3,3]
        }
        if (type == 9) {// 技术
            return [1, 1, 1, 1, 1, 1 ,1, 1,is_submit_type?1:2,3,3,3]
        }
        if (type == 10) {//服务
            return [1, 1, 1, 1, 1, 1 ,1, 1,1,is_submit_type?1:2,3,3]
        }
        if (type == 11) {//其他
            return [1, 1, 1, 1, 1, 1 ,1, 1,1,1,is_submit_type?1:2,3]
        }
        if (type == 70) {//评审汇总
            return [1, 1, 1, 1, 1, 1 ,1,  1,1,1,1,is_submit_type?1:2]
        }
    }

    set_type();
    var a;
    a = set_type();
    // console.log(a);
    return [
        {
            value: '1',//
            label: '资格审查',
            type: a[0],
        },
        {
            value: '2',
            label: '资格审查汇总',
            type: a[1]
        },
        {
            value: '3',
            label: '符合性审查',
            type: a[2]
        },
        {
            value: '4',
            label: '符合性审查汇总',
            type: a[3]
        },
        {
            value: '5',
            label: '详细评审(技术)',
            type: a[4]
        },
        {
            value: '6',
            label: '详细评审(技术)汇总',
            type: a[5]
        },
        // {
        //     value: '7',
        //     label: '定档评议',
        //     type: a[6]
        // },
        {
            value: '8',
            label: '商务',
            type: a[7]
        },
        {
            value: '9',
            label: '技术',
            type: a[8]
        },
        {
            value: '10',
            label: '服务',
            type: a[9]
        },
        {
            value: '11',
            label: '其他',
            type: a[10]
        },
        {
            value: '70',
            label: '评审汇总',
            type: a[11]
        },
    ]
}
//合理低价
//通过：绿色，正在进行：橘色；可点：灰色；不可点：白色
//1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态( 不是汇总页面提交)；type：菜单传的状态；zong_type：是否提交的状态( 是汇总页面提交)；
// function get_data(type,is_submit_type) {//type
//     function set_type() {
//         if (type == 0) {
//             return [is_submit_type?1:2, 3, 4, 4, 4, 4, 4,]
//         }
//         if (type == 1) {
//             return [1, 3, 4, 4, 4, 4, 4,]
//         }
//         if (type == 2) {
//             return [1, 1, is_submit_type?1:2, 3, 4, 4, 4,]
//         }
//         if (type == 3) {//符合性审查项
//             return [1, 1, 1, is_submit_type?1:2, 4, 4, 4,]
//         }
//         if (type == 4) {//符合性审查项汇总
//             return [1, 1, 1, 1, is_submit_type?1:2, 3, 4,]
//         }
//         if (type == 5) {//详细
//             return [1, 1, 1, 1, 1, is_submit_type?1:2, 3,]
//         }
//         if (type == 6) {//详细汇总
//             return [1, 1, 1, 1, 1, 1, is_submit_type?1:2,]
//         }
//         if (type == 7) {//详细汇总
//             return [1, 1, 1, 1, 1, 1, is_submit_type?1:2,]
//         }
//     }

//     set_type();
//     var a;
//     a = set_type();
//     // console.log(a);
//     return [
//         {
//             value: '1',
//             label: '资格审查项',
//             type: a[0],
//         },
//         {
//             value: '2',
//             label: '资格审查项汇总',
//             type: a[1]
//         },

//         {
//             value: '3',
//             label: '符合性审查项',
//             type: a[2]
//         },
//         {
//             value: '4',
//             label: '符合性审查项汇总',
//             type: a[3]
//         },
//         {
//             value: '5',
//             label: '详细评审（技术）',
//             type: a[4]
//         },
//         {
//             value: '6',
//             label: '详细评审（技术）汇总',
//             type: a[5]
//         },
//         {
//             value: '7',
//             label: '评审汇总',
//             type: a[6]
//         },
//     ]

// }


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
});
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
    let get_type_num=JSON.parse(options.body).type;
    let methodType=JSON.parse(options.body).methodType;
    if(get_type_num==70&& methodType==1){//合理低价
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
                'base_rice': Random.integer(100, 9999),
                'bias_ratio': Random.integer(0, 100),
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
                    'viewType':get_data(70,is_tijaio),
                    'isShow':is_tijaio,//0：提交前那个页面显示，1:提交的页面
                    'tijiao':'',
                    'bidEvaluation': msg,
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
                            "ranking":'3'
                        },
                        {
                            // 'bidderNumber': '3',
                            'bidder': '(3)普瑞太阳能有限公司',
                            "pricePoints":'49.00',
                            'finalScore':'10.00',
                            "ranking":'2'
                        },
                        {
                            // 'bidderNumber': '1',
                            'bidder': '(1)阿里巴巴',
                            "pricePoints":'29.00',
                            'finalScore':'10.00',
                            "ranking":'1'
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
    }else if(get_type_num==70 && methodType==2){//综合评标
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
                    'viewType':get_data(70,is_tijaio),
                    'isShow':is_tijaio,//0：提交前那个页面显示，1:提交的页面
                    'tijiao':tijaio,//综合评标评审汇总页面是否提交
                    'bidEvaluation': [{//计算报价得分
                        toubiaoPrice: '31,000,00',
                        name: '夏丰热工研究院有限公司',
                        evaluationBid: '31,000,00',
                        standardPrice:'30,000,00',
                        beitaValue:'-10.00',
                        scoringSystem:'52.2',
                        score: ''
                    },{
                        toubiaoPrice: '28,000,00 ',
                        name: '普瑞太阳能有限公司',
                        evaluationBid: '28,000,00',
                        standardPrice:'30,000,00',
                        beitaValue:'-20.00',
                        scoringSystem:'45.2',
                        score: ''
                    }, {
                        toubiaoPrice: '30,000,00',
                        name: '夏风热工研究有限公司',
                        evaluationBid: '30,000,00',
                        standardPrice:'30,000,00',
                        beitaValue:'-0.00',
                        scoringSystem:'53',
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
                            "ranking":'3'
                        },
                        {
                            // 'bidderNumber': '3',
                            'bidder': '(3)普瑞太阳能有限公司',
                            "pricePoints":'49.00',
                            'finalScore':'10.00',
                            "ranking":'2'
                        },
                        {
                            // 'bidderNumber': '1',
                            'bidder': '(1)阿里巴巴',
                            "pricePoints":'29.00',
                            'finalScore':'10.00',
                            "ranking":'1'
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
    }else if(get_type_num==70&& methodType==3){//最低价



    }
});


//评审汇总页面报价分计算弹框提交接口

let score_quotation_tijiao = Mock.mock('/api/score_quotation_tijiao', 'post', {
    code: 200,
    message: '成功!',
    data: '',
    type: ''
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
    vue_type: get_data(70),
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


/*----------------------定档商务技术服务其他-----------------*/
Mock.mock('/api/BusinessOther', 'post', (options) => {
    let return_val;
    var submit_type= 1;
    let get_type_num=JSON.parse(options.body).type;
    var submit_type= Random.integer(0, 1);//0:未提交,1:
    if (get_type_num == 7) {
        let msg = [];
        msg.push(
            {
                'xuhao': '1',//序号
                'dafenxiang': ' 0、商务1是否是官方配置？(50.00分) ',//打分项
                'dingDang':'50.00'//定档
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
                    'companyNameList': [//(投标人)公司名

                        { "title":"重庆网控科技发展有限公司（1）",
                            'laber':' 是否是官方配置？（50.00分）',
                            pdf: [{id: 'pdf1_1', pdf_name: 'pdf文件11', 'url1': "/documents/投标人1.pdf"},
                                {id: 'pdf1_2', pdf_name: 'pdf文件12', 'url1': "/documents/投标人11.pdf"},
                                {id: 'pdf1_3', pdf_name: 'pdf文件13', 'url1': "/documents/投标人111.pdf"}],

                            factors_standards:factors_standards(1)[0]
                        },
                        { "title": "普瑞太阳能有限公司（2）",
                            'laber':' 是否是官方配置？（50.00分）',
                            pdf: [{id: 'pdf2_1', pdf_name: 'pdf文件22', 'url1': "/documents/投标人2.pdf"}],

                            factors_standards:factors_standards(1)[1]

                        },
                        {
                            "title":"夏丰热工研究院有限公司（3）",
                            'laber':' 是否是官方配置？（50.00分）',
                            pdf: [{id: 'pdf3_1', pdf_name: 'pdf文件31', 'url1': "/documents/投标人3.pdf"},
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

                            factors_standards:factors_standards(1)[2]
                        }
                    ],
                    "dingdang_tableData":[//打分项
                        { "grade":'商务  商务1（50.00分）', },
                        // { "grade":'商务   商务2（50.00分）',},
                    ],
                    'msgBox': msg,
                    'committeeGudges': [
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

                    'viewScheduleTitileData':{
                        'groupName': '0' + '6' + Random.natural(0, 0) + Random.natural(0, 9) + '-'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6) + Random.natural(5, 9) + 'N'
                        + Random.natural(0, 6) + Random.natural(5, 9) + Random.natural(0, 6)
                        + '/' + '评委会',//     评标委员会
                        'bagName': '第' + Random.natural(0, 9) + '包',//分包号
                    },
                    'viewUnfinishedData':[
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
    } else if (get_type_num == 8) {
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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
                            rowIndex: 0
                        },
                        {
                            projectName: '第二章，商务20分',
                            type: 'input',// 两步法
                            radioList: [],
                            min: 10,
                            max: 50,
                            tit: '是否是官方配置？',
                            value1: '',
                            value2: '',
                            value3: '',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
    else if (get_type_num == 9) {
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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
    else if (get_type_num == 10) {
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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,//控制radio，是不是显示状态
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
                            gradeExplain1:'',
                            gradeExplain2:'',
                            gradeExplain3:'',
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
    }else if (get_type_num == 11) {
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
                                {id: 'pdf3_2', pdf_name: 'pdf文件32', 'url1': "/documents/投标人3.pdf"}],

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
                            gradeExplain1:"",
                            gradeExplain2:"",
                            gradeExplain3:"",
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:"",
                            gradeExplain2:"",
                            gradeExplain3:"",
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
                            gradeExplain1:"",
                            gradeExplain2:"",
                            gradeExplain3:"",
                            bool1:true,
                            bool2:true,
                            bool3:true,
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
    return_val.bidMsg.eviewrItemsMsg.viewType=get_data(get_type_num-1,submit_type);
    return return_val;
});
/*----------------------定档商务技术服务其他end-----------------*/

/*---------------------定档接口----------------------*/
//定档提交接口
let dingdang_tijiao = Mock.mock('/api/dingdang_tijiao', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(7),
});
//定档保存接口
let dingdang_save = Mock.mock('/api/dingdang_save', 'post', {
    status: 200,
    message: '成功!',
    data: '',
    vue_type: get_data(7),
});


//商务保存接口
let business_save = Mock.mock('/api/business_save', 'post', {
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
            gradeExplain3:""
        },

    vue_type: get_data(8),
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
//其他保存接口
let qita_save = Mock.mock('/api/qita_save', 'post', {
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
    vue_type: get_data(11),
});
//服务编辑弹框保存成功
let saveEditor = Mock.mock('/api/saveEditor', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//商务提交
let submitBusiness = Mock.mock('/api/submitBusiness','post',{
    id: () => Random.id(),
    code: 200,
    message: '确定提交!',
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
    vue_type: get_data(8),
});

//技术保存接口
let jishu_save = Mock.mock('/api/jishu_save', 'post', {
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
    vue_type: get_data(9),
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
    vue_type: get_data(8),
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

    vue_type: get_data(9),
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
    vue_type: get_data(10),
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
    vue_type: get_data(11),
});


//综合评标评审汇总页面评分解锁申请弹框保存接口
let ruleFormLockRequestSave = Mock.mock('/api/ruleFormLockRequestSave', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//综合评标评标意见弹框保存接口
let saveBiddingAdvice = Mock.mock('/api/saveBiddingAdvice', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//合理低价评标意见弹框保存接口
let hldjSaveBiddingAdvice = Mock.mock('/api/hldjSaveBiddingAdvice', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});
//综合评标表格提交按钮接口
let submitBtnZHPB = Mock.mock('/api/submitBtnZHPB', 'post', {
    code: 200,
    message: '保存成功!',
    data: []
});




// let sss=Mock.mock('/api/sss','post',{
//     code: 200,
//     data: {
//
//         'as':[
//             {
//                 'psr':'张三',
//                 'sss':[
//                     {'tbiaore ':'重庆','ssss|1':['3','4','120']},
//                     {'tbiaore ':'重庆','ssss|1':['3','4','120']},
//                     {'tbiaore ':'重庆','ssss|1':['3','4','120']},
//
//                 ],
//             },
//             // {
//             //     'psr':'wangwu',
//             //     'sss':[
//             //         {'tbiaore ':'ssss'},
//             //
//             //     ]
//             // }
//         ]
//     }
//
// });




//lp导航
//1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//提交之后的状态：
//is_submit_type: 是否提交的状态；currentPage：当前进行到哪一步；

// function get_data(currentPage,is_submit_type,types) {//type
//     // console.log(type, is_submit_type);
//     function set_type() {
//         if (currentPage == 1) {
//             if(types==1){
//                 return [is_submit_type?1:2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,4].splice(types,1,5)
//             }else{
//                 return [is_submit_type?1:2,4,4,4,4,4,4,4,4,4,4,4,4,4]
//             }
//         }
//         if (currentPage == 2) {//资格审查
//             if(types==1){
//                 var num=[1,4, 4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
//                 num.splice(types-1,1,5)
//                 num.splice(currentPage-1,1,is_submit_type?1:3);
//                 return num;
//             }else{
//                 return [1,is_submit_type?1:2, 4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4]
//             }
//         }
//         if (currentPage == 3) {//资格审查汇总
//             if(types==1){
//                 var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
//                 num.splice(types-1,1,5);
//                 num.splice(currentPage-1,1,is_submit_type?1:3);
//                 return num;
//             }else if(types==2){
//                 var num=[1,1,4, 4, 4, 4, 4, 4,4, 4, 4, 4, 4,4];
//                 num.splice(types-1,1,5);
//                 num.splice(currentPage-1,1,is_submit_type?1:3);
//                 return num;
//             }else{
//                 return [1, 1, is_submit_type?1:2, 4, 4, 4, 4,4, 4, 4, 4, 4,4,4]
//             }
            
//         }
       
//     }
//     //set_type();
//     var a;
//     a = set_type();
//     return [
//         {   //综合评标导航    商务，技术，服务，其他，评审汇总：（详细评审(技术)汇总提交完成之后可点）
//             value: '1',//
//             label: '承诺书',  //步数字段
//             types: 1,  //types代表第几步对应相对应得步数
//             typestaus:a[0],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点

//         },{
//             value: '2',//
//             label: '参加评标',
//             types: 2,
//             typestaus:a[1],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//         },{
//             value: '3',//
//             label: '推举组长',
//             types: 3,
//             typestaus:a[2],    //1; 通过,2:正在进行:3：未完成可点4：未完成不可点
//         },{
//             value: '4',//
//             label: '资格审查',
//             types: 4,
//             typestaus:a[3],
//         },{
//             value: '5',//
//             label: '资格审查汇总',
//             types: 5,
//             typestaus:a[4],
//         },{
//             value: '6',//
//             label: '符合性审查',
//             types: 6,
//             typestaus:a[5],
//         },{
//             value: '7',//
//             label: '符合性审查汇总',
//             types: 7,
//             typestaus:a[6],
//         },{
//             value: '8',//
//             label: '详细评审(技术)',
//             types: 8,
//             typestaus:a[7],
//         },{
//             value: '9',//
//             label: '详细评审(技术)汇总',
//             types: 9,
//             typestaus:a[8],
//         },{
//             value: '10',//
//             label: '商务',
//             types: 10,
//             typestaus:a[9],
//         },{
//             value: '11',//
//             label: '技术',
//             types: 11,
//             typestaus:a[10],
//         },{
//             value: '12',//
//             label: '服务',
//             types: 12,
//             typestaus:a[11],
//         },{
//             value: '13',//
//             label: '其他',
//             types: 13,
//             typestaus:a[12],
//         },{
//             value: '14',//
//             label: '评审汇总',
//             types: 14,
//             typestaus:a[13],
//         }
        
//     ]
// }

// //公共导航接口
// Mock.mock('/api/navcommons','post',(options) =>{
//     let CommonsData;
//     let currentpage=JSON.parse(options.body).currentpage;
//     let is_submit_type=JSON.parse(options.body).is_submit_type;
//     let types=JSON.parse(options.body).types;
//     console.log(currentpage,is_submit_type,888888);
//     CommonsData={
//         ProjectInformationsAll:{
//             projectName:'单信封-0305-1',
//             projectNumber:'0635-1909qwerN1133',
//             projectWenjian:'招标文件(pdf)',
//             PersonName:'张三'
//         },
//         navsAll:get_data(currentpage,is_submit_type,types),
//     };
//     return CommonsData;
        
// })
//lp导航
//公共导航接口

Mock.mock('/Ajax/Login', 'post', {"Status": "ok", "Text": "登陆成功<br /><br />欢迎回来"});


Mock.mock('/Ajax/LoginFalse', 'post', {"Status": "Erro", "Erro": "账号名或密码或验证码有误"});




