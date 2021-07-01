import React, { useState } from "react";

import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
//import LoginScreen from "../LoginPage";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba", // 각 영상의 id값
    title: "쯩훈 첫 영상이에요", // 영상의 제목
    channelImg: "", // 채널 이미지
    channelName: "쯩훈티비",
    count: '4천회', // 영상 조회수
    time: '4시간전', // 영상 올린시간
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63", // 각 영상의 id값
    title: "영상제목", // 영상의 제목
    channelImg: "", // 채널 이미지
    channelName: "쯩훈티비",
    count: '1만회', // 영상 조회수
    time: '1시간전', // 영상 올린시간
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72", // 각 영상의 id값
    title: "제목제목제목", // 영상의 제목
    channelImg: "", // 채널 이미지
    channelName: "쯩훈티비",
    count: '1만회', // 영상 조회수
    time: '30분전', // 영상 올린시간
  }
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <>
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    </TouchableOpacity>
    <Container style={{}}>
      <View style={styles.channel}>
        <View style={[styles.channelImg]}>
          <Text>{item.channelImg}</Text>
        </View>
        <View style={styles.channelInfo}>
          <Text style={[styles.title, textColor]}>{item.title}</Text>
          <View style={styles.textbox}>
            <Text>{item.channelName}</Text>
            <Text style={[styles.count]}>{item.count}</Text>
            <Text style={[styles.time]}>{item.time}</Text>
          </View>
        </View>
      </View>

    </Container>
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
          <View style={styles.header}>
            <Text>로고</Text>
            <Text>검색</Text>
            <Text>프로필</Text>
          </View>
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
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20
  },
  item: {
    padding: 60,
  },
  channel: {
    flexDirection: 'row',
  },
  channelImg: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#000',
    marginTop: 10,
  },
  channelInfo: {
    flexDirection: 'column',
    marginLeft: 0,
    marginTop: 10
  },
  textbox: {
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 5
  },
  title: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 2
  },
  count: {
    marginLeft: 10,
  },
  time: {
    marginLeft: 10,
  },
});

const Container = styled(SafeAreaView)`
  flexDirection: row;
  margin: 0 20px 10px 20px;
`;

export default LandingScreen;