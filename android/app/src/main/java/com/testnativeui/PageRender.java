/*
 * Copyright (C) 2016 eschao <esc.chao@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.testnativeui;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Typeface;
import android.os.Handler;
import android.util.Log;

import com.eschao.android.widget.pageflip.OnPageFlipListener;
import com.eschao.android.widget.pageflip.PageFlip;
import com.facebook.react.bridge.ReactApplicationContext;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.List;

/**
 * Abstract Page Render
 *
 * @author eschao
 */

public abstract class PageRender implements OnPageFlipListener {

    public final static int MSG_ENDED_DRAWING_FRAME = 1;
    private final static String TAG = "PageRender";

    final static int DRAW_MOVING_FRAME = 0;
    final static int DRAW_ANIMATING_FRAME = 1;
    final static int DRAW_FULL_PAGE = 2;


    int mPageNo;
    int mDrawCommand;
    Bitmap mBitmap;
    Canvas mCanvas;
    Bitmap mBackgroundBitmap;
    ReactApplicationContext mContext;
    Handler mHandler;
    PageFlip mPageFlip;
    int MAX_PAGES;
    List<String> mListText;
    HashMap<String,String> mTextStyle;
    HashMap<String, Typeface> mListTypeface = new HashMap<>();

    public PageRender(ReactApplicationContext context, PageFlip pageFlip,
                      Handler handler, int pageNo, List<String> listText, HashMap<String,String> textStyle) {
        mContext = context;
        mPageFlip = pageFlip;
        mPageNo = pageNo;
        mDrawCommand = DRAW_FULL_PAGE;
        mCanvas = new Canvas();
        mPageFlip.setListener(this);
        mHandler = handler;
        MAX_PAGES = listText.size();
        mListText=listText;
        mTextStyle=textStyle;
        mListTypeface.put("monospace", Typeface.MONOSPACE);
        mListTypeface.put("sans-serif", Typeface.SANS_SERIF);
        mListTypeface.put("serif", Typeface.SERIF);
        mListTypeface.put("default", Typeface.DEFAULT);
    }

    /**
     * Get page number
     *
     * @return page number
     */
    public int getPageNo() {
        return mPageNo;
    }

    /**
     * Release resources
     */
    public void release() {
        if (mBitmap != null) {
            mBitmap.recycle();
            mBitmap = null;
        }

        mPageFlip.setListener(null);
        mCanvas = null;
        mBackgroundBitmap = null;
    }

    /**
     * Handle finger moving event
     *
     * @param x x coordinate of finger moving
     * @param y y coordinate of finger moving
     * @return true if event is handled
     */
    public boolean onFingerMove(float x, float y) {
        mDrawCommand = DRAW_MOVING_FRAME;
        return true;
    }

    /**
     * Handle finger up event
     *
     * @param x x coordinate of finger up
     * @param y y coordinate of inger up
     * @return true if event is handled
     */
    public boolean onFingerUp(float x, float y) {
        if (mPageFlip.animating()) {
            mDrawCommand = DRAW_ANIMATING_FRAME;
            return true;
        }

        return false;
    }

    /**
     * Calculate font size by given SP unit
     */
    protected float calcFontSize(int size) {
        return (float) (size * mContext.getResources().getDisplayMetrics()
                                    .scaledDensity);
    }

    protected float calcScale() {
        return (float)(mContext.getResources().getDisplayMetrics()
                                    .scaledDensity);
    }

    /**
     * Render page frame
     */
    abstract void onDrawFrame();

    /**
     * Handle surface changing event
     *
     * @param width surface width
     * @param height surface height
     */
    abstract void onSurfaceChanged(int width, int height);

    /**
     * Handle drawing ended event
     *
     * @param what draw command
     * @return true if render is needed
     */
    abstract boolean onEndedDrawing(int what);

    public abstract void setStyle(String type, String data);

    public abstract void resetData(List<String> mListText);
}
