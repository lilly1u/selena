import { View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React, { useContext, useState } from 'react';
import axios from 'axios';

import { URL, UserTokenContext } from '../Context';

const EnrollScreen = ({navigation, route}) => {
    const { course } = route.params;
    const { userToken } = useContext(UserTokenContext);
    const [isLoading, setIsLoading] = useState(false);

    const courseId = course.id;
    const courseName = course.name;
    const instructor = course.instructor.name;
    const duration = course.duration;
    const lessons = course.course_data.result.count_items;
    const students = course.count_students;

    const enroll = async() => {
        try {

            const enrollInCourse = await axios.post(`${URL}/wp-json/learnpress/v1/courses/enroll`, {id: courseId}, {
                headers:{
                  Authorization: `Bearer ${userToken}`
                }
            });

            console.log(enrollInCourse.data.message);
            Alert.alert(`${enrollInCourse.data.status}`, `${enrollInCourse.data.message}`, [
                {text: 'Continue', onPress: () => navigation.navigate('Lessons', {courseId, courseName})},
            ]);
            
        } catch (error) {
            console.log('here',error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.courseTitle}>{courseName}</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => enroll()}>
                <Text style={styles.enroll}>
                Start Now
                </Text>
            </TouchableOpacity>
            <Text>
                Instructor: {instructor}{'\n'}
                Duration: {duration}{'\n'}
                Lessons: {lessons}{'\n'}
                Students: {students}{'\n'}
            </Text>
        </View>
    );
}

export default EnrollScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },
    enroll: {
        color: '#fff' 
    },
    button: {
        backgroundColor: '#202020',
        borderRadius: 8,
        height: 50,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    courseTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFC700',
    }
});