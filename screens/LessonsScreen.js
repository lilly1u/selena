import axios from 'axios'
import React,{ useState, useEffect, useContext } from 'react'
import { View, FlatList,Text, Pressable, StyleSheet } from 'react-native'
import { WindowHeight, WindowWidth } from '../Dimensions'
import { UserTokenContext } from '../Context'
import { URL } from '../Context'

const LessonsScreen = ({navigation, route}) => {
    const { id } = route.params
    const { userToken } = useContext(UserTokenContext);

    const [lessons, setLessons] = useState({})
    useEffect(()=>{
        const getLessons = async() => {
            try {
                const response = await axios.get(`${URL}/wp-json/learnpress/v1/courses/${id}`,{
                    headers:{
                        Authorization: `Bearer ${userToken}`
                    }
                })
                const lessonsResponse = response.data.sections[0].items
                setLessons(lessonsResponse)
                // console.log(lessonsResponse)
            } catch (error) {
                console.log("Problem here",error)
            }
        }
        getLessons()
    },[])

    const goToLesson = (lesson) =>{
        navigation.navigate('Lesson', {lessonId: lesson.id})
    }
    
  return (
    <View style={styles.container}>
        
        <FlatList
            data={lessons}
            renderItem={({item}) => {
                return(
                    <Pressable
                        onPress={() => goToLesson(item)}
                    ><Text style={styles.input}>{item.title}</Text></Pressable>
                )
            }}

        />
    </View>

  )
}

export default LessonScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fdf7fa' 
    },
    input: {
      fontSize: 24,
      padding: 20,
      textAlign: 'center',
      width: WindowWidth * 0.9,
      backgroundColor: '#57cc99',
      fontWeight: 'bold',
      color: '#fdf7fa',
      marginBottom: 8
    },
    border: {
      borderRadius: 30
    }
  })
