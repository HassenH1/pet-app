import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "./src/components/login";
import Register from "./src/components/register";
import Dashboard from "./src/components/dashboard";
import LandingPage from "./src/components/LandingPage";
import { UserContextProvider } from "./src/context/userContext";

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
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
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NavigationContainer>
  );
};
