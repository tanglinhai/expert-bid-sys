import Mock from 'mockjs';
import JSON from "JSON";
Mock.setup({
    timeout: 1000
});

const Random = Mock.Random;


Mock.mock('/api/getPDFCategory', 'post', {
    'aaa': [{
        id: () => Random.id(),
        'deleteMsg': '项目澄清状态购标',
        date: () => Random.date(),
        'readM': '审核通过'
    }]
});