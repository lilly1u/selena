import { StyleSheet, Text, View, Image, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Button from '../components/Button';


const HomeScreen = () => {
    return (
    <SafeAreaView style={styles.container}>
        <View style={{margin: 20}}>
            <Header text={"Hello!"}/>
            <View style={styles.box}>
                <View style={{width: 256, height: 195, margin: 10}}>
                    <Text style={{fontWeight: 600, fontSize: 32, color: '#FFC700'}}>Welcome to</Text>
                    <Text style={{fontWeight: 600, fontSize: 32, color: '#8E8E8E'}}>Social Emotional Learning Enhancement Application</Text>
                </View>
                <Image source={require('./assets/welcome-illustration.png')}/>
            </View>
            <Card image={require('../assets/test-image.png')} color={'#389C9C'}/>
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
    },
    title: {
        fontWeight: 'bold',
        fontSize: 32,
    },
});

export default HomeScreen;