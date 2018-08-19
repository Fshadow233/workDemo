$(document).ready(function () {


    $(".block").click(function () {
        var url="courseInfos.html";
        window.location.href=url;
    });
});

function backToLearning() {
    var url="learning.html";
    window.location.href=url;
};

function getCourseInfos() {
    var posterName=$("#posterName").text();
    var postTitle=$("#postTitle").text();
    var postContent=$("#postCotent").text();
    var postTime=$("#responeTime").text();
    alert("获取的内容："+posterName+postTitle+postContent+postTime);
    // window.open("postInfos.html");
    var text = "实时监控";
    var url = "postInfos.html?posterName="+posterName+"&postTitle="+postTitle+"&postContent="+postContent+"&postTime="+postTime;
    window.location.href=url;
    //window.open(url);
    //parent.addTab(text, url); //打开新的tab,注意此处要调用父页面的方法


    //  window.location.href("postInfos.html");
    //   top.location.reload();
};