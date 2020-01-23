exports.up = function(knex) {
  return knex.schema.createTable("categories", table => {
    table.increments();
    table.string("category_name").notNullable();
    table
      .integer("account_id")
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE");
    table
      .integer("created_by")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("categories");
};
