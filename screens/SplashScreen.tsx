import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useCallback, useEffect, useState } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
// import Insta from "./Insta";
import { MapScreenProps } from "../types/NavigationTypes";
// import { Image } from "expo-image";

export default function SplashScreen({ navigation }: MapScreenProps) {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  const spp = require("../assets/bg1.png");
  // const logo = require("../assets/Ylogo1.png");
  const image = {
    uri: "/Users/sayf/Documents/react-native/favlocation-reactnative-ts/assets/bg1.png",
  };

  useFocusEffect(
    useCallback(() => {
      async function loadPlaces() {
        const places = await fetchPlaces();
        console.log("Loaded Places:", places);
        setLoadedPlaces(places);
      }

      loadPlaces();
      setTimeout(() => {
        navigation.navigate("Insta");
      }, 3500);
    }, []) // Pass an empty dependency array to run the effect only on initial mount and when the screen comes into focus
  );

  return (
    <>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "/Users/sayf/Documents/react-native/favlocation-reactnative-ts/assets/Ylogo1.png",
              }}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignSelf: "center",
    width: 63,
    height: 82,
  },
  logo: {
    height: "100%",
  },
});
