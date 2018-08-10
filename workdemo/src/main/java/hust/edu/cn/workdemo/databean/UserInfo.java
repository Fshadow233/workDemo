package hust.edu.cn.workdemo.databean;

/**
 * Created by qiuqi on 2018/8/8.
 * 用户信息bean
 */

public class UserInfo {
    private String userUUID;
    private String userId;
    private String userName;
    private String password;
    private String balance;
    private String nickname;
    private String phone;
    private String sex;
    private String area;
    private String pic;
    private String profession;

    /**
     * 用户信息构造函数
     * @param userUUID
     * @param userId
     * @param userName
     * @param password
     * @param balance
     * @param nickname
     * @param phone
     * @param sex
     * @param area
     * @param pic
     * @param profession
     */
    public UserInfo(String userUUID,String userId,String userName,String password,String balance,String nickname,
                    String phone,String sex,String area,String pic,String profession){
        this.userUUID=userUUID;
        this.userId=userId;
        this.userName=userName;
        this.password=password;
        this.balance=balance;
        this.nickname=nickname;
        this.phone=phone;
        this.sex=sex;
        this.area=area;
        this.pic=pic;
        this.profession=profession;

    }

    public UserInfo(){

    }


    public String getUserUUID() {
        return userUUID;
    }

    public void setUserUUID(String userUUID) {
        this.userUUID = userUUID;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }
}
