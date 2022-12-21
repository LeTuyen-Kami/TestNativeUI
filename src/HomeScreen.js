import React from 'react';
import {View, Text, Button, Platform} from 'react-native';
import {TestScreen} from './TestScreen';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      {Platform.OS === 'android' ? (
        <>
          <Button
            title={'go to test 3d flip view'}
            onPress={() => {
              navigation.navigate('TestScreen');
            }}
          />
          <Button
            title={'go to test emoji facebook'}
            onPress={() => {
              navigation.navigate('TestScreen2');
            }}
          />
          <Button
            title={'go to test animation'}
            onPress={() => {
              navigation.navigate('TestScreen3');
            }}
          />
          <Button
            title={'go to test character per line'}
            onPress={() => {
              navigation.navigate('TestScreen4');
            }}
          />
          <Button
            title={'go to test text to speech'}
            onPress={() => {
              navigation.navigate('TestTextToSpeech');
            }}
          />
        </>
      ) : (
        <>
          <Button
            title={'go to test ios'}
            onPress={() => {
              navigation.navigate('TestIos');
            }}
          />
          <Button
            title={'go to test ios AVSpeechSynthesisProviderAudioUnit'}
            onPress={() => {
              navigation.navigate('AVSpeechSynthesisProviderAudioUnit');
            }}
          />
        </>
      )}
    </View>
  );
};
export default HomeScreen;
