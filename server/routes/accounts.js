const express = require("express");
const router = express.Router();

const Ledger = require("../database/models/Ledger");

router.route("/").get((req, res) => {
  Ledger.fetchAll()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
});

module.exports = router;
