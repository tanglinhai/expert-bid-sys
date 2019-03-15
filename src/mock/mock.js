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
        'status|1': [0, 1,2],
        'functionary': '@cname',
        'projectName': '辅助-招标投标法-最低评标价【二次公告】',

    }],
    'allBagMsg|1-3': [{
        id: () => Random.id(),
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





//
// let bagTitMs = Mock.mock('/api/bagMsg', 'post', {
//
// })

Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })


Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
