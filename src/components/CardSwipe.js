import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Card from "./Card";
import NoMoreCards from "./NoMoreCards";
import { useAPI } from "../../context/apiContext";
import SwipeCards from "react-native-swipe-cards";
import { url } from "../ngrok/index";

const CardSwipe = () => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data } = userState;
  const [cardTest, setCardTest] = useState();

  // const fetchData = async () => {
  //   dispatch({ type: "SET_LOADING", payload: true });
  //   try {
  //     const resp = await fetch(url);
  //     const respJson = await resp.json();
  //     dispatch({ type: "FETCH_DATA", payload: respJson });
  //     dispatch({ type: "SET_LOADING", payload: false });
  //     setCardTest(
  //       data.animals.filter((animal) => animal.status === "adoptable")
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const fetchData = async () => {
    try {
      let res = await fetch(url);
      res = await res.json();
      setCardTest(
        data.animals.filter((animal) => animal.status === "adoptable")
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const [cardTest, setCardTest] = useState([
  //   { text: "Tomato", backgroundColor: "red" },
  //   { text: "Aubergine", backgroundColor: "purple" },
  //   { text: "Courgette", backgroundColor: "green" },
  //   { text: "Blueberry", backgroundColor: "blue" },
  //   { text: "Umm...", backgroundColor: "cyan" },
  //   { text: "orange", backgroundColor: "orange" },
  // ]);

  function handleYup(card) {
    console.log(`Yup for ${card.name}`);
  }
  function handleNope(card) {
    console.log(`Nope for ${card.name}`);
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.name}`);
  }
  // If you want a stack of cards instead of one-per-one view, activate stack mode
  // stack={true}
  return (
    <>
      <SwipeCards
        cards={cardTest}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={handleYup}
        handleNope={handleNope}
        handleMaybe={handleMaybe}
        hasMaybeAction={false}
        // stack={true}
        // yupStyle={styles.yup}
      />
    </>
  );
};

export default CardSwipe;

const styles = StyleSheet.create({});

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
