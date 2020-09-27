import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import CardSwipe from "./CardSwipe";
import { userContext } from "../../App";

const dashboard = () => {
  const { userState, dispatch } = useContext(userContext);
  const { user, loading } = userState;

  return (
    <View style={styles.container}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
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
