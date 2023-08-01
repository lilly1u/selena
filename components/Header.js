import { Text, View, StyleSheet } from "react-native"

export default ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginBottom: 20
    },
    title: {
        fontWeight: 'bold',
        color: '#FFC700',
        fontSize: 24,
    }
})