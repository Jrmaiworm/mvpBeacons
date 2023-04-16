import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {apiget} from '../../android/app/src/services/api';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';

///fazer consultar beacons em rota post buscar beacons
///pegar result e enviar em rota post mandar obj info usuario
//fazer rota get da tabela localizacao de usuarios

const ScanBeacons = ({onDeviceFound}) => {
  const manager = new BleManager();

  useEffect(() => {
    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Erro na varredura:', error);
            return;
          }
          if (device) {
            onDeviceFound(device);
          }
        });
      }
    }, true);

    return () => {
      manager.stopDeviceScan();
      subscription.remove();
    };
  }, [manager, onDeviceFound]);

  return null;
};

const Home = ({navigation}) => {
  const [message, setMessage] = useState('Bem-vindo ao buscador de Beacons');
  const [devices, setDevices] = useState([]);
  const [beaconBd, setBeaconsBd] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [location, setLocation] = useState({lat: null, lng: null});

  const handleScanToggle = () => {
    setMessage(' Vasco Beacons');
    setIsScanning(!isScanning);
  };

  const verifyBeacons = async () => {
    const response = await apiget('/beacon');
    setBeaconsBd(response);
  };

  useEffect(() => {
    verifyBeacons();
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
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
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          },
          error => {
            console.log(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const handleDeviceSelected = device => {
    navigation.navigate('Beacon', {device});
  };

  const handleDeviceFound = device => {
    setDevices(prevDevices => {
      if (!prevDevices.some(d => d.id === device.id)) {
        return [...prevDevices, device];
      }
      return prevDevices;
    });
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      width: 360,
      height:300
      
    },
    map: {
      flex: 1,
      
    },
  });

  return (
    <ScrollView>
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{message}</Text>
        <TouchableOpacity
          style={{backgroundColor: '#666', padding: 10, borderRadius: 5}}
          onPress={handleScanToggle}>
          <Text>{isScanning ? 'Parar' : 'Procurar'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 2}}>
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleDeviceSelected(item)}>
              <Text>
                {item?.id} - {item.name}{' '}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      {isScanning && <ScanBeacons onDeviceFound={handleDeviceFound} />}
      {console.log('lat',location.lat)}
      <View style={{flex: 2}}>
        <Text>Minha localizacao</Text>
        <Text>{JSON.stringify(location)}</Text>
      </View>

      <View style={{flex: 2}}>
        <Text>Beacons cadastrados</Text>
        <FlatList
          data={beaconBd?.data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleDeviceSelected(item)}>
              <View
                style={{backgroundColor: '#f0f0f0f0', padding: 10, margin: 20}}>
                <Text>{item?.id} </Text>
                <Text>{item?.nome} </Text>
                <Text>Local {item?.descricao} </Text>
                <Text>Lat {item?.lat} </Text>
                <Text>Lng {item?.lng} </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
    <View style={styles.container}>
    <MapView
   
  style={{flex: 1}}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker
    coordinate={{
      latitude: 37.78825,
      longitude: -122.4324,
    }}
    title="Seu local"
    description="Este é seu local atual"
  />
</MapView>
 
    </View>
    </ScrollView>
  );
};

export default Home;
