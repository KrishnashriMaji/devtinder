const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not correct formated.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not correct formatted.");
  }
};

module.exports = { validateSignUpData };
