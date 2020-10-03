import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CardSwipe from "./CardSwipe";
import { useAPI } from "../../context/apiContext";
import { url } from "../ngrok/index";

const Dashboard = () => {
  const { userState, dispatch } = useAPI();
  const { user, loading, data, location } = userState;

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
    // fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* we are going to show location here */}
      {/* <CardSwipe /> */}
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
