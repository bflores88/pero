const express = require("express");
const router = express.Router();

const Role = require("../database/models/Role");

router.route("/").get((req, res) => {
  Role.fetchAll()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
});

module.exports = router;