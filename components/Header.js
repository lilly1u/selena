import React from "react";
import { Text, StyleSheet } from "react-native";

export default ({text}) => {
    return (
        <Text style={styles.title}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#FFC700',
        fontWeight: 'bold',
        fontSize: 24,
    }
})