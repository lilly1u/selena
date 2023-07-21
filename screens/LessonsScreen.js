import axios from 'axios'
import React,{ useState, useEffect, useContext } from 'react'
import { View, FlatList,Text, Pressable, StyleSheet } from 'react-native'
import { WindowHeight, WindowWidth } from '../Dimensions'
import { UserTokenContext } from '../Context'
import { URL } from '../Context'

const LessonsScreen = ({navigation, route}) => {
    const { id } = route.params
    const { userToken } = useContext(UserTokenContext);

    const [lessons, setLessons] = useState([]);

    const getLessons = async() => {
        try {
            console.log('Course ID: ', id)
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

export default LessonsScreen;

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
