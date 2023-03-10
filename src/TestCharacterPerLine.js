import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Button,
  PixelRatio,
  ScrollView,
} from 'react-native';
import {re} from '@babel/core/lib/vendor/import-meta-resolve';
const getChapterListUrl =
  'http://192.168.0.185:8000/api/home/novel/get-chapter-list/?novel_code=2115131970';
const chapterContentUrl = `http://192.168.0.185:8000/api/home/novel/get-chapter-detail/?novel_code=2115131970&chap_num=`;

const fontConstant = {
  monospace: 1.64,
  sansSerif: 1.5,
  serif: 2.26,
};

const linesOffset = {
  8: -2,
  12: 0,
  16: 2,
  20: 4,
  24: 5,
  28: 5,
  32: 6,
};

const screen = Dimensions.get('window');
const screenheight = screen.height - 100;
const constantLineHeight = 1.2;

const ListText_ = [
  "Lorem Ipsum is simply dummy te2xt of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ",
  "Lorem Ipsum is simply dummy text 1of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  'I am a list item1',
  'I am a list item2',
  'I am a list item3',
  'I am a list item4',
  'I am a list item5',
  'I am a list item6',
  'I am a list item I am a list item I am a list item I am a list item I am a list item ',
  'I am a list item7',
  'I am a list item8',
  'I am a list item9',
  'I am a list item10',
  "I'm a list item I am a list item I am a list item I am a list item I am a list item I am a list item I'm a list item I am a list item I am a list item I am a list item I am a list item I am a list item1",
  'I am a list item11',
  'I am a list item22',
  'I am a list item33',
  'I am a list item44',
  'I am a list item52',
  'I am a list item15',
  'I am a list item26',
  'I am a list itemewq',
  'I am a list itemdf',
  'I am a list itemxdfs',
  'I am a list itemadf',
  'I am a list itzemfds',
  "I'm a list itemdsf",
  'I am a list itxzcem',
  'I am a lvcist item',
  'I am a listcxz item',
  'I am a lisadst item',
  'I am wea list item',
  'I am a lidsast item',
  'I am a li123st item',
  'I am a 123list item',
  'I am a l213ist item',
  'I am a lis41224t item',
  'I am a 214list item',
  'I am a lis213t item',
  "I'm a list 421item",
  'I am a li214st item',
  'Th??? n??n ngay b??y gi???, Akaashi ??ang nh??n nh?? m?? t???i ch??? qu??n c?? ph?? ???? h???n s???n, ????? xem m???t. Th???t ra c???u c??ng kh??ng r???nh r???i cho l???m, c??n r???t nhi???u b???n th???o ??ang ch??? c???u xem x??t v?? ph?? duy???t. Tuy nhi??n khi Akaashi xin ph??p ngh??? n???a bu???i ????? ??i xem m???t th?? ch??? bi??n l???i r???t h??o ph??ng duy???t ngay l???p t???c. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Th???t ra ch??? bi??n c??ng ngh?? c???u l?? ????? ??? sao? \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Akaashi ???? ???????c m??? s???p x???p cho xem m???t v???i r???t nhi???u ng?????i, t??? khi c???u m???i t???t nghi???p ?????i h???c. V??o th???i ??i???m ???? v???i ni???m c???ng hi???n cho c??ng vi???c c???u ???? t??? ch???i r???t nhi???u l???n, m???c cho m??? c???u c?? k??u g??o bao nhi??u ??i ch??ng n???a. \n' +
    '\n' +
    ' \n' +
    '\n' +
    '"Con th??ch ????n ??ng." \n' +
    '\n' +
    ' \n' +
    '\n' +
    '"??????" \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Nh???t B???n v?? v??i n?????c kh??c ???? th??ng qua lu???t h??n nh??n ?????ng t??nh. Kh??ng c??n ai l??? l???m g?? khi b???t g???p ng?????i ?????ng t??nh tr??n ???????ng c???, ???? c??ng l?? l?? do m??? Akaashi ch???p nh???n chuy???n n??y nhanh h??n c???u t?????ng. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Akaashi ngh?? ch??? c???n c???u n??i nh?? th??? th?? gia ????nh s??? suy ngh?? l???i v?? kh??ng ????? ?????ng g?? t???i c???u n???a nh??ng m???i vi???c ch??? y??n b??nh ???????c m???t th??ng ng???n ng???i. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'C???u v???n ???????c g???i ??i xem m???t v?? ?????i t?????ng ???? ???????c chuy???n sang ????n ??ng. \n' +
    '\n' +
    ' \n' +
    '\n' +
    '????ng l?? c???u n??n b???o m??nh b??? l??nh c???m th?? t???t h??n nh???? \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Akaashi ho??n to??n b??nh th?????ng d?? l?? tr??n ph????ng di???n t??m l?? v?? sinh l?? tuy nhi??n c???u c???m th???y l??c n??y m?? n??i v??? v???n ????? y??u ??????ng v???n kh??ng th??ch h???p cho l???m. Akaashi c??ng c?? th??? v??i l???n chi???u l??ng m??? nh??ng ch??a l???n n??o th??nh c??ng. Bu???i h???n h??m nay l?? l???n cu???i c??ng c???u nghe l???i b??, Akaashi c??ng kh??ng ????? t??m cho l???m ch??? y???u ch??? ????? l??m vui l??ng m???. ',
  'I am a list item',
];

