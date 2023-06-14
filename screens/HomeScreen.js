import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';


const HomeScreen = () => {
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={{margin: 20}}>
                <Header text={"Hello Jane!"}/>
                <View style={styles.box}>
                    <Image source={require('../assets/welcome-illustration.png')} style={{resizeMode:'cover', position:'absolute', alignSelf:'flex-end'}}/>
                    <Text style={styles.title}>Welcome to <Text style={{color: '#8E8E8E'}}>Social Emotional Learning Enhancement Application</Text></Text>
                </View>
                <Text style={styles.subheading}>Recent</Text>
                <View style={{alignItems:'flex-start', flexDirection:'row'}}>
                    <Card image={require('../assets/test-image.png')} color={'#389C9C'}/>
                    <Card image={require('../illustrations/Croods-The-Feedback.png')} color={'#F81CA0'}/>
                </View>
                <Text style={styles.subheading}>Reccomended</Text>
                <View style={{alignItems:'flex-start', flexDirection:'row'}}>
                    <Card image={require('../assets/test-image.png')} color={'#389C9C'}/>
                    <Card image={require('../illustrations/Croods-The-Feedback.png')} color={'#F81CA0'}/>
                </View>
                <Button title='Contact Us!' buttonStyle={{width: 350, height: 50}}/>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
    box: {
        width: 350, 
        height: 216, 
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: {height: 4},
        shadowOpacity: .25,
        shadowRadius: 3,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontWeight: 600,
        fontSize: 32,
        width: 256, 
        height: 195, 
        margin: 10,
        color: '#FFC700',
    },
    subheading: {
        color: '#202020',
        fontSize: 15,
        fontWeight: 600
    }
});

export default HomeScreen;