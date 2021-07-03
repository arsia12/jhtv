import React from 'react'

import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

function VideoScreen() {
    return (
        <Container>
            <View style={styles.video}>
                <Text>동영상</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.info_title}>영상제목</Text>
                <View style={styles.info2}>
                    <Text style={styles.num}>조회수</Text>
                    <Text>업로드 시간</Text>
                </View>
                <View style={styles.thum}>
                    <Text style={styles.like}>좋아요</Text>
                    <Text>싫어요</Text>
                </View>
            </View>
            <View style={styles.channel}>
                <View style={styles.channelText}>
                    <View style={styles.ch_img}></View>
                    <View style={styles.channelInfo}> 
                        <Text style={styles.channelName}>채널명</Text>
                        <Text style={styles.subs}>구독자</Text>
                    </View>
                </View>
                <Text>구독중</Text>
            </View>
            <View style={styles.comment}>
                <View style={styles.cm_title}>
                    <Text>댓글</Text>
                    <Text>개수</Text>
                </View>
                <View style={styles.user_comment}>
                    <View style={styles.user_img}></View>
                    <Text style={styles.user_text}>유저 댓글</Text>
                </View>
            </View>
            <View style={styles.videolist}>
                <Text></Text>
            </View>
        </Container>
    )
}

const Container = styled(SafeAreaView)`
  flexDirection: column;
`;

const styles = StyleSheet.create({
    video: {
        height: 200,
        backgroundColor: '#123',
    },
    info: {
        flexDirection: 'column',
        height: 110,
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    info_title: {
        fontSize: 18,
        marginTop: 10,
        marginLeft: 10
    },
    info2: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10
    },
    num: {
        marginRight: 10
    },
    thum: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 30
    },
    like:{
        marginRight: 40
    },
    channel: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
    },
    channelText: {
        flexDirection: 'row',
    },
    ch_img: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#000',
    },
    channelInfo:{
        marginLeft: 10,
        marginTop: 2
    },
    channelName:{
        marginBottom: 6
    },
    subs:{
    },
    comment: {
        height: 80,
        borderTopWidth:2,
        borderBottomWidth: 2,
        borderTopColor: '#ddd',
        borderBottomColor: '#ddd',
    },
    cm_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 60,
        marginTop: 10,
        marginLeft: 10,
    },
    user_comment: {
        flexDirection: 'row',
    },
    user_img: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#456',
        marginLeft: 10,
        marginTop: 8
    },
    user_text:{
        marginTop:13,
        marginLeft: 10
    },
    videolist: {
        height: 200,
        backgroundColor: '#236'
    }
});

export default VideoScreen;
