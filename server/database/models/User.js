const bookshelf = require("../bookshelf");

require("./Role");
require("./Account");
require("./Budget");
require("./SharedBudget");
class User extends bookshelf.Model {
  get tableName() {
    return "users";
  }

  get hasTimestamps() {
    return true;
  }

  roles() {
    return this.belongsTo("Role", "role_id");
  }

  accounts() {
    return this.hasMany("Account", "created_by");
  }

  budgets() {
    return this.hasMany("Budget", "user_id");
  }

  shared_budgets() {
    return this.hasMany("SharedBudget", "user_id");
  }
}

module.exports = bookshelf.model("User", User);
