import { View, SafeAreaView, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native";

import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{margin: 20}}>
                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity>
                            <Image source={require('../assets/edit-icon.png')} style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.placeholder}>
                            <Image 
                                source={require('../assets/account-pic-placeholder.png')}
                                style={{width: 100, height: 100}}
                            />
                        </View>
                        <Text style={styles.name}>Jane Doe</Text>
                        <InputField title='Username' placeholder='janedoe123'/>
                        <InputField title='First Name' placeholder='Jane'/>
                        <InputField title='Last Name' placeholder='Doe'/>
                        <InputField title='E-mail Address' placeholder='janedoe123@gmail.com'/>
                        <InputField title='Password' placeholder='*************'/>
                        <Button title='Change Password' buttonStyle={{width: 350, height: 50, marginTop: 10}}/>
                    </View>
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
    placeholder: {
        width: 200,
        height: 200,
        borderRadius: 200/2,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    name: {
        fontWeight: 600,
        fontSize: 24,
        margin: 10
    }
});