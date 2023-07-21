import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './screens/LoginScreen';
import MainFlow from './flows/MainFlow';

import Providers from './Context';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Providers>
      <NavigationContainer>
        {isLoggedIn? <MainFlow/> : <LoginScreen setIsLoggedIn={setIsLoggedIn}/> }
      </NavigationContainer> 
    </Providers>
  );
}

export default App;