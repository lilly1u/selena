import { StyleSheet, Text, View, Image, SafeAreaView, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import Input from '../components/Input';

const LoginScreen = ({setIsLoggedIn}) => {
    const handleLogin = () => {
      setIsLoggedIn(true);
    }

    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.container}>
            <Image
              style={styles.selenaLogo}
              source={require('../assets/selena-logo.png')}/>
  
            <Text style={styles.title}>MySelena</Text>
  
            <Input title='Username or email' icon={require('../assets/user.png')}/>
            <Input title='Password' icon={require('../assets/pass.png')}/>

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
  }
});

export default LoginScreen;