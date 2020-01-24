const express = require("express");
const router = express.Router();

const Budget = require("../database/models/Budget");

/*
API endpoint: /api/budgets/
Description: all budgets pertaining to user for user dashboard
Access rights: user

API endpoint: /api/budgets/:budgetId/
Description: specific budget
Access rights: user owner
*/

router
  .route("/")
  .get((req, res) => {
    Budget.where("user_id", req.user.id)
      .orderBy("id")
      .fetchAll()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.send(error);
        console.error(error);
      });
  })
  .post((req, res) => {
    req.body.is_active = true;
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

router // TODO: budgets.user_id must match req.user.id
  .route("/:budgetId")
  .get((req, res) => {
    Budget.where("id", req.params.budgetId)
      .fetch()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.send(error);
        console.error(error);
      });
  })
  .put((req, res) => {
    Budget.forge("id", req.params.budgetId)
      .save(req.body, { method: "update" })
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        if (error.message) {
          res.status(400).send(error.message);
        } else {
          res.status(500).send(error);
        }

        console.error(error);
      });
  });

module.exports = router;
