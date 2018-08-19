$(document).ready(function() {

    var postData=getUrlJson("postData");
    var json=$.parseJSON(postData);    //将json格式的数据转换为json对象

   // alert(postData);

      var username = json["username"];
      var createtime=json["createtime"];
      var theme_id=json["theme_id"];
      var postContent = json["postContent"];
      var postTitle = json["postTitle"];
    // alert(username+createtime+theme_id+postContent+postTitle);
     switch (theme_id){
         case "1":
             $("#pic").attr("src","images/1.jpg");
             break;
         case "2":
             $("#pic").attr("src","images/2.jpg");
             break;
         case "3":
             $("#pic").attr("src","images/3.jpg");
             break;
         case "4":
             $("#pic").attr("src","images/4.jpg");
             break;
         case "5":
             $("#pic").attr("src","images/b.jpg");
             break;
     }




        $("#postInfosAuthor").text(username);
        $("#postInfosTime").text(createtime);
        $("#postInfosTitle").text(postTitle);
        $("#postInfosContent").text(postContent);


});

function backToCommunity() {
    var url="community.html?comefrom="+3;
    window.location.href=url;
    
}