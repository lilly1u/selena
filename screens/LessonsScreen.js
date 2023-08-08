import axios from 'axios';
import React,{ useState, useEffect, useContext, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Lesson from '../components/Lesson';
import { WindowWidth } from '../globals/Dimensions';
import { UserTokenContext, URL } from '../globals/Context';

export default ({navigation, route}) => {
    const { courseId, courseName } = route.params
    const { userToken } = useContext(UserTokenContext);

    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            getLessons();
            return () => getLessons();
        }, [navigation])
    );

    const getLessons = async() => {
        try {
            console.log('Course ID: ', courseId);
            console.log('Course Name: ', courseName);
            setIsLoading(true);
            const response = await axios.get(`${URL}/wp-json/learnpress/v1/courses/${courseId}`,{
                headers:{
                    Authorization: `Bearer ${userToken}`
                }
            })
            if (response.data.sections[0] == undefined) {
                setLessons({});
            } else {
                const lessonsResponse = response.data.sections[0].items;
                setLessons(lessonsResponse);
            }
            setIsLoading(false);           
        } catch (error) {
            setIsLoading(false); 
            console.log(error)
        }
    }

    const goToLesson = (lesson) => {
        try {
            navigation.navigate('Lesson', {lessonId: lesson.id, courseId, courseName})
        } catch (error) {
            console.log(error);
        }
    }
    
    if (isLoading) {
        return (
            <View style={styles.loader}>
              <ActivityIndicator size='large' color='#aaa'/>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                    
                <FlatList
                    data={lessons}
                    renderItem={({item}) => {
                        return(
                            <Lesson title={item.title} onPress={() => goToLesson(item)} completed={item.status}/>
                        )
                    }}
                    contentContainerStyle={{alignItems: 'center'}}
                    ListHeaderComponent={() => {return(
                        <Text style={styles.name}>{courseName}</Text>
                    )}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    lesson: {
      fontSize: 15,
      padding: 20,
      borderRadius: 8,
      width: WindowWidth * 0.9,
      marginBottom: 8,
      backgroundColor: '#F9FAFC',
      shadowColor: 'black',
      shadowOffset: {height: 4},
      shadowOpacity: .25,
      shadowRadius: 2,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFC700',
      paddingBottom: 10,
    },
    border: {
      borderRadius: 30
    },
    loader: {
        marginVertical: 16,
        alignItems: 'center'
      },
  })
