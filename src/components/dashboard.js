import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CardSwipe from "./CardSwipe";
import { useAPI } from "../../context/apiContext";

const dashboard = () => {
  return (
    <View style={styles.container}>
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
  test: {
    fontSize: 60,
  },
});
