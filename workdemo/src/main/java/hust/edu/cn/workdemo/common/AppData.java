package hust.edu.cn.workdemo.common;

import android.app.Application;

import hust.edu.cn.workdemo.databean.CalendarInfo;
import hust.edu.cn.workdemo.databean.UserInfo;

/**
 * Created by qiuqi on 2018/8/8.
 * 全局变量
 */

public class AppData extends Application{

    private UserInfo userInfo;
    private CalendarInfo calendarInfo;

    DBHelper dbHelper;

    @Override
    public void onCreate() {
        super.onCreate();


    }
}
