const bookshelf = require("../bookshelf");

require("./User");
require("./Account");
require("./Subcategory");
class Category extends bookshelf.Model {
  get tableName() {
    return "categories";
  }

  accounts() {
    this.belongsTo("Account", "account_id");
  }

  subcategories() {
    this.hasMany("Subcategory", "category_id");
  }

  users() {
    return this.belongsTo("User", "created_by");
  }
}

module.exports = bookshelf.Model("Category", Category);
