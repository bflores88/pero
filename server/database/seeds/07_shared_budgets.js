exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("shared_budgets")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("shared_budgets").insert([
        { id: 1, user_id: 3, budget_id: 3 }
      ]);
    });
};
