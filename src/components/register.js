import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { doCreateUserWithEmailAndPassword } from "../firebase/users";

const Register = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

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
                console.log(error, "Something went wrong");
              }
            );
        },
        (error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            console.error(error);
          }
          // [END_EXCLUDE]
        }
      );
      navigation.navigate("Dashboard");
    } catch (err) {
      console.log(err);
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
          placeholder="Full Name"
          // leftIcon={<Icon name="account" size={24} color="black" />}
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
