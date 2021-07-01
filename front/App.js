import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LandingScreen from '../front/src/components/pages/LandingPage/index';  //메인페이지
import LoginScreen from '../front/src/components/pages/LoginPage/index';  //로그인페이지
import SignupScreen from './src/components/pages/SignupPage/index';  //회원가입페이지
import LogoutScreen from './src/components/pages/LogoutPage/index' //로그인 안한 페이지
import ChannelScreen from './src/components/pages/ChannelPage/index' //채널페이지
import VideoScreen from './src/components/pages/VideoPage/index' //동영상 페이지


// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// const HomeStack = createStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen name="Main" component={LandingScreen} />
//       <HomeStack.Screen name="Details" component={DetailsScreen} />
//     </HomeStack.Navigator>
//   );
// }

// const SettingsStack = createStackNavigator();

// function SettingsStackScreen() {
//   return (
//     <SettingsStack.Navigator>
//       <SettingsStack.Screen name="Settings" component={SettingsScreen} />
//       <SettingsStack.Screen name="Details" component={DetailsScreen} />
//     </SettingsStack.Navigator>
//   );
// }

const Stack = createStackNavigator();



function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#272C35',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Video" component={VideoScreen} />
        <Stack.Screen name="Channel" component={ChannelScreen} />
        <Stack.Screen name="Logout" component={LogoutScreen} />
        <Stack.Screen name="Main" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;



// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// const token = true;
// export default function App() {
//   return (
//     <NavigationContainer>
//       {/* {token ? */}
//         {/* <Stack.Screen name="Logout" component={LogoutScreen} /> */}
//         {/* : */}
//         <Tab.Navigator>
//         <Tab.Screen name="Logout" component={LogoutScreen} />
//         <Tab.Screen name="Home" component={LandingScreen} />
//           <Tab.Screen name="Settings" component={SettingsScreen} />
//         </Tab.Navigator>
//       {/* } */}
//     </NavigationContainer>
//   );
// }




