package hust.edu.cn.workdemo.common;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * http连接用类
 */
public class HttpConnect {

    /**
     * 发送http请求
     * @param url  请求链接
     * @param param 上传参数
     * @return 返回结果
     */
    public static JSONObject SendRequest(String url, JSONObject param){
        // json字符串
        String jsonString = "";
        // 返回用json对象
        JSONObject resultJsonobj = null;
        // 参数写入流
        BufferedWriter paramWriter = null;
        // 结果读取流
        BufferedReader resultRead = null;
        try {
            // 取得链接对象
            URL accessUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection)accessUrl.openConnection();

            // 设定链接基础信息
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setConnectTimeout(200 * 60);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            // 获取写入流
            paramWriter = new BufferedWriter(
                    new OutputStreamWriter(conn.getOutputStream(),"utf-8"));
            // 把参数写入流中
            paramWriter.write(param.toString());
            paramWriter.flush();
            // 响应成功
            if (200 == conn.getResponseCode()){
                // 取得结果流
                resultRead = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), "utf-8"));
                // 将结果流转换为json字符串
                String line = "";
                while((line = resultRead.readLine()) != null){
                    jsonString +=line;
                    Log.d("hahahahahahahahahahaha", jsonString.toString());
                }
                // 将json字符串转换为json对象
                resultJsonobj =  new JSONObject(jsonString);
                Log.d("hahahahahahahahahahaha",resultJsonobj.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }finally {
            try {
                if (null != paramWriter) {
                    paramWriter.close();
                }
                if(null != resultRead) {
                    resultRead.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
        return resultJsonobj;
    }

    /**
     * 发送http请求
     * @param url  请求链接
     * @param param 上传参数
     * @return 返回结果
     */
    public static JSONArray SendRequestA(String url, JSONObject param){
        // json字符串
        String jsonString = "";
        // 返回用json对象
        JSONArray resultJsonobj = null;
        // 参数写入流
        BufferedWriter paramWriter = null;
        // 结果读取流
        BufferedReader resultRead = null;
        try {
            // 取得链接对象
            URL accessUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection)accessUrl.openConnection();
            // 设定链接基础信息
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setConnectTimeout(300*60);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            // 获取写入流
            paramWriter = new BufferedWriter(
                    new OutputStreamWriter(conn.getOutputStream(),"utf-8"));
            // 把参数写入流中
            paramWriter.write(param.toString());
            paramWriter.flush();
            // 响应成功
            if (200 == conn.getResponseCode()){
                // 取得结果流
                resultRead = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), "utf-8"));
                // 将结果流转换为json字符串
                String line = "";
                while((line = resultRead.readLine()) != null){
                    jsonString +=line;
                    Log.d("hahahahahahahahahahaha",jsonString.toString());
                }
                // 将json字符串转换为json对象
                resultJsonobj =  new JSONArray(jsonString);
             //   Log.d("hahahahahahahahahahaha",resultJsonobj.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }finally {
            try {
                if (null != paramWriter) {
                    paramWriter.close();
                }
                if(null != resultRead) {
                    resultRead.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
        return resultJsonobj;
    }

    /**
     * 发送http请求
     * @param url  请求链接
     * @param param 上传参数
     * @return 返回结果
     */
    public static String SendRequestB(String url, JSONObject param){
        // json字符串
        String jsonString = "";
        // 参数写入流
        BufferedWriter paramWriter = null;
        // 结果读取流
        BufferedReader resultRead = null;
        try {
            // 取得链接对象
            URL accessUrl = new URL(url);
            HttpURLConnection conn = (HttpURLConnection)accessUrl.openConnection();
            // 设定链接基础信息
            conn.setDoInput(true);
            conn.setDoOutput(true);
            conn.setConnectTimeout(30*60);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            // 获取写入流
            paramWriter = new BufferedWriter(
                    new OutputStreamWriter(conn.getOutputStream(),"utf-8"));
            // 把参数写入流中
            paramWriter.write(param.toString());
            paramWriter.flush();
            // 响应成功
            if (200 == conn.getResponseCode()){
                // 取得结果流
                resultRead = new BufferedReader(
                        new InputStreamReader(conn.getInputStream(), "utf-8"));
                // 将结果流转换为json字符串
                String line = "";
                while((line = resultRead.readLine()) != null){
                    jsonString +=line;
                    Log.d("hahahahahahahahahahaha","jsonString.toString()"+jsonString.toString());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }finally {
            try {
                if (null != paramWriter) {
                    paramWriter.close();
                }
                if(null != resultRead) {
                    resultRead.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
        return jsonString;
    }
}
