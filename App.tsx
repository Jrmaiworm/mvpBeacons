import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './modules/Screens/Main';
import Home from './modules/Screens/Home';
import BeaconRegister from './modules/Screens/BeaconRegister';
import SplashScreen from './modules/components/SplashScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Mapa' }} />
        <Stack.Screen name="BeaconRegister" component={BeaconRegister} options={{ title: 'Cadastrar Beacons' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
