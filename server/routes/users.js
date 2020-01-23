const express = require("express");
const router = express.Router();

const User = require("../database/models/User");

router.route("/").get((req, res) => {
  User.query(function(qb) {
    qb.select(
      "users.id as user_id",
      "users.username",
      "users.role_id",
      "roles.role_name"
    )
      .from("users")
      .innerJoin("roles", "users.role_id", "roles.id");
  })
    .fetchAll()
    .then(result => {
      return res.status(200).send(result.toJSON());
    })
    .catch(error => console.error(error));
});

module.exports = router;
