import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RenderHtml from 'react-native-render-html';

import Descriptors from '../components/Descriptors';
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
    const price = course.price_rendered;

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

    const createOverview = () => {
        const overview = course.content;
        let source;
        if (overview == '') {
            source = {
                html: `No overview available.`
            };
        } else {
            source = {
                html: `${overview}`
            };
        }

        return(
            source
        );
    }

    const createCategories = () => {
        const categories = [];
        for (let index = 0; index < 3; index++) {
            if (course.categories[index] != undefined) {
                categories.push(course.categories[index].name)
                categories.push(' | ')
            }
        }
        return(
            categories.slice(0,categories.length-1)
        );
    }

    return (
        <View>
            <ScrollView style={{height: WindowHeight - 170}}>
            <View style={styles.info}>
                <Text style={styles.courseTitle}>{courseName}</Text>
                <Text style={styles.instructor}>{instructor}</Text>
                <View style={{flexDirection: 'row', alignContent: 'center'}}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/banner-icon.png')}
                    />
                    <Text style={{color: '#8E8E8E', fontSize: 12, marginBottom: 20}}>Category{'\n'}<Text style={{color: 'white'}}>{createCategories()}</Text></Text>
                </View>
                <View style={styles.divider}/>
                <View style={{flexDirection: 'row', padding: 20, backgroundColor: '#442E66', justifyContent: 'space-between'}}>
                    <Descriptors title={duration} logo={require('../assets/duration-logo.png')}/>
                    <Descriptors title={lessons + ' Lessons'} logo={require('../assets/lessons-logo.png')}/>
                    <Descriptors title={students + ' Students'} logo={require('../assets/students-logo.png')}/>
                </View>
            </View>

            
            
            <View style={styles.container}>
                <Text style={styles.courseOverview}>Overview</Text>
                <RenderHtml
                    contentWidth={WindowWidth}
                    source={createOverview()}
                />
            </View>
            
            </ScrollView>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => enroll()}>
                    <Text style={styles.enroll}>Start Now</Text>
                    <Text style={{color: '#8E8E8E'}}>{price}</Text>
                </TouchableOpacity>
            </View>  
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    enroll: {
        color: '#fff',
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
        position: 'absolute',
        bottom: 10,
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
        marginBottom: 20,
    },
    divider: {
        borderWidth: .5,
        borderColor: '#fff',
    },
    logo: {
        width: 24,
        height: 26,
        marginRight: 5
    },
    courseOverview: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20
    }
});