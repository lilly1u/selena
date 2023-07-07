import React from "react";
import { Text, StyleSheet } from "react-native";

export default ({text, style}) => {
    return (
        <Text style={[styles.title, style]}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#FFC700',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20
    }
})