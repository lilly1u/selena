import { StyleSheet, Text, TextInput, View, Image, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useState, useContext } from 'react';
import axios from 'axios'

import Button from '../components/Button';
import Input from '../components/Input';

import { CurrentUserContext } from '../Context';
import { URIContext } from '../Context';
import { TokenContext } from '../Context';
import Providers from '../Context';

const LoginScreen = ({setIsLoggedIn}) => {
  const URI = useContext(URIContext);
  const [user, setUser] = useState({username: 'SelenaContent', password: 'eattheredpizza'});
  const token = useContext(TokenContext);

  const getToken = async() => {
    try {
      const response = await axios.post(`${URI}/wp-json/learnpress/v1/token`, user)
      const token = response.data.token
      if (await validateToken(token) === 200){
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.warn({message: 'validation error', error})
    }
  }

  const validateToken = async(token) => {
    try {
      const response = await axios.post(`${URI}/wp-json/learnpress/v1/token/validate`,{},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return(response.data.data.status)
    } catch (error) {
      return({error})
    }
  }

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior="padding">
    <View style={styles.container}>
      <Providers user={user} URI={URI} token={token}>
          <Image
            style={styles.selenaLogo}
            source={require('../assets/selena-logo.png')}/>

          <Text style={styles.title}>MySelena</Text>

          <CurrentUserContext.Provider value={{user, setUser}}>
            <View style={styles.inputContainer}>
              <Image
                style={styles.logo}
                source={require('../assets/user.png')}
              />
              <TextInput
                placeholder='Username or email'
                value={user.username}
                onChangeText={(input) => setUser({...user, username: input})}
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
                value={user.password}
                onChangeText={(input) => setUser({...user, password: input})}
                style={styles.input}
                placeholderTextColor='#8E8E8E'
              />
            </View>

            <TokenContext.Provider value={{token}}>
              <Button title='Login' onPress={getToken} buttonStyle={{width: 250, height: 50}}/>
            </TokenContext.Provider>
          </CurrentUserContext.Provider>
          
          <Text style={{color: '#8E8E8E'}}>Don't have an Account? <Text style={{color: '#FFC700'}}>Sign Up</Text></Text>
      </Providers>
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