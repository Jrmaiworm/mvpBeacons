import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export async function requestLocationPermission(setLocation) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission required',
        message:
          'This app needs to access your location in order to show your position on the map.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({lat: latitude, lng: longitude});
          // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        error => {
          console.log(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {}
};
