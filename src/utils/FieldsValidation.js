import utilController from "./Utilcontroller";

function fieldsValidation(item, fields) {
  const invalidFields = {};

  Object.keys(fields).forEach((field) => {
    const value = item[field];

    let isValid = true;

    if (Array.isArray(value)) {
      isValid = value.length > 0; // Check if the array is not empty
    } else if (typeof value === "object") {
      isValid = value !== null && Object.keys(value).length > 0; // Check if the object is not null and not empty
    } else {
      const numericValue =
        typeof value === "string" && !isNaN(value) ? parseFloat(value) : value;

      isValid = !(
        value === "" ||
        numericValue === 0 ||
        value === undefined ||
        value === null
      );
    }

    if (!isValid) {
      invalidFields[field] = `${utilController.formatTextToCapitalize(
        field
      )} field is required`;
    }
  });

  if (Object.keys(invalidFields).length > 0) {
    return invalidFields;
  }

  return true;
}
export default fieldsValidation;
