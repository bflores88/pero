const bookshelf = require("../bookshelf");

require("./Subcategory");
require("./Budget");
class Ledger extends bookshelf.Model {
  get tableName() {
    return "ledger";
  }

  subcategories() {
    this.belongsTo("Subcategory", "subcategory_id");
  }

  budgets() {
    return this.belongsTo("Budget", "budget_id");
  }
}

module.exports = bookshelf.model("Ledger", Ledger);
