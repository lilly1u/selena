import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';

import { URL, UserTokenContext } from '../globals/Context';
import { WindowHeight, WindowWidth } from '../globals/Dimensions';

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

    const source = {
        html: `${overview}`
      };

    return (
        <ScrollView>
        <View style={styles.info}>
            <Text style={styles.courseTitle}>{courseName}</Text>
            <Text style={styles.instructor}>{instructor}</Text>
            <View style={styles.divider}/>
            <Text style={{color: 'white'}}>
            Categories: {categories}{'\n'}
            Duration: {duration}{'\n'}
            Lessons: {lessons}{'\n'}
            Students: {students}{'\n'}
            </Text>
        </View>
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => enroll()}>
                    <Text style={styles.enroll}>
                    Start Now
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.courseTitle}>Overview</Text>
            <RenderHtml
                contentWidth={WindowWidth}
                source={source}
            />
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
    info: {
        padding: 20,
        backgroundColor: '#442E66'
    },
    button: {
        margin: 10,
        backgroundColor: '#202020',
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
    },
    instructor: {
        fontWeight: 'normal',
        fontSize: 15,
        color: '#89D1F5',
    },
    divider: {
        borderWidth: .5,
        borderColor: '#fff',
    }
});