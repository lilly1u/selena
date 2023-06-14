import { StyleSheet, View, Image, TextInput } from 'react-native';
import { useState } from 'react';

const Input = ({title, icon, style, width}) => {
    const [text, setText] = useState('');
    return(
      <View style={[styles.inputContainer, style]}>
          <Image
              style={styles.logo}
              source={icon}
            />
          <TextInput
            style={[styles.input, width]}
            placeholder={title}
            placeholderTextColor='#8E8E8E'
            onChangeText={(text) => setText(text)}
          />
      </View>
    );
  }

  const styles = StyleSheet.create({
    inputContainer: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#8E8E8E',
        marginBottom: 15,
        flexDirection:'row',
        alignItems: 'flex-start',
      },
      logo: {
        width: 24,
        height: 24,
        margin: 13,
      },
      input: {
        width: 250,
        height: 50,
      },
  })

  export default Input;