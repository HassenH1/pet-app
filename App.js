import React, { createContext, useReducer, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login";
import Register from "./src/components/register";
import Dashboard from "./src/components/dashboard";
import LandingPage from "./src/components/LandingPage";
import Account from "./src/components/Account";
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
            <Stack.Screen
              name="Account"
              component={Account}
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
