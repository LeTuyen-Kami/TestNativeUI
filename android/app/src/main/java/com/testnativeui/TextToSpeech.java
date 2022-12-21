package com.testnativeui;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.speech.tts.UtteranceProgressListener;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Set;

public class TextToSpeech extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    private static android.speech.tts.TextToSpeech tts;

    private UtteranceProgressListener utteranceProgressListener;

    private int indexParagraph = 0;

    private String currenText = "";

    private List<String> listText = new ArrayList<>();


    TextToSpeech(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        tts = new android.speech.tts.TextToSpeech(reactContext, new android.speech.tts.TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int status) {
                if (status == android.speech.tts.TextToSpeech.SUCCESS) {
                    int result = tts.setLanguage(new Locale("vi", "VN"));
                    if (result == android.speech.tts.TextToSpeech.LANG_MISSING_DATA || result == android.speech.tts.TextToSpeech.LANG_NOT_SUPPORTED) {
                        throw new RuntimeException("This Language is not supported");
                    }
                } else {
                    throw new RuntimeException("Initilization Failed!");
                }
            }
        });
        tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
            @Override
            public void onStart(String utteranceId) {
            }

            @Override
            public void onDone(String utteranceId) {
                try {
                    indexParagraph = Integer.parseInt(utteranceId)+1;
                    if (indexParagraph == listText.size()) {
                        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("onSpeakFinish", "UniqueID");
                    }
                } catch (NumberFormatException e) {
                    //not a number
                }
            }

            @Override
            public void onError(String utteranceId) {
            }
        });
    }

    @NonNull
    @Override
    public String getName() {
        return "TextToSpeech";
    }

    // Add this method
    @ReactMethod
    public void speak(String text) {
        if (tts.isSpeaking()) {
            tts.stop();
        } else {
            Bundle params = new Bundle();
            params.putString(android.speech.tts.TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "UniqueID");
            if (currenText.equals(text)) {

                if (indexParagraph >= listText.size()) {
                    indexParagraph = 0;

                }
                for (int i = indexParagraph; i < listText.size(); i++) {
                    tts.speak(listText.get(i), android.speech.tts.TextToSpeech.QUEUE_ADD, params, String.valueOf(i));
                    tts.playSilentUtterance(500, android.speech.tts.TextToSpeech.QUEUE_ADD,"silent"+ String.valueOf(i));
                }
            } else {
                currenText = text;
                //split text to list with \n and .
                listText = Arrays.asList(currenText.split("\\n|\\."));


                //loop list and speak
                for (int i = 0; i < listText.size(); i++) {
                    tts.speak(listText.get(i), android.speech.tts.TextToSpeech.QUEUE_ADD, params, String.valueOf(i));
                    tts.playSilentUtterance(500, android.speech.tts.TextToSpeech.QUEUE_ADD,"silent"+ String.valueOf(i));
                }
            }


        }

    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getAvailableLanguages() {
        try {
            Set<Locale> availableLanguages = tts.getAvailableLanguages();
            return Arrays.toString(availableLanguages.toArray());
        } catch (Exception e) {
            e.printStackTrace();
        }
            return "test";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void setVoice(String voice) {
        try {
            Set<android.speech.tts.Voice> voices = tts.getVoices();
            for (android.speech.tts.Voice v : voices) {
                if (v.getName().equals(voice)) {
                    tts.setVoice(v);
                    break;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getMaxSpeechInputLength() {
        try {
            return String.valueOf(tts.getMaxSpeechInputLength());
        } catch (Exception e) {
            e.printStackTrace();
            return String.valueOf(e);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void setPitch(float pitch) {
        try {
            tts.setPitch(pitch);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void setSpeedRate(float speedRate) {
        try {
            tts.setSpeechRate(speedRate);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void stop() {
        try {
            if (tts.isSpeaking()) {
                tts.stop();
            } else {
                tts.shutdown();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void shutdown() {
        try {
            tts.stop();
            currenText = "";
            indexParagraph = 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getVoice() {
        try {
            Set<android.speech.tts.Voice> voices = tts.getVoices();
            List<String> voiceList = new ArrayList<>();
            int i = 0;
            for (android.speech.tts.Voice v : voices) {
                if (v.getLocale().getLanguage().equals("vi")) {
                    voiceList.add("{\"name\": " + "\"" + v.getName() +"\""+ ", \"hasNetworkConnection\": " + v.isNetworkConnectionRequired() + "}");
                    i++;
                }
            }

            return Arrays.toString(voiceList.toArray());
        } catch (Exception e) {
            e.printStackTrace();
        }
            return "test";
    }
}
