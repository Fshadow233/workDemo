
$(document).ready(function(){
    setbalance(requestMsg)
});

var requestMsg={
    url : "http://123.59.119.190:8080/wallet/getbyid",
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

function setbalance(requestMsg){
    // alert('haha')
    var postData = {
        "user_id":1
        // "content":$('#reminder').val(),
        // "type":0,
        // "userid":"1",
        // "date":"2018-1-3",
        // "time":$("#alarm").val(),
        // "other":$('input[name="item"]:checked').val()

    };
    requestMsg.data=postData;
    getData(requestMsg);
};

function getAllPostResult(id){
    var str=JSON.stringify(id["balance"])
    var obj = $('p')
    obj.text(str)
    
};

