import React, { useContext, useState, useEffect, createContext } from "react";
import url from "../ngrok/index";

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const [api, setApi] = useState({
    animals: [],
    pagination: {},
  });

  useEffect(() => {
    // TODO: Make a fetch call to api here!
    // find all the pets that havent been adopted
    async function fetchData() {
      try {
        const resp = await fetch(`${url}/`);
        const data = await resp.json();
        console.log(
          data,
          " <-----------------data response from apiContext useEffect"
        );
        //filtering data based on adoptation status
        // setApi(data.filter((animal, idx) => animal.status === "adoptable"));
        setApi({
          animals: data,
          pagination: data.pagination,
        });
      } catch (error) {
        console.log(error, " <--------------useEffect in userContext");
      }
    }
    fetchData();
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

// just gotta call this custom hook to use useContext hooks in components
export function apiContextAPI() {
  const context = useContext(APIContext);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
