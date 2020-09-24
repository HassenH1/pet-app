import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Cards = () => {
  return (
    <View style={styles.container}>
      <Text>Card component</Text>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    color: "black",
  },
});
