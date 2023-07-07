import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import React, { useContext, useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

import Header from "../components/Header";
import Card from "../components/Card";

import { CurrentUserContext } from '../Context';
import { URIContext } from "../Context";
import { TokenContext } from "../Context";

import { WindowHeight, WindowWidth } from '../Dimensions'
import { SafeAreaView } from "react-native-safe-area-context";

const CourseScreen = ({navigation}) => {
  const user = useContext(CurrentUserContext);
  const URI = useContext(URIContext);
  const token = useContext(TokenContext);

  const [courses, setCourses] = useState({})
  const [page, setPage] = useState(1)
    
  useEffect(()=>{
    const getCourses = async() => {
      try {
        const coursesResponse = (await axios.get(`${URI}/wp-json/learnpress/v1/courses`,{
          params:{
            page
          },
          headers:{
            Authorization: `Bearer ${token}`
          }
        })).data
        setCourses(coursesResponse)
        // console.log(coursesResponse)
      } catch (error) {
        console.log(error)
      }
    }

    getCourses()
  },[page])

  const getLessons = async(course) => {
    try {
      const id = course.id
      navigation.navigate('Lessons',{id,URI,token,user})
    } catch (error) {
      console.log(error)
    }
  }  
    
  return (
    <SafeAreaView style={styles.bigcontainer}>
      <View style={{marginTop: 20, height: WindowHeight, width: WindowWidth}}>
        <Header text={"All Courses"}/>
        <CurrentUserContext.Provider value={{user}}>
          <TokenContext.Provider value={{token}}>
            {/* <View style={styles.buttons}>
              <Text style={styles.button} onPress={()=>{
                  setPage(page === 1? page: page - 1)
                  // console.log(`###################################################################################${page}`)
              }}>-</Text>
              <Text style={styles.button} onPress={()=>setPage(page + 1)}>+</Text>
            </View> */}
            <FlashList
              data={courses}
              renderItem={({item}) => {
                return(
                  <Card
                    onPress={() => getLessons(item)} 
                    style={styles.border} 
                    title={item.name} 
                    instructor={item.instructor.name} 
                    image={{uri: item.image}}
                  />
                )
              }}
              numColumns={2}
              contentContainerStyle={{paddingHorizontal: 20}}
              keyExtractor={(item) => item.id}
              estimatedItemSize={233}
            />
          </TokenContext.Provider>
        </CurrentUserContext.Provider>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bigcontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  container: {
    backgroundColor: 'white',
    paddingBottom: 20
  },
  input: {
    fontSize: 24,
    padding: 20,
    textAlign: 'center',
    width: WindowWidth * 0.9,
    backgroundColor: '#67aaf9',
    fontWeight: 'bold',
    color: '#fdf7fa',
    marginBottom: 8
  },
  border: {
    borderRadius: 30
  },
  buttons: {
    flexDirection: 'row',
    gap: 40,
    padding: 10
  },
  button: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})

export default CourseScreen;