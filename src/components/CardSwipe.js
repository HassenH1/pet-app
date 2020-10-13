import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useAPI } from "../../context/apiContext";
import { url } from "../ngrok/index";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/native";


const CardSwipe = () => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data, location } = userState;
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const resp = await fetch(`${url}/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });
      const respJson = await resp.json();
      dispatch({ type: "FETCH_DATA", payload: respJson });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePress = (card) => {
    // navigation.navigate("<Component Here>", { ...<Pass Prop here aka card> })
    console.log("pressed!!")
  }

  const ShowingPhotos = (card) => {
    //TODO : check the length of api here
    return (
      <>
      {
        !card
          ? (
            <>
             <ActivityIndicator size="large" color="#00ff00" />
             <Text>Now Loading Images...</Text>
            </>
          )
          : (
            <>
            {
              card?.card?.photos
                ? (
                  // <TouchableOpacity onPress={() => handlePress(card)}>
                    <Image 
                      source={{ uri: card?.card?.photos[0]?.full }}
                      style={styles.cardImage}
                    />
                  // </TouchableOpacity>
                )
                : (
                  <Text>No Cover Image Available</Text>
                )
            }
            </>
          )
      }
      </>
    )
  }

  const onSwiped = async (cardindex) => {
    console.log(index)
    setIndex(index + 1);
    //TODO: if cardIndex is at > 20 then load next page
    if (index >= 19) {
      try {
        const resp = await fetch(`${url}/next`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data.page),
        });
        const respJson = await resp.json();
        console.log(respJson, "<------------------the response on swiped")
        await dispatch({ type: "FETCH_DATA", payload: respJson }) //setting data here
        // fetchData()
      } catch (e) {
        console.log(`Error trying to go to next page`);
      }
    }
  }

  const onSwipedAll = () => {
    return(
      <Text>No more Pets</Text>
    )
  }

  useEffect(() => {
    fetchData();
    console.log("how many times does this mount?")
  }, []);

  return (
    <>
      {JSON.stringify(location) === "{}" ? (
        <>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Now Loading Cards...</Text>
        </>
      ) : (
        <>
          <Swiper
            cards={data.animals}
            renderCard={(card) => {
              return <View style={styles.card}>{<ShowingPhotos card={card}/>}</View>;
            }}
            onSwiped={onSwiped}
            onSwipedAll={onSwipedAll}
            cardIndex={0}
            backgroundColor={"whitesmoke"}
            stackSize={4}
            stackScale={10}
            // stackSeparation={14}
            disableBottomSwipe
            disableTopSwipe
            animateOverlayLabelsOpacity
            animateCardOpacity
            overlayLabels={{
              left: {
                title: "Nope",
                style: {
                  label: {
                    backgroundColor: "red",
                    color: "white",
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 20,
                    marginLeft: -20,
                  },
                },
              },
              right: {
                title: "Like",
                style: {
                  label: {
                    backgroundColor: "green",
                    color: "white",
                    fontSize: 24,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 20,
                    marginLeft: 20,
                  },
                },
              },
            }}
          />
        </>
      )}
    </>
  );
};

export default CardSwipe;

const styles = StyleSheet.create({
  card: {
    flex: 0.85,
    borderRadius: 8,
    shadowRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cardImage: {
    //try this first
    // flex: 1,
    // aspectRatio: 1.0, 
    // resizeMode: 'contain',
    //try this next
    // flex: 1,
    // width: null,
    // height: null,
    // resizeMode: "contain",
    //try this next ------------
    // flex: 1,
    // width: '100%',
    // height: '100%',
    // resizeMode: 'contain',
    //lastly try this
    // width: 250,
    // height: 100,
    // flex: 1,
    // resizeMode: "cover",
    width: 345,
    height: "95%",
    flex: 1,
    borderRadius: 8,
    resizeMode: "cover",
  },
});
