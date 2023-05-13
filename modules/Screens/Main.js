import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';


const backgroundImage = require('../../assets/back.png');

const MainScreen = ({ navigation }) => {

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Mvp Beacons</Text>

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
