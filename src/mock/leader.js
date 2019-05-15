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
            'nowStatus|1':['进行中','已暂停','已结束'],
            'id': '@id',
            'btnStatus|1':[0,1],
            'beFlag':true,
            'progre|1':['资格审查','符合性审查','详细评审','商务']
        }
    ]
})


Mock.mock('./api/viewBeMsg','post',{
    'leaderMsg|0-5':[
        {
            'name':'@cname',
            'status|1':[0,1]
        }
    ]
})

Mock.mock('./api/cardMsg','post',{
    'allCard|22':[
        {
            'name':'@cname',
            'telNum':'13925963355',
            'status|1':[0,1],
            'votes':'@natural(0,99)',
            'diff|1':['组长','null']
        }
    ]
})

Mock.mock('./api/tabMsg','post',{
    'tabTitle':[
        {title: '资格审查', name: '1'},
        {title: '资格审查汇总', name: '2'},
        {title: '符合性审查', name: '3'},
        {title: '符合性审查汇总', name: '4'},
        {title: '详细评审(技术)', name: '5'},
        {title: '详细评审(技术)汇总', name: '6'},
        {title: '商务', name: '7'},
        {title: '技术', name: '8'},
        {title: '服务', name: '9'},
        {title: '其他', name: '10'},
        {title: '评审汇总', name: '11'},        
    ]
})

Mock.mock('./api/tableMsg','post',{
    'pdf':[
            {   
                pName:'重庆网控科技发展有限公司',
                id:Random.id(),
                'allPdf|1-4':['pdf文件@natural(1,99)'],
                factor:'内存大小大于8G',
                'qualified':[
                    {statu:'合格',unStatu:'合格'},
                    {statu:'不合格',unStatu:'不合格'},
                ]
            },
            {
                pName:'普瑞太阳能有限公司',
                id:Random.id(),
                factor:'是否为INTEL生产',
                'allPdf|1-4':['pdf文件@natural(1,99)'],
                'qualified':[
                    {statu:'合格',unStatu:'合格'},
                    {statu:'不合格',unStatu:'不合格'},
                ]
            },
            {
                pName:'夏丰热工研究院有限公司',
                id:Random.id(),
                factor:'分辨率是否为15英寸以上',
                'allPdf|1-4':['pdf文件@natural(1,99)'],
                'qualified':[
                    {statu:'合格',unStatu:'合格'},
                    {statu:'不合格',unStatu:'不合格'},
                ]
            }
    ]
})

Mock.mock('./api/pqeatMsg','post',{
    'pdf':[
        {
            pName:'重庆网控科技发展有限公司',
            factor:'资格审查1',
            'allPdf|1':['✔','✖'],
            reason:'√(5√0×)', 
            stau:'1',
            'allOwn':[
                {name:'王五',statu:'✖'},
                {name:'赵六',statu:'✔'},
                {name:'葛七',statu:'✖'},
            ]
        },
        {
            pName:'普瑞太阳能有限公司',
            factor:'资格审查2',
            'allPdf|1':['✖','✔'],
            reason:'√(5√0×)',
            stau:'2',
            'allOwn':[
                {name:'张三',statu:'✔'},
                {name:'赵六',statu:'✔'},
                {name:'葛七',statu:'✖'},
            ]
        },
        {
            pName:'夏丰热工研究院有限公司',
            factor:'资格审查3',
            'allPdf|1':['✔','✖'],
            reason:'√(5√0×)',
            stau:'3',
            'allOwn':[
                {name:'张三',statu:'✔'},
                {name:'李四',statu:'✔'},
                {name:'葛七',statu:'✖'},
            ]
        }
    ]
})