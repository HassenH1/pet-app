import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useAPI } from "../../context/apiContext";

const noMoreCards = (props) => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data } = userState;

  return (
    <View>
      <Text style={styles.noMoreCardsText}>No more cards</Text>
      <Text>{user.name}</Text>
    </View>
  );
};

export default noMoreCards;

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
  },
});
