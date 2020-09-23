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

      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ borderColor: "orange", borderWidth: 1 }}>
          <Text style={styles.text}>Adopt-a-Pet</Text>
        </View>

        <View
          style={{
            borderColor: "purple",
            borderWidth: 1,
            height: "10%",
            width: "100%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              borderColor: "orange",
              borderWidth: 1,
            }}
          >
            <View>
              <Button title="Button 1" />
            </View>
            <View>
              <Button title="Button 2" />
            </View>
          </View>
        </View>
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
    height: "100%",
  },
  textContainer: {
    zIndex: 1,
  },
  text: {
    // fontFamily: "CuteFont_400Regular",
    fontSize: 50,
    color: "#FF4500",
  },
});
