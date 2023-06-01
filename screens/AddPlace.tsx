import { View, Text } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }: any) {
  async function createPlaceHandler(place: Place) {
    console.log("Create Place Handler:", place);

    try {
      await insertPlace(place);
      console.log("Place inserted successfully");
      navigation.navigate("AllPlaces");
    } catch (error) {
      console.log("Error inserting place:", error);
    }
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
