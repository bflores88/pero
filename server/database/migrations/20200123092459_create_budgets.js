exports.up = function(knex) {
  return knex.schema.createTable("budgets", table => {
    table.increments();
    table.string("budget_name", 100);
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNullable()
      .onDelete("CASCADE");
    table.string("description");
    table.boolean("is_shared").notNullable();
    table.boolean("is_active").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("budgets");
};
