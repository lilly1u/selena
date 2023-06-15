import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default ({title, placeholder, fieldStyle}) => {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
                style={[styles.input, fieldStyle]}
                placeholder={placeholder}
                placeholderTextColor='#8E8E8E'
                onChangeText={(text) => setText(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        width: 350,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 20,
        paddingBottom: 18,
        paddingTop: 18
    },
    title: {
        color: '#202020',
        fontWeight: '600',
        fontSize: 11,
        marginBottom: 5,
    }
})