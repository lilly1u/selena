import axios from 'axios'
import React,{ useState, useEffect, useContext } from 'react'
import { View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { WindowHeight, WindowWidth } from '../Dimensions'
import { UserTokenContext } from '../Context'
import { URL } from '../Context'

const LessonsScreen = ({navigation, route}) => {
    const { courseId, courseName } = route.params
    const { userToken } = useContext(UserTokenContext);

    const [lessons, setLessons] = useState([]);

    const getLessons = async() => {
        try {
            console.log('Course ID: ', courseId);
            console.log('Course Name: ', courseName);
            const response = await axios.get(`${URL}/wp-json/learnpress/v1/courses/${courseId}`,{
                headers:{
                    Authorization: `Bearer ${userToken}`
                }
            })
            const lessonsResponse = response.data.sections[0].items
            setLessons(lessonsResponse)
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getLessons();
    }, [])

    const goToLesson = async(lesson) =>{
        try {
            navigation.navigate('Browser', {lessonId: lesson.id})
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <View style={styles.container}>
        <Text style={styles.name}>{courseName}</Text>
        <FlatList
            data={lessons}
            renderItem={({item}) => {
                return(
                    <TouchableOpacity
                        onPress={() => goToLesson(item)}
                        >
                        <View style={styles.lesson}>
                            <Text style={{fontWeight: 'bold', color: '#202020', textAlign: 'left',}}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )
            }}
            contentContainerStyle={{alignItems: 'center',}}
        />
    </View>

  )
}

export default LessonsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingLeft: 20,
      paddingRight: 20
    },
    lesson: {
      fontSize: 15,
      padding: 20,
      borderRadius: 8,
      width: WindowWidth * 0.9,
      marginBottom: 8,
      backgroundColor: '#fff',
      shadowColor: 'black',
      shadowOffset: {height: 4},
      shadowOpacity: .25,
      shadowRadius: 2,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FFC700',
      paddingBottom: 10
    },
    border: {
      borderRadius: 30
    }
  })
