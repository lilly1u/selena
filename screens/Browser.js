import axios from 'axios'
import React,{useEffect, useState, useContext} from 'react'
import { View, Text, Pressable, StyleSheet} from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { UserTokenContext, URL } from '../Context';

const Browser = ({navigation, route}) => {
    const { lessonId } = route.params
    const { userToken } = useContext(UserTokenContext);

    const [lesson, setLesson] = useState({})
    const [pdfLink, setPdfLink] = useState('')
    const [pdf, setPdf] = useState()

    const extractDownloadLink = (content) => {
        const start = content.indexOf('href=') + 6;
        const end = content.indexOf('download><') - 2;
        const string = content.substring(start,end);
        return string;
    };

    const getLesson = async() => {
        try {

            const response = await axios.get(`${URL}/wp-json/learnpress/v1/lessons/${lessonId}`,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            
            setPdfLink(extractDownloadLink(response.data.content))
            setLesson(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getLesson()
    },[])

   
    const getPdf = async() => {
    const result = await WebBrowser.openBrowserAsync(pdfLink)
    setPdf(result)
    }
      
  return (
    <View style={styles.container}>
        <Text style={styles.name}>{lesson.name}</Text>
        <Pressable onPress={()=> downloadPDF()}>
            <Text onPress={getPdf}>
                Download Pdf
            </Text>
            
        </Pressable>
        
    </View>
  )
}

export default Browser;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingLeft: 20,
      paddingRight: 20
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFC700',
        paddingBottom: 10
      },
  })