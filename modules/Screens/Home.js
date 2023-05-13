import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback, useMemo} from 'react';
import {apiget} from '../../android/app/src/services/api';
import MapView, {Marker} from 'react-native-maps';
import arrow from '../../assets/button.png';
import beacon from '../../assets/wifi.png';
import ScanBeacons from '../components/beaconSearch';
import beaconRed from '../../assets/beacon-icon.png';
import {styles} from './styles/styles';
import LocationTracker from '../components/locationTracker';
import {requestLocationPermission} from '../components/requestLocationPermission ';
import searchGif from '../../assets/search.gif';
import backgroundImage from '../../assets/back-head.jpg';


const Home = ({navigation}) => {
  const [message, setMessage] = useState('Scanear de Beacons');
  const [devices, setDevices] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSearchGif, setShowSearchGif] = useState(false);
  const [beaconBd, setBeaconsBd] = useState();
  const [isScanning, setIsScanning] = useState(false);
  const [location, setLocation] = useState({lat: null, lng: null});
  const [matchBeacon, setMatchBeacon] = useState(false);
  const [distances, setDistances] = useState({});
  const beaconsCadastrados = useMemo(
    () => beaconBd?.data?.map(item => item.id),
    [beaconBd],
  );
  const beaconsLocalizados = useMemo(
    () => devices?.map(item => item.id),
    [devices],
  );

  // ...
  const [magneticData, setMagneticData] = useState({x: 0, y: 0, z: 0});
  const [orientation, setOrientation] = useState(0);

  const handleScanToggle = () => {
    setMessage(' Buscando beacons...');
    setIsScanning(!isScanning);
    setShowSearchGif(!showSearchGif); // Atualize o estado showSearchGif
  };

  const handleLocationUpdate = newLocation => {
    setLocation(newLocation);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    if (modalVisible) {
      setIsScanning(false);
    }
  };

  const verifyBeacons = async () => {
    const response = await apiget('/beacon');
    setBeaconsBd(response);
  };

  const checkBeaconMatch = () => {
    if (beaconBd && devices) {
      const detectedBeacons = devices.map(device => device.id);
      const matchedBeacons = beaconBd.data.filter(beacon =>
        detectedBeacons.includes(beacon.id),
      );
      if (matchedBeacons.length > 0) {
        setMatchBeacon(true);
      } else {
        setMatchBeacon(false);
      }
    }
  };
  const calculateDistance = (rssi, txPower) => {
    if (rssi == 0) {
      return -1; // Valor inválido
    }

    const ratio = (rssi * 1.0) / txPower;
    if (ratio < 1.0) {
      return Math.pow(ratio, 10);
    } else {
      const distance = 0.89976 * Math.pow(ratio, 7.7095) + 0.111;
      return distance;
    }
  };

  useEffect(() => {
    verifyBeacons();
    requestLocationPermission(setLocation);
    checkBeaconMatch(); // chamando a função no useEffect
  }, [devices]); // observando a alteração do estado devices

  useEffect(() => {
    verifyBeacons();

    requestLocationPermission(setLocation);
  }, []);
  // console.log("devs", devices)

  const handleDeviceFound = device => {
    setDevices(prevDevices => {
      const newDevices = [...prevDevices];
      const index = newDevices.findIndex(d => d.id === device.id);
      if (index >= 0) {
        // Atualizar o dispositivo existente com o novo sinal de RSSI
        newDevices[index] = {
          ...newDevices[index],
          rssi: device.rssi,
        };
      } else {
        // Adicionar um novo dispositivo
        newDevices.push(device);
      }

      // Calcular a distância para cada dispositivo e atualizar o estado distances
      const newDistances = {...distances};
      newDevices.forEach(d => {
        const distance = calculateDistance(d.rssi, -61);
        newDistances[d.id] = distance >= 0 ? distance.toFixed(2) + ' m' : 'N/A';
      });
      setDistances(newDistances);

      return newDevices;
    });
  };

  const mapViewRef = useRef(null);

  // useEffect(() => {
  //   devices.forEach(device => {
  //     const distance = distances[device.id];
      
  //     if (distance && distance < 10) {
  //       Alert.alert('Alerta', `Beacon ${device.id} está a uma distância inferior a 10 metros!`);
  //     }
  //   });
  // }, [devices, distances]);
 

  return (
    <>
      <View>
        <View
          style={{
            backgroundColor: '#3b599999',
            padding: 12,
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <LocationTracker />
          <TouchableOpacity
            style={{backgroundColor: '#3b5998', padding: 12, borderRadius: 4}}
            onPress={() => {
              handleScanToggle();
              toggleModal();
            }}>
            <Text style={styles.searchButtonText}>
              {isScanning ? 'Parar' : 'Scanear'}
            </Text>
          </TouchableOpacity>
        </View>

        {isScanning && <ScanBeacons onDeviceFound={handleDeviceFound} />}
        <View style={{flex: 2}}></View>
      </View>
      <View style={styles.mapContainer}>
        {location && location.lat != null && location.lng != null && (
          <MapView
            rotateEnabled={true}
            mapType={'standard'}
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
                  edgePadding: {top: 10, right: 10, bottom: 10, left: 10},
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
              anchor={{x: 0.5, y: 0.5}}
              rotation={orientation}>
              <Image source={arrow} style={{width: 16, height: 16}} />
            </Marker>
            {beaconBd?.data.map(item => (
              <Marker
                key={item.id}
                coordinate={{latitude: item?.lat, longitude: item?.lng}}
                title={item?.nome}
              
                  description={item?.descricao}>
                <Image
                  source={
                    beaconsCadastrados.includes(item.id) &&
                    beaconsLocalizados.includes(item.id)
                      ? beaconRed
                      : beacon
                  }
                  style={{width: 16, height: 16}}
                />
              </Marker>
            ))}
          </MapView>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          toggleModal();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Beacons Encontrados:</Text>
            <FlatList
              data={devices}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={{backgroundColor: '#f8f8f8', margin: 5}}>
                  <Text>
                    {item?.id} - {item?.name}
                  </Text>
                  <Text>sinal: {item?.rssi}</Text>
                  <Text>distância: {distances[item.id]}</Text>
                  {/* { <Text style={{color:'red'}}>Beacon {item.nome} muito perto!  </Text>} */}
                 
                </View>
              )}
            />

            <TouchableOpacity
              style={{...styles.button, backgroundColor: '#2196F3'}}
              onPress={toggleModal}>
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;
