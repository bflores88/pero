export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

export const numberFormatter = event => {
  let newNumber = event.target.value;

  if (!newNumber || newNumber === "-") {
    return {
      str: newNumber,
      int: 0
    };
  }

  if (
    !/^-?\d*[.,]?\d*$/.test(parseFloat(event.target.value.replace(/,/g, "")))
  ) {
    newNumber = event.target.value
      .split("")
      .filter(char => char !== event.key)
      .join("");
  } else {
    newNumber = parseFloat(event.target.value.replace(/,/g, ""))
      .toFixed(2)
      .toLocaleString("en-US", "currency");
  }

  const newNumObj = {
    str: newNumber,
    int: parseFloat(newNumber.replace(/,/g, ""))
  };

  return newNumObj;
};
