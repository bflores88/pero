const bookshelf = require("../bookshelf");

require("./User");
require("./Budget");
const validateModel = require("../../utilities/validateModel");
class SharedBudget extends bookshelf.Model {
  get tableName() {
    return "shared_budgets";
  }

  get hasTimestamps() {
    return true;
  }

  initialize() {
    const sharedBudgetModel = {
      user_id: userId => userId > 0,
      budget_id: budgetId => budgetId > 0
    };

    this.on("creating", model => {
      validateModel(sharedBudgetModel, model);
    });
  }

  budgets() {
    this.belongsTo("Budget", "budget");
  }

  users() {
    return this.belongsTo("User", "created_by");
  }
}

module.exports = bookshelf.model("SharedBudget", SharedBudget);
