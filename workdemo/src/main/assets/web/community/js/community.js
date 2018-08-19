
var constantURL="http://123.59.119.190:8080";

//获取所有帖子
var requestAllPostMsg={
    url : constantURL+"/note/getall",
    callbackMethod : getAllPostResult,
    data : ""
};
//根据主题获取帖子
var requestPostByThemeMsg = {
    url : constantURL+"/note/getbythemeid",
    callbackMethod : getPostByThemeResult,
    data : ""
};

$(document).ready(function() {

    getPostData();
    var comefrom="4";
    //从新建帖子部分返回
    if(comefrom=="1"){
        getPostData();
    }
    //从学习->精品面经返回
    if(comefrom=="2"){
        $(".hover").removeClass("hover");
        $("#interview").addClass("hover");


        $("#shequ_exchange").hide();
        $("#shequ_interExperience").show();
        $("#shequ_writtenCommunication").hide();
        $("#shequ_careerDevelopment").hide();
        $("#shequ_commpanyCoummunication").hide();
    }else{

    }
});

//获取所有帖子
function getPostData() {
    $("#shequ_exchange").show();
    $("#shequ_interExperience").show();
    $("#shequ_writtenCommunication").show();
    $("#shequ_careerDevelopment").show();
    $("#shequ_commpanyCoummunication").show();

    var postData={};
    requestAllPostMsg.data=postData;
    getData(requestAllPostMsg);
};

