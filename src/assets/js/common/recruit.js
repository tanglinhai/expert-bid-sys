window.onload = function() {
    if(window.ActiveXObject || "ActiveXObject" in window){
        console.log("中招联合 是由工业和信息化部所属中国机电设备招标中心牵头，为响应国家“互联网+”招标采购的号召，");
        console.log("中招联合 以“工信背景、行业领先、技术一流”为先天优势，拥有一支具有20年招标采购经验的核心团队，");
        console.log("中招联合 一贯秉承“互联网+”的经营理念，坚持自主研发，建设运营招标采购平台与中小企业自采平台，");
        console.log("中招联合 开展“互联网+”业态下的衍生业务，提供互联网金融系列产品及招标领域“供应链金融”服务等。");
        console.log("这里是您施展才华的平台，赶紧加入中招吧！");
        console.log("为您实现梦想提供最广阔的平台。");
        console.log("请将简历发送至： zzlh@365trade.com.cn");
        console.log("中招联合官网： http://www.cntcunion.com");
    }else{
    var description_1 = "%c中招联合 %c是由工业和信息化部所属中国机电设备招标中心牵头，为响应国家“互联网+”招标采购的号召，";
    var description_2 = "%c中招联合 %c以“工信背景、行业领先、技术一流”为先天优势，拥有一支具有20年招标采购经验的核心团队，";
    var description_3 = "%c中招联合 %c一贯秉承“互联网+”的经营理念，坚持自主研发，建设运营招标采购平台与中小企业自采平台，";
    var description_4 = "%c中招联合 %c开展“互联网+”业态下的衍生业务，提供互联网金融系列产品及招标领域“供应链金融”服务等。\n";
    var title_style = "color:#e45;";
    var description_style = "color:#606266;";

    var join = "%c这里是您施展才华的平台，赶紧加入中招吧！";
    var join_style = "color:#606266;";

    var plat = "%c为您实现梦想提供最广阔的平台。";
    var plat_style = "color:#606266;";



    var resume = "请将简历发送至：%c zzlh@365trade.com.cn";
    var resume_style = "color:#00a5c7;";
    var official = "中招联合官网：%c http://www.cntcunion.com/\n";
    var resume_style = "color:#00a5c7;";



    console.log("%c ", "background: url(http://localhost:8080/img/logo/logo_print.png) no-repeat center;background-size:200px;padding-left:180px;padding-bottom: 60px;")

    console.log(description_1, title_style, description_style);
    console.log(description_2, title_style, description_style);
    console.log(description_3, title_style, description_style);
    console.log(description_4, title_style, description_style);

    console.log(join, join_style);
    console.log(plat, plat_style);

    console.log(resume, resume_style);
    console.log(official, resume_style);
    }
};