const bookshelf = require("../bookshelf");

require("./User");
require("./Account");
require("./Subcategory");
const validateModel = require("../../utilities/validateModel");
class Category extends bookshelf.Model {
  get tableName() {
    return "categories";
  }

  get hasTimestamps() {
    return true;
  }

  initialize() {
    // Need to handle DELETE ==> Deleting categories will delete subcategories referencing cats
    this.on("creating", model => {
      const categoryModel = {
        category_name: catName => catName.length > 3,
        account_id: accountId => accountId > 0,
        created_by: userId => userId > 0
      };

      validateModel(categoryModel, model);
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
