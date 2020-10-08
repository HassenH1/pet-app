import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, Text, Image } from "react-native";
import { useAPI } from "../../context/apiContext";
import { url } from "../ngrok/index";
import Swiper from "react-native-deck-swiper";

const CardSwipe = () => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data, location } = userState;
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    fetchData();
  }, []);

  const showingPhotos = (card) => {
    if (card?.photos[0].full) {
      return (
        <Image
          source={{ uri: card?.photos[0]?.full }}
          style={styles.cardImage}
        />
      );
    } else if (card?.photos[1].full) {
      return (
        <Image
          source={{ uri: card?.photos[1]?.full }}
          style={styles.cardImage}
        />
      );
    } else if (card?.photos[2].full) {
      return (
        <Image
          source={{ uri: card?.photos[0]?.full }}
          style={styles.cardImage}
        />
      );
    } else {
      return <Text>No Cover Photo Available</Text>;
    }
  };

  return (
    <>
      {JSON.stringify(location) === "{}" ? (
        <>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Now Loading Cards...</Text>
        </>
      ) : (
        <Swiper
          //put data.animals here vv
          cards={data.animals}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                {/* {card?.photos[0]?.full ? (
                  <>
                    <Image
                      source={{ uri: card?.photos[0]?.full }}
                      style={styles.cardImage}
                    />
                  </>
                ) : <Text>No Cover Photo Available</Text>
                }  */}
                {showingPhotos}
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
            setIndex(index + 1);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
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
        ></Swiper>
      )}
    </>
  );
};

export default CardSwipe;

const styles = StyleSheet.create({
  card: {
    flex: 1,
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
    resizeMode: "contain",
  },
});

/*

TODO: must grab name, image and status for now
must filter thru status to get pets that have not been adopted yet
{
  "id": 49160876,
  "organization_id": "FL852",
  "url": "https://www.petfinder.com/dog/grecia-49160876/fl/loxahatchee/big-dog-ranch-rescue-fl852/?referrer_id=ba5a4562-5ed7-4f02-b3af-dde66347e217",
  "type": "Dog",
  "species": "Dog",
  "breeds": {
    "primary": "Rottweiler",
    "secondary": "Mixed Breed",
    "mixed": true,
    "unknown": false
  },
  "colors": {
    "primary": "Black",
    "secondary": "Golden",
    "tertiary": null
  },
  "age": "Young",
  "gender": "Female",
  "size": "Medium",
  "coat": null,
  "attributes": {
    "spayed_neutered": true,
    "house_trained": false,
    "declawed": null,
    "special_needs": false,
    "shots_current": true
  },
  "environment": {
    "children": null,
    "dogs": null,
    "cats": null
  },
  "tags": [
    
  ],
  "name": "Grecia", 
  "description": "BDRR rescued me from Puerto Rico and I am very thankful.\n\nI am a very sweet girl, but I am...",
  "organization_animal_id": "BDRR-A-16413",
  "photos": [
    {
      "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018&width=100",
      "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018&width=300",
      "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018&width=600",
      "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018"
    },
    {
      "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/3/?bust=1601309134&width=100",
      "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/3/?bust=1601309134&width=300",
      "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/3/?bust=1601309134&width=600",
      "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/3/?bust=1601309134"
    },
    {
      "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/2/?bust=1601309130&width=100",
      "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/2/?bust=1601309130&width=300",
      "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/2/?bust=1601309130&width=600",
      "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/2/?bust=1601309130"
    }
  ],
  "primary_photo_cropped": {
    "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018&width=300",
    "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018&width=450",
    "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018&width=600",
    "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49160876/1/?bust=1601158018"
  },
  "videos": [
    
  ],
  "status": "adoptable",
  "status_changed_at": "2020-09-20T18:55:15+0000",
  "published_at": "2020-09-20T18:55:15+0000",
  "distance": null,
  "contact": {
    "email": null,
    "phone": "(561) 791-6465",
    "address": {
      "address1": null,
      "address2": null,
      "city": "LOXAHATCHEE",
      "state": "FL",
      "postcode": "33470",
      "country": "US"
    }
  },
  "_links": {
    "self": {
      "href": "/v2/animals/49160876"
    },
    "type": {
      "href": "/v2/types/dog"
    },
    "organization": {
      "href": "/v2/organizations/fl852"
    }
  }
},*/
