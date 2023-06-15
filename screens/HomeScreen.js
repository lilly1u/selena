import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

const HomeScreen = ({navigation}) => { 
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
                    <Card title='SELENA Primary Arabic' instructor='Swati Menon' image={{uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-GtXhBl.jpeg'}}/>
                    <Card title='SELENA Primary One-to-Ones Spanish' instructor='Absalaam Thomas' image={{uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-a8SCCV.jpeg'}}/>
                </View>
                <Text style={styles.subheading}>Reccomended</Text>
                <View style={{alignItems:'flex-start', flexDirection:'row'}}>
                    <Card title='SELENA Middle School One-to-Ones English' instructor='Karlee Kategianes' image={{uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-iGG6NX.jpeg'}}/>
                    <Card title='SELENA High School Audio Scripts English' instructor='Absalaam Thomas' image={{uri: 'https://myselena.org/wp-content/uploads/2023/04/qtq80-LKOPTA.jpeg'}}/>
                </View>
                <Button title='Contact Us!' onPress={() => navigation.navigate('Contact')} buttonStyle={{width: 350, height: 50}}/>
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
        fontWeight: 600,
        marginBottom: 20
    }
});

export default HomeScreen;