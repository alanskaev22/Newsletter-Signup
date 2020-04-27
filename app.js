const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.header("Content-Type", "text/html");
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", (req, res) => {
    let email, firstName, lastName;
    email = req.body.inputEmail;
    firstName = req.body.firstName;
    lastName = req.body.lastName;
});

app.listen(3000, () => console.log("Application in running on port 3000."));