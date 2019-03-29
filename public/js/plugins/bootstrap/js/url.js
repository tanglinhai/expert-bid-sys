var baseUrl="https://test2.365trade.com.cn/";
var url=baseUrl+"stamprest";
var url2=baseUrl+"stamp";
var urltoken;
var t;
function getParam(paramName) {     //获取本页面url带的参数 函数
    paramValue = "", isFound = !1;  
    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {  
        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;  
        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++  
    }  
    return paramValue == "" && (paramValue = null), paramValue  
} 
urltoken = getParam("Token");   //获取url后缀得参数 


$(function(){
    $(".msg_tk img").click(function(){     //无用户信息弹框关闭事件
        window.close();
    });
    
    $("#more").click(function(){    //签名按钮
        $(".model_tk").show();
        ewm();
    });

    $(".btnRefush").click(function(){     //刷新按钮
        $(".ewmsx").hide();
        $("#text").val('');
        $("#qrcode").html('');
        ewm();
    });
    $(document).on('click', '.personUl li', function() {     //个人签字右侧内容事件
        $(".personUl li").removeClass("lionit")
        $(this).addClass("lionit");
        $(".morenImg").hide();
        var iii = $(this).attr("attr");
        //个人右侧内容展示接口
        $(".loading").css({"left":"60%","top":"40%","zIndex":"99999"}).show();
        $.ajax({
            url:url+"/file/view?token="+urltoken,
            type: "post",
            data: {
                "fileId" :iii,
                "currentPage":1
            },
            dataType: "json",
            success: function (data) {
                $(".loading").css({"left":"60%","top":"40%","zIndex":"99999"}).hide();
                if(data.resultCode=="200"){
                    var zong = data.resultBody.filePageCount;
                    var data2 = 'data:image/svg+xml;base64,' + data.resultBody.filePageData
                    $("#svgDiv img").attr("src",data2);
                    $("#svgDiv img").prop("src",data2);
                    $("#svgDiv img").css({"width":"100%"});
                    $(".btnsFixed").show();
                    var zong = data.resultBody.filePageCount;  //总页数
                    pages(iii,zong);
                     //下载当前文件
                     $(".download").click(function () {   
                        window.location.href =url + "/file/download?id="+iii+"&token=" + urltoken;    
                      })
                }else{
                    alert(data.resultMsg)
                }
            }
        })
            
    });

    
    //分页
    //pages(iii,zong)
    function pages(iii,zong){
        $("#callBack2 span").text("1");
        var aaa = zong;    //总页数
		$("#callBack2 em").text(aaa);
        $("#page2").paging({
            total:aaa,  //总页数
            numberPage:1   
        }, function (msg) {//回调
            $(".loading").show();
            $.ajax({
                url:url+"/file/view?token="+urltoken,
                type: "post",
                data: { 
                    "fileId" :iii,
                    "currentPage":msg,
                },
                dataType: "json",
                success: function (data) { 
                    $(".loading").hide();
                    if(data.resultCode=="200"){
                        var data2 = 'data:image/svg+xml;base64,' + data.resultBody.filePageData
                        $("#callBack2 span").text(msg);
                        $("#svgDiv img").attr("src",data2);
                        $("#svgDiv img").prop("src",data2);
                    }
                }
            })
            
        });
    }
})

//二维码接口
function ewm(){
    $.ajax({
        url:url+"/stamp/obtainToken?token="+urltoken,
        type: "post",
        dataType: "json",
        success: function (data) {
           if(data.resultCode=="200"){
            var ewmtoken = data.resultBody;
            var urlewm= url2+"/auto/index.html?token="+ewmtoken;
             $("#text").val(urlewm);
             $(".ewm_lianjie").attr({"href":urlewm});
             $(".ewm_lianjie").prop({"href":urlewm});
             if(data.length!=0){
                 var qrcode = new QRCode(document.getElementById("qrcode"), {
                     width : 270,
                     height : 270
                 });
                 function makeCode () {		
                     var elText = document.getElementById("text");
                     if (!elText.value) {
                         alert("Input a text");
                         elText.focus();
                         return;
                     }
                     qrcode.makeCode(elText.value);
                 }
                 makeCode();
                 t = setTimeout(function(){
                     $(".ewmsx").show();
                 },300000)
             }
           }
        }
    })
};



