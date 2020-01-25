const express = require("express");
const router = express.Router();

const Ledger = require("../database/models/Ledger");

router.route("/").get((req, res) => {
  Ledger.query(qb => {
    qb.select(
      "ledger.id as ledger_id",
      "ledger.budget_amount",
      "ledger.actual_amount",
      "budgets.id as budget_id",
      "budgets.budget_name",
      "budgets.description",
      "budgets.user_id as user_id",
      "subcategories.id as subcategory_id",
      "subcategories.subcategory_name",
      "categories.id as category_id",
      "categories.category_name"
    )
      .innerJoin("budgets", "ledger.budget_id", "budgets.id")
      .innerJoin("subcategories", "ledger.subcategory_id", "subcategories.id")
      .fullOuterJoin(
        "categories",
        "subcategories.category_id",
        "categories.id"
      );
  })
    .fetchAll()
    .then(result => {
      result = result.toJSON();

      // Regroup could be used on client side to structure the data for UI purposes
      let regroup = result.reduce((p, c) => {
        p[`budget_id_${c.budget_id}`] = p[`budget_id_${c.budget_id}`] || [];
        p[`budget_id_${c.budget_id}`].push(c);
        return p;
      }, {});

      for (let key in regroup) {
        regroup[key] = regroup[key].reduce((p, c) => {
          p[`category_id_${c.category_id}`] =
            p[`category_id_${c.category_id}`] || [];
          p[`category_id_${c.category_id}`].push(c);
          return p;
        }, {});
      }

      return res.status(200).send(result);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
});

module.exports = router;
