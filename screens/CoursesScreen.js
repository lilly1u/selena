import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useState } from 'react';
import axios from 'axios'
import { Dropdown } from 'react-native-element-dropdown';

import Header from "../components/Header";
import Card from "../components/Card";

// import DropdownComponent from "../components/Dropdown";

const DATA = [
    {
        title: 'SELENA Primary Arabic',
        instructor: 'Swati Menon',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-GtXhBl.jpeg'},
        category: ['Type', 'Arabic', 'Primary School']
    },
    {
        title: 'SELENA Primary One-to-Ones Spanish',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-a8SCCV.jpeg'},
        category: ['Type', 'One-to-Ones', 'Primary School', 'Spanish']
    },
    {
        title: 'SELENA Intermediate Spanish',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-7SrkjM.jpeg'},
        category: ['Type', 'Intermediate', 'Spanish']
    },
    {
        title: 'SELENA Middle School One-to-Ones Spanish',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-n4J6r6.jpeg'},
        category: ['Type', 'Middle School', 'One-to-Ones', 'Spanish']
    },
    {
        title: 'SELENA Middle School One-to-Ones English',
        instructor: 'Karlee Kategianes',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-iGG6NX.jpeg'},
        category: ['Type', 'English', 'Intermediate', 'One-to-Ones']
    },
    {
        title: 'SELENA High School Audio Scripts English',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-LKOPTA.jpeg'},
        category: ['Type', 'Audio Scripts', 'English', 'High School']
    },
]

const TYPE = [
    { label: 'Type', value: '0' },
    { label: 'One-to-Ones', value: '1' },
    { label: 'Audio Scripts', value: '2' },
    { label: 'Workbooks', value: '3' },
    { label: 'Audio Exercises', value: '4' },
    { label: 'Activity Guides', value: '5' },
    { label: 'Action Videos', value: '6' },
    { label: 'Lesson Plans', value: '7' },
    { label: 'Powerpoints', value: '8' },
    { label: 'Selfie Videos', value: '9' },
    { label: 'Cartoon Videos', value: '10' },
  ];

const CourseScreen = () => {
  const [type, setType] = useState('Type');
  
  const DropdownComponent = ({type}) => {
    const [isFocus, setIsFocus] = useState(false);
  
    return (
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={TYPE}
          search={false}
          maxHeight={300}
          labelField="label"
          label={type}
          placeholder={!isFocus ? 'Type' : '   '}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setType(item.label);
            setIsFocus(false);
          }}
        />
        
      </View>
    );
  };

  const listFiltered = DATA.filter(item => item.category.includes(type));

  return (
  <SafeAreaView style={styles.bigcontainer}>
      <View style={{marginRight: 20, marginLeft: 20, marginTop: 20}}>
          <Header text={"All Courses"}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <DropdownComponent type={type}/>
          </View>
      </View>
      <FlatList
      data={listFiltered}
      renderItem={({item}) => 
        <Card title={item.title} instructor={item.instructor} image={item.image} color={item.color}/>}
      keyExtractor={item => item.title}
      numColumns={2}
      contentContainerStyle={{paddingHorizontal: 20}}
      /> 
  </SafeAreaView>
  );
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
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width: 103.33,
      
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
      
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default CourseScreen;