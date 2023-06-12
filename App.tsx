import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { Colors } from "./constants/colors";
import MapScreen from "./screens/Map";
import { RootStackParamList } from "./types/NavigationTypes";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import Insta2 from "./screens/Insta2";
import Mobile from "./screens/Mobile";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Insta" component={Insta2} />
          <Stack.Screen name="Mobile" component={Mobile} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
