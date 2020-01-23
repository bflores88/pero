const bookshelf = require("../bookshelf");

require("./User");
require("./Category");
class Account extends bookshelf.Model {
  get tableName() {
    return "accounts";
  }

  categories() {
    return this.hasMany("Category", "account_id");
  }

  users() {
    return this.belongsTo("User", "created_by");
  }
}

module.exports = bookshelf.Model("Account", Account);
