import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from "react-native";
import { MapScreenProps } from "../types/NavigationTypes";
import React, { useState, useEffect } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface Story {
  story_id: number;
  story_image: string;
  swipeText: string;
  onPress: () => void;
}

const Insta = ({ navigation }: MapScreenProps) => {
  const storyArray: Story[] = [];
  const userStoryCount = 4;
  for (let k = 1; k <= userStoryCount; k++) {
    storyArray.push({
      story_id: k,
      story_image: "https://picsum.photos/500/800?random=" + Math.random(),
      swipeText: "Custom swipe text for this story",
      onPress: () => console.log(`story ${k} swiped`),
    });
  }
  const [currentStory, setCurrentStory] = useState({
    data: storyArray[0],
    index: 0,
  });
  const img = storyArray[1].story_image;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.statusTabContainer}>
          {storyArray.map((item, index) => (
            <View
              key={index}
              style={[
                styles.statusTab,
                {
                  marginHorizontal: 2,
                  backgroundColor: "#bbbbbb",
                },
              ]}
            ></View>
          ))}
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: currentStory.data.story_image }}
            resizeMode="contain"
            style={styles.imageStyle}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (currentStory.index === 0) {
            console.log("First Story!");
            navigation.navigate("SplashScreen");
          }
          setCurrentStory({
            ...currentStory,
            index: currentStory.index - 1,
            data: storyArray[currentStory.index - 1],
          });
        }}
        style={[styles.controller]}
      ></TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (currentStory.index === storyArray.length - 1) {
            console.log("Last Story!");
            return;
          }
          setCurrentStory({
            ...currentStory,
            index: currentStory.index + 1,
            data: storyArray[currentStory.index + 1],
          });
        }}
        style={[styles.controller, { right: 0 }]}
      ></TouchableOpacity>
    </SafeAreaView>
  );
};
export default Insta;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 10,
  },
  statusTabContainer: {
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
  },
  statusTab: {
    height: 3,
    // backgroundColor: '#fff',
    backgroundColor: "#bbbbbb",
    flex: 1,
  },
  controller: {
    position: "absolute",
    width: width / 2,
    height: height * 0.9,
    bottom: 0,
  },
  imageContainer: { backgroundColor: "#222", flex: 1 },
  imageStyle: {
    width: "100%",
    height: height / 1.2,
    maxHeight: height / 1.2,
  },
});
