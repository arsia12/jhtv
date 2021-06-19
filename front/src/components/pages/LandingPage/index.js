import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import LoginScreen from "../LoginPage";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", // 각 영상의 id값
    title: "First Item", // 영상의 제목
    channelImg: "", // 채널 이미지
    count: '', // 영상 조회수
    time: '', // 영상 올린시간
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", // 각 영상의 id값
    title: "Second Item", // 영상의 제목
    channelImg: "", // 채널 이미지
    count: '', // 영상 조회수
    time: '', // 영상 올린시간
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72", // 각 영상의 id값
    title: "Third Item", // 영상의 제목
    channelImg: "", // 채널 이미지
    count: '', // 영상 조회수
    time: '', // 영상 올린시간
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>

    </TouchableOpacity>
    <Text>{item.channelImg}</Text>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </>
);

const LandingScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#272c35" : "#fff";
    const color = item.id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const token = true;
  return (
    <SafeAreaView style={styles.container}>
      {!token ? <LoginScreen /> :
        <>
          <View style={styles.header}></View>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {

  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 60,
  },
  channelImg: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LandingScreen;