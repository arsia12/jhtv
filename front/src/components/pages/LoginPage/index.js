import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import styled from 'styled-components/native';

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

const KaKaoButton = styled(TouchableOpacity)`
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

// const RegisterdText = styled.Text`
//   margin-top: 20px;
//   color: #555;
// `;

// const styles = StyleSheet.create({
//   input: {
//     width: '100%',
//     height: 50,
//     margin: 12,
//     borderWidth: 1,
//     marginBottom: 20,
//     padding: 10,
//   },
//   submitButton: {
//     width: '100%',
//     height: 50,
//     backgroundColor: 'tomato',
//   },
//   submitButtonText: {
//     textAlign: 'center',
//     lineHeight: 50,
//   },
// });

function LoginScreen({navigation}) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState(null);

  const login = (e, p) => {
    console.log(e, p);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <Container>
      <StyledTitleText >Login</StyledTitleText>
      <Input onChangeText={onChangeEmail} placeholder="이메일" value={email} />
      <Input
        onChangeText={onChangePassword}
        value={password}
        placeholder="비밀번호"
        keyboardType="numeric"
      />

      <SubmitButton
        //style={styles.submitButton}
        onPress={() => login(email, password)}>
        <StyledText>로그인</StyledText>
      </SubmitButton>

      <KaKaoButton>
        <StyledText style={{backgroundColor: '#F7CB01'}}>
          카카오 로그인
        </StyledText>
      </KaKaoButton>
      {/* <RegisterdText onPress={() => navigation.navigate('SignUp')}>처음이시라면, 회원가입이 필요해요 :)</RegisterdText> */}
    </Container>
    </View>
  );
}

export default LoginScreen;
