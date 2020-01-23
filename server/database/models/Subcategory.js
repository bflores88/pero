const bookshelf = require("../bookshelf");

require("./User");
require("./Category");
class Subcategory extends bookshelf.Model {
  get tableName() {
    return "subcategories";
  }

  categories() {
    this.belongsTo("Category", "category_id");
  }

  users() {
    return this.belongsTo("User", "created_by");
  }
}

module.exports = bookshelf.model("Subcategory", Subcategory);
