const express = require("express");
const app = express();
const fetch = require("node-fetch");
const PORT = 8000;
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();
