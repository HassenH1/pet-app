/* 
server is going to be used to fetch data from restful api 
then store it into context api for global state
*/

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = 8000;
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const url = "https://api.petfinder.com/v2"; //url goes here
const token = "";

//middleware
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
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
    console.log(json, "<---------------------------token access here?");
  } catch (error) {
    console.log(error, "<--------------error in getToken method");
  }
};

getToken(url);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
