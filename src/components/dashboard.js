import React, { useContext, useEffect, useState } from "react";
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
  const { user, loading, data } = userState;

  const fetchData = async () => {
    // dispatch({ type: "SET_LOADING", payload: true });
    try {
      const resp = await fetch(url);
      const respJson = await resp.json();
      dispatch({ type: "FETCH_DATA", payload: respJson });
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async (callback) => {
      dispatch({ type: "SET_LOADING", payload: true });
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location); // after grabbing user location...
      // console.log(location, "<--------------location");
      dispatch({
        type: "SET_USER_LOCATION",
        payload: location,
      });
      dispatch({ type: "SET_LOADING", payload: false });
      await callback(); // ...fetch the data
    })(fetchData);

    // fetchData();
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (loc) {
  //   text = JSON.stringify(loc);
  // }

  return (
    <View style={styles.container}>
      {/* we are going to show location here */}
      {/* <CardSwipe /> */}
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <Text>
          {user.location.lat} and {user.location.lon}
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
