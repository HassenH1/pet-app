import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardSwipe from "./CardSwipe";

const dashboard = () => {
  return (
    <View style={styles.container}>
      {/* cards go here */}
      <CardSwipe />
      <Text>Dashboard Screen</Text>
      {/* i can have tabs here */}
    </View>
  );
};

export default dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    color: "black",
  },
});
