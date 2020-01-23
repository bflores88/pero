"use-strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// app.use(express.static("public"));

require("dotenv").config();
const PORT = process.env.EXPRESS_HOST_PORT;

app.get("/", (req, res) => {
  res.status(200).send("smoke test");
});

app.listen(PORT, () => {
  console.log(`Express app is running on port ${PORT}`);
});
