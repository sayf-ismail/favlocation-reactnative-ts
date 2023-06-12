import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import InstaStory from "react-native-insta-story";
import { MapScreenProps } from "../types/NavigationTypes";

export default function Insta({ navigation }: MapScreenProps) {
  function createData() {
    const array = [];

    const userCount = 10;
    const userStoryCount = 15;

    for (let i = 1; i <= userCount; i++) {
      const storyArray = [];
      for (let k = 1; k <= userStoryCount; k++) {
        storyArray.push({
          story_id: i,
          story_image: "https://picsum.photos/500/800?random=" + Math.random(),
          swipeText: "Custom swipe text for this story",
          onPress: () => console.log(`story ${i} swiped`),
        });
      }

      array.push({
        user_id: i,
        user_image: "https://picsum.photos/200/300?random=" + Math.random(),
        user_name: "Test User " + i,
        stories: storyArray,
      });
    }
    return array;
  }
  return (
    <View style={styles.container}>
      <InstaStory
        data={createData()}
        duration={10}
        style={{ marginTop: 30 }}
        storyUserContainerStyle={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 32,
  },
});
