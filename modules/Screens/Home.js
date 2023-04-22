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
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {apiget} from '../../android/app/src/services/api';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import circleImage from '../../assets/rec.png';
import beacon from '../../assets/wifi.png';
import ScanBeacons from '../components/beaconSearch';
import beaconRed from '../../assets/beacon-icon.png';

///fazer consultar beacons em rota post buscar beacons
///pegar result e enviar em rota post mandar obj info usuario
//fazer rota get da tabela localizacao de usuarios


const Home = ({navigation}) => {
  const [message, setMessage] = useState('Scanear de Beacons');
  const [devices, setDevices] = useState([]);
  const [beaconBd, setBeaconsBd] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [location, setLocation] = useState({lat: null, lng: null});
  const [matchBeacon, setMatchBeacon] = useState(false);
  const beaconsCadastrados = beaconBd?.data?.map(item => item.id);
  const beaconsLocalizados = devices?.map(item => item.id);

  const handleScanToggle = () => {
    setMessage(' Buscando beacons...');
    setIsScanning(!isScanning);
  };

  const verifyBeacons = async () => {
    const response = await apiget('/beacon');
    setBeaconsBd(response);
  };

  const checkBeaconMatch = () => {
    if(beaconBd && devices) {
      const detectedBeacons = devices.map(device => device.id);
      const matchedBeacons = beaconBd.data.filter(beacon => detectedBeacons.includes(beacon.id));
      if(matchedBeacons.length > 0) {
        setMatchBeacon(true);
      } else {
        setMatchBeacon(false);
      }
    }
  };
  
  useEffect(() => {
    verifyBeacons();
    requestLocationPermission();
    checkBeaconMatch(); // chamando a função no useEffect
  }, [devices]); // observando a alteração do estado devices
  

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
    } catch (err) {
      console.warn(err);
    }
  }


  const handleDeviceFound = device => {
    setDevices(prevDevices => {
      if (!prevDevices.some(d => d.id === device.id)) {
        return [...prevDevices, device];
      }
      return prevDevices;
    });
  };
  const styles = StyleSheet.create({
    mapContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 300,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    searchButton: {
      backgroundColor: '#666',
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: 150,
    },
    searchButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },

    container: {
      flex: 1,
      justifyContent:'center',
      width: 300,
      height:300
      
    }
  });
  const mapViewRef = useRef(null);

 

  console.log('bcadast', beaconsCadastrados)
  console.log('bclocaliz', beaconsLocalizados)
 

  return (
    <ScrollView style={{height: '100%'}} >
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{message}</Text>
        <TouchableOpacity
          style={{backgroundColor: '#666', padding: 10, borderRadius: 5}}
          onPress={handleScanToggle}>
          <Text style={styles.searchButtonText}>{isScanning ? 'Parar' : 'Procurar'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 2}}>
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
              <Text>
                {item?.id} - {item.name}
              </Text>
          )}
        />
      </View>
      {isScanning && <ScanBeacons onDeviceFound={handleDeviceFound} />}
      <View style={{flex: 2}}>
        <Text>Minha localizacao</Text>
        <Text>{JSON.stringify(location)}</Text>
      </View>

  
    </View>
    <View style={styles.mapContainer}>
  {location && location.lat != null && location.lng != null && (
    <MapView
      mapType={"standard"}
      style={styles.map}
      initialRegion={{
        latitude: location?.lat,
        longitude: location?.lng,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      onMapReady={() => {
        const coordinates = [location];
        beaconBd?.data.forEach(item => {
          coordinates.push({
            lat: item?.lat,
            lng: item?.lng,
          });
        });
        if (coordinates.length > 1) {
          mapViewRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
            animated: true,
          });
        }
      }}
      ref={mapViewRef}>
    <Marker
  

    coordinate={{
      latitude: location?.lat,
      longitude: location?.lng,
    }}
    title="Sua localização"
    description="Este é seu local atual"
 
  >
    <Image source={circleImage} style={{ width: 16, height: 16 }} /> 
  </Marker>
  {beaconBd?.data.map(item => (
  <Marker
    key={item.id}
    coordinate={{ latitude: item?.lat, longitude: item?.lng }}
    title={item?.nome}
    description={item?.descricao}
  >
    <Image
      source={
        beaconsCadastrados.includes(item.id) &&
        beaconsLocalizados.includes(item.id)
          ? beaconRed
          : beacon
      }
      style={{ width: 16, height: 16 }}
    />
  </Marker>
))}
    </MapView>
  )}
</View>
    </ScrollView>
  );
};

export default Home;
