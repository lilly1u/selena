import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";

import Header from "../components/Header";
import Card from "../components/Card";

const DATA = [
    {
        title: 'SELENA Primary Arabic',
        instructor: 'Swati Menon',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-GtXhBl.jpeg'}
    },
    {
        title: 'SELENA Primary One-to-Ones Spanish',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-a8SCCV.jpeg'}
    },
    {
        title: 'SELENA Intermediate Spanish',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-7SrkjM.jpeg'}
    },
    {
        title: 'SELENA Middle School One-to-Ones Spanish',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-n4J6r6.jpeg'}
    },
    {
        title: 'SELENA Middle School One-to-Ones English',
        instructor: 'Karlee Kategianes',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-iGG6NX.jpeg'}
    },
    {
        title: 'SELENA High School Audio Scripts English',
        instructor: 'Absalaam Thomas',
        image: {uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-LKOPTA.jpeg'}
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