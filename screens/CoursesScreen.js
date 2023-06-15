import { View, SafeAreaView, StyleSheet, FlatList, ScrollView } from "react-native";

import Header from "../components/Header";
import Card from "../components/Card";

const DATA = [
    {
        title: 'SELENA Primary Arabic',
        instructor: 'Swati Menon',
        image: require('../assets/test-image.png'),
        color: '#389C9C',
    },
    {
        title: 'SELENA Primary Arabic',
        instructor: 'Swati Menon',
        image: require('../assets/test-image.png'),
        color: '#389C9C',
    },
    {
        title: 'SELENA Primary Arabic',
        instructor: 'Swati Menon',
        image: require('../assets/test-image.png'),
        color: '#389C9C',
    },
    {
        title: 'SELENA Primary Arabic',
        instructor: 'Swati Menon',
        image: require('../assets/test-image.png'),
        color: '#389C9C',
    },
  ];

const CourseScreen = () => {
    return (
    <SafeAreaView style={styles.container}>
        <View style={{marginRight: 20, marginLeft: 20, marginTop: 20}}>
            <Header text={"Courses"}/>
        </View>
        <FlatList
        data={DATA}
        renderItem={({item}) => <Card title={item.title} instructor={item.instructor} image={item.image} color={item.color}/>}
        keyExtractor={item => item.title}
        numColumns={2}
        contentContainerStyle={{paddingHorizontal: 20}}
        /> 
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
});

export default CourseScreen;