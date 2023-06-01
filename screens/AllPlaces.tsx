import { View, Text } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useCallback, useEffect, useState } from "react";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadPlaces() {
        const places = await fetchPlaces();
        console.log("Loaded Places:", places);
        setLoadedPlaces(places);
      }

      loadPlaces();
    }, []) // Pass an empty dependency array to run the effect only on initial mount and when the screen comes into focus
  );

  return <PlacesList places={loadedPlaces} />;
}

// export default function AllPlaces({ route }: { route: any }) {
//   const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
//   const isFocused = useIsFocused();
//   useEffect(() => {
//     async function loadPlaces() {
//       const places = await fetchPlaces();
//       setLoadedPlaces(places);
//     }

//     if (isFocused) {
//       loadPlaces();
//       // setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
//     }
//   }, [isFocused]);

//   return <PlacesList places={loadedPlaces} />;
// }
