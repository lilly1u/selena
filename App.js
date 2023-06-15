import * as React from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen'
import CoursesScreen from './screens/CoursesScreen';
import AccountScreen from './screens/AccountScreen';

import ContactScreen from './screens/ContactScreen';

const HomeFlow = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
        name="Home"  
        component={HomeScreen}
      />
      <Stack.Screen
        name='Contact'
        component={ContactScreen}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const MainFlow = () => {
    return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? require('./assets/home-icon-active.png')
            : require('./assets/home-icon.png');
        }else if (route.name === 'Search') {
          iconName = focused
            ? require('./assets/search-icon-active.png')
            : require('./assets/search-icon.png');
        }else if (route.name === 'Courses') {
          iconName = focused
            ? require('./assets/courses-icon-active.png')
            : require('./assets/courses-icon.png');
        }else if (route.name === 'Account') {
          iconName = focused
            ? require('./assets/account-icon-active.png')
            : require('./assets/account-icon.png');
        }

        return <Image style={{width: 24, height: 24,}} source={iconName}/>;
      },
      tabBarActiveTintColor: '#FFC700',
      tabBarInactiveTintColor: '#8E8E8E',
      headerShown: false
    })}>

      <Tab.Screen name="Home" component={HomeFlow}/>
      <Tab.Screen name="Search" component={SearchScreen}/>
      <Tab.Screen name="Courses" component={CoursesScreen}/>
      <Tab.Screen name="Account" component={AccountScreen}/>
    </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      {isLoggedIn? <MainFlow/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/>}
    </NavigationContainer>
  );
}

export default App;