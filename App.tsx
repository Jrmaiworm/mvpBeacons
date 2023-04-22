import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './modules/Screens/Main';
import Home from './modules/Screens/Home';
import BeaconRegister from './modules/Screens/BeaconRegister';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ title: 'Página Principal' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Mapa' }} />
        <Stack.Screen name="BeaconRegister" component={BeaconRegister} options={{ title: 'Cadastrar Beacons' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
