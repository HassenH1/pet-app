import React, { useContext, useState, useEffect, createContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [state, setState] = useState({
    user: {
      name: "",
      email: "",
      likes: [],
      dislikes: [],
    },
  });

  useEffect(() => {
    // TODO: Check if user already signed in using localstorage
    // if user exists, check db to get all the user likes and dislikes as well
  }, []);

  return (
    <UserContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// export and use this in every component and make life easy
export function useContextAPI() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
