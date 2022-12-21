//
//  Speaker.swift
//  TestNativeUI
//
//  Created by Vietdev Studio on 16/11/2022.
//

import Foundation
import AVFAudio


class Speaker: NSObject, AVSpeechSynthesizerDelegate {
    
  let synthesizer = AVSpeechSynthesizer()
  let audioSession = AVAudioSession.sharedInstance()

  var pitch:Float = 0.8
  var rate:Float = 0.57
  var voiceName:String = "vi-VN"
  var handler:(String)->() = {(_:String)->() in
    
  }
  
  override init() {
    super.init()
    synthesizer.delegate = self
  }

  
  func speak(text: String){
    if (text.isEmpty) {
      return
    }
    
    let utterance = AVSpeechUtterance(string: text)

    // Configure the utterance.
    utterance.rate = rate
    utterance.pitchMultiplier = pitch
    utterance.postUtteranceDelay = 1
    utterance.volume = 0.8

    // Retrieve the British English voice.
    let voice = AVSpeechSynthesisVoice(language: voiceName)
    try! audioSession.setCategory(
        AVAudioSession.Category.playback,
        options: AVAudioSession.CategoryOptions.duckOthers
    )

    // Assign the voice to the utterance.
    utterance.voice = voice
    synthesizer.speak(utterance)
  }
  
  func speakLongString(_ listContent: [String]){
    for text in listContent{
      speak(text: text)
    }
  }
  
  func getListVoice()->[Dictionary<String,String>]{
    var listVoice:[Dictionary<String,String>] = []
    for val in AVSpeechSynthesisVoice .speechVoices() {
      if val.language.contains("vi") || val.language.contains("VN") {
        listVoice.append(["language": val.language, "name": val.name])
      }
    }
    return listVoice
  }
  
  func isSpeaking()->Bool{
    return synthesizer.isSpeaking
  }
  
  func isPaused()->Bool{
    return synthesizer.isPaused
  }
  
  func pause()->Bool{
    return synthesizer.pauseSpeaking(at: AVSpeechBoundary.word)
  }
  
  func resume(){
    synthesizer.continueSpeaking()
  }
  
  func stop(){
    synthesizer.stopSpeaking(at: AVSpeechBoundary.immediate)
  }
  
  
}

extension Speaker {
  func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
    self.handler("finish")
  }
  
  func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didCancel utterance: AVSpeechUtterance) {
    self.handler("cancel")
  }
}
