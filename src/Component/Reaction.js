import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';

const Reaction = ({
  listImage: ListImage,
  value,
  onChangeReaction,
  showBackDrop,
  onPressIn: onPressInBackDrop,
  onPress: onPressItem,
  item,
}) => {
  const containerRef = React.useRef(null);

  const onPressIn = () => {
    containerRef.current.measure((x, y, width, height, pageX, pageY) => {
      onPressInBackDrop(item.item, pageX, pageY);
    });
  };

  const onPress = () => {
    onPressItem(item.item);
  };

  const onLongPress = () => {
    showBackDrop();
  };

  return (
    <View
      collapsable={false}
      ref={containerRef}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        onPressIn={onPressIn}
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          color: item.color,
        }}>
        {item.status}
      </Text>
    </View>
  );
};
export default Reaction;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    padding: 5,
    width: 250,
    borderRadius: 50,
    position: 'absolute',
    elevation: 10,
  },
  imageSize: {
    width: 30,
    height: 30,
  },
  imageStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  imageButtonStyle: {
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 20,
  },
});
