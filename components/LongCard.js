import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Progress from 'react-native-progress';

export default ({title, instructor, image, progress, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.card}>
                <Image source={image} style={styles.square}/>
                <View style={styles.text}>
                    <Text style={styles.instructor}>
                        {instructor}{'\n'}
                        <Text style={styles.title}>{title}</Text>
                    </Text>
                    <Progress.Bar progress={progress/100} width={330} color="#FFC700" unfilledColor="#eee" borderColor="#eee"/>
                    <Text style={styles.percent}>course progress: {progress}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    card: {
        width: 350,
        height: 225,
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
        width: 350,
        height: 140,
        backgroundColor: '#C4C4C4',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    text: {
        width: 330, 
        height: 60,
        margin: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 15,
        color: '#202020',
        fontWeight: '600',
        flexGrow: 1
    },
    instructor: {
        fontSize: 12,
        color: '#89D1F5',
        fontWeight: '400',
        flexGrow: 1
    },
    percent: {
        fontSize: 12,
        fontWeight: '400',
        flexGrow: 1
    },
});
