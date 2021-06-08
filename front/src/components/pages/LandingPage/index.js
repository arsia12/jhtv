import * as React from 'react';
import {Button, View, Text} from 'react-native';

function LandingScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>메인 화면</Text>
      <Button title="로그인" onPress={() => navigation.navigate('Login')} />
      <Button title="회원가입" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

export default LandingScreen;
