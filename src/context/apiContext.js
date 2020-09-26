import React, { useContext, useState, useEffect, createContext } from "react";

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const [api, setApi] = useState({});

  useEffect(() => {
    // TODO: Make a fetch call to api here!
    // find all the pets that havent been adopted
  }, []);

  return (
    <APIContext.Provider
      value={{
        api,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

// export and use this in every component and make life easy
export function useContextAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
