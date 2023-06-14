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

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{margin: 20}}>
                <ScrollView>
                    <Header text={"Courses"}/>
                    <FlatList 
                        data={DATA}
                        renderItem={({item}) => <Card title={item.title} instructor={item.instructor} image={item.image} color={item.color}/>}
                        keyExtractor={item => item.title}
                        numColumns={2}
                    />
                    <Card image={require('../assets/test-image.png')} color={'#389C9C'}/>
                    <Card image={require('../illustrations/Croods-The-Feedback.png')} color={'#F81CA0'}/>
                </ScrollView>
                
            </View>
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