exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ledger")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ledger").insert([
        { id: 1, budget_amount: 5000, budget_id: 2, subcategory_id: 1 },
        { id: 2, budget_amount: 500, budget_id: 2, subcategory_id: 2 },
        { id: 3, budget_amount: 1100, budget_id: 2, subcategory_id: 3 },
        { id: 4, budget_amount: 40, budget_id: 2, subcategory_id: 4 },
        { id: 5, budget_amount: 70, budget_id: 2, subcategory_id: 5 },
        { id: 6, budget_amount: 150, budget_id: 2, subcategory_id: 7 },
        { id: 7, budget_amount: 200, budget_id: 2, subcategory_id: 9 },
        { id: 8, budget_amount: 90, budget_id: 2, subcategory_id: 10 },
        { id: 9, budget_amount: 12, budget_id: 2, subcategory_id: 12 },
        { id: 10, budget_amount: 8000, budget_id: 3, subcategory_id: 1 },
        { id: 11, budget_amount: 500, budget_id: 3, subcategory_id: 2 },
        { id: 12, budget_amount: 1100, budget_id: 3, subcategory_id: 3 },
        { id: 13, budget_amount: 40, budget_id: 3, subcategory_id: 4 },
        { id: 14, budget_amount: 70, budget_id: 3, subcategory_id: 5 },
        { id: 15, budget_amount: 150, budget_id: 3, subcategory_id: 7 },
        { id: 16, budget_amount: 200, budget_id: 3, subcategory_id: 9 },
        { id: 17, budget_amount: 90, budget_id: 3, subcategory_id: 10 },
        { id: 18, budget_amount: 12, budget_id: 3, subcategory_id: 12 }
      ]);
    });
};
