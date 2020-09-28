import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { doCreateUserWithEmailAndPassword } from "../firebase/users";
import { contextAPI } from "../../App";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  const { userState, dispatch } = useContext(contextAPI);
  const { user, loading } = userState;
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      doCreateUserWithEmailAndPassword(inputEmail, inputPassword).then(
        (user) => {
          user.user
            .updateProfile({
              displayName: inputName,
            })
            .then(
              () => {
                console.log("Successful");
              },
              function (error) {
                console.log("something went wrong error<----------------");
                setError("Something went Wrong.");
                setTimeout(() => {
                  setError("");
                }, 5000);
                return;
              }
            );
          // TODO: Gotta fix this to handle if there is an error then DO NOT route to the next page
        },
        (error) => {
          // TODO: Same here!
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message; //might need this for later
          if (errorCode == "auth/weak-password") {
            console.log("passwrod is weak error<----------------");
            setError("The password is too weak.");
            setTimeout(() => {
              setError("");
            }, 5000);
            return;
          } else {
            console.log("email is bad error<----------------");
            setError("The email address is badly formatted.");
            setTimeout(() => {
              setError("");
            }, 5000);
            return;
          }
        },
        dispatch({
          type: "SET_USER",
          payload: {
            name: user.user.displayName,
            email: user.user.email,
            likes: [],
            dislikes: [],
          },
        }),
        dispatch({ type: "SET_LOADING", payload: false })
      );
    } catch (err) {
      throw `${err} in register component`;
    }
    navigation.navigate("Dashboard");
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
          placeholder="Full Name"
          leftIcon={<Icon name="user-circle" size={24} color="black" />}
          value={inputName}
          onChangeText={(text) => setInputName(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          value={inputPassword}
          onChangeText={(text) => setInputPassword(text)}
        />

        <Button
          title="Register"
          type="outline"
          buttonStyle={{ width: "100%" }}
          onPress={() => handleSubmit()}
        />
      </View>
    </View>
  );
};

export default Register;

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
