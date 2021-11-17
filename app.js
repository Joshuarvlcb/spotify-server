const express = require("express");
const SpotifyWebAPI = require("spotify-web-api-node");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

//this
app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebAPI({
    redirectUri: "http://localhost:3000",
    clientId: "cb2ed77176254eebbdd48f2c8b025d1b",
    clientSecret: "64504eeb639f4e16b51a7fe6e8d349e1",
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/refresh", (req, res) => {
  console.log("hi");
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebAPI({
    redirectUri: "http://localhost:3000",
    clientId: "cb2ed77176254eebbdd48f2c8b025d1b",
    clientSecret: "64504eeb639f4e16b51a7fe6e8d349e1",
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.listen(3001);
