import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import CardSwipe from "./CardSwipe";
import { contextAPI } from "../../App";
import { fetchData } from "../../reducer/fetchData";

const dashboard = () => {
  const { userState, dispatch } = useContext(contextAPI);
  const { user, loading } = userState;

  useEffect(() => {
    console.log("before fetchData function");
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      {/* TODO: gonna work on data API and pass it down along */}
      {/* <CardSwipe /> */}
      {/* i can have tabs here */}
    </View>
  );
};

export default dashboard;

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
