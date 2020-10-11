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
              //I have to wrap image in a View tag and route to show page for each animal
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
    //     console.log(respJson, "<------------------the response on swiped")
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
    //try this first
    flex: 1,
    aspectRatio: 1.5, 
    resizeMode: 'contain',
    //try this next
    // flex: 1,
    // width: null,
    // height: null,
    // resizeMode: "contain",
    //lastly try this
    // width: 250,
    // height: 100,
    // flex: 1,
    // resizeMode: "cover",
  },
});


// Object {
//   "card": Object {
//     "_links": Object {
//       "organization": Object {
//         "href": "/v2/organizations/ca1747",
//       },
//       "self": Object {
//         "href": "/v2/animals/49420135",
//       },
//       "type": Object {
//         "href": "/v2/types/dog",
//       },
//     },
//     "age": "Senior",
//     "attributes": Object {
//       "declawed": null,
//       "house_trained": true,
//       "shots_current": false,
//       "spayed_neutered": false,
//       "special_needs": false,
//     },
//     "breeds": Object {
//       "mixed": true,
//       "primary": "Basset Hound",
//       "secondary": "American Staffordshire Terrier",
//       "unknown": false,
//     },
//     "coat": "Short",
//     "colors": Object {
//       "primary": "Apricot / Beige",
//       "secondary": "Bicolor",
//       "tertiary": null,
//     },
//     "contact": Object {
//       "address": Object {
//         "address1": null,
//         "address2": null,
//         "city": "Oak Hills",
//         "country": "US",
//         "postcode": "92344",
//         "state": "CA",
//       },
//       "email": "petsforeverfound@gmail.com",
//       "phone": "7609535800",
//     },
//     "description": "NAME:
// AGE:


// Good on a leash.
// Great in the car.
// Potty trained
// Crate trained

// Fixed, Vaccinated, and Micro-chipped.
// Adoption fee:...",
//     "distance": 72.5345,
//     "environment": Object {
//       "cats": false,
//       "children": false,
//       "dogs": false,
//     },
//     "gender": "Female",
//     "id": 49420135,
//     "name": "Zoey",
//     "organization_animal_id": null,
//     "organization_id": "CA1747",
//     "photos": Array [
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281&width=100",
//       },
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/1/?bust=1602432279",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/1/?bust=1602432279&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/1/?bust=1602432279&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/1/?bust=1602432279&width=100",
//       },
//     ],
//     "primary_photo_cropped": Object {
//       "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281",
//       "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281&width=600",
//       "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281&width=450",
//       "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420135/2/?bust=1602432281&width=300",
//     },
//     "published_at": "2020-10-11T16:05:49+0000",
//     "size": "Medium",
//     "species": "Dog",
//     "status": "adoptable",
//     "status_changed_at": "2020-10-11T16:05:49+0000",
//     "tags": Array [
//       "Loving",
//       "playful active",
//       "some joint pain",
//       "knows basic commmands",
//       "loves to hunt for lizards and squirrels",
//     ],
//     "type": "Dog",
//     "url": "https://www.petfinder.com/dog/zoey-49420135/ca/oak-hills/pets-forever-found-ca1747/?referrer_id=ba5a4562-5ed7-4f02-b3af-dde66347e217",
//     "videos": Array [],
//   },
// } <----------------is the data coming in?
// Object {
//   "card": Object {
//     "_links": Object {
//       "organization": Object {
//         "href": "/v2/organizations/ca710",
//       },
//       "self": Object {
//         "href": "/v2/animals/49420105",
//       },
//       "type": Object {
//         "href": "/v2/types/dog",
//       },
//     },
//     "age": "Young",
//     "attributes": Object {
//       "declawed": null,
//       "house_trained": true,
//       "shots_current": true,
//       "spayed_neutered": true,
//       "special_needs": false,
//     },
//     "breeds": Object {
//       "mixed": false,
//       "primary": "Chihuahua",
//       "secondary": null,
//       "unknown": false,
//     },
//     "coat": "Short",
//     "colors": Object {
//       "primary": null,
//       "secondary": null,
//       "tertiary": null,
//     },
//     "contact": Object {
//       "address": Object {
//         "address1": null,
//         "address2": null,
//         "city": "Bell Gardens",
//         "country": "US",
//         "postcode": "90201",
//         "state": "CA",
//       },
//       "email": "miracledogrescue@gmail.com",
//       "phone": null,
//     },
//     "description": "CARLITOS: CHIHUAHUA//MALE/ 1 YEAR OLD/ 9 POUNDS

// HOUSE TRAINED. LOVING, PLAYFUL.

// Vaccinated, de-wormed and neutered
// Come and Meet Carlitos, He...",
//     "distance": 10.4285,
//     "environment": Object {
//       "cats": null,
//       "children": true,
//       "dogs": true,
//     },
//     "gender": "Male",
//     "id": 49420105,
//     "name": "CARLITOS",
//     "organization_animal_id": null,
//     "organization_id": "CA710",
//     "photos": Array [
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711&width=100",
//       },
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/1/?bust=1602431696",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/1/?bust=1602431696&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/1/?bust=1602431696&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/1/?bust=1602431696&width=100",
//       },
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/2/?bust=1602431698",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/2/?bust=1602431698&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/2/?bust=1602431698&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/2/?bust=1602431698&width=100",
//       },
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/3/?bust=1602431708",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/3/?bust=1602431708&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/3/?bust=1602431708&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/3/?bust=1602431708&width=100",
//       },
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/4/?bust=1602431709",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/4/?bust=1602431709&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/4/?bust=1602431709&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/4/?bust=1602431709&width=100",
//       },
//       Object {
//         "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/6/?bust=1602431732",
//         "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/6/?bust=1602431732&width=600",
//         "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/6/?bust=1602431732&width=300",
//         "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/6/?bust=1602431732&width=100",
//       },
//     ],
//     "primary_photo_cropped": Object {
//       "full": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711",
//       "large": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711&width=600",
//       "medium": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711&width=450",
//       "small": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/49420105/5/?bust=1602431711&width=300",
//     },
//     "published_at": "2020-10-11T15:59:12+0000",
//     "size": "Small",
//     "species": "Dog",
//     "status": "adoptable",
//     "status_changed_at": "2020-10-11T15:59:12+0000",
//     "tags": Array [],
//     "type": "Dog",
//     "url": "https://www.petfinder.com/dog/carlitos-49420105/ca/bell-gardens/miracle-dog-rescue-ca710/?referrer_id=ba5a4562-5ed7-4f02-b3af-dde66347e217",
//     "videos": Array [],
//   },
// } <----------------is the data coming in?
