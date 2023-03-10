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

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.Typeface;
import android.opengl.GLSurfaceView;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.Log;
import android.widget.GridLayout;

import androidx.annotation.RequiresApi;
import androidx.core.content.res.ResourcesCompat;

import com.eschao.android.widget.pageflip.Page;
import com.eschao.android.widget.pageflip.PageFlip;
import com.eschao.android.widget.pageflip.PageFlipState;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.List;

/**
 * Single page render
 * <p>
 * Every page need 2 texture in single page mode:
 * <ul>
 *     <li>First texture: current page content</li>
 *     <li>Back texture: back of front content, it is same with first texture
 *     </li>
 *     <li>Second texture: next page content</li>
 * </ul>
 * </p>
 *
 * @author eschao
 */

public class SinglePageRender extends PageRender {

    /**
     * Constructor
     */
    public SinglePageRender(ReactApplicationContext context, PageFlip pageFlip,
                            Handler handler, int pageNo, List<String> ListText, HashMap<String,String> textStyle) {
        super(context, pageFlip, handler, pageNo,ListText,textStyle);
    }

    /**
     * Draw frame
     */
    private boolean reDrawSecondFage = true;
    @RequiresApi(api = Build.VERSION_CODES.Q)
    public void onDrawFrame() {
        // 1. delete unused textures
        mPageFlip.deleteUnusedTextures();
        Page page = mPageFlip.getFirstPage();

        // 2. handle drawing command triggered from finger moving and animating
        if (mDrawCommand == DRAW_MOVING_FRAME ||
            mDrawCommand == DRAW_ANIMATING_FRAME) {
            // is forward flip
            if (mPageFlip.getFlipState() == PageFlipState.FORWARD_FLIP) {
                // check if second texture of first page is valid, if not,
                // create new one
                if (!page.isSecondTextureSet() || reDrawSecondFage) {
                    drawPage(mPageNo + 1);
                    page.setSecondTexture(mBitmap);
                    reDrawSecondFage = false;
                }
            }
            // in backward flip, check first texture of first page is valid
            else if (!page.isFirstTextureSet()) {
                drawPage(--mPageNo);
                page.setFirstTexture(mBitmap);
            }

            // draw frame for page flip
            mPageFlip.drawFlipFrame();
        }
        // draw stationary page without flipping
        else if (mDrawCommand == DRAW_FULL_PAGE) {
//            if (!page.isFirstTextureSet()) {
                drawPage(mPageNo);
                page.setFirstTexture(mBitmap);
//            }

            mPageFlip.drawPageFrame();
        } else {
            Log.e("PageRender", "Unknown draw command");
        }

        // 3. send message to main thread to notify drawing is ended so that
        // we can continue to calculate next animation frame if need.
        // Remember: the drawing operation is always in GL thread instead of
        // main thread
        Message msg = Message.obtain();
        msg.what = MSG_ENDED_DRAWING_FRAME;
        msg.arg1 = mDrawCommand;
        mHandler.sendMessage(msg);
    }

    /**
     * Handle GL surface is changed
     *
     * @param width surface width
     * @param height surface height
     */
    public void onSurfaceChanged(int width, int height) {
        // recycle bitmap resources if need
        if (mBackgroundBitmap != null) {
            mBackgroundBitmap.recycle();
        }

        if (mBitmap != null) {
            mBitmap.recycle();
        }

        // create bitmap and canvas for page
        //mBackgroundBitmap = background;
        Page page = mPageFlip.getFirstPage();
        mBitmap = Bitmap.createBitmap((int)page.width(), (int)page.height(),
                                      Bitmap.Config.ARGB_8888);
        mCanvas.setBitmap(mBitmap);
        LoadBitmapTask.get(mContext).set(width, height, 1);
    }

