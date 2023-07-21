import { StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import CoursesScreen from '../screens/CoursesScreen';
import LessonsScreen from '../screens/LessonsScreen';
import Browser from '../screens/Browser';

export default CourseFlow = () => {
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