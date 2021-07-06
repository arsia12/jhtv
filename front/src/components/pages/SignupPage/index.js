import React, { useState, createRef, useEffect } from 'react';
import { Auth } from '../../../store/stores/Stores';

import styled from "styled-components";
// import { exp } from 'react-native/Libraries/Animated/Easing';

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Button
} from 'react-native';

// function SignupScreen({ navigation }) {
//   const auth = Auth();
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [nickname, setNickname] = useState("");

//   // const onUsernameHandler = (e) => {
//   //   setUsername(e.currentTarget.value);
//   // }

//   // const onEmailHandler = (e) => {
//   //   setEmail(e.currentTarget.value);
//   // }

//   // const onPasswordHnadler = (e) => {
//   //   setPassword(e.currentTarget.value);
//   // }

//   // const onPhoneHandler = (e) => {
//   //   setPhone(e.currentTarget.value);
//   // }

//   // const onNickNameHandler = (e) => {
//   //   setNickname(e.currentTarget.value);
//   // }
//   const onRegisterHandler = async() => {
//     const data = {
//       username,
//       password,
//       phone,
//       email,
//       nickname
//     }
//     await auth._registCallApi(data);
//     //console.log(data);
//   }

//   return (
//     <View style={{ flex: 1,  backgroundColor: '#fff'}}>
//     <Container>
//       <StyledTitleText >Register</StyledTitleText>
//       <Input onChangeText={setUsername} autoCapitalize='none' placeholder="아이디" value={username} />
//       {/* <Input onChangeText={setUserName} placeholder="성명" value={userName} ></Input> */}
//       <Input onChangeText={setEmail} autoCapitalize='none' placeholder="이메일" value={email} />
//       <Input onChangeText={setPassword} autoCapitalize='none' secureTextEntry={true} placeholder="비밀번호" value={password} />
//       <Input onChangeText={setPhone} autoCapitalize='none' placeholder="핸드폰" value={phone} />
//       <Input onChangeText={setNickname} autoCapitalize='none' placeholder="닉네임" value={nickname} />
//       {/* <Input onChangeText={setPassword} placeholder="비밀번호 확인" value={password} /> */}

//       <SubmitButton onPress={onRegisterHandler}>
//         <StyledText>저장</StyledText>
//       </SubmitButton> 
//       {/* <Button title="Go to Home" onPress={() => navigation.push('Main')} />
//       <Button title="Go back" onPress={() => navigation.goBack()} /> */}
//     </Container >
//     </View>
//   );
// }

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


// export default SignupScreen;




const SignupScreen = ({ navigation }) => {
  const auth = Auth();
  const [userNickName, setUserNickName] = useState("");
  const [userName, setUserName] = useState('');
  // const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordchk, setUserPasswordchk] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [errortext, setErrortext] = useState('');
  const [errortext2, setErrortext2] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const idInputRef = createRef();
  const gradeInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordchkInputRef = createRef();
  const nameInputRef = createRef();

  const handleSubmitButton = async () => {
    setErrortext('');

    if (!userNickName) {
      alert('이름을 입력해주세요');
      return;
    }
    if (!userEmail) {
      alert('이메일을 입력해주세요');
      return;
    }
    if (!userPhone) {
      alert('휴대폰 번호를 입력해주세요');
      return;
    }
    if (!userName) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!userPassword) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    if (userPasswordchk != userPassword) {
      alert('비밀번호가 일치하지 않습니다');
      return;
    }
  
    const data = {
      userName,
      userEmail,
      userPhone,
      userPassword,
      userNickName
    };
    await auth._registCallApi(data);
  };


  if (isRegistraionSuccess) {
    return (
      <Container>
        <View >
          <View
            style={{
              height: 13,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          </View>
          <View
            style={{
              height: 7,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'black', fontSize: 20 }}>
              회원가입이 완료되었습니다.
            </Text>
          </View>

          <View style={{ height: 20, justifyContent: 'center' }}>
            <View style={styles.btnArea}>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  로그인하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  }
  return (
    <Container>
      <View style={{ flex: 3 }} />
      <StyledTitleText >Register</StyledTitleText>

      <Input
        placeholder={'성명'}
        onChangeText={(userName) => setUserName(userName)}
        ref={idInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          passwordInputRef.current && passwordInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <Input
        placeholder={'이메일'}
        onChangeText={(userEmail) => setUserEmail(userEmail)}
        ref={nameInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          gradeInputRef.current && gradeInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <Input
        placeholder={'휴대폰'}
        onChangeText={(userPhone) => setUserPhone(userPhone)}
        ref={nameInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          gradeInputRef.current && gradeInputRef.current.focus()
        }
        blurOnSubmit={false}
      />

      <Input
        placeholder={'닉네임'}
        onChangeText={(userNickName) => setUserNickName(userNickName)}
        ref={nameInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          gradeInputRef.current && gradeInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <Input
        secureTextEntry={true}
        placeholder={'비밀번호'}
        onChangeText={(userPassword) => setUserPassword(userPassword)}
        ref={passwordInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          passwordchkInputRef.current && passwordchkInputRef.current.focus()
        }
        blurOnSubmit={false}
      />
      <Input
        secureTextEntry={true}
        placeholder={'비밀번호 확인'}
        onChangeText={(UserPasswordchk) =>
          setUserPasswordchk(UserPasswordchk)
        }
        ref={passwordchkInputRef}
        returnKeyType="next"
        onSubmitEditing={() =>
          nameInputRef.current && nameInputRef.current.focus()
        }
        blurOnSubmit={false}
      />

      <View style={{ flex: 0.5, justifyContent: 'center' }}>
        {userPassword !== userPasswordchk ? (
          <Text >
            비밀번호가 일치하지 않습니다.
          </Text>
        ) : null}
      </View>


      <View style={{ flex: 0.7, justifyContent: 'center' }}>
        {errortext2 !== '' ? (
          <Text>{errortext2}</Text>
        ) : null}
      </View>

      <SubmitButton onPress={handleSubmitButton}>
        <StyledText>저장</StyledText>
      </SubmitButton>

      <View style={{ flex: 3 }} />
    </Container>
  );
};

// const styles = StyleSheet.create({

// });

export default SignupScreen;