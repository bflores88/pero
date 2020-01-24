exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("subcategories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("subcategories").insert([
        { id: 1, subcategory_name: "Paycheck", category_id: 1, created_by: 1 },
        {
          id: 2,
          subcategory_name: "Emergency Fund",
          category_id: 2,
          created_by: 1
        },
        {
          id: 3,
          subcategory_name: "Mortgage / Rent",
          category_id: 3,
          created_by: 1
        },
        { id: 4, subcategory_name: "Internet", category_id: 3, created_by: 1 },
        {
          id: 5,
          subcategory_name: "Electricity",
          category_id: 3,
          created_by: 1
        },
        { id: 6, subcategory_name: "Water", category_id: 3, created_by: 1 },
        { id: 7, subcategory_name: "Gas", category_id: 4, created_by: 1 },
        {
          id: 8,
          subcategory_name: "Maintenance",
          category_id: 4,
          created_by: 1
        },
        { id: 9, subcategory_name: "Groceries", category_id: 5, created_by: 1 },
        { id: 10, subcategory_name: "Phone", category_id: 6, created_by: 1 },
        { id: 11, subcategory_name: "Clothing", category_id: 6, created_by: 1 },
        { id: 12, subcategory_name: "Netflix", category_id: 7, created_by: 1 }
      ]);
    });
};
