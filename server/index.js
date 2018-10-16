"use strict";

// ----- Express setup ----- //

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ----- mongoDB setup ----- //
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/tweeter";

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${url}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${url}`);
  
  const DataHelpers = require("./lib/data-helpers.js")(db);

  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  
  app.use("/tweets", tweetsRoutes);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
