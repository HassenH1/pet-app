import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Card = (props) => {
  return (
    <View style={[styles.card, { backgroundColor: props.backgroundColor }]}>
      <Text>{props.text}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
});
