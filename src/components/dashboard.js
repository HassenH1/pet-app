import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import CardSwipe from "./CardSwipe";
import { useAPI } from "../../context/apiContext";
import { url } from "../ngrok/index";
import * as Location from "expo-location";

const Dashboard = () => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data, location } = userState;
  const [userLocation, setuserLocation] = useState({});

  const fetchData = async () => {
    try {
      const resp = await fetch(`${url}/location`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLocation),
      });
      const respJson = await resp.json();
      dispatch({ type: "FETCH_DATA", payload: respJson });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (e) {
      console.log(e);
    }
  };

  // const settingLocation = async () => {
  //   dispatch({ type: "SET_LOADING", payload: true });

  //   let { status } = await Location.requestPermissionsAsync();
  //   if (status !== "granted") {
  //     console.log(
  //       "Permission is needed to keep going <----from dashboard component"
  //     );
  //   }
  //   let location = await Location.getCurrentPositionAsync({});
  //   // dispatch({
  //   //   type: "SET_USER_LOCATION",
  //   //   payload: location,
  //   // });
  //   await setuserLocation(location);
  //   await fetchData();
  // };

  useEffect(() => {
    (async (callback) => {
      dispatch({ type: "SET_LOADING", payload: true });
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        // setErrorMsg("Permission to access location was denied");
        console.log(
          "Permission is needed to keep going <----from dashboard component"
        );
      }
      console.log("getting ready to set the location of user");
      let location = await Location.getCurrentPositionAsync({});
      // dispatch({
      //   type: "SET_USER_LOCATION",
      //   payload: location,
      // });
      setuserLocation((state) => location);
      console.log("location should be set now??");
      await callback(); // ...fetch the data
    })(fetchData);
  }, []);

  return (
    <View style={styles.container}>
      {console.log(location, "<------------the location is?")}
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Finding User Location...</Text>
        </>
      ) : (
        // <CardSwipe />
        <Text>
          Found user location: {location.lat}, {location.lon}
        </Text>
      )}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    color: "black",
  },
  test: {
    fontSize: 60,
  },
});
