const functions = require("firebase-functions");
const express = require("express");

const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.send("Root page!");
});

app.get("/store", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/store.html"));
});

const db_store = require("./js/db_store.js");
app.get("/api/getStoreInfo", function(req, res) {
  db_store
    .getStoreInfo()
    .then(result => {
      res.json(result.recordsets);
    })
    .catch(err => {
      res.status(500).json({ message: "Server error" + err });
    });
});

// app.get("/timestamp", (req, res) => {
//   var time = helper.f2().toString();
//   res.send("timestamp: " + time);
// });

exports.app = functions.https.onRequest(app);
