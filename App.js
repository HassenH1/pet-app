import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri:
              "https://www.pngkit.com/png/full/625-6257944_cute-animal-dogsticker-doglove-freetoedit-transparent-dog-kawaii.png",
          }}
          style={styles.img}
        />
      </View>
      <View>
        <Text>Adopt-a-Pet</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 1,
    position: "relative",
  },
  imgContainer: {
    width: "73%",
    position: "absolute",
    right: -16,
    top: 80,
    height: "50%",
  },
  img: {
    width: "100%",
    // height: 440,
    height: "100%",
    // borderColor: "red",
    // borderWidth: 1,
  },
});
