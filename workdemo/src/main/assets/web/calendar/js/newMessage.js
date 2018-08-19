$('#res-btn').bind('click',function(){
    var content = $('#reminder').val();
    
    if(!content){
        // alert(content)
        $('#reminder').focus();
        document.querySelector('#reminder').placeholder = '请输入提醒事项';
        return
    }

    newReminder(requestMsg)

})
var day="";
$(document).ready(function(){
	var id=getUrlValue("user_id");
	day=getUrlValue("day");

});


var requestMsg={
    url : "http://123.59.119.190:8080/calendar/newcalendar",
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

function newReminder(requestMsg){
    var postData = {

        "content":$('#reminder').val(),
        "type":0,
        "userid":"1",
        "date":day,
        "time":$("#alarm").val(),
		"other":$('input[name="item"]:checked').val()
	
	};

	alert(JSON.stringify(postData));
    requestMsg.data=postData;
    getData(requestMsg);
};

function getAllPostResult(id){
    var str=JSON.stringify(id)
    if(str != 0){
        window.location.href="./index.html"
    }else{
        alert('增加消息提醒失败，请重试！');
    }
};

