import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import MyCoursesScreen from '../screens/MyCoursesScreen';
import AllCourseScreen from '../screens/AllCoursesScreen';
import EnrollScreen from '../screens/EnrollScreen';
import LessonsScreen from '../screens/LessonsScreen';
import Browser from '../screens/Browser';

export default () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="My Courses"
          component={MyCoursesScreen}
        />
        <Stack.Screen
          name="All Courses"
          component={AllCourseScreen}
        />
        <Stack.Screen
          name="Enroll"
          component={EnrollScreen}
          options={styles.back}
        />
        <Stack.Screen
          name="Lessons"
          component={LessonsScreen}
          options={styles.back}
        />
        <Stack.Screen
          name="Browser"
          component={Browser}
          options={styles.back}
        />
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    header: {
      headerShown: true, 
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#FFC700',
        fontSize: 24,
      },
      headerShadowVisible: false,
    },
    back: {
      headerTitle: '', 
      headerBackTitle: 'back', 
      headerBackTitleVisible: true, 
      headerTintColor: '#8E8E8E'
    },
  });