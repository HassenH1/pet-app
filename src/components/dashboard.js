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
import * as Location from "expo-location";

const Dashboard = () => {
  const { userState, dispatch } = useAPI();
  const { loading } = userState;

  useEffect(() => {
    const getLocation = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log(
          "Permission is needed to keep going <----from dashboard component"
        );
      }
      console.log("getting ready to set the location of user");
      let location = await Location.getCurrentPositionAsync({});
      dispatch({
        type: "SET_USER_LOCATION",
        payload: location,
      });
      console.log("location should be set now??");
      dispatch({ type: "SET_LOADING", payload: false });
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text>Getting Location...</Text>
        </>
      ) : (
        <CardSwipe />
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
