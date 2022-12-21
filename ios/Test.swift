//
//  TextToSpeech.swift
//  TestNativeUI
//
//  Created by Vietdev Studio on 15/11/2022.
//

import Foundation
import AVFoundation
    

@objc(Test)
class Test: RCTEventEmitter{
    
  let speaker = Speaker()
  var indexParagraph:Int = 0
  var listContent:[String] = [""]
  var isStop: Bool = true
  
  
  override init(){
    super.init()
    speaker.handler = {(text:String)->() in
      switch text{
      case "finish":
        self.indexParagraph += 1
        self.sendEvent(withName: "onSpeakDone", body: self.indexParagraph)
      case "cancel":
        self.isStop = true
        self.indexParagraph = 0
        self.sendEvent(withName: "onSpeakFinish", body: self.indexParagraph)
      default:
        self.sendEvent(withName: "onDefault", body: [text])
      }
    }
  }
  
  
  @objc
  func getListVoice(_ resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock){
    let listVoice:[Dictionary<String,String>] = speaker.getListVoice()
    resolve(listVoice)
  }
  
  @objc
  func initTextSpeak(_ text:String){
    indexParagraph = 0
    listContent = text.split(separator: "\n").map {String($0)}
    isStop = true
    
  }
  
  @objc
  func speak(){
//    if isStop || indexParagraph == 0 {
//      print("init speak")
//      isStop = false
//      if indexParagraph >= listContent.count {
//        indexParagraph = 0
//      }
//      speaker.speakLongString(Array(listContent[indexParagraph...]))
//    } else {
//      if !speaker.isPaused(){
//        print("pause \(speaker.isSpeaking().description) \(speaker.isPaused().description)")
//        speaker.pause()
//      } else {
//        print("resume")
//        speaker.resume()
//      }
//    }
    
//    if speaker.isPaused() {
//      print("resume")
//      speaker.resume()
//    } else
    if speaker.isSpeaking() {
      speaker.stop()
      indexParagraph -= 1
    } else {
      print("speak new")
      if indexParagraph >= listContent.count {
        indexParagraph = 0
        sendEvent(withName: "onSpeakFinish", body: 0)
      }
      speaker.speakLongString(Array(listContent[indexParagraph...]))
    }
  }
  
  @objc
  func setIndexParagraph(_ index: Double){
    if speaker.isSpeaking(){
      speaker.stop()
    }
    isStop = true
    
    indexParagraph = Int(index)
  }
  
  @objc
  func setPitch(_ pitch:Double){
    speaker.pitch = Float(pitch)
  }
  
  @objc
  func setSpeedRate(_ speed: Double){
    speaker.rate = Float(speed)
  }
  
  @objc
  func getLengthText(_ resolve: RCTPromiseResolveBlock,reject: RCTPromiseRejectBlock){
    resolve(listContent.count)
  }
  
  @objc
  func shutdown(){
    speaker.stop()
    listContent = []
    indexParagraph = 0
    isStop = true
    sendEvent(withName: "onSpeakFinish", body: ["finish"])
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  override func supportedEvents() -> [String]! {
    ["onSpeakDone","onDefault","onSpeakFinish"]
  }
  
  
}
