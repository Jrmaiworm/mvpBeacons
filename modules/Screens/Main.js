import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LocationTracker from '../components/locationTracker';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página Principal</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Mapa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BeaconRegister')}>
        <Text style={styles.buttonText}>Cadastrar Beacons</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3b5998',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10, // Adicionei um espaçamento entre os botões
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MainScreen;
