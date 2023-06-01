import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
  ListRenderItem,
} from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

export default function PlacesList({ places }: { places: Place[] }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item?.id}
      renderItem={({ item }) => <PlaceItem key={item?.id} place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
