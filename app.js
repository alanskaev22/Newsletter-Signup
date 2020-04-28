const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// ----- GET / -----
app.get('/', (req, res) => {
    res.header("Content-Type", "text/html");
    res.sendFile(__dirname + '/signup.html');
});


// ----- POST TO / -----
app.post("/", (req, res) => {
    let email, firstName, lastName;
    email = req.body.inputEmail;
    firstName = req.body.firstName;
    lastName = req.body.lastName;

    // ----- POST TO MAILCHIMP -----
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/9fdd908cff";
    const options = {
        method: "POST",
        auth: "alan:ca9c094ca4dddffbfc3357a45075bc89-us8"
    };

    const request = https.request(url, options, (response) => {
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }else(res.sendFile(__dirname+"/failure.html"));
        response.on("data", (data) => {
            console.log((JSON.parse(data)));
        });
    });
    request.write(jsonData);
    request.end();

});

// ----- POST TO /Failure -----
app.post("/failure", (req, res) => {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, () => console.log("Application in running on port 3000."));