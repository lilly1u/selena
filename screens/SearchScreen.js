import { View, SafeAreaView, StyleSheet, Image, TextInput } from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import Input from "../components/Input";

export default () => {
    const [text, setText] = useState('');
    return (
        <SafeAreaView style={styles.container}>
            <View style={{margin: 20}}>
                <Header text={"Search"}/>
                <Input 
                    title='Search for lessons' 
                    icon={require('../assets/search-icon.png')} 
                    style={{width: 350, marginBottom: 20}}
                    width={{width: 350}}
                />
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
    logo: {
        width: 350,
        height: 50,
        width: 24,
        height: 24,
        margin: 15,
    },
});