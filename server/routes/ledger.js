const express = require("express");
const router = express.Router();

const Ledger = require("../database/models/Ledger");

router.route("/").get((req, res) => {
  console.log(req.user);
  Ledger.query(qb => {
    qb.select(
      "ledger.id as ledger_id",
      "ledger.budget_amount",
      "ledger.actual_amount",
      "budgets.id as budget_id",
      "budgets.budget_name",
      "budgets.description",
      "budgets.user_id as user_id",
      "budgets.is_shared",
      "subcategories.id as subcategory_id",
      "subcategories.subcategory_name",
      "categories.id as category_id",
      "categories.category_name",
      "accounts.id as account_id"
    )
      .where("budgets.user_id", req.user.id)
      .innerJoin("budgets", "ledger.budget_id", "budgets.id")
      .innerJoin("subcategories", "ledger.subcategory_id", "subcategories.id")
      .fullOuterJoin("categories", "subcategories.category_id", "categories.id")
      .fullOuterJoin("accounts", "categories.account_id", "accounts.id");
  })
    .fetchAll()
    .then(result => {
      result = result.toJSON();

      // Regroup could be used on client side to structure the data for UI purposes
      let regroup = result.reduce((p, c, idx) => {
        if (!p.length || p[p.length - 1].budget_id !== c.budget_id) {
          const newBudget = {
            budget_id: c.budget_id,
            budget_name: c.budget_name,
            description: c.description,
            is_shared: c.is_shared,
            categories: []
          };
          p.push(newBudget);
        }
        delete c.budget_id;
        delete c.budget_name;
        delete c.description;
        delete c.is_shared;
        p[p.length - 1].categories.push(c);
        return p;
      }, []);

      regroup.forEach((budget, idx) => {
        regroup[idx].categories = budget.categories.reduce((p, c) => {
          if (!p.length || p[p.length - 1].category_id !== c.category_id) {
            const newCategory = {
              category_id: c.category_id,
              category_name: c.category_name,
              account_id: c.account_id,
              subcategories: []
            };
            p.push(newCategory);
          }
          delete c.category_id;
          delete c.category_name;
          delete c.account_id;
          p[p.length - 1].subcategories.push(c);
          return p;
        }, []);
      });

      return res.status(200).send(regroup);
    })
    .catch(error => {
      res.send(error);
      console.error(error);
    });
});

module.exports = router;
