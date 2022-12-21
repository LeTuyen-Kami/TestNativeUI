// replace with your package
package com.testnativeui;

import android.os.Bundle;
import android.util.Log;
import android.view.Choreographer;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

public class MyViewManager extends ViewGroupManager<FrameLayout>{

    public static final String REACT_CLASS = "FlipView3D";
    public final int COMMAND_CREATE = 1;
    private int propWidth;
    private int propHeight;
    private Bundle bundleData = new Bundle();
    private boolean isFirst = true;
    private FlipPageFragment myFragment;
    private String fragmentTag;
    private boolean canTouch = true;
    ReactApplicationContext reactContext;

    public MyViewManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }



    @Override
    public String getName() {
        return REACT_CLASS;
    }

    /**
     * Return a FrameLayout which will later hold the Fragment
     */
    @Override
    public FrameLayout createViewInstance(ThemedReactContext reactContext) {
        return new FrameLayout(reactContext);
    }

    /**
     * Map the "create" command to an integer
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("create", COMMAND_CREATE);
    }

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    @Override
    public void receiveCommand(
            @NonNull FrameLayout root,
            String commandId,
            @Nullable ReadableArray args
    ) {
        super.receiveCommand(root, commandId, args);
        int reactNativeViewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);

        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId);
                break;
            default: {}
        }
    }

    @ReactProp(name="data")
    public void setData(FrameLayout view, String data){
        bundleData.putString("data",data);
        if (!isFirst){
            myFragment.resetData(data);
        }
    }

    @ReactProp(name="canTouchAble",defaultBoolean = true)
    public void setCanTouchAble(FrameLayout view, boolean canTouchAble){
        canTouch = canTouchAble;
    }

    @ReactProp(name="textColor")
    public void setTextColor(FrameLayout view,@Nullable String textColor){
        if (textColor != null) {
            //check if the color is a hex color
            if (textColor.length() == 7) {
                bundleData.putString("textColor", textColor);
                if (!isFirst){
                    myFragment.setStyle("textColor",textColor);
                }
            } else {
                textColor = "#000000";
                bundleData.putString("textColor", textColor);
            }

        } else {
            bundleData.putString("textColor", "#000000");
        }

    }

    @ReactProp(name="textSize",defaultInt = 17)
    public void setTextSize(FrameLayout view,@Nullable int textSize){
        bundleData.putInt("textSize",textSize);
        if (!isFirst){
            myFragment.setStyle("textSize",String.valueOf(textSize));
        }
    }

    @ReactProp(name="textAlign")
    public void setTextAlign(FrameLayout view,@Nullable String textAlign){
        if (textAlign != null && (textAlign.equals("left") || textAlign.equals("justify"))) {
            bundleData.putString("textAlign", textAlign);
            if (!isFirst){
                myFragment.setStyle("textAlign",textAlign);
            }
        } else {
            bundleData.putString("textAlign", "left");
        }
    }

    public boolean checkTextFont(String value){
        if (value.equals("sans-serif") || value.equals("serif") || value.equals("monospace") || value.equals("default")){
            return true;
        } else {
            return false;
        }
    }

    @ReactProp(name="textFont")
    public void setTextFont(FrameLayout view,@Nullable String textFont){
        if (textFont != null && checkTextFont(textFont)) {
            bundleData.putString("textFont", textFont);
            if (!isFirst){
                myFragment.setStyle("textFont",textFont);
            }
        } else {
            bundleData.putString("textFont", "sans-serif");
        }
    }

    @ReactProp(name="textStyle")
    public void setTextStyle(FrameLayout view,@Nullable String textStyle){
        int textStyleInt = 0;
        if (textStyle != null) {
            if (textStyle.equals("normal")) {
                textStyleInt = 0;
            } else if (textStyle.equals("bold")) {
                textStyleInt = 1;
            } else if (textStyle.equals("italic")) {
                textStyleInt = 2;
            } else if (textStyle.equals("bold_italic")) {
                textStyleInt = 3;
            }
        }

        bundleData.putString("textStyle", String.valueOf(textStyleInt));
        if (!isFirst){
            myFragment.setStyle("textStyle",String.valueOf(textStyleInt));

        }
    }


    @ReactProp(name="backgroundColor")
    public void setBackgroundColor(FrameLayout view,@Nullable String backgroundColor){
        if (backgroundColor != null) {
            if (backgroundColor.length() == 7) {
                bundleData.putString("backgroundColor", backgroundColor);
                if (!isFirst){
                    myFragment.setStyle("backgroundColor",backgroundColor);
                }
            } else {
                backgroundColor = "#f0f0f0";
                bundleData.putString("backgroundColor", backgroundColor);
            }

        } else {
            bundleData.putString("backgroundColor", "#ffffff");
        }
    }

    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(FrameLayout view, int index, Integer value) {
        if (index == 0) {
            propWidth = value;
        }

        if (index == 1) {
            propHeight = value;
        }
    }


    /**
     * Replace your React Native view with a custom fragment
     */

    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);
        myFragment = new FlipPageFragment(reactContext);
        myFragment.setArguments(bundleData);
        FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
        parentView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                return myFragment.callTouchEvent(motionEvent ,canTouch);
            }
        });
        fragmentTag = String.valueOf(reactNativeViewId);
        isFirst = false;
        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, myFragment, String.valueOf(reactNativeViewId))
                .commit();
    }

    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    /**
     * Layout all children properly
     */
    public void manuallyLayoutChildren(View view) {
        // propWidth and propHeight coming from react-native props
        int width = propWidth;
        int height = propHeight;

        view.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

        view.layout(0, 0, width, height);
    }
}