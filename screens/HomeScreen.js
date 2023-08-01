import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DisplayNameContext } from '../globals/Context';
import Header from '../components/Header'

export default () => { 
    const insets = useSafeAreaInsets();

    const { displayName } = useContext(DisplayNameContext);
    const name = displayName.split(' ');
    let firstName = name[0];

    return (
        <ScrollView style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}]}>
            <Header title={'Hello ' + firstName + '!'}/>
                <View style={styles.box}>
                    <Text style={styles.title}>Welcome to <Text style={{color: '#8E8E8E'}}>Social Emotional Learning Enhancement Application</Text></Text>
                </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
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