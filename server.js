const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = 8080;
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const url = "https://api.petfinder.com/v2";
let token = "";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));

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

app.post("/location", async (req, res) => {
  console.log(req.body, "<-----------what is the body in post request?");
  // const { lat, lon } = req.body;

  // if (token === "") {
  //   try {
  //     await getToken(url);
  //   } catch (e) {
  //     console.log(e, " <-----------error inside get method fetching for token");
  //   }
  // }

  // try {
  //   // https://api.petfinder.com/v2/animals?location=los angeles, california
  //   let resp = await fetch(`${url}/animals?location=${lat}, ${lon}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token.access_token}`,
  //     },
  //   });
  //   resp = await resp.json();
  //   console.log(resp, " <--------------------the response I am sending back");
  //   // res.send(resp);
  // } catch (e) {
  //   console.log(`error in post location route ${e}`);
  // }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
