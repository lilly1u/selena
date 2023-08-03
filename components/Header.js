import { Text, View, StyleSheet } from "react-native"

export default ({title, style}) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    title: {
        fontWeight: 'bold',
        color: '#FFC700',
        fontSize: 24,
    }
})