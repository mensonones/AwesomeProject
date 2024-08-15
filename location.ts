import {Alert, Linking, PermissionsAndroid} from "react-native";


const checkLocationPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (!hasPermission) {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert(
                'Permissão de localização',
                'Para usar o aplicativo, é necessário permitir o acesso à localização.',
                [{
                    text: 'Abrir configurações',
                    onPress: () => { Linking.openSettings(); },
                }],
            );
            return false;
        }
    }

    return true;
};

export default checkLocationPermission;