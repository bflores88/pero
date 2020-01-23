const bookshelf = require("../bookshelf");

require("./User");
class Role extends bookshelf.Model {
  get tableName() {
    return "roles";
  }

  users() {
    return this.hasMany("User", "role_id");
  }
}

module.exports = bookshelf.Model("Role", Role);
