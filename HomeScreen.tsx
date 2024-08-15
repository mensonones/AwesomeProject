// HomeScreen.js
import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import checkLocationPermission from './location';

const HomeScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      const permission = await checkLocationPermission();
      setHasPermission(permission);
    };

    checkPermission();
  }, []);

  if (!hasPermission) {
    return null;
  }

  return (
    <View style={{padding: 20}}>
      <Button
        title="Ir para Mapa"
        onPress={() => navigation.navigate('Map')}
        disabled={!hasPermission}
      />
    </View>
  );
};

export default HomeScreen;
