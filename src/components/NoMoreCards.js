import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const noMoreCards = (props) => {
  return (
    <View>
      <Text style={styles.noMoreCardsText}>No more cards</Text>
    </View>
  );
};

export default noMoreCards;

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
  },
});