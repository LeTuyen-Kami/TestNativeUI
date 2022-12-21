import React from 'react';
import {
  Dimensions,
  findNodeHandle,
  PixelRatio,
  Text,
  UIManager,
  View,
} from 'react-native';
import FlipViewComponent from './FlipViewComponent';
const screen = Dimensions.get('window');
const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager.FlipView3D.Commands.create.toString(),
    [viewId],
  );

const FlipView3D = ({
  data,
  canTouch,
  fontSize = 20,
  textColor = '#000000',
  backgroundColor = '#ffffff',
  textAlign = 'left',
  textFont = 'default',
  textStyle = 'normal',
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (data.length) {
      const viewId = findNodeHandle(ref.current);
      createFragment(viewId);
    }
  }, []);

  return (
    <View>
      {data.length ? (
        <FlipViewComponent
          data={JSON.stringify(data)}
          canTouchAble={typeof canTouch === 'boolean' ? canTouch : true}
          textSize={typeof fontSize === 'number' ? fontSize : 20}
          textColor={typeof textColor === 'string' ? textColor : '#000000'}
          textFont={typeof textFont === 'string' ? textFont : 'default'}
          textStyle={typeof textStyle === 'string' ? textStyle : 'normal'}
          backgroundColor={
            typeof backgroundColor === 'string' ? backgroundColor : '#ffffff'
          }
          // textColor={'red'}
          style={{
            // converts dpi to px, provide desired height
            height: PixelRatio.getPixelSizeForLayoutSize(screen.height),
            // converts dpi to px, provide desired width
            width: PixelRatio.getPixelSizeForLayoutSize(screen.width),
          }}
          ref={ref}
        />
      ) : (
        <View>
          <Text>Có lỗi xảy ra</Text>
        </View>
      )}
    </View>
  );
};

export default FlipView3D;
