package hust.edu.cn.workdemo.activity;
/**
 * 社区activity
 */

import android.content.Context;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AlertDialog;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import hust.edu.cn.workdemo.JSObject;
import hust.edu.cn.workdemo.R;
import hust.edu.cn.workdemo.adapter.CommunityListAdapter;
import hust.edu.cn.workdemo.common.AppData;
import hust.edu.cn.workdemo.common.Constant;
import hust.edu.cn.workdemo.common.DBHelper;
import hust.edu.cn.workdemo.dao.LocalDatabaseDao;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class CommunityActivity extends AppCompatActivity {
    //Object对象，用来跟JS网页绑定
    private JSObject jsobject;
    //全局变量
    private static AppData appData;
    //社区fragment
    private Fragment communityFragment;
    //学习fragment
    private Fragment learningFragment;
    //问答fragment
    private Fragment interlocutionFragment;
    //日历fragment
    private Fragment calendarFragment;
    //我的fragment
    private Fragment mineFragment;

    private DBHelper dbHelper;
    private static LocalDatabaseDao localDatabaseDao;

    private ImageView iv_bottom_community;
    private ImageView iv_bottom_interlocution;
    private ImageView iv_bottom_learning;
    private ImageView iv_bottom_calendar;
    private ImageView iv_bottom_mine;

    private LinearLayout LL_community;
    private LinearLayout LL_learning;
    private LinearLayout LL_interlocution;
    private LinearLayout LL_calendar;
    private LinearLayout LL_mine;

    private RelativeLayout RL_topmenu_community;
    private RelativeLayout RL_topmenu_learning;
    private RelativeLayout RL_topmenu_interlocution;
    private RelativeLayout RL_topmenu_calendar;
    private RelativeLayout RL_topmenu_mine;

    private static int fragmentIndex;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_community);
        init();
    }

    private void init(){
        //应该是要通过http访问获得全局变量

        //取得数据库实例
        dbHelper=new DBHelper(this);

        //取得顶部菜单
        RL_topmenu_community=(RelativeLayout)findViewById(R.id.communityTopMenu);
        RL_topmenu_learning=(RelativeLayout)findViewById(R.id.learningTopMenu);
        RL_topmenu_interlocution=(RelativeLayout)findViewById(R.id.interlocutionTopMenu);
        RL_topmenu_calendar=(RelativeLayout)findViewById(R.id.calendarTopMenu);

        //取得底部菜单对象
        //图标对象
        iv_bottom_community=(ImageView)findViewById(R.id.iv_bottom_community);
        iv_bottom_interlocution=(ImageView)findViewById(R.id.iv_bottom_interlocution);
        iv_bottom_learning=(ImageView)findViewById(R.id.iv_bottom_leaning);
        iv_bottom_calendar=(ImageView)findViewById(R.id.iv_bottom_calendar);
        iv_bottom_mine=(ImageView)findViewById(R.id.iv_bottom_mine);
        //布局对象
        LL_community=(LinearLayout)findViewById(R.id.LL_community);
        LL_interlocution=(LinearLayout)findViewById(R.id.LL_interlocution);
        LL_learning=(LinearLayout)findViewById(R.id.LL_learning);
        LL_calendar=(LinearLayout)findViewById(R.id.LL_calendar);
        LL_mine=(LinearLayout)findViewById(R.id.LL_mine);
        //绑定底部菜单单击事件
        iv_bottom_community.setOnClickListener(new CommunityClickListener());
        iv_bottom_learning.setOnClickListener(new LearningClickListener());
        iv_bottom_interlocution.setOnClickListener(new InterlocutionClickListener());
        iv_bottom_calendar.setOnClickListener(new CalendarClickListener());
        iv_bottom_mine.setOnClickListener(new MineClickListener());
        try{
            initFragment(2);
            fragmentIndex=2;
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException();
        }
    };

    //初始化fragment
    private void initFragment(int index){
        FragmentManager fragmentManager=getSupportFragmentManager();
        FragmentTransaction transaction=fragmentManager.beginTransaction();
        //隐藏所有的fragment
        hideFragment(transaction);
        //文字颜色变更
        //图片颜色变更
        iv_bottom_calendar.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04023));
        iv_bottom_community.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04025));
        iv_bottom_learning.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04026));
        iv_bottom_interlocution.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04027));
        iv_bottom_mine.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04029));

        //判断fragment是否显示
        switch (index){
            //日历
            case 0:
                         /*
                RL_topmenu_community.setVisibility(View.GONE);
                RL_topmenu_learning.setVisibility(View.GONE);
                RL_topmenu_interlocution.setVisibility(View.GONE);
                RL_topmenu_calendar.setVisibility(View.VISIBLE);
                */
                iv_bottom_community.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04025));
                iv_bottom_learning.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04026));
                iv_bottom_interlocution.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04027));
                iv_bottom_calendar.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04023));
                iv_bottom_mine.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04029));
                if(calendarFragment==null){
                    calendarFragment=new CalendarPage();
                    transaction.add(R.id.FL_fragment,calendarFragment);
                }else{
                    transaction.show(calendarFragment);
                }
                break;

            //社区
            case 1:
                /**
                 * 显示community的view，隐藏其它fragment的view

                 RL_topmenu_community.setVisibility(View.VISIBLE);
                 RL_topmenu_learning.setVisibility(View.GONE);
                 RL_topmenu_interlocution.setVisibility(View.GONE);
                 RL_topmenu_calendar.setVisibility(View.GONE);
                 */

                iv_bottom_community.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04020));
                iv_bottom_learning.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04026));
                iv_bottom_interlocution.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04027));
                iv_bottom_calendar.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04028));
                iv_bottom_mine.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04029));

                if(communityFragment==null){
                    communityFragment=new CommunityPage();
                    transaction.add(R.id.FL_fragment,communityFragment);
                }else{
                    transaction.show(communityFragment);
                }
                break;


            //学习
            case 2:
                        /*
                RL_topmenu_community.setVisibility(View.GONE);
                RL_topmenu_learning.setVisibility(View.VISIBLE);
                RL_topmenu_interlocution.setVisibility(View.GONE);
                RL_topmenu_calendar.setVisibility(View.GONE);
                */

                iv_bottom_community.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04025));
                iv_bottom_learning.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04021));
                iv_bottom_interlocution.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04027));
                iv_bottom_calendar.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04028));
                iv_bottom_mine.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04029));
                if(learningFragment==null){
                    learningFragment=new LearningPage();
                    transaction.add(R.id.FL_fragment,learningFragment);
                }else{
                    transaction.show(learningFragment);
                }
                break;


            //问答
            case 3:
                        /*
                RL_topmenu_community.setVisibility(View.GONE);
                RL_topmenu_learning.setVisibility(View.GONE);
                RL_topmenu_interlocution.setVisibility(View.VISIBLE);
                RL_topmenu_calendar.setVisibility(View.GONE);
                */
                iv_bottom_community.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04025));
                iv_bottom_learning.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04026));
                iv_bottom_interlocution.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04022));
                iv_bottom_calendar.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04028));
                iv_bottom_mine.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04029));
                if(interlocutionFragment==null){
                    interlocutionFragment=new InterlocutionPage();
                    transaction.add(R.id.FL_fragment,interlocutionFragment);
                }else{
                    transaction.show(interlocutionFragment);
                }
                break;

            //我的
            case 4:
                iv_bottom_community.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04025));
                iv_bottom_learning.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04026));
                iv_bottom_interlocution.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04027));
                iv_bottom_calendar.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04028));
                iv_bottom_mine.setImageDrawable(getResources().getDrawable(R.drawable.bottom_menu_04024));
                if(mineFragment==null){
                    mineFragment=new MinePage();
                    transaction.add(R.id.FL_fragment,mineFragment);
                }else{
                    transaction.show(mineFragment);
                }
                break;
            default:
                break;
        }
        //提交事务
        transaction.commit();
    }
    //日历监听类
    class CalendarClickListener implements View.OnClickListener{

        @Override
        public void onClick(View v) {
            initFragment(0);
            fragmentIndex=0;

        }
    }
    //社区监听类
    class CommunityClickListener implements View.OnClickListener{
        @Override
        public void onClick(View v) {
            initFragment(1);
            fragmentIndex=1;
        }
    }
    //学习监听类
    class LearningClickListener implements View.OnClickListener{

        @Override
        public void onClick(View v) {
            initFragment(2);
            fragmentIndex=2;

        }
    }
    //问答监听类
    class InterlocutionClickListener implements View.OnClickListener{

        @Override
        public void onClick(View v) {
            initFragment(3);
            fragmentIndex=3;

        }
    }

    //我的监听类
    class MineClickListener implements View.OnClickListener{
        @Override
        public void onClick(View v) {
            initFragment(4);
            fragmentIndex=4;

        }
    }

    private void hideFragment(FragmentTransaction transaction){
        if(communityFragment!=null){
            transaction.hide(communityFragment);
        }
        if(learningFragment!=null){
            transaction.hide(learningFragment);
        }
        if(interlocutionFragment!=null){
            transaction.hide(interlocutionFragment);
        }
        if(calendarFragment!=null){
            transaction.hide(calendarFragment);
        }
        if(mineFragment!=null){
            transaction.hide(mineFragment);
        }
    }
    //日历fragment
    public static class CalendarPage extends Fragment{
        private WebView wv_calendarPage;

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 @Nullable Bundle savedInstanceState) {
            View CalendarPageView=inflater.inflate(R.layout.webview_calendar,container,false);
            wv_calendarPage=(WebView)CalendarPageView.findViewById(R.id.wv_calendar);
            //支持javascript
            wv_calendarPage.getSettings().setJavaScriptEnabled(true);

            //设置可以支持缩放
            wv_calendarPage.getSettings().setSupportZoom(true);
            //设置出现缩放工具
            //wv_calendarPage.getSettings().setBuiltInZoomControls(true);
            //扩大缩放比例
            wv_calendarPage.getSettings().setUseWideViewPort(true);

            //自适应屏幕
            wv_calendarPage.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
            wv_calendarPage.getSettings().setLoadWithOverviewMode(true);

            //设置calendarPage
            setCalendarPageWebView();

            return CalendarPageView;
        }
        private void setCalendarPageWebView(){
            String Url= Constant.URL+"";
            String UrlTest="file:///android_asset/web/calendar/index.html";
            wv_calendarPage.loadUrl(UrlTest);
            WebSettings settings = wv_calendarPage.getSettings();
            settings.setJavaScriptEnabled(true);
            wv_calendarPage.setWebViewClient(new WebViewClient(){
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    //返回值是true的时候控制WebView打开，为false调用系统浏览器或第三方浏览器
                    view.loadUrl(url);
                    return true;
                }
            });
        }
    }
    //社区fragment
    public static class CommunityPage extends Fragment{
        //private CommunityListAdapter communityListAdapter;
        //private List<CommunityListAdapter> communityList=new ArrayList<CommunityListAdapter>();

        private WebView wv_communityPage;


        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, @Nullable Bundle savedInstanceState) {

            View CommunityPageView=inflater.inflate(R.layout.webview_community,container,false);
            wv_communityPage=(WebView)CommunityPageView.findViewById(R.id.wv_community);

            //支持javascript
            wv_communityPage.getSettings().setJavaScriptEnabled(true);

            //设置可以支持缩放
            wv_communityPage.getSettings().setSupportZoom(true);
            //设置出现缩放工具
            wv_communityPage.getSettings().setBuiltInZoomControls(true);
            //扩大缩放比例
            wv_communityPage.getSettings().setUseWideViewPort(true);

            //自适应屏幕
            wv_communityPage.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
            wv_communityPage.getSettings().setLoadWithOverviewMode(true);

            //设置learningPage
            setCommunityPageWebView();
            return CommunityPageView;
        }

        private void setCommunityPageWebView(){
            String Url= Constant.URL+"";
            String UrlTest="file:///android_asset/web/community/community.html";
            wv_communityPage.loadUrl(UrlTest);
            WebSettings settings = wv_communityPage.getSettings();
            settings.setJavaScriptEnabled(true);

            wv_communityPage.setWebViewClient(new WebViewClient(){
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    //返回值是true的时候控制WebView打开，为false调用系统浏览器或第三方浏览器
                    view.loadUrl(url);
                    return true;
                }
            });
        }
    }
    //问答fragment
    public static class InterlocutionPage extends Fragment{
        private WebView wv_interlocutionPage;

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, @Nullable Bundle savedInstanceState) {

            View InterlocutionPageView=inflater.inflate(R.layout.webview_interlocution,container,false);
            wv_interlocutionPage=(WebView)InterlocutionPageView.findViewById(R.id.wv_interlocution);
            //支持javascript
            wv_interlocutionPage.getSettings().setJavaScriptEnabled(true);

            //设置可以支持缩放
            wv_interlocutionPage.getSettings().setSupportZoom(true);
            //设置出现缩放工具
            //wv_interlocutionPage.getSettings().setBuiltInZoomControls(true);
            //扩大缩放比例
            wv_interlocutionPage.getSettings().setUseWideViewPort(true);

            //自适应屏幕
            wv_interlocutionPage.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
            wv_interlocutionPage.getSettings().setLoadWithOverviewMode(true);

            //设置interlocutionPage
            setInterlocutionPageWebView();
            return InterlocutionPageView;
        }

        private void setInterlocutionPageWebView(){
            String Url= Constant.URL+"";
            String UrlTest="file:///android_asset/web/interlocution/interlocution.html";
            wv_interlocutionPage.loadUrl(UrlTest);
            WebSettings settings = wv_interlocutionPage.getSettings();
            settings.setJavaScriptEnabled(true);

            wv_interlocutionPage.setWebViewClient(new WebViewClient(){
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    //返回值是true的时候控制WebView打开，为false调用系统浏览器或第三方浏览器
                    view.loadUrl(url);
                    return true;
                }
            });
        }
    }
    //学习fragment
    public static class LearningPage extends Fragment{
        private WebView wv_learningPage;

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container, @Nullable Bundle savedInstanceState) {

            View LearningPageView=inflater.inflate(R.layout.webview_learning,container,false);
            wv_learningPage=(WebView)LearningPageView.findViewById(R.id.wv_learning);
            //支持javascript
            wv_learningPage.getSettings().setJavaScriptEnabled(true);

            //设置可以支持缩放
            wv_learningPage.getSettings().setSupportZoom(true);
            //设置出现缩放工具
            //wv_learningPage.getSettings().setBuiltInZoomControls(true);
            //扩大缩放比例
            wv_learningPage.getSettings().setUseWideViewPort(true);

            //自适应屏幕
            wv_learningPage.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
            wv_learningPage.getSettings().setLoadWithOverviewMode(true);

            //设置learningPage
            setLearningPageWebView();
            return LearningPageView;
        }
        private void setLearningPageWebView(){
            String Url= Constant.URL+"";
            String UrlTest="file:///android_asset/web/learning/learning.html";
            wv_learningPage.loadUrl(UrlTest);
            WebSettings settings = wv_learningPage.getSettings();
            settings.setJavaScriptEnabled(true);
            //wv_learningPage.setWebChromeClient(new WebChromeClient());

            wv_learningPage.setWebViewClient(new WebViewClient(){
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    //返回值是true的时候控制WebView打开，为false调用系统浏览器或第三方浏览器
                    view.loadUrl(url);
                    return true;
                }
            });

        }
    }

    //我的fragment
    public static class MinePage extends Fragment{
        private WebView wv_minePage;

        @Override
        public View onCreateView(LayoutInflater inflater,ViewGroup container, Bundle savedInstanceState) {
            View MinePageView=inflater.inflate(R.layout.webview_mine,container,false);

            wv_minePage=(WebView)MinePageView.findViewById(R.id.wv_mine);
            //支持javascript
            wv_minePage.getSettings().setJavaScriptEnabled(true);

            //设置可以支持缩放
            wv_minePage.getSettings().setSupportZoom(true);
            //设置出现缩放工具
           // wv_minePage.getSettings().setBuiltInZoomControls(true);
            //扩大缩放比例
            wv_minePage.getSettings().setUseWideViewPort(true);

            //自适应屏幕
            wv_minePage.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
            wv_minePage.getSettings().setLoadWithOverviewMode(true);

            //设置minePage
            setMinePageWebView();

            return MinePageView;
        }

        //加载webview
        private void setMinePageWebView(){
            String Url= Constant.URL+"";
            String UrlTest="file:///android_asset/web/personal_home_page/login.html";
            wv_minePage.loadUrl(UrlTest);
            WebSettings settings = wv_minePage.getSettings();
            settings.setJavaScriptEnabled(true);
            wv_minePage.setWebViewClient(new WebViewClient(){
                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    //返回值是true的时候控制WebView打开，为false调用系统浏览器或第三方浏览器
                    view.loadUrl(url);
                    return true;
                }
            });

        }
    }

}
