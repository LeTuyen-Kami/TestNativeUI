import React from 'react';
import {
  AppRegistry,
  Button,
  DeviceEventEmitter,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextToSpeech from './Component/TextToSpeech';
import {testText} from './const';

const listSpeed = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];

const splitText = testText.split('\n');

const TestTextToSpeech = () => {
  const [text, setText] = React.useState(
    'Xin chào các bạn. Mình là Hùng Down. Mình làm ứng dụng này để test thử thư viện TextToSpeech của React Native. Mình sẽ cố gắng cập nhật thêm nhiều tính năng hơn nữa. Cảm ơn các bạn đã ủng hộ mình. Chúc các bạn một ngày tốt lành.',
  );
  const [ListVoice, setListVoice] = React.useState([]);
  const [indexVoice, setIndexVoice] = React.useState(0);
  const [indexSpeed, setIndexSpeed] = React.useState(2);
  const [indexPitch, setIndexPitch] = React.useState(2);
  const [speaking, setSpeaking] = React.useState(false);

  const speak = () => {
    TextToSpeech.speak(text);
    setSpeaking(!speaking);
  };

  const getListAvailableLang = async () => {
    const a = await TextToSpeech.getAvailableLanguages();
    console.log(a);
  };

  const getVoice = async () => {
    let a = await TextToSpeech.getVoice();
    a = JSON.parse(a);
    return a;
  };

  const setVoiceNameTTS = name => {
    TextToSpeech.setVoice(name);
  };

  const getMaxSpeechInputLength = async () => {
    const a = await TextToSpeech.getMaxSpeechInputLength();
    console.log(a);
  };

  const speakText = () => {
    for (let i = 0; i < splitText.length; i++) {
      TextToSpeech.speak(splitText[i]);
    }
  };

  const stopSpeak = () => {
    TextToSpeech.shutdown();
  };

  React.useEffect(() => {
    getMaxSpeechInputLength();
    getVoice().then(res_ => {
      setListVoice(res_);
    });

    DeviceEventEmitter.addListener('onSpeakFinish', (e: Event) => {
      setSpeaking(false);
    });

    return () => {
      TextToSpeech.shutdown();
    };
  }, []);

  React.useEffect(() => {
    console.log('indexVoice', speaking);
    if (!speaking) {
      setTimeout(() => {
        TextToSpeech.speak(text);
        setSpeaking(true);
      }, 1000);
    }
    // AppRegistry.registerHeadlessTask('Speak', () => );
  }, [speaking]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <Text>test1</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 10,
          }}
          onChangeText={text => setText(text)}
          value={text}
        />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {ListVoice.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 20,
                  padding: 2,
                  margin: 5,
                  backgroundColor:
                    indexVoice === index ? 'green' : 'transparent',
                }}
                onPress={() => {
                  setIndexVoice(index);
                  setVoiceNameTTS(item.name);
                }}
                key={index}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {listSpeed.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 20,
                  padding: 2,
                  margin: 5,
                  backgroundColor: indexSpeed === index ? 'red' : 'transparent',
                }}
                onPress={() => {
                  setIndexSpeed(index);
                  TextToSpeech.setSpeedRate(item);
                }}
                key={index}>
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {listSpeed.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 20,
                  padding: 2,
                  margin: 5,
                  backgroundColor:
                    indexPitch === index ? 'yellow' : 'transparent',
                }}
                onPress={() => {
                  setIndexPitch(index);
                  TextToSpeech.setPitch(item);
                }}
                key={index}>
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button title={speaking ? 'stop' : 'speaking'} onPress={speak} />
        <Button title={'getAvailableLang'} onPress={getListAvailableLang} />
        <Button title={'getVoices'} onPress={getVoice} />
        <Button title={'test'} onPress={speakText} />
        <Button title={'stop'} onPress={stopSpeak} />
      </ScrollView>
    </View>
  );
};

export default TestTextToSpeech;
