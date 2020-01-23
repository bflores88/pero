exports.up = function(knex) {
  return knex.schema.createTable("shared_budgets", table => {
    table.increments();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table
      .integer("budget_id")
      .references("id")
      .inTable("budgets")
      .notNullable()
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("shared_budgets");
};
