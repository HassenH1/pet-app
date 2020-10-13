const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = 8080;
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const url = "https://api.petfinder.com";
let token = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride("_method"));

const getToken = async (url) => {
  try {
    const response = await fetch(`${url}/v2/oauth2/token`, {
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
    throw new Error("cannot assign token to json")
  }
};

app.post("/location", async (req, res) => {
  const { lat, lon } = req.body;

  if (token === "") {
    try {
      await getToken(url);
      if (token.message === "Forbidden") {
        throw new Error("token.message is forbidden inside location api") 
      }
    } catch (e) {
      throw new Error("could not get new token")
    }
  }

  try {
    let resp = await fetch(`${url}/v2/animals?location=${lat}, ${lon}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    resp = await resp.json();
    res.send({ animals: resp.animals, page: resp.pagination });
  } catch (e) {
    throw new Error("could not send response back inside post location")
  }
});

app.post("/next", async (req, res) => {
  const { _links } = req.body

  try {
    let resp = await fetch(`${url}${_links.next.href}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    resp = await resp.json();
    console.log(resp, "<----------the response im gonna send")
    res.send({ animals: resp.animals, page: resp.pagination });
  } catch (e) {
    throw new Error("could not send response back inside post location")
  }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
