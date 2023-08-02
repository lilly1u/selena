import React, { memo } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default ({title, instructor, image, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.card}>
                <Image source={image} style={styles.square}/>
                <View style={styles.text}>
                    <Text style={styles.title}>{title}<Text style={styles.instructor}>{'\n'}{instructor}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginRight: 20,
        marginBottom: 20, 
    },
    card: {
        width: 165,
        height: 230,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {height: 4},
        shadowOpacity: .25,
        shadowRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    square: {
        width: 165,
        height: 154,
        backgroundColor: '#C4C4C4',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    text: {
        width: 145, 
        height: 50, 
        flexGrow: 1
    },
    title: {
        fontSize: 15,
        color: '#202020',
        fontWeight: '600',
        marginTop: 5,
        flexGrow: 1
    },
    instructor: {
        fontSize: 11,
        color: '#8E8E8E',
        fontWeight: '600',
        flexGrow: 1
    },
});
