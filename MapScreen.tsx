import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const watchId = useRef(null);

  const getGpsLocation = useCallback(() => {
    console.log('Iniciando escuta de localização...');
    watchId.current = Geolocation.watchPosition(
      (position) => {
        if (position && position.coords) {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setLoading(false);
          setIsLocationValid(true);
          console.log('Localização atualizada:', position);
        } else {
          console.error('Posição ou coordenadas não definidas');
        }
      },
      (error) => {
        console.error('Error getting GPS location:', error);
        setErrorMsg(error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 5000,
      }
    );
  }, []);

  useEffect(() => {
    getGpsLocation();
    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        console.log('Escuta de localização removida');
        watchId.current = null; // Resetar para evitar limpeza dupla
      }
    };
  }, [getGpsLocation]);

  return (
    <View style={{ flex: 1 }}>
      {isLocationValid ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}
          loadingEnabled={loading}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Sua localização"
          />
        </MapView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Obtendo localização...</Text>
        </View>
      )}
      <View style={{ padding: 20 }}>
        {errorMsg && <Text>{errorMsg}</Text>}
        <Button title="Voltar para Home" onPress={() => navigation.pop()} />
      </View>
    </View>
  );
};

export default MapScreen;