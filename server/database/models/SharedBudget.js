const bookshelf = require("../bookshelf");

require("./User");
require("./Budget");
class SharedBudget extends bookshelf.Model {
  get tableName() {
    return "shared_budgets";
  }

  get hasTimestamps() {
    return true;
  }

  budgets() {
    this.belongsTo("Budget", "budget");
  }

  users() {
    return this.belongsTo("User", "created_by");
  }
}

module.exports = bookshelf.model("SharedBudget", SharedBudget);
