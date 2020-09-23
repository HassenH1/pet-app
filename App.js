import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import Login from "./components/login";

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
        <View>
          <Text style={styles.text}>Adopt-a-Pet</Text>
        </View>

        <View
          style={{
            height: "15%",
            width: "98%",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <Button
                title="Login"
                buttonStyle={styles.btn}
                onPress={() => console.log("btn has been pressed 1")}
              />
            </View>
            <View>
              <Button
                title="Register"
                // color="#841584"
                buttonStyle={styles.btn}
                onPress={() => console.log("btn has been pressed 2")}
                // type="outline"
              />
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
    backgroundColor: "whitesmoke",
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
    fontSize: 50,
    color: "#FF4500",
  },
  btn: {
    marginVertical: 15,
  },
});