    /**
     * Handle ended drawing event
     * In here, we only tackle the animation drawing event, If we need to
     * continue requesting render, please return true. Remember this function
     * will be called in main thread
     *
     * @param what event type
     * @return ture if need render again
     */
    public boolean onEndedDrawing(int what) {
        if (what == DRAW_ANIMATING_FRAME) {
            boolean isAnimating = mPageFlip.animating();
            // continue animating
            if (isAnimating) {
                mDrawCommand = DRAW_ANIMATING_FRAME;
                return true;
            }
            // animation is finished
            else {
                final PageFlipState state = mPageFlip.getFlipState();
                // update page number for backward flip
                if (state == PageFlipState.END_WITH_BACKWARD) {
                    // don't do anything on page number since mPageNo is always
                    // represents the FIRST_TEXTURE no;
                }
                // update page number and switch textures for forward flip
                else if (state == PageFlipState.END_WITH_FORWARD) {
                    mPageFlip.getFirstPage().setFirstTextureWithSecond();
                    mPageNo++;
                }
                Log.d("page", "pageNo: " + mPageNo);
                mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("currentPage", mPageNo);

                mDrawCommand = DRAW_FULL_PAGE;
                return true;
            }
        }
        return false;
    }

    /**
     * Draw page content
     *
     * @param number page number
     */
    private TextPaint mTextPaint = new TextPaint();
    @SuppressLint("WrongConstant")
    @RequiresApi(api = Build.VERSION_CODES.Q)
    private void drawPage(int number) {
        final int width = mCanvas.getWidth();
        final int height = mCanvas.getHeight();
        Paint p = new Paint();
        p.setFilterBitmap(true);
        int textSize = Integer.parseInt(mTextStyle.get("textSize")!=null?mTextStyle.get("textSize"):"20");
        String textColor = mTextStyle.get("textColor")!=null?mTextStyle.get("textColor"):"#000000";
        String backgroundColor = mTextStyle.get("backgroundColor")!=null?mTextStyle.get("backgroundColor"):"#ffffff";
        Typeface typeface = mTextStyle.get("textFont")!=null?mListTypeface.get(mTextStyle.get("textFont")):Typeface.DEFAULT;
        int textStyle = mTextStyle.get("textStyle")!=null?Integer.parseInt(mTextStyle.get("textStyle")):0;
        // 1. draw background bitmap
        Bitmap background = LoadBitmapTask.get(mContext).getBitmap();
        Rect rect = new Rect(0, 0, width, height);
//        mCanvas.drawBitmap(background, null, rect, p);
        mCanvas.drawColor(Color.parseColor(backgroundColor));
        background.recycle();
        background = null;

        mTextPaint.setColor(Color.parseColor(textColor));
        float newTextSize = calcFontSize(textSize);
        mTextPaint.setTextSize((float) Math.ceil(newTextSize));
        mTextPaint.setTypeface(Typeface.create(typeface, textStyle));
        mTextPaint.setAntiAlias(true);  // smooth the text
        StaticLayout mTextLayout = new StaticLayout(mListText.get(number -1), mTextPaint, mCanvas.getWidth(), Layout.Alignment.ALIGN_NORMAL, 1f, 0.0f, false);
        mCanvas.save();
        mCanvas.translate(0, 0);
        mTextLayout.draw(mCanvas);
        mCanvas.restore();
    }

    public void setStyle(String type,String data) {
        reDrawSecondFage = true;
        mTextStyle.put(type, data);
    }

    public void resetData(List<String> mListText) {
        reDrawSecondFage = true;
        mPageNo = 2;
        MAX_PAGES = mListText.size();
        this.mListText = mListText;
    }

    /**
     * If page can flip forward
     *
     * @return true if it can flip forward
     */
    public boolean canFlipForward() {
        return (mPageNo < MAX_PAGES);
    }

    /**
     * If page can flip backward
     *
     * @return true if it can flip backward
     */
    public boolean canFlipBackward() {
        if (mPageNo > 1) {
            mPageFlip.getFirstPage().setSecondTextureWithFirst();
            return true;
        }
        else {
            return false;
        }
    }
}
