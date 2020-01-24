module.exports = (model, modelInstance) => {
  for (let key in model) {
    if (!modelInstance.changed[key]) {
      throw new Error(`Invalid model -- Missing ${key}`);
    }

    console.log(typeof modelInstance.changed[key]);
    if (!model[key](modelInstance.changed[key])) {
      throw new Error(`Please enter a valid ${key}`);
    }
  }
};
