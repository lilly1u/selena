import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

export default ({title, instructor, image, color}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.card}>
                <View style={[styles.square, {backgroundColor: color}]}>
                    <Image source={image} style={{width:145, height:144}}/>
                </View>
                <View style={{width: 145, height: 50}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.name}>{instructor}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    card: {
        width: 165,
        height: 214,
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: {height: 4},
        shadowOpacity: .25,
        shadowRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginRight: 20,
        position: 'relative'
    },
    square: {
        width: 145,
        height: 144,
        backgroundColor: '#C4C4C4',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 15,
        color: '#202020',
        fontWeight: '600',
        marginTop: 10,
    },
    name: {
        fontSize: 11,
        color: '#8E8E8E',
        fontWeight: '600',
    },
});
