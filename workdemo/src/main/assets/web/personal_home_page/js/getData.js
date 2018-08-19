//此方法适用于获得table的数据
function getTableData(urlString, postDataString, tableid, tablebodyid) {

	 $.ajax({ 
	  	type: "post", 
	  	url: urlString, 
	  	dataType: "json", 
	  	data:postDataString,
	  	success: function(data){ 
	  		if(data.success == true){
	 			initTableData(tableid,tablebodyid,data);
	    	}else{ //验证失败 
	    		alert("获取信息失败");
	    	} 
	    }, 
	    error: function(XmlHttpRequest, textStatus, errorThrown) 
	    { 
	    	alert(textStatus); 
	    } 
	}); 
}

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


function getDataWithFileUpload(requestMsg) {

	ajaxsetup();
	
	var url = requestMsg.url;
	var sendMsg = requestMsg.data;
	// var sendMsg=$.toJSON(requestMsg.data);
	var callBackName = requestMsg.callbackMethod;
	$.ajax({
		type : "post",
		url : url,
		processData : false,
		contentType : false,
		dataType : "json",
		data : sendMsg,
		success : function(data) {
			//alert("请求查询:"+sendMsg.pageSize+"   后台返回多少条:"+data.result.length);
			callBackName(data);
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			//alert(textStatus+"  "+errorThrown);
		}
	});

}

function testUpload(requestMsg){
	var url = requestMsg.url;
	var sendMsg = requestMsg.data;
	var callBackName = requestMsg.callbackMethod;
	//alert(sendMsg);
	$(document).ready( 
		function() { 
	        var options = { 
	             url : url,//跳转到相应的Action 
	             type : "POST",//提交方式 
	             dataType : "json",//数据类型 
	             success : function(data) {//调用Action后返回过来的数据 
	            	 callBackName(data);
	             } ,
	             error: function (XmlHttpRequest, textStatus, errorThrown) {  
	           		alert(textStatus);  	
	       	  }
	    }; 
	    $(sendMsg).ajaxSubmit(options);//绑定页面中form表单的id 
	    return false; 
	}); 
}

function getData2(requestMsg) {
    var url = requestMsg.url;
    var sendMsg = requestMsg.data;
    var callBackName = requestMsg.callbackMethod;
    $.ajax({
        async: false,
        url:url,
        type: 'GET',
        dataType: 'jsonp',
        jsonp:callBackName,
        data: sendMsg,
        timeout: 5000,
        success: function (json) { //客户端jquery预先定义好的callback函数，成功获取跨域服务器上的json数据后，会动态执行这个callback函数 
            if (json.actionErrors.length != 0) {
                alert(json.actionErrors);
            }

        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (xhr) {
            alert("请求出错(请检查相关度网络状况.)");
        }
    });
}

function uploadWithFile(requestMsg){
	
	ajaxsetup();
	
	var url = requestMsg.url;
	var sendMsg = requestMsg.data;
	var callBackName = requestMsg.callbackMethod;
	//alert(sendMsg);
	$(document).ready( 
		function() { 
	        var options = { 
	             url : url,//跳转到相应的Action 
	             type : "POST",//提交方式 
	             dataType : "json",//数据类型 
	             success : function(data) {//调用Action后返回过来的数据 
	            	 callBackName(data);
	             } ,
	             error: function (XmlHttpRequest, textStatus, errorThrown) {  
	           		//alert(textStatus);  	
	       	  }
	    }; 
	    $(sendMsg).ajaxSubmit(options);//绑定页面中form表单的id 
	    return false; 
	}); 
}

//通用的初始化select方法
function initSelect(dataArray,selectID){
	//alert(data.length);
	 $(selectID).empty();
	 $(selectID).append(
	        "<option value='" + 0 + "'>" + "---请选择---" + "</option>");
	 for (var i = 0; i < dataArray.length; i++) {
	     $(selectID).append(
	                "<option value='" + dataArray[i][0] + "'>" + dataArray[i][1] + "</option>");
	 }
}

//通用的初始化select方法
function initSelectWithoutDefault(dataArray,selectID){
	//alert(data.length);
	 $(selectID).empty();
	 for (var i = 0; i < dataArray.length; i++) {
	     $(selectID).append(
	                "<option value='" + dataArray[i][0] + "'>" + dataArray[i][1] + "</option>");
	 }
}











