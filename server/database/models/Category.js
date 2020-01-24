const bookshelf = require("../bookshelf");

require("./User");
require("./Account");
require("./Subcategory");
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

      for (let key in categoryModel) {
        if (!model.changed[key]) {
          throw new Error(`Invalid model -- Missing ${key}`);
        }

        if (!categoryModel[key](model.changed[key])) {
          throw new Error(`Please enter a valid ${key}`);
        }
      }
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
