/* 
server is going to be used to fetch data from restful api 
then store it into context api for global state
*/
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = 8080;
const methodOverride = require("method-override"); //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const bodyParser = require("body-parser"); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require("cors"); //for providing a Connect/Express middleware
require("dotenv").config(); //loads environment variables from a .env file into process.env
const url = "https://api.petfinder.com/v2"; //url goes here
let token = "";

//middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const getToken = async (url) => {
  try {
    const response = await fetch(`${url}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });
    const json = await response.json();
    token = json; //assigned token here
  } catch (error) {
    console.log(error, "<--------------error in getToken method");
  }
};

app.get("/", async (req, res) => {
  console.log("hittting the backend");
  if (token === "") {
    try {
      await getToken(url);
    } catch (e) {
      console.log(e, " <-----------error inside get method fetching for token");
    }
  }
  // TODO: gotta utilize the token here to make requests to the API
  try {
    // fetching random animals
    const response = await fetch(`${url}/animals?sort=random`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    const json = await response.json();
    console.log(json, "<---------------It works!!!");
    res.send(json);
  } catch (error) {
    console.log(error, "<--------------error in getToken method");
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
