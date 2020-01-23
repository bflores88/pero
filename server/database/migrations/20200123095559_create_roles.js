exports.up = function(knex) {
  return knex.schema.createTable("roles", table => {
    table.increments();
    table.string("role_name", 50).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("roles");
};
