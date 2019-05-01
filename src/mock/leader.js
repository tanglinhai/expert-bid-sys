import Mock from 'mockjs';
import JSON from 'JSON';
Mock.setup({
    timeout: 1000
});
const Random = Mock.Random;

Mock.mock('/api/leaderBagMsg','post',{
    'bagTitleMsg|1-3':[
        {
            'title':'辅助-招标投标法-最低评标价【二次公告】',
            'num':'0635-1918WQE3'
        }
    ],
    'bagConMsg|1-5':[
        {
            'bag':'第' + '@natural(12, 28)' + '包',
            'pName':'@cname',
            'stTime':Random.datetime(),
            'ovTime':Random.datetime(),
            'nowStatus|1':['已推举','未推举'],
            'id': '@id',
            'btnStatus|1':[0,1]
        }
    ]
})