//
//  TextToSpeech.m
//  truyenyy
//
//  Created by Vietdev Studio on 17/11/2022.
//

#import <Foundation/Foundation.h>
#import "React/RCTEventEmitter.h"

#import "React/RCTBridgeModule.h"
@interface RCT_EXTERN_MODULE(TTS,RCTEventEmitter)
RCT_EXTERN_METHOD(getListVoice:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(initTextSpeak:(NSString)text)
RCT_EXTERN_METHOD(speak)
RCT_EXTERN_METHOD(setIndexParagraph:(double)index)
RCT_EXTERN_METHOD(setPitch:(double)pitch)
RCT_EXTERN_METHOD(setSpeedRate:(double)speed)
RCT_EXTERN_METHOD(getLengthText:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(shutdown)
@end
