import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  SplashScreen: undefined;
  Insta: undefined;
  AddPlace: {
    pickedLat: number;
    pickedLng: number;
  };
  Map: undefined;
};

type MapScreenProps = NativeStackScreenProps<RootStackParamList, "Map">;

interface Coordinates {
  address: string;
  lat: number;
  lng: number;
}
