import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import MyCoursesScreen from '../screens/MyCoursesScreen';
import AllCourseScreen from '../screens/AllCoursesScreen';
import EnrollScreen from '../screens/EnrollScreen';
import LessonsScreen from '../screens/LessonsScreen';

export default () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="My Courses"
          component={MyCoursesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="All Courses"
          component={AllCourseScreen}
          options={{headerShown: false}}
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
      </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    back: {
      headerTitle: '', 
      headerBackTitle: 'Back', 
      headerBackTitleVisible: true,
      headerShadowVisible: false,
      headerTintColor: '#8E8E8E',
    },
  });