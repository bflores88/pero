const bookshelf = require("../bookshelf");

require("./User");
require("./SharedBudget");
const validateModel = require("../../utilities/validateModel");
class Budget extends bookshelf.Model {
  get tableName() {
    return "budgets";
  }

  get hasTimestamps() {
    return true;
  }

  initialize() {
    const budgetModel = {
      user_id: userId => userId > 0,
      budget_name: budgetName => budgetName.length > 3,
      description: description => description.length > 3,
      is_shared: is_shared => is_shared === "true" || is_shared === "false"
    };

    this.on("creating", model => {
      validateModel(budgetModel, model);
    });

    this.on("updating", model => {
      validateModel(budgetModel, model);
    });
  }

  users() {
    return this.belongsTo("User", "user_id");
  }

  shared_budgets() {
    return this.hasMany("SharedBudget", "budget_id");
  }
}

module.exports = bookshelf.model("Budget", Budget);
