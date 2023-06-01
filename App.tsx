import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Colors } from "./constants/colors";
import MapScreen from "./screens/Map";
import { RootStackParamList } from "./types/NavigationTypes";
import { useEffect, useState } from "react";
import { init } from "./util/database";
// import AppLoading from "expo-app-loading";
// import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [dbInitialised, setDbInitialised] = useState(false);
  useEffect(() => {
    init()
      .then(() => setDbInitialised(true))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialised) {
    // return <AppLoading />;
    return (
      <Text
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        Loading...
      </Text>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }: { navigation: any }) => ({
              title: "Your Favorite Places",
              headerRight: ({ tintColor }: HeaderButtonProps) => (
                <IconButton
                  icon="add"
                  size={32}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
