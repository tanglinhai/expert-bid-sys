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


Mock.mock('/Ajax/Login', 'post', { "Status": "ok", "Text": "登陆成功<br /><br />欢迎回来" })


Mock.mock('/Ajax/LoginFalse', 'post', { "Status": "Erro", "Erro": "账号名或密码或验证码有误" })
