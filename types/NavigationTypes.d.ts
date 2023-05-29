import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: {
    pickedLat: number;
    pickedLng: number;
  };
  Map: undefined;
};

type MapScreenProps = NativeStackScreenProps<RootStackParamList, "Map">;
