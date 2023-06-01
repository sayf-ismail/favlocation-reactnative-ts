import { View, Alert, StyleSheet, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getAddress, getMapPreview } from "../../util/location";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useIsFocused,
  ParamListBase,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Coordinates } from "../../types/NavigationTypes";

type LocationPickerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddPlace"
>;

export interface RootStackParamList extends ParamListBase {
  AllPlaces: undefined;
  AddPlace: {
    pickedLat: number;
    pickedLng: number;
  };
  Map: undefined;
}

export default function LocationPicker({
  onPickLocation,
}: {
  onPickLocation: (location: Coordinates, address: string) => void;
}) {
  const [pickedLocation, setPickedLocation] = useState<
    Coordinates | undefined
  >();
  const isFocused = useIsFocused();

  const route = useRoute<RouteProp<RootStackParamList, "AddPlace">>();
  const navigation = useNavigation<LocationPickerScreenNavigationProp>();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation: Coordinates | undefined = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
        address: "",
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function handleLocation() {
    if (pickedLocation) {
      const address = await getAddress({
        lat: pickedLocation.lat,
        lng: pickedLocation.lng,
        address: "",
      });
      onPickLocation(pickedLocation, address);
    }
  }

  useEffect(() => {
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      address: "",
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview({
            lat: pickedLocation?.lat,
            lng: pickedLocation?.lng,
            address: "",
          }),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    // borderRadius: 4,
  },
});
