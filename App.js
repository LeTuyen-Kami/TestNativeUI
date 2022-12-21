/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
const Tab = createNativeStackNavigator();

import HomeScreen from './src/HomeScreen';
import {TestScreen} from './src/TestScreen';
import {TestScreen2} from './src/TestScreen2';
import TestAnimation from './src/TestAnimation';
import TestCharacterPerLine from './src/TestCharacterPerLine';
import TestTextToSpeech from './src/TestTextToSpeech';
import {IosTest} from './src/IosTest';
import AVSpeechSynthesisProviderAudioUnit from './src/AVSpeechSynthesisProviderAudioUnit';
const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="TestScreen" component={TestScreen} />
        <Tab.Screen name="TestScreen2" component={TestScreen2} />
        <Tab.Screen name="TestScreen3" component={TestAnimation} />
        <Tab.Screen name="TestScreen4" component={TestCharacterPerLine} />
        <Tab.Screen name="TestTextToSpeech" component={TestTextToSpeech} />
        <Tab.Screen name="TestIos" component={IosTest} />
        <Tab.Screen
          name="AVSpeechSynthesisProviderAudioUnit"
          component={AVSpeechSynthesisProviderAudioUnit}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
