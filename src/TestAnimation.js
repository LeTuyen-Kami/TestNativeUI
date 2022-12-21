import React from 'react';
import {View, Text, Button} from 'react-native';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const TestAnimation = () => {
  const value = useSharedValue(-100);

  const x = useSharedValue(1);
  const style = useAnimatedStyle(() => {
    const vl = value.value;
    const newValue = Math.sqrt(1 - (vl / 100) * (vl / 100)) * 50 * x.value;
    return {
      transform: [
        {
          translateY: 100 + newValue,
        },
        {
          translateX: 100 + value.value,
        },
      ],
    };
  });
  return (
    <View>
      <Text>{value.value}</Text>
      <Animated.View style={style}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
            borderRadius: 25,
          }}
        />
      </Animated.View>
      <Button
        title={'test'}
        onPress={() =>
          (value.value = withTiming(
            100,
            {
              duration: 1000,
            },
            () => {
              x.value = -x.value;
              value.value = withTiming(-100, {
                duration: 1000,
              });
            },
          ))
        }
      />
    </View>
  );
};

export default TestAnimation;
