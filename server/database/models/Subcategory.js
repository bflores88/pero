const bookshelf = require("../bookshelf");

require("./User");
require("./Category");
class Subcategory extends bookshelf.Model {
  get tableName() {
    return "subcategories";
  }

  initialize() {
    this.on("creating", model => {
      const subcategoryModel = {
        subcategory_name: subcatName => subcatName.length > 3,
        category_id: catId => catId > 0,
        created_by: userId => userId > 0
      };

      for (let key in subcategoryModel) {
        if (!model.changed[key]) {
          throw new Error(`Invalid model -- Missing ${key}`);
        }

        if (!subcategoryModel[key](model.changed[key])) {
          throw new Error(`Please enter a valid ${key}`);
        }
      }
    });
  }

  categories() {
    this.belongsTo("Category", "category_id");
  }

  users() {
    return this.belongsTo("User", "created_by");
  }
}

module.exports = bookshelf.model("Subcategory", Subcategory);
