import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import ContactScreen from '../screens/ContactScreen';

import { DisplayNameContext } from '../Context';

export default () => {
    const { displayName } = useContext(DisplayNameContext);
    const name = displayName.split(' ');
    let firstName = name[0];
  
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator 
        screenOptions={styles.header}>
        <Stack.Screen 
          name='HomeFlow'
          component={HomeScreen}
          options={{title: 'Hello ' + firstName + '!'}}
        />
        <Stack.Screen
          name='Contact'
          component={ContactScreen}
          options={{headerShown: true, headerTitle: '', headerTintColor: '#8E8E8E', headerShadowVisible: false, headerBackTitle: 'Home'}}
        />
      </Stack.Navigator>
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