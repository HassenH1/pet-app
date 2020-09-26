import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Card from "./Card";
import NoMoreCards from "./NoMoreCards";
import { apiContextAPI } from "../context/apiContext";

import SwipeCards from "react-native-swipe-cards";

const CardSwipe = () => {
  const { api } = apiContextAPI();

  const [cardTest, setCardTest] = useState([
    { text: "Tomato", backgroundColor: "red" },
    { text: "Aubergine", backgroundColor: "purple" },
    { text: "Courgette", backgroundColor: "green" },
    { text: "Blueberry", backgroundColor: "blue" },
    { text: "Umm...", backgroundColor: "cyan" },
    { text: "orange", backgroundColor: "orange" },
  ]);

  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }
  // If you want a stack of cards instead of one-per-one view, activate stack mode
  // stack={true}
  return (
    <>
      {console.log(api, " <------------------------------the api?")}

      <SwipeCards
        cards={cardTest}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={handleYup}
        handleNope={handleNope}
        handleMaybe={handleMaybe}
        hasMaybeAction={false}
        // stack={true}
        yupStyle={styles.yup}
      />
    </>
  );
};

export default CardSwipe;

const styles = StyleSheet.create({
  yup: {
    borderWidth: 22,
    borderColor: "orange",
    position: "absolute",
    top: 0,
    right: 0,
    height: 32,
  },
});
