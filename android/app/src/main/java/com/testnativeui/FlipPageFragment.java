package com.testnativeui;

import androidx.fragment.app.Fragment;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.OnGestureListener;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.ReactApplicationContext;

import org.json.JSONArray;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class FlipPageFragment extends Fragment implements OnGestureListener {
    PageFlipView mPageFlipView;
    GestureDetector mGestureDetector;
    List<String> mDataList = new ArrayList<>();
    ReactApplicationContext mReactContext;

    public FlipPageFragment(ReactApplicationContext reactContext){
        mReactContext = reactContext;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup parent, Bundle savedInstanceState) {
        String data = getArguments().getString("data");
        String textColor = getArguments().getString("textColor");
        String backgroundColor = getArguments().getString("backgroundColor");
        int textSize = getArguments().getInt("textSize",17);
        String textFont = getArguments().getString("textFont");
        String textAlign = getArguments().getString("textAlign");
        String textStyle = getArguments().getString("textStyle");
        //hash map for text style
        HashMap<String,String> allTextStyle = new HashMap<>();
        allTextStyle.put("textColor",textColor);
        allTextStyle.put("backgroundColor",backgroundColor);
        allTextStyle.put("textSize",String.valueOf(textSize));
        allTextStyle.put("textFont",textFont);
        allTextStyle.put("textAlign",textAlign);
        allTextStyle.put("textStyle",textStyle);
        //hash map for text style
        JSONArray arrData;
        try {
            arrData = new JSONArray(data);
            for(int i = 0; i < arrData.length(); i++){
                mDataList.add(arrData.getString(i));
            }
        } catch (Exception e){
            Log.d("Error parse json array",e.toString());
        }
        mPageFlipView = new PageFlipView(mReactContext,mDataList,allTextStyle);
        mGestureDetector = new GestureDetector(mReactContext, this);
        return mPageFlipView;
    }

    public void setStyle(String type,String data){
        mPageFlipView.setStyle(type,data);
    }

    public void resetData(String data){
        mDataList.clear();
        JSONArray arrData;
        try {
            arrData = new JSONArray(data);
            for(int i = 0; i < arrData.length(); i++){
                mDataList.add(arrData.getString(i));
            }
        } catch (Exception e){
            Log.d("Error parse json array",e.toString());
        }
        mPageFlipView.resetData(mDataList);
    }

//    @Override
//    public boolean onTouchEvent(MotionEvent event) {
//        if (event.getAction() == MotionEvent.ACTION_UP) {
//            mPageFlipView.onFingerUp(event.getX(), event.getY());
//            return true;
//        }
//
//        return mGestureDetector.onTouchEvent(event);
//    }

    public boolean callTouchEvent(MotionEvent event,boolean canTouch){
        if (event.getAction() == MotionEvent.ACTION_UP && canTouch) {
            mPageFlipView.onFingerUp(event.getX(), event.getY());
            return true;
        }

        return mGestureDetector.onTouchEvent(event);
    }

    @Override
    public boolean onDown(MotionEvent e) {
        mPageFlipView.onFingerDown(e.getX(), e.getY());
        return true;
    }

    @Override
    public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
                           float velocityY) {
        return false;
    }


    @Override
    public void onLongPress(MotionEvent e) {
    }

    @Override
    public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX,
                            float distanceY) {
        mPageFlipView.onFingerMove(e2.getX(), e2.getY());
        return true;
    }

    @Override
    public void onShowPress(MotionEvent e) {
    }

    public boolean onSingleTapUp(MotionEvent e) {
        return false;
    }
}
