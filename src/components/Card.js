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
              // borderColor: "yellow",
              // borderWidth: 3,
            }}
          >
            <Image
              style={{
                width: "100%",
                // height: auto,
                aspectRatio: 1, // <-- this
                resizeMode: "contain",
              }}
              source={{ uri: props?.photos[0]?.full }}
              resizeMode={"contain"}
            />
          </View>
          <View
            style={{
              // borderColor: "orange",
              // borderWidth: 1,
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
    borderColor: "#E8E8E8",
    borderWidth: 1.8,
    backgroundColor: "#E8E8E8",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
