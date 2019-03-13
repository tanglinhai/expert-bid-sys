import Mock from 'mockjs';
Mock.setup({
    timeout: 1000
})

const Random = Mock.Random;
let tableMs = Mock.mock('/api/tableMsg', 'post', {
    'tableData|4': [{
        id: () => Random.id(),
        'deleteMsg': '项目澄清状态购标',
        date: () => Random.date(),
        'readM': '审核通过'
    }]
})
//评审项目项目数据
let bagTitMs = Mock.mock('/api/bagMsg', 'post', {
    'projectBagMsg': [{
        id: () => Random.id(),
        'status': '公开招标',
        'projectName': '测试标题南京中央办公项目建设',
        'nowBag|2-4': '标包' + Random.natural(0, 9) + Random.natural(4, 8) + '、',
        'num': 'YTZ-010-01',
        'name': '中招国际招标有限公司'
    }],
    'bagAll': [{
        id: () => Random.id(),
        'num': 'YTZ-010-01',
        'name': '中招国际...',
    }],
    'allBagMsg|0-9': [{
        id: () => Random.id(),
        'bagName': '标包' + Random.natural(0, 6) + Random.natural(5, 9),
        'starTime': '2018/11/30 13:54:00',
        'stopTime': () => Random.date(),
        'status|1': [0, 1, 2, 3, 4, 5, 6, 7, 8]
    }],
    'unwidthMsg|0-3':[{
        id: () => Random.id(),
        'bagName': '标包' + Random.natural(0, 6) + Random.natural(5, 9),
        'starTime': '2018/10/14 08:56',
        'stopTime': () => Random.date(),
        'status': 1
    }],
    'unwidthMsgMore|3-12':[{
        id: () => Random.id(),
        'bagName': '标包' + Random.natural(0, 6) + Random.natural(5, 9),
        'starTime': '2018/11/25 08:56',
        'stopTime': () => Random.date(),
        'status': 1
    }]
})

Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })


Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
