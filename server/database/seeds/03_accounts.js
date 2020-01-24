exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        { id: 1, account_name: "Income", created_by: 1 },
        { id: 2, account_name: "Expense", created_by: 1 },
        { id: 3, account_name: "Equity", created_by: 1 }
      ]);
    });
};
