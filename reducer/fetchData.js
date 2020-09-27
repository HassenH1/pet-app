import { url } from "../src/ngrok/index";
import { contextAPI } from "../App";

export const fetchData = async () => {
  console.log("Does this function ever get called?");
  try {
    console.log("inside the try catch block");
    let resp = await fetch(`${url}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    resp = await resp.json();
    console.log(resp, " <----------------resp");
  } catch (e) {
    console.log(`${e} in FetchData function`);
  }
};
