import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { Auth } from '../../../store/stores/Stores';

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
  const auth = Auth();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  // const onUsernameHandler = (e) => {
  //   setUsername(e.currentTarget.value);
  // }

  // const onEmailHandler = (e) => {
  //   setEmail(e.currentTarget.value);
  // }

  // const onPasswordHnadler = (e) => {
  //   setPassword(e.currentTarget.value);
  // }

  // const onPhoneHandler = (e) => {
  //   setPhone(e.currentTarget.value);
  // }

  // const onNickNameHandler = (e) => {
  //   setNickname(e.currentTarget.value);
  // }
  const onRegisterHandler = async() => {
    const data = {
      username,
      password,
      phone,
      email,
      nickname
    }
    await auth._registCallApi(data);
  }

  return (
    <View style={{ flex: 1,  backgroundColor: '#fff'}}>
    <Container>
      <StyledTitleText >Register</StyledTitleText>
      <Input onChangeText={setUsername} autoCapitalize='none' placeholder="아이디" value={username} onChange={onUsernameHandler}/>
      {/* <Input onChangeText={setUserName} placeholder="성명" value={userName} ></Input> */}
      <Input onChangeText={setEmail} autoCapitalize='none' placeholder="이메일" value={email} onChange={onEmailHandler}/>
      <Input onChangeText={setPassword} autoCapitalize='none' secureTextEntry={true} placeholder="비밀번호" value={password} onChange={onPasswordHnadler}/>
      <Input onChangeText={setPhone} autoCapitalize='none' placeholder="핸드폰" value={phone} onChange={onPhoneHandler}/>
      <Input onChangeText={setNickname} autoCapitalize='none' placeholder="닉네임" value={nickname} onChange={onNickNameHandler}/>
      {/* <Input onChangeText={setPassword} placeholder="비밀번호 확인" value={password} /> */}

      <SubmitButton onPress={onRegisterHandler}>
        <StyledText>저장</StyledText>
      </SubmitButton>    
      {/* <Button title="Go to Home" onPress={() => navigation.push('Main')} />
      <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </Container >
    </View>
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
