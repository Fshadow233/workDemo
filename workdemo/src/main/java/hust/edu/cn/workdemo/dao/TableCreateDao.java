package hust.edu.cn.workdemo.dao;

import android.database.sqlite.SQLiteDatabase;

/**
 * Created by qiuqi on 2018/8/8.
 * 创建本地数据库dao
 */

public class TableCreateDao {
    public void CreateTable(SQLiteDatabase db){

        //创建用户表SQL
        String createUserTableSql="CREATE TABLE IF NOT EXISTS userInfo("+
                "userUUID varchar(100) primary key, userId varchar(10),"+
                "userName varchar(32), password varchar(64),balance varchar(32),"+
                "nickname varchar(32),sex varchar(10),phone varchar(32)," +
                "area varchar(10),pic varchar(64),profession varchar(32)";
        //创建日历表SQL
        String createCalendarInfoSql="CREATE TABLE IF NOT EXISTS calendarInfo("+
                "calendarUUID varchar(100) primary key,calendarId varchar(10)," +
                "userUUID varchar(100), userId varchar(10),"+
                "date datetime,writtenExam varchar(100),recruitment varchar(100)," +
                "netApplication varchar(100),message varchar(100)," +
                "messageInfo varchar(100),addTime datetime";


        db.execSQL(createUserTableSql);
        db.execSQL(createCalendarInfoSql);
    }
}
