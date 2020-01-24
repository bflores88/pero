exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("budgets")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("budgets").insert([
        {
          id: 1,
          budget_name: "Test Budget",
          user_id: 1,
          description: "Admin test budget",
          is_shared: false,
          is_active: true
        },
        {
          id: 2,
          budget_name: "January 2020",
          user_id: 2,
          description: "Monthly Budget",
          is_shared: false,
          is_active: true
        },
        {
          id: 3,
          budget_name: "February 2020",
          user_id: 2,
          description: "Monthly Budget",
          is_shared: true,
          is_active: true
        }
      ]);
    });
};
