import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default ({title, onPress, buttonStyle}) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC700',
    },
    text: {
        color: '#202020',
        fontWeight: 'bold',
    },
});