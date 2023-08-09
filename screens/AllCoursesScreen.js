import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text, FlatList } from "react-native";
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from "../components/Header";
import Card from "../components/Card";
import DropdownComponent from "../components/Dropdown";
import { TYPE, LANG, GRADE } from "../components/Filters"
import { UserTokenContext, URL } from '../globals/Context';
import { WindowWidth } from '../globals/Dimensions'
import { ScrollView } from "react-native-gesture-handler";


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
  const [clear, setClear] = useState(false);
  const [child1ComponentKey, setChild1ComponentKey] = useState(0);
  const [child2ComponentKey, setChild2ComponentKey] = useState(1);
  const [child3ComponentKey, setChild3ComponentKey] = useState(2);

  const handleChangeText = () => {
    setChild1ComponentKey(child1ComponentKey + 1);
    setChild2ComponentKey(child2ComponentKey + 1);
    setChild3ComponentKey(child3ComponentKey + 1);
  };

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
      paddingRight: insets.right,
      }]}>
      <ScrollView>
        <View style={styles.header}>
          <Header title='All Courses'/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <DropdownComponent 
              filter={TYPE}
              placeholder='Type'
              setType={setType}
              clear={clear}
              key={child1ComponentKey}
              
          
            />
            <DropdownComponent
              filter={LANG}
              placeholder='Language'
              setLang={setLang}
              clear={clear}
              key={child2ComponentKey}
              
             
            />
            <DropdownComponent 
              filter={GRADE}
              placeholder='Grade'
              setGrade={setGrade}
              clear={clear}
              key={child3ComponentKey}
             
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setType('');
              setLang('');
              setGrade('');
              setClear(true);
              handleChangeText();
              
             

            }}
            style={styles.clear}
            >
            <Text>clear all</Text>
          </TouchableOpacity>
        </View>
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
          initialNumToRender={6}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          contentContainerStyle={{marginLeft: 20, marginRight: 20}}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    paddingRight: 20, 
    paddingLeft: 20
  },
  border: {
    borderRadius: 30
  },
  loader: {
    marginVertical: 16,
    alignItems: 'center'
  },
  clear: {
    alignItems: 'flex-end',
    marginBottom: 10
  }
})


