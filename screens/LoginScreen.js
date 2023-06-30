import { StyleSheet, Text, View, Image, SafeAreaView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Button from '../components/Button';
import Input from '../components/Input';

const LoginScreen = ({setIsLoggedIn}) => {
  const [loading, setLoading] = useState(true);

  const URI = 'https://myselena.org'
  const [user, setUser] = useState({
    // username: '',
    // password: ''
  })

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

  const handleLogin = () => {
    setIsLoggedIn(true);
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <Image
            style={styles.selenaLogo}
            source={require('../assets/selena-logo.png')}/>

          <Text style={styles.title}>MySelena</Text>

          <Input title='Username or email' icon={require('../assets/user.png')} value={user.username} onChangeText={(input) => setUser({...user, username: input})}/>
          <Input title='Password' icon={require('../assets/pass.png')} value={user.password} onChangeText={(input) => setUser({...user, username: input})}/>

          <Button title='Login' onPress={handleLogin} buttonStyle={{width: 250, height: 50}}/>
          
          <Text style={{color: '#8E8E8E'}}>Don't have an Account? <Text style={{color: '#FFC700'}}>Sign Up</Text></Text>
      
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView> 
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;