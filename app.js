const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const passingData = {
    members: [
      {
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        email_address: email,
        status: "subscribed",
      },
    ],
  };

  const url = "https://us1.api.mailchimp.com/3.0/lists/e839ddee5e";
  const options = {
    method: "POST",
    auth: "nachiket:6394e1eb0d414bb39fec86f1f8aefe4a-us1",
  };
  const jsonData = JSON.stringify(passingData);

  const apiRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      //   res.send("Success");
      res.sendFile(__dirname + "/success.html");
    } else {
      //   res.send("fail");
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  apiRequest.write(jsonData);
  apiRequest.end();
});

app.post("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server is started on 3000");
});

//6394e1eb0d414bb39fec86f1f8aefe4a-us1
//mailid:- e839ddee5e
