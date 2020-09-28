import React, { useContext, createContext, useReducer } from "react";
import { reducer, initialState } from "../reducer/userReducer";

const APIContext = createContext();

export function APIContextProvider({ children }) {
  const [userState, dispatch] = useReducer(reducer, initialState);

  return (
    <APIContext.Provider value={{ userState, dispatch }}>
      {children}
    </APIContext.Provider>
  );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
