exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("categories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("categories").insert([
        { id: 1, category_name: "Income", account_id: 1, created_by: 1 },
        { id: 2, category_name: "Savings", account_id: 3, created_by: 1 },
        { id: 3, category_name: "Housing", account_id: 2, created_by: 1 },
        {
          id: 4,
          category_name: "Transportation",
          account_id: 2,
          created_by: 1
        },
        { id: 5, category_name: "Food", account_id: 2, created_by: 1 },
        { id: 6, category_name: "Personal", account_id: 2, created_by: 1 },
        { id: 7, category_name: "Subscriptions", account_id: 2, created_by: 1 }
      ]);
    });
};
