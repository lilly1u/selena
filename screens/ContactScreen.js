import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{margin: 20}}>
                    <Header text={"Contact Us!"}/>
                    <InputField title='Your Name'/>
                    <InputField title='Your Email'/>
                    <InputField title='Subject'/>
                    <InputField title='Message' fieldStyle={{width: 350, height: 280}}/>
                    <Button title='Submit'/>
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
    logo: {
        width: 350,
        height: 50,
        width: 24,
        height: 24,
        margin: 15,
    },
});