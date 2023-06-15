import { View, SafeAreaView, StyleSheet } from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import Input from "../components/Input";

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{margin: 20}}>
                <Header text={"Contact Us!"}/>
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