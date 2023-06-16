import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default () => {
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <ScrollView contentContainerStyle={{flexGrow: 1}} style={{margin: 20}}>
                <View>
                    <Header text={"Contact Us!"}/>
                    <Text style={styles.text}>Please let us know how we can be of service</Text>
                    <InputField title='Your Name'/>
                    <InputField title='Your Email'/>
                    <InputField title='Subject'/>
                    <InputField title='Message' multiline={true} fieldStyle={{height: 280}}/>
                    <Button title='Submit' buttonStyle={{marginTop: 10}}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    text: {
        fontWeight: 600,
        fontSize: 15,
        marginBottom: 20
    }
});