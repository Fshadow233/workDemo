package hust.edu.cn.workdemo.dao;

import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;

import java.sql.Date;

import hust.edu.cn.workdemo.common.Constant;
import hust.edu.cn.workdemo.common.DBHelper;
import hust.edu.cn.workdemo.databean.CalendarInfo;
import hust.edu.cn.workdemo.databean.UserInfo;

/**
 * Created by qiuqi on 2018/8/8.
 * 操作本地数据库dao
 */

public class LocalDatabaseDao {
    //数据库帮助类
    DBHelper dbHelper;

    //构造函数
    public LocalDatabaseDao(DBHelper dbHelper){
        this.dbHelper=dbHelper;
    }

    public UserInfo queryLocalUserInfo()throws Exception{
        //数据库连接
        SQLiteDatabase sqlDB=null;

        //返回结果
        UserInfo userInfo=null;
        try {
            //取得数据库连接
            sqlDB=dbHelper.getReadableDatabase();
            String querySql="SELECT* FROM userInfo";
            //querySql运行一个预置的sql语句，返回带游标的数据集(防止sql注入)
            Cursor cursor=sqlDB.rawQuery(querySql,null);
            //当检索结果不为0时
            if (cursor.getCount()!=0){
                userInfo=new UserInfo();
                //移到结果第一行
                if(cursor.moveToFirst()){
                    int index=cursor.getColumnIndex(Constant.COLUMN_NAME_USERUUID);
                    userInfo.setUserUUID(cursor.getString(index));

                    index=cursor.getColumnIndex(Constant.COLUMN_NAME_USERID);
                    userInfo.setUserId(cursor.getString(index));

                    index=cursor.getColumnIndex(Constant.COLUMN_NAME_USERNAME);
                    userInfo.setUserName(cursor.getString(index));

                    index=cursor.getColumnIndex(Constant.COLUMN_NAME_NICKNAME);
                    userInfo.setNickname(cursor.getString(index));
                }

            }
            //关闭结果集
            cursor.close();
        }catch (Exception e){
            e.printStackTrace();
            throw  new RuntimeException(e);
        }finally {
            //关闭数据库连接
            dbHelper.closeDB(sqlDB);
        }
        return userInfo;
    }

    /**
     * 在日历中添加消息提醒
     * @param calendarInfo
     * @throws Exception
     */
    public void insertCalendarInfo(CalendarInfo calendarInfo)throws Exception{
        SQLiteDatabase sqlDB=null;
        try{
            sqlDB = dbHelper.getWritableDatabase();
            String insertSql="INSERT INTO"+
                    "calendarInfo"+
                    "(calendarUUID,calendarId,userUUID,userId,message,messageInfo,addTime)"+
                    "VALUES"+
                    "(?,?,?,?,?,?,?)";

            //登陆用参数
            String[] insertParam=
                    new String[]{
                         calendarInfo.getCalendarUUID(),
                         calendarInfo.getCalendarId(),
                            calendarInfo.getUserUUID(),
                            calendarInfo.getUserId(),
                            calendarInfo.getMessage(),
                            calendarInfo.getMessageInfo(),
                            calendarInfo.getAddTime().toString()
                    };

            sqlDB.execSQL(insertSql,insertParam);
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }finally {
            dbHelper.closeDB(sqlDB);
        }
    }

}
