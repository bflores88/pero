const express = require("express");
const router = express.Router();

const Category = require("../database/models/Category");

router
  .route("/")
  .get((req, res) => {
    Category.fetchAll()
      .then(result => {
        return res.status(200).json(result);
      })
      .catch(error => {
        res.send(error);
        console.error(error);
      });
  })
  .post((req, res) => {
    new Category(req.body)
      .save()
      .then(result => res.status(200).json(result))
      .catch(error => console.error(error));
  });

router
  .route("/:id")
  .get((req, res) => {
    Category.where("id", req.params.id)
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
    Category.where("id", req.params.id)
      .save(req.body)
      .then(result => res.status(200).json(result))
      .catch(error => console.error(error));
  })
  .delete((req, res) => {
    Category.where("id", req.params.id)
      .destroy()
      .then(result => res.status(200).json(result))
      .catch(error => console.error(error));
  });

module.exports = router;
