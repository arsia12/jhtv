import * as React from 'react';
import {Button, View, Text} from 'react-native';

function LoginScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>

      {/* <Button title="Go to Home" onPress={() => navigation.push('Main')} /> */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default LoginScreen;
