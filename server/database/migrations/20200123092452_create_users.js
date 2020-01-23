exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 100).notNullable();
    table.string("username", 50).notNullable();
    table.string("email", 100);
    table.string("password", 100);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
