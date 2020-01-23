const bcrypt = require("bcryptjs");
const saltRounds = 12;

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          first_name: "Michael",
          last_name: "Scott",
          username: "admin01",
          email: "admin@pero.com",
          password: bcrypt.hashSync("password", saltRounds),
          role_id: 1
        },
        {
          id: 2,
          first_name: "Jim",
          last_name: "Halpert",
          username: "big_tuna",
          email: "jim_halpert@dd.com",
          password: bcrypt.hashSync("password", saltRounds),
          role_id: 3
        },
        {
          id: 3,
          first_name: "Dwight",
          last_name: "Schrute",
          username: "mr_poop",
          email: "dwight_schrute@dd.com",
          password: bcrypt.hashSync("password", saltRounds),
          role_id: 2
        }
      ]);
    });
};
