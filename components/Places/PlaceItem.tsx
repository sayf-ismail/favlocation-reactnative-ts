import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ListRenderItemInfo,
  ListRenderItem,
} from "react-native";

function PlaceItem({ place }: { place: Place }, onSelect: () => void) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({});
