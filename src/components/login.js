import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { doSignInWithEmailAndPassword } from "../firebase/users";

const login = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = () => {
    try {
      doSignInWithEmailAndPassword(inputEmail, inputPassword).then(
        async (user) => {
          console.log(user);
        }
      );
      navigation.navigate("Dashboard");
    } catch (e) {
      console.log(e, " in login handlesubmut function");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerConatiner}>
        <Text style={{ fontSize: 50 }}>Welcome</Text>
        <Input
          placeholder="Email"
          leftIcon={<Icon name="envelope" size={24} color="black" />}
          value={inputEmail}
          onChangeText={(text) => setInputEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          value={inputPassword}
          onChangeText={(text) => setInputPassword(text)}
        />

        <Button
          title="Login"
          type="outline"
          buttonStyle={{ width: "100%" }}
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    borderRightColor: "orange",
    borderLeftColor: "orange",
    borderWidth: 1,
  },
  innerConatiner: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
