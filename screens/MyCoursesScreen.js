import { View, StyleSheet, ActivityIndicator, FlatList, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import LongCard from "../components/LongCard";
import { UserTokenContext, URL } from '../globals/Context';
import { WindowHeight, WindowWidth } from '../globals/Dimensions'

export default ({navigation}) => {
  const { userToken } = useContext(UserTokenContext);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    getCourses()
  }, []) 

    
  const getCourses = async() => {
    try {
      if (!hasMore) {
        return;
      }

      setIsLoading(true);

      const coursesResponse = await axios.get(`${URL}/wp-json/learnpress/v1/courses/?learned=true`, {
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
      navigation.navigate('Lessons',  {courseId: course.id, courseName: course.name});
    } catch (error) {
      console.log(error)
    }
  }

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20}}>
        <Text style={{fontWeight: 'bold', color: '#FFC700', fontSize: 24,}}>My Courses</Text>
        <TouchableOpacity onPress={() => navigation.navigate('All Courses')}>
          <Text>View All Courses</Text>
        </TouchableOpacity>
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

  const coursePercent = (item) => {
    if (item.sections[0] == undefined) {
      return(
        0
      );
    } else {
      return(
        item.sections[0].percent
      );
    }
  }

  return (
    <View style={[styles.container, {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,}]}>
      <View style={{flex: 1, height: WindowHeight, width: WindowWidth}}>
        <FlatList
          data={courses}
          renderItem={({item}) => {
            return(
              <LongCard
                onPress={() => getCourse(item)} 
                style={styles.border}
                title={item.name} 
                instructor={item.instructor.name} 
                progress={Math.round(coursePercent(item))}
                image={{uri: item.image}}
              />
            )
          }}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: 10}}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderLoader}
          ListHeaderComponent={renderHeader}
          onEndReached={loadMoreItem}
          onEndReachedThreshold={0}
        />
      </View>
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
    marginVertical: 16,
    alignItems: 'center'
  },
})