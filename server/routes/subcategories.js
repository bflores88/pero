const express = require("express");
const router = express.Router();

const Subcategory = require("../database/models/Subcategory");

router
  .route("/")
  .get((req, res) => {
    Subcategory.query(qb => {
      qb.select(
        "subcategories.id as subcategory_id",
        "subcategories.subcategory_name",
        "categories.id as category_id",
        "categories.category_name",
        "users.id as created_by_id",
        "users.username"
      )
        .from("subcategories")
        .innerJoin("categories", "subcategories.category_id", "categories.id")
        .innerJoin("users", "subcategories.created_by", "users.id");
    })
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
    new Subcategory(req.body)
      .save()
      .then(result => res.status(200).json(result))
      .catch(error => {
        res.status(400).send(error.message);
        console.error(error);
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    Subcategory.where("id", req.params.id)
      .fetch()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.status(400).send(error.message);
        console.error(error);
      });
  })
  .put((req, res) => {
    Subcategory.where("id", req.params.id)
      .save(req.body)
      .then(result => res.status(200).json(result))
      .catch(error => console.error(error));
  })
  .delete((req, res) => {
    Subcategory.where("id", req.params.id)
      .destroy()
      .then(result => res.status(200).json(result))
      .catch(error => console.error(error));
  });

module.exports = router;
