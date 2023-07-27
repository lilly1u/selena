import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useContext, useState } from 'react';
import { FlashList } from "@shopify/flash-list";
import axios from 'axios';

import LongCard from "../components/LongCard";

import { UserTokenContext } from '../Context';
import { URL } from "../Context";

import { WindowHeight, WindowWidth } from '../Dimensions'

const MyCoursesScreen = ({navigation}) => {
  const { userToken } = useContext(UserTokenContext);

  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
    
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
    
  return (
    <View style={styles.container}>
      <View style={{flex: 1, height: WindowHeight, width: WindowWidth}}>
        <FlashList
          data={courses}
          renderItem={({item}) => {
            console.log(item.sections[0].percent)
            return(
              <LongCard
                onPress={() => getCourse(item)} 
                style={styles.border}
                title={item.name} 
                instructor={item.instructor.name} 
                progress={Math.round(item.sections[0].percent)}
                image={{uri: item.image}}
              />
            )
          }}
          numColumns={1}
          contentContainerStyle={{paddingHorizontal: 10}}
          keyExtractor={(item) => item.id}
          estimatedItemSize={233}
          ListFooterComponent={renderLoader}
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
  loader: {
    marginVertical: 16,
    alignItems: 'center'
  },
  clear: {
    alignItems: 'flex-end',
    marginRight: 20
  }
})

export default MyCoursesScreen;