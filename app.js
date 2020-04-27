const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();



app.listen(3000, (args) => console.log("Application in running on port 3000. Args: " + args));