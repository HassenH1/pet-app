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
// app.use(express.json());
app.use(methodOverride("_method"));

//testing post route
// app.post("/", (req, res) => {
//   console.log("test post method");
//   console.log(req.body);
//   res.send(`Hello world ${req.body}`);
// });

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
  const { lat, lon } = req.body;

  if (token === "") {
    try {
      await getToken(url);
    } catch (e) {
      console.log(e, " <-----------error inside get method fetching for token");
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
    console.log(`error in post location route ${e}`);
  }
});

app.post("/next", async (req, res) => {
  const { link } = req.body;
  console.log(`${url}${link} <==================the url with the new link`);

  // try{
  //   let resp = await fetch(`${url}${link}`)
  // }catch(e){
  //   console.log(e)
  // }
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
