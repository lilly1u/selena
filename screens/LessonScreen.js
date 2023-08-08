import axios from 'axios'
import React,{ useEffect, useState, useContext, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import {WebView} from 'react-native-webview'
import * as WebBrowser from 'expo-web-browser'
import { UserTokenContext, URL } from '../globals/Context';
import { WindowWidth } from '../globals/Dimensions';

export default ({navigation, route}) => {
    const { lessonId, courseId, courseName } = route.params;
    const { userToken } = useContext(UserTokenContext);

    const [lesson, setLesson] = useState({});
    const [pdfLink, setPdfLink] = useState('');
    const [pdf, setPdf] = useState();
    const [status, setStatus] = useState('');

    useFocusEffect(
        useCallback(() => {
            getLesson();
            return () => getLesson();
        }, [navigation])
    )

    const getLesson = async() => {
        try {
            const response = await axios.get(`${URL}/wp-json/learnpress/v1/lessons/${lessonId}`,{
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
            setPdfLink(extractDownloadLink(response.data.content))
            setLesson(response.data)
            if (response.data.results.status == 'completed') {
                setStatus('Completed')
            } else {
                setStatus('Complete')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const extractDownloadLink = (content) => {
        const start = content.indexOf('href=') + 6;
        const end = content.indexOf('download><') - 2;
        const string = content.substring(start,end);
        return string;
    };

    const getPdf = async() => {
        const result = await WebBrowser.openBrowserAsync(pdfLink)
        setPdf(result)
    }

    const completeLesson = async() => {
        if (status == 'Complete') {
            try {
                const response = await axios.post(`${URL}/wp-json/learnpress/v1/lessons/finish`, {id: lessonId}, {
                    headers:{
                      Authorization: `Bearer ${userToken}`
                    }
                });
                console.log(response.data.message);
                navigation.navigate('Lessons', courseId, courseName)
            } catch (error) {
                console.log(error);
            }
        }
    }
      
    return (
    <View style={styles.container}>
        <Text style={styles.name}>{lesson.name}</Text>
        <WebView
            style={styles.container}
            source={{ uri: pdfLink }}
        />
        <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={getPdf}>
                <Text style={styles.text}>Download File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {borderColor: '#000'}]} onPress={completeLesson}>
                <Text style={[styles.text, {color: '#000'}]}>{status}</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFC700',
        paddingBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 20
    },
    button: {
        height: 50,
        width: WindowWidth/3,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#cc3464',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
    text: {
        color: '#cc3464'
    }
  })