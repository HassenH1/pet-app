import React, { createContext, useReducer, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login";
import Register from "./src/components/register";
import Dashboard from "./src/components/dashboard";
import LandingPage from "./src/components/LandingPage";
import { APIContextProvider, useAPI } from "./context/apiContext";
import { auth } from "./src/firebase/users";

const Stack = createStackNavigator();

function App() {
  const { userState, dispatch } = useAPI();
  const { user, loading, data } = userState;

  useEffect(() => {
    //TODO: keep user logged in here
    const bootstrapAsync = async () => {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: "SET_LOADING", payload: true });
          // console.log(user, " <-----------how to access the user?");
          dispatch({
            type: "SET_USER",
            payload: {
              name: user.displayName,
              email: user.email,
              likes: [],
              dislikes: [],
            },
          });
        }
      }, dispatch({ type: "SET_LOADING", payload: false }));
    };
    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Dashboard"> */}
      <Stack.Navigator>
        {user.name === "" ? (
          <>
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerShown: false,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <APIContextProvider>
      <App />
    </APIContextProvider>
  );
};

// Running application on King.
// Object {
//   "apiKey": "AIzaSyCdXhvnHiLh4FatpysN_rh4VF0xvcH5Y-8",
//   "appName": "[DEFAULT]",
//   "authDomain": "pet-app-cc5be.firebaseapp.com",
//   "createdAt": "1601165159272",
//   "displayName": "Hello",
//   "email": "hello@yahoo.com",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "lastLoginAt": "1601504641140",
//   "multiFactor": Object {
//     "enrolledFactors": Array [],
//   },
//   "phoneNumber": null,
//   "photoURL": null,
//   "providerData": Array [
//     Object {
//       "displayName": "Hello",
//       "email": "hello@yahoo.com",
//       "phoneNumber": null,
//       "photoURL": null,
//       "providerId": "password",
//       "uid": "hello@yahoo.com",
//     },
//   ],
//   "redirectEventId": null,
//   "stsTokenManager": Object {
//     "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2NzUwM2UwYWVjNTJkZGZiODk2NTIxYjkxN2ZiOGUyMGMxZjMzMDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGVsbG8iLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGV0LWFwcC1jYzViZSIsImF1ZCI6InBldC1hcHAtY2M1YmUiLCJhdXRoX3RpbWUiOjE2MDE1MDQ2NzAsInVzZXJfaWQiOiJZMXRTZUFZaGg0TkNBSExmU2JVa1VCREJDT3UxIiwic3ViIjoiWTF0U2VBWWhoNE5DQUhMZlNiVWtVQkRCQ091MSIsImlhdCI6MTYwMTUwODI1NiwiZXhwIjoxNjAxNTExODU2LCJlbWFpbCI6ImhlbGxvQHlhaG9vLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoZWxsb0B5YWhvby5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mUkcMQLIZXawO6VRlBurRhUUK7AfDvis9BGVBJvE2-k_uQA50fa1HiW5TeZpizSUkey8sgebv52s84sCAYKw88guPFxaBYxxwP5urIL_5XnvxYT8D8c_dHPGRqa-sRcw23zHonog9I-YZikzu8auww1fYnRlk_ssgX78DyYXbl3MkXCGzj_-dUZ6MhBp53UN1F_Wuqh0Sna7nlCPWcxFmT-_a1Sb1mYK2dS1dYmP5QHpprPlL8fQPTOAnmWK3oWR3MVfpXyEnUD_EBuQZWSToxXJcmtEDCMo1Js40N8Lx35yAdqRobBm3_8wZ7nnRx9FQOsdNSK603QWNtB1IZ5kRQ",
//     "apiKey": "AIzaSyCdXhvnHiLh4FatpysN_rh4VF0xvcH5Y-8",
//     "expirationTime": 1601511856000,
//     "refreshToken": "AE0u-NdvJ5C0941d-4tJXpRLll6snwufPRB_wUgx_F4JSjgjfYKLSmBRieOjM-tH4dZXIQg4Q3smpx1irapsAefVSAx0M6cpXqscl1poqOybJKD2sg3l0IfyuiLprc_ti7C2fdCqwtaeRHpsNYtGZLut6L3JTMw7dfVYdB0Gl36v6HuI6Yr5RTv0gj8jEjk1Bd4yERr8lrPRfSAPaM2qSHcMRmSF1TuEow",
//   },
//   "tenantId": null,
//   "uid": "Y1tSeAYhh4NCAHLfSbUkUBDBCOu1",
// }  <-----------how to access the user?
