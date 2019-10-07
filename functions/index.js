const functions = require('firebase-functions');
const express = require("express");

const app = express();
const path = require("path");

app.get("/", (req, res) => {
    res.send("Root page!");
});

app.get("/store", (req, res) => {
    //var time = Date.now().toString();
    //res.sendFile("Store page!");
    res.sendFile(path.join(__dirname + "/views/store.html"));
});

const sql = require("mssql");
app.get("/api/getstore", function (req, res) {
    sql
        .connect({
            user: "",
            password: "",
            server: "",
            database: ""
        })
        .then(pool => {
            // Query
            return (
                pool
                    .request()
                    //.input("input_parameter", sql.Int, value)
                    .query("select * from StoreInfo") // where id = @input_parameter
            );
        })
        .then(result => {
            console.dir(result);
            sql.close();
            res.json(result.recordsets);
        })
        .catch(err => {
            // ... error checks
            sql.close();
            res.json("Error");
        });
});

app.get("/timestamp", (req, res) => {
    var time = Date.now().toString();
    res.send("timestamp: " + time);
});

exports.app = functions.https.onRequest(app);

//const path = require("path");
//app.get("/", function (req, res) {
    //res.sendFile(path.join(__dirname + "/view/store.html"));
//});

//app.use(express.static(__dirname + "/src"));

//const port = process.env.PORT || 3009;
//app.listen(port, function () {
    //console.log("Example app listening on port " + port + "!");
//});