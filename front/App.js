import * as React from 'react';
// import {Button, View, Text} from 'react-native';w
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LandingScreen from '../front/src/components/pages/LandingPage/index';
import LoginScreen from '../front/src/components/pages/LoginPage/index';
import SignupScreen from './src/components/pages/SignupPage/index';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Main" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
