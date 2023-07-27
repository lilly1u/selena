import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import MyCoursesScreen from '../screens/MyCoursesScreen';
import AllCourseScreen from '../screens/AllCoursesScreen';
import CourseScreen from '../screens/CourseScreen';
import LessonsScreen from '../screens/LessonsScreen';
import Browser from '../screens/Browser';

export default CourseFlow = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator screenOptions={styles.header}>
        <Stack.Screen
          name="My Courses"
          component={MyCoursesScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('All Courses')}
                style={{marginRight: 20}}
                >
                <Text style={{color:'#8E8E8E', fontWeight: '600'}}>View all courses</Text>
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="All Courses"
          component={AllCourseScreen}
          options={styles.back}
        />
        <Stack.Screen
          name="Course"
          component={CourseScreen}
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