package hust.edu.cn.workdemo;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by qiuqi on 2018/8/18.
 *   webview操作javascript接口
 */

public class JSObject {
    /*
     * 绑定的object对象
     * */
    private Context context;
    public JSObject(Context context){
        this.context = context;
    }

    /*
     * JS调用android的方法
     * @JavascriptInterface仍然必不可少
     *
     * */
   @JavascriptInterface
    public String  JsCallAndroid(){
        Toast.makeText(context, "JsCallAndroid", Toast.LENGTH_SHORT).show();
        return "JS call Andorid";
    }
}


