import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splash from '../../assets/splash.jpg';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const SPLASH_SCREEN_TIME = 3000;
    const navigation = useNavigation();


      useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('Main');
        }, SPLASH_SCREEN_TIME);
    
        return () => clearTimeout(timer);
      }, []);

  return (
    <View style={styles.container}>
      <Image source={splash} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // cor de fundo da splash screen
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;