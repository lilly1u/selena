import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import MainFlow from './flows/MainFlow';
import Providers from './globals/Context';
import { NavigationTheme } from './globals/Theme';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaProvider>
      <Providers>
        <NavigationContainer theme={NavigationTheme}>
          {isLoggedIn? <MainFlow/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/> }
        </NavigationContainer> 
      </Providers>
    </SafeAreaProvider>
  );
}

export default App;