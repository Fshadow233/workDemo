package hust.edu.cn.workdemo.common;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import hust.edu.cn.workdemo.dao.TableCreateDao;

/**
 * Created by qiuqi on 2018/8/8.
 * 数据库帮助类
 */

public class DBHelper extends SQLiteOpenHelper{

    //数据库名称
    private static final String DB_NAME="work.db3";
    //数据库版本
    private static final int version=1;

    /**
     * 构造函数
     * @param context
     */
    public DBHelper(Context context){
        super(context,DB_NAME,null,version);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        TableCreateDao tableCreateDao = new TableCreateDao();
        tableCreateDao.CreateTable(db);
    }

    /**
     * 数据库结构更新时
     * @param db
     * @param oldVersion
     * @param newVersion
     */
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    /**
     * 关闭数据库连接
     * @param db
     */
    public void closeDB(SQLiteDatabase db){
        //关闭数据库连接
        if (null!=db&&db.isOpen()){
            db.close();
        }
    }

    /**
     * 关闭数据库帮助类
     * @param db
     */
    public void closeHelp(SQLiteDatabase db){
        //关闭数据库连接
        if(null!=db&&db.isOpen()){
            db.close();
        }
        //关闭数据库帮助类
        this.close();
    }

    /**
     * 关闭数据库帮助类
     */
    public void closeHelp(){
        this.close();
    }

    /**
     * 删除数据库
     * @param context
     */
    public void deledatabase(Context context){
        context.deleteDatabase(DB_NAME);
    }


}
