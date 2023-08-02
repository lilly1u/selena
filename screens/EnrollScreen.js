import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from "react-native-webview";

import { URL, UserTokenContext } from '../globals/Context';
import { WindowHeight } from '../globals/Dimensions';

export default ({navigation, route}) => {
    const insets = useSafeAreaInsets();

    const { course } = route.params;
    const { userToken } = useContext(UserTokenContext);
    const [isLoading, setIsLoading] = useState(false);

    const courseId = course.id;
    const courseName = course.name;
    const instructor = course.instructor.name;
    const duration = course.duration;
    const lessons = course.course_data.result.count_items;
    const students = course.count_students;
    const categories = course.categories[0].name;
    const overview = course.content;
    
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
        <ScrollView>
        <View style={[styles.container, {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,}]}>
            <View>
                <Text style={styles.courseTitle}>{courseName}</Text>
                <Text>
                Instructor: {instructor}{'\n'}
                Categories: {categories}{'\n'}
                Duration: {duration}{'\n'}
                Lessons: {lessons}{'\n'}
                Students: {students}{'\n'}
                </Text>
            </View>
            <Text>{overview}</Text>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => enroll()}>
                    <Text style={styles.enroll}>
                    Start Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    enroll: {
        color: '#fff' 
    },
    button: {
        backgroundColor: '#202020',
        position: 'absolute',
        borderRadius: 8,
        height: 50,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#FFC700',
    }
});