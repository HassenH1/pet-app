import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text, Image } from "react-native";
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
              //I have to wrap image in a View tag and route to show page for each animal
              card?.photos
                ? (
                  // <View onPress={() => navigation.navigate(<Component>, { <Props here>})}>
                  <Image 
                    source={{ uri: card?.photos[0].full }}
                    style={styles.cardImage}
                  />
                  // </View>
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

    // if (index > 20) {
    //   dispatch({ type: "SET_LOADING", payload: true });
    //   try {
    //     const resp = await fetch(`${url}/next`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data.page),
    //     });
    //     const respJson = await resp.json();
    //   } catch (e) {
    //     console.log(`Error trying to go to next page`);
    //   }
    //   dispatch({ type: "SET_LOADING", payload: false });
    // }
  }

  const onSwipedAll = () => {
    return(
      <Text>No more Pets</Text>
    )
  }

  useEffect(() => {
    fetchData();
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
            stackSeparation={14}
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
    width: 160,
    height: 100,
    flex: 1,
    resizeMode: "cover",
  },
});
