import * as React from 'react';
import { useContext, useEffect, useState} from 'react';
import { Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen'
import CoursesScreen from './screens/CoursesScreen';
import AccountScreen from './screens/AccountScreen';
import ContactScreen from './screens/ContactScreen';
import LessonsScreen from './screens/LessonsScreen';
import LessonScreen from './screens/LessonsScreen';
import Browser from './screens/Browser';

import Providers from './Context';

const HomeFlow = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator 
      screenOptions={styles.header}>
      <Stack.Screen 
        name="Hello"  
        component={HomeScreen}
      />
      <Stack.Screen
        name='Contact'
        component={ContactScreen}
        options={{headerShown: true, headerTitle: '', headerTintColor: '#8E8E8E', headerShadowVisible: false, headerBackTitle: 'Home'}}
      />
    </Stack.Navigator>
  )
}

const CourseFlow = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={styles.header}>
      <Stack.Screen
        name="All Courses"
        component={CoursesScreen}
      />
      <Stack.Screen
        name="Lessons"
        component={LessonsScreen}
      />
      <Stack.Screen
        name="Browser"
        component={Browser}
      />
    </Stack.Navigator>
  )
}

// const SearchFlow = () => {
//   const Stack = createStackNavigator();
//   return (
//     <Stack.Navigator screenOptions={styles.header}>
//       <Stack.Screen
//         name='Search'
//         component={SearchScreen}
//       />
//     </Stack.Navigator>
//   )
// }

const Tab = createBottomTabNavigator();
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
    <Tab.Screen name="Courses" component={CourseFlow}/>
    <Tab.Screen name="Account" component={AccountScreen}/>
  </Tab.Navigator>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Providers>
      <NavigationContainer>
        {isLoggedIn? <MainFlow/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/> }
      </NavigationContainer> 
    </Providers>
  );
}

export default App;

const styles = StyleSheet.create({
  header: {
    headerShown: true, 
    headerTitleAlign: 'left',
    headerLeft: () => null,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#FFC700',
      fontSize: 24,
    },
    headerShadowVisible: false,
      
  }
});