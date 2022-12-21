import React, {useEffect, useRef} from 'react';
import {
  UIManager,
  findNodeHandle,
  PixelRatio,
  Dimensions,
  View,
  Button,
  Text,
  StyleSheet,
  Pressable,
  DeviceEventEmitter,
} from 'react-native';

const constLineHeight = (1.15 / 2.75) * PixelRatio.get();

const screen = Dimensions.get('window');

const alphabet = [...' abcdefghijklmnopqrstuvwxyz '];
const ListThree = [];
for (let i = 1; i < alphabet.length - 2; i++) {
  ListThree.push([alphabet[i - 1], alphabet[i], alphabet[i + 1]]);
}

const text =
  "Lê Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing ";
const ListText = [text, text, text, text];
//generate lorem ipsum text
const LoremText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const ListListText = [
  ListText,
  ListText,
  ListText,
  ListText,
  ListText,
  ListText,
];

const newListText = [
  LoremText,
  LoremText,
  LoremText,
  LoremText,
  LoremText,
  LoremText,
];

const ListColor = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ff00ff',
  '#00ffff',
  '#ffff00',
  '#f0f0f0',
  '#000000',
];

const getChapterListUrl =
  'http://192.168.0.185:8000/api/home/novel/get-chapter-list/?novel_code=2115131970';
const chapterContentUrl = `http://192.168.0.185:8000/api/home/novel/get-chapter-detail/?novel_code=2115131970&chap_num=`;

const listFont = ['monospace', 'sans-serif', 'serif', 'default'];
const listStyle = ['normal', 'italic', 'bold', 'bold_italic'];

import FlipView3D from './Component/FlipView3D';

export const TestScreen = () => {
  const [fontSize, setFontSize] = React.useState(20);

  const [backColor, setBackColor] = React.useState('transparent');
  const [hide, setHide] = React.useState(true);
  const [canTouch, setCanTouch] = React.useState(true);
  const [textColor, setTextColor] = React.useState(
    ListColor[ListColor.length - 1],
  );
  const [backgroundColor, setBackgroundColor] = React.useState(
    ListColor[ListColor.length - 2],
  );

  const [textFont, setTextFont] = React.useState(listFont[listFont.length - 1]);
  const [textStyle, setTextStyle] = React.useState(
    listStyle[listStyle.length - 1],
  );
  const [data, setData] = React.useState(ListThree[0]);

  React.useEffect(() => {
    let value = 0;
    DeviceEventEmitter.addListener('currentPage', e => {
      console.log(e, value);
      if (e === 3) {
        value = value < ListThree.length - 1 ? value + 1 : 0;
        setData(ListThree[value]);
      } else if (e === 1) {
        value = value > 0 ? value - 1 : ListThree.length - 1;
        setData(ListThree[value]);
      }
    });
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlipView3D
        data={data}
        textColor={textColor}
        canTouch={canTouch}
        fontSize={fontSize}
        textFont={textFont}
        textStyle={textStyle}
        backgroundColor={backgroundColor}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: screen.width,
          height: screen.height,
        }}>
        <Text
          onLongPress={() => {
            setBackColor('rgba(0,0,0,0.5)');
            setHide(false);
            setCanTouch(false);
          }}
          onPressOut={() => {
            setCanTouch(true);
          }}
          textBreakStrategy={'simple'}
          style={{
            marginTop: -2,
            fontSize: fontSize,
            fontFamily: textFont,
            fontWeight:
              textStyle === 'bold'
                ? 'bold'
                : textStyle === 'bold_italic'
                ? 'bold'
                : 'normal',
            fontStyle:
              textStyle === 'italic'
                ? 'italic'
                : textStyle === 'bold_italic'
                ? 'italic'
                : 'normal',
            color: 'transparent',
            textAlign: 'left',
          }}>
          <Text
            style={{
              backgroundColor: backColor,
            }}>
            {text}
          </Text>
          <Text>Text</Text>
        </Text>

        <Button
          color={'transparent'}
          title={'tăng fontsize' + fontSize}
          onPress={() => setFontSize(fontSize + 1)}
          // onPress={() => setData(newListText)}
        />
        <Button
          color={'transparent'}
          title={'giảm fontsize'}
          onPress={() => setFontSize(fontSize - 1)}
        />
        <Button
          color={'transparent'}
          title={'đỗi màu chữ'}
          onPress={() =>
            setTextColor(
              ListColor[Math.floor(Math.random() * ListColor.length)],
            )
          }
        />
        <Button
          color={'transparent'}
          title={'đỗi màu nền'}
          onPress={() =>
            setBackgroundColor(
              ListColor[Math.floor(Math.random() * ListColor.length)],
            )
          }
        />
        <Button
          color={'transparent'}
          title={'đỗi text font'}
          onPress={() =>
            setTextFont(listFont[Math.floor(Math.random() * listFont.length)])
          }
        />
        <Button
          color={'transparent'}
          title={'đỗi text style'}
          onPress={() =>
            setTextStyle(
              listStyle[Math.floor(Math.random() * listStyle.length)],
            )
          }
        />
        <Pressable
          style={[
            StyleSheet.absoluteFill,
            {
              display: !hide ? 'flex' : 'none',
              width: screen.width,
              height: screen.height,
            },
          ]}
          onPress={() => {
            setBackColor('transparent');
            setHide(true);
          }}
        />
      </View>
    </View>
  );
};
