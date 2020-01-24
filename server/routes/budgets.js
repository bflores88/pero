const express = require("express");
const router = express.Router();

const Budget = require("../database/models/Budget");

router
  .route("/")
  .get((req, res) => {
    Budget.fetchAll()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.send(error);
        console.error(error);
      });
  })
  .post((req, res) => {
    new Budget(req.body)
      .save()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).send(error.message);
        console.error(error);
      });
  });

router.route("/:userId").get((req, res) => {
  Budget.where("user_id", req.params.id)
    .fetchAll()
    .then(result => {
      return res.status(200).json(result);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
});

module.exports = router;
