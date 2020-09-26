import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          testID="img"
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
          <Text style={styles.text} testID="heading">
            Adopt-a-Pet
          </Text>
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
                testID="loginBtn"
                title="Login"
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate("Login")}
              />
            </View>
            <View>
              <Button
                testID="registerBtn"
                title="Register"
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate("Register")}
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
