const express = require("express");
const router = express.Router();

const Account = require("../database/models/Account");

router.route("/").get((req, res) => {
  Account.fetchAll()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
});

module.exports = router;
