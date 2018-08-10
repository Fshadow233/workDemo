package hust.edu.cn.workdemo.utils;

import android.app.Dialog;
import android.content.Context;
import android.database.Cursor;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;
import hust.edu.cn.workdemo.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
/**
 * 工具类
 * Created by qiuqi on 2018/8/8.
 */

public class Utils {

    /**
     * 显示信息
     * @param context  对应容器
     * @param msg      信息内容
     */
    public static void showMsgBox (Context context, String msg){
        //创建一个Toast提示信息
        Toast toast = Toast.makeText(context
                , msg
                // 设置该Toast提示信息的持续时间
                , Toast.LENGTH_LONG);
        toast.show();
    }

    /**
     * 字符串格式转换  yyyyMMdd -> yyyy-MM-dd
     * @param str
     * @return String
     */
    public static String formatDateStrYmd(String str) {

        SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
        Date date = null;
        String dateStr = null;
        try {
            date = format.parse(str);
            format = new SimpleDateFormat("yyyy-MM-dd");
            dateStr = format.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return dateStr;
    }

    /**
     * 字符串格式转换   yyyy-MM-dd -> yyyyMMdd
     * @param str
     * @return String
     */
    public static String formatStrToStr(String str) {

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;
        String dateStr = null;
        try {
            date = format.parse(str);
            format = new SimpleDateFormat("yyyyMMdd");
            dateStr = format.format(date);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return dateStr;
    }
    /**
     * 日期转字符串 yyyy年MM月dd日
     * @param date
     * @return String
     */
    public static String formatDateStrYmd(Date date) {

        SimpleDateFormat format =  new SimpleDateFormat("yyyy-MM-dd");;
        String dateStr = format.format(date);
        return dateStr;
    }

    /**
     * 日期字符串转换 yyyyMMdd
     * @param date
     * @return  String
     */
    public static String formatDateStrToStr(Date date){
        SimpleDateFormat format =  new SimpleDateFormat("yyyyMMdd");;
        String dateStr=format.format(date);
        return dateStr;
    }

    /**
     * 日期转字符串 yyyy年MM月dd日
     * @param date
     * @return String
     */
    public static String formatDateStrYMD(Date date) {

        SimpleDateFormat format =  new SimpleDateFormat("yyyy年MM月dd日");;
        String dateStr = format.format(date);
        return dateStr;
    }

    /**
     * 日期转字符串 yyyy年MM月dd日
     * @param dateStr
     * @return date
     */
    public static Date formatStrToDateYMD(String dateStr) {

        SimpleDateFormat format =  new SimpleDateFormat("yyyyMMdd");
        Date date = null;
        try {
            date = format.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return date;
    }

    /**
     * 判断字符串是否为空
     * @param s 需要判断的字符串
     * @return 空（false）/ 非空(true)
     */
    public static boolean stringIsNotEmpty(String s){
        if (null == s || s.isEmpty()) {
            return false;
        }
        return true;
    }

    /**
     * 判断网络是否连接
     * @param context 环境变量
     * @return 未连接（false）/ 已连接(true)
     */
    public static boolean isNetworkAvailable(Context context) {

        // 取得连接管理器
        ConnectivityManager cm =
                (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        // 取得连接管理器为null没有网络
        if (cm == null) {
            // 网络未连接
            return false;
        } else {
            // 取得活动的网络连接
            NetworkInfo activeNet = cm.getActiveNetworkInfo();
            // 连接为null没有网络
            if (activeNet == null) {
                // 网络未连接
                return false;
                // 连接不为null,且连接状态为true
            } else if (activeNet.isConnected()) {
                // 网络已连接
                return true;
                // 以外的情况
            } else {
                // 网络未连接
                return false;
            }
        }
    }


    /**
     * JSONArray转换为list
     * @param jsonArray JSON对象
     * @return 转换后的list
     */
    public static List<Map<String, Object>> getListForJSONArray(JSONArray jsonArray) throws JSONException {

        // 初始化返回对象
        List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
        try {
            // 转换结果对象
            Map<String, Object> infoMap;
            // 循环JSON数组
            for(int i=0; i < jsonArray.length(); i++){
                // 取得当前转换JSON对象
                JSONObject subObj = jsonArray.getJSONObject(i);
                // 初始化转换结果对象
                infoMap = new HashMap<String, Object>();
                // 循环当前转换对象
                Iterator<String> iterator = subObj.keys();
                while(iterator.hasNext()){
                    // 取得json对象key做为mapkey
                    String json_key = iterator.next();
                    // 构成转换结果的map
                    infoMap.put(json_key, subObj.get(json_key));
                }
                // 转换结果的map放入返回结果list
                resultList.add(infoMap);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return resultList;
    }

    /**
     * list转化为JSONArray
     * @return  转化后的JSONArray
     * @throws JSONException
     */
    public static JSONArray getJSONArrayForList(List<Map<String,Object>> list) throws JSONException{
        //初始化返回对象
        JSONArray jsonArray=new JSONArray();
        try{
            for(int i=0;i<list.size();i++) {
                Map<String, Object> map = list.get(i);
                JSONObject jsonObject = new JSONObject();
                Set keySet = map.keySet();
                Iterator<String> iterator = keySet.iterator();
                while (iterator.hasNext()) {
                    String map_key=iterator.next();
                    jsonObject.put(map_key, map.get(map_key));
                }
                jsonArray.put(jsonObject);
            }
        }
        catch (JSONException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return jsonArray;
    }

    /**
     * 将map类型对象转换为jsonObject
     * @param map
     * @return  转换后的jsonObject
     * @throws JSONException
     */

    public static JSONObject getJSONObjectForMap(Map<String,String> map) throws JSONException {
        JSONObject jsonObject=new JSONObject();
        try{
            Set keySet=map.keySet();
            Iterator<String> iterator = keySet.iterator();
            while (iterator.hasNext()) {
                String map_key=iterator.next();
                jsonObject.put(map_key, map.get(map_key));
            }
        }catch (JSONException e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return  jsonObject;
    }
    /**
     * Cursor转换为list
     * @param cursor cursor对象
     * @return 转换后的list
     */
    public static List<Map<String, String>> getListForCursor(Cursor cursor) {

        // 结果list
        List<Map<String,String>>  resultList = new ArrayList<Map<String,String>>();
        Map<String,String> record;
        // 循环查询结果生成
        while (cursor.moveToNext()) {
            resultList.add(getMapForCursor(cursor));
        }
        return resultList;
    }

    /**
     * Cursor转换为Map
     * @param cursor cursor对象
     * @return 转换后的Map
     */
    public static Map<String, String> getMapForCursor(Cursor cursor){
        Map<String,String> record = new HashMap<String, String>();
        for(int i = 0; i < cursor.getColumnCount(); i++){
            record.put(cursor.getColumnName(i),cursor.getString(i));
        }
        return record;
    }

    /**
     * 生成UUID
     * @return UUID
     */
    public static String generateUUID() {
        return UUID.randomUUID().toString().toUpperCase();
    }

    /**
     * 格式化日期字符串 datetime
     * @return 日期字符串
     */
    public static String getCurDateString(){
        String result = "";
        try{
            Date dt = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            result =  sdf.format(dt);
        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return result;
    }

    /**
     * 格式化日期字符串  Date
     * @return 日期字符串
     */
    public static String getCurDate(){
        String result = "";
        try{
            Date dt = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
            result =  sdf.format(dt);
        }catch(Exception e){
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return result;
    }

    /**
     * 创建自定义ProgressDialog
     *
     * @param context
     * @return
     */
    public static Dialog createLoadingDialog(Context context) {

        LayoutInflater inflater = LayoutInflater.from(context);
        View v = inflater.inflate(R.layout.layout_loading_dialog, null); // 得到加载view
        LinearLayout layout = (LinearLayout) v.findViewById(R.id.dialog_view); // 加载布局
        Dialog loadingDialog = new Dialog(context, R.style.loading_dialog); // 创建自定义样式dialog
        loadingDialog.setCancelable(false); // 不可以用"返回键"取消
        loadingDialog.setContentView(layout, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT));
        return loadingDialog;
    }

    public static boolean isConnected(Context context) {
        ConnectivityManager conn = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = conn.getActiveNetworkInfo();
        return (info != null && info.isConnected());
    }
}
