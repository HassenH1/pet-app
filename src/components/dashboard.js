import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import CardSwipe from "./CardSwipe";
import { useAPI } from "../../context/apiContext";
import { url } from "../ngrok/index";
import * as Location from "expo-location";

const Dashboard = () => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data, location } = userState;
  const [errorMsg, setErrorMsg] = useState();
  const [loc, setLocation] = useState();

  const fetchData = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
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
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location); // after grabbing user location...

      callback(); // ...fetch the data
    })(fetchData);

    // fetchData();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (loc) {
    text = JSON.stringify(loc);
  }

  return (
    <View style={styles.container}>
      {/* we are going to show location here */}
      {/* <CardSwipe /> */}
      <Text>{text}</Text>
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
