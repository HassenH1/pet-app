/* 
server is going to be used to fetch data from restful api 
then store it into context api for global state
*/

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = 8000;
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json()); //does the exact same thing as body-parser
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("testing server");
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
