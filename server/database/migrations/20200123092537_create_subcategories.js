exports.up = function(knex) {
  return knex.schema.createTable("subcategories", table => {
    table.increments();
    table.string("subcategory_name").notNullable();
    table
      .integer("category_id")
      .references("id")
      .inTable("categories")
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
  return knex.schema.dropTable("subcategories");
};
