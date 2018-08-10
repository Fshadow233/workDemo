package hust.edu.cn.workdemo.databean;

import java.util.Date;

/**
 * Created by qiuqi on 2018/8/8.
 * 日历信息bean
 */

public class CalendarInfo {

    private String calendarUUID;
    private String calendarId;



    private String userUUID;
    private String userId;

    private Date date;
    private String writtenExam;       //笔试消息
    private String recruitment;       //招聘消息
    private String netApplication;    //网申消息
    private String message;           //消息提醒
    private String messageInfo;       //消息详情
    private Date addTime;             //添加时间

    /**
     * 日历信息构造函数
     * @param calendarUUID
     * @param calendarId
     * @param datetime
     * @param writtenExam
     * @param recruitment
     * @param netApplication
     * @param message
     * @param messageInfo
     * @param addtime
     */
    public CalendarInfo(String calendarUUID,String calendarId,Date date,String writtenExam,String recruitment,
                        String netApplication, String message,String messageInfo,Date addTime){
        this.calendarUUID=calendarUUID;
        this.calendarId=calendarId;
        this.date=date;
        this.writtenExam=writtenExam;
        this.recruitment=recruitment;
        this.netApplication=netApplication;
        this.message=message;
        this.messageInfo=messageInfo;
        this.addTime=addTime;
    }
    public String getCalendarUUID() {
        return calendarUUID;
    }

    public void setCalendarUUID(String calendarUUID) {
        this.calendarUUID = calendarUUID;
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

    public String getCalendarId() {
        return calendarId;
    }

    public void setCalendarId(String calendarId) {
        this.calendarId = calendarId;
    }


    public String getWrittenExam() {
        return writtenExam;
    }

    public void setWrittenExam(String writtenExam) {
        this.writtenExam = writtenExam;
    }

    public String getRecruitment() {
        return recruitment;
    }

    public void setRecruitment(String recruitment) {
        this.recruitment = recruitment;
    }

    public String getNetApplication() {
        return netApplication;
    }

    public void setNetApplication(String netApplication) {
        this.netApplication = netApplication;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessageInfo() {
        return messageInfo;
    }

    public void setMessageInfo(String messageInfo) {
        this.messageInfo = messageInfo;
    }
    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }



}
