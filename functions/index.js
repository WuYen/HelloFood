const functions = require("firebase-functions");
const express = require("express");

const app = express();
const path = require("path");

var bodyParser = require('body-parser')

app.get("/", (req, res) => {
    res.send("Root page!");
});

app.get("/store", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/store.html"));
});

const db_store = require("./js/db_store.js");
app.get("/api/getstore", function (req, res) {
    db_store
        .getStore()
        .then(result => {
            res.json(result.recordsets);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error" + err });
        });
});

//app.post("/api/addStore", function (req, res) {
//    db_store
//        .addStore()
//        .then(result => {
//            res.json(result.recordsets);
//        })
//        .catch(err => {
//            res.status(500).json({ message: "Server error" + err });
//        });
//});

app.post('/api/addStore', function (req, res) {
    console.dir("收到");
    console.dir(req.body);
    db_store
        .addStore(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: "Server error" + err });
        });
})

// app.get("/timestamp", (req, res) => {
//   var time = helper.f2().toString();
//   res.send("timestamp: " + time);
// });

exports.app = functions.https.onRequest(app);
