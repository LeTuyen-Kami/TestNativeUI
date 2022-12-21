import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Reaction from './Reaction';

const Comment = props => {
  return (
    <View style={style.container}>
      <Image source={require('@assets/ic_like_fill.png')} style={style.image} />
      <View style={{flex: 1, marginLeft: 10}}>
        <View style={style.content}>
          <View style={style.containerName}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={style.name}>
              {props.name}
            </Text>
            <Text style={style.time}>{props.createAt}</Text>
          </View>
          <Text>{props.comment}</Text>
        </View>
        <View style={style.containerIcon}>
          <View
            style={{
              flexDirection: 'row',
              width: '30%',
              justifyContent: 'space-between',
            }}>
            <Reaction
              listImage={props.listImage}
              showBackDrop={props.showBackDrop}
              onPress={props.onPress}
              item={props.item}
              onPressIn={props.onPressIn}
            />
            <Text>Trả Lời</Text>
          </View>
          <Text>Báo cáo</Text>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '70%',
  },
  containerName: {
    flexDirection: 'row',
  },
  time: {
    width: '30%',
    textAlign: 'right',
  },
  containerIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Comment;
