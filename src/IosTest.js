import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  NativeModules,
  Button,
  TextInput,
  NativeEventEmitter,
} from 'react-native';
// RCT_EXTERN_METHOD(getListVoice:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
// RCT_EXTERN_METHOD(initTextSpeak:(NSString)text)
// RCT_EXTERN_METHOD(speak)
// RCT_EXTERN_METHOD(setIndexParagraph:(double)index)
// RCT_EXTERN_METHOD(setPitch:(double)pitch)
// RCT_EXTERN_METHOD(setSpeedRate:(double)speed)
// RCT_EXTERN_METHOD(getLengthText:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
// RCT_EXTERN_METHOD(shutdown)
const TTSEvent = new NativeEventEmitter(NativeModules.Test);
const TTS = NativeModules.Test;

export const IosTest = () => {
  const [indexParagraph, setIndexParagraph] = React.useState(0);
  const [lengthText, setLengthText] = React.useState(0);

  const [text, setText] = React.useState('');

  const onPressSpeak = () => {
    TTS.speak();
  };

  const initText = text => {
    TTS.initTextSpeak(text);
    TTS.getLengthText().then(res => {
      setLengthText(res);
    });
  };

  const onPressNext = () => {
    if (indexParagraph < lengthText - 1) {
      TTS.setIndexParagraph(indexParagraph + 1);
      setIndexParagraph(indexParagraph + 1);
    }
  };

  const onPressPrev = () => {
    if (indexParagraph > 0) {
      TTS.setIndexParagraph(indexParagraph - 1);
      setIndexParagraph(indexParagraph - 1);
    }
  };

  const onSpeak = () => {
    TTS.speak();
  };

  React.useEffect(() => {
    const onFinishId = TTSEvent.addListener('onSpeakFinish', e => {
      setIndexParagraph(0);
    });
    const onDoneId = TTSEvent.addListener('onSpeakDone', e => {
      if (Number.isInteger(e)) {
        setIndexParagraph(e);
      }
    });

    return () => {
      onFinishId?.remove();
      onDoneId?.remove();
      TTS.shutdown();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TextInput
        value={text}
        multiline={true}
        onChangeText={setText}
        placeholder={'Nhập text'}
      />
      <Text>Length Text {lengthText}</Text>
      <Button title={'Init'} onPress={() => initText(text)} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View>
          <Text>{indexParagraph}</Text>
          <Button title={'Prev'} onPress={() => onPressPrev()} />
        </View>
        <View>
          <Button title={'Speak'} onPress={onSpeak} />
        </View>
        <View>
          <Text>{indexParagraph}</Text>
          <Button title={'Next'} onPress={() => onPressNext()} />
        </View>
      </View>
    </View>
  );
};
