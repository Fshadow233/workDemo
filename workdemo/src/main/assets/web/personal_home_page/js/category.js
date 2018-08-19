
function chosenDichan(){
    var checkimg = document.getElementById("dichan");
    if($("#dichanCheckbox").is(':checked') ){
        $("#dichanCheckbox").attr("checked","unchecked");
        checkimg.src="./images/category-dichan.png";
        checkimg.alt="未选";
    } else{
        $("#dichanCheckbox").attr("checked","checked");
        checkimg.src="./images/category-dichan-chosen.png";
        checkimg.alt="选中";
    }
}


function chosenInternet(){
    var checkimg = document.getElementById("internet");
    if($("#internetCheckbox").is(':checked') ){
        $("#internetCheckbox").attr("checked","unchecked");
        checkimg.src="./images/category-internet.png";
        checkimg.alt="未选";
    } else{
        $("#internetCheckbox").attr("checked","checked");
        checkimg.src="./images/category-internet-chosen.png";
        checkimg.alt="选中";
    }
}


function chosenJinRong(){
    var checkimg = document.getElementById("jinrong");
    if($("#jinrongCheckbox").is(':checked') ){
        $("#jinrongCheckbox").attr("checked","unchecked");
        checkimg.src="./images/category-jinrong.png";
        checkimg.alt="未选";
    } else{
        $("#jinrongCheckbox").attr("checked","checked");
        checkimg.src="./images/category-jinrong-chosen.png";
        checkimg.alt="选中";
    }
}

function chosenKuaiXiao(){
    var checkimg = document.getElementById("kuaixiao");
    if($("#kuaixiaoCheckbox").is(':checked') ){
        $("#kuaixiaoCheckbox").attr("checked","unchecked");
        checkimg.src="./images/category-kuaixiao.png";
        checkimg.alt="未选";
    } else{
        $("#kuaixiaoCheckbox").attr("checked","checked");
        checkimg.src="./images/category-kuaixiao-chosen.png";
        checkimg.alt="选中";
    }
}

var requestMsg={
    url : "http://123.59.119.190:8080/user/updatepro",
    callbackMethod : getAllPostResult,
    data : ""
};

function ajaxsetup(){
	//全局的ajax访问，处理ajax清求时session超时 
	$.ajaxSetup({ 
		contentType : "application/x-www-form-urlencoded;charset=utf-8", 
		complete : function(XMLHttpRequest, textStatus) { 
			var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus， 
			if (sessionstatus == "NOTLOGIN") { 
				// 如果超时就处理 ，指定要跳转的页面 
				//window.location.replace("/SmartMedical/login.html"); 
				alert("您未登录或登录已过期，请重新登录！");
				top.window.location.href="/MonitorWeb/login.html";
				//top.window.location.href="/SmartCommunity/SmartProperty/login.html";
			} 
		} 
	});
}

function getData(requestMsg) {

	ajaxsetup();
	
	var url = requestMsg.url;
	var sendMsg = requestMsg.data;
	var callBackName = requestMsg.callbackMethod;
	$.ajax({
		type : "post",
		url : url,
		dataType : "json",
		data: sendMsg,
		success : function(data) {	
			callBackName(data);
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			alert("提交失败："+textStatus);
		}
	});
}


$("#submit").click(function(){
    //$('input:checkbox:checked') 等同于 $('input[type=checkbox]:checked')
    //意思是选择被选中的checkbox
    // $.each($('input:checkbox:checked'),function(){
    //     window.alert("你选了："+
    //         $('input[type=checkbox]:checked').length+"个，其中有："+$(this).val());
    // });
    setIndustry(requestMsg)
});

function setIndustry(requestMsg){
    // alert('haha')
    var postData = {
        "user_id":1,
        "profession_id":""
        // "content":$('#reminder').val(),
        // "type":0,
        // "userid":"1",
        // "date":"2018-1-3",
        // "time":$("#alarm").val(),
        // "other":$('input[name="item"]:checked').val()
    };
    var chosen=""
    if($("#dichanCheckbox").is(':checked') ){
    //    alert( $("#dichanCheckbox").val())
       chosen=chosen+$("#dichanCheckbox").val()+","
    //    alert(chosen)
    }

    if($("#internetCheckbox").is(':checked') ){
        // alert( $("#internetCheckbox").val())
        chosen=chosen+$("#internetCheckbox").val()+","
    }

    if($("#jinrongCheckbox").is(':checked') ){
        // alert( $("#jinrongCheckbox").val())
        chosen=chosen+$("#jinrongCheckbox").val()+","
    }

    if($("#kuaixiaoCheckbox").is(':checked') ){
        // alert( $("#kuaixiaoCheckbox").val())
        chosen=chosen+$("#kuaixiaoCheckbox").val()+","
    }

    chosen=chosen.substring(0, chosen.length - 1);
    postData.profession_id=chosen;
    requestMsg.data=postData;

    getData(requestMsg);

};

function getAllPostResult(id){

    var str=JSON.stringify(id)
    if(str != 0){
        window.location.href="./index.html"
    }else{
        alert('选择失败，请重试！');
    }
    
};
