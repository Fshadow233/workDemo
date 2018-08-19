

$(document).ready(function() {

    var postData = {};
    // 请求楼栋号 初始化楼栋下拉框
    requestPostMsg.data = postData;
    getData(requestPostMsg);

    // 添加帖子
    $("#registeredSearch_btn").click(function() {
       addPost();
    });



});
//用户注册页面：查询用户是否已注册
function RegisteredElderSearch(){
    //查询条件：房间信息，被监护人电话，身份证号
    var building,unit,room,telephone,idcard;

    if($("#building_select option:selected").val()==0){
        building="";
        unit="";
        room="";
    }else{
        building=$("#building_select option:selected").text();
        if($("#unit_select option:selected").val()==0){
            unit="";
            room="";
        }else{
            unit=$("#unit_select option:selected").text();
            if($("#room_select option:selected").val()==0){
                room="";
            }else{
                room=$("#room_select option:selected").text();
            }
        }
    }
    telephone=$("#telephone_input").val();
    idcard=$("#idcard_input").val();
    alert("查询信息为："+building+"-"+unit+"-"+room+"-"+telephone+"-"+idcard);

    var postData = {
        "building":building,
        "unit":unit,
        "room":room,
        "phone" : telephone,
        "idcard":idcard
    };
    requestCheckRegisteredMsg.data=postData;
    getData(requestCheckRegisteredMsg);
};

//用户注册页面：添加用户信息时，获取房间id结果
function requestAddRoomIdResult(data) {
    if(data.success){
        //设置房间id
        console.log("获取的房间信息："+JSON.stringify(data));
        if(data.result.length>0){
            roomId=data.result[0].id;
            $("#room_id").val(data.result[0].id);
            console.log("roomId:"+roomId);
            //记录添加的摄像头序列号
            addedDeviceSerial=$("#add_deviceSerial").val();

            //检查摄像头序列号是否存在
            // checkSerialExist(addedDeviceSerial);
            submitInfos();

        }else{
            alert("找不到对应的房间Id");
        }
    }else{
        alert("请求信息失败"+data.type);
    }
};


function setPostData() {

};

function getPostResult(data) {
    if(data.success){
        console.log("获取的帖子信息是："+JSON.stringify(data));
        /**
         * 主题，该主题下的帖子id，用户id，用户头像，用户昵称，特殊标签（置顶，精品），帖子标题，帖子摘要，帖子内容
         */
        //设置帖子标题
        //设置帖子主题
        //设置帖子内容
    }else {
        alert("请求信息失败"+data.type);
    }

};

//查看帖子详情
function getPostInfos() {
    /**
     * 输入参数：帖子id
     * 返回参数：帖子标题，用户id，用户头像，用户标签，特殊标签（置顶、精品），发布时间，帖子正文，
     *         回复用户id，回复用户昵称，回复时间，回复内容
     */

}

function addPost() {
    /**
     * 输入参数：行业id，主题id，帖子标题，帖子内容，发布时间，用户id
     * @type {string}
     */
    var user_id="test";
    var userName="";
    var postTitle=$("#addPostTitle").value();
    var postContent=$("#addPostContent").value();
    var bussiness="test";    //行业，应该从id获取
    var theme_id="1";
    var postData= {
        "user_id": user_id,
        "theme_id": theme_id,
        "title": postTitle,
        "content": postContent,
        /**
         * 应该添加的内容
         */
        "userName": userName,
        "bussiness": bussiness
    }
    requestAddPostMsg.data=postData;
    getData(requestAddPostMsg);
};

function addPostResult(data) {
    if(data.success){
        alert("添加帖子后返回的内容:"+data);
    }else{
        alert("请求信息失败"+data.type);
    }
};

function deletePost() {
    var postId="1";  //帖子id,应该从html中获取
    var postData={
        "id":postId
    }
    requestDeletePostMsg.data=postData;
    getData(requestDeletePostMsg);

};

function deletePostResult(data) {
    if(data.success){

    }else{
        alert("请求信息失败"+data.type);
    }
};