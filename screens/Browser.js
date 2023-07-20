import axios from 'axios'
import React,{useEffect, useState, useContext} from 'react'
import { View,Text, Pressable,Image } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { UserTokenContext, URL } from '../Context';


const Browser = ({navigation, route}) => {
    const {lessonId} = route.params
    const { userToken } = useContext(UserTokenContext);

    const [lesson, setLesson] = useState({})
    const [pdfLink, setPdfLink] = useState('')
    const [pdf, setPdf] = useState()
    useEffect(()=>{
        const getLesson = async() => {
            const extractDownloadLink = (content) => {
                const start = content.indexOf('href=') + 6;
                const end = content.indexOf('download><') - 2
                const string = content.substring(start,end)
                
                return string;
              };
            
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
        getLesson()
        
    },[])

   
      const getPdf = async() => {
        const result = await WebBrowser.openBrowserAsync(pdfLink)
        setPdf(result)
      }
      
  return (
    <View>
        <Text>{lessonId}</Text>
        <Text>{lesson.name}</Text>
        <Text>{pdfLink}</Text>
        <Pressable onPress={()=> downloadPDF()}>
            <Text onPress={getPdf}>
                Download Pdf
            </Text>
            
        </Pressable>
        
    </View>
  )
}

export default Browser;
