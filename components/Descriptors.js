import { View, Image, Text, StyleSheet } from "react-native";

export default ({title, logo, style}) => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
                style={[styles.logo, style]}
                source={logo}
            />
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 24,
        height: 24,
    },
    text: {
        color: '#fff',
    }
})
