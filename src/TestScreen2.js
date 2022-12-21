import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  InteractionManager,
  FlatList,
} from 'react-native';
import Reaction from '@components/Reaction';
import Comment from './Component/Comment';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureHandlerRootView} from 'react-native-gesture-handler';
import {GestureDetector} from 'react-native-gesture-handler/src/handlers/gestures/GestureDetector';
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const ListColor = {
  liked: '#134999',
  like: 'gray',
  love: '#ff0000',
  haha: '#ffa500',
  wow: '#ffd700',
  sad: '#c89559',
  angry: '#e14907',
};
const TListItem = [...Array(500).keys()].map(item => ({
  item: item,
  status: 'like',
  color: ListColor.like,
}));
const ListImage = {
  like: require('@assets/ic_like.png'),
  liked: require('@assets/ic_like_fill.png'),
  love: require('@assets/love2.png'),
  haha: require('@assets/haha2.png'),
  wow: require('@assets/wow2.png'),
  sad: require('@assets/sad2.png'),
  angry: require('@assets/angry2.png'),
};

const screen = Dimensions.get('window');
const emojiMl = screen.width / 2 - 125;
const haflWidth = screen.width / 2;

const heightEmojiContainer = 30;
const objectText = ``;

const ImageGif = ({source, onPress, name, index, plusValue}) => {
  const translateY = useSharedValue(plusValue);
  const [canStyle, setCanStyle] = React.useState(true);
  const scale = useSharedValue(1);
  const duration = 300 + index * 200;
  const onPressIn = () => {
    scale.value = withTiming(2, {duration: 50});
    translateY.value = withTiming(-5, {duration: 50});
  };

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}, {scale: scale.value}],
    };
  });

  const onPressGif = () => {
    setTimeout(() => {
      setCanStyle(false);
      setTimeout(() => {
        translateY.value = -plusValue;
        translateY.value = withTiming(0, {
          duration: duration,
        });
      }, 10);
      onPress(name, duration);
    }, 50);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = withTiming(1 - translateY.value / heightEmojiContainer, {
      duration: 50,
    });
    return {
      opacity: opacity,
      transform: [
        {
          translateY: translateY.value,
        },
        {
          scale: opacity,
        },
      ],
    };
  });

  const move = Gesture.Pan().onEnd(() => {
    scale.value = withTiming(1, {duration: 100});
    translateY.value = withTiming(0, {duration: 100});
  });

  const pressStyle = useAnimatedStyle(() => {
    const yValue = translateY.value;
    const scaleV = withTiming(Math.abs(yValue) / heightEmojiContainer, {
      duration: 50,
    });
    const xValue =
      -Math.sqrt(
        1 - (yValue / heightEmojiContainer) * (yValue / heightEmojiContainer),
      ) *
      (emojiMl - 75 + 40 * (index + 1));
    return {
      transform: [
        {
          translateY: plusValue + yValue,
        },
        {
          translateX: xValue,
        },
        {
          scale: scaleV,
        },
      ],
    };
  });

  React.useEffect(() => {
    setTimeout(() => {
      translateY.value = withSpring(0);
    }, 100 + index * 100);
  }, []);
  return (
    <GestureDetector gesture={move}>
      <AnimatedPressable
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={onPressGif}
        onPressIn={onPressIn}
        style={canStyle ? animatedStyle : pressStyle}>
        <AnimatedImage source={source} style={[style.imageStyle, imageStyle]} />
      </AnimatedPressable>
    </GestureDetector>
  );
};
export const TestScreen2 = () => {
  const [ListItem, setListItem] = React.useState(TListItem);
  const [showBackDrop, setShowBackDrop] = React.useState(false);
  const plusValue = React.useRef(0);
  const currentItem = React.useRef(null);
  const translateYContainer = useSharedValue(0);
  const opacityContainer = useSharedValue(0);

  const onPressLike = item => {
    const newListItem = [...ListItem];
    newListItem[currentItem.current].status =
      newListItem[currentItem.current].status !== 'like' ? 'like' : 'liked';
    newListItem[currentItem.current].color =
      ListColor[newListItem[currentItem.current].status];
    setListItem(newListItem);
  };

  const onPressIn = (item, pageX, pageY) => {
    currentItem.current = item;

    translateYContainer.value = pageY - 75;
    if (pageY - 125 > 0) {
      plusValue.current = heightEmojiContainer;
    } else {
      plusValue.current = -heightEmojiContainer;
    }
  };

  const onLongPressButton = () => {
    translateYContainer.value = withTiming(
      translateYContainer.value - plusValue.current,
      {
        duration: 500,
      },
    );
    opacityContainer.value = withTiming(1);
  };

  const onPressHide = (callback, duration = 500) => {
    opacityContainer.value = withTiming(
      0,
      {
        duration: duration,
      },
      () => {
        runOnJS(callback)(false);
      },
    );
  };

  const onPressEmoji = (name, duration) => {
    onPressHide(setShowBackDrop, duration);
    const newListItem = [...ListItem];
    newListItem[currentItem.current].status = name;
    newListItem[currentItem.current].color = ListColor[name];
    setTimeout(() => {
      setListItem(newListItem);
    }, duration - 200);
  };

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateYContainer.value}],
      opacity: opacityContainer.value,
    };
  });

  const showListIcon = () => {
    setShowBackDrop(true);
    onLongPressButton();
  };

  const hideListIcon = () => {
    onPressHide(setShowBackDrop);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/*<ScrollView style={{flex: 1}}>*/}
      <View>
        <View
          style={{
            width: screen.width,
          }}>
          <FlatList
            data={ListItem}
            renderItem={({item, index}) => {
              return (
                <Comment
                  key={item.item}
                  name={'test'}
                  listImage={ListImage}
                  showBackDrop={showListIcon}
                  onPressIn={onPressIn}
                  onPress={onPressLike}
                  item={item}
                  comment={
                    'this is a random tédjf sdihfu sdfiusd íaduf wesd fsdiof sdifj eói áodf weryh fsidfj sodif sadufijsdfm sodiufsdnjf' +
                    item.item
                  }
                  createAt={'10h'}
                />
              );
            }}
            keyExtractor={item => item.item}
          />
        </View>
      </View>
      {/*</ScrollView>*/}
      {showBackDrop && (
        <>
          <Pressable
            onPress={hideListIcon}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
          <AnimatedView style={[style.container, containerAnimatedStyle]}>
            <ImageGif
              onPress={onPressEmoji}
              source={require('@assets/like.gif')}
              name={'liked'}
              index={0}
              plusValue={plusValue.current}
            />
            <ImageGif
              onPress={onPressEmoji}
              source={require('@assets/love.gif')}
              name={'love'}
              index={1}
              plusValue={plusValue.current}
            />
            <ImageGif
              onPress={onPressEmoji}
              source={require('@assets/haha.gif')}
              name={'haha'}
              index={2}
              plusValue={plusValue.current}
            />
            <ImageGif
              onPress={onPressEmoji}
              source={require('@assets/wow.gif')}
              name={'wow'}
              index={3}
              plusValue={plusValue.current}
            />
            <ImageGif
              onPress={onPressEmoji}
              source={require('@assets/sad.gif')}
              name={'sad'}
              index={4}
              plusValue={plusValue.current}
            />
            <ImageGif
              onPress={onPressEmoji}
              source={require('@assets/angry.gif')}
              name={'angry'}
              index={5}
              plusValue={plusValue.current}
            />
          </AnimatedView>
        </>
      )}
    </GestureHandlerRootView>
  );
};
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 5,
    width: 250,
    borderRadius: 50,
    position: 'absolute',
    elevation: 10,
    marginLeft: emojiMl,
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
