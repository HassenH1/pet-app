import React, { useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { doSignInWithEmailAndPassword } from "../firebase/users";
import { useAPI } from "../../context/apiContext";
import { useNavigation } from "@react-navigation/native";

//TODO: gotta use async storage to put the person who signed up there

const login = () => {
  const navigation = useNavigation();
  const { userState, dispatch } = useAPI();
  const { user, loading } = userState;
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = () => {
    try {
      doSignInWithEmailAndPassword(inputEmail, inputPassword).then(
        async (user) => {
          dispatch({ type: "SET_LOADING", payload: false });
          dispatch({
            type: "SET_USER",
            payload: {
              name: user.user.displayName,
              email: user.user.email,
              likes: [],
              dislikes: [],
            },
          }),
            navigation.navigate("Dashboard");
        },
        (error) => {
          // TODO: Gotta fix this to handle errors correctly
          // Handle Errors here.
          console.log(error, "<------------------what is this?");
          var errorCode = error.code; //this is good i think
          // if (errorCode == "auth/weak-password") {
          //   console.log("passwrod is weak error<----------------");
          //   setError("The password is too weak.");
          //   setTimeout(() => {
          //     setError("");
          //   }, 5000);
          //   return;
          // } else {
          //   console.log("email is bad error<----------------");
          //   setError("The email address is badly formatted.");
          //   setTimeout(() => {
          //     setError("");
          //   }, 5000);
          //   return;
          // }
        }
      );
    } catch (e) {
      console.log(e, " in login handlesubmit function");
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

// Object {
//   "additionalUserInfo": tg {
//     "isNewUser": false,
//     "providerId": "password",
//   },
//   "credential": null,
//   "operationType": "signIn",
//   "user": Object {
//     "apiKey": "AIzaSyCdXhvnHiLh4FatpysN_rh4VF0xvcH5Y-8",
//     "appName": "[DEFAULT]",
//     "authDomain": "pet-app-cc5be.firebaseapp.com",
//     "createdAt": "1601165159272",
//     "displayName": "Hello",
//     "email": "hello@yahoo.com",
//     "emailVerified": false,
//     "isAnonymous": false,
//     "lastLoginAt": "1601498292939",
//     "multiFactor": Object {
//       "enrolledFactors": Array [],
//     },
//     "phoneNumber": null,
//     "photoURL": null,
//     "providerData": Array [
//       Object {
//         "displayName": "Hello",
//         "email": "hello@yahoo.com",
//         "phoneNumber": null,
//         "photoURL": null,
//         "providerId": "password",
//         "uid": "hello@yahoo.com",
//       },
//     ],
//     "redirectEventId": null,
//     "stsTokenManager": Object {
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzUwM2UwYWVjNTJkZGZiODk2NTIxYjkxN2ZiOGUyMGMxZjMzMDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGVsbG8iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGV0LWFwcC1jYzViZSIsImF1ZCI6InBldC1hcHAtY2M1YmUiLCJhdXRoX3RpbWUiOjE2MDE1MDM4NTIsInVzZXJfaWQiOiJZMXRTZUFZaGg0TkNBSExmU2JVa1VCREJDT3UxIiwic3ViIjoiWTF0U2VBWWhoNE5DQUhMZlNiVWtVQkRCQ091MSIsImlhdCI6MTYwMTUwMzg1MiwiZXhwIjoxNjAxNTA3NDUyLCJlbWFpbCI6ImhlbGxvQHlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoZWxsb0B5YWhvby5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.VHJiHfXdMMmkWE0lpENO82EdArd3qqfhYh5hIq4E13DGy8w3V78wg7agwD1bxBGlQ4FH57PDUAdG7ib9JKFyS9kl-yytvqmNbEEK80B3ax3_HMBaefZzvys4ITPbn4-onPj5Tk7wjghK76MoZ3VvwThX5axr8xXMQnT-NxSo21_vlMWtvuaxjRpLAjFw06ArY2hxIdS2ZhV5MW0aLoRs0BNxwmyt_MmhW86w6DYERHGq_xoUbnbiJ2gHQhwbjrkq2I73SykiD5RIvQreG86x-9_uOAlxJxS--1u5OjCdULI9iI2U6pzLLczcXj3DUK6C6DKZsrn5lUzoN9emEXHnjQ",
//       "apiKey": "AIzaSyCdXhvnHiLh4FatpysN_rh4VF0xvcH5Y-8",
//       "expirationTime": 1601507452000,
//       "refreshToken": "AE0u-NeELC0DOQiK-ovLKBhfcNgkPhIVQlVyWdvDL63B8UFnY78FjUsxMPlEry9bYLguUpAMxev9mGrQmWEZrurJ5rpA3X3DiPwfrLeTVD-By0X8hIa99bIwTXUoGcsQpqV2P-zwrT1ugeD5qelU69FcvVR-axzZ5rkqrVtnQ-3WxzFKA-NPbC2S6IsX-uuNtFNvmLd9sEtrEMVWxZe0IWHcrdtNRt2rwg",
//     },
//     "tenantId": null,
//     "uid": "Y1tSeAYhh4NCAHLfSbUkUBDBCOu1",
//   },
// }  <=======================the firebase user in login?
