import { View, StyleSheet, ActivityIndicator, Pressable, Text, FlatList } from "react-native";
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import Header from '../components/Header';
import Card from "../components/Card";
import DropdownComponent from "../components/Dropdown";
import { TYPE, LANG, GRADE } from "../components/Filters"
import { UserTokenContext, URL } from '../globals/Context';
import { WindowHeight, WindowWidth } from '../globals/Dimensions'

export default ({navigation}) => {
  const insets = useSafeAreaInsets();
  const { userToken } = useContext(UserTokenContext);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [type, setType] = useState('');
  const [lang, setLang] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    getCourses()
  }, [])
    
  const getCourses = async() => {
    try {
      if (!hasMore) {
        return;
      }

      setIsLoading(true);

      const coursesResponse = await axios.get(`${URL}/wp-json/learnpress/v1/courses`, {
        params:{
          page
        },
        headers:{
          Authorization: `Bearer ${userToken}`
        }
      });

      const newData = coursesResponse.data

      setCourses((prevCourses) => [...prevCourses, ...newData])
      setPage((prevPage) => prevPage + 1)
      setHasMore(newData.length > 0);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }

  const getCourse = (course) => {
    try {
      if (course.course_data.status == '') {
        navigation.navigate('Enroll', {course: course})
      } else {
        navigation.navigate('Lessons', {courseId: course.id, courseName: course.name})
      };
    } catch (error) {
      console.log(error)
    }
  }

  const renderHeader = () => {
    return (
      <View>
        <Text style={{fontWeight: 'bold', color: '#FFC700', fontSize: 24}}>All Courses</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <DropdownComponent 
            filter={TYPE}
            placeholder='Type'
            setType={setType}
          />
          <DropdownComponent
            filter={LANG}
            placeholder='Language'
            setLang={setLang}
          />
          <DropdownComponent 
            filter={GRADE}
            placeholder='Grade'
            setGrade={setGrade}
          />
        </View>
        <Pressable
          onPress={() => {
            setType('');
            setLang('');
            setGrade('');
          }}
          style={styles.clear}
          >
          <Text style={{fontWeight: 'bold'}}>clear all</Text>
        </Pressable>
      </View>
    );
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
    <View style={[styles.container, {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,}]}>
      <FlatList
        data={listFiltered}
        renderItem={({item}) => {
          return(
            <Card
              onPress={() => getCourse(item)} 
              style={styles.border}
              title={item.name} 
              instructor={item.instructor.name} 
              image={{uri: item.image}}
            />
          )
        }}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 10}}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderLoader}
        ListHeaderComponent={renderHeader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loader: {
    marginVertical: WindowHeight/2,
    alignItems: 'center'
  },
  clear: {
    alignItems: 'flex-end',
    marginRight: 20
  }
})

