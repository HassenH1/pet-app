import React, { createContext, useReducer, useEffect } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/login";
import Register from "./src/components/register";
import Dashboard from "./src/components/dashboard";
import LandingPage from "./src/components/LandingPage";
import { APIContextProvider, useAPI } from "./context/apiContext";
import { keepUserLoggedIn } from "./src/firebase/users";

const Stack = createStackNavigator();

function App() {
  const { userState, dispatch } = useAPI();
  const { user, loading, data } = userState;

  useEffect(() => {
    const bootstrapAsync = async () => {};

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
