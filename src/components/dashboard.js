import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardSwipe from "./CardSwipe";
import { apiContextAPI } from "../context/apiContext";

const dashboard = () => {
  const { api } = apiContextAPI();
  return (
    <View style={styles.container}>
      {console.log(api, " <------------------------------the api?")}
      <CardSwipe />
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
    backgroundColor: "whitesmoke",
    color: "black",
  },
});
