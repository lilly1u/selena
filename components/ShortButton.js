import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { WindowWidth } from "../globals/Dimensions"

export default ({title, onPress, status}) => {
    if (status == 'Completed') {
        return (
            <TouchableOpacity style={[styles.button, {backgroundColor: '#94CF49', borderColor: '#94CF49'}]} onPress={onPress}>
                <Text style={{color: '#fff'}}>{title}</Text>
            </TouchableOpacity>
        )
    } else if (title == 'Download File') {
        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{color: '#cc3464'}}>{title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={[styles.button, {borderColor: '#000'}]}>
                <Text style={{color: '#000'}}>{title}</Text>
            </TouchableOpacity>
        )
    }    
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: WindowWidth/3,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#cc3464',
        borderWidth: 1,
        backgroundColor: '#fff'
    },
})