function getNumberOfLines(ListText, fontSize, fontConstant_, containerWidth) {
  const cpl = Math.ceil(containerWidth / (fontSize / fontConstant_));
  const lineOffset = Math.abs(
    Math.round((43 / 3 - Math.sqrt((43 * 43) / 9 - 4 * (80 - cpl))) / 2),
  );
  console.log('line', lineOffset, cpl);

  let allLinesInScreenHeight =
    Math.ceil(screenheight / (fontSize * constantLineHeight)) - lineOffset;
  let results = [];
  let temp = '';
  let totalLines = 1;
  let index = 0;
  let listText = [];

  for (let i = 0; i < ListText.length; i++) {
    const linesListTextI = Math.ceil(ListText[i].length / cpl);
    totalLines += linesListTextI;

    if (totalLines >= allLinesInScreenHeight || i === ListText.length - 1) {
      const linesToUse =
        linesListTextI === 1
          ? 1
          : linesListTextI - totalLines + allLinesInScreenHeight;
      const textToUse =
        linesListTextI === 1
          ? ListText[i]
          : ListText[i].substring(0, linesToUse * cpl);
      index++;
      results.push({
        text: temp + textToUse,
        numberOfLines: allLinesInScreenHeight,
        index: index,
        listText: listText,
      });
      temp =
        linesListTextI === 1
          ? ''
          : ListText[i].substring(linesToUse * cpl) + '\n';
      totalLines = 0;
      listText = [];
    } else {
      temp += ListText[i] + '\n';
    }
    listText.push(ListText[i]);
  }

  return {results, allLinesInScreenHeight, cpl};
}

const TestCharacterPerLine = () => {
  const [chapterList, setChapterList] = React.useState(null);
  const [contentData, setContentData] = React.useState(null);
  const [fontSize, setFontSize] = React.useState(8);
  const textRef = React.useRef(null);
  const [text, setText] = React.useState('');
  const listParam = React.useRef([]);
  const index = React.useRef(0);
  // const rs = getNumberOfLines(
  //   ListText_,
  //   fontSize,
  //   fontConstant.serif,
  //   screen.width,
  // );
  // React.useEffect(() => {
  //   console.log('useEffect', index.current);
  //   if (index.current < ListText_.length) {
  //     index.current += 1;
  //   } else {
  //     console.log('end', listParam.current);
  //   }
  // }, [text]);
  //

  return (
    <ScrollView>
      <View
        onLayout={() => {
          console.log('onLayout', listParam.current);
        }}>
        {ListText_.map((item, index) => {
          return (
            <Text
              key={index}
              onTextLayout={({nativeEvent}) => {
                listParam.current.push({
                  yValue: Math.round(
                    nativeEvent.lines[nativeEvent.lines.length - 1].y +
                      nativeEvent.lines[nativeEvent.lines.length - 1].height,
                  ),
                  text: text,
                  lines: nativeEvent.lines.length,
                });
              }}>
              {item}
            </Text>
          );
        })}
        {/*<Text*/}
        {/*  selectable={true}*/}
        {/*  // onLayout={event => {*/}
        {/*  //   console.log('event', event.nativeEvent.layout);*/}
        {/*  // }}*/}
        {/*  ref={textRef}*/}
        {/*  textBreakStrategy={'simple'}*/}
        {/*  onTextLayout={({nativeEvent}) => {*/}
        {/*    listParam.current.push({*/}
        {/*      yValue: Math.round(*/}
        {/*        nativeEvent.lines[nativeEvent.lines.length - 1].y +*/}
        {/*          nativeEvent.lines[nativeEvent.lines.length - 1].height,*/}
        {/*      ),*/}
        {/*      text: ListText_[index.current - 1],*/}
        {/*      lines: nativeEvent.lines.length,*/}
        {/*    });*/}
        {/*    setText(ListText_[index.current]);*/}
        {/*  }}*/}
        {/*  style={{*/}
        {/*    fontFamily: 'serif',*/}
        {/*    fontSize: fontSize,*/}
        {/*  }}>*/}
        {/*  {text}*/}
        {/*</Text>*/}

        <View
          style={{
            position: 'absolute',
          }}>
          <Button
            title={fontSize + 'px'}
            onPress={() => {
              setFontSize(fontSize + 4);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default TestCharacterPerLine;
