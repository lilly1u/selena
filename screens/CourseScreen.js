import { View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { URL, UserTokenContext } from '../Context';

const CourseScreen = ({navigation, route}) => {
    const { courseId, courseName, courseStatus} = route.params;
    const { userToken } = useContext(UserTokenContext);
    const [ status, setStatus ] = useState('');

    const renderStatus = () => {
        if (courseStatus == 'finished') {
            setStatus('Finished');
        } else {
            setStatus('Start Now');
        }
    };

    useEffect(() => {
        renderStatus();
    }, [])

    const enroll = async() => {
        try {
            console.log(courseId)
            const course = await axios.post(`${URL}/wp-json/learnpress/v1/courses/enroll`, {id: courseId},{
                headers:{
                  Authorization: `Bearer ${userToken}`
                }
            });
            console.log(course);
            navigation.navigate('Lessons', {courseId, courseName});
        } catch (error) {
            console.log('here',error);
        }
    };

    return (
        <View>
            <Text>{courseName}</Text>
            <TouchableOpacity 
                style={styles.enroll}
                onPress={() => enroll()}>
                <Text>
                {status}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default CourseScreen;

const styles = StyleSheet.create({
    enroll: {
        backgroundColor: 'yellow'
    }
});