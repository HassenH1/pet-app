import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Card = (props) => {
  return (
    <View style={[styles.card, { backgroundColor: props.backgroundColor }]}>
      {!props?.photos[0]?.full ? (
        <Text>No Photo is Available</Text>
      ) : (
        <>
          <View
            style={{
              height: "90%",
              width: "100%",
              justifyContent: "space-between",
              borderColor: "yellow",
              borderWidth: 3,
            }}
          >
            <Image
              style={{
                // flex: ,
                width: "100%",
                // height: auto,
                aspectRatio: 1, // <-- this
                resizeMode: "contain",
                // aspectRatio: image.width / image.height,
              }}
              source={{ uri: props?.photos[0]?.full }}
              resizeMode={"contain"}
            />
          </View>
          <View
            style={{
              borderColor: "orange",
              borderWidth: 1,
              width: "100%",
              height: "10%",
            }}
          >
            <Text>{props.name}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth - 10,
    height: 600,
    borderColor: "red",
    borderWidth: 1,
  },
});
