import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useContext, useEffect } from 'react';

import Button from '../components/Button';

import { CurrentUserContext } from '../Context';
import { UserTokenContext } from '../Context';

const LoginScreen = ({setIsLoggedIn}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { getToken, userToken, validateToken } = useContext(UserTokenContext);

  useEffect(() => {
    if (userToken !== '') {
      const isValid = validateToken(userToken);
      if (isValid) {
        setIsLoggedIn(true)
        console.log("User token: ", userToken);
      }
    }
  }, [userToken])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
            <Image
              style={styles.selenaLogo}
              source={require('../assets/selena-logo.png')}/>

            <Text style={styles.title}>MySelena</Text>

            <View>
              <View style={styles.inputContainer}>
                <Image
                  style={styles.logo}
                  source={require('../assets/user.png')}
                />
                <TextInput
                  placeholder='Username or email'
                  value={currentUser.username}
                  onChangeText={(input) => setCurrentUser({...currentUser, username: input})}
                  style={styles.input}
                  placeholderTextColor='#8E8E8E'
                />
              </View>

              <View style={styles.inputContainer}>
                <Image
                  style={styles.logo}
                  source={require('../assets/pass.png')}
                />
                <TextInput
                  placeholder='Password'
                  value={currentUser.password}
                  onChangeText={(input) => setCurrentUser({...currentUser, password: input})}
                  style={styles.input}
                  placeholderTextColor='#8E8E8E'
                />
              </View>
              
              
              <Button 
              title='Login' 
              onPress={getToken} 
              buttonStyle={{width: 250, height: 50}}
              />
            </View>
            
            <Text style={{color: '#8E8E8E'}}>Don't have an Account? <Text style={{color: '#FFC700'}}>Sign Up</Text></Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
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
  title: {
    color: '#FFC700',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
  },
  selenaLogo: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    margin: 20,
  },
  text: {
    color: '#202020',
    fontWeight: 'bold',
  },
});

export default LoginScreen;