function getAllPostResult(data) {
    /**帖子内容："content":"内容","creattime":"2018-08-11 21:12:21.0","id":1,
     * "theme_id":1,"title":"名称","user_id":1,"username":"呼啦啦火车笛子"**/

    console.log("获取的所有帖子的信息是："+JSON.stringify(data));
    //这里要不要把所有内容都置空呢？
  //  $("#shequ_commpanyCoummunication").empty();  //公司交流
  //  $("#shequ_careerDevelopment").empty();   //职业发展
  //  $("#shequ_exchange").empty();            //面试交流
  //  $("#shequ_interExperience").empty();     //精品面经
  //  $("#shequ_writtenCommunication").empty();  //笔试交流

    //设置所有的帖子，以添加代码的形式，根据theme_id不同，将代码添加到不同的section
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            switch (data[i].theme_id){
                case 1:   //面试交流
                  $("#shequ_exchange").append(
                      "<div  class='block' id='"+data[i].id+'&'+data[i].user_id+'&'+
                      data[i].username+'&'+data[i].theme_id+'&'+data[i].creattime+'&'+
                      data[i].title+'&'+data[i].content+"' onclick='getPostInfos()'>"+
                          "<div class='order_list'>" +
                              "<div class='cart_item prd_ebook'>" +
                                 "<div class='shequ_touxiang'>" +
                                     "<img src='images/1.jpg' class='fl pro_pic'>&nbsp;&nbsp;&nbsp;<span id='posterName' class='fl shequ_author'>"+data[i].username+ "</span>" +

                      "</div>" +
                      "<div class='detail'>" +
                          "<div id='createtime' class='f1 shequ_respone'>"+data[i].creattime+"</div>" +
                          "<div id='postTitle' class='fl shenqu_title'>"+data[i].title+"</div>" +
                          "<p id='postVontent' class='fl shequ_content'>&emsp;&emsp;"+data[i].content.substring(0,50)+"..." +
                      "</p></div></div></div></div>");
                    break;
                case 2:   //精品面经
                    $("#shequ_interExperience").append(
                        "<div  class='block' id='"+data[i].id+'&'+data[i].user_id+'&'+
                        data[i].username+'&'+data[i].theme_id+'&'+data[i].creattime+'&'+
                        data[i].title+'&'+data[i].content + "' onclick='getPostInfos()'>"+
                        "<div class='order_list'>" +
                        "<div class='cart_item prd_ebook'>" +
                        "<div class='shequ_touxiang'>" +
                        "<img src='images/2.jpg' class='fl pro_pic'>&nbsp;&nbsp;&nbsp;<span id='posterName' class='fl shequ_author'>"+data[i].username+ "</span>" +

                        "</div>" +
                        "<div class='detail'>" +
                        "<div id='createtime' class='f1 shequ_respone'>"+data[i].creattime+"</div>" +
                        "<div id='postTitle' class='fl shenqu_title'>"+data[i].title+"</div>" +
                        "<p id='postVontent' class='fl shequ_content'>&emsp;&emsp;"+data[i].content.substring(0,50)+"..." +
                        "</p></div></div></div></div>");
                    break;
                case 3:    //笔试交流
                    $("#shequ_writtenCommunication").append(
                        "<div  class='block' id='"+data[i].id+'&'+data[i].user_id+'&'+
                        data[i].username+'&'+data[i].theme_id+'&'+data[i].creattime+'&'+
                        data[i].title+'&'+data[i].content + "' onclick='getPostInfos()'>" +
                        "<div class='order_list'>" +
                        "<div class='cart_item prd_ebook'>" +
                        "<div class='shequ_touxiang'>" +
                        "<img src='images/3.jpg' class='fl pro_pic'>&nbsp;&nbsp;&nbsp;<span id='posterName' class='fl shequ_author'>"+data[i].username+ "</span>" +

                        "</div>" +
                        "<div class='detail'>" +
                        "<div id='createtime' class='f1 shequ_respone'>"+data[i].creattime+"</div>" +
                        "<div id='postTitle' class='fl shenqu_title'>"+data[i].title+"</div>" +
                        "<p id='postVontent' class='fl shequ_content'>&emsp;&emsp;"+data[i].content.substring(0,50)+"..." +
                        "</p></div></div></div></div>");
                    break;
                case 4:    //职业发展
                    $("#shequ_careerDevelopment").append(
                        "<div  class='block' id='"+data[i].id+'&'+data[i].user_id+'&'+
                        data[i].username+'&'+data[i].theme_id+'&'+data[i].creattime+'&'+
                        data[i].title+'&'+data[i].content + "' onclick='getPostInfos()'>" +
                        "<div class='order_list'>" +
                        "<div class='cart_item prd_ebook'>" +
                        "<div class='shequ_touxiang'>" +
                        "<img src='images/4.jpg' class='fl pro_pic'>&nbsp;&nbsp;&nbsp;<span id='posterName' class='fl shequ_author'>"+data[i].username+ "</span>" +

                        "</div>" +
                        "<div class='detail'>" +
                        "<div id='createtime' class='f1 shequ_respone'>"+data[i].creattime+"</div>" +
                        "<div id='postTitle' class='fl shenqu_title'>"+data[i].title+"</div>" +
                        "<p id='postVontent' class='fl shequ_content'>&emsp;&emsp;"+data[i].content.substring(0,50)+"..." +
                        "</p></div></div></div></div>");
                    break;
                case 5:    //公司交流
                    $("#shequ_commpanyCoummunication").append(
                        "<div class='block' id='"+data[i].id+'&'+data[i].user_id+'&'+
                        data[i].username+'&'+data[i].theme_id+'&'+data[i].creattime+'&'+
                        data[i].title+'&'+data[i].content + "' onclick='getPostInfos()'>" +
                        "<div class='order_list'>" +
                        "<div class='cart_item prd_ebook'>" +
                        "<div class='shequ_touxiang'>" +
                        "<img src='images/b.jpg' class='fl pro_pic'>&nbsp;&nbsp;&nbsp;<span id='posterName' class='fl shequ_author'>"+data[i].username+ "</span>" +

                        "</div>" +
                        "<div class='detail'>" +
                        "<div id='createtime' class='f1 shequ_respone'>"+data[i].creattime+"</div>" +
                        "<div id='postTitle' class='fl shenqu_title'>"+data[i].title+"</div>" +
                        "<p id='postVontent' class='fl shequ_content'>&emsp;&emsp;"+data[i].content.substring(0,50)+"..." +
                        "</p></div></div></div></div>");
                    break;

            }
        }
    }

};

//查看帖子详情
function getPostInfos(){
    var heading=document.getElementsByClassName("block");
    if(heading.length>0){
        for(var i=0;i<heading.length;i++){
            heading[i].onclick=function () {
                var v_id=this.id;
                var postText=v_id.split('&');
                var id=postText[0];
                var user_id=postText[1];
                var username=postText[2];
                var theme_id=postText[3];
                var createtime=postText[4];
                var postTitle=postText[5];
                var postContent=postText[6];

                var postData={
                    "id":id,
                    "user_id":user_id,
                    "username":username,
                    "theme_id":theme_id,
                    "createtime":createtime,
                    "postTitle":postTitle,
                    "postContent":postContent
                };
               //  alert("传递的数据"+JSON.stringify(postData));
                var url="postInfos.html?postData="+JSON.stringify(postData);
                window.location.href=url;

            }
        }
    }

};

function addPost() {
    //这里还要传递user_id,usernaem给addPost.html
    var create_id="";
    var createname="";
    if(create_id==""){

        var url = "addPost.html?create_id="+create_id+"&createname="+createname;
        window.location.href=url;
    }else{
        var url = "addPost.html?create_id="+create_id+"&createname="+createname;
        window.location.href=url;
    }
};

