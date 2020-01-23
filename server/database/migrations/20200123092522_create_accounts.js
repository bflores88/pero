exports.up = function(knex) {
  return knex.schema.createTable("accounts", table => {
    table.increments();
    table.string("account_name").notNullable();
    table
      .string("created_by")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("accounts");
};
