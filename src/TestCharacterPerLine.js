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
  'Thế nên ngay bây giờ, Akaashi đang nhàn nhã mà tới chỗ quán cà phê đã hẹn sẵn, để xem mặt. Thật ra cậu cũng không rảnh rỗi cho lắm, còn rất nhiều bản thảo đang chờ cậu xem xét và phê duyệt. Tuy nhiên khi Akaashi xin phép nghỉ nửa buổi để đi xem mắt thì chủ biên lại rất hào phóng duyệt ngay lập tức. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Thật ra chủ biên cũng nghĩ cậu là đồ ế sao? \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Akaashi đã được mẹ sắp xếp cho xem mắt với rất nhiều người, từ khi cậu mới tốt nghiệp đại học. Vào thời điểm đó với niềm cống hiến cho công việc cậu đã từ chối rất nhiều lần, mặc cho mẹ cậu có kêu gào bao nhiêu đi chăng nữa. \n' +
    '\n' +
    ' \n' +
    '\n' +
    '"Con thích đàn ông." \n' +
    '\n' +
    ' \n' +
    '\n' +
    '"Ồ…" \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Nhật Bản và vài nước khác đã thông qua luật hôn nhân đồng tính. Không còn ai lạ lẫm gì khi bắt gặp người đồng tính trên đường cả, đó cũng là lý do mẹ Akaashi chấp nhận chuyện này nhanh hơn cậu tưởng. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Akaashi nghĩ chỉ cần cậu nói như thế thì gia đình sẽ suy nghĩ lại và không đả động gì tới cậu nữa nhưng mọi việc chỉ yên bình được một tháng ngắn ngủi. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Cậu vẫn được gọi đi xem mắt và đối tượng đã được chuyển sang đàn ông. \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Đáng lý cậu nên bảo mình bị lãnh cảm thì tốt hơn nhỉ? \n' +
    '\n' +
    ' \n' +
    '\n' +
    'Akaashi hoàn toàn bình thường dù là trên phương diện tâm lý và sinh lý tuy nhiên cậu cảm thấy lúc này mà nói về vấn đề yêu đương vẫn không thích hợp cho lắm. Akaashi cũng có thử vài lần chiều lòng mẹ nhưng chưa lần nào thành công. Buổi hẹn hôm nay là lần cuối cùng cậu nghe lời bà, Akaashi cũng không để tâm cho lắm chủ yếu chỉ để làm vui lòng mẹ. ',
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
