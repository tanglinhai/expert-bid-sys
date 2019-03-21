﻿import Mock from 'mockjs';
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
        'status|1': [0, 1,2],
        'functionary': '@cname',
        'projectName': '辅助-招标投标法-最低评标价【二次公告】',

    }],
    'allBagMsg|1-3': [{
        ids: () => Random.id(),
        'groupName': '0' + '6'+ Random.natural(0, 0) + Random.natural(0, 9)+'-'
        +Random.natural(0, 6) + Random.natural(5, 9)+ Random.natural(0, 6) + Random.natural(5, 9)+'N'
        +Random.natural(0, 6) + Random.natural(5, 9)+ Random.natural(0, 6)
        +'/'+'评委会',
        'bagName': '第' + Random.natural(0, 6) + Random.natural(5, 9)+'包',
        'starTime':   () => Random.datetime(),
        'stopTime':  () => Random.datetime(),
        'type|1': [0, 1],
        'proBusinessNum':'0' + '6'+ Random.natural(0, 0) + Random.natural(0, 9)+'-'
        +Random.natural(0, 6) + Random.natural(5, 9)+ Random.natural(0, 6) + Random.natural(5, 9)+'q'+'w'+'e'+'r'+'N'
        +Random.natural(0, 9) + Random.natural(0, 9)+ Random.natural(0, 9)+ Random.natural(0, 9),
        'sellStartTime':() => Random.datetime(),
        'sellEndTime':() => Random.datetime(),
        'bidOpeningTime':() => Random.datetime(),
        'getBidType':'在线下载',
        'bidOpeningPlace': '北京海淀区',
        'evaluationBidPlace': '北京市朝阳区',
        'evaluationBidTime':() => Random.datetime(),
        'paymentType':[0,1,2],
        'uploadWay|1':[0,1,2],
        'tenderFree':Random.float(10, 1000, 2, 2),
        'postage':Random.float(10, 100, 2, 2),
        'drawingDeposit':Random.float(10, 100, 2, 2),
        'bidAgencyServiceFee':Random.float(1, 100, 2, 2)+'(浮动费率 （发改价格[2011]534号)',
        'tenderBond':Random.float(10, 100, 2, 2)+'万元'
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
    'data':{
        name:"123",
        pass:"0"
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
let esta=Mock.mock('/api/esta','post',{
    msg:{
        'status|1':[0,1]
    },
    'members|0-5':[
        {unitName:'中招联合',editNum:() => Random.id(),name:() => Random.cname(),pNumber:'13253246679'}
    ],
    'mylist|0-5':[
        {unitName:'中招国际',fileName:'我的联合体协议.pdf',newTime:() => Random.date() + ' 12:20:34','status|1':[0,1],id:() => Random.id(),name:() => Random.cname(),pNumber:'13253246679',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',deleLoad:false}
    ],
    'already|0-5':[
        {unitName:'中招联合',fileName:'我的联合体协议.pdf',startDate:() => Random.date() + ' 20:22',openTime:() => Random.date() + ' 15:40:59',id:() => Random.id(),name:() => Random.cname(),pNumber:'13253246679',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
    ]
});
//
// let bagTitMs = Mock.mock('/api/bagMsg', 'post', {
//
// })

Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })


Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
