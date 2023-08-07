import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native"
import { WindowWidth } from '../globals/Dimensions';

export default ({title, onPress, completed}) => {
    const renderCheckmark = () => {
        if (completed == "completed") {
            return require('../assets/green-check.png');
        }
        return require('../assets/gray-check.png');
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.lesson}>
                <Text style={{fontWeight: 'bold', color: '#202020', textAlign: 'left',}}>{title}</Text>
                <Image style={styles.check} source={renderCheckmark()}/>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    lesson: {
      fontSize: 15,
      padding: 20,
      borderRadius: 8,
      width: WindowWidth * 0.9,
      marginBottom: 8,
      backgroundColor: '#F9FAFC',
      shadowColor: 'black',
      shadowOffset: {height: 4},
      shadowOpacity: .25,
      shadowRadius: 2,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    check: {
        height: 11.84,
        width: 15.19,
    }
  })