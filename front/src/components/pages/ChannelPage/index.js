import React from 'react'

import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";


const ChannelInfo = [
    {
        id: "", // 각 영상의 id값
        channelThumbnail: "", // 채널 썸네일
        channelImg: "", // 채널 이미지
        channelName: "", // 채널명
        channelSubsCount: "", // 채널 구독자수
        channelSubs: "", // 채널 (구독중, 구독)
    },
];

function ChannelScreen() {
    return (
        <>
            <View style={styles.header}>
                <Text>{ChannelInfo.channelName}</Text>
            </View>
            <View style={styles.thumbNail}></View>
            <View style={styles.channelInfo}>
                <View style={styles.channel}>
                    <Text style={[styles.channelImg]}></Text>
                </View>
                <Text style={styles.channelName}>
                    쯩훈TV
                </Text>
                <Text style={styles.subsCount}>
                    구독자 1만명
                </Text>
                <Text style={styles.subs}>
                    구독중
                </Text>
            </View>
            <Text style={styles.uploadText}>업로드 한 동영상</Text>
            <Container>

            </Container>
        </>
    )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  margin: 18px;
  background-color: #ddd;
`;

const styles = StyleSheet.create({

    header: {
        width: '100%',
        height: 100,
        backgroundColor: '#272c35',
        color: "#fff",
    },
    thumbNail: {
        width: '100%',
        height: 80,
        backgroundColor: '#e45d67'
    },
    channelInfo: {
        flexDirection: 'column',
        width: '100%',
        height: 100,
    },
    channel: {
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,
        borderRadius: 50,
        backgroundColor: '#000',
        marginTop: 15,
        marginLeft: 15
    },
    channelName: {
        marginLeft: 95,
        marginTop: -65,
        fontSize: 22
    },
    subsCount: {
        marginLeft: 95,
        marginTop: 3,
        fontSize: 13
    },
    subs: {
        marginLeft: 95,
        marginTop: 8,
    },
    uploadText: {
        fontSize: 17,
        marginTop: 20,
        marginLeft: 18,
    },
});


export default ChannelScreen
