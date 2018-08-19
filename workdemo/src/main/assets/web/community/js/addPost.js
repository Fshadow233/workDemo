var constantURL="http://123.59.119.190:8080";
//新建帖子
var requestAddPostMsg={
    url:constantURL+"/note/new",
    callbackMethod:addPostResult,
    data:""
};
var themeText="";

$(document).ready(function () {
    $(".clearfix a").each(function () {
        $(this).click(function () {
            $(".clearfix .hover").removeClass("hover");
            $(this).addClass("hover");

            alert($(this).text());   //获取被点击的文字
            themeText=$(this).text();
        });
    });
});


function backToCommunity() {
    var url="community.html";
    window.location.href=url;
}

function publishPost() {
    /**
     * postData:theme_id,user_id,title,content,createtime,username
     * 返回帖子id:id
     *
     */
    var themeId;
    switch (themeText){
        case "面试交流":
            themeId=1;
            break;
        case "精品面经":
            themeId=2;
            break;
        case "笔试交流":
            themeId=3;
            break;
        case "职业发展":
            themeId=4;
            break;
        case "公司交流":
            themeId=5;
            break;
        default:
            alert("请选择主题!");
            break;
    }
  //  var create_id=getUrlValue("create_id");
  //  var createname=getUrlValue("createname");
    var create_id=1;      //测试id
    var title=$("#addPostTitle").text();
    var content=$("#addPostContent").text();

    var postData={
        "theme_id":themeId,
        "user_id":create_id,
        "title":title,
        "content":content
    };
    requestAddPostMsg.data=postData;
    getData(requestAddPostMsg);
};

function addPostResult(data) {

    if(JSON.stringify(data)!="0"){
        alert("发布成功");
        //返回community.html
        var url = "community.html";
        window.location.href=url;
    }else{
        alert("发布失败");
    }
};

