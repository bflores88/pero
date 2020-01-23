const bookshelf = require("../bookshelf");

require("./User");
require("./Account");
require("./Subcategory");
class Category extends bookshelf.Model {
  get tableName() {
    return "categories";
  }

  initialize() {
    this.on("creating", model => {
      console.log(model);
      throw new Error("Break");
    });
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

module.exports = bookshelf.model("Category", Category);
