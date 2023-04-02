import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Beacon = ({navigation}) => {
  const [message, setMessage] = useState('Bem-vindo à tela Becaon');

  const handlePress = () => {

    setMessage('Você pressionou o botão');
  };

  return (
    <View>
      <Text>{message}</Text>
      <TouchableOpacity onPress={handlePress}></TouchableOpacity>
    </View>
  );
};
export default Beacon;