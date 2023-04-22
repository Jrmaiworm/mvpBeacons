import React, {useEffect, useState} from 'react';
import {BleManager} from 'react-native-ble-plx';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';


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
  export default ScanBeacons;