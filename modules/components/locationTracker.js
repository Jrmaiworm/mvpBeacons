import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const LocationTracker = ({onLocationUpdate}) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const coords = position.coords;
        setLocation(coords);
     // Chame a função callback com a localização atualizada
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, interval: 1000, distanceFilter: 0.10},
    );

    return () => Geolocation.clearWatch(watchId);
  }, []); // Adicione onLocationUpdate como dependência do useEffect

  return (
    <View>
      {location && (
        <>
          <Text style={{color:'#fff'}}>
            Lat: {location.latitude}, Long: {location.longitude}
          </Text>
           <Text style={{color:'#fff'}}>
            Altitude: {location.altitude}
          </Text>
          <Text style={{color:'#fff'}}>
            Velocidade: {location.speed}
          </Text>
        </>
      )}
    </View>
  );
};

export default LocationTracker;
