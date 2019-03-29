urltoken = getParam("Token");   //获取url后缀得参数
$(function(){
    statuss();     //签名获取状态一进来就获取
    PersonSign();     //列表信息接口
	usertList();   //获取用户信息
    projectList();   //项目信息接口
    
    if($(".personUl li:last-child em").text()=="完成完成"){
        console.log($(".personUl li:last-child em").text())
        clearInterval(timer);
        $(".tishimsgs").hide();
    }
    $(".tkGuanbi").click(function(){   //弹框关闭按钮
        $(".model_tk").hide();
        $("#text").val('');
        $("#qrcode").html('');
        clearTimeout(t)
        $(".ewmsx").hide();
        statuss();     //签名获取状态一进来就获取
        setTimeout(function(){
            statuss();     //签名获取状态一进来就获取
        },30000)
     });

     $(".model_tk").click(function(){     //大弹框灰色点击
        $(this).hide();
        $("#text").val('');
        $("#qrcode").html('');
        clearTimeout(t)
        $(".ewmsx").hide();
        statuss();     //签名获取状态一进来就获取
        setTimeout(function(){
            statuss();     //签名获取状态一进来就获取
        },30000)
    });

    $(".modal-body").click(function(e){   //冒泡事件
       var ev = e || event;
       ev.stopPropagation();
    });

    var href=url + "/stamp/receipt?token=" + urltoken;
    $("#more2").attr({"href":href});
	$("#more2").prop({"href":href});
   
});


//获取用户信息
function usertList(){
    $.ajax({
        url:url+"/user/info?token="+urltoken,
        type: "post",
        dataType: "json",
        success: function (data) {
            if(data.resultCode=="200"){
                $(".ipnhidden").val(data.id);
                $(".userName").text(data.resultBody.userNickname);
                if(data.resultBody.reader=="1"){
                    var groupleader= url2+"/groupLeader.html?token="+urltoken;  //组长页面链接
                   $(".leader").css({"visibility":"inherit"});
                   $(".leader").attr({"href":groupleader});
                   $(".leader").prop({"href":groupleader})
                }
            }else{
                $(".msg_tk").show();
                $(".msg_tk p").text(data.resultMsg)
            }
        }
    })
};


//文件列表接口
function PersonSign(){
    var html = "";
    $(".loading").css({"left":"12%","top":"40%","zIndex":"9999"}).show();
    $.ajax({
        url:url+"/file/list?token="+urltoken,
        async:true,
        type: "post",
        data: {
            "id":$(".ipnhidden").val(),
        },
        dataType: "json",
        success: function (data) {
            if(data.resultCode=="200"){
                $(".loading").css({"left":"12%","top":"40%","zIndex":"9999"}).hide();
                for(var i=0;i<data.resultBody.fileMenuList.length;i++){
                    var fileList = data.resultBody.fileMenuList[i].fileList;
                    if(fileList){
                        var li = "";
                        var p="";
                        if(fileList.length>0){
                            $(".listshow").val("1");
                            if($(".statusshow").val()=="0"){
                                $("#more").css({"display":"block"});
                                p +='<p style="font-size:14px; text-align:center;margin-top:20px; display:none">您，暂无签名文档！</p>'
                            }else{
                                $("#more2").css({"display":"block"});
                            }
                        }else{
                            p +='<p style="font-size:14px; text-align:center;margin-top:20px; display:block">您，暂无签名文档！</p>'
                        }
                        for(var j=0;j<fileList.length;j++){
                            var file = fileList[j];	
                            if(file.fileStatus=="1"){
                                li +='<li attr='+file.fileId+'><p>'+file.fileName+'</p><span>'+file.gmt_modified+'</span><em>待签</em></li>'
                            }
                            if(file.fileStatus=="2"){
                                li +='<li attr='+file.fileId+'><p>'+file.fileName+'</p><span>'+file.gmt_modified+'</span><em>待完成</em></li>'
                            }
                            if(file.fileStatus=="3"){
                                li +='<li attr='+file.fileId+'><p>'+file.fileName+'</p><span>'+file.gmt_modified+'</span><em class="emsuccess">完成</em></li>'
                            }
                        }
                    }
                    html += '<div class="indexPerson">'+
                    '<h5>'+data.resultBody.fileMenuList[i].menuName+'</h5>' +
                    '<div class="personTitle">' +
                        '<span>文件名称</span>' +
                        '<span>创建时间</span>' +
                        '<span>状态</span></div>' +
                        '<ul class="personUl">' +li+
                    '</ul>'+p+'</div>'
                }
                $(".zjList").html(html);
            }
        }
    })
}

//项目基本信息
function projectList(){
    $.ajax({
        url:url+"/project/info?token="+urltoken,
        type: "post",
        dataType: "json",
        success: function (data) {
          if(data.resultCode=="200"){
            $(".projects div:eq(0)").text(data.resultBody.projectName);
            $(".projects div:eq(1)").text(data.resultBody.projectCode);
            $(".projects div:eq(2)").text(data.resultBody.projectPackageCode);
            $(".projects div:eq(3)").text(data.resultBody.projectPackageName);
          }
        }
    })
};

//签名提交状态
var timer;        
timer = setInterval(function(){
    statuss();
},30000)


function statuss(){    //签名状态获取执行
    $.ajax({
        url:url+"/stamp/status?token="+urltoken,
        type: "post",
        dataType: "json",
        success: function (data) {
            if(data.resultCode=="200"){
                if(data.resultBody.userStampStatus=="1"){
                    $(".statusshow").val(" ")
                    PersonSign();
                    setTimeout(function(){
                        if($(".personUl li:last-child em").text()=="完成完成"||$(".personUl:last-child li:last-child em").text()=="完成"){
                            $(".tishimsgs").hide();
                            clearInterval(timer);
                        }else{
                            $(".tishimsgs").show();
                        }
                    },2000)
                    
                    $("#more").css({"display":"none"});
                    $(".model_tk").hide();
                    //$(".morenImg").show();
                    //$(".btnsFixed").hide();
                    //$("#svgDiv img").attr("src","");
                    if($(".listshow").val()=="1"){
                        $("#more2").css({"display":"block"}); 
                    }
                  }else{
                   $(".statusshow").val("0")
                    if($(".listshow").val()=="1"){
                        $("#more").css({"display":"block"});
                        $("#more2").hide(); 
                    }
                  }
            }
        }
    })
}



$("#sucai").height($(document.body).height()-240);
$("#sucai").niceScroll({  
    cursorcolor:"#348fe2",  
    cursoropacitymax:1,  
    touchbehavior:false,  
    cursorwidth:"3px",  
    cursorborder:"0",  
    cursorborderradius:"3px"  
}); 




