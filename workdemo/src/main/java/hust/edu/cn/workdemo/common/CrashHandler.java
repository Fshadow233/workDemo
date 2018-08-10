package hust.edu.cn.workdemo.common;

import android.content.Context;
import android.os.Looper;
import android.util.Log;

import org.json.JSONObject;

/**
 * Created by qiuqi on 2018/8/8.
 */

public class CrashHandler implements Thread.UncaughtExceptionHandler{

    public static final boolean DEBUG=true;

    private Thread.UncaughtExceptionHandler mDefaultHandler;

    private static CrashHandler INSTANCE;

    /** 程序的Context对象**/
    private Context mContext;

    /** 保证只有一个CrashHandler实例 **/
    private CrashHandler(){}

    /**获取CrashHandler实例,单例模式**/
    public static CrashHandler getInstance(){
        if(INSTANCE==null){
            INSTANCE=new CrashHandler();
        }
        return INSTANCE;
    }


    /**
     * 初始化，注册Context对象
     * 获取系统默认的UncaughtException处理器
     * 设置该CrashHandler为程序的默认处理器
     * @param ctx
     */
    public void init(Context ctx){
        mDefaultHandler=Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler(this);
    }

    /**
     * 当UncaughtException发生时会转入该函数来处理 
     * @param thread
     * @param ex
     */
    @Override
    public void uncaughtException(Thread thread, Throwable ex) {
        if(!handleException(ex)&&mDefaultHandler!=null){
            //如果用户没有处理则让系统默认的异常处理器来处理
            mDefaultHandler.uncaughtException(thread,ex);
        }else{
            //如果自己处理了异常，则不会弹出错误对话框，则需要手动退出app
            try{
                Thread.sleep(3000);
            }catch (InterruptedException e){
                throw new RuntimeException(e);
            }
            android.os.Process.killProcess(android.os.Process.myPid());
            System.exit(10);
        }
    }

    /**
     * 自定义错误处理，收集错误信息
     * 发送错误报告等操作均在此完成
     * 自定义异常处理逻辑
     * true代表处理该异常，不再向上抛异常
     * false代表不处理该异常(可以将log信息存储起来交个上层(这里就用到了系统的异常处理)去处理)
     * 简单来说就是true不会弹出错误提示框，false会弹出
     * @param ex
     * @return
     */
    private boolean handleException(final Throwable ex) {
        if(ex==null){
            Log.d("hahahahahahahhahah","exception 是null");
            return false;
        }

        final StackTraceElement[] stack = ex.getStackTrace();
        final String message = ex.getMessage();
        //使用Toast来显示异常信息
        new Thread() {
            public void run() {
                Looper.prepare();
                try {
                    String error="";
                    for (int i = 0; i < stack.length; i++) {
                        error=error+stack[i].toString()+"\n";
                        Log.d("hahahahahahahahahaha",error);
                    }
                    JSONObject paramJson=new JSONObject();
                    paramJson.put("exceptionString",error);
                    paramJson.put("appType", "android");
                    Log.d("hahahahahahahahahaha","error开始上传");

                    JSONObject resultJson =
                            HttpConnect.SendRequest(Constant.URL + "app/appCollectException", paramJson);
                    if (resultJson.equals("OK"))
                    {
                        Log.d("hahahahahahahahaha", "error URL访问成功!");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Looper.loop();
            }
        }.start();
        return false;
    }
}
