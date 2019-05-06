export default {
    state:{
        show:false,//不合格对象录入弹框
        unlock_record :false,//解锁申请记录弹框
        qualificationUnlock :false,//资格审查项汇总解锁申请弹框
        flag:'',//是否提交table
        isshow:'',//资格审查项汇总显示
        individualTrial:false,//个人初审类活动表弹框
        sort:false,//评审汇总的排序弹框状态
        bidEvaluation:false ,//报价评审（评审汇总）
        success_warning:false ,//成功提示
        submitPrompt:false ,//全部提交提示
        is_pingshen_show:false,//评审页面是否提交
        start_sublevel_show:false,//评标页面（树形图）进度条以及全选，提交按钮是否显示
        parent_progress_show:true,
        viewSchedule:false,//查看定档表弹框
        ViewUnfinishedItems:false,//查看未完成项
        ScoreShows:false,//评分说明编辑
        determineOperating:false,//评标页面全部选中的时候提示弹框
        huizongSubmit:false,//汇总提交提交的时候提示弹框
        tijiaoNot100:false,//资格审查全部提交的时候提示弹框（资格审查未完成不能提交）
        tijiao100:false,
        tijiaoHuizong:false,//汇总提交成功的消息弹框
        business_tijiao:true,//商务提交状态
        dingdang_tijiao_state:true,//定档提交状态
        jishu_tijiao_state:true,//技术提交状态，
        checkProScoreDialogVisible:false,//专家个人打分表弹框
        tijiaoDialogZHPB:false,//综合评标页面提交按钮提示确定提交弹框

    }
}