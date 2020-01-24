const express = require("express");
const router = express.Router();

const SharedBudget = require("../database/models/SharedBudget");
const Budget = require("../database/models/Budget");

router
  .route("/")
  .get((req, res) => {
    SharedBudget.fetchAll()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.send({ error: error });
        console.error(error);
      });
  })
  .post((req, res) => {
    Budget.where({ id: req.body.budget_id, user_id: req.user.id })
      .fetch({ require: false })
      .then(result => {
        if (!result) {
          throw new Error(`Invalid budget.`);
        }
        return SharedBudget.where(req.body).fetch({ require: false });
      })
      .then(result => {
        if (result) {
          throw new Error(`Budget already shared with this user.`);
        }
        return new SharedBudget(req.body).save();
      })
      .then(result => {
        res.status(200).json(result);
        return Budget.where("id", req.body.budget_id).save({ is_shared: true });
      })
      .catch(error => {
        if (error.message) {
          res.status(400).send({ error: error.message });
        } else {
          res.status(500).send({ error: error });
        }

        console.error(error);
      });
  });

router.route("/:sharedBudgetId").delete((req, res) => {
  SharedBudget.where("id", req.params.sharedBudgetId)
    .destroy()
    .then(result => res.status(200).json(result))
    .catch(error => {
      res.status(500).send({ error: error });
      console.error(error);
    });
});

module.exports = router;
