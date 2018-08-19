var times = 60;
function roof(){
    if(times == 0){
        $('.yanzhengma').text('发送验证码('+times+'s)');
        $('.yanzhengma').prop('disabled',false);
        $('.yanzhengma').text('发送验证码');
        times = 10;
        return
    }
    $('.yanzhengma').text('发送验证码('+times+'s)');
    times--;

    setTimeout(roof,1000);
}
$('.yanzhengma').bind('click',function(){
    $(this).prop('disabled',true);
    roof();

});

$('#res-btn').bind('click',function(){
    var mobile = $('.mobile').val();
    var yanzheng = $('.yanzheng').val();
    var mima = $('.mima').val();
    var repeatmima = $('.repeatmima').val();
    if(!mobile){
        $('.mobile').focus();
        document.querySelector('.mobile').placeholder = '请填写手机号码';
        return
    }
    if(!yanzheng){
        $('.yanzheng').focus();
        document.querySelector('.yanzheng').placeholder = '请填写验证码';
        return
    }
    if(!mima){
        $('.mima').focus();
        document.querySelector('.mima').placeholder = '请填写密码';
        return
    }
    if(!repeatmima){
        $('.repeatmima').focus();
        document.querySelector('.repeatmima').placeholder = '请填写重复密码';
        return
    }
    if(repeatmima !== mima){
        $('.repeatmima').focus();
        document.querySelector('.repeatmima').value = '';
        document.querySelector('.repeatmima').placeholder = '两次密码不一致';
        return
    }

    userRegist(requestMsg)
    // $(this).prop('disabled',true);
    // alert('注册成功');
})



var requestMsg={
    url : "http://123.59.119.190:8080/user/regist",
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

function userRegist(requestMsg){
    var postData = {
        "phone":$('#teleNum').val(),
        "password":$('#pwd').val(),
        "profession_id":1
    };
    requestMsg.data=postData;
    getData(requestMsg);
};

function getAllPostResult(id){
    var str=JSON.stringify(id)
    if(str != 0){
        window.location.href="./index.html"
    }else{
        alert('注册失败，请重试！');
    }
};


$('#login').bind('click',function(){
    userLogin(requestMsg)
})

function userLogin(requestMsg){
    var postData = {
        "phone":$('#loginTeleNum').val(),
        "password":$('#loginPwd').val(),
    };
    requestMsg.url="http://123.59.119.190:8080/user/login",
    requestMsg.data=postData;
    requestMsg.callbackMethod=getLoginResult
    getData(requestMsg);
};

function getLoginResult(id){
    var str=JSON.stringify(id)
    if(str != 0){
        window.location.href="./index.html"
    }else{
        alert('登录失败，请重试！');
    }
}