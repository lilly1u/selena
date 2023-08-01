import { SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from '../components/Header';
import Input from "../components/Input";

export default () => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}]}>
            <Header title='Search'/>
            <Input 
                title='Search for lessons' 
                icon={require('../assets/search-icon.png')} 
                style={{width: 350, marginBottom: 20}}
                width={{width: 350}}
            />
        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 20
    },
    logo: {
        width: 24,
        height: 24,
        margin: 15,
    },
});