//获取全部帖子
function showall() {
    getPostData();
};

//获取面试交流，theme_id=1
function exchange() {
    getPostByTheme(1);
    $("#shequ_exchange").show();
    $("#shequ_interExperience").hide();
    $("#shequ_writtenCommunication").hide();
    $("#shequ_careerDevelopment").hide();
    $("#shequ_commpanyCoummunication").hide();
    /*
    var postData={
        "theme_id":1
    };
    requestPostByThemeMsg.data=postData;
    getData(requestPostByThemeMsg);
    */
};

//获取精品面经，theme_id=2
function interExperience() {


    getPostByTheme(2);
    $("#shequ_exchange").hide();
    $("#shequ_interExperience").show();
    $("#shequ_writtenCommunication").hide();
    $("#shequ_careerDevelopment").hide();
    $("#shequ_commpanyCoummunication").hide();
    /*
    var postData={
        "theme_id":2
    };
    requestPostByThemeMsg.data=postData;
    getData(requestPostByThemeMsg);
    */
};
//获取笔试交流，theme_id=3
function writtenCommunication() {

    getPostByTheme(3);
    $("#shequ_exchange").hide();
    $("#shequ_interExperience").hide();
    $("#shequ_writtenCommunication").show();
    $("#shequ_careerDevelopment").hide();
    $("#shequ_commpanyCoummunication").hide();
    /*
    var postData={
        "theme_id":3
    };
    requestPostByThemeMsg.data=postData;
    getData(requestPostByThemeMsg);
    */
};

//获取职业发展,theme_id=4
function careerDevelopment() {



    getPostByTheme(4);
    $("#shequ_exchange").hide();
    $("#shequ_interExperience").hide();
    $("#shequ_writtenCommunication").hide();
    $("#shequ_careerDevelopment").show();
    $("#shequ_commpanyCoummunication").hide();
    /*
    var postData={
        "theme_id":4
    };
    requestPostByThemeMsg.data=postData;
    getData(requestPostByThemeMsg);
    */
};

//获取公司交流,theme_id=5
function commpanyCoummunication() {


    getPostByTheme(5);
    $("#shequ_exchange").hide();
    $("#shequ_interExperience").hide();
    $("#shequ_writtenCommunication").hide();
    $("#shequ_careerDevelopment").hide();
    $("#shequ_commpanyCoummunication").show();
    /*
    var postData={
        "theme_id":5
    };
    requestPostByThemeMsg.data=postData;
    getData(requestPostByThemeMsg);
    */
};

function getPostByTheme(themeId) {
    var postData={
        "theme_id":themeId
    };
    requestPostByThemeMsg.data=postData;
    getData(requestPostByThemeMsg);

};

function getPostByThemeResult(data) {

    //设置所有的帖子，以添加代码的形式，根据theme_id不同，将代码添加到不同的section
    if(data.length>0){

        if(data[0].theme_id==1)
        for(var i=0;i<data.length;i++){
            var appendHtml= "<div  class='block' id='"+data[i].id+'&'+data[i].user_id+'&'+
                data[i].username+'&'+data[i].theme_id+'&'+data[i].creattime+'&'+
                data[i].title+'&'+data[i].content +
                "'onclick='getPostInfos()'>" +
                "<div class='order_list'>" +
                "<div class='cart_item prd_ebook'>" +
                "<div class='shequ_touxiang'>" +
                "<img src='images/1.jpg' class='fl pro_pic'>&nbsp;&nbsp;&nbsp;<span id='posterName' class='fl shequ_author'>"+data[i].username+ "</span>" +

                "</div>" +
                "<div class='detail'>" +
                "<div id='createtime' class='f1 shequ_respone'>"+data[i].creattime+"</div>" +
                "<div id='postTitle' class='fl shenqu_title'>"+data[i].title+"</div>" +
                "<p id='postVontent' class='fl shequ_content'>&emsp;&emsp;"+data[i].content.substring(0,50)+"..." +
                "</p></div></div></div></div>";
            switch (data[i].theme_id){
                case 1:
                    $("#shequ_exchange").append(appendHtml);
                    break;
                case 2:
                    $("#shequ_interExperience").append(appendHtml);
                    break;
                case 3:
                    $("#shequ_writtenCommunication").append(appendHtml);
                    break;
                case 4:
                    $("#shequ_careerDevelopment").append(appendHtml);
                    break;
                case 5:
                    $("#shequ_commpanyCoummunication").append(appendHtml);
                    break;
                default:
                    break;
            }
        }
    }

};