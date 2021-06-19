import React, { useState, useEffect } from 'react';
import styled from "styled-components";

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native';

function SignupScreen({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  return (
    <Container>
      <StyledTitleText >Register</StyledTitleText>
      <Input onChangeText={setId} placeholder="아이디" value={id} />
      {/* <Input onChangeText={setUserName} placeholder="성명" value={userName} ></Input> */}
      <Input onChangeText={setEmail} placeholder="이메일" value={email} />
      <Input onChangeText={setPassword} placeholder="비밀번호" value={password} />
      <Input onChangeText={setPhone} placeholder="핸드폰" value={phone} />
      <Input onChangeText={setNickName} placeholder="닉네임" value={nickName} />
      {/* <Input onChangeText={setPassword} placeholder="비밀번호 확인" value={password} /> */}

      <SubmitButton>
        <StyledText>저장</StyledText>
      </SubmitButton>    
      {/* <Button title="Go to Home" onPress={() => navigation.push('Main')} />
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}

    </Container >
  );
}
const Container = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;

const Input = styled(TextInput)`
  width: 100%;
  height: 50px;
  border-width: 0.7px;
  border-color: #272c35;
  margin-bottom: 20px;
  padding: 10px;
`;

const SubmitButton = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: #272c35;
  margin-top: 10px;
  border-radius: 100px;
`;

const StyledText = styled.Text`
  text-align: center;
  line-height: 50px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const StyledTitleText = styled.Text`
  color: #000;
  margin-bottom: 30px;
  font-size: 25px;
`;


export default SignupScreen;
