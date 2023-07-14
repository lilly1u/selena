import { View, StyleSheet, ActivityIndicator, Pressable, Text, ScrollView } from "react-native";
import React, { useContext, useState } from 'react';
import { FlashList } from "@shopify/flash-list";
import axios from 'axios';

import Header from "../components/Header";
import Card from "../components/Card";
import DropdownComponent from "../components/Dropdown";
import { TYPE, LANG, GRADE } from "../components/Filters"

import { CurrentUserContext } from '../Context';
import { URIContext } from "../Context";
import { TokenContext } from "../Context";
import Providers from "../Context";

import { WindowHeight, WindowWidth } from '../Dimensions'
import { SafeAreaView } from "react-native-safe-area-context";

const CourseScreen = ({navigation}) => {
  const user = useContext(CurrentUserContext);
  const URI = useContext(URIContext);
  const token = useContext(TokenContext);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [type, setType] = useState('');
  const [lang, setLang] = useState('');
  const [grade, setGrade] = useState('');
    
    const getCourses = async() => {
      try {
        if (!hasMore) {
          return;
        }

        setIsLoading(true);

        const coursesResponse = await axios.get(`${URI}/wp-json/learnpress/v1/courses`,{
          params:{
            page
          },
          headers:{
            Authorization: `Bearer ${token}`
          }
        });

        const newData = coursesResponse.data

        setCourses((prevCourses) => [...prevCourses, ...newData])
        setPage((prevPage) => prevPage + 1)
        setHasMore(newData.length > 0);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
      }
    }

  const getLessons = async(course) => {
    try {
      const id = course.id
      navigation.navigate('Lessons',{id,URI,token,user})
    } catch (error) {
      console.log(error)
    }
  }

  const renderLoader = () => {
    if (isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size='large' color='#aaa'/>
        </View>
      );
    }
    return null;
  };

  const loadMoreItem = () => {
    if (!isLoading && hasMore) {
      getCourses();
    }
  }

  const listFiltered = courses.filter((item) => {
    if (type || lang || grade) {
      return (
        item.name.toLowerCase().includes(type.toLowerCase()) &&
        item.name.toLowerCase().includes(lang.toLowerCase()) &&
        item.name.toLowerCase().includes(grade.toLowerCase())
      )
    }else {
      return courses;
    }
  })
    
  return (
    <SafeAreaView style={styles.container}>
      <Providers user={user} URI={URI} token={token}>
        <View style={{marginTop: 20, flex: 1, height: WindowHeight, width: WindowWidth}}>
          <Header text={"All Courses"} style={{marginLeft: 20}}/>
          <Pressable
            onPress={() => {
              setType('');
              setLang('');
              setGrade('');
            }}
            style={{alignItems: 'center'}}
          >
            <Text>Clear</Text>
          </Pressable>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <DropdownComponent 
              filter={TYPE}
              placeholder='Type'
              setType={setType}
            />
            <DropdownComponent
              filter={LANG}
              placeholder={'Language'}
              setLang={setLang}
            />
            <DropdownComponent 
              filter={GRADE}
              placeholder={'Grade'}
              setGrade={setGrade}
            />
          </View>
            <FlashList
              data={listFiltered}
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
              ListFooterComponent={renderLoader}
              onEndReached={loadMoreItem}
              onEndReachedThreshold={0}
            />
        </View>
      </Providers>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
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
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center'
  }
})

export default CourseScreen;