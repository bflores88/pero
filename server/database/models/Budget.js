const bookshelf = require("../bookshelf");

require("./User");
require("./SharedBudget");
class Budget extends bookshelf.Model {
  get tableName() {
    return "budgets";
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo("User", "user_id");
  }

  shared_budgets() {
    return this.hasMany("SharedBudget", "budget_id");
  }
}

module.exports = bookshelf.model("Budget", Budget);
