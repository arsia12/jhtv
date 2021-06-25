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

const StyledTitleText = styled.Text`
  color: #000;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;
`;

const LoginButton = styled(TouchableOpacity)`
  width: 75%;
  height: 55px;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #272c35;
  color: #000;
`;

const RegisterButton = styled(TouchableOpacity)`
  width: 75%;
  height: 55px;
  padding: 3px;
  background-color: #272c35;
  margin-top: 15px;
  border-radius: 8px;
`;

const StyledText = styled.Text`
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  font-weight: 700;
`;

function LogoutScreen({ navigation }) {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <StyledTitleText>APP</StyledTitleText>
            <LoginButton>
                <StyledText onPress={() => navigation.navigate('Login')}>LOGIN</StyledText>
            </LoginButton>
            <RegisterButton>
                <StyledText onPress={() => navigation.navigate('SignUp')} style={{ color: "#fff" }}>REGISTER</StyledText>
            </RegisterButton>
        </View>
    );
}

export default LogoutScreen;