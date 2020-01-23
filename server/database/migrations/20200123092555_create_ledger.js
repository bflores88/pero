exports.up = function(knex) {
  return knex.schema.createTable("ledger", table => {
    table.increments();
    table.decimal("budget_amount").defaultTo(0.0);
    table.decimal("actual_amount").defaultTo(0.0);
    table
      .string("budget")
      .references("id")
      .inTable("budgets");
    table
      .string("subcategory_id")
      .references("id")
      .inTable("users");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("ledger");
};
