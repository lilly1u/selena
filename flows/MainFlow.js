import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeFlow from './HomeFlow';
import CourseFlow from './CourseFlow';
import SearchScreen from '../screens/SearchScreen'
import AccountScreen from '../screens/AccountScreen';

export default () => {
    const Tab = createBottomTabNavigator();
    
    return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;
  
        if (route.name === 'Home') {
          iconName = focused
            ? require('../assets/home-icon-active.png')
            : require('../assets/home-icon.png');
        }else if (route.name === 'Search') {
          iconName = focused
            ? require('../assets/search-icon-active.png')
            : require('../assets/search-icon.png');
        }else if (route.name === 'Courses') {
          iconName = focused
            ? require('../assets/courses-icon-active.png')
            : require('../assets/courses-icon.png');
        }else if (route.name === 'Account') {
          iconName = focused
            ? require('../assets/account-icon-active.png')
            : require('../assets/account-icon.png');
        }
  
        return <Image style={{width: 24, height: 24,}} source={iconName}/>;
      },
      tabBarActiveTintColor: '#FFC700',
      tabBarInactiveTintColor: '#8E8E8E',
      headerShown: false
    })}>
  
      <Tab.Screen name="Home" component={HomeFlow}/>
      <Tab.Screen name="Search" component={SearchScreen} options={styles.header}/>
      <Tab.Screen name="Courses" component={CourseFlow}/>
      <Tab.Screen name="Account" component={AccountScreen} options={styles.header}/>
    </Tab.Navigator>
    )
}

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