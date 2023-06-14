import { View, SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";

export default () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{margin: 20}}>
                <Header text={"Search"}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
});